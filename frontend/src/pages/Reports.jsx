import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar, Filter, Printer, Eye, ChevronDown } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('Stock Report');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [showPreview, setShowPreview] = useState(false);

  const reportTypes = [
    { id: 'stock', name: 'Stock Report', icon: <FileText className="h-5 w-5" /> },
    { id: 'sales', name: 'Sales Report', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'employee', name: 'Employee Performance', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'financial', name: 'Financial Summary', icon: <PieChart className="h-5 w-5" /> }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // UPDATED: Added 'imageUrl' to each product entry
  const mockReportData = {
    'Stock Report': [
      { id: 'P-001', name: 'A4 Paper 80gsm', category: 'Stationery', startQty: 450, endQty: 320, netChange: -130, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=A4' },
      { id: 'P-002', name: 'Staplers', category: 'Stationery', startQty: 120, endQty: 85, netChange: -35, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Stapler' },
      { id: 'P-003', name: 'Laser Printer', category: 'Electronics', startQty: 15, endQty: 12, netChange: -3, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Printer' },
      { id: 'P-004', name: 'Coffee Beans', category: 'Pantry', startQty: 0, endQty: 25, netChange: 25, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Coffee' },
      { id: 'P-005', name: 'Cleaning Spray', category: 'Janitorial', startQty: 45, endQty: 30, netChange: -15, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Spray' }
    ],
    'Sales Report': [
      { id: 'S-001', product: 'A4 Paper 80gsm', category: 'Stationery', unitsSold: 320, revenue: 800.00, profit: 240.00, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=A4' },
      { id: 'S-002', product: 'Staplers', category: 'Stationery', unitsSold: 85, revenue: 467.50, profit: 140.25, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Stapler' },
      { id: 'S-003', product: 'Laser Printer', category: 'Electronics', unitsSold: 3, revenue: 1050.00, profit: 315.00, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Printer' },
      { id: 'S-004', product: 'Coffee Beans', category: 'Pantry', unitsSold: 25, revenue: 375.00, profit: 112.50, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Coffee' },
      { id: 'S-005', product: 'Cleaning Spray', category: 'Janitorial', unitsSold: 30, revenue: 262.50, profit: 78.75, imageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=Spray' }
    ]
  };

  const handleGenerateReport = () => {
    setShowPreview(true);
  };

  const renderReportPreview = () => {
    if (!showPreview) return null;

    const data = mockReportData[reportType] || [];

    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Report Preview: {reportType}</h3>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Printer className="h-4 w-4 mr-2" /> Print
            </button>
            <button className="flex items-center px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-800">5</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Net Change</p>
              <p className="text-2xl font-bold text-green-800">-158</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-amber-800">2</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Report Period</p>
              <p className="text-lg font-bold text-purple-800">Jan 1-31, 2025</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {/* ADDED: Empty header for the image column */}
                <th className="px-3 py-3 w-16"><span className="sr-only">Image</span></th>
                {reportType === 'Stock Report' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Starting Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ending Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Change</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80">
                  {/* ADDED: Table cell to display the image */}
                  <td className="px-3 py-2">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name || item.product}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4">{item.name || item.product}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  {reportType === 'Stock Report' ? (
                    <>
                      <td className="px-6 py-4">{item.startQty}</td>
                      <td className="px-6 py-4">{item.endQty}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.netChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.netChange >= 0 ? '+' : ''}{item.netChange}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">{item.unitsSold}</td>
                      <td className="px-6 py-4">${item.revenue.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          ${item.profit.toFixed(2)}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate detailed reports and analyze business performance</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    reportType === type.name
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setReportType(type.name)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${
                      reportType === type.name ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type.icon}
                    </div>
                    <span className="ml-3 font-medium">{type.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  className={`py-2 px-3 border rounded-lg text-sm transition-colors ${
                    dateRange === range.value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setDateRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button 
            className="flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            onClick={handleGenerateReport}
          >
            <Eye className="h-5 w-5 mr-2" /> Generate Report
          </button>
          <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 mr-2" /> Advanced Filters
          </button>
          <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5 mr-2" /> Export Data
          </button>
        </div>

        {renderReportPreview()}
      </div>
    </div>
  );
};

export default Reports;