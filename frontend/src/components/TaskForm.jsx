import { useState } from "react";
import { createTask } from "../services/taskService";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { showToast } from "@/lib/utils/toast";

function TaskForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      const newTask = await createTask({
        title: trimmed,
        description,
        status,
      });

      onAdd(newTask);
      showToast.success("Task created successfully ✅");
      setTitle("");
      setDescription("");
      setStatus("todo");
    } catch (error) {
      console.error("Error creating task:", error);
      showToast.error("Failed to create task");
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create Task</CardTitle>

        <Button variant="ghost" onClick={onClose}>
          <X size={18}/>
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Button */}
          <Button type="submit" className="w-full">
            Add Task
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}

export default TaskForm;