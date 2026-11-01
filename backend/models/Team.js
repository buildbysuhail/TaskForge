import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Team name is required."],
            trim: true,
            minlength: [2, "Team name must contain at least 2 characters"],
            maxlength: [50, "Team name cannot exceed 50 characters."],
        },

        description: {
            type: String,
            trim: true,
            maxlength: [250, "Description cannot exceed 250 characters."],
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

// Find teams created by a particular user efficiently.
teamSchema.index({ createdBy: 1 });

const Team = mongoose.model("Team", teamSchema);

export default Team;