const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// AWS S3 Configuration
AWS.config.update({ region: "ap-south-1" });
const s3 = new AWS.S3();
const bucketName = "sakthi-secure-bucket-2025";

// Multer Configuration
const upload = multer({ dest: "uploads/" });

// Serve static frontend files (ensure your index.html is in /public)
app.use(express.static(path.join(__dirname, "public")));

// Handle file uploads and return signed download URL
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(file.path);

    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    // Upload to S3
    await s3.upload(params).promise();

    // Generate Signed URL
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: file.originalname,
      Expires: 300, // 5 minutes
    });

    // Clean up temp file
    fs.unlinkSync(file.path);

    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
