// npm install cloudinary@1.25.0 multer-storage-cloudinary@4.0.0
require("dotenv").config();


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    allowed_formats: ["jpg", "png", "jpeg","avif"], 
  },
});

module.exports=storage