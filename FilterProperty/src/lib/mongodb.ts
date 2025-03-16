import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("⚠️ MongoDB URI is missing in .env.local");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection; // Return existing connection
  }
  return mongoose.connect(MONGODB_URI);
};
