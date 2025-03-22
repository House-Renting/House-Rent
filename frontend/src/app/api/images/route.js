import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";
import Image from "../../../models/Image";

const FOLDER_PATH = path.resolve("C:/Users/Oswald Dsouza/Desktop/10050/Projects/Miscellaneous/House-rent/House-Rent/AR-VR/datasets/eagle");

export async function GET() {
    try {
        await connectDB();

        if (!fs.existsSync(FOLDER_PATH)) {
            return NextResponse.json({ error: "Folder not found" }, { status: 400 });
        }

        const files = fs.readdirSync(FOLDER_PATH);
        if (!files.length) {
            return NextResponse.json({ error: "No images found in folder" }, { status: 400 });
        }

        let uploadedCount = 0;
        let skippedCount = 0;

        for (const file of files) {
            if (!file.match(/\.(JPG|jpeg|png)$/i)) continue;

            const filePath = path.join(FOLDER_PATH, file);
            const imageBuffer = fs.readFileSync(filePath);

            const existingFile = await Image.findOne({ filename: file });
            if (existingFile) {
                console.log(`${file} already exists, skipping...`);
                skippedCount++;
                continue;
            }

            await Image.create({
                filename: file,
                contentType: "image/jpeg",
                data: imageBuffer,
            });

            console.log(`Uploaded: ${file}`);
            uploadedCount++;
        }

        return NextResponse.json(
            {
                message: "Upload complete",
                uploadedCount,
                skippedCount,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error uploading images:", err);
        return NextResponse.json({ error: `Failed to upload: ${err.message}` }, { status: 500 });
    }
}
