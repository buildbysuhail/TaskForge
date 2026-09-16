import { useEffect, useState } from "react";
// import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { 
  getTasks, 
  // createTask 
} from "../services/taskService.js";
import { Button } from "@/components/ui/button.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { useNavigate } from "react-router-dom";
import FeatureUnderDevelopment from "./FeatureUnderDev.jsx";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  // const [showTaskFrm, setShowTaskFrm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      // console.log(data, "dsdsdd")
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

//   const handleAddTask = (newTask) => {
//   setTasks((prevTasks) => [...prevTasks, newTask]);
// };

  return (
    <div className="bg-slate-100 min-h-screen py-6">
      <h2 className="text-[23px] bg-slate-100 font-semibold text-center mb-4">Dashboard</h2>
      <Tabs defaultValue="backlog" className="w-full mx-auto justify-center items-center bg-slate-300 flex flex-col gap-2 p-4 rounded-lg shadow-sm">

        {/* Tab navigation */}
        <TabsList variant="line" className={"w-[60%] mx-auto"}>
          <TabsTrigger value="backlog" className={"text-[18px] font-bold"}>
            All Tasks
          </TabsTrigger>

          <TabsTrigger value="kanban" className={"text-[18px] font-bold"}>
            Kanban
          </TabsTrigger>

          <TabsTrigger value="completed-tasks" className={"text-[18px] font-bold"}>
            Completed Tasks
          </TabsTrigger>
          <TabsTrigger value="active-sprints" className={"text-[18px] font-bold"}>
            Active Sprints
          </TabsTrigger>
          <TabsTrigger value="report" className={"text-[18px] font-bold"}>
            Report
          </TabsTrigger>
        </TabsList>

        {/* All Tasks tab */}
        <TabsContent value="backlog" className="w-full flex flex-col gap-4">

          <div className="bg-gray-200 rounded-lg p-5 flex justify-start items-center">
            <Button
              className="bg-blue-900"
              onClick={() => navigate("/create-task")}
              title="Create New Task"
            >
              New
            </Button>
          </div>

          <div className="bg-green-50 rounded-lg p-5">
            <TaskList
              tasks={tasks}
              reloadTasks={loadTasks}
              loading={loading}
            />
          </div>

        </TabsContent>

        {/* Kanban tab */}
        <TabsContent value="kanban" className="w-full">
          <div className="p-5">
            <FeatureUnderDevelopment featureName={"Kanban"}/>
          </div>
        </TabsContent>

        {/* Completed Tasks tab */}
        <TabsContent value="completed-tasks" className="w-full">
          <div className="p-5">
            <FeatureUnderDevelopment featureName={"Completed Tasks"}/>
          </div>
        </TabsContent>
        <TabsContent value="active-sprints" className="w-full">
          <div className="p-5">
            <FeatureUnderDevelopment featureName={"Active Sprints"}/>
          </div>
        </TabsContent>
        <TabsContent value="report" className="w-full">
          <div className="p-5">
            <FeatureUnderDevelopment featureName={"Report"}/>
          </div>
        </TabsContent>

      </Tabs>
      {/* <div className="bg-gray-300 rounded-sm p-5">
        <Button 
        className="bg-blue-900" 
        // onClick={() => setShowTaskFrm(true)}
        onClick={() => navigate("/create-task")}
        // variant="ghost"
        title="Create New Task"
        >
          New
        </Button>

        {showTaskFrm && (
          <TaskForm
            onAdd={handleAddTask}
            onClose={() => setShowTaskFrm(false)}
          />
        )}
      </div>
      <div className="bg-green-50 rounded-sm p-5">
        <TaskList tasks={tasks} reloadTasks={loadTasks} loading={loading} />
      </div> */}
    </div>
  );
}

export default Dashboard;
