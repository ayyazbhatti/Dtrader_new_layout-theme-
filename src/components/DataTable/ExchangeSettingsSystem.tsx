import React, { useState, useMemo } from 'react'
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
  Globe,
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
  Building,
  MapPin,
  Phone,
  Mail,
  Banknote,
  Wallet,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Coins,
  Network,
  Server,
  Database,
  Key,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Zap as ZapIcon,
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  Settings as SettingsIcon,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Play,
  Pause,
  Power,
  PowerOff
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'

interface ExchangeData {
  id: string
  name: string
  code: string
  type: 'spot' | 'futures' | 'options' | 'margin' | 'hybrid'
  status: 'active' | 'inactive' | 'maintenance' | 'testing' | 'suspended'
  region: string
  country: string
  timezone: string
  tradingHours: string
  baseCurrency: string
  quoteCurrencies: string[]
  tradingPairs: number
  totalVolume24h: number
  totalTrades24h: number
  activeUsers: number
  feeStructure: {
    maker: number
    taker: number
    withdrawal: number
    deposit: number
  }
  limits: {
    minOrderSize: number
    maxOrderSize: number
    minPriceIncrement: number
    maxLeverage: number
  }
  security: {
    kycRequired: boolean
    twoFactorAuth: boolean
    coldStorage: boolean
    insurance: boolean
  }
  apiEndpoints: string[]
  websocketUrl: string
  createdAt: string
  updatedAt: string
  lastSync: string
  performance: {
    uptime: number
    latency: number
    errorRate: number
  }
}

interface ExchangeDetailsPopupProps {
  exchange: ExchangeData
  onClose: () => void
  onEdit: (exchange: ExchangeData) => void
}

interface AddExchangePopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (exchange: Omit<ExchangeData, 'id' | 'createdAt' | 'updatedAt' | 'lastSync' | 'performance'>) => void
}

const AddExchangePopup: React.FC<AddExchangePopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
          type: 'spot' as ExchangeData['type'],
      status: 'active' as ExchangeData['status'],
    region: '',
    country: '',
    timezone: 'UTC',
    tradingHours: '24/7',
    baseCurrency: 'USD',
    quoteCurrencies: [] as string[],
    tradingPairs: 0,
    totalVolume24h: 0,
    totalTrades24h: 0,
    activeUsers: 0,
    feeStructure: {
      maker: 0.1,
      taker: 0.2,
      withdrawal: 0.5,
      deposit: 0
    },
    limits: {
      minOrderSize: 10,
      maxOrderSize: 1000000,
      minPriceIncrement: 0.01,
      maxLeverage: 100
    },
    security: {
      kycRequired: true,
      twoFactorAuth: true,
      coldStorage: true,
      insurance: false
    },
    apiEndpoints: [] as string[],
    websocketUrl: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
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
      newErrors.name = 'Exchange name is required'
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Exchange code is required'
    }

    if (!formData.region.trim()) {
      newErrors.region = 'Region is required'
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    if (formData.feeStructure.maker < 0) {
      newErrors.maker = 'Maker fee cannot be negative'
    }

    if (formData.feeStructure.taker < 0) {
      newErrors.taker = 'Taker fee cannot be negative'
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
      code: '',
      type: 'spot',
      status: 'active',
      region: '',
      country: '',
      timezone: 'UTC',
      tradingHours: '24/7',
      baseCurrency: 'USD',
      quoteCurrencies: [],
      tradingPairs: 0,
      totalVolume24h: 0,
      totalTrades24h: 0,
      activeUsers: 0,
      feeStructure: {
        maker: 0.1,
        taker: 0.2,
        withdrawal: 0.5,
        deposit: 0
      },
      limits: {
        minOrderSize: 10,
        maxOrderSize: 1000000,
        minPriceIncrement: 0.01,
        maxLeverage: 100
      },
      security: {
        kycRequired: true,
        twoFactorAuth: true,
        coldStorage: true,
        insurance: false
      },
      apiEndpoints: [],
      websocketUrl: ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Exchange</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new exchange configuration</p>
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
                              <Building className="w-5 h-5 text-blue-500" />
                Exchange Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exchange Name <span className="text-red-500">*</span>
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
                  placeholder="Enter exchange name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exchange Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.code
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter exchange code"
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Exchange Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as ExchangeData['type'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="spot">Spot Trading</option>
                  <option value="futures">Futures Trading</option>
                  <option value="options">Options Trading</option>
                  <option value="margin">Margin Trading</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as ExchangeData['status'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="testing">Testing</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.region
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter region"
                />
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.region}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.country
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter country"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Trading Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Trading Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Currency
                </label>
                <select
                  value={formData.baseCurrency}
                  onChange={(e) => handleInputChange('baseCurrency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trading Hours
                </label>
                <input
                  type="text"
                  value={formData.tradingHours}
                  onChange={(e) => handleInputChange('tradingHours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="24/7"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                  <option value="JST">JST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trading Pairs
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tradingPairs}
                  onChange={(e) => handleInputChange('tradingPairs', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-purple-500" />
              Fee Structure (%)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maker Fee
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.feeStructure.maker}
                  onChange={(e) => handleInputChange('feeStructure.maker', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.maker
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="0.1"
                />
                {errors.maker && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maker}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Taker Fee
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.feeStructure.taker}
                  onChange={(e) => handleInputChange('feeStructure.taker', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.taker
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="0.2"
                />
                {errors.taker && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.taker}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Withdrawal Fee
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.feeStructure.withdrawal}
                  onChange={(e) => handleInputChange('feeStructure.withdrawal', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deposit Fee
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.feeStructure.deposit}
                  onChange={(e) => handleInputChange('feeStructure.deposit', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Trading Limits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Trading Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Order Size
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.limits.minOrderSize}
                  onChange={(e) => handleInputChange('limits.minOrderSize', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Order Size
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.limits.maxOrderSize}
                  onChange={(e) => handleInputChange('limits.maxOrderSize', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Price Increment
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.limits.minPriceIncrement}
                  onChange={(e) => handleInputChange('limits.minPriceIncrement', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Leverage
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formData.limits.maxLeverage}
                  onChange={(e) => handleInputChange('limits.maxLeverage', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-500" />
              Security Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="kycRequired"
                  checked={formData.security.kycRequired}
                  onChange={(e) => handleInputChange('security.kycRequired', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="kycRequired" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  KYC Required
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={formData.security.twoFactorAuth}
                  onChange={(e) => handleInputChange('security.twoFactorAuth', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="coldStorage"
                  checked={formData.security.coldStorage}
                  onChange={(e) => handleInputChange('security.coldStorage', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="coldStorage" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Cold Storage
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={formData.security.insurance}
                  onChange={(e) => handleInputChange('security.insurance', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="insurance" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Insurance Coverage
                </label>
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
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Exchange
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddExchangePopup 