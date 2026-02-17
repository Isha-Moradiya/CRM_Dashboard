export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: string;
  owner: string;
  expectedValue: string;
  createdDate: string;
  source?: string;
  notes?: string;
  lastContactDate?: string;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  user: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  description?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  type: "Individual" | "Company";
  tags?: string[];
  notes?: string;
  createdDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  assignee: string;
  type: "Call" | "Email" | "Meeting" | "Task";
}
