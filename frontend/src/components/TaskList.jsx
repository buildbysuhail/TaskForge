// import React from 'react'
// import { useEffect, useState } from "react";
// import { getTasks, creatTask } from "../services/taskService";

function TaskList({ tasks }) {
  console.log(tasks, "taskList")
  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <span>{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
