import React, { useState } from 'react';
import { 
  Archive, 
  ShoppingCart, 
  Bell, 
  CheckCircle, 
  Filter, 
  Settings, 
  Trash2, 
  Mail, 
  AlertTriangle, 
  Package,
  Truck,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'stock',
      title: 'Low Stock Alert',
      message: "Product 'Laser Printer' has only 8 units left.",
      time: '15 mins ago',
      read: false,
      priority: 'high',
      icon: <Archive className="h-5 w-5 text-red-600" />,
      bgColor: 'bg-red-100'
    },
    {
      id: 2,
      type: 'order',
      title: 'New Order Received',
      message: 'Received PO-2025-0004 from Acme Corp.',
      time: '1 hour ago',
      read: false,
      priority: 'medium',
      icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'stock',
      title: 'Stock Updated',
      message: "'A4 Paper' quantity changed to 500.",
      time: '2 hours ago',
      read: true,
      priority: 'low',
      icon: <Package className="h-5 w-5 text-green-600" />,
      bgColor: 'bg-green-100'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      message: 'PO-2025-0002 has been shipped to customer.',
      time: 'Yesterday',
      read: true,
      priority: 'low',
      icon: <Truck className="h-5 w-5 text-purple-600" />,
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'Scheduled maintenance tonight at 2:00 AM.',
      time: '3 hours ago',
      read: false,
      priority: 'medium',
      icon: <Settings className="h-5 w-5 text-amber-600" />,
      bgColor: 'bg-amber-100'
    },
    {
      id: 6,
      type: 'alert',
      title: 'Urgent Attention Needed',
      message: 'Supplier payment overdue for 15 days.',
      time: '5 hours ago',
      read: false,
      priority: 'high',
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      bgColor: 'bg-red-100'
    }
  ]);

  const filters = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'stock', label: 'Stock Alerts', count: notifications.filter(n => n.type === 'stock').length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-amber-100 text-amber-800',
      low: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with your latest activities</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={markAllAsRead}
              className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark all as read
            </button>
            <button 
              onClick={clearAll}
              className="flex items-center px-3 py-2 text-sm text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with filters */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filters.find(f => f.id === activeFilter)?.label}
                </h2>
                <p className="text-sm text-gray-600">
                  {filteredNotifications.length} notifications
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  {filters.map(filter => (
                    <option key={filter.id} value={filter.id}>
                      {filter.label} ({filter.count})
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications list */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${notification.bgColor}`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {getPriorityBadge(notification.priority)}
                      </div>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredNotifications.length} of {notifications.length} notifications
              </p>
              <div className="flex space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Notification Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Notifications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {notifications.filter(n => !n.read).length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Notifications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {notifications.filter(n => n.time.includes('mins') || n.time.includes('hour')).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;