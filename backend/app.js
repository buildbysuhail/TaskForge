import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

const app = express();
// ----------------------------------------------
// Gloabal Middleware
// ----------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ???

// ----------------------------------------------
// Routes (placeholder)
// ----------------------------------------------
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "TaskForge Backend API running"
    })
})

// ----------------------------------------------
// Error Middleware (later)
// ----------------------------------------------
// app.use(errorHandler);

export default app;