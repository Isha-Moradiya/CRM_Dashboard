import { DollarSign, Target, TrendingUp, Users, Calendar } from "lucide-react";
import { KpiCard } from "../../components/dashboard/KpiCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { LeadConversionChart } from "../../components/LeadConversionChart";
import { SalesPipeline } from "../../components/SalesPipeline";
import { RecentActivities } from "../../components/RecentActivities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's your CRM overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Total Leads"
          value="2,847"
          change="+12.5% from last month"
          trend="up"
          icon={Users}
        />
        <KpiCard
          title="Open Opportunities"
          value="156"
          change="+8.2% from last month"
          trend="up"
          icon={Target}
        />
        <KpiCard
          title="Conversion Rate"
          value="43.4%"
          change="+5.7% from last month"
          trend="up"
          icon={TrendingUp}
        />
        <KpiCard
          title="Expected Revenue"
          value="$1.8M"
          description="Pipeline value"
          icon={DollarSign}
        />
        <KpiCard
          title="Won Deals This Month"
          value="28"
          change="$245K revenue"
          trend="up"
          icon={Calendar}
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Chart</TabsTrigger>
          <TabsTrigger value="leads">Lead Trend</TabsTrigger>
          <TabsTrigger value="pipeline">Opportunity Stage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LeadConversionChart />
            <SalesPipeline />
          </div>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LeadConversionChart />
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Website", count: 856, percentage: 30 },
                    { source: "Referral", count: 642, percentage: 22 },
                    { source: "LinkedIn", count: 571, percentage: 20 },
                    { source: "Cold Call", count: 428, percentage: 15 },
                    { source: "Events", count: 350, percentage: 13 },
                  ].map((item) => (
                    <div key={item.source} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.source}</span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pipeline" className="space-y-4">
          <SalesPipeline />
        </TabsContent>
      </Tabs>

      {/* Latest Activities */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Latest Leads</CardTitle>
              <CardDescription>Last 10 leads with quick view and stage badge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Robert Martinez", company: "Tech Innovations", stage: "New", value: "$15,000" },
                  { name: "Jennifer Lee", company: "Global Solutions", stage: "Contacted", value: "$28,000" },
                  { name: "Thomas Brown", company: "StartUp Hub", stage: "Qualified", value: "$42,000" },
                  { name: "Amanda Garcia", company: "Enterprise Corp", stage: "Proposal", value: "$65,000" },
                  { name: "Christopher Davis", company: "Digital Agency", stage: "New", value: "$22,000" },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{lead.value}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {lead.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <RecentActivities />
      </div>
    </div>
  );
}
