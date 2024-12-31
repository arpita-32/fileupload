const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("FILE ->", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path);

        file.mv(path, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Error in file upload'
                });
            }
        });

        res.json({
            success: true,
            message: 'Local file upload successfully'
        });
    } catch (error) {
        console.error("Not able to upload the file on server:", error);
        res.status(500).json({
            success: false,
            message: 'Server error in file upload'
        });
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    try {
        const options = {
            folder,
            resource_type: "auto",
            timeout: 120000  // Increased timeout for larger files
        };
        
        if (quality) {
            options.quality = quality;
        }

        console.log('Uploading to Cloudinary with options:', options);
        console.log('File temp path:', file.tempFilePath);
        
        const response = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log('Cloudinary response:', response);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        const response = await uploadFileToCloudinary(file, "Web");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: 'No video file uploaded'
            });
        }

        const file = req.files.videoFile;
        console.log('Video file:', file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        const response = await uploadFileToCloudinary(file, "Web");
        console.log('Cloudinary response:', response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video successfully uploaded'
        });
    } catch (error) {
        console.error('Video upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Video upload failed',
            error: error.message
        });
    }
}


exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: 'No image file uploaded'
            });
        }

        const file = req.files.imageFile;
        console.log('Image file:', file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        // Upload with compression
        const response = await uploadFileToCloudinary(file, "Web", 30);
        console.log('Cloudinary response:', response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded with reduced size'
        });
    } catch (error) {
        console.error('Image size reducer error:', error);
        res.status(500).json({
            success: false,
            message: 'Image compression failed',
            error: error.message
        });
    }
}