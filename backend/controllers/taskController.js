import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            user: req.user._id,
        })

        res.status(201).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }); // Imoortant: Only fetch tasks that belong to the logged in user

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updateTask);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found to delete" });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this task" });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};