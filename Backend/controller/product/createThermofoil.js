const uploadProductPermission = require("../../helpers/permission");
const thermofoilModel = require("../../models/thermofoil");


async function createThermofoilHandler(req, res) {
    try {
        const sessionUserId = req.userId

        if(!await uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
        const thermofoilProduct = new thermofoilModel(req.body)
        const saveProduct = await thermofoilProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = createThermofoilHandler;