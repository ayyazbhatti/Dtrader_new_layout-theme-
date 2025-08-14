import React, { useState } from 'react'
import { X, Save, RefreshCw, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'

interface CreateSwapPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SwapFormData) => void
}

interface SwapFormData {
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
}

const CreateSwapPopup: React.FC<CreateSwapPopupProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<SwapFormData>({
    symbol: '',
    instrument: '',
    longSwap: 0,
    shortSwap: 0,
    longSwapPercent: 0,
    shortSwapPercent: 0,
    profile: 'Default Swap Dividend',
    status: 'Active',
    description: '',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 1000000,
    commission: 0.1
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const instruments = [
    'Forex',
    'Crypto',
    'Commodity',
    'Stock',
    'Index',
    'Bond',
    'ETF',
    'Other'
  ]

  const profiles = [
    'Default Swap Dividend',
    'Premium Swap Dividend',
    'VIP Swap Dividend',
    'Professional Swap Dividend',
    'Custom Swap Dividend'
  ]

  const statuses = [
    'Active',
    'Inactive',
    'Suspended',
    'Maintenance',
    'Pending Review'
  ]

  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'BTC',
    'ETH'
  ]

  const handleInputChange = (field: keyof SwapFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required'
    }
    if (!formData.instrument) {
      newErrors.instrument = 'Instrument type is required'
    }
    if (formData.longSwap === 0 && formData.shortSwap === 0) {
      newErrors.longSwap = 'At least one swap rate must be set'
      newErrors.shortSwap = 'At least one swap rate must be set'
    }
    if (formData.minVolume >= formData.maxVolume) {
      newErrors.minVolume = 'Minimum volume must be less than maximum volume'
      newErrors.maxVolume = 'Maximum volume must be greater than minimum volume'
    }
    if (formData.commission < 0) {
      newErrors.commission = 'Commission cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      symbol: '',
      instrument: '',
      longSwap: 0,
      shortSwap: 0,
      longSwapPercent: 0,
      shortSwapPercent: 0,
      profile: 'Default Swap Dividend',
      status: 'Active',
      description: '',
      currency: 'USD',
      minVolume: 1000,
      maxVolume: 1000000,
      commission: 0.1
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Swap
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configure swap rates for a new trading instrument
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information - 3 Fields per Row */}
          <div className="space-y-6">
            {/* Row 1: Symbol, Instrument, Currency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Symbol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Symbol <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.symbol
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., EUR/USD, BTC/USD, AAPL"
                />
                {errors.symbol && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.symbol}</p>
                )}
              </div>

              {/* Instrument */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instrument Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.instrument}
                  onChange={(e) => handleInputChange('instrument', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.instrument
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value="">Select instrument type</option>
                  {instruments.map(instrument => (
                    <option key={instrument} value={instrument}>{instrument}</option>
                  ))}
                </select>
                {errors.instrument && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.instrument}</p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Long Swap, Short Swap, Profile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Long Swap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Swap Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.longSwap}
                    onChange={(e) => handleInputChange('longSwap', parseFloat(e.target.value) || 0)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.longSwap
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="0.00"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                {errors.longSwap && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.longSwap}</p>
                )}
              </div>

              {/* Short Swap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Swap Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.shortSwap}
                    onChange={(e) => handleInputChange('shortSwap', parseFloat(e.target.value) || 0)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.shortSwap
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="0.00"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                {errors.shortSwap && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.shortSwap}</p>
                )}
              </div>

              {/* Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Swap Profile
                </label>
                <select
                  value={formData.profile}
                  onChange={(e) => handleInputChange('profile', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {profiles.map(profile => (
                    <option key={profile} value={profile}>{profile}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Long Swap %, Short Swap %, Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Long Swap Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Swap %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    value={formData.longSwapPercent}
                    onChange={(e) => handleInputChange('longSwapPercent', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="0.000"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Percent className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Short Swap Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Swap %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    value={formData.shortSwapPercent}
                    onChange={(e) => handleInputChange('shortSwapPercent', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="0.000"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Percent className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Min Volume, Max Volume, Commission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Min Volume */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Volume
                </label>
                <input
                  type="number"
                  value={formData.minVolume}
                  onChange={(e) => handleInputChange('minVolume', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.minVolume
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="1000"
                />
                {errors.minVolume && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minVolume}</p>
                )}
              </div>

              {/* Max Volume */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Volume
                </label>
                <input
                  type="number"
                  value={formData.maxVolume}
                  onChange={(e) => handleInputChange('maxVolume', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.maxVolume
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="1000000"
                />
                {errors.maxVolume && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxVolume}</p>
                )}
              </div>

              {/* Commission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Commission Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.commission}
                    onChange={(e) => handleInputChange('commission', parseFloat(e.target.value) || 0)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.commission
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="0.10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                {errors.commission && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.commission}</p>
                )}
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="grid grid-cols-1 gap-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Provide a detailed description of this swap instrument..."
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Create Swap</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSwapPopup 