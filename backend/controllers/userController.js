const User = require('../models/userModel');
const Product = require('../models/productModel');
const Sale = require('../models/saleModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, confirmPassword, role } = req.body;

        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(402).json({
                success: false,
                message: "Please add all the fields"
            })
        }
        if (password.length < 6 || password.length > 20) {
            return res.status(402).json({
                success: false,
                message: "Please enter password ranging between 6 to 30 characters "
            })
        }

        if (password !== confirmPassword) {
            return res.status(402).json({
                success: false,
                message: "Password does not match"
            })
        }

        const isPresent = await User.findOne({ email: email });
        if (isPresent) {
            return res.status(404).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({ name, email, password: hashedPassword, role });

        return res.status(200).json({
            success: true,
            message: "Successfully signed up",
            data: data
        })

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(402).json({
                success: false,
                message: "Please enter all the fields",
            });
        }

        const user = await User.find({ email });

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user exist for this account",
            });
        }


        const isValid = await bcrypt.compare(password, user[0]?.password);
        if (isValid) {
            const payload = {
                email: user[0].email,
                id: user[0]._id,
                role: user[0].role

            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            console.log(token);

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token: token,
                user,
                message: "Successfully logged in ",
            });
        } else {
            return res.status(402).json({
                success: false,
                message: "Incorrect Password",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Can not get user",
            error: e.message,
        });
    }
};


exports.getAllUser = async (req, res) => {
    try {

        const response = await User.find({});

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all users",
            data: response
        })

    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: "Failed to load all users",
            error: e.message
        })
    }
}


// Controller function to get a list of all users with total products sold and total price
exports.getUsersWithTotalSales = async (req, res) => {
    try {
        const users = await User.find();
       
        // Create an array to store user summaries
        const userSummaries = [];

        for (const user of users) {
            const salesByUser = await Sale.findOne({ seller: user._id });
            console.log(salesByUser?.sale) ; 
            // Calculate total products sold and total price for this user
            let totalProductsSold = 0;
            let totalPrice = 0;
           
            if(salesByUser?.sale && salesByUser?.sale?.length  > 0 ){
            for (const sale of salesByUser?.sale) {
                
                const product = await Product.findById(sale.product);
                totalProductsSold += sale.quantity;
                totalPrice += sale.quantity * product.price;
            }
        }
            userSummaries.push({
                _id: user._id,
                email : user.email , 
                role : user.role ,
                name: user.name,
                totalProductsSold,
                totalPrice,
            });
        }

        // Send the user summaries as the response
        res.status(200).json({ success : true , message : "Successfully fetched " , data :userSummaries});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}