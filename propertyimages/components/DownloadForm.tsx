import { useState } from "react";

export default function DownloadForm() {
  const [filename, setFilename] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleDownload = async () => {
    if (!filename.trim()) {
      setDownloadStatus("Please enter a valid filename!");
      return;
    }

    try {
      const response = await fetch(`/api/download?filename=${encodeURIComponent(filename.trim())}`);

      if (!response.ok) {
        setDownloadStatus(`Error: ${response.statusText}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename.trim();
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setDownloadStatus(`File "${filename.trim()}" downloaded successfully!`);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadStatus("Error downloading file. Please try again.");
    }
  };

  return (
    <div>
      <input
        className="text-black file:text-black file:font-medium file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-white file:hover:bg-gray-100"
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Enter full filename"
      />
      <button 
        onClick={handleDownload} 
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
      >
          Download
      </button>

      {downloadStatus && <p className="text-gray-500 text-sm mt-2">{downloadStatus}</p>}
    </div>
  );
}
