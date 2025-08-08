import React from 'react'
import { Store, TrendingUp, TrendingDown } from 'lucide-react'

const Markets: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Store className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Markets
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Market Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Stock Market',
              status: 'Open',
              change: '+2.5%',
              trend: 'up',
            },
            {
              name: 'Crypto Market',
              status: 'Open',
              change: '+1.8%',
              trend: 'up',
            },
            {
              name: 'Forex Market',
              status: 'Open',
              change: '-0.3%',
              trend: 'down',
            },
            {
              name: 'Commodities',
              status: 'Closed',
              change: '+0.7%',
              trend: 'up',
            },
            { name: 'Indices', status: 'Open', change: '+1.2%', trend: 'up' },
            { name: 'Bonds', status: 'Open', change: '-0.1%', trend: 'down' },
          ].map(market => (
            <div
              key={market.name}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {market.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    market.status === 'Open'
                      ? 'bg-success-100 text-success-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {market.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {market.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    market.trend === 'up'
                      ? 'text-success-600'
                      : 'text-danger-600'
                  }`}
                >
                  {market.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Markets
