import React from 'react'
import { Home } from 'lucide-react'

const GeneralSetting: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Home className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          General Setting
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          General Configuration
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Name
            </label>
            <input type="text" defaultValue="DTrader" className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description
            </label>
            <textarea
              rows={3}
              defaultValue="Professional trading platform"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              defaultValue="support@dtrader.com"
              className="input"
            />
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralSetting
