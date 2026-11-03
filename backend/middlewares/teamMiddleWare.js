
import mongoose from "mongoose";
import Team from "../models/Team.js";
import TeamMembership from "../models/TeamMembership.js";

export const verifyTeamMembership = async (req, res, next) => {
    try {
        const { teamId } = req.params;

        // 1. Validate the team ID
        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({
                message: "Invalid team ID.",
            });
        }

        // 2. Check whether the team exists and is active
        const team = await Team.findOne({
            _id: teamId,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found or inactive.",
            });
        }

        // 3. Check whether the logged-in user is an active member
        const membership = await TeamMembership.findOne({
            team: teamId,
            user: req.user._id,
            status: "active",
        });

        if (!membership) {
            return res.status(403).json({
                message: "You are not an active member of this team.",
            });
        }

        // 4. Attach team and membership information to the request
        req.team = team;
        req.teamMembership = membership;

        next();

    } catch (err) {
        console.error("Team membership verification error:", err);

        return res.status(500).json({
            message: "Failed to verify team membership.",
        });
    }
};
