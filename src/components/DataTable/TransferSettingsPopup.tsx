import React, { useState, useMemo, useEffect } from 'react'
import { X, Search, ArrowLeftRight, AlertCircle, CheckCircle, Loader2, Settings, Users, Coins } from 'lucide-react'

interface TransferItem {
  id: string
  label: string
  type: 'main' | 'sub' | 'symbol' | 'group'
  description?: string
  count?: number
}

interface TransferSettingsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (transferData: TransferData) => Promise<void>
  sourceSymbol?: string
  sourceSettings?: any
}

interface TransferData {
  selectedSettings: string[]
  selectedSymbols: string[]
  selectedGroups: string[]
  transferMode: 'copy' | 'move' | 'merge'
  overwriteExisting: boolean
}

const TransferSettingsPopup: React.FC<TransferSettingsPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  sourceSymbol,
  sourceSettings
}) => {
  const [settingsSearchTerm, setSettingsSearchTerm] = useState('')
  const [symbolsSearchTerm, setSymbolsSearchTerm] = useState('')
  const [groupsSearchTerm, setGroupsSearchTerm] = useState('')
  
  const [selectedSettings, setSelectedSettings] = useState<string[]>([])
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  
  const [transferMode, setTransferMode] = useState<'copy' | 'move' | 'merge'>('copy')
  const [overwriteExisting, setOverwriteExisting] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'settings' | 'symbols' | 'groups'>('settings')

  // Mock data - in real app, this would come from props or API
  const allSettings = useMemo<TransferItem[]>(() => [
    { id: 'all-settings', label: 'All Settings', type: 'main', description: 'Transfer all configuration settings', count: 15 },
    { id: 'enabled', label: 'Enabled', type: 'sub', description: 'Enable/disable status', count: 1 },
    { id: 'leverage-profile', label: 'Leverage Profile', type: 'sub', description: 'Risk management settings', count: 1 },
    { id: 'trading-limits', label: 'Trading Limits', type: 'sub', description: 'Position and order limits', count: 3 },
    { id: 'commission-rates', label: 'Commission Rates', type: 'sub', description: 'Fee structure settings', count: 2 },
    { id: 'risk-parameters', label: 'Risk Parameters', type: 'sub', description: 'Stop loss and margin settings', count: 4 },
    { id: 'notification-settings', label: 'Notification Settings', type: 'sub', description: 'Alert and notification preferences', count: 3 },
    { id: 'access-controls', label: 'Access Controls', type: 'sub', description: 'User permissions and restrictions', count: 1 }
  ], [])

  const allSymbols = useMemo<TransferItem[]>(() => [
    { id: 'all-symbols', label: 'All Symbols', type: 'main', description: 'Transfer to all available symbols', count: 150 },
    { id: 'cryptocurrencies', label: 'Cryptocurrencies', type: 'main', description: 'All crypto trading pairs', count: 45 },
    { id: 'forex-pairs', label: 'Forex Pairs', type: 'main', description: 'All currency pairs', count: 28 },
    { id: 'stocks', label: 'Stocks', type: 'main', description: 'All stock symbols', count: 67 },
    { id: 'commodities', label: 'Commodities', type: 'main', description: 'All commodity symbols', count: 10 },
    ...['ADAUSDT', 'APTUSDT', 'BCHUSDT', 'CHRUSDT', 'CRVUSDT', 'DOTUSDT', 'EIGENUSDT', 'LDOUSDT', 'MINAUSDT', 'PHAUSDT', 'PYTHUSDT', 'DLCLUSDT'].map((symbol): TransferItem => ({
      id: symbol,
      label: symbol,
      type: 'symbol',
      description: 'Cryptocurrency trading pair'
    }))
  ], [])

  const allGroups = useMemo<TransferItem[]>(() => [
    { id: 'all-groups', label: 'All Groups', type: 'main', description: 'Transfer to all user groups', count: 25 },
    ...['DefaultGroup', '17_Feb_Group', 'profitxbt', '21_Feb', 'Bot_group', 'Testing_25Feb', 'Tuesday_GROUP', 'new', 'abctestprice', 'Forex', 'maxuser'].map((group): TransferItem => ({
      id: group,
      label: group,
      type: 'group',
      description: 'User group for trading'
    }))
  ], [])

  // Filtered data for search functionality
  const filteredSettings = useMemo(() => {
    if (!settingsSearchTerm) return allSettings
    return allSettings.filter(setting => 
      setting.label.toLowerCase().includes(settingsSearchTerm.toLowerCase()) ||
      setting.description?.toLowerCase().includes(settingsSearchTerm.toLowerCase())
    )
  }, [settingsSearchTerm, allSettings])

  const filteredSymbols = useMemo(() => {
    if (!symbolsSearchTerm) return allSymbols
    return allSymbols.filter(symbol => 
      symbol.label.toLowerCase().includes(symbolsSearchTerm.toLowerCase()) ||
      symbol.description?.toLowerCase().includes(symbolsSearchTerm.toLowerCase())
    )
  }, [symbolsSearchTerm, allSymbols])

  const filteredGroups = useMemo(() => {
    if (!groupsSearchTerm) return allGroups
    return allGroups.filter(group => 
      group.label.toLowerCase().includes(groupsSearchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(groupsSearchTerm.toLowerCase())
    )
  }, [groupsSearchTerm, allGroups])

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setSettingsSearchTerm('')
      setSymbolsSearchTerm('')
      setGroupsSearchTerm('')
      setSelectedSettings([])
      setSelectedSymbols([])
      setSelectedGroups([])
      setTransferMode('copy')
      setOverwriteExisting(false)
      setActiveTab('settings')
    }
  }, [isOpen])

  // Handle checkbox selection
  const handleSettingToggle = (settingId: string) => {
    setSelectedSettings(prev => 
      prev.includes(settingId) 
        ? prev.filter(id => id !== settingId)
        : [...prev, settingId]
    )
  }

  const handleSymbolToggle = (symbolId: string) => {
    setSelectedSymbols(prev => 
      prev.includes(symbolId) 
        ? prev.filter(id => id !== symbolId)
        : [...prev, symbolId]
    )
  }

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  // Handle select all/none
  const handleSelectAll = (type: 'settings' | 'symbols' | 'groups') => {
    switch (type) {
      case 'settings':
        setSelectedSettings(filteredSettings.map(s => s.id))
        break
      case 'symbols':
        setSelectedSymbols(filteredSymbols.map(s => s.id))
        break
      case 'groups':
        setSelectedGroups(filteredGroups.map(g => g.id))
        break
    }
  }

  const handleSelectNone = (type: 'settings' | 'symbols' | 'groups') => {
    switch (type) {
      case 'settings':
        setSelectedSettings([])
        break
      case 'symbols':
        setSelectedSymbols([])
        break
      case 'groups':
        setSelectedGroups([])
        break
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedSettings.length === 0 || (selectedSymbols.length === 0 && selectedGroups.length === 0)) {
      alert('Please select at least one setting and one target (symbol or group)')
      return
    }

    setIsSubmitting(true)
    try {
      const transferData: TransferData = {
        selectedSettings,
        selectedSymbols,
        selectedGroups,
        transferMode,
        overwriteExisting
      }
      
      await onSubmit(transferData)
      onClose()
    } catch (error) {
      console.error('Error transferring settings:', error)
      alert('Failed to transfer settings. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get summary counts
  const getSummaryCounts = () => {
    const settingsCount = selectedSettings.length
    const symbolsCount = selectedSymbols.length
    const groupsCount = selectedGroups.length
    
    return { settingsCount, symbolsCount, groupsCount }
  }

  const { settingsCount, symbolsCount, groupsCount } = getSummaryCounts()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Transfer Settings
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {sourceSymbol ? `Transfer settings from ${sourceSymbol}` : 'Select target symbols and groups to transfer settings'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Transfer Options */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Transfer Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Transfer Mode
                </label>
                <select
                  value={transferMode}
                  onChange={(e) => setTransferMode(e.target.value as 'copy' | 'move' | 'merge')}
                  className="w-full px-3 py-2 text-xs border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="copy">Copy Settings</option>
                  <option value="move">Move Settings</option>
                  <option value="merge">Merge Settings</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Overwrite Existing
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="overwrite"
                    checked={overwriteExisting}
                    onChange={(e) => setOverwriteExisting(e.target.checked)}
                    className="rounded border-blue-200 dark:border-blue-700 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="overwrite" className="ml-2 text-xs text-blue-800 dark:text-blue-200">
                    Replace existing settings
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-blue-800 dark:text-blue-200">
                  <div className="flex items-center justify-between">
                    <span>Settings: <strong>{settingsCount}</strong></span>
                    <span>Symbols: <strong>{symbolsCount}</strong></span>
                    <span>Groups: <strong>{groupsCount}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Settings ({settingsCount})
            </button>
            <button
              onClick={() => setActiveTab('symbols')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'symbols'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4 inline mr-2" />
              Symbols ({symbolsCount})
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'groups'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Groups ({groupsCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings to Transfer
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectAll('settings')}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => handleSelectNone('settings')}
                      className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Select None
                    </button>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search settings..."
                    value={settingsSearchTerm}
                    onChange={(e) => setSettingsSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                  {settingsSearchTerm && (
                    <button
                      onClick={() => setSettingsSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Count */}
                {settingsSearchTerm && (
                  <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                    Found {filteredSettings.length} setting{filteredSettings.length !== 1 ? 's' : ''}
                  </div>
                )}
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredSettings.map(setting => (
                    <div key={setting.id} className={`flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                      selectedSettings.includes(setting.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}>
                      <input
                        type="checkbox"
                        id={setting.id}
                        checked={selectedSettings.includes(setting.id)}
                        onChange={() => handleSettingToggle(setting.id)}
                        className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={setting.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                          {setting.label}
                        </label>
                        {setting.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {setting.description}
                          </p>
                        )}
                        {setting.count && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full mt-1">
                            {setting.count} items
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symbols Tab */}
            {activeTab === 'symbols' && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <Coins className="w-4 h-4 mr-2" />
                    Target Symbols
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectAll('symbols')}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => handleSelectNone('symbols')}
                      className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Select None
                    </button>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search symbols..."
                    value={symbolsSearchTerm}
                    onChange={(e) => setSymbolsSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                  {symbolsSearchTerm && (
                    <button
                      onClick={() => setSymbolsSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Count */}
                {symbolsSearchTerm && (
                  <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                    Found {filteredSymbols.length} symbol{filteredSymbols.length !== 1 ? 's' : ''}
                  </div>
                )}
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredSymbols.map(symbol => (
                    <div key={symbol.id} className={`flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                      selectedSymbols.includes(symbol.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}>
                      <input
                        type="checkbox"
                        id={symbol.id}
                        checked={selectedSymbols.includes(symbol.id)}
                        onChange={() => handleSymbolToggle(symbol.id)}
                        className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={symbol.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                          {symbol.label}
                        </label>
                        {symbol.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {symbol.description}
                          </p>
                        )}
                        {symbol.count !== undefined && (
                              <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full mt-1">
                                {symbol.count} items
                              </span>
                            )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Groups Tab */}
            {activeTab === 'groups' && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Target Groups
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectAll('groups')}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => handleSelectNone('groups')}
                      className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Select None
                    </button>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search groups..."
                    value={groupsSearchTerm}
                    onChange={(e) => setGroupsSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                  {groupsSearchTerm && (
                    <button
                      onClick={() => setGroupsSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Count */}
                {groupsSearchTerm && (
                  <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                    Found {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''}
                  </div>
                )}
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredGroups.map(group => (
                    <div key={group.id} className={`flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                      selectedGroups.includes(group.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}>
                      <input
                        type="checkbox"
                        id={group.id}
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => handleGroupToggle(group.id)}
                        className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={group.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                          {group.label}
                        </label>
                        {group.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {group.description}
                          </p>
                        )}
                        {group.count && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full mt-1">
                            {group.count} items
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (selectedSettings.length === 0 || (selectedSymbols.length === 0 && selectedGroups.length === 0))}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transferring...</span>
                </>
              ) : (
                <>
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Transfer Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferSettingsPopup 