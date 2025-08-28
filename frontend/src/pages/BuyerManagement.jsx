import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, MoreVertical, Download, Upload, ChevronDown, Building, Mail, MapPin, Filter, Save, X } from 'lucide-react';

const BuyerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [newBuyer, setNewBuyer] = useState({
    company: '',
    contact: '',
    totalOrders: 0,
    location: '',
    status: 'Active'
  });
  
  const [buyers, setBuyers] = useState([
    { id: 1, company: 'Acme Corp.', contact: 'miskat@acme.com', totalOrders: 15, location: 'Ahshulia', status: 'Active' },
    { id: 2, company: 'Stark Industries', contact: 'tony@starkind.com', totalOrders: 25, location: "Cox's Bazar", status: 'Active' },
    { id: 3, company: 'Wayne Enterprises', contact: 'bruce@wayne.com', totalOrders: 12, location: 'Gotham, USA', status: 'Active' },
    { id: 4, company: 'Oscorp Industries', contact: 'mohammod@oscorp.com', totalOrders: 8, location: 'New York, USA', status: 'Inactive' },
    { id: 5, company: 'LexCorp', contact: 'lex@lexcorp.com', totalOrders: 32, location: 'Metropolis, USA', status: 'Active' },
  ]);

  const locations = ['All', 'New York, USA', 'Malibu, USA', 'Gotham, USA', 'Metropolis, USA'];

  const filteredBuyers = buyers.filter(buyer => {
    const matchesLocation = selectedLocation === 'All' || buyer.location === selectedLocation;
    const matchesSearch = buyer.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          buyer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const handleEdit = (buyer) => {
    setIsEditing(true);
    setEditingBuyer({...buyer});
  };

  const handleSave = () => {
    if (editingBuyer.id) {
      // Update existing buyer
      setBuyers(buyers.map(b => b.id === editingBuyer.id ? editingBuyer : b));
    } else {
      // Add new buyer
      const newId = Math.max(...buyers.map(b => b.id)) + 1;
      setBuyers([...buyers, {...editingBuyer, id: newId}]);
    }
    setIsEditing(false);
    setEditingBuyer(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBuyer(null);
  };

  const handleDelete = (buyer) => {
    setDeleteCandidate(buyer);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setBuyers(buyers.filter(b => b.id !== deleteCandidate.id));
    setShowDeleteConfirm(false);
    setDeleteCandidate(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteCandidate(null);
  };

  const handleAddNew = () => {
    setEditingBuyer({
      company: '',
      contact: '',
      totalOrders: 0,
      location: '',
      status: 'Active'
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBuyer({
      ...editingBuyer,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Management</h1>
        <p className="text-gray-600 mt-1">Manage your buyers and client relationships</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header with controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search buyers..."
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
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
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
                <Plus className="h-5 w-5 mr-2" /> Add Buyer
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Total Buyers</p>
                <p className="text-2xl font-bold text-indigo-900">{buyers.length}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Buyers</p>
                <p className="text-2xl font-bold text-green-900">{buyers.filter(b => b.status === 'Active').length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Total Orders</p>
                <p className="text-2xl font-bold text-amber-900">{buyers.reduce((sum, buyer) => sum + buyer.totalOrders, 0)}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <Download className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg. Orders/Buyer</p>
                <p className="text-2xl font-bold text-blue-900">
                  {(buyers.reduce((sum, buyer) => sum + buyer.totalOrders, 0) / buyers.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit/Add Form */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingBuyer.id ? 'Edit Buyer' : 'Add New Buyer'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={editingBuyer.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Acme Corporation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact"
                  value={editingBuyer.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., contact@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                <input
                  type="number"
                  name="totalOrders"
                  value={editingBuyer.totalOrders}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  name="location"
                  value={editingBuyer.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a location</option>
                  {locations.filter(loc => loc !== 'All').map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editingBuyer.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
        
        {/* Buyers table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuyers.map(buyer => (
                <tr key={buyer.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        <Building className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="font-medium text-gray-900">{buyer.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{buyer.contact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {buyer.totalOrders} orders
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{buyer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={buyer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors" 
                        title="Edit"
                        onClick={() => handleEdit(buyer)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete"
                        onClick={() => handleDelete(buyer)}
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
        {filteredBuyers.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No buyers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBuyers.length}</span> of{' '}
            <span className="font-medium">{filteredBuyers.length}</span> results
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

export default BuyerManagement;