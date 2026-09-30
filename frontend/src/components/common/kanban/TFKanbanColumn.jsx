import TFKanbanCard from "./TFKanbanCard";
import { useDroppable } from "@dnd-kit/react";

function TFKanbanColumn({ id, title, tasks }) {

    const { ref } = useDroppable({
        id,
    })

  return (
    <div 
        ref={ref}
        className="bg-muted/100 rounded-xl p-3 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{title}</h3>

        <span className="text-xs bg-slate-100 dark:bg-zinc-400 text-black font-semibold px-2 py-1 rounded-full cursor-pointer"
          title={`${tasks.length} Tasks in "${title}"`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3 min-h-[250px]">
        {tasks.length === 0 ? (
          <div className="h-28 border-2 border-dashed rounded-lg flex items-center justify-center text-xs text-muted-foreground">
            No Tasks
          </div>
        ) : (
          tasks.map((task) => <TFKanbanCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default TFKanbanColumn;