import axios from "axios";

export interface JakimZonesItem {
    jakimCode: string;
    negeri: string;
    daerah: string;
}

export default async function handler(req, res) {
    var zones: JakimZonesItem[] = [];

    try {
        zones = await getJakimZonesList();
    } catch (error) {
        return res.status(500).json({
            error: `Error loading zones data: ${error}`
        });
    }

    // return all the solat times data in JSON
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=2592000'); // 30 days
    res.status(200).json(zones);
}

export async function getJakimZonesList() : Promise<JakimZonesItem[]> {
    const jakimZonesSourceData = 'https://raw.githubusercontent.com/mptwaktusolat/jakim-zones-grabber/main/new.json'
    const res = await axios.get(jakimZonesSourceData);
    return res.data;
}
