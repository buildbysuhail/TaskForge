import Task from "../models/Task.js";
import mongoose from "mongoose";

const allowedTaskFields = [
    "title",
    "description",
    "status",
    "priority",
    "type",
    "taskId",
    "owner",
];

const getAllowedTaskFields = (body) => {
    return Object.fromEntries(
        Object.entries(body).filter(([key]) =>
            allowedTaskFields.includes(key)
        )
    );
};

export const createTask = async (req, res) => {
    try {
        const { title,
            description,
            status,
            priority,
            type,
            taskId,
            owner,
        } = req.body;
        // console.log("Incoming request body:", req.body);

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            type,
            taskId,
            owner,

            user: req.user._id,
            team: null,
        });

        return res.status(201).json(task)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const createTeamTask = async (req, res) => {
    try {
        const taskData = getAllowedTaskFields(req.body);

        const task = await Task.create({
            ...taskData,
            user: req.user._id,
            team: req.team._id,
        });

        return res.status(201).json(task);

    } catch (err) {
        console.error("Create team task error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};

export const getTeamTasks = async (req, res) => {
    try {
        const { search } = req.query;

        const filter = {
            team: req.team._id,
        };

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const tasks = await Task.find(filter).sort({
            createdAt: -1,
        });

        return res.status(200).json(tasks);

    } catch (err) {
        console.error("Get team tasks error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
}

export const getTasks = async (req, res) => {
    try {
        const { search } = req.query;

        const filter = {
            user: req.user._id,
            team: null,
        };

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const tasks = await Task.find(filter); // Imoortant: Only fetch tasks that belong to the logged in user
        // console.log("Fetched tasks for user:", req.user._id, tasks);
        return es.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID.",
            });
        }

        const taskData = getAllowedTaskFields(req.body);

        if (Object.keys(taskData).length === 0) {
            return res.status(400).json({
                message: "No valid task fields provided.",
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
                team: null,
            },
            taskData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Personal task not found.",
            });
        }

        return res.status(200).json(task);

    } catch (err) {
        console.error("Update personal task error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};

export const updateTeamTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID.",
            });
        }

        const taskData = getAllowedTaskFields(req.body);

        if (Object.keys(taskData).length === 0) {
            return res.status(400).json({
                message: "No valid task fields provided.",
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                team: req.team._id,
            },
            taskData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Team task not found.",
            });
        }

        return res.status(200).json(task);

    } catch (err) {
        console.error("Update team task error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID.",
            });
        }

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
            team: null,
        });

        if (!task) {
            return res.status(404).json({
                message: "Personal task not found.",
            });
        }

        return res.status(200).json({
            message: "Personal task deleted successfully.",
        });

    } catch (err) {
        console.error("Delete personal task error:", err);

        return res.status(500).json({
            message: err.message,
        });
    }
};


export const deleteTeamTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID.",
            });
        };

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            team: req.team._id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Team task not found.",
            })
        }

        return res.status(200).json({
            message: "Team task deleted successfully.",
        });
    } catch (err) {
        console.error("Delete team task error:", err);

        return moduleRunnerTransform.status(500).json({
            message: err.message,
        });
    }
};