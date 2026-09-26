import { deleteTask,
        //  updateTask,
         updateTaskPartially } from "../services/taskService";
import { useState } from "react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils/toast";
import { TFConfirmModal } from "./common/modals";
import TFCommonModal from "./common/modals/TFCommonModal";
import {TFTable} from "./common/TFTable";
import TFSelect from "./common/TFSelect";
import { DropdownMenu,
         DropdownMenuContent,
         DropdownMenuItem,
         DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";

function TaskList({ tasks, reloadTasks, loading, setTasks }) {
// console.log("tsks:",tasks);

  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [editingTask, setEditingTask] = useState(null);
  const [editOpen, setEditOpen] = useState(false);


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

  const handleTaskFieldChange = (id, field, value) => {
  setUpdatingId(id);

  const promise = updateTaskPartially(id, {
    [field]: value,
  });

  showToast.promise(promise, {
    loading: "Updating task...",

    success: (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id
            ? updatedTask
            : task
        )
      );

      setUpdatingId(null);

      return "Task updated successfully";
    },

    error: (err) => {
      setUpdatingId(null);
console.error("Update Eror",err)
      return (
        err?.response?.data?.message ||
        "Failed to update task"
      );
    },
  });
};
  
  // ----------------------------------
  // Update Task Status
  // ----------------------------------
  // const handleStatusChange = (id, newStatus) => {
  //   setUpdatingId(id);

  //   const promise = updateTask(id, {
  //     status: newStatus,
  //   });

  //   showToast.promise(promise, {
  //     loading: "Updating task...",

  //     success: () => {
  //       reloadTasks();
  //       setUpdatingId(null);

  //       return "Task updated successfully";
  //     },

  //     error: (err) => {
  //       setUpdatingId(null);

  //       return (
  //         err?.response?.data?.message ||
  //         "Failed to update task"
  //       );
  //     },
  //   });
  // };
  const handleStatusChange = (id, newStatus) => {
  handleTaskFieldChange(id, "status", newStatus);
};

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditOpen(true);
  }

  // const handleTypeChange = (id, newType) => {
  //   setUpdatingId(id);

  //   const promise = updateTask(id, {
  //     type: newType,
  //   });

  //   showToast.promise(promise, {
  //     loading: "Updating task...",

  //     success: () => {
  //       reloadTasks();
  //       setUpdatingId(null);
  //       return "Task updated successfully";
  //     },
  //     error: (err) => {
  //       setUpdatingId(null);
  //       return (
  //         err?.response?.data?.message ||
  //         "Failed to update task"
  //       );
  //     }
  //   });
  // };
  const handleTypeChange = (id, newType) => {
  handleTaskFieldChange(id, "type", newType);
};

  // const handlePriorityChange = (id, newPriority) => {
  //   setUpdatingId(id);

  //   const promise = updateTask(id, {
  //     priority : newPriority,
  //   });

  //   showToast.promise(promise, {
  //     loading: "Updating task...",

  //     success: () => {
  //       reloadTasks();
  //       setUpdatingId(null);
  //       return "Task updated successfully";
  //     },
  //     error: (err) => {
  //       setUpdatingId(null);
  //       return (
  //         err?.response?.data?.message ||
  //         "Failed to update task"
  //       );
  //     }
  //   });
  // };

  const handlePriorityChange = (id, newPriority) => {
  handleTaskFieldChange(id, "priority", newPriority);
};

  

  // ----------------------------------
  // Update Task
  // ----------------------------------
  // const handleUpdate = (id, updatedData) => {
  //   setUpdatingId(id);

  // }

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem
          onClick={() => handleEdit(task)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => {
            setSelectedTaskId(task._id);
            setOpen(true);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  ),
},
  ];

  // ----------------------------------
  // Render
  // ----------------------------------
  return (
    <div className="space-y-4">

      <h3 className="text-sm font-semibold">
        Task List
      </h3>

      <TFTable
        columns={columns}
        data={tasks}
        getRowKey={(task) => task._id}
        emptyMessage="No tasks yet. Create one 🚀"
      // customizing stlyes :
          tableClassName="rounded-lg shadow-sm"
          // header:
            headerClassName="bg-stone-400 dark:bg-zinc-800"
            headerRowClassName="hover:bg-stone-500 dark:hover:bg-zinc-900"
            headerCellClassName="text-slate-200 hover:text-slate-50"
          //
          bodyClassName="dark:bg-zinc-600"
          rowClassName="text-gray-800 dark:text-zinc-300"
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

      <TFCommonModal
        // no trigger needed
        open={editOpen}
        onOpenChange={setEditOpen}
      >
        <TaskForm 
          task={editingTask}
          onSuccess={reloadTasks}
        />
      </TFCommonModal>

    </div>
  );
}

export default TaskList;