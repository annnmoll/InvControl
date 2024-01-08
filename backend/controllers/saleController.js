const Product = require('../models/productModel');
const Sale = require('../models/saleModel');
const User = require('../models/userModel');


exports.sellProduct = async (req, res) => {
    try {
        const { id, productsSold, buyer } = req.body;

        const response = await Product.findById(id);

        if (!response) { return res.status(402).json({ success: false, message: "Product can not be found" }) }
        else if (response.quantityLeft === 0 || response.quantityLeft < productsSold) { return res.status(402).json({ success: false, message: "Stock already out of stock" }) }

        await Product.findByIdAndUpdate(id, { $inc: { soldQuantity: productsSold, quantityLeft: -productsSold } })

        var data = await Sale.findOne({ seller: req.user.id });

        if (!data) {
            data = await Sale.create({ seller: req.user.id, sale: [{ buyer: buyer, product: id, quantity: productsSold }] })
        }
        else {
            console.log('else')
            data = await Sale.findOneAndUpdate({ seller: req.user.id }, { $push: { sale: { buyer: buyer, product: id, quantity: productsSold } } })
        }


        res.status(200).json({
            success: true,
            message: "Successfully sold ",
            data: data
        })
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Unable to sell product",
            error: e.message
        })
    }
}