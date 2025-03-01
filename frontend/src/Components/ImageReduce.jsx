import { useState, useRef } from "react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("jpeg");
  const [exam, setExam] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  const fileInputRef = useRef(null);

  // Exam predefined sizes
  const examSizes = {
    SSC: { width: 200, height: 200, size: 50 },
    UPSC: { width: 300, height: 300, size: 100 },
    GATE: { width: 250, height: 250, size: 75 },
    "JEE Main": { width: 350, height: 350, size: 120 },
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle Drag & Drop
  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  // Prevent Default Drag Behaviors
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("width", exam ? examSizes[exam].width : customWidth);
    formData.append("height", exam ? examSizes[exam].height : customHeight);
    formData.append("quality", quality);
    formData.append("format", format);
    formData.append("exam", exam);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setOriginalImage({ url: `http://localhost:5000${data.original.path}`, size: data.original.size });
        setResizedImage({ url: `http://localhost:5000${data.resized.path}`, size: data.resized.size });
        setDownloadLink(`http://localhost:5000${data.resized.path}`);
      } else {
        alert("Image upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Instant Download Fix
  const handleDownload = async () => {
    try {
      const response = await fetch(downloadLink);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "reduced_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Upload & Resize Image</h2>

      {/* Drag and Drop Box */}
      <div
        className="border-2 border-dashed border-gray-400 p-6 w-96 text-center cursor-pointer bg-white shadow-md rounded-md"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        {selectedFile ? (
          <p className="text-green-600 font-semibold">File Selected: {selectedFile.name}</p>
        ) : (
          <p className="text-gray-600">Drag & Drop or Click to Select File</p>
        )}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {/* Exam Selection Dropdown */}
      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        className="mt-4 p-2 border rounded bg-white shadow-md"
      >
        <option value="">Custom Size</option>
        <option value="SSC">SSC</option>
        <option value="UPSC">UPSC</option>
        <option value="GATE">GATE</option>
        <option value="JEE Main">JEE Main</option>
      </select>

      {/* Custom Size Inputs */}
      {!exam && (
        <div className="mt-4 flex gap-2">
          <input
            type="number"
            placeholder="Width"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            className="p-2 border rounded bg-white shadow-md"
          />
          <input
            type="number"
            placeholder="Height"
            value={customHeight}
            onChange={(e) => setCustomHeight(e.target.value)}
            className="p-2 border rounded bg-white shadow-md"
          />
        </div>
      )}

      {/* Quality Slider */}
      <div className="mt-4 w-96">
        <label className="block text-gray-700 font-medium">Quality: {quality}%</label>
        <input
          type="range"
          min="50"
          max="100"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="w-full"
        />
      </div>

      <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 shadow-md">
        Upload & Resize
      </button>

      {/* Show Images & Download */}
      {originalImage && resizedImage && (
        <div className="mt-6 flex flex-col items-center w-full max-w-2xl">
          <div className="flex justify-between w-full">
            <div className="text-center">
              <h3 className="font-semibold">Original Image ({originalImage.size} KB)</h3>
              <img src={originalImage.url} alt="Original" className="w-48 border rounded shadow" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold">Resized Image ({resizedImage.size} KB)</h3>
              <img src={resizedImage.url} alt="Resized" className="w-48 border rounded shadow" />
              <button
                onClick={handleDownload}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-md"
              >
                Download Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
