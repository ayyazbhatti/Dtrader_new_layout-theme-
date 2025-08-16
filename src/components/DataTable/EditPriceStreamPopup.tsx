import React, { useState, useEffect } from 'react'
import { X, Save, Activity, Globe, Settings, AlertCircle, RotateCcw, Tag, Users, Plus, Edit, Trash2 } from 'lucide-react'
import { PriceStreamData, PriceStreamFormData } from './PriceStreamsTable'

interface EditPriceStreamPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PriceStreamFormData) => void
  initialData: PriceStreamData
}

// Additional interfaces for the new functionality
interface SymbolMarkup {
  id: string
  symbol: string
  markupType: 'percentage' | 'point'
  markupBid: number
  markupAsk: number
  description: string
}

interface GroupUsage {
  id: string
  name: string
  memberCount: number
  status: 'active' | 'inactive'
  usageType: 'primary' | 'secondary'
}

const EditPriceStreamPopup: React.FC<EditPriceStreamPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'markups' | 'groups'>('basic')
  const [formData, setFormData] = useState<PriceStreamFormData>({
    name: '',
    symbol: '',
    source: '',
    status: 'active',
    updateFrequency: '1 second',
    description: '',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSymbolMarkupPopup, setShowSymbolMarkupPopup] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState<string>('')

  // Mock data for symbol markups
  const mockSymbolMarkups: SymbolMarkup[] = [
    {
      id: '1',
      symbol: 'BTC/USD',
      markupType: 'percentage',
      markupBid: 0.1,
      markupAsk: 0.15,
      description: 'Bitcoin markup settings'
    },
    {
      id: '2',
      symbol: 'ETH/USD',
      markupType: 'point',
      markupBid: 2.5,
      markupAsk: 3.0,
      description: 'Ethereum markup settings'
    },
    {
      id: '3',
      symbol: 'EUR/USD',
      markupType: 'percentage',
      markupBid: 0.05,
      markupAsk: 0.08,
      description: 'EUR/USD markup settings'
    }
  ]

  // Mock data for groups using this price stream
  const mockGroups: GroupUsage[] = [
    {
      id: '1',
      name: 'Premium Traders',
      memberCount: 150,
      status: 'active',
      usageType: 'primary'
    },
    {
      id: '2',
      name: 'Standard Users',
      memberCount: 450,
      status: 'active',
      usageType: 'secondary'
    },
    {
      id: '3',
      name: 'Demo Account',
      memberCount: 75,
      status: 'inactive',
      usageType: 'secondary'
    }
  ]

  // Initialize form data from initial data
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name,
        symbol: initialData.symbol,
        source: initialData.source,
        status: initialData.status,
        updateFrequency: initialData.updateFrequency,
        description: initialData.description,
        isRealTime: initialData.isRealTime,
        retryAttempts: initialData.retryAttempts,
        maxRetries: initialData.maxRetries
      })
      setErrors({})
      setHasUnsavedChanges(false)
    }
  }, [isOpen, initialData])

  const handleInputChange = (field: keyof PriceStreamFormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
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

    if (!formData.name.trim()) {
      newErrors.name = 'Stream name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(formData)
      setHasUnsavedChanges(false)
      onClose()
    } catch (error) {
      console.error('Error updating price stream:', error)
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
        name: initialData.name,
        symbol: initialData.symbol,
        source: initialData.source,
        status: initialData.status,
        updateFrequency: initialData.updateFrequency,
        description: initialData.description,
        isRealTime: initialData.isRealTime,
        retryAttempts: initialData.retryAttempts,
        maxRetries: initialData.maxRetries
      })
      setErrors({})
      setHasUnsavedChanges(false)
    }
  }

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol)
    setShowSymbolMarkupPopup(true)
  }

  const handleSymbolMarkupSave = (markupData: any) => {
    console.log('Saving markup for symbol:', selectedSymbol, markupData)
    setShowSymbolMarkupPopup(false)
    setSelectedSymbol('')
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full sm:w-auto max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] overflow-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  Edit Price Stream
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm truncate">Update price stream configuration</p>
              </div>
              {hasUnsavedChanges && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-900/30 text-yellow-400">
                  Unsaved Changes
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              
              <button
                onClick={() => setActiveTab('basic')}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                  activeTab === 'basic'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('markups')}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                  activeTab === 'markups'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Symbol Markups
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                  activeTab === 'groups'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Used in Groups
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                      Stream Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-xs sm:text-sm ${
                        errors.name 
                          ? 'border-red-500' 
                          : 'border-gray-600'
                      } placeholder-gray-400`}
                      placeholder="e.g., Price Stream One"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as any)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="error">Error</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-xs sm:text-sm ${
                      errors.description 
                        ? 'border-red-500' 
                        : 'border-gray-600'
                    } placeholder-gray-400`}
                    placeholder="Describe the price stream and its purpose..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Symbol Markups Tab */}
            {activeTab === 'markups' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-green-600" />
                    Symbol Markups
                  </h3>
                  <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Markup
                  </button>
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
                              <span>Markup Type</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Markup Bid</span>
                              <button className="text-blue-400 hover:text-blue-300 transition-colors p-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Markup Ask</span>
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
                        {mockSymbolMarkups.map((markup) => (
                          <tr key={markup.id} className="hover:bg-gray-600 transition-colors duration-200 cursor-pointer" onClick={() => handleSymbolClick(markup.symbol)}>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <span className="text-xs sm:text-sm text-gray-300 font-medium">
                                  {markup.symbol}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {markup.markupType}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {markup.markupBid}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <span className="text-xs sm:text-sm text-gray-300">
                                {markup.markupAsk}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <button className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                  <Trash2 className="w-3 h-3" />
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

            {/* Used in Groups Tab */}
            {activeTab === 'groups' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Groups Using This Profile
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {mockGroups.length} groups are currently using this price stream
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
                              <span>Usage Type</span>
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
                                {group.usageType === 'primary' ? 'Primary' : 'Secondary'}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <button className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                  <Trash2 className="w-3 h-3" />
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

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-700 px-3 sm:px-4 pb-3 sm:pb-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasUnsavedChanges}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !hasUnsavedChanges}
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Stream
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Symbol Markup Popup */}
      {showSymbolMarkupPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-2 sm:p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full sm:w-auto max-w-[95vw] sm:max-w-lg">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Add Markup for {selectedSymbol}
              </h3>
              <button
                onClick={() => setShowSymbolMarkupPopup(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Markup Type
                </label>
                <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="percentage">Percentage</option>
                  <option value="point">Point</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Markup Bid
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Markup Ask
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 sm:space-x-3 p-3 sm:p-4 border-t border-gray-700">
              <button
                onClick={() => setShowSymbolMarkupPopup(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSymbolMarkupSave({})}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Save Markup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditPriceStreamPopup 