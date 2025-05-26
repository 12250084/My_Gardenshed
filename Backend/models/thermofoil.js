const mongoose = require('mongoose')

//units - cm/inch/feet enum
const thermofoil = mongoose.Schema({
   name: String,
    brand: String,
    image: [],
    description: String,
    //cm/inch/feet
    unit : {
        type: String,
        enum: ['m', 'feet'],
        default: 'feet'
    },
    pricePerUnit: Number,
},{
    timestamps : true
})


const thermofoilModel = mongoose.model("thermofoil",thermofoil)

module.exports = thermofoilModel