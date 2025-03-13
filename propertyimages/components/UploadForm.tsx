import { useState } from "react";

export default function UploadForm({ room }: { room: string }) {
  const [message, setMessage] = useState<string>("");

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = (event.target as HTMLFormElement).file as HTMLInputElement;

    if (!fileInput?.files?.length) {
      setMessage("No file selected");
      return;
    }

    Array.from(fileInput.files).forEach((file) => formData.append("file", file));
    formData.append("room", room);

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await response.json();
      setMessage(result.message || result.error || "Upload failed");
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" multiple className="text-black file:text-black file:font-medium file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-white file:hover:bg-gray-100" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition">
          Upload
        </button>
      </form>
      {message && <p className="text-gray-500 text-sm mt-2">{message}</p>}
    </div>
  );
}
