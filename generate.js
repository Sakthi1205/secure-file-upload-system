const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const s3 = new AWS.S3();

const params = {
  Bucket: 'sakthi-secure-bucket-2025', // your bucket name
  Key: 'example.pdf',                  // file name in S3
  Expires: 60 * 5                      // URL valid for 5 minutes
};

const url = s3.getSignedUrl('getObject', params);
console.log('✅ Download link:', url);
