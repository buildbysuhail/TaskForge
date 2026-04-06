import { deleteTask, updateTask } from "../services/taskService";
import { useState } from "react";
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
import { showToast } from "@/lib/utils/toast";

function TaskList({ tasks, reloadTasks, loading }) {

  const [actionLoading, setActionLoading] = useState(null);

  const handleStatusChange = (id, newStatus) => {
  setActionLoading(id);

  const promise = updateTask(id, { status: newStatus });

  showToast.promise(promise, {
    loading: "Updating task...",
    success: () => {
      reloadTasks();
      setActionLoading(null);
      return "Task updated successfully ✅";
    },
    error: (err) => {
      setActionLoading(null);
      return err?.response?.data?.message || "Failed to update task";
    },
  });
};

  const handleDelete = (id) => {
  setActionLoading(id);

  const promise = deleteTask(id);

  showToast.promise(promise, {
    loading: "Deleting task...",
    success: () => {
      reloadTasks();
      setActionLoading(null);
      return "Task deleted successfully ✅";
    },
    error: (err) => {
      setActionLoading(null);
      return err?.response?.data?.message || "Failed to delete task";
    },
  });
};

  if (loading) {
  return (
    <div className="space-y-4">
      {[1,2,3].map((i) => (
        <div key={i} className="p-4 bg-gray-200 animate-pulse rounded-md h-20" />
      ))}
    </div>
  );
}

  if (!loading && !tasks.length) {
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
                  <SelectTrigger className="w-[140px] rounded-md"
                    disabled={actionLoading === task._id}
                  >
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
                  disabled={actionLoading === task._id}
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task._id)}
                  className={"rounded-sm"}
                >
                  {actionLoading === task._id ? "Deleting..." : "Delete"}
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
