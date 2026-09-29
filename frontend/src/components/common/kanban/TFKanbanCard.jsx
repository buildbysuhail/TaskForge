import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";
// import { CSS } from "@dnd-kit/utilities";

const priorityColor = {
  low: "bg-slate-200 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

function TFKanbanCard({ task }) {

    const { ref } = useDraggable({
  id: task._id,
});

  return (
    <Card 
        ref={ref}
        className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-3">
        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm leading-5">{task.title}</h4>

          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description || "No description"}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span
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