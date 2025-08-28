// components/Header.js
import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  User, 
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Search */}
          <div className="relative ml-4 lg:ml-0 lg:max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm 
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 relative transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Your Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
