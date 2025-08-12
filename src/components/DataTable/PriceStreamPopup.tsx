import React, { useState } from 'react'
import { X, Eye, Settings, RefreshCw, AlertTriangle, CheckCircle, Clock, TrendingUp, Activity } from 'lucide-react'

interface GroupData {
  id: string
  name: string
  priceStream: string
  status: 'active' | 'inactive'
  createdAt: string
  description: string
}

interface PriceStreamPopupProps {
  isOpen: boolean
  onClose: () => void
  group: GroupData | null
}

interface PriceStreamInfo {
  name: string
  status: 'active' | 'inactive' | 'maintenance'
  lastUpdate: string
  latency: number
  reliability: number
  supportedSymbols: string[]
  updateFrequency: string
  dataSource: string
}

const PriceStreamPopup: React.FC<PriceStreamPopupProps> = ({
  isOpen,
  onClose,
  group
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock price stream data - in real app, this would come from API
  const priceStreamInfo: PriceStreamInfo = {
    name: group?.priceStream || 'Default Price Stream',
    status: 'active',
    lastUpdate: new Date().toISOString(),
    latency: 45,
    reliability: 99.8,
    supportedSymbols: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'BTCUSD', 'ETHUSD', 'GOLD', 'SILVER'],
    updateFrequency: '100ms',
    dataSource: 'Primary Exchange Feed'
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case 'inactive':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      case 'maintenance':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'inactive':
        return <AlertTriangle className="w-4 h-4" />
      case 'maintenance':
        return <Clock className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  if (!isOpen || !group) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Price Stream Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {group.name} - Real-time market data configuration
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Price Stream Overview */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Price Stream Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Status</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(priceStreamInfo.status)}`}>
                    {getStatusIcon(priceStreamInfo.status)}
                    <span className="capitalize">{priceStreamInfo.status}</span>
                  </div>
                </div>
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  {priceStreamInfo.name}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <span className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-2">Latency</span>
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  {priceStreamInfo.latency}ms
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <span className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-2">Reliability</span>
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  {priceStreamInfo.reliability}%
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Technical Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Update Frequency
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {priceStreamInfo.updateFrequency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Source
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {priceStreamInfo.dataSource}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Update
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {new Date(priceStreamInfo.lastUpdate).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Created
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                    {new Date(group.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Symbols */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Supported Trading Symbols
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {priceStreamInfo.supportedSymbols.map((symbol, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600 text-center"
                >
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {symbol}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total: {priceStreamInfo.supportedSymbols.length} symbols supported
            </p>
          </div>

          {/* Group Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Group Information
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Group Name:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Group ID:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{group.id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(group.status)}`}>
                  {getStatusIcon(group.status)}
                  <span className="capitalize">{group.status}</span>
                </div>
              </div>
              {group.description && (
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Description:</span>
                  <span className="text-sm text-gray-900 dark:text-white text-right sm:text-left max-w-xs">
                    {group.description}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Implement edit functionality
                console.log('Edit price stream for group:', group.id)
              }}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceStreamPopup 