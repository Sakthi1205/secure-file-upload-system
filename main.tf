provider "aws" {
  region = "ap-south-1"
}

##############################
# S3 Bucket Configuration
##############################

resource "aws_s3_bucket" "file_bucket" {
  bucket         = "sakthi-secure-bucket-2025"
  force_destroy  = true
}

output "bucket_name" {
  value = aws_s3_bucket.file_bucket.id
}

##############################
# IAM User for File Upload
##############################

resource "aws_iam_user" "file_uploader" {
  name = "file-uploader"
}

##############################
# IAM Policy for S3 Access
##############################

resource "aws_iam_policy" "s3_upload_policy" {
  name        = "S3UploadPolicy"
  description = "Policy for uploading and generating presigned URLs"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ],
        Resource = "arn:aws:s3:::sakthi-secure-bucket-2025/*"
      }
    ]
  })
}

##############################
# Attach Policy to User
##############################

resource "aws_iam_user_policy_attachment" "attach_policy" {
  user       = aws_iam_user.file_uploader.name
  policy_arn = aws_iam_policy.s3_upload_policy.arn
}

##############################
# Generate Access Key for Backend
##############################

resource "aws_iam_access_key" "file_uploader_access" {
  user = aws_iam_user.file_uploader.name
}

##############################
# Output Credentials (Optional - BE CAREFUL)
##############################

output "access_key_id" {
  value = aws_iam_access_key.file_uploader_access.id
  sensitive = true
}

output "secret_access_key" {
  value     = aws_iam_access_key.file_uploader_access.secret
  sensitive = true
}
