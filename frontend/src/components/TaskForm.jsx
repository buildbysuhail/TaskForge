import { useEffect, useState, useMemo } from "react";
import { createTask, updateTask } from "../services/taskService";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import TFSelect from "./common/TFSelect";
import { showToast } from "@/lib/utils/toast";

function TaskForm({
  task = null,
  onSuccess,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
// console.log("tsk in tskForm",task)
  // Prefill when editing
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title ?? "",
        description: task.description ?? "",
        type: task.type ?? "Feature",
        priority: task.priority ?? "medium",
        status: task.status ?? "todo",
      });
    }
  }, [task]);

  useEffect(() => {
  console.log("TASK RECEIVED:", task);
}, [task]);

useEffect(() => {
  console.log("FORM UPDATED:", formData);
}, [formData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ----------------------------
  // Create
  // ----------------------------
  const handleCreate = async () => {
    const newTask = await createTask(formData);
    showToast.success("Task created successfully");
    onSuccess?.(newTask);
    onClose?.();
  };

  // ----------------------------
  // Update
  // ----------------------------
  const handleUpdate = async () => {
    const updatedTask = await updateTask(task._id, formData);
    showToast.success("Task updated successfully");
    onSuccess?.(updatedTask);
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return showToast.error("Title is required");
    }

    try {
      setLoading(true);

      if (task) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
    } catch (err) {
      showToast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = useMemo(() => [
  { label: "Feature", value: "Feature" },
  { label: "Quality", value: "Quality" },
  { label: "Bug", value: "Bug" },
  { label: "Test", value: "Test" },
], []);

const priorityOptions = useMemo(() => [
  { label: "Best Effort", value: "best-effort" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
], []);

const statusOptions = useMemo(() => [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
], []);
// console.log("type, prio, status",formData)
  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-1">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          placeholder="e.g. Implement JWT authentication"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          placeholder="Describe the task..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Type</Label>
          <TFSelect
            value={formData.type}
            onValueChange={(value) =>
              handleChange("type", value)}
            options={typeOptions}
          />
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <TFSelect
            value={formData.priority}
            onValueChange={(value) => handleChange("priority", value)}
            options={priorityOptions}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <TFSelect
          value={formData.status}
          onValueChange={(value) => handleChange("status", value)}
          options={statusOptions}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? task
              ? "Updating..."
              : "Creating..."
            : task
              ? "Save Changes"
              : "Create Task"}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;