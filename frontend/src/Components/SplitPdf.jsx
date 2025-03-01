import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { motion } from "framer-motion"; // For animations

const SplitPDF = () => {
  // State to store uploaded files
  const [files, setFiles] = useState([]);
  // State to store split PDFs for each file
  const [splitPdfs, setSplitPdfs] = useState({});

  /**
   * Handles file selection using Drag & Drop
   * @param {Array} acceptedFiles - List of accepted PDF files
   */
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  /**
   * Splits the selected PDF into separate pages and stores the download links
   * @param {File} file - The PDF file to split
   * @param {Number} index - The index of the file in the list
   */
  const splitPDF = async (file, index) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      // Load the selected PDF into pdf-lib
      const pdfDoc = await PDFDocument.load(reader.result);
      const pages = pdfDoc.getPageIndices(); // Get total number of pages

      // Create new PDFs, each containing one page from the original file
      const splitDocs = await Promise.all(
        pages.map(async (pageIndex) => {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
          newPdf.addPage(copiedPage);

          // Convert new PDF to a downloadable blob
          const pdfBytes = await newPdf.save();
          return URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
        })
      );

      // Store the generated split PDFs in state
      setSplitPdfs((prev) => ({ ...prev, [file.name]: splitDocs }));
    };
  };

  // Dropzone configuration for drag & drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] }, // Accepts only PDF files
    multiple: true, // Allows multiple file uploads
  });

  return (
    <div className="p-6 text-center">
      {/* Title with animation */}
      <motion.h2
        className="text-3xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Split Your PDFs Easily
      </motion.h2>

      {/* Drag & Drop Area */}
      <motion.div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-6 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag & drop PDFs here, or click to select</p>
      </motion.div>

      {/* List of Uploaded PDFs */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Selected PDFs</h3>
          <ul className="mt-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md shadow-md mb-2"
              >
                <span className="text-gray-700">{file.name}</span>
                {/* Button to Split the PDF */}
                <button
                  onClick={() => splitPDF(file, index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                >
                  Split
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Split PDFs with Download Links */}
      {Object.keys(splitPdfs).length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Download Split PDFs</h3>
          {Object.entries(splitPdfs).map(([fileName, pages], fileIndex) => (
            <div key={fileIndex} className="mt-4 p-4 bg-white shadow-lg rounded-md">
              <h4 className="text-gray-800 font-medium">{fileName}</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {pages.map((pdfUrl, index) => (
                  <a
                    key={index}
                    href={pdfUrl}
                    download={`split_page_${index + 1}.pdf`}
                    className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600 transition-all"
                  >
                    Download Page {index + 1}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SplitPDF;
