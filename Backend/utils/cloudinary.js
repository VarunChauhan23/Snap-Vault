const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: './config.env' });

cloudinary.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api_Key,
  api_secret: process.env.Cloudinary_Api_Secret,
});

module.exports = cloudinary;