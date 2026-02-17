import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { LeadTable } from "../../components/leads/LeadTable";
import { LeadFilters } from "../../components/leads/LeadFilters";
import { LeadDrawer } from "../../components/leads/LeadDrawer";
import { LeadDetail } from "../../components/leads/LeadDetail";
import { Lead } from "../../components/leads/types";
import { toast } from "sonner";

// Mock data
const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Robert Martinez",
    company: "Tech Innovations",
    email: "robert@techinnovations.com",
    phone: "+1 (555) 123-4567",
    stage: "New",
    owner: "Erik Brown",
    expectedValue: "$15,000",
    createdDate: "2024-12-01",
    source: "Website",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    company: "Global Solutions",
    email: "jennifer@globalsolutions.com",
    phone: "+1 (555) 234-5678",
    stage: "Contacted",
    owner: "Sarah Johnson",
    expectedValue: "$28,000",
    createdDate: "2024-11-28",
    source: "Referral",
  },
  {
    id: "3",
    name: "Thomas Brown",
    company: "StartUp Hub",
    email: "thomas@startuphub.com",
    phone: "+1 (555) 345-6789",
    stage: "Qualified",
    owner: "Mike Williams",
    expectedValue: "$42,000",
    createdDate: "2024-11-25",
    source: "LinkedIn",
  },
  {
    id: "4",
    name: "Amanda Garcia",
    company: "Enterprise Corp",
    email: "amanda@enterprisecorp.com",
    phone: "+1 (555) 456-7890",
    stage: "Proposal",
    owner: "Emily Davis",
    expectedValue: "$65,000",
    createdDate: "2024-11-20",
    source: "Cold Call",
  },
  {
    id: "5",
    name: "Christopher Davis",
    company: "Digital Agency",
    email: "chris@digitalagency.com",
    phone: "+1 (555) 567-8901",
    stage: "New",
    owner: "Erik Brown",
    expectedValue: "$22,000",
    createdDate: "2024-12-05",
    source: "Events",
  },
];

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = selectedStages.length === 0 || selectedStages.includes(lead.stage);
    const matchesOwner = selectedOwners.length === 0 || selectedOwners.includes(lead.owner);
    
    return matchesSearch && matchesStage && matchesOwner;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  const handleAddLead = () => {
    setDrawerMode("add");
    setSelectedLead(null);
    setDrawerOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setDrawerMode("edit");
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleViewLead = (lead: Lead) => {
    setViewingLead(lead);
  };

  const handleSaveLead = (leadData: Partial<Lead>) => {
    if (drawerMode === "add") {
      const newLead: Lead = {
        ...leadData as Lead,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
      };
      setLeads([newLead, ...leads]);
      toast.success("Lead created successfully");
    } else {
      setLeads(leads.map((lead) => 
        lead.id === selectedLead?.id ? { ...lead, ...leadData } : lead
      ));
      toast.success("Lead updated successfully");
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    toast.success("Lead deleted successfully");
  };

  const handleClearFilters = () => {
    setSelectedStages([]);
    setSelectedOwners([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <Button onClick={handleAddLead} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <LeadFilters
          selectedStages={selectedStages}
          selectedOwners={selectedOwners}
          onStageChange={setSelectedStages}
          onOwnerChange={setSelectedOwners}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {paginatedLeads.length} of {filteredLeads.length} leads
      </div>

      {/* Table */}
      <LeadTable
        leads={paginatedLeads}
        onView={handleViewLead}
        onEdit={handleEditLead}
        onDelete={handleDeleteLead}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Drawer for Add/Edit */}
      <LeadDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveLead}
        lead={selectedLead}
        mode={drawerMode}
      />

      {/* Lead Detail Modal */}
      {viewingLead && (
        <LeadDetail
          lead={viewingLead}
          onClose={() => setViewingLead(null)}
          onEdit={() => {
            setViewingLead(null);
            handleEditLead(viewingLead);
          }}
        />
      )}
    </div>
  );
}
