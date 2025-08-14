require("dotenv").config();
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// AWS S3 Configuration from env vars
AWS.config.update({
  region: process.env.AWS_REGION || "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,      // if not using EC2/ECS role
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_NAME || "sakthi-secure-bucket-2025";

// Multer temp upload directory
const upload = multer({ dest: "uploads/" });

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// File upload route
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
      ContentType: file.mimetype
    };

    // Upload to S3
    await s3.upload(params).promise();

    // Generate a presigned download link (expires in 5 minutes)
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: file.originalname,
      Expires: 300 // seconds
    });

    // Delete local temp file
    fs.unlinkSync(file.path);

    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
