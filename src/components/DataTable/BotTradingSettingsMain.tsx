import React, { useState, useMemo, useEffect } from 'react'
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
import { AddBotSettingPopup, BotSettingDetailsPopup } from './BotTradingSettings'

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

const BotTradingSettings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddBotSetting, setShowAddBotSetting] = useState(false)
  const [showBotSettingDetails, setShowBotSettingDetails] = useState(false)
  const [selectedBotSetting, setSelectedBotSetting] = useState<BotSetting | null>(null)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [botSettingToDelete, setBotSettingToDelete] = useState<BotSetting | null>(null)
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    type: true,
    riskLevel: true,
    status: true,
    maxDrawdown: true,
    targetReturn: true,
    totalUsers: true,
    successRate: true,
    totalProfit: true,
    actions: true
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
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
  const mockBotSettings: BotSetting[] = [
    {
      id: '1',
      name: 'Conservative Bot',
      description: 'Low-risk trading bot with conservative parameters',
      type: 'conservative',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 5,
      targetReturn: 15,
      maxPositions: 3,
      stopLoss: 3,
      takeProfit: 10,
      leverage: 1,
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 10:30:00',
      totalUsers: 45,
      successRate: 85,
      totalProfit: 12500.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
      strategies: ['Trend Following', 'Mean Reversion']
    },
    {
      id: '2',
      name: 'Aggressive Bot',
      description: 'High-risk, high-reward trading bot',
      type: 'aggressive',
      status: 'active',
      riskLevel: 'high',
      maxDrawdown: 25,
      targetReturn: 50,
      maxPositions: 8,
      stopLoss: 8,
      takeProfit: 25,
      leverage: 3,
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 09:15:00',
      totalUsers: 28,
      successRate: 65,
      totalProfit: 45000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
      strategies: ['Momentum Trading', 'Breakout Trading']
    },
    {
      id: '3',
      name: 'Balanced Bot',
      description: 'Moderate risk and return trading bot',
      type: 'balanced',
      status: 'testing',
      riskLevel: 'medium',
      maxDrawdown: 15,
      targetReturn: 30,
      maxPositions: 5,
      stopLoss: 5,
      takeProfit: 18,
      leverage: 2,
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 08:45:00',
      totalUsers: 15,
      successRate: 75,
      totalProfit: 8500.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD'],
      strategies: ['Grid Trading', 'Arbitrage']
    },
    {
      id: '4',
      name: 'High Frequency Bot',
      description: 'Ultra-fast trading bot for scalping strategies',
      type: 'high-frequency',
      status: 'active',
      riskLevel: 'extreme',
      maxDrawdown: 35,
      targetReturn: 80,
      maxPositions: 12,
      stopLoss: 12,
      takeProfit: 35,
      leverage: 5,
      createdAt: '2024-12-19 07:20:00',
      updatedAt: '2024-12-19 07:20:00',
      totalUsers: 8,
      successRate: 55,
      totalProfit: 75000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'GBP/USD'],
      strategies: ['Scalping', 'High Frequency', 'Market Making']
    },
    {
      id: '5',
      name: 'Manual Trading Bot',
      description: 'Semi-automated bot with manual intervention',
      type: 'manual',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 12,
      targetReturn: 25,
      maxPositions: 4,
      stopLoss: 4,
      takeProfit: 15,
      leverage: 1.5,
      createdAt: '2024-12-19 06:15:00',
      updatedAt: '2024-12-19 06:15:00',
      totalUsers: 32,
      successRate: 78,
      totalProfit: 18500.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
      strategies: ['Manual Trading', 'Swing Trading', 'Position Trading']
    },
    {
      id: '6',
      name: 'Ultra Aggressive Bot',
      description: 'Maximum risk for maximum returns',
      type: 'ultra-aggressive',
      status: 'draft',
      riskLevel: 'extreme',
      maxDrawdown: 50,
      targetReturn: 120,
      maxPositions: 15,
      stopLoss: 20,
      takeProfit: 60,
      leverage: 10,
      createdAt: '2024-12-19 05:30:00',
      updatedAt: '2024-12-19 05:30:00',
      totalUsers: 3,
      successRate: 40,
      totalProfit: 120000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'XRP/USDT', 'ADA/USDT'],
      strategies: ['Leverage Trading', 'Futures Trading', 'Options Trading']
    },
    {
      id: '7',
      name: 'Moderate Bot',
      description: 'Balanced approach with moderate risk',
      type: 'moderate',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 18,
      targetReturn: 35,
      maxPositions: 6,
      stopLoss: 6,
      takeProfit: 22,
      leverage: 2,
      createdAt: '2024-12-19 04:45:00',
      updatedAt: '2024-12-19 04:45:00',
      totalUsers: 67,
      successRate: 82,
      totalProfit: 32000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'NZD/USD'],
      strategies: ['Trend Following', 'Mean Reversion', 'Breakout Trading']
    },
    {
      id: '8',
      name: 'Crypto Focus Bot',
      description: 'Specialized in cryptocurrency trading',
      type: 'aggressive',
      status: 'active',
      riskLevel: 'high',
      maxDrawdown: 30,
      targetReturn: 70,
      maxPositions: 10,
      stopLoss: 10,
      takeProfit: 40,
      leverage: 4,
      createdAt: '2024-12-19 03:20:00',
      updatedAt: '2024-12-19 03:20:00',
      totalUsers: 42,
      successRate: 68,
      totalProfit: 68000.00,
      currency: 'USDT',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT', 'DOT/USDT'],
      strategies: ['Crypto Trading', 'Altcoin Trading', 'DeFi Trading']
    },
    {
      id: '9',
      name: 'Forex Specialist Bot',
      description: 'Expert in foreign exchange markets',
      type: 'conservative',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 8,
      targetReturn: 20,
      maxPositions: 4,
      stopLoss: 3,
      takeProfit: 12,
      leverage: 1.2,
      createdAt: '2024-12-19 02:15:00',
      updatedAt: '2024-12-19 02:15:00',
      totalUsers: 89,
      successRate: 88,
      totalProfit: 45000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'NZD/USD', 'USD/CAD'],
      strategies: ['Forex Trading', 'Carry Trade', 'News Trading']
    },
    {
      id: '10',
      name: 'Stock Trading Bot',
      description: 'Equity market trading bot',
      type: 'balanced',
      status: 'testing',
      riskLevel: 'medium',
      maxDrawdown: 20,
      targetReturn: 40,
      maxPositions: 7,
      stopLoss: 7,
      takeProfit: 25,
      leverage: 2.5,
      createdAt: '2024-12-19 01:30:00',
      updatedAt: '2024-12-19 01:30:00',
      totalUsers: 23,
      successRate: 72,
      totalProfit: 28000.00,
      currency: 'USD',
      tradingHours: '9:30-16:00',
      markets: ['AAPL/USD', 'GOOGL/USD', 'TSLA/USD', 'MSFT/USD', 'AMZN/USD'],
      strategies: ['Stock Trading', 'Dividend Trading', 'Sector Rotation']
    },
    {
      id: '11',
      name: 'Commodity Bot',
      description: 'Trading in commodity markets',
      type: 'moderate',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 22,
      targetReturn: 45,
      maxPositions: 5,
      stopLoss: 8,
      takeProfit: 28,
      leverage: 3,
      createdAt: '2024-12-18 23:45:00',
      updatedAt: '2024-12-18 23:45:00',
      totalUsers: 18,
      successRate: 70,
      totalProfit: 22000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['GOLD/USD', 'SILVER/USD', 'OIL/USD', 'COPPER/USD', 'NATURAL_GAS/USD'],
      strategies: ['Commodity Trading', 'Hedging', 'Seasonal Trading']
    },
    {
      id: '12',
      name: 'Index Trading Bot',
      description: 'Trading major market indices',
      type: 'conservative',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 10,
      targetReturn: 25,
      maxPositions: 3,
      stopLoss: 4,
      takeProfit: 15,
      leverage: 1.5,
      createdAt: '2024-12-18 22:20:00',
      updatedAt: '2024-12-18 22:20:00',
      totalUsers: 56,
      successRate: 85,
      totalProfit: 38000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['SPX/USD', 'NAS/USD', 'DJI/USD', 'RUT/USD', 'VIX/USD'],
      strategies: ['Index Trading', 'ETF Trading', 'Volatility Trading']
    },
    {
      id: '13',
      name: 'Arbitrage Bot',
      description: 'Profit from price differences across markets',
      type: 'high-frequency',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 5,
      targetReturn: 15,
      maxPositions: 20,
      stopLoss: 2,
      takeProfit: 8,
      leverage: 1,
      createdAt: '2024-12-18 21:15:00',
      updatedAt: '2024-12-18 21:15:00',
      totalUsers: 12,
      successRate: 92,
      totalProfit: 15000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'GBP/USD', 'USD/JPY'],
      strategies: ['Arbitrage', 'Market Making', 'Statistical Arbitrage']
    },
    {
      id: '14',
      name: 'Momentum Bot',
      description: 'Follow market momentum trends',
      type: 'aggressive',
      status: 'active',
      riskLevel: 'high',
      maxDrawdown: 28,
      targetReturn: 65,
      maxPositions: 8,
      stopLoss: 9,
      takeProfit: 35,
      leverage: 3.5,
      createdAt: '2024-12-18 20:00:00',
      updatedAt: '2024-12-18 20:00:00',
      totalUsers: 34,
      successRate: 62,
      totalProfit: 52000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'GBP/USD', 'AAPL/USD'],
      strategies: ['Momentum Trading', 'Trend Following', 'Breakout Trading']
    },
    {
      id: '15',
      name: 'Mean Reversion Bot',
      description: 'Trade against market extremes',
      type: 'balanced',
      status: 'testing',
      riskLevel: 'medium',
      maxDrawdown: 16,
      targetReturn: 30,
      maxPositions: 6,
      stopLoss: 6,
      takeProfit: 18,
      leverage: 2,
      createdAt: '2024-12-18 18:45:00',
      updatedAt: '2024-12-18 18:45:00',
      totalUsers: 19,
      successRate: 74,
      totalProfit: 16500.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GOLD/USD', 'OIL/USD'],
      strategies: ['Mean Reversion', 'Contrarian Trading', 'Range Trading']
    },
    {
      id: '16',
      name: 'Grid Trading Bot',
      description: 'Automated grid trading strategy',
      type: 'moderate',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 14,
      targetReturn: 28,
      maxPositions: 12,
      stopLoss: 5,
      takeProfit: 16,
      leverage: 1.8,
      createdAt: '2024-12-18 17:30:00',
      updatedAt: '2024-12-18 17:30:00',
      totalUsers: 41,
      successRate: 79,
      totalProfit: 24000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'GBP/USD'],
      strategies: ['Grid Trading', 'Martingale', 'DCA Strategy']
    },
    {
      id: '17',
      name: 'News Trading Bot',
      description: 'Trade based on economic news events',
      type: 'high-risk',
      status: 'draft',
      riskLevel: 'extreme',
      maxDrawdown: 40,
      targetReturn: 90,
      maxPositions: 10,
      stopLoss: 15,
      takeProfit: 50,
      leverage: 6,
      createdAt: '2024-12-18 16:15:00',
      updatedAt: '2024-12-18 16:15:00',
      totalUsers: 7,
      successRate: 48,
      totalProfit: 85000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GOLD/USD', 'OIL/USD'],
      strategies: ['News Trading', 'Event Trading', 'Volatility Trading']
    },
    {
      id: '18',
      name: 'Scalping Bot',
      description: 'Quick in-and-out trading for small profits',
      type: 'high-frequency',
      status: 'active',
      riskLevel: 'high',
      maxDrawdown: 20,
      targetReturn: 40,
      maxPositions: 15,
      stopLoss: 3,
      takeProfit: 6,
      leverage: 4,
      createdAt: '2024-12-18 15:00:00',
      updatedAt: '2024-12-18 15:00:00',
      totalUsers: 25,
      successRate: 58,
      totalProfit: 35000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USDT', 'ETH/USDT'],
      strategies: ['Scalping', 'High Frequency', 'Market Making']
    },
    {
      id: '19',
      name: 'Swing Trading Bot',
      description: 'Medium-term position holding strategy',
      type: 'balanced',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 18,
      targetReturn: 35,
      maxPositions: 4,
      stopLoss: 7,
      takeProfit: 22,
      leverage: 2.2,
      createdAt: '2024-12-18 13:45:00',
      updatedAt: '2024-12-18 13:45:00',
      totalUsers: 38,
      successRate: 76,
      totalProfit: 28000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GOLD/USD', 'AAPL/USD'],
      strategies: ['Swing Trading', 'Position Trading', 'Trend Following']
    },
    {
      id: '20',
      name: 'Hedging Bot',
      description: 'Risk management through hedging strategies',
      type: 'conservative',
      status: 'active',
      riskLevel: 'low',
      maxDrawdown: 6,
      targetReturn: 18,
      maxPositions: 8,
      stopLoss: 2,
      takeProfit: 10,
      leverage: 1.1,
      createdAt: '2024-12-18 12:30:00',
      updatedAt: '2024-12-18 12:30:00',
      totalUsers: 73,
      successRate: 89,
      totalProfit: 32000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GOLD/USD', 'OIL/USD'],
      strategies: ['Hedging', 'Risk Management', 'Portfolio Protection']
    },
    {
      id: '21',
      name: 'Contrarian Bot',
      description: 'Go against market sentiment',
      type: 'high-risk',
      status: 'testing',
      riskLevel: 'extreme',
      maxDrawdown: 45,
      targetReturn: 100,
      maxPositions: 6,
      stopLoss: 18,
      takeProfit: 55,
      leverage: 7,
      createdAt: '2024-12-18 11:15:00',
      updatedAt: '2024-12-18 11:15:00',
      totalUsers: 5,
      successRate: 35,
      totalProfit: 95000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'GBP/USD', 'GOLD/USD'],
      strategies: ['Contrarian Trading', 'Value Investing', 'Bottom Fishing']
    },
    {
      id: '22',
      name: 'Seasonal Bot',
      description: 'Trade based on seasonal patterns',
      type: 'moderate',
      status: 'active',
      riskLevel: 'medium',
      maxDrawdown: 19,
      targetReturn: 38,
      maxPositions: 5,
      stopLoss: 6,
      takeProfit: 24,
      leverage: 2.3,
      createdAt: '2024-12-18 10:00:00',
      updatedAt: '2024-12-18 10:00:00',
      totalUsers: 29,
      successRate: 71,
      totalProfit: 19500.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['GOLD/USD', 'OIL/USD', 'NATURAL_GAS/USD', 'CORN/USD', 'WHEAT/USD'],
      strategies: ['Seasonal Trading', 'Commodity Trading', 'Pattern Recognition']
    },
    {
      id: '23',
      name: 'Volatility Bot',
      description: 'Profit from market volatility',
      type: 'aggressive',
      status: 'active',
      riskLevel: 'high',
      maxDrawdown: 32,
      targetReturn: 75,
      maxPositions: 9,
      stopLoss: 11,
      takeProfit: 42,
      leverage: 4.5,
      createdAt: '2024-12-18 08:45:00',
      updatedAt: '2024-12-18 08:45:00',
      totalUsers: 16,
      successRate: 61,
      totalProfit: 58000.00,
      currency: 'USD',
      tradingHours: '24/7',
      markets: ['VIX/USD', 'EUR/USD', 'GBP/USD', 'BTC/USDT', 'ETH/USDT'],
      strategies: ['Volatility Trading', 'Options Trading', 'VIX Trading']
    }
  ]

  // Filtered bot settings based on search and filters
  const filteredBotSettings = useMemo(() => {
    return mockBotSettings.filter(setting => {
      const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           setting.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || setting.status === statusFilter
      const matchesType = typeFilter === 'all' || setting.type === typeFilter
      const matchesRisk = riskFilter === 'all' || setting.riskLevel === riskFilter
      
      return matchesSearch && matchesStatus && matchesType && matchesRisk
    })
  }, [mockBotSettings, searchTerm, statusFilter, typeFilter, riskFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredBotSettings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBotSettings = filteredBotSettings.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, typeFilter, riskFilter])

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
  }

  // Calculate stats
  const stats = useMemo(() => {
    const totalSettings = mockBotSettings.length
    const activeSettings = mockBotSettings.filter(s => s.status === 'active').length
    const totalUsers = mockBotSettings.reduce((sum, s) => sum + s.totalUsers, 0)
    const totalProfit = mockBotSettings.reduce((sum, s) => sum + s.totalProfit, 0)
    const avgSuccessRate = mockBotSettings.reduce((sum, s) => sum + s.successRate, 0) / mockBotSettings.length
    
    return {
      totalSettings,
      activeSettings,
      totalUsers,
      totalProfit,
      avgSuccessRate: Math.round(avgSuccessRate)
    }
  }, [mockBotSettings])

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

  const handleViewBotSetting = (setting: BotSetting) => {
    setSelectedBotSetting(setting)
    setShowBotSettingDetails(true)
  }

  const handleEditBotSetting = (setting: BotSetting) => {
    console.log('Editing bot setting:', setting)
    setNotification({
      show: true,
      message: 'Bot setting updated successfully!',
      type: 'success'
    })
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
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

  const handleAddBotSetting = (settingData: Omit<BotSetting, 'id' | 'createdAt' | 'updatedAt' | 'totalUsers' | 'successRate' | 'totalProfit'>) => {
    console.log('Creating new bot setting:', settingData)
    showNotification('Bot setting created successfully!', 'success')
    setShowAddBotSetting(false)
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

  const handleDeleteBotSetting = (setting: BotSetting) => {
    setBotSettingToDelete(setting)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    showNotification('Bot setting deleted successfully!', 'success')
    setShowDeleteConfirm(false)
    setBotSettingToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setBotSettingToDelete(null)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Settings</p>
              <p className="text-2xl font-bold text-white">{stats.totalSettings}</p>
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
              <p className="text-2xl font-bold text-white">{stats.activeSettings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Percent className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Avg Success</p>
              <p className="text-2xl font-bold text-white">{stats.avgSuccessRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Profit</p>
              <p className="text-2xl font-bold text-white">${stats.totalProfit.toLocaleString()}</p>
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
              title="Export Bot Settings - Download bot setting data as CSV/Excel"
              onClick={() => console.log('Export Bot Settings clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Bot Settings
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Bot Settings - Upload bot setting data from CSV/Excel files"
              onClick={() => console.log('Import Bot Settings clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Bot Settings
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Add New Bot Setting - Create a new bot trading configuration"
              onClick={() => setShowAddBotSetting(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Add New Bot Setting
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Bot Analytics - View performance metrics and reports"
              onClick={() => console.log('Bot Analytics clicked')}
            >
              <TrendingUp className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Bot Analytics
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
                placeholder="Search bot settings..."
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
                  <option value="draft">Draft</option>
                  <option value="testing">Testing</option>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Risk Level</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                    setRiskFilter('all')
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

      {/* Bot Settings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.name && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>Name</th>
                )}
                {columnVisibility.type && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Type</th>
                )}
                {columnVisibility.riskLevel && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Risk Level</th>
                )}
                {columnVisibility.status && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                )}
                {columnVisibility.maxDrawdown && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Max Drawdown</th>
                )}
                {columnVisibility.targetReturn && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Target Return</th>
                )}
                {columnVisibility.totalUsers && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Users</th>
                )}
                {columnVisibility.successRate && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Success Rate</th>
                )}
                {columnVisibility.totalProfit && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Total Profit</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentBotSettings.map((setting, index) => (
                <tr
                  key={setting.id}
                  onClick={() => handleViewBotSetting(setting)}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.name && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{setting.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{setting.description}</div>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.type && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(setting.type)}
                        <span className="capitalize text-gray-900 dark:text-white">{setting.type.replace('-', ' ')}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.riskLevel && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelClass(setting.riskLevel)}`}>
                        {setting.riskLevel.charAt(0).toUpperCase() + setting.riskLevel.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.status && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(setting.status)}`}>
                        {setting.status.charAt(0).toUpperCase() + setting.status.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.maxDrawdown && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.maxDrawdown}%</div>
                    </td>
                  )}
                  
                  {columnVisibility.targetReturn && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.targetReturn}%</div>
                    </td>
                  )}
                  
                  {columnVisibility.totalUsers && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.totalUsers}</div>
                    </td>
                  )}
                  
                  {columnVisibility.successRate && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.successRate}%</div>
                    </td>
                  )}
                  
                  {columnVisibility.totalProfit && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">${setting.totalProfit.toLocaleString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('Manage tags for:', setting.name)}
                          className="p-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded transition-colors"
                          title="Manage Tags"
                        >
                          <Tag className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteBotSetting(setting)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Setting"
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
              <div className="flex items-center space-x-4">
                <span className="results-info">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{Math.min(endIndex, filteredBotSettings.length)}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{filteredBotSettings.length}</span> bot settings
                </span>
                
                {/* Items per page selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
                </div>
              </div>
            </div>
            
            <div className="table-footer-right">
              <div className="flex items-center space-x-3">
                {/* Page information */}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                
                {/* Pagination controls */}
                <div className="flex items-center space-x-1">
                  {/* First page button */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="First Page"
                  >
                    «
                  </button>
                  
                  {/* Previous page button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Previous Page"
                  >
                    ‹
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  {/* Next page button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Next Page"
                  >
                    ›
                  </button>
                  
                  {/* Last page button */}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Last Page"
                  >
                    »
                  </button>
                </div>
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
        title="Bot Setting Columns"
        description="Show or hide bot setting table columns"
      />

      {/* Add Bot Setting Popup */}
      <AddBotSettingPopup
        isOpen={showAddBotSetting}
        onClose={() => setShowAddBotSetting(false)}
        onSave={(newSetting: Omit<BotSetting, 'id' | 'createdAt' | 'updatedAt' | 'totalUsers' | 'successRate' | 'totalProfit'>) => {
          // Handle saving the new bot setting
          console.log('New bot setting:', newSetting)
          setNotification({
            show: true,
            message: 'Bot setting created successfully!',
            type: 'success'
          })
          setShowAddBotSetting(false)
        }}
      />

      {/* Bot Setting Details Popup */}
      {selectedBotSetting && (
        <BotSettingDetailsPopup
          setting={selectedBotSetting}
          onClose={() => {
            setShowBotSettingDetails(false)
            setSelectedBotSetting(null)
          }}
          onEdit={(updatedSetting) => {
            // Handle editing the bot setting
            console.log('Updated bot setting:', updatedSetting)
            setNotification({
              show: true,
              message: 'Bot setting updated successfully!',
              type: 'success'
            })
            setShowBotSettingDetails(false)
            setSelectedBotSetting(null)
          }}
        />
      )}

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

export default BotTradingSettings 