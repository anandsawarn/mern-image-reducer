import express from "express";
import cors from "cors";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Ensure "uploads" folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Exam-based resizing presets
const examPresets = {
  SSC: { width: 200, height: 200, sizeKB: 20 },
  UPSC: { width: 300, height: 300, sizeKB: 30 },
  GATE: { width: 400, height: 400, sizeKB: 40 },
  "JEE Main": { width: 500, height: 500, sizeKB: 50 },
};

// Multer Storage Setup (Fixing Upload Issues)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// **IMAGE PROCESSING ROUTE**
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  try {
    const { width, height, quality, format, exam } = req.body;
    const imgWidth = exam ? examPresets[exam]?.width : parseInt(width) || 300;
    const imgHeight = exam ? examPresets[exam]?.height : parseInt(height) || 300;
    const imgFormat = format || "jpeg";
    const imgQuality = quality === "high" ? 100 : quality === "medium" ? 70 : 50;

    const originalFilename = `original-${Date.now()}.jpeg`;
    const resizedFilename = `resized-${Date.now()}.${imgFormat}`;
    const originalPath = path.join(uploadDir, originalFilename);
    const resizedPath = path.join(uploadDir, resizedFilename);

    // Save Original Image
    fs.writeFileSync(originalPath, req.file.buffer);

    // Process and Save Resized Image
    await sharp(req.file.buffer)
      .resize(imgWidth, imgHeight)
      .toFormat(imgFormat, { quality: imgQuality })
      .toFile(resizedPath);

    const originalSize = (fs.statSync(originalPath).size / 1024).toFixed(2);
    const resizedSize = (fs.statSync(resizedPath).size / 1024).toFixed(2);

    res.json({
      success: true,
      original: { path: `/uploads/${originalFilename}`, size: originalSize },
      resized: { path: `/uploads/${resizedFilename}`, size: resizedSize },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// **Serve Static Files**
app.use("/uploads", express.static(uploadDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
