import express from "express";
import { protect } from "../middlewares/authMiddleware.js"
import { 
    createTeam,
    getMyTeams
 } from "../controllers/teamController.js"
 import { 
    sendTeamInvitation,
    acceptTeamInvitation
  } from "../controllers/teamInvitationController.js";

const router = express.Router();

// All team routes require authentication/
router.use(protect);

// Create a new team.
router.post("/", createTeam);
// Retrieve teams
router.get("/", getMyTeams);

// Team invitations
router.post("/:teamId/invitations", sendTeamInvitation);
router.post("/invitations/accept", acceptTeamInvitation);

export default router;