const mongoose = require("mongoose") ; 


const saleSchema = new mongoose.Schema({
 
    seller :{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , required : true  , 
        unique : true 
    } , 
    sale : [{
        buyer :{
            type : String,
            required : true 
        } , 
        product :{
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Product"  , 
            requried : true 
        } , 

    quantity : {
        type : Number , 
        required : true 
    } , 

    mode  :{
        type : String  , 
        enum : ['Cash' , 'UPI' , "Card"]  , 
        default : "Cash"
    } , 
    billId : {
        type : String , 
        required : true , 
        default : "23v444534b4"
    }

    }]  
})
module.exports = mongoose.model("Sale" , saleSchema) ; 

// const saleSchema = new mongoose.Schema({
//     buyer :{
//         type : String,
//         required : true 
//     } ,
//     seller :{
//         type : mongoose.Schema.Types.ObjectId , 
//         ref : "User" , required : true 
//     } , 
//     sale : [{

//     }] , 
//     product :{
//         type : mongoose.Schema.Types.ObjectId ,
//         ref : "Product"  , 
//         requried : true 
//     } , 
//     quantity : {
//         type : Number , 
//         required : true 
//     } , 
//     mode  :{
//         type : String  , 
//         enum : ['Cash' , 'UPI' , "Card"]  , 
//         default : "Cash"
//     } , 
//     billId : {
//         type : String , 
//         required : true , 
//         default : "23v444534b4"
//     }
    
// })
// module.exports = mongoose.model("Sale" , saleSchema) ; 