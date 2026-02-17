import { Mail, Phone, MoreVertical } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    source: "Website",
    lastActivity: "2 hours ago",
    avatar: "JS",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@marketing.io",
    phone: "+1 (555) 234-5678",
    status: "Active",
    source: "Referral",
    lastActivity: "5 hours ago",
    avatar: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@techcorp.com",
    phone: "+1 (555) 345-6789",
    status: "Pending",
    source: "LinkedIn",
    lastActivity: "1 day ago",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@startup.co",
    phone: "+1 (555) 456-7890",
    status: "Active",
    source: "Cold Call",
    lastActivity: "3 hours ago",
    avatar: "ED",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@enterprise.net",
    phone: "+1 (555) 567-8901",
    status: "Inactive",
    source: "Event",
    lastActivity: "1 week ago",
    avatar: "DW",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@solutions.com",
    phone: "+1 (555) 678-9012",
    status: "Active",
    source: "Website",
    lastActivity: "Yesterday",
    avatar: "LA",
  },
];

const statusColors = {
  Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Pending: "bg-orange-50 text-orange-600 border-orange-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
};

const sourceColors = {
  Website: "bg-blue-50 text-blue-600",
  Referral: "bg-purple-50 text-purple-600",
  LinkedIn: "bg-sky-50 text-sky-600",
  "Cold Call": "bg-pink-50 text-pink-600",
  Event: "bg-amber-50 text-amber-600",
};

export function CustomersTable() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-slate-800 mb-1">Customers</h3>
            <p className="text-slate-600">Manage your customer database</p>
          </div>
          <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-slate-600 text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">{customer.avatar}</span>
                    </div>
                    <span className="text-slate-800">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs rounded-full border ${
                      statusColors[customer.status as keyof typeof statusColors]
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs rounded-full ${
                      sourceColors[customer.source as keyof typeof sourceColors]
                    }`}
                  >
                    {customer.source}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {customer.lastActivity}
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div className="text-slate-600 text-sm">
          Showing 1 to 6 of 923 customers
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
