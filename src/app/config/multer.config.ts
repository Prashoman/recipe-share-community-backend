import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfig } from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryConfig
})

export const multerUpload = multer({ storage });