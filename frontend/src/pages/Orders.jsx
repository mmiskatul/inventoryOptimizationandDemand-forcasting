import React, { useState } from 'react';
import { FilePlus2, MoreVertical, Search, Filter, Download, ChevronDown, Calendar, Truck, CheckCircle, Clock, AlertCircle, Plus, Bell, History, Package, TrendingUp, MapPin } from 'lucide-react';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingId, setTrackingId] = useState('');
  
  const mockOrders = [
    { id: 'PO-2025-0001', supplier: 'Best Supplies Ltd.', status: 'Delivered', amount: 1250.00, date: '2025-01-15', items: 12, deliveryDate: '2025-01-20' },
    { id: 'PO-2025-0002', supplier: 'Office Essentials Inc.', status: 'In Transit', amount: 850.50, date: '2025-01-18', items: 8, deliveryDate: '2025-01-25' },
    { id: 'PO-2025-0003', supplier: 'Global Tech', status: 'Pending', amount: 3500.00, date: '2025-01-20', items: 3, deliveryDate: '2025-02-05' },
    { id: 'PO-2025-0004', supplier: 'Quality Materials Co.', status: 'Processing', amount: 2200.75, date: '2025-01-22', items: 15, deliveryDate: '2025-02-01' },
    { id: 'PO-2025-0005', supplier: 'Reliable Parts Ltd.', status: 'Delayed', amount: 980.25, date: '2025-01-10', items: 7, deliveryDate: '2025-01-18' },
  ];

  const mockReorderSuggestions = [
    { product: 'A4 Paper 80gsm', currentStock: 120, suggestedQty: 500, reason: 'Low stock', minStock: 200 },
    { product: 'Blue Pens (Box)', currentStock: 45, suggestedQty: 100, reason: 'Below minimum', minStock: 50 },
    { product: 'Staples', currentStock: 8, suggestedQty: 20, reason: 'Critical level', minStock: 10 },
  ];

  const mockNotifications = [
    { type: 'Stock Alert', message: 'A4 Paper 80gsm is running low (120 units left)', time: '2 hours ago', read: false },
    { type: 'Delivery', message: 'Order PO-2025-0002 is out for delivery', time: '5 hours ago', read: true },
    { type: 'Payment', message: 'Invoice INV-2025-0015 is due in 3 days', time: '1 day ago', read: true },
    { type: 'System', message: 'Scheduled maintenance tonight at 11 PM', time: '2 days ago', read: true },
  ];

  const statusFilters = ['All', 'Pending', 'Processing', 'In Transit', 'Delivered', 'Delayed'];

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      'Pending': 'bg-gray-100 text-gray-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'In Transit': 'bg-amber-100 text-amber-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Delayed': 'bg-red-100 text-red-800'
    };
    
    const statusIcons = {
      'Pending': <Clock className="h-3 w-3 mr-1" />,
      'Processing': <Clock className="h-3 w-3 mr-1" />,
      'In Transit': <Truck className="h-3 w-3 mr-1" />,
      'Delivered': <CheckCircle className="h-3 w-3 mr-1" />,
      'Delayed': <AlertCircle className="h-3 w-3 mr-1" />
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {statusIcons[status]} {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAmountColor = (amount) => {
    if (amount > 3000) return 'text-red-600';
    if (amount > 1000) return 'text-amber-600';
    return 'text-gray-900';
  };

  const handleTrackOrder = () => {
    // In a real app, this would fetch order details
    const order = mockOrders.find(o => o.id === trackingId);
    setSelectedOrder(order || null);
  };

  const renderOrdersTab = () => (
    <>
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="w-full lg:w-auto mb-4 lg:mb-0">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <div className="relative">
            <select 
              className="appearance-none pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusFilters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4 mr-2" /> Date Range
          </button>
          
          <div className="flex space-x-2">
            <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" /> Export
            </button>
            
            <button className="flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              <FilePlus2 className="h-5 w-5 mr-2" /> Create Order
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Total Orders</p>
              <p className="text-2xl font-bold text-indigo-900">{mockOrders.length}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FilePlus2 className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">
                {mockOrders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">In Progress</p>
              <p className="text-2xl font-bold text-amber-900">
                {mockOrders.filter(o => o.status === 'Processing' || o.status === 'In Transit').length}
              </p>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg">
              <Truck className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Delayed</p>
              <p className="text-2xl font-bold text-red-900">
                {mockOrders.filter(o => o.status === 'Delayed').length}
              </p>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    {order.id}
                  </div>
                  <div className="text-xs text-gray-500">Due: {formatDate(order.deliveryDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{order.supplier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-700">{formatDate(order.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {order.items} items
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`font-medium ${getAmountColor(order.amount)}`}>
                    ${order.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab('Tracking');
                      }}
                    >
                      Track
                    </button>
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors" title="More options">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
          <span className="font-medium">{filteredOrders.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </>
  );

  const renderReorderTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-lg font-medium text-blue-900 mb-2">Reorder Suggestions</h2>
        <p className="text-blue-700">Based on your current inventory levels and consumption patterns</p>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Qty</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th scope="col" className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockReorderSuggestions.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.product}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.currentStock < item.minStock ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.currentStock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-700">{item.minStock} units</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.suggestedQty} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-700">{item.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Create Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-md font-medium text-gray-900 mb-2">Notifications</h3>
        
        <div className="space-y-3">
          {mockNotifications.map((notification, index) => (
            <div key={index} className={`p-3 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{notification.type}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <div className="text-xs text-gray-500">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrackingTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Track Order</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter order ID (e.g., PO-2025-0001)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleTrackOrder}
              >
                Find Order
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {selectedOrder && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedOrder.id}</h3>
              <p className="text-gray-600">Supplier: {selectedOrder.supplier}</p>
            </div>
            <StatusBadge status={selectedOrder.status} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{formatDate(selectedOrder.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Delivery:</span>
                  <span className="font-medium">{formatDate(selectedOrder.deliveryDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{selectedOrder.items} products</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-indigo-600">${selectedOrder.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Delivery Address</h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Main Warehouse</p>
                    <p className="text-sm text-gray-600">123 Business Park, Industrial Area</p>
                    <p className="text-sm text-gray-600">City, State 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-4">Status Timeline</h4>
            <div className="flex items-center justify-between relative">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['Pending', 'Processing', 'In Transit', 'Delivered'].includes(selectedOrder.status) 
                    ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Order Placed</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-300 mx-2">
                <div className={`h-1 ${
                  ['Processing', 'In Transit', 'Delivered'].includes(selectedOrder.status) 
                    ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['Processing', 'In Transit', 'Delivered'].includes(selectedOrder.status) 
                    ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <Package className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Processing</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-300 mx-2">
                <div className={`h-1 ${
                  ['In Transit', 'Delivered'].includes(selectedOrder.status) 
                    ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ['In Transit', 'Delivered'].includes(selectedOrder.status) 
                    ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">In Transit</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-300 mx-2">
                <div className={`h-1 ${
                  selectedOrder.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOrder.status === 'Delivered' 
                    ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">Create, track, and manage your purchase orders</p>
      </div>
      
      {/* Menu Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Orders' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Orders')}
        >
          <FilePlus2 className="h-4 w-4 mr-2" /> Orders
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Reorder' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Reorder')}
        >
          <TrendingUp className="h-4 w-4 mr-2" /> Reorder & Alerts
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Tracking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Tracking')}
        >
          <Truck className="h-4 w-4 mr-2" /> Track Order
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'Orders' && renderOrdersTab()}
        {activeTab === 'Reorder' && renderReorderTab()}
        {activeTab === 'Tracking' && renderTrackingTab()}
      </div>
    </div>
  );
};

export default Orders;