import {loadZones} from "../../../lib/load-json-db";

export default async function handler(req, res) {
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  const zones = await loadZones();

  // return all the solat times data in JSON
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000'); // 30 days
  res.status(200).json(zones);
}
