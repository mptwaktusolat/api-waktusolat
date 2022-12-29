import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {

  let {zone} = req.query
  zone = zone.toUpperCase(); // uppercase-d to match the file name

  const dirPath = path.resolve('.', 'public/images/mosque-cover')
  const imageFiles = fs.readdirSync(dirPath); // get all the image files in the directory

  // Find image file that matches the zone
  const image = imageFiles.find(image => zone.startsWith(image.split('-')[0]));
  if (!image) {
    res.status(404).json({message: 'Image not found'});
    return;
  }

  // image for the zone is found
  const imagePath = path.resolve('public/images/mosque-cover', image);
  const imageBuffer = fs.readFileSync(imagePath);

  // return the mosque image times data in JSON
  res.setHeader('Content-Type', 'image/jpg')
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=5184000'); // 60 days
  res.status(200).send(imageBuffer);
}
