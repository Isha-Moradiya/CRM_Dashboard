import { useState } from "react";
import { Plus, DollarSign, Target, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { PipelineBoard } from "../../components/opportunities/PipelineBoard";
import { OpportunityDrawer } from "../../components/opportunities/OpportunityDrawer";
import { Opportunity } from "../../components/leads/types";
import { toast } from "sonner";

// Mock data
const initialOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "Tech Innovations",
    stage: "Proposal",
    value: 125000,
    probability: 75,
    expectedCloseDate: "2024-12-30",
    owner: "Erik Brown",
    description: "Annual enterprise license for 500 users",
  },
  {
    id: "2",
    title: "Cloud Infrastructure Migration",
    company: "Global Solutions",
    stage: "Qualified",
    value: 85000,
    probability: 60,
    expectedCloseDate: "2025-01-15",
    owner: "Sarah Johnson",
    description: "Complete cloud migration project",
  },
  {
    id: "3",
    title: "Marketing Automation Platform",
    company: "Digital Agency",
    stage: "New",
    value: 45000,
    probability: 30,
    expectedCloseDate: "2025-01-30",
    owner: "Mike Williams",
    description: "Marketing automation tools setup",
  },
  {
    id: "4",
    title: "CRM Implementation",
    company: "StartUp Hub",
    stage: "Negotiation",
    value: 95000,
    probability: 85,
    expectedCloseDate: "2024-12-20",
    owner: "Emily Davis",
    description: "Full CRM implementation and training",
  },
  {
    id: "5",
    title: "Data Analytics Solution",
    company: "Enterprise Corp",
    stage: "Won",
    value: 150000,
    probability: 100,
    expectedCloseDate: "2024-12-05",
    owner: "Erik Brown",
    description: "Business intelligence and analytics platform",
  },
];

export function Deals() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const handleAddOpportunity = () => {
    setDrawerMode("add");
    setSelectedOpportunity(null);
    setDrawerOpen(true);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setDrawerMode("edit");
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
  };

  const handleViewOpportunity = (opportunity: Opportunity) => {
    // Can implement a view modal similar to LeadDetail if needed
    toast.info(`Viewing: ${opportunity.title}`);
  };

  const handleSaveOpportunity = (opportunityData: Partial<Opportunity>) => {
    if (drawerMode === "add") {
      const newOpportunity: Opportunity = {
        ...opportunityData as Opportunity,
        id: Date.now().toString(),
      };
      setOpportunities([...opportunities, newOpportunity]);
      toast.success("Opportunity created successfully");
    } else if (selectedOpportunity) {
      setOpportunities(
        opportunities.map((opp) =>
          opp.id === selectedOpportunity.id ? { ...opp, ...opportunityData } : opp
        )
      );
      toast.success("Opportunity updated successfully");
    }
  };

  const handleUpdateOpportunityStage = (id: string, newStage: string) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, stage: newStage } : opp
      )
    );
    toast.success(`Opportunity moved to ${newStage}`);
  };

  // Calculate metrics
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const totalOpportunities = opportunities.length;
  const weightedValue = opportunities.reduce(
    (sum, opp) => sum + (opp.value * opp.probability) / 100,
    0
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Opportunities</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline and track deals
          </p>
        </div>
        <Button onClick={handleAddOpportunity} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Opportunity
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Opportunities</p>
                <p className="text-2xl font-bold">{totalOpportunities}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expected Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(weightedValue)}</p>
                <p className="text-xs text-muted-foreground mt-1">Weighted by probability</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="bg-background border border-border rounded-lg p-6">
        <PipelineBoard
          opportunities={opportunities}
          onUpdateOpportunity={handleUpdateOpportunityStage}
          onViewOpportunity={handleViewOpportunity}
          onEditOpportunity={handleEditOpportunity}
        />
      </div>

      {/* Drawer for Add/Edit */}
      <OpportunityDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveOpportunity}
        opportunity={selectedOpportunity}
        mode={drawerMode}
      />
    </div>
  );
}
