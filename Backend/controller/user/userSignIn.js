const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
                success: false,
                error: true,
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false,
                error: true,
            });
        }

        //  JWT generation (check that this logs a value)
        console.log("JWT Secret:", process.env.TOKEN_SECRET_KEY);
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: '8h' }
        );

        //  Set cookie options (change secure to false if testing on localhost)
        const tokenOptions = {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: 'Lax',
        };

        //  Send token as cookie
        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful",
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true,
        });
    }
}

console.log("Loaded SECRET:", process.env.TOKEN_SECRET_KEY);

module.exports = userSignInController;
