
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
require('dotenv').config();



exports.auth = async (req, res, next) => {

    try {
        //extract token 
        const token =req.headers?.authorization.split(' ')[1];
        console.log(token)
        
      
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        const isUser = await User.findOne({_id : decode.id}) ;
        if(!isUser){
            return res.status(400).json({
                success : false , 
                message : "Not an authorized user" 
            })
        }
        req.user = decode;
        
        next();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: 'Can not find token',
            error: e.message
        })
    }

}


exports.isSalesman = async (req, res, next) => {

    try {
        const token =req.headers?.authorization.split(' ')[1];
        
        
      
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        
        if(decode.role !== 'Salesman'){
            return res.status(401).json({
                success : false , 
                message : "This route is for admin only "
            })
        }


       
         next() ; 
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: 'Error in isSalesman middleware',
            error: e.message
        })
    }


}


exports.isAdmin = async (req, res, next) => {

    try {
        const token =req.headers?.authorization.split(' ')[1];
        
        
      
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        
        if(decode.role !== 'Admin'){
            return res.status(401).json({
                success : false , 
                message : "This route is for admin only "
            })
        }

         next() ; 
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: 'Error in isAdmin middleware ',
            error: e.message
        })
    }


}