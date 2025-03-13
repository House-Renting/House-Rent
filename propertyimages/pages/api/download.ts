import type { NextApiRequest, NextApiResponse } from "next";
import { getGridFSBucket } from "../../lib/gridfs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename } = req.query;
  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Filename is required" });
  }

  try {
    const bucket = await getGridFSBucket();
    const files = await bucket.find().toArray();

    const fileExists = await bucket.find({ filename }).toArray();
    if (fileExists.length === 0) {
      console.log(`File "${filename}" not found in database`);
      return res.status(404).json({ error: "File not found" });
    }

    const downloadStream = bucket.openDownloadStreamByName(filename);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
