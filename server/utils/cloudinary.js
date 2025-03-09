import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto', 
            folder: 'avatars',
        });

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto',
        });

        // Delete the local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Return the upload result and optimized URL
        return { uploadResult, optimizeUrl };
    } catch (error) {
        console.error("Upload failed:", error);

        // Delete the local file if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Return null or throw an error
        return null   
    }
};

export { uploadOnCloudinary };