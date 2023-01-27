import {loadZones} from "../../../lib/load-json-db";

export default async function handler(req, res) {
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  const zones = await loadZones();

  const {code} = req.query;

  const filteredZones = zones.filter(zone => zone.jakimCode.toLowerCase().includes(code.toLowerCase()));

  if (!filteredZones.length) {
    res.status(404).json({
      error: `No zone found for code: ${code}`
    });
    return;
  }

  // return all the solat times data in JSON
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000'); // 30 days
  res.status(200).json(filteredZones);
}
