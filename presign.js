require('dotenv').config();

const {
  S3Client,
  GetObjectCommand
} = require("@aws-sdk/client-s3");
const {
  getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const generatePresignedUrl = async () => {
  const command = new GetObjectCommand({
    Bucket: "sakthi-secure-bucket-2025",
    Key: "example.pdf"
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
  console.log("🔗 Presigned URL:", url);
};

generatePresignedUrl().catch(console.error);
