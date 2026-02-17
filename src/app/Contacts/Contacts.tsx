import { useState } from "react";
import { Plus, Search, Users, Building } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { ContactTable } from "../../components/contacts/ContactTable";
import { ContactDrawer } from "../../components/contacts/ContactDrawer";
import { Contact } from "../../components/leads/types";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

// Mock data
const initialContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    position: "CEO",
    type: "Individual",
    tags: ["VIP", "Decision Maker"],
    createdDate: "2024-11-15",
  },
  {
    id: "2",
    name: "Tech Innovations Ltd",
    email: "contact@techinnovations.com",
    phone: "+1 (555) 234-5678",
    company: "Tech Innovations Ltd",
    position: "N/A",
    type: "Company",
    tags: ["Enterprise", "Partner"],
    createdDate: "2024-11-20",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@globalsolutions.com",
    phone: "+1 (555) 345-6789",
    company: "Global Solutions",
    position: "CTO",
    type: "Individual",
    tags: ["Tech Lead"],
    createdDate: "2024-11-22",
  },
  {
    id: "4",
    name: "Digital Agency Inc",
    email: "hello@digitalagency.com",
    phone: "+1 (555) 456-7890",
    company: "Digital Agency Inc",
    position: "N/A",
    type: "Company",
    tags: ["Marketing", "SMB"],
    createdDate: "2024-11-25",
  },
  {
    id: "5",
    name: "Michael Williams",
    email: "michael@startuphub.com",
    phone: "+1 (555) 567-8901",
    company: "StartUp Hub",
    position: "Founder",
    type: "Individual",
    tags: ["Startup", "Influencer"],
    createdDate: "2024-12-01",
  },
];

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterType, setFilterType] = useState<"all" | "Individual" | "Company">("all");

  const itemsPerPage = 10;

  // Filter and search logic
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || contact.type === filterType;

    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  const handleAddContact = () => {
    setDrawerMode("add");
    setSelectedContact(null);
    setDrawerOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setDrawerMode("edit");
    setSelectedContact(contact);
    setDrawerOpen(true);
  };

  const handleViewContact = (contact: Contact) => {
    toast.info(`Viewing: ${contact.name}`);
  };

  const handleSaveContact = (contactData: Partial<Contact>) => {
    if (drawerMode === "add") {
      const newContact: Contact = {
        ...contactData as Contact,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
      };
      setContacts([newContact, ...contacts]);
      toast.success("Contact created successfully");
    } else {
      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact?.id ? { ...contact, ...contactData } : contact
        )
      );
      toast.success("Contact updated successfully");
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  // Calculate counts
  const totalContacts = contacts.length;
  const individualCount = contacts.filter((c) => c.type === "Individual").length;
  const companyCount = contacts.filter((c) => c.type === "Company").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your customers and company contacts
          </p>
        </div>
        <Button onClick={handleAddContact} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Contact
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{totalContacts}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Individual Contacts</p>
                <p className="text-2xl font-bold">{individualCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-2xl font-bold">{companyCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" onValueChange={(value) => setFilterType(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="Individual">Individuals</TabsTrigger>
          <TabsTrigger value="Company">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedContacts.length} of {filteredContacts.length} contacts
          </div>

          <ContactTable
            contacts={paginatedContacts}
            onView={handleViewContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </TabsContent>

        <TabsContent value="Individual" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedContacts.length} of {filteredContacts.length} contacts
          </div>

          <ContactTable
            contacts={paginatedContacts}
            onView={handleViewContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </TabsContent>

        <TabsContent value="Company" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedContacts.length} of {filteredContacts.length} contacts
          </div>

          <ContactTable
            contacts={paginatedContacts}
            onView={handleViewContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </TabsContent>
      </Tabs>

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
      <ContactDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveContact}
        contact={selectedContact}
        mode={drawerMode}
      />
    </div>
  );
}
