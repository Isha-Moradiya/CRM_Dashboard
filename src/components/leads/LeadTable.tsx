import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Lead } from "./types";

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export function LeadTable({ leads, onView, onEdit, onDelete }: LeadTableProps) {
  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      "New": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "Contacted": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      "Qualified": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      "Proposal": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      "Won": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      "Lost": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[stage] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Expected Value</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium">{lead.name}</span>
                </div>
              </TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell className="text-muted-foreground">{lead.email}</TableCell>
              <TableCell className="text-muted-foreground">{lead.phone}</TableCell>
              <TableCell>
                <Badge className={getStageColor(lead.stage)} variant="secondary">
                  {lead.stage}
                </Badge>
              </TableCell>
              <TableCell>{lead.owner}</TableCell>
              <TableCell className="font-medium">{lead.expectedValue}</TableCell>
              <TableCell className="text-muted-foreground">{lead.createdDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(lead)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(lead)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(lead.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
