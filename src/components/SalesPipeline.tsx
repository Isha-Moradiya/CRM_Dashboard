import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const pipelineData = [
  { stage: "New", count: 145 },
  { stage: "Qualified", count: 98 },
  { stage: "Proposal", count: 67 },
  { stage: "Negotiation", count: 42 },
  { stage: "Closed", count: 28 },
];

export function SalesPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity Stage Donut Chart</CardTitle>
        <CardDescription>Distribution of deals across pipeline stages</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="stage" 
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
              cursor={{ fill: "hsl(var(--accent))" }}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Stage Summary */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {pipelineData.map((stage, index) => (
            <div key={stage.stage} className="text-center">
              <div 
                className="w-full h-2 rounded-full mb-2"
                style={{ 
                  backgroundColor: `hsl(${220 - index * 20}, 70%, ${50 + index * 5}%)` 
                }}
              />
              <div className="text-xs text-muted-foreground mb-1">{stage.stage}</div>
              <div className="text-sm font-medium">{stage.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
