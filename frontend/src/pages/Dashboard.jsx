import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { 
  getTasks, 
  // createTask 
} from "../services/taskService.js";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      // console.log(data, "dsdsdd")
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = (newTask) => {
  setTasks((prevTasks) => [...prevTasks, newTask]);
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
