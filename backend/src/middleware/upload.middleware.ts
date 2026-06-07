import multer from "multer";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

export const upload = ()=>{
    return multer({dest:'./src/uploads/'})
}

// Initialize Cloudinary configuration
const initializeCloudinary = () => {
    if (!process.env.CLOUDINARY_API_KEY) {
        throw new Error("CLOUDINARY_API_KEY is not defined in environment variables");
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error("CLOUDINARY_API_SECRET is not defined in environment variables");
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error("CLOUDINARY_CLOUD_NAME is not defined in environment variables");
    }

    cloudinary.config({
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    });
};

export const uploadProduct = async(images:[any])=>{
    // Initialize Cloudinary before uploading
    initializeCloudinary();
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    try {



      const imageUrls:string[] = [];
      // Upload multiple product images to Cloudinary
      for(const image of images){
        const result = await cloudinary.uploader.upload(image.path, options);
        imageUrls.push(result.secure_url);
      }

      for(const image of images){
        fs.unlink(image.path,(err)=>{
          if(err){
            console.error(`Failed to delete local file ${image.path}:`, err);
          }else{
            console.log(`Successfully deleted local file ${image.path}`);
          }
        })
      }

      return imageUrls;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload images to Cloudinary");
    }
}