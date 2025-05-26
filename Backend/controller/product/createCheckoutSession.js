const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your Stripe test secret key
const orderModel = require('../../models/orderModel'); // Assuming you have an order model


const createCheckoutSession = async (req, res) => {
    const { cartItems,address,phoneNo } = req.body;

    try {
        const line_items = cartItems.map(item => {
            const product = item.itemType === 'thermofoil' ? item.itemId : item.itemId;
            const name = item.itemType === 'thermofoil' ? product.name : product.productName;
            const price = item.itemType === 'thermofoil' ? product.pricePerUnit : product.sellingPrice;

            return {
                price_data: {
                    //australian dollar
                    currency: 'aud',
                    product_data: {
                        name,
                    },
                    unit_amount: Math.round(price * 100), // Stripe accepts amount in cents
                },
                quantity: item.quantity,
            };
        });
        console.log(cartItems)

        const order = new orderModel({
            orderItems : cartItems,
            userId: req.userId,
            address : address,
            totalPrice: cartItems.reduce((total, item) => {
                const price = item.itemType === 'thermofoil' ? item.itemId.pricePerUnit : item.itemId.sellingPrice;
                return total + (price * item.quantity);
            }, 0),
            phoneNumber : phoneNo,

        })
        await order.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: 'http://localhost:3000/success?orderId=' + order._id,
            cancel_url: 'http://localhost:3000/cancel?orderId=' + order._id,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = createCheckoutSession;