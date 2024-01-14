const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (file, folder) => {
  try {
    const options = { folder };
    return   await cloudinary.uploader.upload(file.tempFilePath, options);
    
  } catch (e) {
    console.log(e.message);
  } 
};

module.exports = uploadToCloudinary;
