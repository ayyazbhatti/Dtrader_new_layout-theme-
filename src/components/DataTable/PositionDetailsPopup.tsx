import React, { useState } from 'react'
import { X } from 'lucide-react'
import { PositionData, OpenPositionData } from './types'

type PopupPositionData = PositionData | OpenPositionData

interface PositionDetailsPopupProps {
  position: PopupPositionData | null
  isOpen: boolean
  onClose: () => void
}

const PositionDetailsPopup: React.FC<PositionDetailsPopupProps> = ({ position, isOpen, onClose }) => {
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({
    takeProfit: 0,
    stopLoss: 0,
    quantity: 0,
    strategy: '',
    riskLevel: ''
  })

  if (!isOpen || !position) return null

  const handleSaveChanges = () => {
    // TODO: Implement API call to save changes
    console.log('Saving changes:', editForm)
    setEditMode(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Position Details - {position.symbol}
              </h2>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                      {position.positionId} • {('direction' in position) ? 'Open Position' : 'Closed Position'}
                    </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                editMode 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {editMode ? 'Cancel Edit' : 'Edit Position'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {editMode ? (
            /* Edit Form */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Take Profit
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editForm.takeProfit}
                    onChange={(e) => setEditForm(prev => ({ ...prev, takeProfit: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stop Loss
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editForm.stopLoss}
                    onChange={(e) => setEditForm(prev => ({ ...prev, stopLoss: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Strategy
                  </label>
                  <select
                    value={editForm.strategy}
                    onChange={(e) => setEditForm(prev => ({ ...prev, strategy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Strategy</option>
                    <option value="scalping">Scalping</option>
                    <option value="day-trading">Day Trading</option>
                    <option value="swing-trading">Swing Trading</option>
                    <option value="position-trading">Position Trading</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={editForm.riskLevel}
                    onChange={(e) => setEditForm(prev => ({ ...prev, riskLevel: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Risk Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="space-y-6">
              {/* Position Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Position ID</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{position.positionId}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Symbol</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{position.symbol}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Type</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{position.type}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Direction</h3>
                  <p className={`text-lg font-semibold capitalize ${('direction' in position && position.direction === 'buy') ? 'text-green-600' : 'text-red-600'}`}>
                    {'direction' in position ? position.direction : position.type}
                  </p>
                </div>
              </div>

              {/* Account Information */}
              {('accountId' in position && position.accountId) || ('accountName' in position && position.accountName) ? (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {'accountId' in position && position.accountId && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account ID</label>
                        <p className="text-gray-900 dark:text-white">{String(position.accountId)}</p>
                      </div>
                    )}
                    {'accountName' in position && position.accountName && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Name</label>
                        <p className="text-gray-900 dark:text-white">{String(position.accountName)}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Trading Details */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trading Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Time</label>
                    <p className="text-gray-900 dark:text-white">{position.openTime}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Device Info</label>
                    <p className="text-gray-900 dark:text-white">
                      {'deviceInfoOpen' in position ? String(position.deviceInfoOpen) : 
                       'deviceInfo' in position ? String(position.deviceInfo) : '---'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</label>
                    <p className="text-gray-900 dark:text-white">
                      {'quantity' in position ? String(position.quantity) : '---'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Margin Used</label>
                    <p className="text-gray-900 dark:text-white">
                      {'marginUsed' in position ? String(position.marginUsed) : '---'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              {('takeProfit' in position || 'stopLoss' in position) && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Take Profit</label>
                      <p className="text-gray-900 dark:text-white">
                        {'takeProfit' in position ? position.takeProfit || '---' : '---'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Stop Loss</label>
                      <p className="text-gray-900 dark:text-white">
                        {'stopLoss' in position ? position.stopLoss || '---' : '---'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance */}
              {('unrealizedPnL' in position || 'realizedPnL' in position) && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {'unrealizedPnL' in position && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Unrealized P&L</label>
                        <p className={`text-lg font-semibold ${(position.unrealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(position.unrealizedPnL || 0) >= 0 ? '+' : ''}{(position.unrealizedPnL || 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                    {'realizedPnL' in position && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Realized P&L</label>
                        <p className={`text-lg font-semibold ${(position.realizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(position.realizedPnL || 0) >= 0 ? '+' : ''}{(position.realizedPnL || 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PositionDetailsPopup 