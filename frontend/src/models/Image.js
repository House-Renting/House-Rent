import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, default: "image/jpeg" },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
