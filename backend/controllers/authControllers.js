import bcrypt from "bcryptjs";
import User from "../models/User.js";
// import { use } from "react";
import generateToken from "../utils/generateToken.js";

// ---------------------------------
// Register User
// ---------------------------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ---------------------------------
// Login User
// ---------------------------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    //Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required monu" })
        }

    // Invalid Credentials
        // Find user + explicitly include password
        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            return res.status(401).json({ message: "Invalide credentials, email sherik kodkeda" })
        }
        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials, password shrik kodk monu" })
        }

        // res.status(200).json({
        //     message: "Login successfull",
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email
        //     }
        // });

        const token = generateToken(user?._id);

        res.status(200).json({
            message: "Login successful",
            token,
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
