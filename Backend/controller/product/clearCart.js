const cartModel = require("../../models/cartProduct")
const orderModel = require('../../models/orderModel'); // Assuming you have an order model

const clearCart = async (req, res) => {
    try {
        // Assuming you have a user ID in the session or token
        const userId = req.userId; // Adjust according to your authentication method
        // Clear the cart for the user
        await cartModel.deleteMany({ userId });
        // Respond with success message
        res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = clearCart