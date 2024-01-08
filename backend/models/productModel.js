const mongoose = require('mongoose') ; 


const productSchema = new mongoose.Schema({
    name :{
        type : String , 
        unique : true , 
        required : true 
    } , 
    image :{
        type  : String , 
        required : true 
    } , 
    description : {
        type : String  ,
        required : true 
    } , 
    price :{
        type :Number , 
        required : true 
    } , 
    stock : {
        type : Number , 
        required : true 
    } , 
    
    quantityLeft :{
        type : Number , 
        requried : true 

    } , 
    soldQuantity : {
        type : Number , 
        required : true 
    }
} , {
    timestamps : true 
})

module.exports = mongoose.model("Product" , productSchema) ; 
// product 
// quantity 
