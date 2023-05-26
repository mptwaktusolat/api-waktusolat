import {loadAzanProZonesJson, loadZonesGeoJson} from "../../../lib/load-json-db";
import PolygonLookup from 'polygon-lookup';
import haversine from 'haversine-distance'


export default async function handler(req, res) {
    const {lat, lang} = req.query;

    // check if lat & lang is undefined
    if (lat === undefined || lang === undefined) {
        return res.status(400).send({
            message: "Please specify parameter 'lat' & 'lang'"
        });
    }

    // load geojson from assets
    const geojson = await loadZonesGeoJson();

    const lookup = new PolygonLookup(geojson);
    const result = lookup.search(lang, lat);

    let negeri, matchedZones;

    try {
        const negeriIsoCode = result.properties.shapeISO;

        // as of now, azanpro covers a lot of points, so I think it is more accurate
        // compared to jakim zones db
        const jakimZones = await loadAzanProZonesJson();
        matchedZones = jakimZones.filter((zone) => zone.state_iso === negeriIsoCode);
    } catch (e) {
        return res.status(404).json({
            error: `No zone found for the supplied coordinates. Are you outside of Malaysia?`
        });
    }

    // calculate distance from each zone
    const distances = matchedZones.map((zone) => {
        const distance = haversine(
            {lat: lat, lng: lang},
            {lat: zone.lat, lng: zone.lang}
        );
        return {
            ...zone,
            distance
        }
    });

    // sort by distance
    distances.sort((a, b) => a.distance - b.distance);

    // get the nearest zone
    const nearestZone = distances[0];

    return res.status(200).json({
        'state': nearestZone.negeri,
        'state_iso': nearestZone.state_iso,
        'zone': nearestZone.zone,
    })
}