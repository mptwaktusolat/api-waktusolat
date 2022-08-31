import {loadLog} from "../../lib/load-json-db";

export default async function handler(req, res) {
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  const log = await loadLog();

  // return the last updated solat data
  res.status(200).json(log);

}

