import { Phone, Mail, Calendar, CheckCircle2, UserPlus, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "call",
    icon: Phone,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    title: "Called John Smith",
    description: "Discussed project requirements",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "email",
    icon: Mail,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    title: "Sent proposal to ABC Corp",
    description: "Q1 2025 partnership proposal",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "meeting",
    icon: Calendar,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    title: "Meeting scheduled",
    description: "Demo with Tech Solutions Inc",
    time: "5 hours ago",
  },
  {
    id: 4,
    type: "deal",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    title: "Deal closed",
    description: "$25,000 contract signed",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "lead",
    icon: UserPlus,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    title: "New lead added",
    description: "Sarah Johnson from Marketing Co",
    time: "Yesterday",
  },
  {
    id: 6,
    type: "document",
    icon: FileText,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    title: "Contract uploaded",
    description: "Enterprise agreement v2.1",
    time: "2 days ago",
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Activities</CardTitle>
        <CardDescription>Recent calls, meetings, and emails</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={`${activity.bgColor} p-2 rounded-lg h-fit`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
