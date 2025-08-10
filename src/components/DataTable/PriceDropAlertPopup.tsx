import React, { useState } from 'react'
import { X } from 'lucide-react'
import { PriceDropAlertData } from './types'

interface PriceDropAlertPopupProps {
  isOpen: boolean
  onClose: () => void
  onSend: (data: PriceDropAlertData) => void
}

export const PriceDropAlertPopup: React.FC<PriceDropAlertPopupProps> = ({
  isOpen,
  onClose,
  onSend
}) => {
  const [formData, setFormData] = useState<PriceDropAlertData>({
    symbol: '',
    title: '',
    quantity: 0,
    allowUserChangeQuantity: false,
    sendEmailToOfflineUsers: false,
    sendNotificationsToOfflineUsers: false,
    comment: ''
  })

  // Mock symbols for demonstration
  const availableSymbols = ['BTC/USD', 'ETH/USD', 'ADA/USD', 'DOT/USD', 'LINK/USD', 'LTC/USD']

  const handleInputChange = (field: keyof PriceDropAlertData, value: string | number | boolean) => {
    setFormData((prev: PriceDropAlertData) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSend = () => {
    if (formData.symbol && formData.title && formData.quantity > 0) {
      onSend(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      symbol: '',
      title: '',
      quantity: 0,
      allowUserChangeQuantity: false,
      sendEmailToOfflineUsers: false,
      sendNotificationsToOfflineUsers: false,
      comment: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Price Drop Alert
          </h2>
          <button
            onClick={handleClose}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Symbol Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Symbol
            </label>
            <select
              value={formData.symbol}
              onChange={(e) => handleInputChange('symbol', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Symbol</option>
              {availableSymbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>

          {/* Title and Quantity Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                placeholder="Enter Quantity"
                value={formData.quantity || ''}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowUserChangeQuantity}
                onChange={(e) => handleInputChange('allowUserChangeQuantity', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Allow user to change quantity
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendEmailToOfflineUsers}
                onChange={(e) => handleInputChange('sendEmailToOfflineUsers', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Send Email To Offline Users
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendNotificationsToOfflineUsers}
                onChange={(e) => handleInputChange('sendNotificationsToOfflineUsers', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Send Notifications To Offline Users
              </span>
            </label>
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment
            </label>
            <textarea
              placeholder="Enter Your Comment"
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSend}
            disabled={!formData.symbol || !formData.title || formData.quantity <= 0}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
} 