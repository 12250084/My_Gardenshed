const cartModel = require("../../models/cartProduct")
const orderModel = require('../../models/orderModel'); // Assuming you have an order model

const submitOrder = async (req, res) => {
    try {
        // Assuming you have a user ID in the session or token
        const userId = req.userId; // Adjust according to your authentication method
        const {orderId} = req.body; // Assuming you pass the order ID in the request parameters
        if(orderId){
            const order = await orderModel.findById(orderId);
            order.paymentStatus = "paid";
            await order.save();
        }
        // Respond with success message
        res.status(200).json({ success: true, message: "Order Submitted successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = submitOrder