const productModel = require("../../models/productModel")

const createPayment = async(req,res)=> {
    try {
        const {amount, items} = req.body;
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}


module.exports = createPayment