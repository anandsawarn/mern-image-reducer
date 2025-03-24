import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { motion } from "framer-motion";

const CompressPDF = () => {
  const [file, setFile] = useState(null);
  const [compressedPdf, setCompressedPdf] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [compressionRatio, setCompressionRatio] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setCompressedPdf(null);
      setOriginalSize((selectedFile.size / 1024).toFixed(2));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const compressPDF = async () => {
    if (!file) {
      alert("Please select a PDF to compress.");
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      try {
        const pdfDoc = await PDFDocument.load(reader.result);
        pdfDoc.setTitle("Compressed PDF");

        // Apply basic compression (metadata reduction)
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
        const compressedBlob = new Blob([pdfBytes], { type: "application/pdf" });

        const newSize = (compressedBlob.size / 1024).toFixed(2);
        setCompressedSize(newSize);

        const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(2);
        setCompressionRatio(reduction);

        setCompressedPdf(URL.createObjectURL(compressedBlob));
      } catch (error) {
        console.error("Error compressing PDF:", error);
        alert("An error occurred while compressing the PDF.");
      } finally {
        setIsProcessing(false);
      }
    };
  };

  return (
    <div className="max-w-lg mx-auto p-6 text-center bg-white shadow-lg rounded-xl border border-gray-200 mt-10">
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Compress Your PDF
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Reduce the file size of your PDF while maintaining high quality.
      </motion.p>

      <div className="mb-4">
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
        <motion.label
          htmlFor="pdf-upload"
          className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Choose PDF File
        </motion.label>
        {file && <p className="text-gray-700 mt-2">Selected: <span className="font-semibold">{file.name}</span></p>}
      </div>

      <motion.button
        onClick={compressPDF}
        className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
        }`}
        disabled={isProcessing}
        whileHover={{ scale: isProcessing ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isProcessing ? "Compressing..." : "Compress PDF"}
      </motion.button>

      {file && originalSize && (
        <div className="mt-4 text-gray-700">
          <p>Original Size: <span className="font-semibold">{originalSize} KB</span></p>
          {compressedSize && (
            <>
              <p>Compressed Size: <span className="font-semibold">{compressedSize} KB</span></p>
              <p>Compression: <span className="font-semibold">{compressionRatio}%</span></p>
            </>
          )}
        </div>
      )}

      {compressedPdf && (
        <motion.a
          href={compressedPdf}
          download="compressed.pdf"
          className="block mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Compressed PDF
        </motion.a>
      )}
    </div>
  );
};

export default CompressPDF;
