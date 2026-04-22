import { v2 as cloudinary } from "cloudinary";

console.log("ENV CHECK:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;