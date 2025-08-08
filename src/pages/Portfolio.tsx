import React from 'react'
import { PieChart, TrendingUp, DollarSign, Activity } from 'lucide-react'

const Portfolio: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Holdings Overview
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Return
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    symbol: 'AAPL',
                    shares: 100,
                    avgPrice: 145.5,
                    currentPrice: 150.25,
                    marketValue: 15025.0,
                    pnl: 475.0,
                    return: 3.26,
                  },
                  {
                    symbol: 'TSLA',
                    shares: 50,
                    avgPrice: 250.0,
                    currentPrice: 245.8,
                    marketValue: 12290.0,
                    pnl: -210.0,
                    return: -1.68,
                  },
                  {
                    symbol: 'GOOGL',
                    shares: 25,
                    avgPrice: 2700.0,
                    currentPrice: 2750.0,
                    marketValue: 68750.0,
                    pnl: 1250.0,
                    return: 1.85,
                  },
                  {
                    symbol: 'MSFT',
                    shares: 75,
                    avgPrice: 315.0,
                    currentPrice: 320.45,
                    marketValue: 24033.75,
                    pnl: 408.75,
                    return: 1.73,
                  },
                ].map(holding => (
                  <tr key={holding.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-primary-600">
                            {holding.symbol}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {holding.symbol}
                          </div>
                          <div className="text-sm text-gray-500">Stock</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {holding.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${holding.avgPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${holding.currentPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${holding.marketValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          holding.pnl >= 0
                            ? 'text-success-600'
                            : 'text-danger-600'
                        }`}
                      >
                        {holding.pnl >= 0 ? '+' : ''}${holding.pnl}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          holding.return >= 0
                            ? 'text-success-600'
                            : 'text-danger-600'
                        }`}
                      >
                        {holding.return >= 0 ? '+' : ''}
                        {holding.return}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Portfolio Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Value
                  </p>
                  <p className="text-lg font-bold text-gray-900">$120,098.75</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-success-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total P&L</p>
                  <p className="text-lg font-bold text-success-600">
                    +$1,923.75
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-primary-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Return
                  </p>
                  <p className="text-lg font-bold text-primary-600">+1.63%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <PieChart className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Holdings</p>
                  <p className="text-lg font-bold text-gray-900">4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Performance History
        </h2>

        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              Performance chart will be added here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
