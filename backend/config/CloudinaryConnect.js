const cloudinary = require("cloudinary").v2 ; 
require('dotenv').config() ; 


const cloudinaryConnect = async()=>{
    try{
        await cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API, 
            api_secret: process.env.CLOUD_APISECRET ,
            
          });

          console.log("connected to cloudinary successfull")
    }catch(e){
        console.log(e.message)
    }
}


module.exports = cloudinaryConnect























