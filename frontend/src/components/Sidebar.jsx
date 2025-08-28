import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Users, Truck, ShoppingCart, BarChart2, UserCheck, Bell, Settings,
  X, LogOut,
  PanelRightClose
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false); // sticks open after selecting

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Stock Management', href: '/stock', icon: Package },
    { name: 'Buyers', href: '/buyers', icon: Users },
    { name: 'Suppliers', href: '/suppliers', icon: Truck },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Reports', href: '/reports', icon: BarChart2 },
    { name: 'Employees', href: '/employees', icon: UserCheck },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setPinned(true); // sidebar sticks open
    if (!sidebarOpen) setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setPinned(false); // unpin
    setHovered(false); // reset hover state
    setSidebarOpen(false); // close (mobile) or collapse (desktop)
  };

  const handleCollapseSidebar = () => {
    setPinned(false); // collapse but keep sidebar open
  };

  const isActive = (href) => {
    if (href === '/dashboard') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname === href;
  };

  const sidebarWidth = pinned || hovered ? 'w-64' : 'w-20';

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-gray-900 transition-all duration-300 ease-in-out
          ${sidebarWidth} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
        onMouseEnter={() => !pinned && setHovered(true)}
        onMouseLeave={() => !pinned && setHovered(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <div className="flex items-center">
            <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4F46E5" d="M18 5.498l-5.5-2.26L7 5.499v5.655l-5 2.054v6.443l5.5 2.259 5-2.054 5 2.054 5.5-2.26v-6.442l-5-2.054zm-.5 9.462l-3.432-1.404 3.576-1.468 3.432 1.41zM12 8.127v4.669l-4-1.643V6.492zm1 4.669V8.127l4-1.635v4.661zm-2.068.76L7.5 14.96l-3.576-1.463 3.432-1.41zM8 15.836l4-1.636v4.78l-4 1.642zm8.076-10.047L12.5 7.25 8.924 5.79 12.5 4.32zM3 14.2l4 1.636v4.786L3 18.98zm10 0l4 1.636v4.786l-4-1.642zm5 6.422v-4.786l4-1.636v4.78z"/>
  <path fill="none" d="M0 0h24v24H0z"/>
</svg>

            {(pinned || hovered) && <span className="ml-2 text-xl font-semibold text-white">SmartInventory</span>}
          </div>

          {/* Close / collapse buttons */}
          <div className="flex items-center space-x-2">
            {pinned && (
              <button
                onClick={handleCollapseSidebar}
                className="text-gray-400 hover:text-white"
                title="close sidebar"
                
              >
                <PanelRightClose className='size-5'  />
              </button>
            )}
            <button
              onClick={handleCloseSidebar}
              className="lg:hidden text-gray-400 hover:text-white"
              title="Close Sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1">
          <div className="px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`group flex  items-center w-full px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    active
                      ? 'bg-indigo-800 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 transition-colors ${
                    active ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  {(pinned || hovered) && <span>{item.name}</span>}
                  {active && (pinned || hovered) && (
                    <div className="ml-auto w-1 h-6 bg-indigo-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-full p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">A</span>
            </div>
            {(pinned || hovered) && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            )}
          </div>

          {(pinned || hovered) && (
            <>
              <button
                onClick={() => handleNavigation('/settings')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/settings'
                    ? 'bg-indigo-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>

              <button className="w-full flex items-center px-3 py-2 mt-2 text-sm font-medium text-red-300 hover:bg-red-900 hover:text-white rounded-md transition-colors">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
