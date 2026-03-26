import { deleteTask, updateTask } from "../services/taskService";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

function TaskList({ tasks, reloadTasks }) {

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      reloadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      reloadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!tasks.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No tasks yet. Create one 🚀
      </p>
    );
  }

  return (
    <div className="space-y-4">

      <h3 className="text-sm text-gray-600 font-semibold">
        Task List
      </h3>

      {tasks.map((task) => (
        <Card key={task._id} className="p-4 rounded-md">

          <CardContent className="p-0 space-y-2">

            {/* Top Row */}
            <div className="flex items-center justify-between">

              <h4 className="font-semibold text-lg">
                {task.title}
              </h4>

              <div className="flex items-center gap-2">

                {/* Status */}
                <Select
                  value={task.status}
                  onValueChange={(value) =>
                    handleStatusChange(task._id, value)
                  }
                >
                  <SelectTrigger className="w-[140px] rounded-md">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Delete */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task._id)}
                  className={"rounded-sm"}
                >
                  Delete
                </Button>

              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-gray-600">
                {task.description}
              </p>
            )}

          </CardContent>
        </Card>
      ))}

    </div>
  );
}

export default TaskList;
