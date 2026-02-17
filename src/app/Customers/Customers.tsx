import { Plus, Filter, Search, Mail, Phone, MoreVertical, Download } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    source: "Website",
    totalValue: "$45,000",
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
    totalValue: "$32,500",
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
    totalValue: "$28,000",
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
    totalValue: "$52,000",
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
    totalValue: "$18,500",
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
    totalValue: "$67,000",
    lastActivity: "Yesterday",
    avatar: "LA",
  },
];

const statusColors = {
  Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Pending: "bg-orange-50 text-orange-600 border-orange-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
};

export function Customers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 mb-1">Customers</h2>
          <p className="text-slate-600">Manage your customer database</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-600 text-sm mb-1">Total Customers</div>
          <div className="text-slate-800">923</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-600 text-sm mb-1">Active</div>
          <div className="text-emerald-600">756</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-600 text-sm mb-1">Pending</div>
          <div className="text-orange-600">112</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-600 text-sm mb-1">Total Revenue</div>
          <div className="text-slate-800">$2.4M</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
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
                  Total Value
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
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {customer.source}
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {customer.totalValue}
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
    </div>
  );
}
