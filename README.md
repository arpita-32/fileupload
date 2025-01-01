# File Upload System

This project demonstrates a file upload system built using Node.js, Express, and MongoDB. It supports uploading files to the local server or Cloudinary. It also includes email notifications via Nodemailer whenever a file is successfully uploaded.

## Features

- Local file uploads.
- Image and video uploads to Cloudinary.
- Automatic email notifications on successful file uploads.
- Image compression with Cloudinary.
- Support for JPG, PNG, and MP4 file formats.

---

## Prerequisites

To run this project locally, you need the following installed:

- Node.js (>= 14.x)
- MongoDB (>= 4.x)

Additionally, you will need a Cloudinary account and SMTP credentials for email notifications.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/file-upload-system.git
   cd file-upload-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and configure it as follows:

   ```env
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   MAIL_HOST=<your-smtp-host>
   MAIL_USER=<your-smtp-username>
   MAIL_PASS=<your-smtp-password>
   ```

4. Start MongoDB:

   Ensure MongoDB is running locally or configure a remote connection string in your `mongoose.connect()` setup.

5. Run the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### Local File Upload

**POST** `/api/files/upload-local`

Uploads a file to the local server.

#### Request:
- **Form Data:**
  - `file`: The file to upload.

#### Response:
- `success`: Boolean indicating upload status.
- `message`: Status message.

---

### Image Upload to Cloudinary

**POST** `/api/files/upload-image`

Uploads an image to Cloudinary.

#### Request:
- **Form Data:**
  - `imageFile`: The image file to upload.
  - `name`: Name of the file.
  - `tags`: Tags associated with the file.
  - `email`: Email of the user.

#### Response:
- `success`: Boolean indicating upload status.
- `imageUrl`: URL of the uploaded image on Cloudinary.
- `message`: Status message.

---

### Video Upload to Cloudinary

**POST** `/api/files/upload-video`

Uploads a video to Cloudinary.

#### Request:
- **Form Data:**
  - `videoFile`: The video file to upload.
  - `name`: Name of the file.
  - `tags`: Tags associated with the file.
  - `email`: Email of the user.

#### Response:
- `success`: Boolean indicating upload status.
- `videoUrl`: URL of the uploaded video on Cloudinary.
- `message`: Status message.

---

### Image Compression and Upload

**POST** `/api/files/reduce-image`

Uploads an image to Cloudinary with reduced size.

#### Request:
- **Form Data:**
  - `imageFile`: The image file to upload.
  - `name`: Name of the file.
  - `tags`: Tags associated with the file.
  - `email`: Email of the user.

#### Response:
- `success`: Boolean indicating upload status.
- `imageUrl`: URL of the uploaded image on Cloudinary.
- `message`: Status message.

---

## Email Notifications

Whenever a file is successfully uploaded to Cloudinary, the uploader receives an email with the link to the file.

### Example Email:

```
Subject: New file uploaded on Cloudinary

Hello,

Your file has been uploaded successfully. You can view it here:
<file-url>
```

---

## Folder Structure

```
.
├── models
│   └── File.js       # Mongoose schema for file metadata
├── routes
│   └── fileRoutes.js # API routes for file operations
├── .env              # Environment variables
├── server.js         # Main entry point
└── README.md         # Project documentation
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
