import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import Dashboard from './pages/Dashboard';
import StockManagement from './pages/StockManagement';
import BuyerManagement from './pages/BuyerManagement';
import SupplierManagement from './pages/SupplierManagement';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import EmployeePerformance from './pages/EmployeePerformance';
import Notifications from './pages/Notifications';
import SettingsPage from './pages/SettingsPage';

// Import components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Main App component
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stock" element={<StockManagement />} />
            <Route path="/buyers" element={<BuyerManagement />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/employees" element={<EmployeePerformance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}