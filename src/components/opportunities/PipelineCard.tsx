import { useDraggable } from "@dnd-kit/core";
import { Building, Calendar, DollarSign, Eye, Edit, GripVertical } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Opportunity } from "../leads/types";
import { cn } from "../../lib/utils";

interface PipelineCardProps {
  opportunity: Opportunity;
  onView: () => void;
  onEdit: () => void;
}

export function PipelineCard({ opportunity, onView, onEdit }: PipelineCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: opportunity.id,
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return "text-green-600 dark:text-green-400";
    if (probability >= 50) return "text-yellow-600 dark:text-yellow-400";
    if (probability >= 25) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-move hover:shadow-md transition-shadow",
        isDragging && "opacity-50"
      )}
    >
      <CardContent className="p-4 space-y-3">
        {/* Drag Handle & Actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1">
            <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing mt-1">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{opportunity.title}</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Building className="w-3 h-3" />
                <span className="truncate">{opportunity.company}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value & Probability */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <DollarSign className="w-4 h-4" />
            {formatCurrency(opportunity.value)}
          </div>
          <Badge variant="outline" className={getProbabilityColor(opportunity.probability)}>
            {opportunity.probability}% chance
          </Badge>
        </div>

        {/* Expected Close Date & Owner */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {opportunity.expectedCloseDate}
          </div>
          <div className="truncate ml-2">{opportunity.owner}</div>
        </div>

        <div className="flex gap-1 justify-end mt-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onView}>
            <Eye className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
            <Edit className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card >
  );
}
