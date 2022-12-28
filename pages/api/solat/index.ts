import {loadWaktuSolat} from "../../../lib/load-json-db";

export const config = {
    runtime: 'edge',
    regions: ['sin1'], //Singapore - AWS ap-southeast-1
}

export default async function handler(req, res) {
    // https://vercel.com/guides/loading-static-file-nextjs-api-route
    const waktuSolat = await loadWaktuSolat();

    // return all the solat times data in JSON
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(waktuSolat.solat);
}
