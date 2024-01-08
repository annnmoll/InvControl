const express = require("express") ; 
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router() ; 
const {sellProduct} = require('../controllers/saleController') ; 


router.post('/' , auth  , sellProduct) ; 

module.exports = router ; 