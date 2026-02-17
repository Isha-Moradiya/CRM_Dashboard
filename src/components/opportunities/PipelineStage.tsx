import { useDroppable } from "@dnd-kit/core";
import { PipelineCard } from "./PipelineCard";
import { Opportunity } from "../leads/types";
import { cn } from "../../lib/utils";

interface PipelineStageProps {
  id: string;
  name: string;
  color: string;
  opportunities: Opportunity[];
  totalValue: number;
  onViewOpportunity: (opportunity: Opportunity) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
}

export function PipelineStage({
  id,
  name,
  color,
  opportunities,
  totalValue,
  onViewOpportunity,
  onEditOpportunity,
}: PipelineStageProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-accent/50 rounded-lg">
        {/* Stage Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("w-3 h-3 rounded-full", color)} />
            <h3 className="font-semibold">{name}</h3>
            <span className="text-sm text-muted-foreground">({opportunities.length})</span>
          </div>
          <p className="text-sm font-medium text-primary">
            {formatCurrency(totalValue)}
          </p>
        </div>

        {/* Drop Zone */}
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-[450px] p-4 space-y-3",
            isOver && "bg-primary/5 ring-2 ring-primary ring-inset"
          )}
        >
          {opportunities.map((opportunity) => (
            <PipelineCard
              key={opportunity.id}
              opportunity={opportunity}
              onView={() => onViewOpportunity(opportunity)}
              onEdit={() => onEditOpportunity(opportunity)}
            />
          ))}
          {opportunities.length === 0 && (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
              Drop opportunities here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
