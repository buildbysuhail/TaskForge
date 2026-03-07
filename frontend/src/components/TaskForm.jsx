// import React from 'react'
import { useState } from "react";
import { createTask } from "../services/taskService";
import { Button } from "./ui/button";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    // const descri = descr
    if (!trimmed) return;

    try {
      const newTask = await createTask({ title: trimmed, description, status });

      onAdd(newTask);   // send FULL task object back
      setTitle("");
      setDescription("");
      setStatus("todo")
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <div>
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <Button type="submit" variant="destructive">Add Task</Button>

      </form>
    </div>
  );
}

export default TaskForm;
