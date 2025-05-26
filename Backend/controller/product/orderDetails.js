const orderModel = require("../../models/orderModel")

const getAllOrderDetails = async(req,res)=> {
    try {
        const orders = await orderModel.find().populate('userId', 'name email').populate('orderItems.itemId', 'productName productImage price');
        return res.status(200).json({success: true, data: orders});
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}


module.exports = getAllOrderDetails