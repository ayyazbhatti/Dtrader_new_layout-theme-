import React, { useState, useEffect } from 'react'
import { X, Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface SymbolData {
  symbolId: string
  symbol: string
  pipPosition: number
  digit: number
  bid: string
  ask: string
  assetClass: string
  leverageProfile: string
  status: string
  baseAsset?: string
  quoteAsset?: string
  description?: string
  category?: string
  lotSize?: number
  units?: string
  timeZone?: string
  maintenanceMargin?: string
  lastTradeDate?: string
  expirationDate?: string
}

interface EditSymbolPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (symbol: SymbolData) => Promise<void>
  symbol: SymbolData | null
}

interface ValidationErrors {
  [key: string]: string
}

const EditSymbolPopup: React.FC<EditSymbolPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  symbol
}) => {
  const [formData, setFormData] = useState<SymbolData | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Initialize form data when symbol changes
  useEffect(() => {
    if (symbol) {
      setFormData({ ...symbol })
      setErrors({})
      setIsDirty(false)
    }
  }, [symbol])

  // Handle input changes
  const handleInputChange = (field: keyof SymbolData, value: any) => {
    if (!formData) return

    setFormData(prev => prev ? { ...prev, [field]: value } : null)
    setIsDirty(true)

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData) return false

    // Required fields validation
    if (!formData.symbol?.trim()) {
      newErrors.symbol = 'Symbol name is required'
    }
    if (!formData.baseAsset?.trim()) {
      newErrors.baseAsset = 'Base asset is required'
    }
    if (!formData.quoteAsset?.trim()) {
      newErrors.quoteAsset = 'Quote asset is required'
    }
    if (!formData.assetClass) {
      newErrors.assetClass = 'Asset class is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (formData.pipPosition < 0) {
      newErrors.pipPosition = 'Pip position must be non-negative'
    }
    if (formData.digit < 0) {
      newErrors.digit = 'Digit must be non-negative'
    }

    // Business logic validation
    if (formData.lotSize && formData.lotSize <= 0) {
      newErrors.lotSize = 'Lot size must be positive'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData) return

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error saving symbol:', error)
      // You could show a toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle close with unsaved changes warning
  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?')
      if (!confirmed) return
    }
    onClose()
  }

  if (!isOpen || !symbol || !formData) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Edit Symbol: {symbol.symbol}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Modify symbol configuration and settings
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 self-end sm:self-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Symbol Details Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">📊</span>
                Symbol Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Symbol Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Symbol Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => handleInputChange('symbol', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.symbol 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    placeholder="e.g., AAPL, EURUSD"
                    required
                  />
                  {errors.symbol && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.symbol}
                    </p>
                  )}
                </div>

                {/* Base Asset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Base Asset <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.baseAsset || ''}
                    onChange={(e) => handleInputChange('baseAsset', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.baseAsset 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    placeholder="e.g., AAPL, EUR"
                    required
                  />
                  {errors.baseAsset && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.baseAsset}
                    </p>
                  )}
                </div>

                {/* Quote Asset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quote Asset <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.quoteAsset || ''}
                    onChange={(e) => handleInputChange('quoteAsset', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.quoteAsset 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    placeholder="e.g., USD, BTC"
                    required
                  />
                  {errors.quoteAsset && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.quoteAsset}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    placeholder="Symbol description"
                  />
                </div>

                {/* Asset Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Asset Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.assetClass}
                    onChange={(e) => handleInputChange('assetClass', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.assetClass 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    required
                  >
                    <option value="">Select Asset Class</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Forex">Forex</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Indices">Indices</option>
                    <option value="Bonds">Bonds</option>
                  </select>
                  {errors.assetClass && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.assetClass}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.category 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Default Category">Default Category</option>
                    <option value="Premium Category">Premium Category</option>
                    <option value="VIP Category">VIP Category</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Trading Parameters Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">⚙️</span>
                Trading Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Pip Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pip Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.pipPosition}
                    onChange={(e) => handleInputChange('pipPosition', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.pipPosition 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    min="0"
                    step="1"
                    placeholder="0"
                    required
                  />
                  {errors.pipPosition && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.pipPosition}
                    </p>
                  )}
                </div>

                {/* Digit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Digit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.digit}
                    onChange={(e) => handleInputChange('digit', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.digit 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    min="0"
                    step="1"
                    placeholder="0"
                    required
                  />
                  {errors.digit && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.digit}
                    </p>
                  )}
                </div>

                {/* Lot Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lot Size
                  </label>
                  <input
                    type="number"
                    value={formData.lotSize || ''}
                    onChange={(e) => handleInputChange('lotSize', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm ${
                      errors.lotSize 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                    }`}
                    step="0.01"
                    min="0.01"
                    placeholder="100.00"
                  />
                  {errors.lotSize && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.lotSize}
                    </p>
                  )}
                </div>

                {/* Units */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Units
                  </label>
                  <input
                    type="text"
                    value={formData.units || ''}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    placeholder="e.g., Shares, Units"
                  />
                </div>

                {/* Time Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Zone
                  </label>
                  <select
                    value={formData.timeZone || ''}
                    onChange={(e) => handleInputChange('timeZone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  >
                    <option value="">Select Time Zone</option>
                    <option value="(UTC-6:00- With DST )US(Chicago)">(UTC-6:00) US (Chicago)</option>
                    <option value="(UTC+0:00) GMT">(UTC+0:00) GMT</option>
                    <option value="(UTC+1:00) CET">(UTC+1:00) CET</option>
                    <option value="(UTC+8:00) CST">(UTC+8:00) CST</option>
                  </select>
                </div>

                {/* Maintenance Margin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maintenance Margin
                  </label>
                  <input
                    type="text"
                    value={formData.maintenanceMargin || ''}
                    onChange={(e) => handleInputChange('maintenanceMargin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    placeholder="e.g., 25%"
                  />
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">📅</span>
                Important Dates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Last Trade Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Trade Date
                  </label>
                  <input
                    type="date"
                    value={formData.lastTradeDate || ''}
                    onChange={(e) => handleInputChange('lastTradeDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={formData.expirationDate || ''}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Default Profiles Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">🎯</span>
                Default Profiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Leverage Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Leverage Profile <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.leverageProfile}
                    onChange={(e) => handleInputChange('leverageProfile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    required
                  >
                    <option value="Default Leverage">Default Leverage</option>
                    <option value="Conservative">Conservative (1:100)</option>
                    <option value="Moderate">Moderate (1:200)</option>
                    <option value="Aggressive">Aggressive (1:500)</option>
                    <option value="Professional">Professional (1:1000)</option>
                    <option value="Institutional">Institutional (1:2000)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSymbolPopup 