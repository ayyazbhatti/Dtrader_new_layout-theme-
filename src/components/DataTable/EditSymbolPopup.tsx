import React, { useState, useEffect } from 'react'
import { X, Save, Tag, Globe, Settings, Calendar, Clock, DollarSign } from 'lucide-react'

interface EditSymbolPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SymbolFormData) => void
  initialData?: SymbolFormData
}

interface SymbolFormData {
  symbolName: string
  assetClass: string
  digit: number
  maintenanceMargin: string
  baseAsset: string
  category: string
  lotSize: number
  lastTradeDate: string
  quoteAsset: string
  status: string
  units: string
  expirationDate: string
  description: string
  pipPosition: number
  timeZone: string
  leverageProfile: string
}

const EditSymbolPopup: React.FC<EditSymbolPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<SymbolFormData>(() => {
    if (initialData) {
      return initialData
    }
    return {
      symbolName: '',
      assetClass: '',
      digit: 2,
      maintenanceMargin: '',
      baseAsset: '',
      category: '',
      lotSize: 10000,
      lastTradeDate: '',
      quoteAsset: '',
      status: 'Active',
      units: '',
      expirationDate: '',
      description: '',
      pipPosition: 2,
      timeZone: '',
      leverageProfile: ''
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const assetClasses = [
    'Forex',
    'Crypto',
    'Stock',
    'Commodity',
    'Index',
    'Bond',
    'ETF'
  ]

  const categories = [
    'Default Category',
    'Major Pairs',
    'Minor Pairs',
    'Exotic Pairs',
    'Crypto Pairs',
    'Stock Pairs',
    'Commodity Pairs'
  ]

  const statuses = [
    'Active',
    'Inactive',
    'Suspended',
    'Maintenance'
  ]

  const timeZones = [
    '(UTC-6:00- With DST )US(Chicago)',
    '(UTC-5:00- With DST )US(New York)',
    '(UTC+0:00)GMT(London)',
    '(UTC+1:00)Europe(Paris)',
    '(UTC+2:00)Europe(Athens)',
    '(UTC+3:00)Europe(Moscow)',
    '(UTC+5:30)Asia(Kolkata)',
    '(UTC+8:00)Asia(Shanghai)',
    '(UTC+9:00)Asia(Tokyo)'
  ]

  const leverageProfiles = [
    '19_Feb',
    '20_Mar',
    '21_Apr',
    '22_May',
    '23_Jun',
    '24_Jul'
  ]

  // Update form data when initialData changes (for editing mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (field: keyof SymbolFormData, value: any) => {
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

    if (!formData.symbolName.trim()) {
      newErrors.symbolName = 'Symbol name is required'
    }
    if (!formData.assetClass) {
      newErrors.assetClass = 'Asset class is required'
    }
    if (!formData.digit || formData.digit < 0) {
      newErrors.digit = 'Valid digit is required'
    }
    if (!formData.baseAsset.trim()) {
      newErrors.baseAsset = 'Base asset is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (!formData.lotSize || formData.lotSize <= 0) {
      newErrors.lotSize = 'Valid lot size is required'
    }
    if (!formData.quoteAsset.trim()) {
      newErrors.quoteAsset = 'Quote asset is required'
    }
    if (!formData.units.trim()) {
      newErrors.units = 'Units are required'
    }
    if (!formData.pipPosition || formData.pipPosition < 0) {
      newErrors.pipPosition = 'Valid pip position is required'
    }
    if (!formData.leverageProfile) {
      newErrors.leverageProfile = 'Leverage profile is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      symbolName: '',
      assetClass: '',
      digit: 2,
      maintenanceMargin: '',
      baseAsset: '',
      category: '',
      lotSize: 10000,
      lastTradeDate: '',
      quoteAsset: '',
      status: 'Active',
      units: '',
      expirationDate: '',
      description: '',
      pipPosition: 2,
      timeZone: '',
      leverageProfile: ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {initialData ? 'Edit Symbol' : 'Add New Symbol'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {initialData ? 'Modify existing symbol details' : 'Create a new trading symbol'}
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
          {/* Main Symbol Details - 3 Fields per Row */}
          <div className="space-y-6">
            {/* Row 1: Symbol Name, Asset Class, Digit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Symbol Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Symbol Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.symbolName}
                  onChange={(e) => handleInputChange('symbolName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.symbolName
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., GBPUSD"
                />
                {errors.symbolName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.symbolName}</p>
                )}
              </div>

              {/* Asset Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asset Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.assetClass}
                  onChange={(e) => handleInputChange('assetClass', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.assetClass
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value="">Select asset class</option>
                  {assetClasses.map(assetClass => (
                    <option key={assetClass} value={assetClass}>{assetClass}</option>
                  ))}
                </select>
                {errors.assetClass && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.assetClass}</p>
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
                  onChange={(e) => handleInputChange('digit', parseInt(e.target.value))}
                  min="0"
                  max="10"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.digit
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., 6"
                />
                {errors.digit && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.digit}</p>
                )}
              </div>
            </div>

            {/* Row 2: Maintenance Margin, Base Asset, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Maintenance Margin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maintenance Margin
                </label>
                <input
                  type="text"
                  value={formData.maintenanceMargin}
                  onChange={(e) => handleInputChange('maintenanceMargin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="e.g., 0.5%"
                />
              </div>

              {/* Base Asset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Asset <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.baseAsset}
                  onChange={(e) => handleInputChange('baseAsset', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.baseAsset
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., GBP"
                />
                {errors.baseAsset && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.baseAsset}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.category
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Row 3: Lot Size, Last Trade Date, Quote Asset */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lot Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lot Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.lotSize}
                  onChange={(e) => handleInputChange('lotSize', parseInt(e.target.value))}
                  min="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.lotSize
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., 10000"
                />
                {errors.lotSize && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lotSize}</p>
                )}
              </div>

              {/* Last Trade Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Trade Date
                </label>
                <input
                  type="date"
                  value={formData.lastTradeDate}
                  onChange={(e) => handleInputChange('lastTradeDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Quote Asset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quote Asset <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.quoteAsset}
                  onChange={(e) => handleInputChange('quoteAsset', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.quoteAsset
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., USD"
                />
                {errors.quoteAsset && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quoteAsset}</p>
                )}
              </div>
            </div>

            {/* Row 4: Status, Units, Expiration Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Units */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Units <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.units}
                  onChange={(e) => handleInputChange('units', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.units
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., GBP"
                />
                {errors.units && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.units}</p>
                )}
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Row 5: Description, Pip Position, Time Zone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="e.g., British Pound vs US Dollar"
                />
              </div>

              {/* Pip Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pip Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.pipPosition}
                  onChange={(e) => handleInputChange('pipPosition', parseInt(e.target.value))}
                  min="0"
                  max="10"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.pipPosition
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="e.g., 2"
                />
                {errors.pipPosition && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pipPosition}</p>
                )}
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Zone
                </label>
                <select
                  value={formData.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option value="">Select time zone</option>
                  {timeZones.map(timeZone => (
                    <option key={timeZone} value={timeZone}>{timeZone}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Default Profiles Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Default Profiles</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Leverage Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Leverage Profile <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.leverageProfile}
                  onChange={(e) => handleInputChange('leverageProfile', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.leverageProfile
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value="">Select leverage profile</option>
                  {leverageProfiles.map(profile => (
                    <option key={profile} value={profile}>{profile}</option>
                  ))}
                </select>
                {errors.leverageProfile && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.leverageProfile}</p>
                )}
              </div>
              
              {/* Empty space for balance */}
              <div></div>
              <div></div>
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
              <span>{initialData ? 'Update Symbol' : 'Create Symbol'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSymbolPopup 