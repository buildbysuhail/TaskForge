// import React from 'react'
import { useEffect, useState } from "react";
import { deleteTask, updateTask } from "../services/taskService";
import { Button } from "./ui/button";
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
      <h3 className="text-[12px] text-slate-600 bg-gray-100 rounded-md font-semibold my-2">Task List</h3>
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

            <Button onClick={() => handleDelete(task._id)} variant="destructive" >
              Delete
            </Button>

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
