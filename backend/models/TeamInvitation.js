import mongoose from "mongoose";

const teamInvitationSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        email: {
            type: String,
            required: [true, "Invitee email is required."],
            trim: true,
            lowercase: true,
        },

        tokenHash: {
            type: String,
            required: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "expired", "revoked"],
            default: "pending",
        },

        acceptedAt: {
            type: Date,
            default: null,
        },
     },
     { timestamps: true }
);

// Efficiently retrieve invitations belonging to a team.
teamInvitationSchema.index({ team: 1, status: 1 });

// Efficiently find pending invitations for an email address.
teamInvitationSchema.index({ email:1, status: 1 });

// Automatically remove expired invitation documents after their expiry.
teamInvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const TeamInvitation = mongoose.model(
    "TeamInvitation",
    teamInvitationSchema
);

export default TeamInvitation;