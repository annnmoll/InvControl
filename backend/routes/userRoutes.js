const express = require('express') ;
const router = express.Router() ; 
const {registerUser ,  loginUser, getAllUser , getUsersWithTotalSales} = require('../controllers/userController') ;
const {isAdmin} = require('../middlewares/authMiddleware')


router.post("/register" ,isAdmin , registerUser  ) ;
router.post("/login" , loginUser) ; 
router.get('/' , isAdmin , getUsersWithTotalSales) ; 



module.exports =  router  ; 