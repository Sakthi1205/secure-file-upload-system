require('dotenv').config();


const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const uploadFile = async () => {
  const filePath = "./example.pdf";
  const fileContent = fs.readFileSync(filePath);
  const command = new PutObjectCommand({
    Bucket: "sakthi-secure-bucket-2025",
    Key: path.basename(filePath),
    Body: fileContent
  });

  await s3.send(command);
  console.log("✅ File uploaded!");
};

uploadFile().catch(console.error);
