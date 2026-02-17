import { useState, useEffect } from "react";
import { DrawerCustom } from "../ui/drawer-custom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Opportunity } from "../leads/types";

interface OpportunityDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (opportunity: Partial<Opportunity>) => void;
  opportunity?: Opportunity | null;
  mode: "add" | "edit";
}

export function OpportunityDrawer({ 
  open, 
  onClose, 
  onSave, 
  opportunity, 
  mode 
}: OpportunityDrawerProps) {
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    title: "",
    company: "",
    stage: "New",
    value: 0,
    probability: 50,
    expectedCloseDate: "",
    owner: "Erik Brown",
    description: "",
  });

  useEffect(() => {
    if (opportunity && mode === "edit") {
      setFormData(opportunity);
    } else {
      setFormData({
        title: "",
        company: "",
        stage: "New",
        value: 0,
        probability: 50,
        expectedCloseDate: "",
        owner: "Erik Brown",
        description: "",
      });
    }
  }, [opportunity, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DrawerCustom
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add New Opportunity" : "Edit Opportunity"}
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Create Opportunity" : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enterprise Software License"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Tech Corp"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage">Stage</Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => handleChange("stage", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Proposal">Proposal</SelectItem>
              <SelectItem value="Negotiation">Negotiation</SelectItem>
              <SelectItem value="Won">Won</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value ($) *</Label>
          <Input
            id="value"
            type="number"
            value={formData.value}
            onChange={(e) => handleChange("value", parseFloat(e.target.value) || 0)}
            placeholder="50000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="probability">Probability (%) *</Label>
          <Input
            id="probability"
            type="number"
            min="0"
            max="100"
            value={formData.probability}
            onChange={(e) => handleChange("probability", parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedCloseDate">Expected Close Date *</Label>
          <Input
            id="expectedCloseDate"
            type="date"
            value={formData.expectedCloseDate}
            onChange={(e) => handleChange("expectedCloseDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner">Owner</Label>
          <Select
            value={formData.owner}
            onValueChange={(value) => handleChange("owner", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Erik Brown">Erik Brown</SelectItem>
              <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              <SelectItem value="Mike Williams">Mike Williams</SelectItem>
              <SelectItem value="Emily Davis">Emily Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Additional details about this opportunity..."
            rows={4}
          />
        </div>
      </form>
    </DrawerCustom>
  );
}
