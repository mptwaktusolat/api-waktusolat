import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    // https://vercel.com/guides/loading-static-file-nextjs-api-route
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');

    // return all the solat times data in JSON
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(JSON.parse(fileContents).solat);
}
