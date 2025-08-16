import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Settings, 
  TrendingUp,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  Bot,
  DollarSign,
  Activity,
  Target,
  Percent,
  Clock,
  Calendar,
  FileText,
  Zap,
  Shield,
  Brain,
  Gauge,
  Target as TargetIcon,
  BarChart3,
  Users,
  Tag
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'

interface BotSetting {
  id: string
  name: string
  description: string
  type: 'conservative' | 'aggressive' | 'moderate' | 'manual' | 'high-risk' | 'balanced' | 'ultra-aggressive' | 'high-frequency'
  status: 'active' | 'inactive' | 'draft' | 'testing'
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  maxDrawdown: number
  targetReturn: number
  maxPositions: number
  stopLoss: number
  takeProfit: number
  leverage: number
  createdAt: string
  updatedAt: string
  totalUsers: number
  successRate: number
  totalProfit: number
  currency: string
  tradingHours: string
  markets: string[]
  strategies: string[]
}

interface BotSettingDetailsPopupProps {
  setting: BotSetting
  onClose: () => void
  onEdit: (setting: BotSetting) => void
}

interface AddBotSettingPopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (setting: Omit<BotSetting, 'id' | 'createdAt' | 'updatedAt' | 'totalUsers' | 'successRate' | 'totalProfit'>) => void
}

// Mock symbols data for selection
const mockSymbols = [
  'BTC/USDT', 'ETH/USDT', 'AAPL/USD', 'GOOGL/USD', 'EUR/USD', 'GBP/USD', 
  'GOLD/USD', 'OIL/USD', 'SPX/USD', 'NAS/USD', 'TSLA/USD', 'MSFT/USD',
  'AMZN/USD', 'META/USD', 'NFLX/USD', 'NVDA/USD', 'AMD/USD', 'INTC/USD'
]

// Mock tags for selection
const mockTags = [
  'Trend Following', 'Mean Reversion', 'Scalping', 'Swing Trading', 'Day Trading',
  'High Frequency', 'Arbitrage', 'Momentum', 'Breakout', 'Contrarian',
  'Conservative', 'Aggressive', 'Balanced', 'Risk Management', 'Automated'
]

const AddBotSettingPopup: React.FC<AddBotSettingPopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'conservative' as BotSetting['type'],
    status: 'active' as BotSetting['status'],
    riskLevel: 'low' as BotSetting['riskLevel'],
    maxDrawdown: 10,
    targetReturn: 20,
    maxPositions: 5,
    stopLoss: 5,
    takeProfit: 15,
    leverage: 1,
    currency: 'USD',
    tradingHours: '24/7',
    markets: [] as string[],
    strategies: [] as string[],
    symbols: [] as string[],
    tags: [] as string[],
    expectedMonthlyProfit: 15
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [symbolsSearchTerm, setSymbolsSearchTerm] = useState('')
  const [tagsSearchTerm, setTagsSearchTerm] = useState('')
  const [showSymbolsDropdown, setShowSymbolsDropdown] = useState(false)
  const [showTagsDropdown, setShowTagsDropdown] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bot setting name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.symbols.length === 0) {
      newErrors.symbols = 'At least one symbol must be selected'
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag must be assigned'
    }

    if (formData.expectedMonthlyProfit <= 0 || formData.expectedMonthlyProfit > 100) {
      newErrors.expectedMonthlyProfit = 'Expected monthly profit must be between 0 and 100'
    }

    if (formData.maxDrawdown <= 0 || formData.maxDrawdown > 100) {
      newErrors.maxDrawdown = 'Max drawdown must be between 0 and 100'
    }

    if (formData.targetReturn <= 0) {
      newErrors.targetReturn = 'Target return must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      type: 'conservative',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 10,
      targetReturn: 20,
      maxPositions: 5,
      stopLoss: 5,
      takeProfit: 15,
      leverage: 1,
      currency: 'USD',
      tradingHours: '24/7',
      markets: [],
      strategies: [],
      symbols: [],
      tags: [],
      expectedMonthlyProfit: 15
    })
    setErrors({})
    setSymbolsSearchTerm('')
    setTagsSearchTerm('')
    setShowSymbolsDropdown(false)
    setShowTagsDropdown(false)
    onClose()
  }

  const handleSymbolToggle = (symbol: string) => {
    setFormData(prev => ({
      ...prev,
      symbols: prev.symbols.includes(symbol)
        ? prev.symbols.filter(s => s !== symbol)
        : [...prev.symbols, symbol]
    }))
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const filteredSymbols = mockSymbols.filter(symbol =>
    symbol.toLowerCase().includes(symbolsSearchTerm.toLowerCase())
  )

  const filteredTags = mockTags.filter(tag =>
    tag.toLowerCase().includes(tagsSearchTerm.toLowerCase())
  )

  // Click outside to close dropdowns
  const symbolsDropdownRef = useRef<HTMLDivElement>(null)
  const tagsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (symbolsDropdownRef.current && !symbolsDropdownRef.current.contains(event.target as Node)) {
        setShowSymbolsDropdown(false)
      }
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target as Node)) {
        setShowTagsDropdown(false)
      }
    }

    // Close dropdowns when clicking outside
    document.addEventListener('mousedown', handleClickOutside)
    
    // Close dropdowns when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSymbolsDropdown(false)
        setShowTagsDropdown(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Bot Setting</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new bot trading configuration</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-500" />
              Bot Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bot Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.name
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter bot setting name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Monthly Profit (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.expectedMonthlyProfit}
                  onChange={(e) => handleInputChange('expectedMonthlyProfit', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.expectedMonthlyProfit
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="15"
                />
                {errors.expectedMonthlyProfit && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.expectedMonthlyProfit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as BotSetting['type'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="high-risk">High Risk</option>
                  <option value="ultra-aggressive">Ultra Aggressive</option>
                  <option value="high-frequency">High Frequency</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Level
                </label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => handleInputChange('riskLevel', e.target.value as BotSetting['riskLevel'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as BotSetting['status'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="testing">Testing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Symbols Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Select Symbols <span className="text-red-500">*</span>
            </h3>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.symbols.map((symbol) => (
                  <span
                    key={symbol}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    {symbol}
                    <button
                      type="button"
                      onClick={() => handleSymbolToggle(symbol)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="relative" ref={symbolsDropdownRef}>
                <input
                  type="text"
                  placeholder="Search and select symbols..."
                  value={symbolsSearchTerm}
                  onChange={(e) => setSymbolsSearchTerm(e.target.value)}
                  onFocus={() => setShowSymbolsDropdown(true)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.symbols
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                />
                {errors.symbols && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.symbols}</p>
                )}
                
                {showSymbolsDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {filteredSymbols.map((symbol) => (
                      <button
                        key={symbol}
                        type="button"
                        onClick={() => handleSymbolToggle(symbol)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                          formData.symbols.includes(symbol)
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{symbol}</span>
                          {formData.symbols.includes(symbol) && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags Assignment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-500" />
              Assign Tags <span className="text-red-500">*</span>
            </h3>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="relative" ref={tagsDropdownRef}>
                <input
                  type="text"
                  placeholder="Search and select tags..."
                  value={tagsSearchTerm}
                  onChange={(e) => setTagsSearchTerm(e.target.value)}
                  onFocus={() => setShowTagsDropdown(true)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.tags
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags}</p>
                )}
                
                {showTagsDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{tag}</span>
                          {formData.tags.includes(tag) && (
                            <Check className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Risk Parameters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Risk Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Drawdown (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.maxDrawdown}
                  onChange={(e) => handleInputChange('maxDrawdown', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.maxDrawdown
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="10"
                />
                {errors.maxDrawdown && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxDrawdown}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Return (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.targetReturn}
                  onChange={(e) => handleInputChange('targetReturn', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.targetReturn
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="20"
                />
                {errors.targetReturn && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.targetReturn}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stop Loss (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.stopLoss}
                  onChange={(e) => handleInputChange('stopLoss', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Take Profit (%)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.takeProfit}
                  onChange={(e) => handleInputChange('takeProfit', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="15"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                errors.description
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
              placeholder="Enter bot setting description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
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
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Bot Setting
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const BotSettingDetailsPopup: React.FC<BotSettingDetailsPopupProps> = ({
  setting,
  onClose,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState('detail')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<BotSetting>(() => ({ ...setting }))
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when setting prop changes
  React.useEffect(() => {
    setFormData({ ...setting })
    setErrors({})
  }, [setting])

  const handleInputChange = (field: keyof BotSetting, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bot setting name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.maxDrawdown <= 0 || formData.maxDrawdown > 100) {
      newErrors.maxDrawdown = 'Max drawdown must be between 0 and 100'
    }

    if (formData.targetReturn <= 0) {
      newErrors.targetReturn = 'Target return must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onEdit({
        ...formData,
        updatedAt: new Date().toISOString()
      })
      setIsEditing(false)
      setErrors({})
    }
  }

  const handleCancel = () => {
    setFormData({ ...setting })
    setIsEditing(false)
    setErrors({})
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'testing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getRiskLevelClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'extreme': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conservative': return <Shield className="w-4 h-4 text-green-500" />
      case 'moderate': return <Target className="w-4 h-4 text-blue-500" />
      case 'balanced': return <BarChart3 className="w-4 h-4 text-purple-500" />
      case 'aggressive': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'high-risk': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'ultra-aggressive': return <Zap className="w-4 h-4 text-red-500" />
      case 'high-frequency': return <Activity className="w-4 h-4 text-indigo-500" />
      case 'manual': return <Brain className="w-4 h-4 text-gray-500" />
      default: return <Bot className="w-4 h-4 text-gray-500" />
    }
  }

  const tabs = [
    {
      id: 'detail',
      label: 'Details',
      icon: <Bot className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              Bot Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white font-medium">{formData.name}</div>
                )}
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Type</label>
                {isEditing ? (
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as BotSetting['type'])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="balanced">Balanced</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="high-risk">High Risk</option>
                    <option value="ultra-aggressive">Ultra Aggressive</option>
                    <option value="high-frequency">High Frequency</option>
                    <option value="manual">Manual</option>
                  </select>
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-2">
                    {getTypeIcon(formData.type)}
                    <span className="capitalize">{formData.type.replace('-', ' ')}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Risk Level</label>
                {isEditing ? (
                  <select
                    value={formData.riskLevel}
                    onChange={(e) => handleInputChange('riskLevel', e.target.value as BotSetting['riskLevel'])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="extreme">Extreme</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getRiskLevelClass(formData.riskLevel)}`}>
                    {formData.riskLevel.charAt(0).toUpperCase() + formData.riskLevel.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as BotSetting['status'])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                    <option value="testing">Testing</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusClass(formData.status)}`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Max Drawdown</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.maxDrawdown}
                    onChange={(e) => handleInputChange('maxDrawdown', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.maxDrawdown ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-1">
                    <Percent className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{formData.maxDrawdown}%</span>
                  </div>
                )}
                {errors.maxDrawdown && (
                  <p className="text-sm text-red-400">{errors.maxDrawdown}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Target Return</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.targetReturn}
                    onChange={(e) => handleInputChange('targetReturn', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.targetReturn ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-1">
                    <Percent className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{formData.targetReturn}%</span>
                  </div>
                )}
                {errors.targetReturn && (
                  <p className="text-sm text-red-400">{errors.targetReturn}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              Description
            </h3>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Enter bot setting description"
              />
            ) : (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300">{formData.description}</p>
              </div>
            )}
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-white">{formData.totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Percent className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-white">{formData.successRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Profit</p>
                    <p className="text-2xl font-bold text-white">${formData.totalProfit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-600 rounded-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Created</p>
                    <p className="text-2xl font-bold text-white">{new Date(formData.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{formData.name}</h2>
              <p className="text-sm text-gray-400">{formData.type.replace('-', ' ')} Bot Setting</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
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
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  )
}

export { AddBotSettingPopup, BotSettingDetailsPopup } 