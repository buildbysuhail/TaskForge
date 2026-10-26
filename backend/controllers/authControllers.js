import bcrypt from "bcryptjs";
import User from "../models/User.js";
// import { use } from "react";
import generateToken from "../utils/generateToken.js";
import generateVerificationToken from "../utils/generateVerificationToken.js";
import sendEmail from "../services/emailService.js";
import crypto from "crypto";

// ---------------------------------
// Register User
// ---------------------------------

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate the required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required."
            });
        }

        // 2. Normalize the email
        const normalizedEmail = email.trim().toLowerCase();

        console.log("User model database:", User.db.name);
// console.log("User model host:", User.db.host);
// console.log("Email being checked:", normalizedEmail);

        // 3. Check whether this email is already registered
        const userExist = await User.findOne({
            email: normalizedEmail
        });

        console.log("Existing user found:", Boolean(userExist));

        if (userExist) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Generate a separate email-verification token
        const {
            rawToken,
            hashedToken,
            expiresAt
        } = generateVerificationToken();

        // 6. Save the user and verification data
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            isEmailVerified: false,
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpires: expiresAt
        });

        // 7. Construct the verification URL
        // const backendUrl =
        //     process.env.BACKEND_URL ||
        //     `http://localhost:${process.env.PORT || 7000}`;
        
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

        // const verificationUrl =
        //     `${backendUrl}/api/auth/verify-email?token=${encodeURIComponent(rawToken)}`;
        const verificationUrl =
            `${frontendUrl}/verify-email?token=${encodeURIComponent(rawToken)}`;

        // 8. Send the verification email
        try {
            await sendEmail({
                to: user.email,
                subject: "Verify your TaskForge email",
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>Welcome to TaskForge, ${user.name}!</h2>
                        <p>Please verify your email address to activate your account.</p>

                        <p>
                            <a href="${verificationUrl}"
                               style="display:inline-block;padding:12px 20px;
                               background:#2563eb;color:white;text-decoration:none;
                               border-radius:6px;">
                                Verify Email
                            </a>
                        </p>

                        <p>This link expires in 30 minutes.</p>
                        <p>If you didn't create this account, you can ignore this email.</p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error("Verification email failed:", emailError.message);

            // Remove the account if its verification email could not be sent
            await User.findByIdAndDelete(user._id);

            return res.status(502).json({
                message: "We couldn't send the verification email. Please try registering again."
            });
        }

        // 9. Registration is complete, but the account is not verified yet
        return res.status(201).json({
            message: "Registration successful. Please check your email to verify your account."
        });

    } catch (err) {
        console.error("Registration error:", err);

        return res.status(500).json({
            message: "Something went wrong during registration."
        });
    }
};



export const verifyEmail = async (req, res) => {
    try {
        // 1. Read the raw token from the email link
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                message: "Verification token is required."
            });
        }

        // 2. Hash the token to match the value stored in MongoDB
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        console.log("Verification request received");
        console.log("Token provided:", Boolean(token));
        console.log("Hash generated from URL token:", hashedToken);

        const storedUser = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: new Date() }
});

console.log("Matching unexpired token found:", Boolean(storedUser));

        // 3. Find the user with a matching, unexpired token
        const user = await User.findOneAndUpdate(
            {
                emailVerificationToken: hashedToken,
                emailVerificationTokenExpires: {
                    $gt: new Date()
                }
            },
            {
                $set: {
                    isEmailVerified: true
                },
                $unset: {
                    emailVerificationToken: 1,
                    emailVerificationTokenExpires: 1
                }
            },
            {
                new: true
            }
        );

        // 4. Reject invalid or expired tokens
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification link."
            });
        }

        // 5. Confirm successful verification
        return res.status(200).json({
            message: "Email verified successfully. You can now log in."
        });

    } catch (err) {
        console.error("Email verification error:", err);

        return res.status(500).json({
            message: "Something went wrong during email verification."
        });
    }
};

// ---------------------------------
// Resend Verification Email
// ---------------------------------
export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Validate input
        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            });
        }

        // 2. Normalize the email
        const normalizedEmail = email.trim().toLowerCase();

        // 3. Find the existing user
        const user = await User.findOne({
            email: normalizedEmail
        }).select(
            "+emailVerificationToken +emailVerificationTokenExpires"
        );

        // Return a generic response to avoid revealing whether an account exists
        const genericMessage =
            "If an unverified account exists for this email, a verification email will be sent.";

        if (!user) {
            return res.status(200).json({
                message: genericMessage
            });
        }

        // 4. Stop if the account is already verified
        if (user.isEmailVerified) {
            return res.status(200).json({
                message: "This email address is already verified. You can log in."
            });
        }

        // 5. Generate a fresh verification token
        const {
            rawToken,
            hashedToken,
            expiresAt
        } = generateVerificationToken();

        // 6. Replace the previous token with the new token
        user.emailVerificationToken = hashedToken;
        user.emailVerificationTokenExpires = expiresAt;

        await user.save();

        // 7. Build the verification URL
        // const backendUrl =
        //     process.env.BACKEND_URL ||
        //     `http://localhost:${process.env.PORT || 7000}`;

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

        const verificationUrl =
            // `${backendUrl}/api/auth/verify-email?token=${encodeURIComponent(rawToken)}`;
            `${frontendUrl}/verify-email?token=${encodeURIComponent(rawToken)}`;

        // 8. Send the new verification email
        try {
            await sendEmail({
                to: user.email,
                subject: "Your new TaskForge verification link",
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>Verify your TaskForge email</h2>

                        <p>You requested a new verification link.</p>

                        <p>
                            <a
                                href="${verificationUrl}"
                                style="display:inline-block;padding:12px 20px;
                                background:#2563eb;color:white;text-decoration:none;
                                border-radius:6px;"
                            >
                                Verify Email
                            </a>
                        </p>

                        <p>This link expires in 30 minutes.</p>

                        <p>If you did not request this email, you can ignore it.</p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error(
                "Resending verification email failed:",
                emailError.message
            );

            return res.status(502).json({
                message: "We couldn't send the verification email. Please try again later."
            });
        }

        // 9. Respond to the request
        return res.status(200).json({
            message: genericMessage
        });

    } catch (err) {
        console.error("Resend verification error:", err);

        return res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
};


// ---------------------------------
// Login User
// ---------------------------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    //Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." })
        }

        const normalizedEmail = email.trim().toLowerCase();

    // Invalid Credentials
        // Find user + explicitly include password
        const user = await User.findOne({
             email: normalizedEmail
            }).select("+password");

        if(!user) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in."
            });
        }
        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials, incorrect password" })
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
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const createTeamMember = async (req, res) => {

// }
