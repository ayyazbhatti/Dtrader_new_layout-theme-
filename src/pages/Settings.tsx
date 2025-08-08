import React from 'react'
import { User, Shield, Bell, Palette, Globe } from 'lucide-react'

const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { name: 'Profile', icon: User, active: true },
              { name: 'Security', icon: Shield },
              { name: 'Notifications', icon: Bell },
              { name: 'Appearance', icon: Palette },
              { name: 'Language', icon: Globe },
            ].map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">JD</span>
                </div>
                <div>
                  <button className="btn btn-secondary">Change Photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input type="text" defaultValue="John" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input type="text" defaultValue="Doe" className="input" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Professional trader with 5+ years of experience in equity markets."
                  className="input"
                />
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Security Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="btn btn-primary">Enable</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-500">
                    Update your account password
                  </p>
                </div>
                <button className="btn btn-secondary">Change</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Login History</h3>
                  <p className="text-sm text-gray-500">
                    View your recent login activity
                  </p>
                </div>
                <button className="btn btn-secondary">View</button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Settings
            </h2>

            <div className="space-y-4">
              {[
                {
                  name: 'Trade Executions',
                  description: 'Get notified when your orders are filled',
                  enabled: true,
                },
                {
                  name: 'Price Alerts',
                  description: 'Receive alerts when stocks reach target prices',
                  enabled: true,
                },
                {
                  name: 'Market News',
                  description: 'Get updates on market-moving news',
                  enabled: false,
                },
                {
                  name: 'Portfolio Updates',
                  description: 'Daily summary of your portfolio performance',
                  enabled: true,
                },
                {
                  name: 'Security Alerts',
                  description: 'Important security and account notifications',
                  enabled: true,
                },
              ].map(notification => (
                <div
                  key={notification.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {notification.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={notification.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
