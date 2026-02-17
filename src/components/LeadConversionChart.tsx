import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const data = [
  { month: "Jan", leads: 420, converted: 180 },
  { month: "Feb", leads: 480, converted: 210 },
  { month: "Mar", leads: 540, converted: 250 },
  { month: "Apr", leads: 510, converted: 230 },
  { month: "May", leads: 620, converted: 290 },
  { month: "Jun", leads: 680, converted: 320 },
];

export function LeadConversionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue Chart</CardTitle>
        <CardDescription>Leads trend chart showing conversion rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--popover-foreground))" }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="leads" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Total Leads"
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="converted" 
              stroke="hsl(142.1 76.2% 36.3%)" 
              strokeWidth={2}
              name="Converted"
              dot={{ fill: "hsl(142.1 76.2% 36.3%)", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
