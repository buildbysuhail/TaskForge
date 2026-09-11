import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";

function CreateTask() {
  const navigate = useNavigate();

  const handleAddTask = (newTask) => {
    // Task is already created by TaskForm.
    // After successful creation, go back to Dashboard.
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen p-5">
      <h2 className="text-[23px] text-center mb-5">
        Create New Task
      </h2>

      <TaskForm
        onAdd={handleAddTask}
        onClose={() => navigate("/dashboard")}
      />
    </div>
  );
}

export default CreateTask;