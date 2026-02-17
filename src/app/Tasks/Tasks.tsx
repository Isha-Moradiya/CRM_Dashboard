import { useState } from "react";
import { Plus, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TaskList } from "../../components/activities/TaskList";
import { TaskDrawer } from "../../components/activities/TaskDrawer";
import { Task } from "../../components/leads/types";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

// Mock data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Follow up call with John Smith",
    description: "Discuss proposal details and pricing",
    dueDate: "2024-12-06",
    priority: "High",
    status: "Todo",
    assignee: "Erik Brown",
    type: "Call",
  },
  {
    id: "2",
    title: "Send proposal to Tech Corp",
    description: "Email enterprise license proposal",
    dueDate: "2024-12-07",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah Johnson",
    type: "Email",
  },
  {
    id: "3",
    title: "Demo meeting with Global Solutions",
    description: "Product demonstration and Q&A session",
    dueDate: "2024-12-08",
    priority: "Medium",
    status: "Todo",
    assignee: "Mike Williams",
    type: "Meeting",
  },
  {
    id: "4",
    title: "Update CRM records",
    description: "Add notes from yesterday's calls",
    dueDate: "2024-12-05",
    priority: "Low",
    status: "Todo",
    assignee: "Emily Davis",
    type: "Task",
  },
  {
    id: "5",
    title: "Contract review with Legal",
    description: "Review Enterprise Corp contract terms",
    dueDate: "2024-12-04",
    priority: "High",
    status: "Done",
    assignee: "Erik Brown",
    type: "Meeting",
  },
];

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleAddTask = () => {
    setDrawerMode("add");
    setSelectedTask(null);
    setDrawerOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setDrawerMode("edit");
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (drawerMode === "add") {
      const newTask: Task = {
        ...taskData as Task,
        id: Date.now().toString(),
      };
      setTasks([newTask, ...tasks]);
      toast.success("Activity created successfully");
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask?.id ? { ...task, ...taskData } : task
        )
      );
      toast.success("Activity updated successfully");
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Activity deleted successfully");
  };

  const handleToggleStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Done" ? "Todo" : "Done" }
          : task
      )
    );
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(task.type);
    const matchesAssignee = selectedAssignees.length === 0 || selectedAssignees.includes(task.assignee);
    const matchesDate = !selectedDate || task.dueDate === selectedDate.toISOString().split('T')[0];
    return matchesType && matchesAssignee && matchesDate;
  });

  // Categorize tasks
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = filteredTasks.filter(
    (task) => task.dueDate === today && task.status !== "Done"
  );
  const overdueTasks = filteredTasks.filter(
    (task) => task.dueDate < today && task.status !== "Done"
  );
  const upcomingTasks = filteredTasks.filter(
    (task) => task.dueDate > today && task.status !== "Done"
  );
  const completedTasks = filteredTasks.filter((task) => task.status === "Done");

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleAssignee = (assignee: string) => {
    if (selectedAssignees.includes(assignee)) {
      setSelectedAssignees(selectedAssignees.filter((a) => a !== assignee));
    } else {
      setSelectedAssignees([...selectedAssignees, assignee]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedAssignees([]);
    setSelectedDate(undefined);
  };

  const activeFiltersCount = selectedTypes.length + selectedAssignees.length + (selectedDate ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
          <p className="text-muted-foreground">
            Manage your tasks, meetings, and calls
          </p>
        </div>
        <Button onClick={handleAddTask} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Activity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Today's Tasks</p>
            <p className="text-2xl font-bold">{todayTasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{overdueTasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Upcoming</p>
            <p className="text-2xl font-bold">{upcomingTasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Call", "Email", "Meeting", "Task"].map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Assignee</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Erik Brown", "Sarah Johnson", "Mike Williams", "Emily Davis"].map((assignee) => (
              <DropdownMenuCheckboxItem
                key={assignee}
                checked={selectedAssignees.includes(assignee)}
                onCheckedChange={() => toggleAssignee(assignee)}
              >
                {assignee}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              {selectedDate ? selectedDate.toLocaleDateString() : "Filter by Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </PopoverContent>
        </Popover>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">
            Today {todayTasks.length > 0 && `(${todayTasks.length})`}
          </TabsTrigger>
          <TabsTrigger value="overdue">
            Overdue {overdueTasks.length > 0 && `(${overdueTasks.length})`}
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming {upcomingTasks.length > 0 && `(${upcomingTasks.length})`}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed {completedTasks.length > 0 && `(${completedTasks.length})`}
          </TabsTrigger>
          <TabsTrigger value="all">All ({filteredTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <TaskList
            tasks={todayTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </TabsContent>

        <TabsContent value="overdue">
          <TaskList
            tasks={overdueTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </TabsContent>

        <TabsContent value="upcoming">
          <TaskList
            tasks={upcomingTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </TabsContent>

        <TabsContent value="completed">
          <TaskList
            tasks={completedTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </TabsContent>

        <TabsContent value="all">
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        </TabsContent>
      </Tabs>

      {/* Drawer for Add/Edit */}
      <TaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
        mode={drawerMode}
      />
    </div>
  );
}
