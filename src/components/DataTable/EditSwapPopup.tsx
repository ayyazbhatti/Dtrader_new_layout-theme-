import React, { useState, useEffect } from 'react'
import { X, Save, RefreshCw, TrendingUp, Users, Settings } from 'lucide-react'

interface SwapData {
  id: string
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: 'Active' | 'Inactive' | 'Suspended' | 'Maintenance'
  lastUpdated: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
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

interface SymbolSwapSettings {
  symbol: string
  swapCalculationType: 'Standard' | 'Percentage' | 'Fixed'
  longSwap: number
  shortSwap: number
  threeDaySwap: boolean
  weekendSwaps: boolean
  swapTime: string
  swapPeriod: 'Daily' | 'Weekly' | 'Monthly'
  gracePeriod: number
}

interface GroupUsage {
  id: string
  name: string
  memberCount: number
  status: 'active' | 'inactive'
}

interface EditSwapPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SwapFormData) => void
  initialData: SwapData
}

const EditSwapPopup: React.FC<EditSwapPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'swaps' | 'groups'>('basic')
  const [formData, setFormData] = useState<SwapFormData>({
    symbol: '',
    instrument: '',
    longSwap: 0,
    shortSwap: 0,
    longSwapPercent: 0,
    shortSwapPercent: 0,
    profile: '',
    status: '',
    description: '',
    currency: '',
    minVolume: 0,
    maxVolume: 0,
    commission: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSymbolSwapPopup, setShowSymbolSwapPopup] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolSwapSettings | null>(null)

  // Mock data for symbols
  const mockSymbols: SymbolSwapSettings[] = [
    {
      symbol: 'EUR/USD',
      swapCalculationType: 'Standard',
      longSwap: 2.50,
      shortSwap: -3.20,
      threeDaySwap: true,
      weekendSwaps: false,
      swapTime: '22:00',
      swapPeriod: 'Daily',
      gracePeriod: 2,
    },
    {
      symbol: 'GBP/USD',
      swapCalculationType: 'Percentage',
      longSwap: 3.15,
      shortSwap: -4.10,
      threeDaySwap: true,
      weekendSwaps: true,
      swapTime: '22:00',
      swapPeriod: 'Daily',
      gracePeriod: 1,
    },
    {
      symbol: 'USD/JPY',
      swapCalculationType: 'Fixed',
      longSwap: 1.80,
      shortSwap: -2.45,
      threeDaySwap: false,
      weekendSwaps: false,
      swapTime: '22:00',
      swapPeriod: 'Daily',
      gracePeriod: 0,
    },
    {
      symbol: 'BTC/USD',
      swapCalculationType: 'Standard',
      longSwap: 5.20,
      shortSwap: -6.80,
      threeDaySwap: true,
      weekendSwaps: true,
      swapTime: '00:00',
      swapPeriod: 'Daily',
      gracePeriod: 3,
    },
    {
      symbol: 'XAU/USD',
      swapCalculationType: 'Percentage',
      longSwap: 4.50,
      shortSwap: -5.80,
      threeDaySwap: true,
      weekendSwaps: false,
      swapTime: '22:00',
      swapPeriod: 'Daily',
      gracePeriod: 2,
    },
  ]

  // Mock data for groups using this profile
  const mockGroups: GroupUsage[] = [
    { id: '1', name: 'Premium Traders', memberCount: 45, status: 'active' },
    { id: '2', name: 'VIP Clients', memberCount: 23, status: 'active' },
    { id: '3', name: 'Institutional', memberCount: 12, status: 'active' },
    { id: '4', name: 'Demo Group', memberCount: 67, status: 'inactive' },
  ]

  useEffect(() => {
    if (initialData) {
      setFormData({
        symbol: initialData.symbol,
        instrument: initialData.instrument,
        longSwap: initialData.longSwap,
        shortSwap: initialData.shortSwap,
        longSwapPercent: initialData.longSwapPercent,
        shortSwapPercent: initialData.shortSwapPercent,
        profile: initialData.profile,
        status: initialData.status,
        description: initialData.description,
        currency: initialData.currency,
        minVolume: initialData.minVolume,
        maxVolume: initialData.maxVolume,
        commission: initialData.commission,
      })
      setHasUnsavedChanges(false)
    }
  }, [initialData])

  const handleInputChange = (field: keyof SwapFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    // Clear error for this field
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

    if (!formData.profile.trim()) {
      newErrors.profile = 'Profile name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (formData.minVolume < 0) {
      newErrors.minVolume = 'Minimum volume must be positive'
    }
    if (formData.maxVolume <= formData.minVolume) {
      newErrors.maxVolume = 'Maximum volume must be greater than minimum volume'
    }
    if (formData.commission < 0) {
      newErrors.commission = 'Commission must be positive'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit(formData)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Error updating swap:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  const handleReset = () => {
    if (initialData) {
      setFormData({
        symbol: initialData.symbol,
        instrument: initialData.instrument,
        longSwap: initialData.longSwap,
        shortSwap: initialData.shortSwap,
        longSwapPercent: initialData.longSwapPercent,
        shortSwapPercent: initialData.shortSwapPercent,
        profile: initialData.profile,
        status: initialData.status,
        description: initialData.description,
        currency: initialData.currency,
        minVolume: initialData.minVolume,
        maxVolume: initialData.maxVolume,
        commission: initialData.commission,
      })
      setErrors({})
      setHasUnsavedChanges(false)
    }
  }

  const handleSymbolClick = (symbol: SymbolSwapSettings) => {
    setSelectedSymbol(symbol)
    setShowSymbolSwapPopup(true)
  }

  const handleSymbolSwapSave = (settings: SymbolSwapSettings) => {
    console.log('Saving symbol swap settings:', settings)
    setShowSymbolSwapPopup(false)
    setSelectedSymbol(null)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {initialData.profile} | Edit Swap Profile
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm truncate">Profile ID: {initialData.id}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
              {hasUnsavedChanges && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Unsaved Changes
                </span>
              )}
              <button
                onClick={handleReset}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
                title="Reset Changes"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Reset Changes
                </div>
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
                title="Close Popup"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Close Popup
                </div>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {[
                { id: 'basic', label: 'Basic Info', icon: <Settings className="w-4 h-4" /> },
                { id: 'swaps', label: 'Swaps and Dividends', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'groups', label: 'Used in Groups', icon: <Users className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="hidden sm:inline lg:hidden">{tab.label.split(' ')[0]}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Profile Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.profile}
                      onChange={(e) => handleInputChange('profile', e.target.value)}
                      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                        errors.profile ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter profile name"
                    />
                    {errors.profile && (
                      <p className="mt-1 text-sm text-red-400">{errors.profile}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                        errors.description ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter profile description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="USD"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Commission (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.commission}
                      onChange={(e) => handleInputChange('commission', parseFloat(e.target.value) || 0)}
                      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                        errors.commission ? 'border-red-500' : ''
                      }`}
                      placeholder="0.10"
                    />
                    {errors.commission && (
                      <p className="mt-1 text-sm text-red-400">{errors.commission}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Min Volume
                    </label>
                    <input
                      type="number"
                      value={formData.minVolume}
                      onChange={(e) => handleInputChange('minVolume', parseFloat(e.target.value) || 0)}
                      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                        errors.minVolume ? 'border-red-500' : ''
                      }`}
                      placeholder="1000"
                    />
                    {errors.minVolume && (
                      <p className="mt-1 text-sm text-red-400">{errors.minVolume}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Volume
                    </label>
                    <input
                      type="number"
                      value={formData.maxVolume}
                      onChange={(e) => handleInputChange('maxVolume', parseFloat(e.target.value) || 0)}
                      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                        errors.maxVolume ? 'border-red-500' : ''
                      }`}
                      placeholder="1000000"
                    />
                    {errors.maxVolume && (
                      <p className="mt-1 text-sm text-red-400">{errors.maxVolume}</p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center sm:justify-end pt-4 border-t border-gray-600">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !hasUnsavedChanges}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
              </div>
            )}

            {/* Swaps and Dividends Tab */}
            {activeTab === 'swaps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Symbol Swap Settings
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Click on any symbol row to configure swap settings
                  </p>
                </div>

                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Symbol</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Calculation Type</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Long Swap</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Short Swap</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>3-Day Swap</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Weekend</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Swap Time</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Period</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Grace Period</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {mockSymbols.map((symbol, index) => (
                          <tr
                            key={index}
                            onClick={() => handleSymbolClick(symbol)}
                            className="hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                          >
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <span className="text-xs sm:text-sm text-gray-300 truncate max-w-[120px] sm:max-w-xs">
                                  {symbol.symbol}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {symbol.swapCalculationType}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`text-xs sm:text-sm text-gray-300 ${symbol.longSwap >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {symbol.longSwap >= 0 ? '+' : ''}{symbol.longSwap}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`text-xs sm:text-sm text-gray-300 ${symbol.shortSwap >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {symbol.shortSwap >= 0 ? '+' : ''}{symbol.shortSwap}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                symbol.threeDaySwap
                                  ? 'bg-green-900/20 text-green-400'
                                  : 'bg-gray-900/20 text-gray-400'
                              }`}>
                                {symbol.threeDaySwap ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                symbol.weekendSwaps
                                  ? 'bg-green-900/20 text-green-400'
                                  : 'bg-gray-900/20 text-gray-400'
                              }`}>
                                {symbol.weekendSwaps ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {symbol.swapTime}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {symbol.swapPeriod}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {symbol.gracePeriod} days
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Used in Groups Tab */}
            {activeTab === 'groups' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Groups Using This Profile
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {mockGroups.length} groups are currently using this swap profile
                  </p>
                </div>

                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Group Name</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Member Count</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Status</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Profile Usage</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Actions</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {mockGroups.map((group) => (
                          <tr key={group.id} className="hover:bg-gray-600 transition-colors duration-200">
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <span className="text-xs sm:text-sm text-gray-300 font-medium">
                                  {group.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {group.memberCount} members
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                group.status === 'active'
                                  ? 'bg-green-900/20 text-green-400'
                                  : 'bg-gray-900/20 text-gray-400'
                              }`}>
                                {group.status}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                Primary Profile
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <button className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.586z" />
                                  </svg>
                                </button>
                                <button className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Symbol Swap Settings Popup */}
      {showSymbolSwapPopup && selectedSymbol && (
        <SymbolSwapSettingsPopup
          isOpen={showSymbolSwapPopup}
          onClose={() => setShowSymbolSwapPopup(false)}
          onSubmit={handleSymbolSwapSave}
          initialData={selectedSymbol}
        />
      )}
    </>
  )
}

// Symbol Swap Settings Popup Component
interface SymbolSwapSettingsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SymbolSwapSettings) => void
  initialData: SymbolSwapSettings
}

const SymbolSwapSettingsPopup: React.FC<SymbolSwapSettingsPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<SymbolSwapSettings>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof SymbolSwapSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Swap Settings for {initialData.symbol}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Configure detailed swap parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
            title="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Close
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Swap Calculation Type
              </label>
              <select
                value={formData.swapCalculationType}
                onChange={(e) => handleInputChange('swapCalculationType', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="Standard">Standard</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Swap Period
              </label>
              <select
                value={formData.swapPeriod}
                onChange={(e) => handleInputChange('swapPeriod', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Swap (Long)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.longSwap}
                onChange={(e) => handleInputChange('longSwap', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Swap (Short)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.shortSwap}
                onChange={(e) => handleInputChange('shortSwap', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Swap Time
              </label>
              <input
                type="time"
                value={formData.swapTime}
                onChange={(e) => handleInputChange('swapTime', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grace Period (days)
              </label>
              <input
                type="number"
                value={formData.gracePeriod}
                onChange={(e) => handleInputChange('gracePeriod', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                3-day Swap
              </label>
              <input
                type="text"
                value={formData.threeDaySwap ? 'Yes' : 'No'}
                onChange={(e) => handleInputChange('threeDaySwap', e.target.value === 'Yes')}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Yes/No"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Weekend Swaps
              </label>
              <input
                type="text"
                value={formData.weekendSwaps ? 'Yes' : 'No'}
                onChange={(e) => handleInputChange('weekendSwaps', e.target.value === 'Yes')}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Yes/No"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-3 sm:p-4 lg:p-6 border-t border-gray-700 bg-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 bg-gray-600 border border-gray-500 rounded-lg hover:bg-gray-500 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditSwapPopup 