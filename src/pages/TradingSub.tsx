import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Activity, 
  PieChart, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  AlertTriangle, 
  Settings, 
  Eye, 
  Edit, 
  X, 
  CheckCircle, 
  Clock 
} from 'lucide-react'
import '../components/DataTable/TransactionsSystem.css'
import UserDetailsPopup from '../components/DataTable/UserDetailsPopup'

const TradingSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()
  
  // Column visibility state
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    type: true,
    accountId: true,
    accountName: true,
    positionId: true,
    symbol: true,
    direction: true,
    quantity: true,
    takeProfit: true,
    stopLoss: true,
    marginUsed: true,
    unrealizedPnL: true,
    openTime: true,
    deviceInfo: true,
    actions: true
  })


  
  // Position detail/edit popup state
  const [showPositionPopup, setShowPositionPopup] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  
  // Close position popup state
  const [showClosePositionPopup, setShowClosePositionPopup] = useState(false)
  const [positionToClose, setPositionToClose] = useState<any>(null)
  const [closeForm, setCloseForm] = useState({
    closeReason: '',
    closeType: 'market', // market, limit, stop
    closePrice: 0,
    closeQuantity: 0,
    comment: ''
  })
  
  // User detail popup state
  const [showUserDetailPopup, setShowUserDetailPopup] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  
  // Position edit form state
  const [editForm, setEditForm] = useState({
    takeProfit: 0,
    stopLoss: 0,
    quantity: 0,
    strategy: '',
    riskLevel: '',
    tags: [] as string[]
  })
  
  // Handle row click to show position details
  const handleRowClick = (position: any) => {
    setSelectedPosition(position)
    setEditForm({
      takeProfit: position.takeProfit,
      stopLoss: position.stopLoss,
      quantity: position.quantity,
      strategy: position.strategy,
      riskLevel: position.riskLevel,
      tags: [...position.tags]
    })
    setShowPositionPopup(true)
    setEditMode(false)
  }
  
  // Handle close position button click
  const handleClosePositionClick = (position: any, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent row click
    setPositionToClose(position)
    setCloseForm({
      closeReason: '',
      closeType: 'market',
      closePrice: position.currentPrice,
      closeQuantity: position.quantity,
      comment: ''
    })
    setShowClosePositionPopup(true)
  }
  
  // Handle close position confirmation
  const handleClosePosition = () => {
    if (positionToClose) {
      // In a real app, this would call an API to close the position
      console.log('Closing position:', positionToClose.id, 'with options:', closeForm)
      
      // Close popup and reset
      setShowClosePositionPopup(false)
      setPositionToClose(null)
      setCloseForm({
        closeReason: '',
        closeType: 'market',
        closePrice: 0,
        closeQuantity: 0,
        comment: ''
      })
    }
  }
  
  // Handle Account ID click to show user details
  const handleAccountIdClick = (user: any, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent row click
    setSelectedUser({
      accountId: user.accountId,
      accountName: user.accountName,
      // Add more user data as needed
      type: user.type,
      symbol: user.symbol,
      positionId: user.positionId,
      openTime: user.openTime,
      entryPrice: user.entryPrice,
      currentPrice: user.currentPrice,
      quantity: user.quantity,
      direction: user.direction,
      marginUsed: user.marginUsed,
      unrealizedPnL: user.unrealizedPnL,
      leverage: user.leverage,
      strategy: user.strategy,
      riskLevel: user.riskLevel,
      marketSession: user.marketSession
    })
    setShowUserDetailPopup(true)
  }
  
  // Handle save changes
  const handleSaveChanges = () => {
    if (selectedPosition) {
      // Update the position data (in a real app, this would call an API)
      const updatedPosition = {
        ...selectedPosition,
        ...editForm
      }
      
      // Update the local state
      const updatedTrades = activeTrades.map(trade => 
        trade.id === updatedPosition.id ? updatedPosition : trade
      )
      
      // In a real app, you would update the state here
      console.log('Position updated:', updatedPosition)
      
      // Close popup and reset
      setShowPositionPopup(false)
      setSelectedPosition(null)
      setEditMode(false)
    }
  }
  
  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('showColumnVisibility changed to:', showColumnVisibility)
  }, [showColumnVisibility])

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      'pending-orders': 'Pending Orders',
      'pending-order': 'Pending Order',
      'done-orders': 'Done Orders',
      'done-order': 'Done Order',
      'open-position': 'Open Positions',
      'closed-position': 'Closed Positions',
      'deal-history': 'Deal History',
      'deals': 'Deals',
      'active': 'Active Trades',
      'history': 'Trading History',
    }
    return titles[subPage || ''] || 'Trading'
  }

  // Mock data for active trades
  const activeTrades = [
    {
      id: 'AT-001',
      type: 'manual',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      positionId: 'POS-001',
      openTime: '2024-12-19 10:30:00',
      deviceInfo: 'Web Platform',
      symbol: 'EUR/USD',
      quantity: 1.0,
      direction: 'BUY',
      takeProfit: 1.0950,
      stopLoss: 1.0800,
      marginUsed: 1000,
      unrealizedPnL: 25.0,
      currentPrice: 1.0825,
      entryPrice: 1.0800,
      swap: -1.20,
      commission: -8.00,
      duration: '2h 15m',
      strategy: 'Trend Following',
      marketSession: 'London',
      riskLevel: 'Medium',
      leverage: 100,
      maxDrawdown: -15.0,
      peakValue: 35.0,
      tags: ['trend', 'forex', 'profitable']
    },
    {
      id: 'AT-002',
      type: 'bot',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      positionId: 'POS-002',
      openTime: '2024-12-19 09:15:00',
      deviceInfo: 'Mobile App',
      symbol: 'GBP/USD',
      quantity: 0.5,
      direction: 'SELL',
      takeProfit: 1.2550,
      stopLoss: 1.2700,
      marginUsed: 500,
      unrealizedPnL: 12.5,
      currentPrice: 1.2675,
      entryPrice: 1.2700,
      swap: -0.60,
      commission: -4.00,
      duration: '3h 30m',
      strategy: 'Mean Reversion',
      marketSession: 'New York',
      riskLevel: 'Low',
      leverage: 50,
      maxDrawdown: -8.0,
      peakValue: 18.0,
      tags: ['reversal', 'forex', 'profitable']
    },
    {
      id: 'AT-003',
      type: 'manual',
      accountId: 'MT4-11111',
      accountName: 'Mike Johnson',
      positionId: 'POS-003',
      openTime: '2024-12-19 08:45:00',
      deviceInfo: 'Desktop App',
      symbol: 'USD/JPY',
      quantity: 2.0,
      direction: 'BUY',
      takeProfit: 149.50,
      stopLoss: 147.50,
      marginUsed: 2000,
      unrealizedPnL: -50.0,
      currentPrice: 147.80,
      entryPrice: 148.30,
      swap: -2.40,
      commission: -16.00,
      duration: '4h 45m',
      strategy: 'Breakout',
      marketSession: 'Tokyo',
      riskLevel: 'High',
      leverage: 200,
      maxDrawdown: -75.0,
      peakValue: 25.0,
      tags: ['breakout', 'forex', 'loss']
    },
    {
      id: 'AT-004',
      type: 'bot',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      positionId: 'POS-004',
      openTime: '2024-12-19 07:20:00',
      deviceInfo: 'Web Platform',
      symbol: 'XAU/USD',
      quantity: 0.3,
      direction: 'BUY',
      takeProfit: 2080.00,
      stopLoss: 2040.00,
      marginUsed: 1500,
      unrealizedPnL: 45.0,
      currentPrice: 2065.00,
      entryPrice: 2050.00,
      swap: -0.90,
      commission: -6.00,
      duration: '5h 10m',
      strategy: 'Safe Haven',
      marketSession: 'London',
      riskLevel: 'Medium',
      leverage: 100,
      maxDrawdown: -20.0,
      peakValue: 55.0,
      tags: ['gold', 'safe-haven', 'profitable']
    },
    {
      id: 'AT-005',
      type: 'manual',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      positionId: 'POS-005',
      openTime: '2024-12-19 06:30:00',
      deviceInfo: 'Mobile App',
      symbol: 'EUR/GBP',
      quantity: 1.5,
      direction: 'SELL',
      takeProfit: 0.8600,
      stopLoss: 0.8700,
      marginUsed: 800,
      unrealizedPnL: -8.5,
      currentPrice: 0.8685,
      entryPrice: 0.8670,
      swap: -1.20,
      commission: -5.00,
      duration: '6h 30m',
      strategy: 'Range Trading',
      marketSession: 'London',
      riskLevel: 'Low',
      leverage: 50,
      maxDrawdown: -12.0,
      peakValue: 15.0,
      tags: ['range', 'forex', 'loss']
    },
    {
      id: 'AT-006',
      type: 'bot',
      accountId: 'MT4-22222',
      accountName: 'Sarah Wilson',
      positionId: 'POS-006',
      openTime: '2024-12-19 05:45:00',
      deviceInfo: 'Desktop App',
      symbol: 'USD/CHF',
      quantity: 0.8,
      direction: 'BUY',
      takeProfit: 0.8900,
      stopLoss: 0.8750,
      marginUsed: 1200,
      unrealizedPnL: 18.0,
      currentPrice: 0.8870,
      entryPrice: 0.8850,
      swap: -0.80,
      commission: -4.00,
      duration: '7h 15m',
      strategy: 'Momentum',
      marketSession: 'Zurich',
      riskLevel: 'Medium',
      leverage: 100,
      maxDrawdown: -10.0,
      peakValue: 25.0,
      tags: ['momentum', 'forex', 'profitable']
    },
    {
      id: 'AT-007',
      type: 'manual',
      accountId: 'MT4-33333',
      accountName: 'David Brown',
      positionId: 'POS-007',
      openTime: '2024-12-19 04:20:00',
      deviceInfo: 'Web Platform',
      symbol: 'AUD/USD',
      quantity: 2.2,
      direction: 'SELL',
      takeProfit: 0.6500,
      stopLoss: 0.6650,
      marginUsed: 1800,
      unrealizedPnL: -32.0,
      currentPrice: 0.6620,
      entryPrice: 0.6590,
      swap: -2.20,
      commission: -11.00,
      duration: '8h 40m',
      strategy: 'Carry Trade',
      marketSession: 'Sydney',
      riskLevel: 'High',
      leverage: 150,
      maxDrawdown: -45.0,
      peakValue: 20.0,
      tags: ['carry', 'forex', 'loss']
    },
    {
      id: 'AT-008',
      type: 'bot',
      accountId: 'MT4-44444',
      accountName: 'Lisa Chen',
      positionId: 'POS-008',
      openTime: '2024-12-19 03:15:00',
      deviceInfo: 'Mobile App',
      symbol: 'NZD/USD',
      quantity: 0.6,
      direction: 'BUY',
      takeProfit: 0.6200,
      stopLoss: 0.6050,
      marginUsed: 900,
      unrealizedPnL: 28.5,
      currentPrice: 0.6185,
      entryPrice: 0.6150,
      swap: -0.60,
      commission: -3.00,
      duration: '9h 45m',
      strategy: 'Scalping',
      marketSession: 'Wellington',
      riskLevel: 'Low',
      leverage: 75,
      maxDrawdown: -8.0,
      peakValue: 35.0,
      tags: ['scalping', 'forex', 'profitable']
    },
    {
      id: 'AT-009',
      type: 'manual',
      accountId: 'MT4-55555',
      accountName: 'Robert Taylor',
      positionId: 'POS-009',
      openTime: '2024-12-19 02:00:00',
      deviceInfo: 'Desktop App',
      symbol: 'CAD/USD',
      quantity: 1.8,
      direction: 'SELL',
      takeProfit: 0.7300,
      stopLoss: 0.7450,
      marginUsed: 1600,
      unrealizedPnL: 42.0,
      currentPrice: 0.7320,
      entryPrice: 0.7380,
      swap: -1.80,
      commission: -9.00,
      duration: '10h 30m',
      strategy: 'News Trading',
      marketSession: 'Toronto',
      riskLevel: 'Medium',
      leverage: 100,
      maxDrawdown: -15.0,
      peakValue: 50.0,
      tags: ['news', 'forex', 'profitable']
    },
    {
      id: 'AT-010',
      type: 'bot',
      accountId: 'MT4-66666',
      accountName: 'Emma Davis',
      positionId: 'POS-010',
      openTime: '2024-12-19 01:30:00',
      deviceInfo: 'Web Platform',
      symbol: 'XAG/USD',
      quantity: 0.4,
      direction: 'BUY',
      takeProfit: 24.50,
      stopLoss: 23.50,
      marginUsed: 1100,
      unrealizedPnL: -15.0,
      currentPrice: 23.80,
      entryPrice: 24.20,
      swap: -0.40,
      commission: -2.00,
      duration: '11h 20m',
      strategy: 'Commodity',
      marketSession: 'London',
      riskLevel: 'Medium',
      leverage: 80,
      maxDrawdown: -25.0,
      peakValue: 10.0,
      tags: ['silver', 'commodity', 'loss']
    },
    {
      id: 'AT-011',
      type: 'manual',
      accountId: 'MT4-77777',
      accountName: 'James Wilson',
      positionId: 'POS-011',
      openTime: '2024-12-19 00:45:00',
      deviceInfo: 'Mobile App',
      symbol: 'EUR/JPY',
      quantity: 1.2,
      direction: 'BUY',
      takeProfit: 165.50,
      stopLoss: 163.50,
      marginUsed: 1400,
      unrealizedPnL: 65.0,
      currentPrice: 165.20,
      entryPrice: 164.50,
      swap: -1.20,
      commission: -7.00,
      duration: '12h 15m',
      strategy: 'Trend Following',
      marketSession: 'Tokyo',
      riskLevel: 'High',
      leverage: 120,
      maxDrawdown: -20.0,
      peakValue: 75.0,
      tags: ['trend', 'forex', 'profitable']
    },
    {
      id: 'AT-012',
      type: 'bot',
      accountId: 'MT4-88888',
      accountName: 'Maria Garcia',
      positionId: 'POS-012',
      openTime: '2024-12-18 23:20:00',
      deviceInfo: 'Desktop App',
      symbol: 'GBP/JPY',
      quantity: 0.9,
      direction: 'SELL',
      takeProfit: 185.00,
      stopLoss: 187.00,
      marginUsed: 1300,
      unrealizedPnL: -22.5,
      currentPrice: 186.50,
      entryPrice: 186.20,
      swap: -0.90,
      commission: -5.00,
      duration: '13h 40m',
      strategy: 'Mean Reversion',
      marketSession: 'London',
      riskLevel: 'Medium',
      leverage: 90,
      maxDrawdown: -30.0,
      peakValue: 15.0,
      tags: ['reversal', 'forex', 'loss']
    },
    {
      id: 'AT-013',
      type: 'manual',
      accountId: 'MT4-99999',
      accountName: 'Alex Thompson',
      positionId: 'POS-013',
      openTime: '2024-12-18 22:15:00',
      deviceInfo: 'Web Platform',
      symbol: 'USD/CAD',
      quantity: 2.5,
      direction: 'BUY',
      takeProfit: 1.3700,
      stopLoss: 1.3550,
      marginUsed: 2200,
      unrealizedPnL: 88.0,
      currentPrice: 1.3680,
      entryPrice: 1.3600,
      swap: -2.50,
      commission: -12.00,
      duration: '14h 25m',
      strategy: 'Breakout',
      marketSession: 'New York',
      riskLevel: 'High',
      leverage: 150,
      maxDrawdown: -25.0,
      peakValue: 95.0,
      tags: ['breakout', 'forex', 'profitable']
    },
    {
      id: 'AT-014',
      type: 'bot',
      accountId: 'MT4-00000',
      accountName: 'Sophie Martin',
      positionId: 'POS-014',
      openTime: '2024-12-18 21:00:00',
      deviceInfo: 'Mobile App',
      symbol: 'AUD/JPY',
      quantity: 0.7,
      direction: 'SELL',
      takeProfit: 95.50,
      stopLoss: 97.00,
      marginUsed: 1000,
      unrealizedPnL: 35.5,
      currentPrice: 95.80,
      entryPrice: 96.50,
      swap: -0.70,
      commission: -4.00,
      duration: '15h 50m',
      strategy: 'Scalping',
      marketSession: 'Sydney',
      riskLevel: 'Low',
      leverage: 70,
      maxDrawdown: -12.0,
      peakValue: 40.0,
      tags: ['scalping', 'forex', 'profitable']
    },
    {
      id: 'AT-015',
      type: 'manual',
      accountId: 'MT4-11111',
      accountName: 'Mike Johnson',
      positionId: 'POS-015',
      openTime: '2024-12-18 20:30:00',
      deviceInfo: 'Desktop App',
      symbol: 'EUR/CHF',
      quantity: 1.1,
      direction: 'BUY',
      takeProfit: 0.9800,
      stopLoss: 0.9650,
      marginUsed: 1200,
      unrealizedPnL: -18.0,
      currentPrice: 0.9670,
      entryPrice: 0.9690,
      swap: -1.10,
      commission: -6.00,
      duration: '16h 35m',
      strategy: 'Range Trading',
      marketSession: 'Zurich',
      riskLevel: 'Medium',
      leverage: 85,
      maxDrawdown: -28.0,
      peakValue: 12.0,
      tags: ['range', 'forex', 'loss']
    }
  ]

  // Pagination state and logic
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  
  // Calculate pagination values
  const totalPositions = activeTrades.length
  const totalPages = Math.ceil(totalPositions / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalPositions)
  const currentPageData = activeTrades.slice(startIndex, endIndex)
  
  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Mock data for pending orders
  const pendingOrders = [
    {
      id: 'PO-001',
      symbol: 'EUR/USD',
      type: 'BUY',
      volume: 0.5,
      price: 1.0800,
      time: '2024-12-19 11:00:00',
      status: 'Pending',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      orderType: 'Limit',
      expiry: '2024-12-20 11:00:00',
      comment: 'Trend continuation',
      strategy: 'Breakout',
      riskLevel: 'Medium',
      leverage: 100,
      marginRequired: 500,
      tags: ['forex', 'trend', 'limit-order']
    },
    {
      id: 'PO-002',
      symbol: 'GBP/USD',
      type: 'SELL',
      volume: 1.0,
      price: 1.2700,
      time: '2024-12-19 10:45:00',
      status: 'Pending',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      orderType: 'Stop',
      expiry: '2024-12-20 10:45:00',
      comment: 'Resistance level',
      strategy: 'Mean Reversion',
      riskLevel: 'Low',
      leverage: 50,
      marginRequired: 800,
      tags: ['forex', 'reversal', 'stop-order']
    },
    {
      id: 'PO-003',
      symbol: 'USD/JPY',
      type: 'BUY',
      volume: 2.0,
      price: 148.50,
      time: '2024-12-19 09:30:00',
      status: 'Pending',
      accountId: 'MT4-11111',
      accountName: 'Mike Johnson',
      orderType: 'Limit',
      expiry: '2024-12-20 09:30:00',
      comment: 'Support bounce',
      strategy: 'Bounce Trading',
      riskLevel: 'High',
      leverage: 200,
      marginRequired: 1500,
      tags: ['forex', 'bounce', 'limit-order']
    },
    {
      id: 'PO-004',
      symbol: 'XAU/USD',
      type: 'BUY',
      volume: 0.2,
      price: 2050.00,
      time: '2024-12-19 08:15:00',
      status: 'Pending',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      orderType: 'Stop',
      expiry: '2024-12-20 08:15:00',
      comment: 'Gold breakout',
      strategy: 'Breakout',
      riskLevel: 'Medium',
      leverage: 100,
      marginRequired: 1200,
      tags: ['gold', 'breakout', 'stop-order']
    },
    {
      id: 'PO-005',
      symbol: 'EUR/GBP',
      type: 'SELL',
      volume: 1.5,
      price: 0.8650,
      time: '2024-12-19 07:45:00',
      status: 'Pending',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      orderType: 'Limit',
      expiry: '2024-12-20 07:45:00',
      comment: 'Range trading',
      strategy: 'Range Trading',
      riskLevel: 'Low',
      leverage: 50,
      marginRequired: 600,
      tags: ['forex', 'range', 'limit-order']
    }
  ]

  // Mock data for closed positions
  const closedPositions = [
    {
      id: 'CP-001',
      symbol: 'EUR/USD',
      type: 'BUY',
      volume: 1.0,
      openPrice: 1.0800,
      closePrice: 1.0850,
      profitLoss: 50.0,
      openTime: '2024-12-18 14:30:00',
      closeTime: '2024-12-19 09:15:00',
      status: 'Completed',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      orderType: 'Market',
      strategy: 'Trend Following',
      riskLevel: 'Medium',
      leverage: 100,
      marginUsed: 1000,
      swap: -2.50,
      commission: -15.00,
      netProfit: 32.50,
      duration: '18h 45m',
      tags: ['forex', 'trend', 'profitable']
    },
    {
      id: 'CP-002',
      symbol: 'USD/JPY',
      type: 'SELL',
      volume: 1.5,
      openPrice: 149.00,
      closePrice: 148.50,
      profitLoss: 75.0,
      openTime: '2024-12-18 16:00:00',
      closeTime: '2024-12-19 08:30:00',
      status: 'Completed',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      orderType: 'Limit',
      strategy: 'Mean Reversion',
      riskLevel: 'Low',
      leverage: 50,
      marginUsed: 800,
      swap: -1.80,
      commission: -12.00,
      netProfit: 61.20,
      duration: '16h 30m',
      tags: ['forex', 'reversal', 'profitable']
    },
    {
      id: 'CP-003',
      symbol: 'XAU/USD',
      type: 'BUY',
      volume: 0.3,
      openPrice: 2040.00,
      closePrice: 2060.00,
      profitLoss: 60.0,
      openTime: '2024-12-17 10:15:00',
      closeTime: '2024-12-18 15:45:00',
      status: 'Completed',
      accountId: 'MT4-11111',
      accountName: 'Mike Johnson',
      orderType: 'Stop',
      strategy: 'Breakout',
      riskLevel: 'High',
      leverage: 200,
      marginUsed: 1500,
      swap: -3.60,
      commission: -18.00,
      netProfit: 38.40,
      duration: '29h 30m',
      tags: ['gold', 'breakout', 'profitable']
    },
    {
      id: 'CP-004',
      symbol: 'GBP/USD',
      type: 'SELL',
      volume: 0.8,
      openPrice: 1.2650,
      closePrice: 1.2680,
      profitLoss: -24.0,
      openTime: '2024-12-16 11:30:00',
      closeTime: '2024-12-17 14:20:00',
      status: 'Completed',
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      orderType: 'Market',
      strategy: 'Scalping',
      riskLevel: 'Medium',
      leverage: 100,
      marginUsed: 600,
      swap: -1.20,
      commission: -8.00,
      netProfit: -33.20,
      duration: '26h 50m',
      tags: ['forex', 'scalping', 'loss']
    },
    {
      id: 'CP-005',
      symbol: 'EUR/GBP',
      type: 'BUY',
      volume: 2.0,
      openPrice: 0.8600,
      closePrice: 0.8620,
      profitLoss: 40.0,
      openTime: '2024-12-15 09:00:00',
      closeTime: '2024-12-16 16:30:00',
      status: 'Completed',
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      orderType: 'Limit',
      strategy: 'Range Trading',
      riskLevel: 'Low',
      leverage: 50,
      marginUsed: 1000,
      swap: -2.40,
      commission: -16.00,
      netProfit: 21.60,
      duration: '31h 30m',
      tags: ['forex', 'range', 'profitable']
    }
  ]

  // Mock data for comprehensive trading history
  const tradingHistory = [
    {
      id: 'TH-001',
      symbol: 'EUR/USD',
      type: 'BUY',
      volume: 2.0,
      openPrice: 1.0750,
      closePrice: 1.0820,
      profitLoss: 140.0,
      openTime: '2024-12-15 09:30:00',
      closeTime: '2024-12-16 14:20:00',
      duration: '1d 4h 50m',
      swap: -2.50,
      commission: -15.00,
      netProfit: 122.50,
      accountId: 'MT4-12345',
      accountName: 'John Doe',
      strategy: 'Trend Following',
      marketSession: 'London',
      stopLoss: 1.0700,
      takeProfit: 1.0850,
      maxDrawdown: -25.0,
      peakValue: 180.0,
      status: 'Completed',
      notes: 'Strong uptrend continuation',
      tags: ['trend', 'forex', 'profitable']
    },
    {
      id: 'TH-002',
      symbol: 'GBP/USD',
      type: 'SELL',
      volume: 1.5,
      openPrice: 1.2650,
      closePrice: 1.2580,
      profitLoss: 105.0,
      openTime: '2024-12-14 11:15:00',
      closeTime: '2024-12-15 16:45:00',
      duration: '1d 5h 30m',
      swap: -1.80,
      commission: -12.00,
      netProfit: 91.20,
      accountId: 'MT4-67890',
      accountName: 'Jane Smith',
      strategy: 'Mean Reversion',
      marketSession: 'New York',
      stopLoss: 1.2700,
      takeProfit: 1.2550,
      maxDrawdown: -15.0,
      peakValue: 120.0,
      status: 'Completed',
      notes: 'Successful reversal trade',
      tags: ['reversal', 'forex', 'profitable']
    }
  ]

  // Render different content based on subPage
  if (subPage === 'pending-orders') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Pending Orders
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Monitor your pending trading orders</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Pending Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Symbol</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Type</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Volume</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Price</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Time</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Status</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pendingOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {order.symbol}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <span className={`px-2 py-1 text-[10px] sm:text-xs rounded-full ${
                        order.type === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {order.volume}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {order.price}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {order.time}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-yellow-900/20 text-yellow-400">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300">
                      <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                      <button className="text-red-400 hover:text-red-300">Cancel</button>
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

  if (subPage === 'closed-position') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Closed Positions
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Review your completed trading positions</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Closed Positions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Symbol</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Type</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Volume</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Open Price</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Close Price</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">P&L</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Open Time</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Close Time</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">Status</th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {closedPositions.map((position, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {position.symbol}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <span className={`px-2 py-1 text-[10px] sm:text-xs rounded-full ${
                        position.type === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {position.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {position.volume}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {position.openPrice}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {position.closePrice}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <div className={`text-xs sm:text-sm font-medium ${
                        position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {position.profitLoss >= 0 ? '+' : ''}{position.profitLoss.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {position.openTime}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {position.closeTime}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-gray-900/20 text-gray-400">
                        {position.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300">
                      <button className="text-blue-400 hover:text-blue-300">View</button>
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

  if (subPage === 'active') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Active Trades
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Monitor your currently open trading positions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Positions</p>
                <p className="text-2xl font-bold text-white">{activeTrades.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Margin</p>
                <p className="text-2xl font-bold text-white">${activeTrades.reduce((sum, trade) => sum + trade.marginUsed, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Unrealized P&L</p>
                <p className={`text-2xl font-bold ${
                  activeTrades.reduce((sum, trade) => sum + trade.unrealizedPnL, 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${activeTrades.reduce((sum, trade) => sum + trade.unrealizedPnL, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Risk Level</p>
                <p className="text-2xl font-bold text-white">
                  {activeTrades.filter(trade => trade.riskLevel === 'High').length} High
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Icon toolbar */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Export Data - Download table data as CSV/Excel"
              >
                <Download className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Export Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
              
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Import Data - Upload data from CSV/Excel files"
              >
                <Upload className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Import Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Add New Trade - Create a new trading position"
              >
                <Plus className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Add New Trade
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Trade Management - Manage trading positions and settings"
              >
                <Activity className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Trade Management
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Risk Management - Set stop loss and take profit levels"
              >
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Risk Management
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Analytics - View trading performance and statistics"
              >
                <BarChart3 className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Analytics
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Column Visibility - Show/hide table columns"
                onClick={() => setShowColumnVisibility(true)}
              >
                <Eye className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Settings - Configure trading table and display options"
              >
                <Settings className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Settings
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            </div>


          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingOrders.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingOrders.reduce((sum, order) => sum + order.volume, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${pendingOrders.reduce((sum, order) => sum + (order.volume * order.price), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search active trades..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {activeTrades.length} active positions
            </div>
          </div>
        </div>

        {/* Active Trades Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '50px', minWidth: '50px' }}>
                    <div className="flex items-center justify-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Position Type</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Account ID</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                    <div className="flex items-center justify-between">
                      <span>Account Name</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                    <div className="flex items-center justify-between">
                      <span>Position ID</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '120px' }}>
                    <div className="flex items-center justify-between">
                      <span>Open Time (UTC+0)</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                    <div className="flex items-center justify-between">
                      <span>Device Info - Open</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Symbol</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Quantity</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Direction</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>T/P</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>S/L</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Margin Used</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Unr. P&L</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentPageData.map((trade, index) => (
                  <tr
                    key={index}
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                    onClick={() => handleRowClick(trade)}
                  >
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '50px', minWidth: '50px' }}>
                      <div className="flex items-center justify-center">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <div className="flex items-center justify-center">
                        {trade.type === 'bot' ? (
                          <span className="w-4 h-4" title="Bot Trading">🤖</span>
                        ) : (
                          <span className="w-4 h-4" title="Manual Trading">👤</span>
                        )}
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <button
                        onClick={(e) => handleAccountIdClick(trade, e)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors"
                        title="Click to view user details"
                      >
                        {trade.accountId}
                      </button>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                      {trade.accountName}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                      {trade.positionId}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '120px' }}>
                      {trade.openTime}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '100px' }}>
                      {trade.deviceInfo}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {trade.symbol}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {trade.quantity}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        trade.direction === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {trade.takeProfit}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {trade.stopLoss}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      ${trade.marginUsed.toLocaleString()}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <div className={`font-medium ${
                        trade.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.unrealizedPnL >= 0 ? '+' : ''}${trade.unrealizedPnL.toFixed(2)}
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-300 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-200 relative group"
                          title="View Position Details"
                        >
                          <Eye className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            View Position Details
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded transition-colors duration-200 relative group"
                          title="Edit Position"
                        >
                          <Edit className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Edit Position
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          onClick={(e) => handleClosePositionClick(trade, e)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200 relative group"
                          title="Close Position"
                        >
                          <X className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Close Position
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                      </div>
                    </td>
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
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{endIndex}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{totalPositions}</span> positions
                </span>
              </div>
              <div className="table-footer-right">
                <div className="flex items-center space-x-4">
                  {/* Page Size Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value))
                        setCurrentPage(1) // Reset to first page when changing page size
                      }}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                    <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
                  </div>
                  
                  {/* Page Navigation */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
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
                            onClick={() => goToPage(pageNum)}
                            className={`px-2 py-1 text-sm rounded transition-colors ${
                              pageNum === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>
                    
                    <button 
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" 
                    >
                      Previous
                    </button>
                    <button 
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" 
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column Visibility Popup */}
        {showColumnVisibility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Column Visibility
                </h2>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show or hide trading history table columns as needed
                  </p>
                </div>

                {/* Column Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Column Visibility
                  </label>
                  
                  {/* All/None Buttons */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        All columns visible
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newVisibility = Object.keys(columnVisibility).reduce((acc, key) => {
                              acc[key] = true
                              return acc
                            }, {} as typeof columnVisibility)
                            setColumnVisibility(newVisibility)
                          }}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            const newVisibility = Object.keys(columnVisibility).reduce((acc, key) => {
                              acc[key] = false
                              return acc
                            }, {} as typeof columnVisibility)
                            setColumnVisibility(newVisibility)
                          }}
                          className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:text-gray-600 transition-colors"
                        >
                          None
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column List */}
                  <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
                    {Object.entries(columnVisibility).map(([key, visible]) => (
                      <label
                        key={key}
                        className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          visible ? 'bg-green-50 dark:bg-green-900/20' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={visible}
                          onChange={(e) => {
                            setColumnVisibility(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))
                          }}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowColumnVisibility(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Position Detail/Edit Popup */}
        {showPositionPopup && selectedPosition && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Position Details - {selectedPosition.symbol}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedPosition.positionId} • {selectedPosition.type === 'bot' ? 'Bot Trading' : 'Manual Trading'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      editMode 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {editMode ? 'Cancel Edit' : 'Edit Position'}
                  </button>
                  <button
                    onClick={() => {
                      setShowPositionPopup(false)
                      setSelectedPosition(null)
                      setEditMode(false)
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {editMode ? (
                  /* Edit Form */
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Take Profit
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={editForm.takeProfit}
                          onChange={(e) => setEditForm(prev => ({ ...prev, takeProfit: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Stop Loss
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={editForm.stopLoss}
                          onChange={(e) => setEditForm(prev => ({ ...prev, stopLoss: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.quantity}
                          onChange={(e) => setEditForm(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Strategy
                        </label>
                        <select
                          value={editForm.strategy}
                          onChange={(e) => setEditForm(prev => ({ ...prev, strategy: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Strategy</option>
                          <option value="Trend Following">Trend Following</option>
                          <option value="Mean Reversion">Mean Reversion</option>
                          <option value="Breakout">Breakout</option>
                          <option value="Scalping">Scalping</option>
                          <option value="Range Trading">Range Trading</option>
                          <option value="Bounce Trading">Bounce Trading</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Risk Level
                        </label>
                        <select
                          value={editForm.riskLevel}
                          onChange={(e) => setEditForm(prev => ({ ...prev, riskLevel: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Risk Level</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tags
                        </label>
                        <input
                          type="text"
                          value={editForm.tags.join(', ')}
                          onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) }))}
                          placeholder="Enter tags separated by commas"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleSaveChanges}
                        className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Position ID</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedPosition.positionId}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Symbol</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedPosition.symbol}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Direction</h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          selectedPosition.direction === 'BUY' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {selectedPosition.direction}
                        </span>
                      </div>
                    </div>

                    {/* Trading Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">Trading Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Quantity:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Entry Price:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.entryPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Current Price:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.currentPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Take Profit:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.takeProfit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Stop Loss:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.stopLoss}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">Account & Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Account ID:</span>
                            <span className="text-sm text-gray-900 dark:text-white">{selectedPosition.accountId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Account Name:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.accountName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Margin Used:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">${selectedPosition.marginUsed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Unrealized P&L:</span>
                            <span className={`text-sm font-medium ${
                              selectedPosition.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {selectedPosition.unrealizedPnL >= 0 ? '+' : ''}${selectedPosition.unrealizedPnL.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Leverage:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.leverage}x</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">Additional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Strategy</h4>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.strategy}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Risk Level</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            selectedPosition.riskLevel === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            selectedPosition.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {selectedPosition.riskLevel}
                          </span>
                        </div>
                                              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Market Session</h4>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedPosition.marketSession}</p>
                      </div>
                    </div>
                                         </div>
                   </div>
                 )}
               </div>
             </div>
           </div>
         )}

        {/* Close Position Popup */}
        {showClosePositionPopup && positionToClose && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
              {/* Header - Fixed */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Close Position
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {positionToClose.symbol} • {positionToClose.positionId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowClosePositionPopup(false)
                    setPositionToClose(null)
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Position Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Direction</p>
                      <span className={`text-sm font-medium ${
                        positionToClose.direction === 'BUY' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {positionToClose.direction}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{positionToClose.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Entry Price</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{positionToClose.entryPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{positionToClose.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Unrealized P&L</p>
                      <span className={`text-sm font-medium ${
                        positionToClose.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {positionToClose.unrealizedPnL >= 0 ? '+' : ''}${positionToClose.unrealizedPnL.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Margin Used</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${positionToClose.marginUsed.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Close Options Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Close Type
                    </label>
                    <select
                      value={closeForm.closeType}
                      onChange={(e) => setCloseForm(prev => ({ ...prev, closeType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="market">Market Close</option>
                      <option value="limit">Limit Close</option>
                      <option value="stop">Stop Close</option>
                    </select>
                  </div>

                  {closeForm.closeType !== 'market' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Close Price
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={closeForm.closePrice}
                        onChange={(e) => setCloseForm(prev => ({ ...prev, closePrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter close price"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Close Quantity
                    </label>
                    <select
                      value={closeForm.closeQuantity === positionToClose.quantity ? 'full' : 'partial'}
                      onChange={(e) => setCloseForm(prev => ({ 
                        ...prev, 
                        closeQuantity: e.target.value === 'full' ? positionToClose.quantity : 0 
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="full">Close Full Position ({positionToClose.quantity})</option>
                      <option value="partial">Close Partial Position</option>
                    </select>
                  </div>

                  {closeForm.closeQuantity !== positionToClose.quantity && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Partial Close Quantity
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={positionToClose.quantity}
                        value={closeForm.closeQuantity}
                        onChange={(e) => setCloseForm(prev => ({ ...prev, closeQuantity: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={`Enter quantity (max: ${positionToClose.quantity})`}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Close Reason
                    </label>
                    <select
                      value={closeForm.closeReason}
                      onChange={(e) => setCloseForm(prev => ({ ...prev, closeReason: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select a reason</option>
                      <option value="take_profit">Take Profit Target Reached</option>
                      <option value="stop_loss">Stop Loss Triggered</option>
                      <option value="manual_close">Manual Close</option>
                      <option value="risk_management">Risk Management</option>
                      <option value="strategy_change">Strategy Change</option>
                      <option value="market_conditions">Market Conditions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Comment (Optional)
                    </label>
                    <textarea
                      value={closeForm.comment}
                      onChange={(e) => setCloseForm(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Add any additional notes about closing this position..."
                    />
                  </div>
                </div>

                {/* Warning Message */}
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Warning:</strong> Closing this position will realize any unrealized P&L and free up the margin. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <button
                  onClick={() => {
                    setShowClosePositionPopup(false)
                    setPositionToClose(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClosePosition}
                  className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close Position
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Details Popup */}
        {showUserDetailPopup && selectedUser && (
          <UserDetailsPopup
            user={selectedUser}
            isOpen={showUserDetailPopup}
            onClose={() => {
              setShowUserDetailPopup(false)
              setSelectedUser(null)
            }}
          />
        )}
      </div>
    )
  }

  if (subPage === 'pending-order') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Pending Orders
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Monitor your pending trading orders</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending Orders</p>
                <p className="text-2xl font-bold text-white">{pendingOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Volume</p>
                <p className="text-2xl font-bold text-white">{pendingOrders.reduce((sum, order) => sum + order.volume, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-white">
                  ${pendingOrders.reduce((sum, order) => sum + (order.volume * order.price), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Buy Orders</p>
                <p className="text-2xl font-bold text-white">
                  {pendingOrders.filter(order => order.type === 'BUY').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Sell Orders</p>
                <p className="text-2xl font-bold text-white">
                  {pendingOrders.filter(order => order.type === 'SELL').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">High Risk</p>
                <p className="text-2xl font-bold text-white">
                  {pendingOrders.filter(order => order.riskLevel === 'High').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Margin</p>
                <p className="text-2xl font-bold text-white">
                  ${pendingOrders.reduce((sum, order) => sum + order.marginRequired, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-teal-600 rounded-lg">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg Leverage</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(pendingOrders.reduce((sum, order) => sum + order.leverage, 0) / pendingOrders.length)}x
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Icon toolbar */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Export Data - Download table data as CSV/Excel"
              >
                <Download className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Export Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
              
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Import Data - Upload data from CSV/Excel files"
              >
                <Upload className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Import Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Add New Order - Create a new pending order"
              >
                <Plus className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Add New Order
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Order Management - Manage pending orders and settings"
              >
                <Activity className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Order Management
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Risk Management - Set stop loss and take profit levels"
              >
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Risk Management
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Analytics - View order performance and statistics"
              >
                <BarChart3 className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Analytics
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Column Visibility - Show/hide table columns"
                onClick={() => setShowColumnVisibility(true)}
              >
                <Eye className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Settings - Configure order table and display options"
              >
                <Settings className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Settings
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            </div>

            {/* Right side - Order count */}
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {pendingOrders.length} pending orders
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pending orders..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {pendingOrders.length} pending orders
            </div>
          </div>
        </div>

        {/* Pending Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Symbol</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Volume</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Order Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Current Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Order Time</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Order Type</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Account</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Strategy</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Risk Level</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pendingOrders.map((order, index) => (
                  <tr
                    key={index}
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {order.symbol}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.type === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {order.volume}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {order.price}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {/* Mock current price - in real app this would come from API */}
                      {(order.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(4)}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {order.time}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.orderType === 'Limit' ? 'bg-blue-900/20 text-blue-400' : 'bg-orange-900/20 text-orange-400'
                      }`}>
                        {order.orderType}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {order.accountName}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {order.strategy}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.riskLevel === 'High' ? 'bg-red-900/20 text-red-400' : 
                        order.riskLevel === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' : 
                        'bg-green-900/20 text-green-400'
                      }`}>
                        {order.riskLevel}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/20 text-yellow-400">
                        {order.status}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-300 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '60px' }}>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-200 relative group"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            View Order Details
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded transition-colors duration-200 relative group"
                          title="Edit Order"
                        >
                          <Edit className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Edit Order
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200 relative group"
                          title="Cancel Order"
                        >
                          <X className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Cancel Order
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                      </div>
                    </td>
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
                  <span className="font-semibold text-gray-900 dark:text-white">{pendingOrders.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{pendingOrders.length}</span> orders
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
        {showColumnVisibility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Column Visibility
                </h2>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select which columns to display in the pending orders table:
                </p>
                
                <div className="space-y-3">
                  {Object.entries(columnVisibility).map(([key, visible]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={(e) => setColumnVisibility(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (subPage === 'done-order') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Completed Orders
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Review your completed trading orders and performance</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Completed Orders</p>
                <p className="text-2xl font-bold text-white">{closedPositions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Volume</p>
                <p className="text-2xl font-bold text-white">{closedPositions.reduce((sum, position) => sum + position.volume, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total P&L</p>
                <p className={`text-2xl font-bold ${
                  closedPositions.reduce((sum, position) => sum + position.profitLoss, 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${closedPositions.reduce((sum, position) => sum + position.profitLoss, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Profitable</p>
                <p className="text-2xl font-bold text-white">
                  {closedPositions.filter(position => position.profitLoss > 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Loss Making</p>
                <p className="text-2xl font-bold text-white">
                  {closedPositions.filter(position => position.profitLoss < 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold text-white">
                  {closedPositions.length > 0 ? Math.round((closedPositions.filter(position => position.profitLoss > 0).length / closedPositions.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-teal-600 rounded-lg">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg P&L</p>
                <p className={`text-2xl font-bold ${
                  closedPositions.length > 0 ? (closedPositions.reduce((sum, position) => sum + position.profitLoss, 0) / closedPositions.length) >= 0 ? 'text-green-400' : 'text-red-400' : 'text-gray-400'
                }`}>
                  ${closedPositions.length > 0 ? (closedPositions.reduce((sum, position) => sum + position.profitLoss, 0) / closedPositions.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg Duration</p>
                <p className="text-2xl font-bold text-white">
                  {/* Mock average duration - in real app this would be calculated */}
                  2h 15m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Icon toolbar */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Export Data - Download completed orders as CSV/Excel"
              >
                <Download className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Export Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
              
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Performance Analytics - View detailed performance metrics"
              >
                <BarChart3 className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Performance Analytics
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Trade Journal - Review and analyze completed trades"
              >
                <Activity className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Trade Journal
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Risk Analysis - Analyze risk metrics and drawdowns"
              >
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Risk Analysis
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Column Visibility - Show/hide table columns"
                onClick={() => setShowColumnVisibility(true)}
              >
                <Eye className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Settings - Configure completed orders table and display options"
              >
                <Settings className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Settings
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            </div>

            {/* Right side - Order count */}
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {closedPositions.length} completed orders
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{closedPositions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {closedPositions.reduce((sum, position) => sum + position.volume, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total P&L</p>
              <p className={`text-2xl font-bold ${
                closedPositions.reduce((sum, position) => sum + position.profitLoss, 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${closedPositions.reduce((sum, position) => sum + position.profitLoss, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {closedPositions.length > 0 ? Math.round((closedPositions.filter(position => position.profitLoss > 0).length / closedPositions.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search completed orders..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {closedPositions.length} completed orders
            </div>
          </div>
        </div>

        {/* Completed Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Symbol</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Volume</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Order Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Execution Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>P&L</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Order Time</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Execution Time</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Duration</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {closedPositions.map((position, index) => (
                  <tr
                    key={index}
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {position.symbol}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        position.type === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {position.type}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {position.volume}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {position.openPrice}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {position.closePrice}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '60px' }}>
                      <div className={`font-medium ${
                        position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)}
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {position.openTime}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {position.closeTime}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      {/* Mock duration - in real app this would be calculated */}
                      {Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '60px' }}>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">
                        Completed
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-300 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '60px' }}>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-200 relative group"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            View Order Details
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors duration-200 relative group"
                          title="Trade Analysis"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Trade Analysis
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-purple-400 hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors duration-200 relative group"
                          title="Copy Trade"
                        >
                          <Activity className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Copy Trade
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                      </div>
                    </td>
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
                  <span className="font-semibold text-gray-900 dark:text-white">{closedPositions.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{closedPositions.length}</span> orders
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
        {showColumnVisibility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Column Visibility
                </h2>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select which columns to display in the completed orders table:
                </p>
                
                <div className="space-y-3">
                  {Object.entries(columnVisibility).map(([key, visible]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={(e) => setColumnVisibility(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (subPage === 'deals') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Trading Deals
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Comprehensive view of all trading deals and transactions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Deals</p>
                <p className="text-2xl font-bold text-white">{tradingHistory.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Profitable</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.filter(trade => trade.profitLoss > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Losses</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.filter(trade => trade.profitLoss < 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Net P&L</p>
                <p className={`text-2xl font-bold ${
                  tradingHistory.reduce((sum, trade) => sum + trade.netProfit, 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${tradingHistory.reduce((sum, trade) => sum + trade.netProfit, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.length > 0 ? Math.round((tradingHistory.filter(trade => trade.profitLoss > 0).length / tradingHistory.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-teal-600 rounded-lg">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg P&L</p>
                <p className={`text-2xl font-bold ${
                  tradingHistory.length > 0 ? (tradingHistory.reduce((sum, trade) => sum + trade.profitLoss, 0) / tradingHistory.length) >= 0 ? 'text-green-400' : 'text-red-400' : 'text-gray-400'
                }`}>
                  ${tradingHistory.length > 0 ? (tradingHistory.reduce((sum, trade) => sum + trade.profitLoss, 0) / tradingHistory.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Volume</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.reduce((sum, trade) => sum + trade.volume, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Breakout Strategy</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.filter(trade => trade.strategy === 'Breakout').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            {/* Left side - Icon toolbar */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Export Data - Download deals data as CSV/Excel"
              >
                <Download className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Export Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
              
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Performance Analytics - View detailed performance metrics"
              >
                <BarChart3 className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Performance Analytics
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Trade Analysis - Analyze individual deals and patterns"
              >
                <Activity className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Trade Analysis
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Risk Management - Analyze risk metrics and drawdowns"
              >
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Risk Management
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Column Visibility - Show/hide table columns"
                onClick={() => setShowColumnVisibility(true)}
              >
                <Eye className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Settings - Configure deals table and display options"
              >
                <Settings className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Settings
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            </div>

            {/* Right side - Deals count */}
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {tradingHistory.length} total deals
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Deals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tradingHistory.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tradingHistory.reduce((sum, trade) => sum + trade.volume, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total P&L</p>
              <p className={`text-2xl font-bold ${
                tradingHistory.reduce((sum, trade) => sum + trade.profitLoss, 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${tradingHistory.reduce((sum, trade) => sum + trade.profitLoss, 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tradingHistory.length > 0 ? Math.round((tradingHistory.filter(trade => trade.profitLoss > 0).length / tradingHistory.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {tradingHistory.length} deals
            </div>
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Deal ID</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Symbol</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                    <div className="flex items-center justify-between">
                      <span>Volume</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Open Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Close Price</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>P&L</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Net Profit</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Duration</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Account</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                    </div>
                  </th>
                  <th className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '80px' }}>
                    <div className="flex items-center justify-between">
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tradingHistory.map((deal, index) => (
                  <tr
                    key={deal.id}
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      {deal.id}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {deal.symbol}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        deal.type === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {deal.type}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '60px' }}>
                      {deal.volume}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      {deal.openPrice}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      {deal.closePrice}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <div className={`font-medium ${
                        deal.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {deal.profitLoss >= 0 ? '+' : ''}${deal.profitLoss.toFixed(2)}
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <div className={`font-medium ${
                        deal.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {deal.netProfit >= 0 ? '+' : ''}${deal.netProfit.toFixed(2)}
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '80px' }}>
                      {deal.duration}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      {deal.accountName}
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '80px' }}>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900/20 text-green-400">
                        {deal.status}
                      </span>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-300 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '140px', minWidth: '80px' }}>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-200 relative group"
                          title="View Deal Details"
                        >
                          <Eye className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            View Deal Details
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-purple-400 hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors duration-200 relative group"
                          title="Analyze Deal"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Analyze Deal
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                        
                        <button 
                          className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors duration-200 relative group"
                          title="Copy Deal"
                        >
                          <Plus className="w-4 h-4" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                            Copy Deal
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                      </div>
                    </td>
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
                  <span className="font-semibold text-gray-900 dark:text-white">{tradingHistory.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{tradingHistory.length}</span> deals
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
        {showColumnVisibility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Column Visibility
                </h2>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select which columns to display in the deals table:
                </p>
                
                <div className="space-y-3">
                  {Object.entries(columnVisibility).map(([key, visible]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={(e) => setColumnVisibility(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render comprehensive trading history for history subpage
  if (subPage === 'history') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Trading History
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Comprehensive view of all completed trading activities</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Trades</p>
                <p className="text-2xl font-bold text-white">{tradingHistory.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Profitable</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.filter(trade => trade.profitLoss > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Losses</p>
                <p className="text-2xl font-bold text-white">
                  {tradingHistory.filter(trade => trade.profitLoss < 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Net P&L</p>
                <p className={`text-2xl font-bold ${
                  tradingHistory.reduce((sum, trade) => sum + trade.netProfit, 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${tradingHistory.reduce((sum, trade) => sum + trade.netProfit, 0).toFixed(2)}
                </p>
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
                title="Export History - Download trading history as CSV/Excel"
                onClick={() => console.log('Export History clicked')}
              >
                <Download className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Export History
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
                title="Trading Analytics - View performance metrics and charts"
                onClick={() => console.log('Trading Analytics clicked')}
              >
                <BarChart3 className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Trading Analytics
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
                title="Performance Report - Generate detailed performance analysis"
                onClick={() => console.log('Performance Report clicked')}
              >
                <Activity className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Performance Report
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
                title="Column Visibility - Show/hide table columns"
                onClick={() => setShowColumnVisibility(true)}
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

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trades..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {tradingHistory.length} completed trades
            </div>
          </div>
        </div>

        {/* Trading History Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Symbol</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Type</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Volume</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Open Price</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Close Price</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>P&L</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Net Profit</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Duration</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Strategy</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Account</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tradingHistory.map((trade, index) => (
                  <tr
                    key={trade.id}
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <div className="text-gray-900 dark:text-white font-medium">{trade.symbol}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        trade.type === 'BUY' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <div className="text-gray-900 dark:text-white">{trade.volume}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{trade.openPrice}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{trade.closePrice}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className={`font-medium ${
                        trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}
                      </div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className={`font-medium ${
                        trade.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.netProfit >= 0 ? '+' : ''}${trade.netProfit.toFixed(2)}
                      </div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-500 dark:text-gray-400">{trade.duration}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{trade.strategy}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{trade.accountName}</div>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {trade.status}
                      </span>
                    </td>
                    
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('View trade details:', trade.id)}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Analyze trade:', trade.id)}
                          className="p-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded transition-colors"
                          title="Analyze Trade"
                        >
                          <BarChart3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Copy trade:', trade.id)}
                          className="p-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                          title="Copy Trade"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
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
                  <span className="font-semibold text-gray-900 dark:text-white">{tradingHistory.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{tradingHistory.length}</span> trades
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
        {showColumnVisibility && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Column Visibility
                </h2>
                <button
                  onClick={() => setShowColumnVisibility(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show or hide trading history table columns as needed
                  </p>
                </div>

                {/* Column Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Column Visibility
                  </label>
                  
                  {/* All/None Buttons */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        All columns visible
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newVisibility = Object.keys(columnVisibility).reduce((acc, key) => {
                              acc[key] = true
                              return acc
                            }, {} as typeof columnVisibility)
                            setColumnVisibility(newVisibility)
                          }}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            const newVisibility = Object.keys(columnVisibility).reduce((acc, key) => {
                              acc[key] = false
                              return acc
                            }, {} as typeof columnVisibility)
                            setColumnVisibility(newVisibility)
                          }}
                          className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:text-gray-600 transition-colors"
                        >
                          None
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column List */}
                  <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
                    {Object.entries(columnVisibility).map(([key, visible]) => (
                      <label
                        key={key}
                        className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          visible ? 'bg-green-50 dark:bg-green-900/20' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={visible}
                          onChange={(e) => {
                            setColumnVisibility(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))
                          }}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowColumnVisibility(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default content for other subpages
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            {getPageTitle(subPage)}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm truncate">Trading management and monitoring</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {getPageTitle(subPage || '').toLowerCase()}
        </h2>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            This is the {getPageTitle(subPage || '').toLowerCase()} page.
            Content will be added here based on the specific functionality
            needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 1
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 1
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 2
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 2
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 3
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingSub