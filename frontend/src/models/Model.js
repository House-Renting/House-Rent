import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    modelData: { type: Buffer, required: true },
    contentType: { type: String, default: "application/octet-stream" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Model || mongoose.model("Model", ModelSchema);