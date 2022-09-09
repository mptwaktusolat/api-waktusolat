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