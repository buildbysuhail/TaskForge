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
            enum: ["todo", "in-progress", "completed"],
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
        }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

