resource "aws_iam_role" "downloader_role" {
  name = "DownloaderRole"
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

resource "aws_iam_policy" "downloader_policy" {
  name = "DownloaderPolicy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "s3:GetObject"
      ],
      Resource = "arn:aws:s3:::your-bucket-name/*"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "downloader_policy_attach" {
  role       = aws_iam_role.downloader_role.name
  policy_arn = aws_iam_policy.downloader_policy.arn
}
