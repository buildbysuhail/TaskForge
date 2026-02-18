import express from "express";
import { registerUser, loginUser } from "../controllers/authControllers.js"
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// test protected route:
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "Protected route accessed",
        user: req.user,
    });
});

export default router;