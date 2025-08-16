import React, { useState, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Plus,
  Settings,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Clock,
  Percent,
  ArrowUp,
  ArrowDown,
  Target,
  Zap,
  Shield,
  Activity
} from 'lucide-react'

interface TradingPosition {
  id: string
  symbol: string
  type: 'buy' | 'sell' | 'long' | 'short'
  volume: number
  openPrice: number
  currentPrice: number
  pnl: number
  pnlPercentage: number
  status: 'open' | 'pending' | 'closed' | 'cancelled'
  openTime: string
  closeTime?: string
  stopLoss?: number
  takeProfit?: number
  leverage: number
  margin: number
  account: string
  trader: string
  strategy?: string
}

const TradingTable: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [positionToDelete, setPositionToDelete] = useState<TradingPosition | null>(null)
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  })

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    symbol: true,
    type: true,
    volume: true,
    openPrice: true,
    currentPrice: true,
    pnl: true,
    pnlPercentage: true,
    status: true,
    openTime: true,
    leverage: true,
    margin: true,
    account: true,
    actions: true
  })

  // Mock data
  const mockPositions: TradingPosition[] = [
    {
      id: '1',
      symbol: 'EUR/USD',
      type: 'buy',
      volume: 1.0,
      openPrice: 1.0850,
      currentPrice: 1.0875,
      pnl: 250.0,
      pnlPercentage: 2.3,
      status: 'open',
      openTime: '2024-01-15T09:30:00Z',
      leverage: 100,
      margin: 1000.0,
      account: 'MT4-12345',
      trader: 'John Doe',
      strategy: 'Trend Following',
      stopLoss: 1.0800,
      takeProfit: 1.0950
    },
    {
      id: '2',
      symbol: 'GBP/JPY',
      type: 'sell',
      volume: 0.5,
      openPrice: 185.50,
      currentPrice: 184.80,
      pnl: 350.0,
      pnlPercentage: 3.8,
      status: 'open',
      openTime: '2024-01-15T10:15:00Z',
      leverage: 200,
      margin: 500.0,
      account: 'MT4-12346',
      trader: 'Jane Smith',
      strategy: 'Mean Reversion'
    },
    {
      id: '3',
      symbol: 'USD/JPY',
      type: 'buy',
      volume: 2.0,
      openPrice: 148.20,
      currentPrice: 147.90,
      pnl: -600.0,
      pnlPercentage: -2.0,
      status: 'open',
      openTime: '2024-01-15T08:45:00Z',
      leverage: 100,
      margin: 2000.0,
      account: 'MT4-12347',
      trader: 'Mike Johnson',
      strategy: 'Breakout Trading'
    },
    {
      id: '4',
      symbol: 'AUD/USD',
      type: 'sell',
      volume: 1.5,
      openPrice: 0.6750,
      currentPrice: 0.6730,
      pnl: 300.0,
      pnlPercentage: 2.9,
      status: 'pending',
      openTime: '2024-01-15T11:00:00Z',
      leverage: 150,
      margin: 1500.0,
      account: 'MT4-12348',
      trader: 'Sarah Wilson',
      strategy: 'Scalping'
    },
    {
      id: '5',
      symbol: 'USD/CAD',
      type: 'buy',
      volume: 0.8,
      openPrice: 1.3450,
      currentPrice: 1.3480,
      pnl: 240.0,
      pnlPercentage: 1.8,
      status: 'open',
      openTime: '2024-01-15T07:30:00Z',
      leverage: 100,
      margin: 800.0,
      account: 'MT4-12349',
      trader: 'David Brown',
      strategy: 'Position Trading'
    }
  ]

  // Computed values
  const filteredPositions = useMemo(() => {
    return mockPositions.filter(position => {
      const matchesSearch = searchTerm === '' || 
        position.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.trader.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.account.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || position.status === statusFilter
      const matchesType = typeFilter === 'all' || position.type === typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  const stats = useMemo(() => {
    const totalPositions = mockPositions.length
    const openPositions = mockPositions.filter(p => p.status === 'open').length
    const totalPnl = mockPositions.reduce((sum, p) => sum + p.pnl, 0)
    const totalVolume = mockPositions.reduce((sum, p) => sum + p.volume, 0)
    
    return {
      totalPositions,
      openPositions,
      totalPnl,
      totalVolume
    }
  }, [])

  // Helper functions
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
      case 'closed':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
    }
  }

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'buy':
      case 'long':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
      case 'sell':
      case 'short':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
    }
  }

  const getPnlClass = (pnl: number) => {
    return pnl >= 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400'
  }

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value)
  }

  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }))
  }

  const handleViewPosition = (position: TradingPosition) => {
    // Handle view position logic
    console.log('Viewing position:', position)
    setNotification({
      show: true,
      message: `Viewing position ${position.symbol}`,
      type: 'info'
    })
  }

  const handleEditPosition = (position: TradingPosition) => {
    // Handle edit position logic
    console.log('Editing position:', position)
    setNotification({
      show: true,
      message: `Editing position ${position.symbol}`,
      type: 'info'
    })
  }

  const handleDeletePosition = (position: TradingPosition) => {
    setPositionToDelete(position)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (positionToDelete) {
      // Handle delete logic here
      console.log('Deleting position:', positionToDelete)
      setNotification({
        show: true,
        message: `Position ${positionToDelete.symbol} deleted successfully`,
        type: 'success'
      })
    }
    setShowDeleteConfirm(false)
    setPositionToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setPositionToDelete(null)
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({
      show: true,
      message,
      type
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Positions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPositions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Positions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.openPositions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total P&L</p>
              <p className={`text-2xl font-bold ${getPnlClass(stats.totalPnl)}`}>
                ${stats.totalPnl.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVolume.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              title="Export Data"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              title="Import Data"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
            
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              title="Add New Position"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              title="Analytics"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </button>
            
            <button
              onClick={() => setShowColumnVisibility(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
              title="Column Visibility"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Columns</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by symbol, trader, or account..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={handleTypeFilterChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy/Long</option>
              <option value="sell">Sell/Short</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}