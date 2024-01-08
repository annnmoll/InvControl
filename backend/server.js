const express = require('express') ;
require('dotenv').config() ; 
const PORT = process.env.PORT
const cors = require('cors') ; 
const dbConnect = require('./config/ConnectDb') ;
const userRoutes = require('./routes/userRoutes') ; 
const productRoutes = require("./routes/productRoutes") ; 
const saleRoutes = require("./routes/saleRoutes")
const cloudinaryConnect = require('./config/CloudinaryConnect')
const fileUpload = require('express-fileupload')

const app = express() ;

app.use(express.json()) ;
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.urlencoded({extended : false })) ; 
app.use(cors()) ;
app.use('/api/user' , userRoutes) ; 
app.use("/api/product" , productRoutes) ; 
app.use("/api/sell" , saleRoutes) ; 

app.get('/' , (req , res)=> {res.send("Hello")}) ;
app.listen(PORT , ()=>{console.log(`Server started successfully at ${PORT}`)}) ;  
dbConnect() ; 
cloudinaryConnect()  ; 




