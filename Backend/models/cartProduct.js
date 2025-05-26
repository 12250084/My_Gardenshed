const mongoose = require('mongoose')

const addToCart = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType' // this tells Mongoose which model to populate from
    },
    itemType: {
        type: String,
        enum: ['product', 'thermofoil'], // Make sure these match actual model names
        required: true
    },
    quantity: Number,
    userId: String
}, {
    timestamps: true
});


const addToCartModel = mongoose.model("addToCart",addToCart)

module.exports = addToCartModel