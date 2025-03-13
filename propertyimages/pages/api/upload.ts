import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import { MongoClient, GridFSBucket } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getFileCount(room: string): Promise<number> {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db = client.db(); // Use the default database
  const bucket = new GridFSBucket(db);

  // Count files in GridFS that match the room name pattern
  const count = await bucket.find({ filename: new RegExp(`^${room}\\d+\\.`) }).count();
  await client.close();
  return count;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });

    try {
      const { fields, files }: { fields: any; files: File[] } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, fileData) => {
          if (err) {
            reject(new Error('Error parsing the files'));
            return;
          }

          const uploadedFiles = ([] as File[]).concat(fileData.file || []).filter(Boolean);
          resolve({ fields, files: uploadedFiles });
        });
      });

      if (files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const room = fields.room?.toString();
      if (!room) {
        return res.status(400).json({ error: 'Room is required' });
      }

      const client = new MongoClient(process.env.MONGODB_URI as string);
      await client.connect();
      const db = client.db();
      const bucket = new GridFSBucket(db);
      const currentCount = await getFileCount(room);

      await Promise.all(
        files.map((file, index) => 
          new Promise<void>((resolve, reject) => {
            const fileExtension = file.originalFilename?.split('.').pop() || 'file';
            const newFilename = `${room}${currentCount + index + 1}.${fileExtension}`;

            fs.createReadStream(file.filepath)
              .pipe(bucket.openUploadStream(newFilename))
              .on('error', reject)
              .on('finish', resolve);
          })
        )
      );

      await client.close();
      res.status(201).json({ message: 'Files uploaded successfully' });

    } catch (error: unknown) {
      console.error(error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
