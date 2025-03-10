import fs from "fs";
import path from "path";
import dbConnect from "../../../lib/dbConnect";
import Image from "../../../../models/Image";

export async function GET() {
    try {
        await dbConnect();

        const images = await Image.find({});
        if (!images.length) {
            return new Response(JSON.stringify({ error: "No images found." }), { status: 404 });
        }

        const tempDir = path.join(process.cwd(), "temp_images");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        
        for (const img of images) {
            const filePath = path.join(tempDir, img.filename);
            const imageData = Buffer.isBuffer(img.data) ? img.data : Buffer.from(img.data, "base64");
            fs.writeFileSync(filePath, imageData);
        }

        const colmapWorkspace = path.join(process.cwd(), "colmap_workspace");
        if (!fs.existsSync(colmapWorkspace)) fs.mkdirSync(colmapWorkspace);

        const response = await fetch("http://localhost:5000/create-model", {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                imagePath: tempDir,
                workspacePath: colmapWorkspace
            })
        });

        const data = await response.json();

        //fs.rmdirSync(tempDir, { recursive: true });
        //fs.rmdirSync(colmapWorkspace, { recursive: true });

        return new Response(JSON.stringify({
            message: data.message,
            modelId: data.id
        }), { status: 200 });

    } catch (error) {
        console.error("Error in generate-model API:", error);
        return new Response(JSON.stringify({ error: "Server error." }), { status: 500 });
    }
}
