import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type RowSelectionState,
  type VisibilityState,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table'
import {
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertTriangle,
  Info,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Activity,
  Edit
} from 'lucide-react'
import { CSS_CLASSES } from './constants'
import CreatePriceStreamPopup from './CreatePriceStreamPopup'
import EditPriceStreamPopup from './EditPriceStreamPopup'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'
import { useColumnVisibility } from './useColumnVisibility'

// Types
export interface PriceStreamData {
  id: string
  name: string
  symbol: string
  source: string
  status: 'active' | 'inactive' | 'error' | 'maintenance'
  lastUpdate: string
  updateFrequency: string
  price: number
  change: number
  changePercent: number
  volume: number
  high24h: number
  low24h: number
  description: string
  isRealTime: boolean
  retryAttempts: number
  maxRetries: number
}

export interface PriceStreamFormData {
  name: string
  symbol: string
  source: string
  status: 'active' | 'inactive' | 'error' | 'maintenance'
  updateFrequency: string
  description: string
  isRealTime: boolean
  retryAttempts: number
  maxRetries: number
}

// Mock data
const mockPriceStreamsData: PriceStreamData[] = [
  {
    id: '1',
    name: 'Price Stream One',
    symbol: 'BTC/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:25',
    updateFrequency: '1 second',
    price: 43250.75,
    change: 1250.50,
    changePercent: 2.98,
    volume: 1250000.00,
    high24h: 44500.00,
    low24h: 42000.00,
    description: 'Real-time Bitcoin price stream from Binance exchange',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '2',
    name: 'Price Stream Two',
    symbol: 'ETH/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:20',
    updateFrequency: '1 second',
    price: 2650.25,
    change: -45.75,
    changePercent: -1.70,
    volume: 890000.00,
    high24h: 2750.00,
    low24h: 2600.00,
    description: 'Real-time Ethereum price stream from Coinbase exchange',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '3',
    name: 'Price Stream Three',
    symbol: 'EUR/USD',
    source: 'FXCM',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:15',
    updateFrequency: '500ms',
    price: 1.0895,
    change: 0.0025,
    changePercent: 0.23,
    volume: 5000000.00,
    high24h: 1.0920,
    low24h: 1.0870,
    description: 'High-frequency EUR/USD forex price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 5
  },
  {
    id: '4',
    name: 'Price Stream Four',
    symbol: 'XAU/USD',
    source: 'OANDA',
    status: 'maintenance',
    lastUpdate: '2024-01-15 14:25:10',
    updateFrequency: '5 seconds',
    price: 2050.50,
    change: 12.75,
    changePercent: 0.63,
    volume: 250000.00,
    high24h: 2065.00,
    low24h: 2035.00,
    description: 'Gold price stream with 5-second updates',
    isRealTime: false,
    retryAttempts: 2,
    maxRetries: 3
  },
  {
    id: '5',
    name: 'Price Stream Five',
    symbol: 'WTI/USD',
    source: 'ICE',
    status: 'error',
    lastUpdate: '2024-01-15 14:20:00',
    updateFrequency: '10 seconds',
    price: 78.45,
    change: -1.25,
    changePercent: -1.57,
    volume: 150000.00,
    high24h: 80.00,
    low24h: 77.50,
    description: 'WTI crude oil price stream',
    isRealTime: false,
    retryAttempts: 3,
    maxRetries: 3
  },
  {
    id: '6',
    name: 'Price Stream Six',
    symbol: 'GBP/USD',
    source: 'FXCM',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:55',
    updateFrequency: '1 second',
    price: 1.2650,
    change: -0.0085,
    changePercent: -0.67,
    volume: 3200000.00,
    high24h: 1.2750,
    low24h: 1.2600,
    description: 'Real-time GBP/USD forex price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '7',
    name: 'Price Stream Seven',
    symbol: 'USD/JPY',
    source: 'OANDA',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:50',
    updateFrequency: '500ms',
    price: 148.25,
    change: 0.75,
    changePercent: 0.51,
    volume: 4500000.00,
    high24h: 149.00,
    low24h: 147.50,
    description: 'High-frequency USD/JPY forex price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 5
  },
  {
    id: '8',
    name: 'Price Stream Eight',
    symbol: 'ADA/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:45',
    updateFrequency: '2 seconds',
    price: 0.4850,
    change: 0.0250,
    changePercent: 5.43,
    volume: 750000.00,
    high24h: 0.4950,
    low24h: 0.4600,
    description: 'Cardano price stream with 2-second updates',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '9',
    name: 'Price Stream Nine',
    symbol: 'DOT/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:40',
    updateFrequency: '1 second',
    price: 7.85,
    change: -0.15,
    changePercent: -1.88,
    volume: 450000.00,
    high24h: 8.10,
    low24h: 7.70,
    description: 'Polkadot price stream from Coinbase',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '10',
    name: 'Price Stream Ten',
    symbol: 'LINK/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:35',
    updateFrequency: '1 second',
    price: 15.75,
    change: 0.45,
    changePercent: 2.94,
    volume: 680000.00,
    high24h: 16.00,
    low24h: 15.30,
    description: 'Chainlink price stream with real-time updates',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '11',
    name: 'Price Stream Eleven',
    symbol: 'SOL/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:30',
    updateFrequency: '500ms',
    price: 98.50,
    change: 2.75,
    changePercent: 2.87,
    volume: 920000.00,
    high24h: 100.00,
    low24h: 95.75,
    description: 'Solana high-frequency price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 5
  },
  {
    id: '12',
    name: 'Price Stream Twelve',
    symbol: 'MATIC/USD',
    source: 'Binance',
    status: 'maintenance',
    lastUpdate: '2024-01-15 14:25:25',
    updateFrequency: '5 seconds',
    price: 0.8750,
    change: -0.0250,
    changePercent: -2.78,
    volume: 380000.00,
    high24h: 0.9000,
    low24h: 0.8700,
    description: 'Polygon price stream under maintenance',
    isRealTime: false,
    retryAttempts: 1,
    maxRetries: 3
  },
  {
    id: '13',
    name: 'Price Stream Thirteen',
    symbol: 'AVAX/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:20',
    updateFrequency: '1 second',
    price: 32.45,
    change: 0.85,
    changePercent: 2.69,
    volume: 520000.00,
    high24h: 33.00,
    low24h: 31.60,
    description: 'Avalanche price stream with real-time data',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '14',
    name: 'Price Stream Fourteen',
    symbol: 'UNI/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:15',
    updateFrequency: '2 seconds',
    price: 6.85,
    change: -0.15,
    changePercent: -2.14,
    volume: 280000.00,
    high24h: 7.00,
    low24h: 6.80,
    description: 'Uniswap price stream with 2-second updates',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '15',
    name: 'Price Stream Fifteen',
    symbol: 'ATOM/USD',
    source: 'Coinbase',
    status: 'error',
    lastUpdate: '2024-01-15 14:20:10',
    updateFrequency: '10 seconds',
    price: 9.75,
    change: 0.25,
    changePercent: 2.63,
    volume: 180000.00,
    high24h: 9.90,
    low24h: 9.50,
    description: 'Cosmos price stream experiencing errors',
    isRealTime: false,
    retryAttempts: 3,
    maxRetries: 3
  },
  {
    id: '16',
    name: 'Price Stream Sixteen',
    symbol: 'LTC/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:05',
    updateFrequency: '1 second',
    price: 72.50,
    change: 1.25,
    changePercent: 1.76,
    volume: 420000.00,
    high24h: 73.00,
    low24h: 71.25,
    description: 'Litecoin real-time price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '17',
    name: 'Price Stream Seventeen',
    symbol: 'BCH/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:29:00',
    updateFrequency: '2 seconds',
    price: 245.75,
    change: -3.25,
    changePercent: -1.30,
    volume: 150000.00,
    high24h: 250.00,
    low24h: 243.00,
    description: 'Bitcoin Cash price stream with 2-second updates',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '18',
    name: 'Price Stream Eighteen',
    symbol: 'XRP/USD',
    source: 'Binance',
    status: 'active',
    lastUpdate: '2024-01-15 14:28:55',
    updateFrequency: '500ms',
    price: 0.5850,
    change: 0.0150,
    changePercent: 2.63,
    volume: 850000.00,
    high24h: 0.5900,
    low24h: 0.5700,
    description: 'Ripple high-frequency price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 5
  },
  {
    id: '19',
    name: 'Price Stream Nineteen',
    symbol: 'DOGE/USD',
    source: 'Coinbase',
    status: 'active',
    lastUpdate: '2024-01-15 14:28:50',
    updateFrequency: '1 second',
    price: 0.0825,
    change: 0.0025,
    changePercent: 3.13,
    volume: 1200000.00,
    high24h: 0.0830,
    low24h: 0.0800,
    description: 'Dogecoin real-time price stream',
    isRealTime: true,
    retryAttempts: 0,
    maxRetries: 3
  },
  {
    id: '20',
    name: 'Price Stream Twenty',
    symbol: 'SHIB/USD',
    source: 'Binance',
    status: 'maintenance',
    lastUpdate: '2024-01-15 14:25:45',
    updateFrequency: '5 seconds',
    price: 0.00000985,
    change: 0.00000015,
    changePercent: 1.55,
    volume: 2500000.00,
    high24h: 0.00001000,
    low24h: 0.00000970,
    description: 'Shiba Inu price stream under maintenance',
    isRealTime: false,
    retryAttempts: 2,
    maxRetries: 3
  }
]

const PriceStreamsTable: React.FC = () => {
  console.log('PriceStreamsTable component rendering') // Debug log
  
  // State management
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  // Price streams data state
  const [data, setData] = useState<PriceStreamData[]>(mockPriceStreamsData)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editingPriceStream, setEditingPriceStream] = useState<PriceStreamData | null>(null)
  const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<PriceStreamData>()
  const [showCreatePopup, setShowCreatePopup] = useState(false)

  // Column helper
  const columnHelper = createColumnHelper<PriceStreamData>()

  // Define columns
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue, row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {getValue()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.original.symbol} • {row.original.source}
                      </div>
        </div>
      </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue, row }) => (
        <div className="max-w-xs">
          <div className="text-sm text-gray-900 dark:text-white mb-1">
            {getValue()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Status: <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              row.original.status === 'active' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
              row.original.status === 'inactive' ? 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400' :
              row.original.status === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' :
              'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
            }`}>
              {row.original.status}
            </span>
            {' • '}
            {row.original.updateFrequency}
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditPriceStream(row.original)
            }}
            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="Edit Stream"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
    }),
  ]

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Handlers
  const handleEditPriceStream = (priceStream: PriceStreamData) => {
    setEditingPriceStream(priceStream)
    setShowEditPopup(true)
  }



  const handleUpdatePriceStream = (updatedPriceStream: PriceStreamFormData) => {
    console.log('Updating price stream:', updatedPriceStream)
    // Update the price stream in the data
    setData(prevData => 
      prevData.map(item => 
        item.id === editingPriceStream?.id ? { ...item, ...updatedPriceStream } : item
      )
    )
    setShowEditPopup(false)
    setEditingPriceStream(null)
  }

  const handleCreatePriceStream = (newPriceStream: any) => {
    console.log('Creating new price stream:', newPriceStream)
    // Create new price stream with unique ID
    const priceStreamToAdd = {
      id: (data.length + 1).toString(),
      name: newPriceStream.name,
      symbol: newPriceStream.symbol,
      source: newPriceStream.source,
      status: newPriceStream.status,
      updateFrequency: newPriceStream.updateFrequency,
      description: newPriceStream.description,
      isRealTime: newPriceStream.isRealTime,
      retryAttempts: newPriceStream.retryAttempts,
      maxRetries: newPriceStream.maxRetries,
      lastUpdate: new Date().toLocaleString('en-US'),
      price: Math.random() * 1000 + 100,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.random() * 1000000 + 100000,
      high24h: Math.random() * 1000 + 100,
      low24h: Math.random() * 1000 + 100,
    }
    setData(prevData => [...prevData, priceStreamToAdd])
    setShowCreatePopup(false)
  }

  const handleRefresh = () => {
    console.log('Refreshing price streams data...')
    // Implement refresh functionality
  }

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                type="text"
                placeholder="Search streams by name or description..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 w-64"
              />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              showFilters
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowCreatePopup(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stream</span>
          </button>
        </div>
      </div>

      {/* Toolbar with Action Buttons and Search */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 mb-4 border-2 border-gray-600 dark:border-gray-500 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left Section - Action Buttons */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-700 dark:bg-gray-600 rounded-lg p-2 flex items-center space-x-2 border border-gray-500 dark:border-gray-400 shadow-md">
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Download">
                <Download className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Download Streams Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Upload">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Streams Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Settings">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Stream Settings
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Alerts">
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Stream Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={(e) => handleColumnVisibilityMenu(e, table)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" 
                title="Column Visibility"
              >
                <Eye className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Info">
                <Info className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Stream Info
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Section - Search Bar */}
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search streams by name or description..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 dark:bg-gray-600 border border-gray-500 dark:border-gray-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`${CSS_CLASSES.TABLE_CONTAINER}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${CSS_CLASSES.TABLE_HEADER}`}>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  onClick={() => handleEditPriceStream(row.original)}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${row.index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Total Price Streams:</span>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {table.getFilteredRowModel().rows.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Active:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {data.filter(item => item.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Inactive:</span>
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                {data.filter(item => item.status === 'inactive').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Error:</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {data.filter(item => item.status === 'error').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Maintenance:</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {data.filter(item => item.status === 'maintenance').length}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </span>{' '}
              of{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {table.getFilteredRowModel().rows.length}
              </span>{' '}
              results
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => {
                const pageIndex = i
                const isCurrentPage = pageIndex === table.getState().pagination.pageIndex
                
                // Show first page, last page, current page, and pages around current page
                if (
                  pageIndex === 0 ||
                  pageIndex === table.getPageCount() - 1 ||
                  (pageIndex >= table.getState().pagination.pageIndex - 1 && 
                   pageIndex <= table.getState().pagination.pageIndex + 1)
                ) {
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        isCurrentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {pageIndex + 1}
                    </button>
                  )
                } else if (
                  pageIndex === table.getState().pagination.pageIndex - 2 ||
                  pageIndex === table.getState().pagination.pageIndex + 2
                ) {
                  return <span key={pageIndex} className="px-2 text-gray-500 dark:text-gray-400">...</span>
                }
                return null
              })}
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showCreatePopup && (
        <CreatePriceStreamPopup
          isOpen={showCreatePopup}
          onClose={() => setShowCreatePopup(false)}
          onSubmit={handleCreatePriceStream}
        />
      )}

      {showEditPopup && editingPriceStream && (
        <EditPriceStreamPopup
          isOpen={showEditPopup}
          onClose={() => {
            setShowEditPopup(false)
            setEditingPriceStream(null)
          }}
          onSubmit={handleUpdatePriceStream}
          initialData={editingPriceStream}
        />
      )}

      {/* Column Visibility Popup */}
      <ColumnVisibilityPopup 
        table={table}
        columnVisibilityMenu={columnVisibilityMenu}
        onClose={closeColumnVisibilityMenu}
      />
    </div>
  )
}

export default PriceStreamsTable 