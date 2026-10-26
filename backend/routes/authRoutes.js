import express from "express";
import { 
    registerUser,
    loginUser,
    verifyEmail,
    resendVerificationEmail
} from "../controllers/authControllers.js"
import { protect } from "../middlewares/authMiddleware.js";
// import generateVerificationToken from "../utils/generateVerificationToken.js";
// import sendEmail from "../services/emailService.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail)
router.post("/resend-verification", resendVerificationEmail)

// test protected route:
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed",
        user: req.user,
    });
});

export default router;