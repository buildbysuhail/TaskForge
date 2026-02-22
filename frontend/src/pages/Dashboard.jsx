// import React from 'react'
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title }]);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Dashboard;
