import {getJakimZonesList, JakimZonesItem} from "./index";

export default async function handler(req, res) {

  var zones: JakimZonesItem[] = [];

  try {
    zones = await getJakimZonesList();
  } catch (error) {
    return res.status(500).json({
      error: `Error loading zones data: ${error}`
    });
  }
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
