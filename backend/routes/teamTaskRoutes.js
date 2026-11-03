
import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { verifyTeamMembership } from "../middlewares/teamMiddleWare.js";

import {
    createTeamTask,
    getTeamTasks,
    updateTeamTask,
    deleteTeamTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Authenticate the user for every route
router.use(protect);

// Verify that the user belongs to the requested team
// router.use(verifyTeamMembership);

// Team task CRUD
router.post("/:teamId/tasks", verifyTeamMembership, createTeamTask);
router.get("/:teamId/tasks", verifyTeamMembership, getTeamTasks);
router.patch("/:teamId/tasks/:id", verifyTeamMembership, updateTeamTask);
router.delete("/:teamId/tasks/:id", verifyTeamMembership, deleteTeamTask);

export default router;

