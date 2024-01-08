const Product = require("../models/productModel");
const uploadToCloudinary = require("../utils/uploadFile") ; 

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        let imageUrl ="" ; 
        
        console.log(name , description , price , stock ) ;
        const image = req.files.image ; 
        

        if(!name || !description || !stock || !price ) {
            return res.status(402).json({
                success : false , 
                message : "Please enter all the fields"
            })
        }

        const isPresent = await Product.findOne({ name: name });
        
        if(isPresent) {
            return res.json({
                success: false,
                message: "Product already exist",
            });
        }
 console.log(image) ; 
        if(image){
        let i = 0 ; 
        do{
        var response = await  uploadToCloudinary(image , "Inventory") ; 
        imageUrl = response?.secure_url  ;
        i++ ; 
            }while( !response && i<50)
        
         
}
        

        const data = await Product.create({ name, description, price, stock , quantityLeft : stock , soldQuantity : 0 , image : imageUrl});

        res.status(200).json({
            success: true,
            message: "Product inserted successfully",
            data: "data"
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};


exports.fetchAllProducts = async(req , res)=>{
    try{

        const data = await Product.find({}) ; 

        return res.json({success : true , 
                        message : "Successfully fetched all the products",
                        data : data}) ;

    }catch(e){
        return res.status(500).json({
            success : false , 
            message : "Unable to fetch the products"
        })
    }
}


exports.getProductDetails = async(req , res)=>{
    try{
         const {id } = req.body  ; 
        

         const data = await Product.findOne({_id : id }) ; 

         return res.status(200).json({
            success : true  , 
            message :"Successfully fetched the product details" ,
            data : data 
         })
    }catch(e){
        return res.status(500).json({
            success : false , 
            message : "Unable to fetch the product details"
        })
    }
}



exports.addStock = async(req , res)=>{
    try{

        const {id , stockAdded} = req.body ;
        const response = await Product.findById(id) ;
    

        if( !response){return res.status(402).json({success : false , message : "Product can not be found"})} 

        const newData = await Product.findByIdAndUpdate(id , {$inc : {stock : stockAdded  , quantityLeft : stockAdded } } , {new : true })
        console.log(newData) ;
    
        res.status(200).json({
            success : true  , 
            message : "Successfully sold " , 
            data : newData  
        })

    }catch(e){
        console.log(e.message) ; 
        return res.status(500).json({
            success : false , 
            message : "Unable to add Stock" , 
            error : e.message
        })
    }
}

exports.deleteStock = async(req  ,res)=>{
    try{
          const {id} = req.body ; 
          const response = await Product.findById(id) ; 
          if(!response){
            return res.status(400).json({
                success : false , 
                message : "Stock not present"
            })
          }

           await Product.findByIdAndDelete(id) ; 
           return res.json({
            success: true , 
            message : "Stock deleted successfully"
           })

    }
    catch(e){
        return res.status(500).json({
            sucess : false , 
            message : "Unable to delete stock"
        })
    }
}


exports.getDashboardData = async(req ,res)=>{
    try{
        let products = await Product.find({}) ;
        let totalStock = 0; 
        let inStock = 0 ;
        let outOfStock = 0 ; 
        let sold = 0 ; 
         for(var product of products){
               inStock += product.quantityLeft  ; 
               sold += product.soldQuantity ; 
               totalStock += product.stock  ; 

               if(product.quantityLeft == 0 ){ outOfStock++ ;}
        }
         let response = { productCategory : products.length  , inStock : inStock  , outOfStock , sold , totalStock}
        console.log(response) ;
        return res.json({success : true , message :"Successfully got dashboard data" , data : response })
    }catch(e){
        return res.json({
            success : true , 
            message : "Failed to get dashboard data" ,
            error : e.message
        })
    }
}