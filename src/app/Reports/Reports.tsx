import { BarChart3, Download, FileText, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { LeadConversionChart } from "../../components/LeadConversionChart";
import { SalesPipeline } from "../../components/SalesPipeline";

export function Reports() {
  const reports = [
    {
      id: "sales-performance",
      title: "Sales Performance Report",
      description: "Comprehensive sales metrics and team performance",
      icon: TrendingUp,
      lastGenerated: "Dec 5, 2024",
    },
    {
      id: "lead-analysis",
      title: "Lead Analysis Report",
      description: "Lead sources, conversion rates, and trends",
      icon: Users,
      lastGenerated: "Dec 4, 2024",
    },
    {
      id: "revenue-forecast",
      title: "Revenue Forecast",
      description: "Projected revenue based on pipeline data",
      icon: DollarSign,
      lastGenerated: "Dec 3, 2024",
    },
    {
      id: "activity-summary",
      title: "Activity Summary",
      description: "Team activities, tasks, and productivity metrics",
      icon: FileText,
      lastGenerated: "Dec 2, 2024",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analytics and insights for your CRM data
          </p>
        </div>
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Generate Custom Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$1.2M</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +18% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">43.4%</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +5.7% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Leads</p>
                    <p className="text-2xl font-bold">847</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +12.5% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Won Deals</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +21% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <LeadConversionChart />
            <SalesPipeline />
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Sales performance by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Erik Brown", deals: 12, revenue: "$450K", conversion: "48%" },
                  { name: "Sarah Johnson", deals: 9, revenue: "$320K", conversion: "42%" },
                  { name: "Mike Williams", deals: 7, revenue: "$280K", conversion: "39%" },
                  { name: "Emily Davis", deals: 10, revenue: "$380K", conversion: "45%" },
                ].map((member) => (
                  <div key={member.name} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.deals} deals closed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{member.revenue}</div>
                        <div className="text-sm text-muted-foreground">{member.conversion} conversion</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <report.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Marketing Reports</h3>
              <p className="text-muted-foreground">
                Marketing reports will be available here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Reports</h3>
              <p className="text-muted-foreground mb-4">
                Create custom reports tailored to your needs
              </p>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create Custom Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
