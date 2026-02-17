import { TrendingUp, UserCheck, Users, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

const stats = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-blue-500",
  },
  {
    title: "Converted Leads",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: UserCheck,
    color: "bg-emerald-500",
  },
  {
    title: "Active Customers",
    value: "923",
    change: "+5.7%",
    trend: "up",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Pending Follow-ups",
    value: "156",
    change: "-3.1%",
    trend: "down",
    icon: Clock,
    color: "bg-orange-500",
  },
];

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(stat.color, "p-3 rounded-lg")}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                    stat.trend === "up"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
