import React from 'react'
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Portfolio Value',
      value: '$125,430.50',
      change: '+2.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: "Today's P&L",
      value: '+$3,240.00',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Active Positions',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Activity,
    },
    {
      name: 'Win Rate',
      value: '68.5%',
      change: '+1.2%',
      changeType: 'positive',
      icon: PieChart,
    },
  ]

  const recentTrades = [
    {
      symbol: 'AAPL',
      type: 'BUY',
      quantity: 100,
      price: 150.25,
      time: '2 min ago',
    },
    {
      symbol: 'TSLA',
      type: 'SELL',
      quantity: 50,
      price: 245.8,
      time: '5 min ago',
    },
    {
      symbol: 'GOOGL',
      type: 'BUY',
      quantity: 25,
      price: 2750.0,
      time: '12 min ago',
    },
    {
      symbol: 'MSFT',
      type: 'BUY',
      quantity: 75,
      price: 320.45,
      time: '18 min ago',
    },
  ]

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 min-w-0">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 lg:p-6 min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between min-w-0">
                <div className="min-w-0 flex-1 mr-2 sm:mr-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {stat.name}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-2 sm:p-2 md:p-3 lg:p-3 rounded-lg flex-shrink-0 ${
                    stat.changeType === 'positive'
                      ? 'bg-success-100 dark:bg-success-900'
                      : 'bg-danger-100 dark:bg-danger-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
                      stat.changeType === 'positive'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-3 md:mt-4">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-success-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-danger-500 mr-1" />
                )}
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-success-600 dark:text-success-400'
                      : 'text-danger-600 dark:text-danger-400'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-500 dark:text-gray-400 ml-1 hidden sm:block">
                  from last week
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Portfolio Performance
            </h2>
            <div className="flex space-x-1 sm:space-x-2">
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-md">
                1D
              </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                1W
              </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                1M
              </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                1Y
              </button>
            </div>
          </div>

          {/* Placeholder for chart */}
          <div className="h-32 sm:h-48 md:h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Chart component will be added here
              </p>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 lg:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Recent Trades
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {recentTrades.map((trade, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      trade.type === 'BUY' ? 'bg-success-500' : 'bg-danger-500'
                    }`}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{trade.symbol}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {trade.quantity} shares
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">${trade.price}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{trade.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Top Holdings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 lg:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Top Holdings
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {[
              { symbol: 'AAPL', name: 'Apple Inc.', value: '$45,230', change: '+2.3%' },
              { symbol: 'TSLA', name: 'Tesla Inc.', value: '$32,150', change: '+1.8%' },
              { symbol: 'GOOGL', name: 'Alphabet Inc.', value: '$28,450', change: '+3.1%' },
              { symbol: 'MSFT', name: 'Microsoft Corp.', value: '$19,600', change: '+1.5%' },
            ].map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{holding.symbol}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{holding.name}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{holding.value}</p>
                  <p className="text-xs sm:text-sm text-success-600 dark:text-success-400">{holding.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 lg:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Market News
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {[
              { title: 'Tech stocks rally on strong earnings', time: '2 hours ago', impact: 'positive' },
              { title: 'Federal Reserve announces rate decision', time: '4 hours ago', impact: 'neutral' },
              { title: 'Oil prices surge on supply concerns', time: '6 hours ago', impact: 'negative' },
              { title: 'Cryptocurrency market shows volatility', time: '8 hours ago', impact: 'neutral' },
            ].map((news, index) => (
              <div key={index} className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2">{news.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{news.time}</p>
                  </div>
                  <div className={`ml-2 px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
                    news.impact === 'positive' 
                      ? 'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300'
                      : news.impact === 'negative'
                      ? 'bg-danger-100 dark:bg-danger-900 text-danger-700 dark:text-danger-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {news.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
