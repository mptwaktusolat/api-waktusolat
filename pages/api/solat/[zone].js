import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { zone } = req.query
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');

    const allSolatTimes = JSON.parse(fileContents).solat;

    // get the solat time for the provided zone
    const solatTimes = allSolatTimes.find(solat => solat.zone === zone);

    // if no solat time found for the provided zone, return error
    if (!solatTimes) {
        res.status(404).json({
            error: 'No solat time found for the provided zone: ' + zone
        });
        return;
    }

    res.status(200).json(solatTimes);
}