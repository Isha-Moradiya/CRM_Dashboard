import { CheckCircle2, Circle, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Task } from "../leads/types";
import { cn } from "../../lib/utils";
import { JSX } from "react";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onToggleStatus }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      "High": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      "Medium": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      "Low": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[priority] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      "Call": <span>📞</span>,
      "Email": <span>✉️</span>,
      "Meeting": <span>🤝</span>,
      "Task": <span>📋</span>,
    };
    return icons[type] || <span>📋</span>;
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === "Done") return false;
    const due = new Date(dueDate);
    const today = new Date();
    return due < today;
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className={cn(
          "hover:shadow-md transition-shadow",
          task.status === "Done" && "opacity-60"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Status Toggle */}
              <button
                onClick={() => onToggleStatus(task.id)}
                className="mt-1"
              >
                {task.status === "Done" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className={cn(
                      "font-semibold mb-1",
                      task.status === "Done" && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPriorityColor(task.priority)} variant="secondary">
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        {getTypeIcon(task.type)}
                        {task.type}
                      </Badge>
                      <div className={cn(
                        "flex items-center gap-1 text-xs",
                        isOverdue(task.dueDate, task.status) ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                      )}>
                        <Clock className="w-3 h-3" />
                        {task.dueDate}
                        {isOverdue(task.dueDate, task.status) && " (Overdue)"}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Assigned to: {task.assignee}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 hover:text-red-700" 
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No tasks found
        </div>
      )}
    </div>
  );
}
