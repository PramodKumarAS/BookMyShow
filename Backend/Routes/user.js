const express=require("express");
const userModel = require("../Model/users")
const userRouter =  express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/authMiddleware");
const emailHelper = require('../Config/emailHelper');

const otpGenerator = function () {
    return Math.floor((Math.random() * 10000) + 90000);
}

userRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔴 1. Required field validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 🔴 2. Empty / whitespace validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Fields cannot be empty"
            });
        }

        // 🔴 3. Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // 🔴 4. Gmail domain validation
        if (!email.toLowerCase().endsWith("@gmail.com")) {
            return res.status(400).json({
                success: false,
                message: "Only Gmail accounts are allowed"
            });
        }

        // 🔴 5. Password strength validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const strongPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
        if (!strongPassword.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain uppercase and special character"
            });
        }

        // 🔴 6. Duplicate user check
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // 🔐 7. Hash password
        const hashedPassword = await hashPassword(password);

        // ✅ 8. Create user safely
        const user = new userModel(req.body);
        user.password = hashedPassword;

        await user.save();

        // ✅ 9. Correct status code
        return res.status(201).json({
            success: true,
            message: "Registration is successful",
            data: {
                userId: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔴 400 VALIDATIONS
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid data type"
            });
        }

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email and password cannot be empty"
            });
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // 🔵 ACTUAL AUTH LOGIC
        const user = await userModel.findOne({ email });

        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            token,
            message: "Successfully logged in!",
            role: user.role
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});

userRouter.get('/get-currentUser',authMiddleware, async (req, res) => {

    try {

        const userId=req.userId;

        if (!userId) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong! Try again"
            })
        }

        const user = await userModel.findById(userId).select("-password");
    
        res.status(200).send({
            success:true,
            user
        });  

    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal Server Error!!",
        });        

    }
});

userRouter.post('/forgetpassword', async function (req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            const otp = otpGenerator();

            user.otp = otp;
            user.otpExpiry = Date.now() + 10 * 60 * 1000;
            await user.save();

            await emailHelper("otp.html", user.email, {
                name: user.name,
                otp: otp
            });
        }

        return res.status(200).json({
            success: true,
            message: "If the email exists, an OTP has been sent"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
});

userRouter.post('/resetpassword',async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 
    try {
        let resetDetails = req.body;
        // required fields are there or not 
        if (!resetDetails.password == true || !resetDetails.otp == true) {
            return res.status(401).json({
                status: "failure",
                message: "invalid request"
            })
        }
        // it will serach with the id -> user
        const user = await userModel.findOne({ otp: req.body.otp });
        // if user is not present
        if (user == null) {
            return res.status(400).json({
                status: "failure",
                message: "OTP is wrong"
            })
        }
        // if otp is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired"
            })
        }

        // If we are till here, that means
        // If we identified the user with the OTP
        // OTP is within validaity period
        // Now we need to update the user with the password

        const salt = 10
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword
        // remove the otp from the user
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
});

async function hashPassword(password) {
    const saltRounds=10;
    return await bcrypt.hash(password,saltRounds);
}

async function verifyPassword(password,hash) {
    return await bcrypt.compare(password,hash)
}

module.exports=userRouter;
