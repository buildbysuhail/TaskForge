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