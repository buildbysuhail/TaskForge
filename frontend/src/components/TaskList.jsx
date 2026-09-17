import { deleteTask, updateTask } from "../services/taskService";
import { useState } from "react";

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
import {TFTable} from "./common/TFTable";
import TFSelect from "./common/TFSelect";

function TaskList({ tasks, reloadTasks, loading }) {

  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const TypeOptions = [{ label: "Feature", value: "Feature" },
                       { label: "Quality", value: "Quality" },
                       { label: "Bug", value: "Bug" },
                       { label: "Test", value: "Test" },
                      ];
  const PriorityOptions = [{ label: "Best Effort", value: "best-effort" },
                           { label: "Low", value: "low" },
                           { label: "Medium", value: "medium" },
                           { label: "High", value: "high" },
                           { label: "Critical", value: "critical" },
                      ];
  const StatusOptions = [{ label: "To Do", value: "todo" },
                         { label: "In Progress", value: "in-progress" },
                         { label: "Completed", value: "completed" },
                      ];
  
  // ----------------------------------
  // Update Task Status
  // ----------------------------------
  const handleStatusChange = (id, newStatus) => {
    setUpdatingId(id);

    const promise = updateTask(id, {
      status: newStatus,
    });

    showToast.promise(promise, {
      loading: "Updating task...",

      success: () => {
        reloadTasks();
        setUpdatingId(null);

        return "Task updated successfully";
      },

      error: (err) => {
        setUpdatingId(null);

        return (
          err?.response?.data?.message ||
          "Failed to update task"
        );
      },
    });
  };

  const handleTypeChange = (id, newType) => {
    setUpdatingId(id);

    const promise = updateTask(id, {
      type: newType,
    });

    showToast.promise(promise, {
      loading: "Updating task...",

      success: () => {
        reloadTasks();
        setUpdatingId(null);
        return "Task updated successfully";
      },
      error: (err) => {
        setUpdatingId(null);
        return (
          err?.response?.data?.message ||
          "Failed to update task"
        );
      }
    });
  };

  const handlePriorityChange = (id, newPriority) => {
    setUpdatingId(id);

    const promise = updateTask(id, {
      priority : newPriority,
    });

    showToast.promise(promise, {
      loading: "Updating task...",

      success: () => {
        reloadTasks();
        setUpdatingId(null);
        return "Task updated successfully";
      },
      error: (err) => {
        setUpdatingId(null);
        return (
          err?.response?.data?.message ||
          "Failed to update task"
        );
      }
    });
  };

  // ----------------------------------
  // Delete Task
  // ----------------------------------
  const handleDelete = (id) => {
    setDeletingId(id);

    const promise = deleteTask(id);

    showToast.promise(promise, {
      loading: "Deleting task...",

      success: () => {
        reloadTasks();
        setDeletingId(null);

        return "Task deleted successfully";
      },

      error: (err) => {
        setDeletingId(null);

        return (
          err?.response?.data?.message ||
          "Failed to delete task"
        );
      },
    });
  };

  // ----------------------------------
  // Confirm Delete
  // ----------------------------------
  const confirmDelete = () => {
    if (!selectedTaskId) return;

    handleDelete(selectedTaskId);

    setOpen(false);
    setSelectedTaskId(null);
  };

  // ----------------------------------
  // Loading State
  // ----------------------------------
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-gray-200 animate-pulse rounded-md h-20"
          />
        ))}
      </div>
    );
  }

  // ----------------------------------
  // Table Columns
  // ----------------------------------
  const columns = [
    {
      key: "title",
      header: "Title",
    },

    {
      key: "description",
      header: "Description",
    },

    {
      key: "type",
      header: "Type",

      // render: (task) => task.type || "-",
      render: (task) => (
        <TFSelect
          value={task?.type}
          onValueChange={
            (value) => handleTypeChange(task?._id, value)
          }
          disabled={updatingId === task._id}
          options={TypeOptions}
        />
      ),
    },

    {
      key: "priority",
      header: "Priority",

      // render: (task) => task.priority || "-",
      render: (task) => (
        <TFSelect
          value={task?.priority}
          onValueChange={(value) =>{
            handlePriorityChange(task?._id, value)
          }}
          disabled={updatingId === task._id}
          options={PriorityOptions}
        />
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (task) => (
        // <Select
        //   value={task.status}
        //   onValueChange={(value) =>
        //     handleStatusChange(task._id, value)
        //   }
        //   disabled={updatingId === task._id}
        // >
        //   <SelectTrigger className="w-[140px] rounded-md">
        //     <SelectValue />
        //   </SelectTrigger>

        //   <SelectContent>
        //     <SelectItem value="todo">
        //       Todo
        //     </SelectItem>

        //     <SelectItem value="in-progress">
        //       In Progress
        //     </SelectItem>

        //     <SelectItem value="completed">
        //       Completed
        //     </SelectItem>
        //   </SelectContent>
        // </Select>
        <TFSelect 
          value={task?.status}
          onValueChange={(value) =>{
            handleStatusChange(task?._id, value)
          }}
          disabled={updatingId === task._id}
          options={StatusOptions}
        />
      ),
    },

    {
      key: "owner",
      header: "Owner",

      render: (task) => task.owner || "-",
    },

    {
      key: "actions",
      header: "Actions",

      render: (task) => (
        <Button
          disabled={deletingId === task._id}
          variant="destructive"
          size="sm"
          onClick={() => {
            setSelectedTaskId(task._id);
            setOpen(true);
          }}
          className="rounded-sm"
        >
          {deletingId === task._id
            ? "Deleting..."
            : "Delete"}
        </Button>
      ),
    },
  ];

  // ----------------------------------
  // Render
  // ----------------------------------
  return (
    <div className="space-y-4">

      <h3 className="text-sm text-gray-600 font-semibold">
        Task List
      </h3>

      <TFTable
        columns={columns}
        data={tasks}
        getRowKey={(task) => task._id}
        emptyMessage="No tasks yet. Create one 🚀"

        tableClassName="rounded-lg shadow-sm"
        headerClassName="bg-slate-500"
        headerRowClassName="hover:bg-slate-600"
        headerCellClassName="text-slate-200 hover:text-slate-50"
        bodyClassName="bg-slate-200"
        rowClassName="text-gray-800"
      />

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