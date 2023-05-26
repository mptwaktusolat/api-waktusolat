import path from "path";
import fsPromises from "fs/promises";

export async function loadLog() {
  const filePath = path.join(process.cwd(), 'json/log.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function loadWaktuSolat() {
  const filePath = path.join(process.cwd(), 'json/db.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function loadZones() {
  const filePath = path.join(process.cwd(), 'json/zones.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function loadZonesGeoJson() {
  // Source of GeoJson: https://data.humdata.org/dataset/geoboundaries-admin-boundaries-for-malaysia/resource/55b3dd6f-5786-4dce-b32f-5eca9bc8c16d
  const filePath = path.join(process.cwd(), 'json/geoBoundaries-MYS-ADM1_simplified.geojson');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}