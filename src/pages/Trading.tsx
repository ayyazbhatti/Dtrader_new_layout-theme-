import React, { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

const Trading: React.FC = () => {
  const [positionType, setPositionType] = useState<'normal' | 'bot'>('normal')

  // Mock data for charts
  const inflowData = [
    { name: 'MuhammadAyyazBhatti', value: 10000000000 },
    { name: 'uhtesting', value: 500000000 },
    { name: 'MuhammadAyyaz', value: 300000000 },
    { name: 'Raja', value: 200000000 },
    { name: 'macuser', value: 100000000 },
  ]

  const outflowData = [
    { name: 'autumn', value: 2800 },
  ]

  const dailyPnlData = [
    { date: '2025-08-03', value: 0 },
    { date: '2025-08-04', value: 50 },
    { date: '2025-08-05', value: 30 },
    { date: '2025-08-06', value: 590 },
    { date: '2025-08-07', value: 0 },
    { date: '2025-08-08', value: 0 },
    { date: '2025-08-09', value: 0 },
  ]

  const maxInflow = Math.max(...inflowData.map(item => item.value))
  const maxOutflow = Math.max(...outflowData.map(item => item.value))
  const maxDailyPnl = Math.max(...dailyPnlData.map(item => item.value))

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      {/* Top Section - Inflow and Outflow Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Top 5 Inflow Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Top 5 Inflow
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {inflowData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                      {item.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-success-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.value / maxInflow) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Outflow Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Top 5 Outflow
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {outflowData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                      {item.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-danger-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(item.value / maxOutflow) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - Position Selection and Total P&L */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
        {/* Position Type Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6">
          <button
            onClick={() => setPositionType('normal')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              positionType === 'normal'
                ? 'bg-success-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Normal Positions
          </button>
          <button
            onClick={() => setPositionType('bot')}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              positionType === 'bot'
                ? 'bg-success-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Bot Positions
          </button>
        </div>

        {/* Total Trader P&L Metric */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            Total Trader P&L: 597.1948 EUR
          </h3>
        </div>

        {/* Daily Trader P&L Chart */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Daily Trader P&L
          </h3>
          <div className="flex items-end space-x-1 sm:space-x-2 h-20 sm:h-24 md:h-32 overflow-x-auto">
            {dailyPnlData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center min-w-0">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm mb-1 sm:mb-2 relative">
                  <div
                    className="bg-success-500 rounded-t-sm transition-all duration-300"
                    style={{ 
                      height: `${(item.value / maxDailyPnl) * 100}%`,
                      minHeight: item.value > 0 ? '2px' : '0px'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Total Trades and Total Volume */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Total Trades */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Trades
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            21.0000
          </p>
        </div>

        {/* Total Volume */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Volume
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            6,481.9000 EUR
          </p>
        </div>
      </div>
    </div>
  )
}

export default Trading
