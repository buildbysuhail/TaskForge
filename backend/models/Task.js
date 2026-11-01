import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [ true, "Title is required" ],
            trim: true,
            maxLength: [100, "Title cannot be more than 100 characters"]
        }, 
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "on-testing", "pending", "hold", "completed"],
            default: "todo"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        priority: {
            type: String,
            enum: ["best-effort", "low", "medium", "high", "critical"],
            default: "medium"
        },
        type: {
            type: String,
            enum: ["Feature", "Quality", "Bug", "Test", "Security", "Other"],
        },
        owner: {
            type: String,
            trim: true,
            maxLength: [100, "Owner name cannot be more than 100 characters"]
        },
        // // Instead of 'owner' with string type, we need to bring a reference type
        //         assignedTo: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     default: null,
        // },
        // Team referance:
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        }
    },
    { timestamps: true }
);

taskSchema.index({ team: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;

