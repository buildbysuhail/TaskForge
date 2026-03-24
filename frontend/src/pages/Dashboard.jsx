import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { 
  getTasks, 
  // createTask 
} from "../services/taskService.js";
import { Button } from "@/components/ui/button.jsx";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showTaskFrm, setShowTaskFrm] = useState(false);

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
    <div className="bg-slate-100">
      <h2 className="text-[23px] bg-slate-100 text-center">Dashboard</h2>
      <div className="bg-gray-300 rounded-sm p-5">
        <Button onClick={()=> setShowTaskFrm(true)}>New</Button>

        {showTaskFrm && <TaskForm onAdd={handleAddTask} />}
      
      </div>
      <div className="bg-green-50 rounded-sm p-5">
      <TaskList tasks={tasks} reloadTasks={loadTasks}/>
      </div>
    </div>
  );
}

export default Dashboard;
