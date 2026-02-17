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
import { Lead } from "./types";

interface LeadDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (lead: Partial<Lead>) => void;
  lead?: Lead | null;
  mode: "add" | "edit";
}

export function LeadDrawer({ open, onClose, onSave, lead, mode }: LeadDrawerProps) {
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: "",
    company: "",
    email: "",
    phone: "",
    stage: "New",
    owner: "Erik Brown",
    expectedValue: "",
    source: "",
    notes: "",
  });

  useEffect(() => {
    if (lead && mode === "edit") {
      setFormData(lead);
    } else {
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        stage: "New",
        owner: "Erik Brown",
        expectedValue: "",
        source: "",
        notes: "",
      });
    }
  }, [lead, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DrawerCustom
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add New Lead" : "Edit Lead"}
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Create Lead" : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Smith"
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
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@techcorp.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
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
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Proposal">Proposal</SelectItem>
              <SelectItem value="Won">Won</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="expectedValue">Expected Value</Label>
          <Input
            id="expectedValue"
            value={formData.expectedValue}
            onChange={(e) => handleChange("expectedValue", e.target.value)}
            placeholder="$15,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Source</Label>
          <Select
            value={formData.source}
            onValueChange={(value) => handleChange("source", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Cold Call">Cold Call</SelectItem>
              <SelectItem value="Events">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional information about this lead..."
            rows={4}
          />
        </div>
      </form>
    </DrawerCustom>
  );
}
