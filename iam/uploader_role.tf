resource "aws_iam_role" "uploader_role" {
  name = "UploaderRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "uploader_policy" {
  name = "UploaderPolicy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "s3:PutObject"
      ],
      Resource = "arn:aws:s3:::your-bucket-name/*"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "uploader_policy_attach" {
  role       = aws_iam_role.uploader_role.name
  policy_arn = aws_iam_policy.uploader_policy.arn
}
