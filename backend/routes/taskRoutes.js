import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect); // Apply authentication middleware to all routes

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;