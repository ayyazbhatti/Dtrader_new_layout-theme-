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
import AddExchangePopup from './ExchangeSettingsSystem'

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

const ExchangeSettingsSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddExchange, setShowAddExchange] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    code: true,
    type: true,
    status: true,
    region: true,
    country: true,
    baseCurrency: true,
    tradingPairs: true,
    totalVolume24h: true,
    activeUsers: true,
    actions: true
  })
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  // Mock data - replace with actual API calls
  const mockExchanges: ExchangeData[] = [
    {
      id: '1',
      name: 'Binance',
      code: 'BINANCE',
      type: 'hybrid',
      status: 'active',
      region: 'Asia',
      country: 'Malta',
      timezone: 'UTC',
      tradingHours: '24/7',
      baseCurrency: 'USDT',
      quoteCurrencies: ['BTC', 'ETH', 'BNB', 'ADA'],
      tradingPairs: 1500,
      totalVolume24h: 25000000000,
      totalTrades24h: 15000000,
      activeUsers: 150000000,
      feeStructure: {
        maker: 0.1,
        taker: 0.1,
        withdrawal: 0.5,
        deposit: 0
      },
      limits: {
        minOrderSize: 10,
        maxOrderSize: 1000000,
        minPriceIncrement: 0.01,
        maxLeverage: 125
      },
      security: {
        kycRequired: true,
        twoFactorAuth: true,
        coldStorage: true,
        insurance: true
      },
      apiEndpoints: ['https://api.binance.com', 'https://api1.binance.com'],
      websocketUrl: 'wss://stream.binance.com:9443',
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 15:45:00',
      lastSync: '2024-12-19 15:45:00',
      performance: {
        uptime: 99.9,
        latency: 45,
        errorRate: 0.01
      }
    },
    {
      id: '2',
      name: 'Coinbase Pro',
      code: 'COINBASE',
      type: 'spot',
      status: 'active',
      region: 'North America',
      country: 'USA',
      timezone: 'UTC',
      tradingHours: '24/7',
      baseCurrency: 'USD',
      quoteCurrencies: ['BTC', 'ETH', 'LTC', 'BCH'],
      tradingPairs: 45,
      totalVolume24h: 8500000000,
      totalTrades24h: 2500000,
      activeUsers: 56000000,
      feeStructure: {
        maker: 0.4,
        taker: 0.6,
        withdrawal: 0.5,
        deposit: 0
      },
      limits: {
        minOrderSize: 1,
        maxOrderSize: 100000,
        minPriceIncrement: 0.01,
        maxLeverage: 1
      },
      security: {
        kycRequired: true,
        twoFactorAuth: true,
        coldStorage: true,
        insurance: true
      },
      apiEndpoints: ['https://api.pro.coinbase.com'],
      websocketUrl: 'wss://ws-feed.pro.coinbase.com',
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 14:20:00',
      lastSync: '2024-12-19 14:20:00',
      performance: {
        uptime: 99.8,
        latency: 65,
        errorRate: 0.02
      }
    },
    {
      id: '3',
      name: 'Kraken',
      code: 'KRAKEN',
      type: 'hybrid',
      status: 'active',
      region: 'Europe',
      country: 'USA',
      timezone: 'UTC',
      tradingHours: '24/7',
      baseCurrency: 'USD',
      quoteCurrencies: ['BTC', 'ETH', 'XRP', 'LTC'],
      tradingPairs: 120,
      totalVolume24h: 3200000000,
      totalTrades24h: 1800000,
      activeUsers: 8000000,
      feeStructure: {
        maker: 0.16,
        taker: 0.26,
        withdrawal: 0.5,
        deposit: 0
      },
      limits: {
        minOrderSize: 1,
        maxOrderSize: 500000,
        minPriceIncrement: 0.01,
        maxLeverage: 5
      },
      security: {
        kycRequired: true,
        twoFactorAuth: true,
        coldStorage: true,
        insurance: false
      },
      apiEndpoints: ['https://api.kraken.com'],
      websocketUrl: 'wss://ws.kraken.com',
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 13:30:00',
      lastSync: '2024-12-19 13:30:00',
      performance: {
        uptime: 99.7,
        latency: 75,
        errorRate: 0.03
      }
    }
  ]

  // Filtered exchanges based on search and filters
  const filteredExchanges = useMemo(() => {
    return mockExchanges.filter(exchange => {
      const matchesSearch = exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exchange.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exchange.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || exchange.status === statusFilter
      const matchesType = typeFilter === 'all' || exchange.type === typeFilter
      const matchesRegion = regionFilter === 'all' || exchange.region === regionFilter
      
      return matchesSearch && matchesStatus && matchesType && matchesRegion
    })
  }, [mockExchanges, searchTerm, statusFilter, typeFilter, regionFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const totalExchanges = mockExchanges.length
    const activeExchanges = mockExchanges.filter(e => e.status === 'active').length
    const totalTradingPairs = mockExchanges.reduce((sum, e) => sum + e.tradingPairs, 0)
    const totalVolume24h = mockExchanges.reduce((sum, e) => sum + e.totalVolume24h, 0)
    const totalUsers = mockExchanges.reduce((sum, e) => sum + e.activeUsers, 0)
    const avgUptime = mockExchanges.reduce((sum, e) => sum + e.performance.uptime, 0) / mockExchanges.length
    
    return {
      totalExchanges,
      activeExchanges,
      totalTradingPairs,
      totalVolume24h,
      totalUsers,
      avgUptime: Math.round(avgUptime * 10) / 10
    }
  }, [mockExchanges])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'testing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'suspended': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spot': return <Coins className="w-4 h-4 text-blue-500" />
      case 'futures': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'options': return <Target className="w-4 h-4 text-purple-500" />
      case 'margin': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'hybrid': return <Network className="w-4 h-4 text-indigo-500" />
      default: return <Building className="w-4 h-4 text-gray-500" />
    }
  }

  const getPerformanceClass = (uptime: number) => {
    if (uptime >= 99.9) return 'text-green-600 dark:text-green-400'
    if (uptime >= 99.5) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      show: true,
      message,
      type
    })
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleAddExchange = (exchangeData: Omit<ExchangeData, 'id' | 'createdAt' | 'updatedAt' | 'lastSync' | 'performance'>) => {
    console.log('Creating new exchange:', exchangeData)
    showNotification('Exchange created successfully!', 'success')
    setShowAddExchange(false)
  }

  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }))
  }

  const toggleColumnVisibility = () => {
    setShowColumnVisibility(!showColumnVisibility)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Exchanges</p>
              <p className="text-2xl font-bold text-white">{stats.totalExchanges}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active</p>
              <p className="text-2xl font-bold text-white">{stats.activeExchanges}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Trading Pairs</p>
              <p className="text-2xl font-bold text-white">{stats.totalTradingPairs.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">24h Volume</p>
              <p className="text-2xl font-bold text-white">${(stats.totalVolume24h / 1000000000).toFixed(1)}B</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{(stats.totalUsers / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Avg Uptime</p>
              <p className="text-2xl font-bold text-white">{stats.avgUptime}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Export Exchanges - Download exchange data as CSV/Excel"
              onClick={() => console.log('Export Exchanges clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Exchanges
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Exchanges - Upload exchange data from CSV/Excel files"
              onClick={() => console.log('Import Exchanges clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Exchanges
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Add New Exchange - Create a new exchange configuration"
              onClick={() => setShowAddExchange(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Add New Exchange
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Exchange Analytics - View performance metrics and reports"
              onClick={() => console.log('Exchange Analytics clicked')}
            >
              <TrendingUp className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Exchange Analytics
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Column Visibility - Show/hide table columns"
              onClick={toggleColumnVisibility}
            >
              <Eye className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Column Visibility
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exchanges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="testing">Testing</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="spot">Spot Trading</option>
                  <option value="futures">Futures Trading</option>
                  <option value="options">Options Trading</option>
                  <option value="margin">Margin Trading</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Regions</option>
                  <option value="Asia">Asia</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                    setRegionFilter('all')
                  }}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exchanges Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.name && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Name</th>
                )}
                {columnVisibility.code && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Code</th>
                )}
                {columnVisibility.type && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Type</th>
                )}
                {columnVisibility.status && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                )}
                {columnVisibility.region && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Region</th>
                )}
                {columnVisibility.country && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Country</th>
                )}
                {columnVisibility.baseCurrency && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Base Currency</th>
                )}
                {columnVisibility.tradingPairs && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Trading Pairs</th>
                )}
                {columnVisibility.totalVolume24h && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>24h Volume</th>
                )}
                {columnVisibility.activeUsers && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Active Users</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredExchanges.map((exchange, index) => (
                <tr
                  key={exchange.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.name && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="text-gray-900 dark:text-white font-medium">{exchange.name}</div>
                    </td>
                  )}
                  
                  {columnVisibility.code && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="font-mono text-gray-900 dark:text-white">{exchange.code}</div>
                    </td>
                  )}
                  
                  {columnVisibility.type && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(exchange.type)}
                        <span className="capitalize text-gray-900 dark:text-white">{exchange.type}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.status && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(exchange.status)}`}>
                        {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.region && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{exchange.region}</div>
                    </td>
                  )}
                  
                  {columnVisibility.country && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{exchange.country}</div>
                    </td>
                  )}
                  
                  {columnVisibility.baseCurrency && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white font-medium">{exchange.baseCurrency}</div>
                    </td>
                  )}
                  
                  {columnVisibility.tradingPairs && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{exchange.tradingPairs.toLocaleString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.totalVolume24h && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">${(exchange.totalVolume24h / 1000000000).toFixed(2)}B</div>
                    </td>
                  )}
                  
                  {columnVisibility.activeUsers && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{(exchange.activeUsers / 1000000).toFixed(1)}M</div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('View exchange:', exchange.id)}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Edit exchange:', exchange.id)}
                          className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded transition-colors"
                          title="Edit Exchange"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Delete exchange:', exchange.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Exchange"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredExchanges.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{mockExchanges.length}</span> exchanges
              </span>
            </div>
            <div className="table-footer-right">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Page 1 of 1</span>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      <ModernColumnVisibilityPopup
        isOpen={showColumnVisibility}
        onClose={() => setShowColumnVisibility(false)}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        title="Exchange Columns"
        description="Show or hide exchange table columns"
      />

      {/* Add Exchange Popup */}
      <AddExchangePopup
        isOpen={showAddExchange}
        onClose={() => setShowAddExchange(false)}
        onSave={handleAddExchange}
      />

      {/* Beautiful Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' 
              : notification.type === 'error'
              ? 'bg-red-500 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'info' && <Info className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExchangeSettingsSystem 