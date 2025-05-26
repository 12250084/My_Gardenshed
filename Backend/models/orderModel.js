const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems : [{
        itemId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product"
        },
        itemType : {
            type : String,
            enum : ["thermofoil","product"]
        },
        quantity : {
            type : Number,
            required : true
        }
    }],
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    address : {
        type : String,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    paymentStatus : {
        type : String,
        enum : ["pending","paid","failed"],
        default : "pending"
    },
    phoneNumber : {
        type : String,
        required : true
    }
},{
    timestamps : true
})


const productModel = mongoose.model("order",orderSchema)

module.exports = productModel