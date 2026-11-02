import Team from "../models/Team.js";
import TeamMembership from "../models/TeamMembership.js";

export const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Team name is required.",
            });
        }

        // Step 1: Create the team.
        const team = await Team.create({
            name,
            description,
            createdBy: req.user._id,
        });

        try {
            // Step 2: Automatically assign the creator as owner.
            await TeamMembership.create({
                team: team._id,
                user: req.user._id,
                role: "owner",
                status: "active",
            });

        } catch (membershipError) {

            // Step 3: Roll back team creation if membership fails.
            await Team.findByIdAndDelete(team._id);

            throw membershipError;
        }

        return res.status(201).json({
            message: "Team created successfully.",
            team,
        });

    } catch (err) {
        console.error("Team creation error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};

export const getMyTeams = async (req, res) => {
    try {
        const memberships = await TeamMembership.find({
            user: req.user._id,
            status: "active",
        })
            .populate({
                path: "team",
                match: { isActive: true },
                select: "name description createdBy isActive createdAt updatedAt"
            })
            .sort({ joinedAt: -1 });

        const teams = memberships
            .filter((membership) => membership.team)
            .map((membership) => ({
                ...membership.team.toObject(),
                role: membership.role,
                joinedAt: membership.joinedAt,
            }));

        return res.status(200).json({ teams });

    } catch (err) {
        console.error("Get teams error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};

export const getTeamMembers = async (req, res) => {
    try {
        const { teamId } = req.params;

        // Step 1: Check whether the team exists and is active.
        const team = await Team.findOne({
            _id: teamId,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found.",
            });
        }

        // Step 2: Verify that the requester is an active team member.
        const requesterMembership = await TeamMembership.findOne({
            team: teamId,
            user: req.user._id,
            status: "active",
        });

        if (!requesterMembership) {
            return res.status(403).json({
                message: "You don't have permission to view this team's members.",
            });
        }

        // Step 3: Retrieve all active members and their user details.
        const memberships = await TeamMembership.find({
            team: teamId,
            status: "active",
        })
            .populate({
                path: "user",
                select: "name email",
            })
            .sort({ joinedAt: 1 });

        // Step 4: Format the response.
        const members = memberships
            .filter((membership) => membership.user)
            .map((membership) => ({
                user: {
                    _id: membership.user._id,
                    name: membership.user.name,
                    email: membership.user.email,
                },
                role: membership.role,
                joinedAt: membership.joinedAt,
            }));

        return res.status(200).json({
            members,
        });

    } catch (err) {
        console.error("Get team members error:", err);

        return res.status(500).json({
            message: "Failed to retrieve team members.",
        });
    }
};

export const removeTeamMember = async (req, res) => {
    try {
        const { teamId, userId } = req.params;

        // Step 1: Check whether the team exists and is active.
        const team = await Team.findOne({
            _id: teamId,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found.",
            });
        }

        // Step 2: Verify the requester's membership.
        const requesterMembership = await TeamMembership.findOne({
            team: teamId,
            user: req.user._id,
            status: "active",
        });

        if (!requesterMembership) {
            return res.status(403).json({
                message: "You are not a member of this team.",
            });
        }

        // Step 3: Only owners and admins can remove members.
        if (!["owner", "admin"].includes(requesterMembership.role)) {
            return res.status(403).json({
                message: "You don't have permission to remove members.",
            });
        }

        // Prevent users from removing themselves through this endpoint.
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot remove yourself using this endpoint.",
            });
        }

        // Step 4: Find the target member.
        const targetMembership = await TeamMembership.findOne({
            team: teamId,
            user: userId,
            status: "active",
        });

        if (!targetMembership) {
            return res.status(404).json({
                message: "Active team member not found.",
            });
        }

        // Step 5: Protect the team owner.
        if (targetMembership.role === "owner") {
            return res.status(403).json({
                message: "The team owner cannot be removed.",
            });
        }

        // Admins can only remove regular members.
        if (
            requesterMembership.role === "admin" &&
            targetMembership.role !== "member"
        ) {
            return res.status(403).json({
                message: "Admins can only remove regular members.",
            });
        }

        // Step 6: Deactivate the membership.
        targetMembership.status = "inactive";
        await targetMembership.save();

        return res.status(200).json({
            message: "Team member removed successfully.",
        });

    } catch (err) {
        console.error("Remove team member error:", err);

        return res.status(500).json({
            message: "Failed to remove team member.",
        });
    }
};

export const changeTeamMemberRole = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const { role } = req.body;

        // Step 1: Validate the requested role.
        if (!["admin", "member"].includes(role)) {
            return res.status(400).json({
                message: "Role must be either admin or member.",
            });
        }

        // Step 2: Check whether the team exists and is active.
        const team = await Team.findOne({
            _id: teamId,
            isActive: true,
        });

        if (!team) {
            return res.status(404).json({
                message: "Team not found.",
            });
        }

        // Step 3: Only the owner can change member roles.
        const requesterMembership = await TeamMembership.findOne({
            team: teamId,
            user: req.user._id,
            status: "active",
        });

        if (!requesterMembership) {
            return res.status(403).json({
                message: "You are not a member of this team.",
            });
        }

        if (requesterMembership.role !== "owner") {
            return res.status(403).json({
                message: "Only the team owner can change member roles.",
            });
        }

        // Step 4: Prevent the owner from changing their own role.
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot change your own role.",
            });
        }

        console.log("ROLE UPDATE DEBUG:", {
    teamId,
    userId,
    requesterId: req.user._id.toString(),
    database: TeamMembership.db.name,
    collection: TeamMembership.collection.name,
});

        // Step 5: Find the target member.
        const targetMembership = await TeamMembership.findOne({
            team: teamId,
            user: userId,
            status: "active",
        });

        console.log("TARGET MEMBERSHIP:", targetMembership);

        if (!targetMembership) {
            return res.status(404).json({
                message: "Active team member not found.",
            });
        }

        // Step 6: Protect the current owner.
        if (targetMembership.role === "owner") {
            return res.status(403).json({
                message: "The owner's role cannot be changed here.",
            });
        }

        // Step 7: Update the role.
        targetMembership.role = role;
        await targetMembership.save();

        return res.status(200).json({
            message: "Team member role updated successfully.",
            member: {
                userId: targetMembership.user,
                role: targetMembership.role,
            },
        });

    } catch (err) {
        console.error("Change team member role error:", err);

        return res.status(500).json({
            message: "Failed to update team member role.",
        });
    }
};