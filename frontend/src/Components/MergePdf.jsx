import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

const MergePDF = () => {
  const [files, setFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Drag & Drop Functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]); // Allow multiple file drops
    },
  });

  // Function to merge selected PDFs
  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least two PDFs to merge.");
      return;
    }

    setIsProcessing(true);

    const mergedDoc = await PDFDocument.create();
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      await new Promise((resolve) => {
        reader.onloadend = async () => {
          const pdf = await PDFDocument.load(reader.result);
          const copiedPages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedDoc.addPage(page));
          resolve();
        };
      });
    }

    const pdfBytes = await mergedDoc.save();
    setMergedPdf(URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" })));
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-10 text-center">
      {/* Title */}
      <motion.h2 className="text-3xl font-bold text-gray-800 mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Merge Your PDFs
      </motion.h2>

      {/* Description */}
      <motion.p className="text-gray-600 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        Drag & drop your PDF files here or click to upload. Merge multiple PDFs into a single document effortlessly.
      </motion.p>

      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-lg cursor-pointer transition ${
          isDragActive ? "border-green-500 bg-green-100" : "border-gray-400 bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">{isDragActive ? "Drop the files here..." : "Drag & Drop PDFs here or Click to Upload"}</p>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Selected PDFs:</h3>
          <ul className="text-left">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700 text-sm">
                📄 {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Merge Button */}
      <motion.button
        onClick={mergePDFs}
        className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
        }`}
        disabled={isProcessing}
        whileHover={{ scale: isProcessing ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isProcessing ? "Merging..." : "Merge PDFs"}
      </motion.button>

      {/* Download Merged PDF */}
      {mergedPdf && (
        <motion.a
          href={mergedPdf}
          download="merged.pdf"
          className="block mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Merged PDF
        </motion.a>
      )}
    </div>
  );
};

export default MergePDF;
