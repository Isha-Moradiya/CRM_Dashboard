import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface LeadFiltersProps {
  selectedStages: string[];
  selectedOwners: string[];
  onStageChange: (stages: string[]) => void;
  onOwnerChange: (owners: string[]) => void;
  onClearFilters: () => void;
}

const stages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
const owners = ["Erik Brown", "Sarah Johnson", "Mike Williams", "Emily Davis"];

export function LeadFilters({
  selectedStages,
  selectedOwners,
  onStageChange,
  onOwnerChange,
  onClearFilters,
}: LeadFiltersProps) {
  const activeFiltersCount = selectedStages.length + selectedOwners.length;

  const toggleStage = (stage: string) => {
    if (selectedStages.includes(stage)) {
      onStageChange(selectedStages.filter((s) => s !== stage));
    } else {
      onStageChange([...selectedStages, stage]);
    }
  };

  const toggleOwner = (owner: string) => {
    if (selectedOwners.includes(owner)) {
      onOwnerChange(selectedOwners.filter((o) => o !== owner));
    } else {
      onOwnerChange([...selectedOwners, owner]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {stages.map((stage) => (
            <DropdownMenuCheckboxItem
              key={stage}
              checked={selectedStages.includes(stage)}
              onCheckedChange={() => toggleStage(stage)}
            >
              {stage}
            </DropdownMenuCheckboxItem>
          ))}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filter by Owner</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {owners.map((owner) => (
            <DropdownMenuCheckboxItem
              key={owner}
              checked={selectedOwners.includes(owner)}
              onCheckedChange={() => toggleOwner(owner)}
            >
              {owner}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeFiltersCount > 0 && (
        <Button variant="ghost" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
