import { GridFSBucket } from 'mongodb';
import clientPromise from './mongodb';

export async function getGridFSBucket(): Promise<GridFSBucket> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB!);
  return new GridFSBucket(db, { bucketName: 'fs' });
}

