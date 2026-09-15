import { useState } from "react";
import { createTask } from "../services/taskService";

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
import {
  X,
  Hash,
  UserRound,
  Flag,
  Tag,
  Loader2,
  ClipboardList,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";

const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "best-effort", label: "Best Effort", color: "bg-gray-400" },
  { value: "low", label: "Low", color: "bg-emerald-500" },
  { value: "medium", label: "Medium", color: "bg-amber-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "critical", label: "Critical", color: "bg-red-600" },
];

const TYPE_OPTIONS = ["Feature", "Quality", "Bug", "Test", "Security", "Other"];
// TaskForm ===> CreateTask
function CreateTask({ 
  // onAdd,
  onClose 
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [type, setType] = useState("Feature");
  const [taskId, setTaskId] = useState("");
  const [owner, setOwner] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      setFormLoading(true);
      const newTask = await createTask({
        title: trimmed,
        description,
        status,
        priority,
        type,
        taskId: taskId.trim(),
        owner: owner.trim(),
      });

      // onAdd(newTask);
      showToast.success("Task created successfully ✅");
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setType("Feature");
      setTaskId("");
      setOwner("");
    } catch (error) {
      console.error("Error creating task:", error);
      showToast.error("Failed to create task");
    } finally {
      setFormLoading(false);
    }
  };


  const selectedPriority = PRIORITY_OPTIONS.find((p) => p.value === priority);

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col">
      {/* Header banner */}
      <div className="bg-slate-900 text-white px-6 sm:px-10 py-8">
        <div className="max-w-3xl mx-auto flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ClipboardList size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Create New Task</h1>
              <p className="text-sm text-slate-300 mt-0.5">
                Add a new task to your project board
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Form sheet */}
      <div className="flex-1 -mt-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-t-3xl shadow-xl shadow-gray-200/70 border border-gray-100 px-6 sm:px-10 py-8 space-y-8"
        >
          {/* Identity row: Task ID + Owner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Task ID
              </Label>
              <div className="relative">
                <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="e.g. TF1"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  className="h-11 pl-9 rounded-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-900/10 focus-visible:border-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Owner
              </Label>
              <div className="relative">
                <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Assign to..."
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="h-11 pl-9 rounded-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-900/10 focus-visible:border-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Title
            </Label>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-base rounded-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-900/10 focus-visible:border-gray-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Description
            </Label>
            <Textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] rounded-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-gray-900/10 focus-visible:border-gray-400"
            />
          </div>

          {/* Status as segmented pills */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`px-4 h-9 rounded-full text-sm font-medium border transition-colors ${
                    status === opt.value
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 flex items-center gap-1.5">
                <Flag size={12} /> Priority
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400">
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${selectedPriority?.color}`} />
                      {selectedPriority?.label}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${opt.color}`} />
                        {opt.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 flex items-center gap-1.5">
                <Tag size={12} /> Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={formLoading}
            className="w-full h-12 rounded-lg bg-black hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            <span className="flex items-center justify-center gap-2">
              {formLoading && <Loader2 size={16} className="animate-spin" />}
              {formLoading ? "Adding Task..." : "Add Task"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;