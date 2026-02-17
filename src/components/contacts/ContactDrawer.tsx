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
import { Contact } from "../leads/types";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (contact: Partial<Contact>) => void;
  contact?: Contact | null;
  mode: "add" | "edit";
}

export function ContactDrawer({ open, onClose, onSave, contact, mode }: ContactDrawerProps) {
  const [formData, setFormData] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    type: "Individual",
    tags: [],
    notes: "",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (contact && mode === "edit") {
      setFormData(contact);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        type: "Individual",
        tags: [],
        notes: "",
      });
    }
  }, [contact, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...(formData.tags || []), tagInput.trim()];
      handleChange("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = (formData.tags || []).filter((tag) => tag !== tagToRemove);
    handleChange("tags", newTags);
  };

  return (
    <DrawerCustom
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add New Contact" : "Edit Contact"}
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Create Contact" : "Save Changes"}
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
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@company.com"
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
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Tech Corp"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            placeholder="CEO"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type and press Enter to add tags"
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {formData.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional information about this contact..."
            rows={4}
          />
        </div>
      </form>
    </DrawerCustom>
  );
}
