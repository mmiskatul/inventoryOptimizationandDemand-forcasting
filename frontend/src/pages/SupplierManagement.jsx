import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Search, MoreVertical, Download, Filter, ChevronDown, Building, Phone, Mail, TrendingUp, Clock, AlertCircle, Save, X, User, Package, Truck } from 'lucide-react';

const SupplierManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerformance, setSelectedPerformance] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState('Suppliers');
  
  const [suppliers, setSuppliers] = useState([
    { id: 1, company: 'Best Supplies Ltd.', contact: '+8801XXXXXXX', rating: 4.5, performance: 'Excellent', delivery: 'On-time', orders: 42, since: '2022-03-15' },
    { id: 2, company: 'Office Essentials Inc.', contact: 'sales@officeess.com', rating: 4.2, performance: 'Good', delivery: 'On-time', orders: 28, since: '2023-01-10' },
    { id: 3, company: 'Global Tech', contact: 'support@globaltech.com', rating: 3.8, performance: 'Average', delivery: 'Occasional delays', orders: 15, since: '2023-06-22' },
    { id: 4, company: 'Quality Materials Co.', contact: 'info@qualitymaterials.com', rating: 4.7, performance: 'Excellent', delivery: 'Early', orders: 57, since: '2021-11-05' },
    { id: 5, company: 'Reliable Parts Ltd.', contact: '+8802XXXXXXX', rating: 3.5, performance: 'Poor', delivery: 'Frequent delays', orders: 12, since: '2023-09-18' },
  ]);

  const performanceFilters = ['All', 'Excellent', 'Good', 'Average', 'Poor'];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesPerformance = selectedPerformance === 'All' || supplier.performance === selectedPerformance;
    const matchesSearch = supplier.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          supplier.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPerformance && matchesSearch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key={fullStars} className="h-4 w-4 text-yellow-400 fill-current" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={fullStars + i + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  const PerformanceBadge = ({ performance }) => {
    const performanceStyles = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Average': 'bg-amber-100 text-amber-800',
      'Poor': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${performanceStyles[performance]}`}>
        {performance}
      </span>
    );
  };

  const DeliveryBadge = ({ delivery }) => {
    const deliveryStyles = {
      'Early': 'bg-green-100 text-green-800',
      'On-time': 'bg-blue-100 text-blue-800',
      'Occasional delays': 'bg-amber-100 text-amber-800',
      'Frequent delays': 'bg-red-100 text-red-800'
    };
    
    const deliveryIcons = {
      'Early': <TrendingUp className="h-3 w-3 mr-1" />,
      'On-time': <Clock className="h-3 w-3 mr-1" />,
      'Occasional delays': <AlertCircle className="h-3 w-3 mr-1" />,
      'Frequent delays': <AlertCircle className="h-3 w-3 mr-1" />
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${deliveryStyles[delivery]}`}>
        {deliveryIcons[delivery]} {delivery}
      </span>
    );
  };

  const handleEdit = (supplier) => {
    setIsEditing(true);
    setEditingSupplier({...supplier});
  };

  const handleSave = () => {
    if (editingSupplier.id) {
      // Update existing supplier
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? editingSupplier : s));
    } else {
      // Add new supplier
      const newId = Math.max(...suppliers.map(s => s.id)) + 1;
      setSuppliers([...suppliers, {...editingSupplier, id: newId}]);
    }
    setIsEditing(false);
    setEditingSupplier(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSupplier(null);
  };

  const handleDelete = (supplier) => {
    setDeleteCandidate(supplier);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setSuppliers(suppliers.filter(s => s.id !== deleteCandidate.id));
    setShowDeleteConfirm(false);
    setDeleteCandidate(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteCandidate(null);
  };

  const handleAddNew = () => {
    setEditingSupplier({
      company: '',
      contact: '',
      rating: 0,
      performance: 'Good',
      delivery: 'On-time',
      orders: 0,
      since: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingSupplier({
      ...editingSupplier,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
        <p className="text-gray-600 mt-1">Profiles • History • Ratings</p>
      </div>
      
      {/* Menu Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Suppliers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Suppliers')}
        >
          <User className="h-4 w-4 mr-2" /> Suppliers
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Products')}
        >
          <Package className="h-4 w-4 mr-2" /> Products
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'Delivery' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Delivery')}
        >
          <Truck className="h-4 w-4 mr-2" /> Delivery
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header with controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
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
                value={selectedPerformance}
                onChange={(e) => setSelectedPerformance(e.target.value)}
              >
                {performanceFilters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </button>
            
            <div className="flex space-x-2">
              <button className="flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" /> Export
              </button>
              
              <button 
                className="flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                onClick={handleAddNew}
              >
                <Plus className="h-5 w-5 mr-2" /> Add Supplier
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-indigo-900">{suppliers.length}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-green-900">
                  {(suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <Star className="h-5 w-5 text-green-600 fill-current" />
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">On-time Delivery</p>
                <p className="text-2xl font-bold text-amber-900">
                  {suppliers.filter(s => s.delivery === 'On-time' || s.delivery === 'Early').length}
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-900">
                  {suppliers.reduce((sum, supplier) => sum + supplier.orders, 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit/Add Form */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingSupplier.id ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={editingSupplier.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Acme Corporation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={editingSupplier.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., phone or email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={editingSupplier.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Performance</label>
                <select
                  name="performance"
                  value={editingSupplier.performance}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery</label>
                <select
                  name="delivery"
                  value={editingSupplier.delivery}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Early">Early</option>
                  <option value="On-time">On-time</option>
                  <option value="Occasional delays">Occasional delays</option>
                  <option value="Frequent delays">Frequent delays</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orders</label>
                <input
                  type="number"
                  name="orders"
                  value={editingSupplier.orders}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Since</label>
                <input
                  type="date"
                  name="since"
                  value={editingSupplier.since}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center"
              >
                <X className="h-4 w-4 mr-2" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </button>
            </div>
          </div>
        )}
        
        {/* Suppliers table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th scope="col" className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{supplier.company}</div>
                        <div className="text-xs text-gray-500">Since {supplier.since}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {supplier.contact.includes('@') ? (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">{supplier.contact}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">{supplier.contact}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(supplier.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PerformanceBadge performance={supplier.performance} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DeliveryBadge delivery={supplier.delivery} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {supplier.orders} orders
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors" 
                        title="Edit"
                        onClick={() => handleEdit(supplier)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete"
                        onClick={() => handleDelete(supplier)}
                      >
                        <Trash2 className="h-4 w-4" />
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
        
        {/* Empty state */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No suppliers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSuppliers.length}</span> of{' '}
            <span className="font-medium">{filteredSuppliers.length}</span> results
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
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {deleteCandidate.company}? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;