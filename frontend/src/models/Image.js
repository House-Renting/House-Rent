import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true, unique: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true }, // Binary image data
});

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default Image;