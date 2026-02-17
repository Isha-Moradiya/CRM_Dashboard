import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { PipelineStage } from "./PipelineStage";
import { PipelineCard } from "./PipelineCard";
import { Opportunity } from "../leads/types";

interface PipelineBoardProps {
  opportunities: Opportunity[];
  onUpdateOpportunity: (id: string, stage: string) => void;
  onViewOpportunity: (opportunity: Opportunity) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
}

const stages = [
  { id: "New", name: "New", color: "bg-blue-500" },
  { id: "Qualified", name: "Qualified", color: "bg-purple-500" },
  { id: "Proposal", name: "Proposal", color: "bg-orange-500" },
  { id: "Negotiation", name: "Negotiation", color: "bg-yellow-500" },
  { id: "Won", name: "Won", color: "bg-green-500" },
];

export function PipelineBoard({ 
  opportunities, 
  onUpdateOpportunity,
  onViewOpportunity,
  onEditOpportunity,
}: PipelineBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const activeOpportunity = opportunities.find((opp) => opp.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const opportunityId = active.id as string;
      const newStage = over.id as string;
      onUpdateOpportunity(opportunityId, newStage);
    }
    
    setActiveId(null);
  };

  const getOpportunitiesByStage = (stageId: string) => {
    return opportunities.filter((opp) => opp.stage === stageId);
  };

  const getStageValue = (stageId: string) => {
    return opportunities
      .filter((opp) => opp.stage === stageId)
      .reduce((sum, opp) => sum + opp.value, 0);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <PipelineStage
            key={stage.id}
            id={stage.id}
            name={stage.name}
            color={stage.color}
            opportunities={getOpportunitiesByStage(stage.id)}
            totalValue={getStageValue(stage.id)}
            onViewOpportunity={onViewOpportunity}
            onEditOpportunity={onEditOpportunity}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeOpportunity ? (
          <div className="rotate-3 opacity-80">
            <PipelineCard
              opportunity={activeOpportunity}
              onView={() => {}}
              onEdit={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
