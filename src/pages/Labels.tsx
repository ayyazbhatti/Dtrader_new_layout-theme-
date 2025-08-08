import React from 'react'
import { Tag } from 'lucide-react'

const Labels: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Tag className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Labels
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Manage Labels
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Trading Labels
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage trading categories and labels
              </p>
            </div>
            <button className="btn btn-primary">Add Label</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Stocks', 'Crypto', 'Forex', 'Commodities', 'Indices'].map(
              label => (
                <div
                  key={label}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {label}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm">
                        Edit
                      </button>
                      <button className="text-danger-600 hover:text-danger-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Labels
