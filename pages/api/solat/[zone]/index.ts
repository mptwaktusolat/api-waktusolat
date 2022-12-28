import {loadWaktuSolat} from "../../../../lib/load-json-db";

export const config = {
    runtime: 'edge',
    regions: ['sin1'], //Singapore - AWS ap-southeast-1
}

export default async function handler(req, res) {
    const { zone } = req.query

    const allSolatTimes = await loadWaktuSolat();

    // get the solat time for the provided zone
    const solatTimes = allSolatTimes.solat.find(solat => solat.zone === zone.toUpperCase());

    // if no solat time found for the provided zone, return error
    if (!solatTimes) {
        res.status(404).json({
            error: 'No solat time found for the provided zone: ' + zone.toUpperCase()
        });
        return;
    }

    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(solatTimes);
}