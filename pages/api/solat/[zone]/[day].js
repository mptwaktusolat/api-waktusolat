import {loadWaktuSolat} from "../../../../lib/load-json-db";

export default async function handler(req, res) {
  const { zone, day } = req.query

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

  const totalDays = solatTimes.prayerTime.length;

  const solatDay = solatTimes.prayerTime[parseInt(day) - 1];
  if (solatDay === undefined) {
    res.status(404).json({
        error: `Check index. Accepting value from 1 - ${totalDays}`
    });
    return;
  }

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
  res.status(200).json(solatDay);
}