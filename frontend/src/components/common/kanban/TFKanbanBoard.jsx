import { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import TFKanbanColumn from "./TFKanbanColumn";
import { updateTask } from "@/services/taskService";
import { showToast } from "@/lib/utils/toast";
import useSoundEffects from "@/hooks/useSoundEffects";

function TFKanbanBoard({ tasks = [], reloadTasks }) {
  const [kTasks, setKTasks] = useState(tasks);

  // Keep local Kanban state in sync with tasks received from parent
  useEffect(() => {
    setKTasks(tasks);
  }, [tasks]);

  const todoTasks = kTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = kTasks.filter(
    (task) => task.status === "in-progress"
  );

  const onTestintTasks = kTasks.filter(
    (task) => task.status === "on-testing"
  );

  const pendingTasks = kTasks.filter(
    (task) => task.status === "pending"
  );

  const holdTasks = kTasks.filter(
    (task) => task.status === "hold"
  );

  const { playKanbanDrop } = useSoundEffects();

// console.log(pendingTasks, holdTasks, "kanban pending, hold")

  const completedTasks = kTasks.filter(
    (task) => task.status === "completed"
  );

  const handleDragEnd = async (event) => {
    const { operation } = event;
    // playKanbanDrop();

    if (!operation?.target) return;

    const draggedTaskId = operation.source.id;
    const targetColumnId = operation.target.id;

    // find the dragged task
    const draggedTask = kTasks.find(
        (t) => t._id === draggedTaskId
    )

    if (!draggedTask) return;

      // Don't do anything if dropped in the same column
    if (draggedTask.status === targetColumnId) {
      return;
    }
    playKanbanDrop();

    // Save previous status in case API fails
    const previousStatus = draggedTask.status;
// console.log(draggedTask, kTasks, "draggedTask")
// console.log(operation.target, "opntarget")

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  "on-testing": "On Testing",
  pending: "Pending",
  hold: "Hold",
  completed: "Completed", 
};

    setKTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === draggedTaskId
          ? {
              ...task,
              status: targetColumnId,
            }
          : task
      )
    );

      try {
          // api Call
          const updatedTask = await updateTask(draggedTaskId, {
              status: targetColumnId,
          });

          const toastMessage = (
              <>
                  Task status updated to <span className="text-blue-600">{statusLabels[updatedTask.status]}</span>
              </>
          );

          showToast.success(toastMessage)
          await reloadTasks();
      } catch (error) {
          console.error("Failed to update task status:", error)

        // Role back UI, if API fails
        setKTasks((currentTasks) => 
            currentTasks.map((task) =>
                task._id === draggedTaskId ?
                        {
                            ...task,
                            status: previousStatus,
                        } :
                        task
             )
        )
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
        <TFKanbanColumn
          id="todo"
          title="To Do"
          tasks={todoTasks}
        />

        <TFKanbanColumn
          id="in-progress"
          title="In Progress"
          tasks={inProgressTasks}
        />

        <TFKanbanColumn
          id="on-testing"
          title="On Testing"
          tasks={onTestintTasks}
        />

        <TFKanbanColumn
          id="pending"
          title="Pending"
          tasks={pendingTasks}
        />

        <TFKanbanColumn
          id="hold"
          title="Hold"
          tasks={holdTasks}
        />

        <TFKanbanColumn
          id="completed"
          title="Completed"
          tasks={completedTasks}
        />
      </div>
    </DragDropProvider>
  );
}

export default TFKanbanBoard;