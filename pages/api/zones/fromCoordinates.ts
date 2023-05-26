import {loadZonesGeoJson} from "../../../lib/load-json-db";
import PolygonLookup from 'polygon-lookup';

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

    console.log(result)

    let negeri, jakimCode, daerah;

    try {
        negeri = result.properties.shapeName;
        // jakimCode = result.properties.JAKIM_CODE;
        // daerah = result.properties.DAERAH;
    } catch (e) {
        return res.status(404).json({
            error: `No zone found for the supplied coordinates}`
        });
    }

    return res.status(200).json({
        'negeri': result.properties.shapeName,
    })
}