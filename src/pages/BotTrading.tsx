import React from 'react'
import { Bot } from 'lucide-react'

const BotTrading: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Bot className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bot Trading
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Bots
          </h2>

          <div className="space-y-4">
            {[
              {
                name: 'Trend Following Bot',
                status: 'Active',
                profit: '+$450',
                pairs: 'BTC/USD, ETH/USD',
              },
              {
                name: 'Arbitrage Bot',
                status: 'Active',
                profit: '+$320',
                pairs: 'Multiple',
              },
              {
                name: 'Grid Trading Bot',
                status: 'Paused',
                profit: '+$180',
                pairs: 'ADA/USD',
              },
            ].map(bot => (
              <div
                key={bot.name}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {bot.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      bot.status === 'Active'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}
                  >
                    {bot.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {bot.pairs}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-success-600">
                    {bot.profit}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Edit
                    </button>
                    <button className="text-danger-600 hover:text-danger-700 text-sm">
                      Stop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create New Bot
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bot Name
              </label>
              <input
                type="text"
                placeholder="Enter bot name"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Strategy
              </label>
              <select className="input">
                <option>Trend Following</option>
                <option>Arbitrage</option>
                <option>Grid Trading</option>
                <option>Mean Reversion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trading Pairs
              </label>
              <input
                type="text"
                placeholder="BTC/USD, ETH/USD"
                className="input"
              />
            </div>

            <button className="btn btn-primary w-full">Create Bot</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BotTrading
