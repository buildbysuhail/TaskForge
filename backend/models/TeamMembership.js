import mongoose from "mongoose";

const teamMembershipSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, 

        role: {
            type: String,
            enum: ["owner", "admin", "member"],
            default: "member",
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// A user can only have one membership record per team.
teamMembershipSchema.index(
    { team: 1, user: 1 },
    { unique: true }
);

// Efficiently retrieve all teams belonging to a user.
teamMembershipSchema.index({ user: 1, status: 1 });

// Efficiently retrieve all members of a team.
teamMembershipSchema.index({ team: 1, status: 1 });

const TeamMembership = mongoose.model(
    "TeamMembership",
    teamMembershipSchema
);


export default TeamMembership;