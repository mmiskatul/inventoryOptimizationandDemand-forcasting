import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Archive, 
  Loader, 
  TrendingUp, 
  MoreHorizontal, 
  User, 
  Filter, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ icon: Icon, title, value, trend, trendColor, bg }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-6 rounded-md bg-gray-200"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-xl ${bg}`}>
              <Icon className={`h-6 w-6 ${trendColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center text-sm ${trendColor}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{trend}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your inventory management dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <StatCard 
            icon={Package} 
            title="Total Products" 
            value="1,248" 
            trend="12.5%" 
            trendColor="text-green-600" 
            bg="bg-indigo-50 text-indigo-600"
          />
          <StatCard 
            icon={Archive} 
            title="Low Stock" 
            value="18" 
            trend="5.2%" 
            trendColor="text-red-600" 
            bg="bg-red-50 text-red-600"
          />
          <StatCard 
            icon={Loader} 
            title="Pending Orders" 
            value="12" 
            trend="8.3%" 
            trendColor="text-green-600" 
            bg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button className="flex items-center text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>
              <button className="flex items-center text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                <Calendar className="h-4 w-4 mr-1" />
                This Week
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">Time</th>
                    <th scope="col" className="px-6 py-4 font-medium">User</th>
                    <th scope="col" className="px-6 py-4 font-medium">Action</th>
                    <th scope="col" className="px-6 py-4 font-medium">Details</th>
                    <th scope="col" className="px-6 py-4 font-medium text-right">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Rows */}
                  {[
                    {
                      time: "10:45 AM",
                      user: "Md Miskatul Masabi",
                      color: "blue",
                      action: "Updated Stock",
                      badge: "bg-blue-100 text-blue-800",
                      details: "Set quantity of 'A4 Paper' to 500."
                    },
                    {
                      time: "09:30 AM",
                      user: "Mohammod",
                      color: "purple",
                      action: "Created Order",
                      badge: "bg-purple-100 text-purple-800",
                      details: "PO-2025-0004 for Acme Corp."
                    },
                    {
                      time: "Yesterday",
                      user: "Joma akter",
                      color: "green",
                      action: "Added Product",
                      badge: "bg-green-100 text-green-800",
                      details: "New item: 'Premium Notebook'"
                    }
                  ].map((row, i) => (
                    <tr key={i} className="bg-white border-b border-gray-200 hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.time}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full bg-${row.color}-100 flex items-center justify-center mr-3`}>
                            <User className={`h-4 w-4 text-${row.color}-600`} />
                          </div>
                          {row.user}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${row.badge}`}>{row.action}</span>
                      </td>
                      <td className="px-6 py-4">{row.details}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-700">Showing 3 of 128 activities</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
