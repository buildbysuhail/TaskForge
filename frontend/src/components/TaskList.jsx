// import React from 'react'
import { useEffect, useState } from "react";
import { deleteTask, updateTask } from "../services/taskService";
// import { getTasks, creatTask } from "../services/taskService";

function TaskList({ tasks, reloadTasks }) {
  // console.log(tasks, "taskList")
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(true);
      await updateTask(id, { status: newStatus })
      reloadTasks(); // simplest approach
    } catch (error) {
      console.error("Error updating task: ", error)
    } finally {
      setUpdating(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      setUpdating(true)
      await deleteTask(id)
      reloadTasks();
    } catch (error) {
      console.error("Error deleting task: ", error);
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>

            <select value={task.status} onChange={(e)=>
              handleStatusChange(task._id, e.target.value)
            }>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button onClick={() => handleDelete(task._id)} className="cursor-pointer">
              Delete
            </button>

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
