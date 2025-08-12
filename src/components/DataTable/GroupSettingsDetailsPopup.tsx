import React, { useState, useEffect } from 'react'
import { X, Settings, TrendingUp, Users2, Star, ChevronDown, ChevronUp, User } from 'lucide-react'

interface GroupSettingsDetailsPopupProps {
  group: any
  isOpen: boolean
  onClose: () => void
}

interface LeverageTier {
  id: number
  name: string
  accountBalance: {
    min: number
    max: number | null
    symbol: string
  }
  leverage: string
  marginCall: string
  exposureLevel: number
  maxLeverage: string
}

const GroupSettingsDetailsPopup: React.FC<GroupSettingsDetailsPopupProps> = ({
  group,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  
  // Tag management state
  const [showTagSelectionPopup, setShowTagSelectionPopup] = useState(false)
  const [assignedTags, setAssignedTags] = useState<string[]>(['Premium', 'Trading', 'Advanced'])
  const [availableTags] = useState([
    'Default Dtrader Tag',
    '17_Feb',
    'Premium User',
    'VIP Member',
    'New User',
    'Active Trader',
    'Bot User',
    'Manual Trader',
    'High Volume',
    'Low Risk',
    'Aggressive',
    'Conservative',
    'Premium',
    'Trading',
    'Advanced'
  ])

  // Leverage tiers state
  const [leverageTiers, setLeverageTiers] = useState<LeverageTier[]>([
    {
      id: 1,
      name: 'Basic',
      accountBalance: { min: 0, max: 10000, symbol: '∞' },
      leverage: '1:100',
      marginCall: '150%',
      exposureLevel: 5000,
      maxLeverage: '1:100'
    },
    {
      id: 2,
      name: 'Standard',
      accountBalance: { min: 10001, max: 50000, symbol: '≤' },
      leverage: '1:200',
      marginCall: '125%',
      exposureLevel: 25000,
      maxLeverage: '1:200'
    },
    {
      id: 3,
      name: 'Premium',
      accountBalance: { min: 50001, max: null, symbol: '≤' },
      leverage: '1:500',
      marginCall: '100%',
      exposureLevel: 100000,
      maxLeverage: '1:500'
    }
  ])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Tag management functions
  const handleAddTag = (tag: string) => {
    if (!assignedTags.includes(tag)) {
      setAssignedTags(prev => [...prev, tag])
    }
  }

  const handleRemoveTag = (tag: string) => {
    setAssignedTags(prev => prev.filter(t => t !== tag))
  }

  const handleRemoveAssignedTag = (tag: string) => {
    setAssignedTags(prev => prev.filter(t => t !== tag))
  }

  // Leverage tiers management functions
  const addLeverageTier = () => {
    const newId = Math.max(...leverageTiers.map(tier => tier.id)) + 1
    const newTier = {
      id: newId,
      name: `Tier ${newId}`,
      accountBalance: { min: 0, max: null, symbol: '≤' },
      leverage: '1:100',
      marginCall: '150%',
      exposureLevel: 10000,
      maxLeverage: '1:100'
    }
    setLeverageTiers(prev => {
      const updated = [...prev, newTier]
      // Update symbols to ensure first tier has ∞ and others have ≤
      return updated.map((tier, index) => ({
        ...tier,
        accountBalance: {
          ...tier.accountBalance,
          symbol: index === 0 ? '∞' : '≤'
        }
      }))
    })
  }

  const updateTierSymbols = () => {
    setLeverageTiers(prev => prev.map((tier, index) => ({
      ...tier,
      accountBalance: {
        ...tier.accountBalance,
        symbol: index === 0 ? '∞' : '≤'
      }
    })))
  }

  // Ensure tier symbols are correct on mount
  useEffect(() => {
    updateTierSymbols()
  }, [])

  // Mock data for user groups
  const [userGroups] = useState([
    {
      id: 1,
      groupName: 'Premium Trading Group',
      symbolName: 'EUR/USD',
      action: 'Active'
    },
    {
      id: 2,
      groupName: 'VIP Trading Group',
      symbolName: 'GBP/USD',
      action: 'Active'
    },
    {
      id: 3,
      groupName: 'Standard Trading Group',
      symbolName: 'USD/JPY',
      action: 'Inactive'
    },
    {
      id: 4,
      groupName: 'Professional Traders',
      symbolName: 'AUD/USD',
      action: 'Active'
    },
    {
      id: 5,
      groupName: 'Beginner Traders',
      symbolName: 'USD/CAD',
      action: 'Active'
    }
  ])

  const removeLeverageTier = (tierId: number) => {
    setLeverageTiers(prev => {
      const filtered = prev.filter(tier => tier.id !== tierId)
      // Update symbols after removal
      return filtered.map((tier, index) => ({
        ...tier,
        accountBalance: {
          ...tier.accountBalance,
          symbol: index === 0 ? '∞' : '≤'
        }
      }))
    })
  }

  const updateLeverageTier = (tierId: number, field: string, value: any) => {
    setLeverageTiers(prev => prev.map(tier => 
      tier.id === tierId 
        ? { ...tier, [field]: value }
        : tier
    ))
  }

  const updateLeverageTierAccountBalance = (tierId: number, field: 'min' | 'max', value: number | null) => {
    setLeverageTiers(prev => prev.map(tier => 
      tier.id === tierId 
        ? { 
            ...tier, 
            accountBalance: { 
              ...tier.accountBalance, 
              [field]: value 
            } 
          }
        : tier
    ))
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile Detail',
      icon: User,
      content: (
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Information */}
          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-3 sm:mb-4 flex items-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Profile Information
            </h3>
            <div className="space-y-4">
              {/* First Row: Name, Description, Last Updated */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={group?.name || 'Premium Trading Profile'}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder="Enter profile name"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="This is a premium trading profile designed for experienced traders with advanced risk management features and competitive commission rates."
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm resize-none"
                    placeholder="Enter profile description"
                  />
                </div>

                {/* Last Updated Field */}
                <div className="space-y-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Last Updated (UTC+0)
                  </label>
                  <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">2024-03-20 14:30:00 UTC+0</div>
                </div>
              </div>

              {/* Assign Tags Field */}
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Assign Tags *
                </label>
                <div className="flex flex-wrap gap-2">
                  {/* Existing Tags */}
                  {assignedTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 text-white text-xs rounded-full flex items-center ${
                        index % 3 === 0 ? 'bg-blue-600' : 
                        index % 3 === 1 ? 'bg-green-600' : 'bg-purple-600'
                      }`}
                    >
                      {tag}
                      <button 
                        onClick={() => handleRemoveAssignedTag(tag)}
                        className="ml-2 text-white hover:text-gray-200 transition-colors"
                      >
                        ×
                      </button>
                  </span>
                  ))}
                </div>
                <button 
                  onClick={() => setShowTagSelectionPopup(true)}
                  className="mt-2 px-3 py-1.5 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                >
                  + Add Tags
                </button>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'leverage',
      label: 'Leverage Profile Tiers',
      icon: TrendingUp,
      content: (
        <div className="space-y-4 sm:space-y-6">
          {/* Leverage Tiers Overview */}
          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Leverage Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Base Leverage
                </label>
                <input
                  type="text"
                  defaultValue="1:100"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Maximum Leverage
                </label>
                <input
                  type="text"
                  defaultValue="1:500"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Leverage Tiers */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-medium text-gray-300">Leverage Tiers</h4>
              <button 
                onClick={addLeverageTier}
                className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors flex items-center gap-1"
              >
                + Add Tier
              </button>
            </div>
            
            {leverageTiers.map((tier, index) => (
              <div key={tier.id} className="bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-white">Tier {tier.id} -</span>
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => updateLeverageTier(tier.id, 'name', e.target.value)}
                      className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Active</span>
                    <button 
                      onClick={() => removeLeverageTier(tier.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Tier"
                    >
                      <X className="w-4 h-4" />
                    </button>
              </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 mb-1">Account Balance</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tier.accountBalance.min}
                        onChange={(e) => updateLeverageTierAccountBalance(tier.id, 'min', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-blue-400 text-sm">{tier.accountBalance.symbol}</span>
                      <input
                        type="number"
                        value={tier.accountBalance.max || ''}
                        onChange={(e) => updateLeverageTierAccountBalance(tier.id, 'max', e.target.value ? parseInt(e.target.value) : null)}
                        placeholder="∞"
                        className="w-20 px-2 py-1.5 bg-gray-600 border border-gray-500 rounded text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 mb-1">Leverage</label>
                    <input
                      type="text"
                      value={tier.leverage}
                      onChange={(e) => updateLeverageTier(tier.id, 'leverage', e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 mb-1">Margin Call</label>
                    <input
                      type="text"
                      value={tier.marginCall}
                      onChange={(e) => updateLeverageTier(tier.id, 'marginCall', e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-xs text-gray-400 mb-1">Exposure Level, USD</label>
                    <input
                      type="number"
                      value={tier.exposureLevel}
                      onChange={(e) => updateLeverageTier(tier.id, 'exposureLevel', parseInt(e.target.value) || 0)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-xs text-gray-400 mb-1">Max Leverage</label>
                    <input
                      type="text"
                      value={tier.maxLeverage}
                      onChange={(e) => updateLeverageTier(tier.id, 'maxLeverage', e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors">
              Update Leverage Settings
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'default',
      label: 'Used As Default Profiles',
      icon: Star,
      content: (
        <div className="space-y-4 sm:space-y-6">
          {/* Default Profile Status */}
          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-3 sm:mb-4 flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Default Profile Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Is Default Profile
                </label>
                <span className="px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-full">Yes</span>
              </div>
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Priority Level
                </label>
                <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">1 (Highest)</div>
              </div>
            </div>
          </div>

          {/* Default Profile Settings */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-medium text-gray-300">Default Profile Settings</h4>
            
            {/* Collapsible Section 1 */}
            <div className="bg-gray-700 rounded-lg">
              <button
                onClick={() => toggleSection('trading-settings')}
                className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-white">Trading Settings</span>
                {expandedSections['trading-settings'] ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>
              {expandedSections['trading-settings'] && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Minimum Lot Size</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">0.01</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Maximum Lot Size</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">100.0</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Stop Loss (pips)</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">50</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Take Profit (pips)</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">100</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Section 2 */}
            <div className="bg-gray-700 rounded-lg">
              <button
                onClick={() => toggleSection('risk-management')}
                className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-white">Risk Management</span>
                {expandedSections['risk-management'] ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>
              {expandedSections['risk-management'] && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Max Daily Loss</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">$5,000</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Max Weekly Loss</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">$25,000</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Max Open Positions</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">10</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Max Position Size</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">$50,000</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Section 3 */}
            <div className="bg-gray-700 rounded-lg">
              <button
                onClick={() => toggleSection('commission-settings')}
                className="w-full p-3 sm:p-4 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-white">Commission Settings</span>
                {expandedSections['commission-settings'] ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>
              {expandedSections['commission-settings'] && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Commission per Lot</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">$7.00</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Swap Long</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">-2.5</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Swap Short</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">-1.8</div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-400 mb-1">Minimum Commission</label>
                      <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">$3.50</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-600">
            <button className="px-4 py-2 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-gray-700 transition-colors">
              Remove as Default
            </button>
            <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors">
              Update Default Settings
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'user-in-group',
      label: 'User in Group',
      icon: Users2,
      content: (
        <div className="space-y-4 sm:space-y-6">
          {/* User Groups Overview */}
          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
            <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-3 sm:mb-4 flex items-center">
              <Users2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              User Groups Management
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Total User Groups
                </label>
                <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-lg sm:text-xl font-bold">{userGroups.length}</div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Active Groups
                </label>
                <div className="bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-green-400 text-lg sm:text-xl font-bold">
                  {userGroups.filter(group => group.action === 'Active').length}
                </div>
              </div>
            </div>
          </div>

          {/* User Groups Table */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-medium text-gray-300">User Groups</h4>
            
            {/* Table */}
            <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 border border-gray-700 rounded-lg">
              <table className="w-full min-w-[1000px] sm:min-w-[1200px] text-xs">
                <thead className="bg-gray-700 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-1 sm:px-2 py-2 sm:py-3 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600 first:border-l border-gray-600">
                      Group Name
                    </th>
                    <th className="px-1 sm:px-2 py-2 sm:py-3 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600">
                      Symbol Name
                    </th>
                    <th className="px-1 sm:px-2 py-2 sm:py-3 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {userGroups.map((userGroup) => (
                    <tr key={userGroup.id} className="hover:bg-gray-600 transition-colors">
                      <td className="px-1 sm:px-2 py-1 text-white border-r border-gray-600">
                        {userGroup.groupName}
                      </td>
                      <td className="px-1 sm:px-2 py-1 text-white border-r border-gray-600">
                        {userGroup.symbolName}
                      </td>
                      <td className="px-1 sm:px-2 py-1 border-r border-gray-600">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          userGroup.action === 'Active' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-red-600 text-white'
                        }`}>
                          {userGroup.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      )
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {group?.name || 'Group Profile'} | Group Settings
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm truncate">Manage leverage tiers, group usage, and default profile settings</p>
            </div>
          </div>
          
          {/* Action Buttons - Stack on mobile, horizontal on larger screens */}
          <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
            <button
              onClick={onClose}
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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{tab.label}</span>
                <span className="hidden sm:inline lg:hidden">{tab.label.split(' ')[0]}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* Tag Selection Popup */}
      {showTagSelectionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Select Tags</h3>
              <button
                onClick={() => setShowTagSelectionPopup(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Available Tags with Checkboxes */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-300">Available Tags</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleAddTag(tag)
                        } else {
                          handleRemoveTag(tag)
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-white">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-600">
              <div className="flex space-x-2">
                <button
                  onClick={() => setAssignedTags(availableTags)}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => setAssignedTags([])}
                  className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <button
                onClick={() => setShowTagSelectionPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupSettingsDetailsPopup 