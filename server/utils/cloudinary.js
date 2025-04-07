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
      resource_type: "auto",
      folder: "avatars",
      quality: "auto",
    });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
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
    return null;
  }
};

const uploadOnCloudinaryMutliple = async (localFilePath) => {
  try {
    const uploadResult = localFilePath.map(async (f) => {
      const documentExtensions = [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".txt",
      ];
      const isDocument = documentExtensions.some((ext) =>
        f.toLowerCase().endsWith(ext)
      );

      const uploadOptions = {
        folder: "chats",
        quality: "auto",
        resource_type: isDocument ? "raw" : "auto",
      };

      const result = await cloudinary.uploader.upload(f, uploadOptions);

      if (isDocument && result.secure_url.includes("/image/upload/")) {
        result.secure_url = result.secure_url.replace(
          "/image/upload/",
          "/raw/upload/"
        );
        result.url = result.url.replace("/image/upload/", "/raw/upload/");
      }

      return result;
    });

    const uploadedFile = await Promise.all(uploadResult);
    console.log("uploadedFile", uploadedFile);

    // Cleanup local files
    localFilePath.forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });

    return { uploadedFile };
  } catch (error) {
    console.error("Upload failed:", error);
    localFilePath.forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
    return null;
  }
};

export { uploadOnCloudinary, uploadOnCloudinaryMutliple };
