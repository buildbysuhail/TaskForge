import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [ true, "Name is required"],
            trim: true,
            minLength: [3, "Name must be atleast 3 characters"] 
        }, 
        email: {
            type: String,
            required: [true, "Email is mandatory"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is important"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false 
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema); // Yes im registering 'userSchema into DB called 'User''

export default User;
