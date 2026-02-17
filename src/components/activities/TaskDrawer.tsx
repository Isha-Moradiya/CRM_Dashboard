import { useState, useEffect } from "react";
import { DrawerCustom } from "../ui/drawer-custom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Task } from "../leads/types";

interface TaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task | null;
  mode: "add" | "edit";
}

export function TaskDrawer({ open, onClose, onSave, task, mode }: TaskDrawerProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Todo",
    assignee: "Erik Brown",
    type: "Task",
  });

  useEffect(() => {
    if (task && mode === "edit") {
      setFormData(task);
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Todo",
        assignee: "Erik Brown",
        type: "Task",
      });
    }
  }, [task, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DrawerCustom
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add New Activity" : "Edit Activity"}
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Create Activity" : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Follow up with client"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Additional details about this activity..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Call">Call</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Task">Task</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleChange("priority", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todo">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">Assignee</Label>
          <Select
            value={formData.assignee}
            onValueChange={(value) => handleChange("assignee", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Erik Brown">Erik Brown</SelectItem>
              <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              <SelectItem value="Mike Williams">Mike Williams</SelectItem>
              <SelectItem value="Emily Davis">Emily Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </DrawerCustom>
  );
}
