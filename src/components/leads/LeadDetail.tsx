import { X, Mail, Phone, Building, Calendar, User, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lead, Activity } from "./types";

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

export function LeadDetail({ lead, onClose, onEdit }: LeadDetailProps) {
  const activities: Activity[] = [
    {
      id: "1",
      type: "Email",
      description: "Sent proposal email",
      date: "2 hours ago",
      user: "Erik Brown",
    },
    {
      id: "2",
      type: "Call",
      description: "Follow-up call completed",
      date: "1 day ago",
      user: "Erik Brown",
    },
    {
      id: "3",
      type: "Note",
      description: "Interested in enterprise plan",
      date: "2 days ago",
      user: "Sarah Johnson",
    },
  ];

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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{lead.name}</h2>
              <p className="text-muted-foreground">{lead.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onEdit}>Edit Lead</Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{lead.owner}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stage</p>
                  <Badge className={getStageColor(lead.stage)} variant="secondary">
                    {lead.stage}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Value</p>
                    <p className="font-medium">{lead.expectedValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created Date</p>
                    <p className="font-medium">{lead.createdDate}</p>
                  </div>
                </div>
              </div>
              {lead.source && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Source</p>
                  <p className="font-medium">{lead.source}</p>
                </div>
              )}
              {lead.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{lead.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        {index < activities.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{activity.type}</Badge>
                          <span>by {activity.user}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
