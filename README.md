# 🔐 Secure File Sharing System

A secure file upload and download system built with Node.js and AWS S3, allowing users to upload files and retrieve time-limited signed download links. Provisioning is automated using **Terraform**.

---

## 📸 Demo

> 🎥 Preview: [Upload a file ➡️ Get a secure download link ➡️ Share ➡️ Auto-expiry in 5 mins]

---

## 🚀 Features

- 🔒 Secure file upload to AWS S3
- 🔗 Time-limited signed download URLs (5 min expiry)
- 🗑️ Temporary local file cleanup
- 🌐 User-friendly web interface
- ⚙️ Infrastructure as Code using **Terraform**
- 📦 Modular backend using Express and Multer

---

## 🛠 Tech Stack

| Layer     | Technologies                          |
|-----------|---------------------------------------|
| Frontend  | HTML, CSS, JavaScript                 |
| Backend   | Node.js, Express, Multer              |
| Cloud     | AWS S3 (Simple Storage Service)       |
| Infra     | **Terraform** (Infrastructure as Code)|
| Other     | AWS SDK, Signed URL, dotenv           |

---

## 📁 Folder Structure

<img width="514" height="416" alt="image" src="https://github.com/user-attachments/assets/3c0d3a51-8130-4469-8454-6c7f0b44d4d2" />


---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js & npm
- AWS Account with programmatic access
- Terraform CLI

---

### 📦 Backend Setup

1. **Clone the repository**
git clone https://github.com/your-username/secure-file-sharing.git
cd secure-file-sharing

2.**Install dependencies**
npm install

3.**Create a .env file (at the root)**
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

4.**Run the server**
node upload.js

🌐 Server runs at: http://localhost:3000

### 🌍 Frontend Usage
Open http://localhost:3000

Select a file and click "Upload"

You will receive a download link valid for 5 minutes

Share the link or use it to download immediately

### ⚙️ Terraform Setup
1.**Navigate to the Terraform directory:**
cd terraform

2.**Initialize and apply the config:**
terraform init
terraform plan
terraform apply

3.**This will:**

Create your S3 bucket

Add required policies and CORS rules

Print the bucket name and ARN

### 🧪 Testing
After successful deployment:

Try uploading various file types (PDF, DOCX, JPG)

Test expired links after 5 minutes

Inspect AWS S3 for object listing and CORS config

