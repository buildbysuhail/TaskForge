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
import { TFConfirmModal } from "./common/modals";

function TaskList({ tasks, reloadTasks, loading }) {

  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleStatusChange = (id, newStatus) => {


  const promise = updateTask(id, { status: newStatus });

  showToast.promise(promise, {
    loading: "Updating task...",
    success: () => {
      reloadTasks();
      return "Task updated successfully ✅";
    },
    error: (err) => {
      return err?.response?.data?.message || "Failed to update task";
    },
  });
};

  const handleDelete = (id) => {
  setDeletingId(id);

  const promise = deleteTask(id);

  showToast.promise(promise, {
    loading: "Deleting task...",
    success: () => {
      reloadTasks();
      setDeletingId(null);
      return "Task deleted successfully ✅";
    },
    error: (err) => {
      setDeletingId(null);
      return err?.response?.data?.message || "Failed to delete task";
    },
  });
};

const confirmDelete = () => {
  if (!selectedTaskId) return;
  handleDelete(selectedTaskId);
  setOpen(false);
  setSelectedTaskId(null);
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
                    disabled={selectedTaskId === task._id}
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
                  disabled={deletingId === task._id}
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setOpen(true);
                  }}
                  className={"rounded-sm"}
                >
                  {deletingId === task._id ? "Deleting..." : "Delete"}
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

      <TFConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="Delete Task?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
      />

    </div>
  );
}

export default TaskList;
