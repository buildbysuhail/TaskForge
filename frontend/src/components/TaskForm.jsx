// import React from 'react'
import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };
  return (
    <div>
      Task Form
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
