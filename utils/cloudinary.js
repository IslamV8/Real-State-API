const cloudinary = require("cloudinary").v2;
const { model } = require("mongoose");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.VLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "real-estate",
        allowed_formates: ["jpg", "png", "jpeg"],
    },
});


model.exports = {
    cloudinary,
    storage,
};