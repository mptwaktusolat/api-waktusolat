import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { zone } = req.query
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');

    const allSolatTimes = JSON.parse(fileContents).solat;

    // get the solat time for the provided zone
    const solatTimes = allSolatTimes.find(solat => solat.zone === zone.toUpperCase());

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