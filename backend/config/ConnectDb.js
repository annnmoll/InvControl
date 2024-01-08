const mongoose = require('mongoose') ;
require('dotenv').config() ; 
const DB_URL = process.env.DB_URL ;

const dbConnect = async()=>{
    
        await mongoose.connect(DB_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(()=>{ console.log('Successfully connected to database')})
            .catch((e)=>{console.log(e.message)}) ;


}


module.exports = dbConnect