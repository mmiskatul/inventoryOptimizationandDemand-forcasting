import React, { useState, Component } from 'react';
import { Plus, Filter, Edit, Trash2, Search, MoreVertical, Download, Upload, ChevronDown, Package, Archive, XCircle, Menu, Bell, User } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Something went wrong</h3>
              <p className="mt-2 text-sm text-gray-500">
                There was a problem loading the stock management page. Please try refreshing the page.
              </p>
              <div className="mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// StatusBadge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-amber-100 text-amber-800',
    'Out of Stock': 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Categories Component
const Categories = ({ categories, onAddCategory, onSelectCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Category</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectCategory(category)}
          >
            <h3 className="text-lg font-medium text-gray-900">{category}</h3>
            <p className="text-gray-600 mt-1">Category description</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// History Component
const History = () => {
  const historyItems = [
    { id: 1, action: 'Product Added', item: 'A4 Paper 80gsm', user: 'Admin', timestamp: '2 hours ago' },
    { id: 2, action: 'Stock Updated', item: 'Staplers', user: 'Manager', timestamp: '5 hours ago' },
    { id: 3, action: 'Product Restocked', item: 'Laser Printer', user: 'Admin', timestamp: '1 day ago' },
    { id: 4, action: 'Category Added', item: 'Janitorial', user: 'Admin', timestamp: '2 days ago' },
    { id: 5, action: 'Product Out of Stock', item: 'Coffee Beans', user: 'System', timestamp: '3 days ago' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">History</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {item.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Alerts Component
const Alerts = ({ products, onUpdateStock }) => {
  const lowStockProducts = products.filter(p => p.status === 'Low Stock');
  const outOfStockProducts = products.filter(p => p.status === 'Out of Stock');

  const handleRestock = (productId, amount) => {
    onUpdateStock(productId, amount);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Alerts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-amber-800 mb-4">Low Stock Items</h3>
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map(product => (
              <div key={product.id} className="mb-3 p-3 bg-white rounded-lg border border-amber-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">Only {product.qty} left in stock</p>
                  </div>
                  <button 
                    onClick={() => handleRestock(product.id, 50)}
                    className="px-3 py-1 bg-amber-600 text-white text-sm rounded-md hover:bg-amber-700"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-amber-700">No low stock items</p>
          )}
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-800 mb-4">Out of Stock Items</h3>
          {outOfStockProducts.length > 0 ? (
            outOfStockProducts.map(product => (
              <div key={product.id} className="mb-3 p-3 bg-white rounded-lg border border-red-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">Out of stock</p>
                  </div>
                  <button 
                    onClick={() => handleRestock(product.id, 100)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-700">No out of stock items</p>
          )}
        </div>
      </div>
    </div>
  );
};

// AddProduct Component
const AddProduct = ({ categories, onAddProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    qty: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price && formData.qty) {
      onAddProduct({
        id: Date.now(), // Simple ID generation
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        qty: parseInt(formData.qty),
        status: formData.qty > 10 ? 'In Stock' : (formData.qty > 0 ? 'Low Stock' : 'Out of Stock')
      });
      setFormData({ name: '', category: '', price: '', qty: '' });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Stock Management</h1>
        <div className="mt-2 text-sm text-gray-600">
          <div>Product Catalog • Search • Alerts</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Menu</h2>
        <ul className="space-y-2">
          <li 
            className={`flex items-center p-2 rounded-lg cursor-pointer ${activeView === 'products' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveView('products')}
          >
            <span className="ml-2 font-medium">All Products</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg cursor-pointer ${activeView === 'categories' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveView('categories')}
          >
            <span className="ml-2">Categories</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg cursor-pointer ${activeView === 'history' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveView('history')}
          >
            <span className="ml-2">History</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg cursor-pointer ${activeView === 'alerts' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveView('alerts')}
          >
            <span className="ml-2">Alerts</span>
          </li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Search</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search product or category"
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <button 
          className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setActiveView('addProduct')}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add Product</span>
        </button>
        <button 
          className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setActiveView('addCategory')}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add Category</span>
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="p-1 rounded-md hover:bg-gray-100 mr-2">
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Predict List</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="flex items-center p-1.5 rounded-full hover:bg-gray-100">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

// Toolbar Component
const Toolbar = ({ onAddProduct, onExport }) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
      <div className="text-sm text-gray-600">Toolbar</div>
      <div className="flex space-x-2">
        <button className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-1" /> Filter
        </button>
        <button 
          onClick={onExport}
          className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-1" /> Export
        </button>
        <button 
          onClick={onAddProduct}
          className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </button>
      </div>
    </div>
  );
};

// Products Component
const Products = ({ products, onEditProduct, onDeleteProduct, onUpdateStock }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Stationery', 'Electronics', 'Pantry', 'Janitorial'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="w-full lg:w-auto mb-4 lg:mb-0">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="appearance-none pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Total Products</p>
              <p className="text-2xl font-bold text-indigo-900">{products.length}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Package className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-amber-900">{products.filter(p => p.status === 'Low Stock').length}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg">
              <Archive className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-900">{products.filter(p => p.status === 'Out of Stock').length}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${product.qty < 10 ? 'text-amber-600' : 'text-gray-900'}`}>
                      {product.qty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => onEditProduct(product)}
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors" 
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onUpdateStock(product.id, 50)}
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" 
                        title="Restock"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> results
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
    </div>
  );
};

// StockManagement Component
const StockManagement = () => {
  const [activeView, setActiveView] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, name: 'A4 Paper 80gsm', category: 'Stationery', price: 25.00, qty: 500, status: 'In Stock' },
    { id: 2, name: 'Staplers', category: 'Stationery', price: 5.50, qty: 150, status: 'In Stock' },
    { id: 3, name: 'Laser Printer', category: 'Electronics', price: 350.00, qty: 8, status: 'Low Stock' },
    { id: 4, name: 'Coffee Beans', category: 'Pantry', price: 15.00, qty: 0, status: 'Out of Stock' },
    { id: 5, name: 'Cleaning Spray', category: 'Janitorial', price: 8.75, qty: 60, status: 'In Stock' },
  ]);
  const [categories, setCategories] = useState(['Stationery', 'Electronics', 'Pantry', 'Janitorial']);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setActiveView('products');
  };

  const handleEditProduct = (editedProduct) => {
    setProducts(products.map(p => p.id === editedProduct.id ? editedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateStock = (productId, amount) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newQty = p.qty + amount;
        return {
          ...p,
          qty: newQty,
          status: newQty > 10 ? 'In Stock' : (newQty > 0 ? 'Low Stock' : 'Out of Stock')
        };
      }
      return p;
    }));
  };

  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleExport = () => {
    // Simple export functionality - in a real app, this would generate a file
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'products.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'products':
        return (
          <Products 
            products={products} 
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateStock={handleUpdateStock}
          />
        );
      case 'categories':
        return (
          <Categories 
            categories={categories} 
            onAddCategory={handleAddCategory}
            onSelectCategory={(category) => {
              setActiveView('products');
              // In a real app, we would filter products by category
            }}
          />
        );
      case 'history':
        return <History />;
      case 'alerts':
        return <Alerts products={products} onUpdateStock={handleUpdateStock} />;
      case 'addProduct':
        return (
          <AddProduct 
            categories={categories} 
            onAddProduct={handleAddProduct}
            onCancel={() => setActiveView('products')}
          />
        );
      case 'addCategory':
        return (
          <div className="p-6">
            <Categories 
              categories={categories} 
              onAddCategory={handleAddCategory}
              onSelectCategory={() => {}}
            />
          </div>
        );
      default:
        return (
          <Products 
            products={products} 
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateStock={handleUpdateStock}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <Toolbar 
          onAddProduct={() => setActiveView('addProduct')} 
          onExport={handleExport}
        />
        
        <main className="flex-1 overflow-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

// Main export with Error Boundary
const StockManagementWithErrorBoundary = () => (
  <ErrorBoundary>
    <StockManagement />
  </ErrorBoundary>
);

export default StockManagementWithErrorBoundary;