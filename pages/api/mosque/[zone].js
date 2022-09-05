import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {

  const {zone} = req.query;

  let zoneString; // eg: KTN, MLK, SGR etc.

  // handle case where the same initial used for Labuan and KL
  if (zone.toUpperCase() === "WLY01") {
    zoneString = 'WPKL';
  }
  else if (zone.toUpperCase() === "WLY02") {
      zoneString = 'WPLABU';
  }
  else {
  // Get the string from query (e.g. query: ktn01, zoneString become KTN)
    zoneString = zone.replace(/[0-9]/g, '').toUpperCase();
  }

  const dirPath = path.resolve('.', 'public/images/mosque-cover')
  const imageFiles = fs.readdirSync(dirPath); // get all the image files in the directory

  // find image in imageFiles that start with zone
  const image = imageFiles.find(image => image.startsWith(zoneString));
  if (!image) {
    res.status(404).json({message: 'Image not found'});
  }

  // image for the zone is found
  const imagePath = path.resolve('public/images/mosque-cover', image);
  const imageBuffer = fs.readFileSync(imagePath);

  // return the mosque image times data in JSON
  res.setHeader('Content-Type', 'image/jpg')
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
  res.status(200).send(imageBuffer);
}
