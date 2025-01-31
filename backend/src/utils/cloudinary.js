import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises for better async handling

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Upload File to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is required.");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect file type
    });

    // Delete the local file after upload
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    // Ensure local file is deleted even on failure
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.warn("Failed to delete local file:", unlinkError.message);
    }
    return null;
  }
};

// Delete an Image from Cloudinary
const deleteImageToCloudinary = async (cloudinaryFilePath) => {
  try {
    if (!cloudinaryFilePath) {
      throw new Error("Cloudinary file path is required.");
    }

    const fileName = cloudinaryFilePath.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(fileName, {
      resource_type: "image",
    });

    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message);
    return null;
  }
};

// Delete a Video from Cloudinary
const deleteVideoToCloudinary = async (cloudinaryFilePath) => {
  try {
    if (!cloudinaryFilePath) {
      throw new Error("Cloudinary file path is required.");
    }

    const fileName = cloudinaryFilePath.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(fileName, {
      resource_type: "video",
    });

    return result;
  } catch (error) {
    console.error("Error deleting video from Cloudinary:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteImageToCloudinary, deleteVideoToCloudinary };
