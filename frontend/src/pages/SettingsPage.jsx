import React, { useState } from 'react';
import { 
  Upload, 
  Save, 
  Bell, 
  User, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Palette,
  Languages,
  Lock,
  Smartphone,
  Clock,
  Mail
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({ 
    name: 'Admin User', 
    email: 'admin@smartinventory.com',
    phone: '+1 (555) 123-4567',
    position: 'Inventory Manager',
    department: 'Operations'
  });
  
  const [notifications, setNotifications] = useState({ 
    lowStock: true, 
    newOrders: true, 
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    orderUpdates: true,
    inventoryAlerts: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordLastChanged: '2024-11-15',
    loginAlerts: true,
    deviceManagement: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'english',
    fontSize: 'medium',
    density: 'comfortable',
    sidebarStyle: 'default'
  });

  const [language, setLanguage] = useState({
    current: 'english',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (section) => {
    console.log(`Saved changes for ${section}`);
    // Add actual save logic here
  };

  const ToggleSwitch = ({ enabled, setEnabled, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <button 
                onClick={() => handleSaveChanges('profile')}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-semibold text-white">AU</span>
              </div>
              <div>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 mb-2">
                  <Upload className="h-4 w-4 mr-2" /> Upload New Photo
                </button>
                <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleProfileChange} 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleProfileChange} 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={profile.phone} 
                  onChange={handleProfileChange} 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input 
                  type="text" 
                  name="position" 
                  value={profile.position} 
                  onChange={handleProfileChange} 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
              <button 
                onClick={() => handleSaveChanges('notifications')}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              <ToggleSwitch 
                enabled={notifications.lowStock} 
                setEnabled={(val) => setNotifications({...notifications, lowStock: val})}
                label="Low Stock Alerts"
                description="Get notified when product quantity is low"
              />
              
              <ToggleSwitch 
                enabled={notifications.newOrders} 
                setEnabled={(val) => setNotifications({...notifications, newOrders: val})}
                label="New Order Notifications"
                description="Get notified when a new purchase order is created"
              />
              
              <ToggleSwitch 
                enabled={notifications.systemUpdates} 
                setEnabled={(val) => setNotifications({...notifications, systemUpdates: val})}
                label="System Updates"
                description="Receive emails about new features and updates"
              />

              <ToggleSwitch 
                enabled={notifications.emailNotifications} 
                setEnabled={(val) => setNotifications({...notifications, emailNotifications: val})}
                label="Email Notifications"
                description="Receive important updates via email"
              />

              <ToggleSwitch 
                enabled={notifications.weeklyReports} 
                setEnabled={(val) => setNotifications({...notifications, weeklyReports: val})}
                label="Weekly Reports"
                description="Get weekly performance reports every Monday"
              />

              <ToggleSwitch 
                enabled={notifications.orderUpdates} 
                setEnabled={(val) => setNotifications({...notifications, orderUpdates: val})}
                label="Order Status Updates"
                description="Receive updates when order status changes"
              />

              <ToggleSwitch 
                enabled={notifications.inventoryAlerts} 
                setEnabled={(val) => setNotifications({...notifications, inventoryAlerts: val})}
                label="Inventory Alerts"
                description="Get alerts for inventory-related activities"
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
              <button 
                onClick={() => handleSaveChanges('security')}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10" 
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      />
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                  Update Password
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                <ToggleSwitch 
                  enabled={security.twoFactorAuth} 
                  setEnabled={(val) => setSecurity({...security, twoFactorAuth: val})}
                  label="Enable Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Session Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                    <select 
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>
                  <ToggleSwitch 
                    enabled={security.loginAlerts} 
                    setEnabled={(val) => setSecurity({...security, loginAlerts: val})}
                    label="Login Alerts"
                    description="Get notified when someone logs into your account"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Danger Zone</h3>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                  <p className="text-sm text-gray-500">This action is permanent and cannot be undone.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Appearance Settings</h2>
              <button 
                onClick={() => handleSaveChanges('appearance')}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setAppearance({...appearance, theme: 'light'})}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      appearance.theme === 'light' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Sun className={`h-5 w-5 mr-3 ${
                        appearance.theme === 'light' ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium">Light Theme</p>
                        <p className="text-sm text-gray-500">Clean and bright interface</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setAppearance({...appearance, theme: 'dark'})}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      appearance.theme === 'dark' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Moon className={`h-5 w-5 mr-3 ${
                        appearance.theme === 'dark' ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium">Dark Theme</p>
                        <p className="text-sm text-gray-500">Easy on the eyes</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Interface Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                    <select 
                      value={appearance.fontSize}
                      onChange={(e) => setAppearance({...appearance, fontSize: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Density</label>
                    <select 
                      value={appearance.density}
                      onChange={(e) => setAppearance({...appearance, density: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Language & Region</h2>
              <button 
                onClick={() => handleSaveChanges('language')}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select 
                  value={language.current}
                  onChange={(e) => setLanguage({...language, current: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select 
                      value={language.timezone}
                      onChange={(e) => setLanguage({...language, timezone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="UTC-5">EST (UTC-5)</option>
                      <option value="UTC-6">CST (UTC-6)</option>
                      <option value="UTC-7">MST (UTC-7)</option>
                      <option value="UTC-8">PST (UTC-8)</option>
                      <option value="UTC+0">GMT (UTC+0)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select 
                      value={language.dateFormat}
                      onChange={(e) => setLanguage({...language, dateFormat: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                    <select 
                      value={language.timeFormat}
                      onChange={(e) => setLanguage({...language, timeFormat: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="12h">12-hour</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings Menu</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'profile' 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="h-4 w-4 mr-3" />
                Profile
              </button>
              <button 
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'notifications' 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="h-4 w-4 mr-3" />
                Notifications
              </button>
              <button 
                onClick={() => setActiveSection('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'security' 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="h-4 w-4 mr-3" />
                Security
              </button>
              <button 
                onClick={() => setActiveSection('appearance')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'appearance' 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Palette className="h-4 w-4 mr-3" />
                Appearance
              </button>
              <button 
                onClick={() => setActiveSection('language')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'language' 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Globe className="h-4 w-4 mr-3" />
                Language
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;