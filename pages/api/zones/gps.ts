import PolygonLookup from 'polygon-lookup';
import axios from "axios";


export default async function handler(req, res) {
    const {lat, long} = req.query;

    // check if lat & lang is undefined
    if (lat === undefined || long === undefined) {
        return res.status(400).send({
            message: "Please specify parameter 'lat' & 'long'"
        });
    }

    let geojsonData;

    // fetch geojson
    try {
        geojsonData = await getZonesGeoJson();
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    const lookup = new PolygonLookup(geojsonData);
    const result = lookup.search(long, lat);

    try {
        const jakimCode = result.properties.jakim_code;
        const state = result.properties.state;
        const district = result.properties.name;

        if (jakimCode === undefined) return res.status(404).json({
            error: `No JAKIM code associated with this coordinate`,
        });

        return res.status(200).json({
            'zone': jakimCode,
            'state': state,
            'district': district,
        })
    } catch (e) {
        return res.status(404).json({
            error: `No zone found for the supplied coordinates. Are you outside of Malaysia?`,
        });
    }
}

async function getZonesGeoJson() {
    // TODO: Change back to master branch after testing: https://raw.githubusercontent.com/mptwaktusolat/malaysia.geojson/master/malaysia.district-jakim.geojson
    const geoJsonDataSource = 'https://raw.githubusercontent.com/mptwaktusolat/malaysia.geojson/seperate/perak/malaysia.district-jakim.geojson';
    const res = await axios.get(geoJsonDataSource);
    return res.data;
}