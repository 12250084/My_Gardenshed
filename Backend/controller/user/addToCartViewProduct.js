const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")
const thermofoilModel = require("../../models/thermofoil")
const addToCartViewProduct = async(req,res)=>{
    try{
        const currentUser = req.userId

        //populate the product details in the cart based on the itemType
        const allProduct = await addToCartModel.find({ userId: currentUser })
            .populate('itemId');


        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  addToCartViewProduct