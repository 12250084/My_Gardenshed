const uploadProductPermission = require("../../helpers/permission");
const thermofoilModel = require("../../models/thermofoil");


async function getAllThermofoil(req, res) {
    try {
        const thermofoilProducts = await thermofoilModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Thermofoil products fetched successfully",
            error: false,
            success: true,
            data: thermofoilProducts
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = getAllThermofoil;