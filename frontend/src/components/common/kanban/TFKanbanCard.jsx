import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";
// import { CSS } from "@dnd-kit/utilities";

const priorityColor = {
  "best-effort": "bg-green-700 text-green-100",
  low: "bg-cyan-700 text-cyan-100",
  medium: "bg-blue-900 text-blue-200",
  high: "bg-yellow-900 text-orange-200",
  critical: "bg-red-900 text-red-200",
};

function TFKanbanCard({ task }) {

    const { ref } = useDraggable({
  id: task._id,
});
console.log("Task priorityyyyy",task.priority)
  return (
    <Card 
        ref={ref}
        className="cursor-pointer hover:shadow-md transition-shadow
                   bg-stone-300 hover:bg-stone-400 
                   text-gray-700 hover:text-gray-50
                   dark:bg-zinc-600 dark:hover:bg-zinc-700
                   dark:text-gray-200 dark:hover:text-gray-100
                   ">
      <CardContent className="p-3 space-y-3">
        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-sm leading-5">{task.title}</h4>

          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-xs  line-clamp-2 font-semibold">
          {task.description || <span className="font-light">No description</span>}
          {/* {task.description && task.description} */}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span title="Priority"
            className={`text-[10px] px-2 py-1 rounded-full font-medium capitalize ${
              priorityColor[task.priority] || priorityColor.low
            }`}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TFKanbanCard;