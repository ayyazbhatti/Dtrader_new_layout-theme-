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
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  DollarSign,
  Bitcoin,
  Euro,
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertTriangle,
  Info,
  Tag,
  X,
} from 'lucide-react'
import { CSS_CLASSES } from './constants'
import EditSymbolPopup from './EditSymbolPopup'

// Define the symbol data type
interface SymbolData {
  id: string
  symbol: string
  pipPosition: number
  digit: number
  bid: number
  ask: number
  assetClass: string
  leverageProfile: string
  status: 'Active' | 'Inactive' | 'Suspended'
}

// Mock data for symbols
const mockSymbolsData: SymbolData[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    pipPosition: 2,
    digit: 2,
    bid: 43250.00,
    ask: 43251.00,
    assetClass: 'Crypto',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    pipPosition: 2,
    digit: 2,
    bid: 2650.75,
    ask: 2651.25,
    assetClass: 'Crypto',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '3',
    symbol: 'AAPL/USD',
    pipPosition: 2,
    digit: 2,
    bid: 150.25,
    ask: 150.26,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '4',
    symbol: 'GOOGL/USD',
    pipPosition: 2,
    digit: 2,
    bid: 2750.80,
    ask: 2750.85,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '5',
    symbol: 'EUR/USD',
    pipPosition: 5,
    digit: 5,
    bid: 1.0850,
    ask: 1.0851,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '6',
    symbol: 'GBP/USD',
    pipPosition: 5,
    digit: 5,
    bid: 1.2650,
    ask: 1.2651,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '7',
    symbol: 'GOLD/USD',
    pipPosition: 2,
    digit: 2,
    bid: 2050.50,
    ask: 2050.55,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '8',
    symbol: 'OIL/USD',
    pipPosition: 2,
    digit: 2,
    bid: 78.25,
    ask: 78.26,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '9',
    symbol: 'SPX/USD',
    pipPosition: 2,
    digit: 2,
    bid: 4850.75,
    ask: 4850.80,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '10',
    symbol: 'NDX/USD',
    pipPosition: 2,
    digit: 2,
    bid: 16850.50,
    ask: 16850.75,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '11',
    symbol: 'TSLA/USD',
    pipPosition: 2,
    digit: 2,
    bid: 245.80,
    ask: 245.85,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '12',
    symbol: 'MSFT/USD',
    pipPosition: 2,
    digit: 2,
    bid: 375.25,
    ask: 375.30,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '13',
    symbol: 'AMZN/USD',
    pipPosition: 2,
    digit: 2,
    bid: 145.75,
    ask: 145.80,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '14',
    symbol: 'META/USD',
    pipPosition: 2,
    digit: 2,
    bid: 485.50,
    ask: 485.55,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '15',
    symbol: 'NVDA/USD',
    pipPosition: 2,
    digit: 2,
    bid: 875.25,
    ask: 875.30,
    assetClass: 'Stock',
    leverageProfile: '1:50',
    status: 'Active',
  },
  {
    id: '16',
    symbol: 'USD/JPY',
    pipPosition: 3,
    digit: 3,
    bid: 148.25,
    ask: 148.26,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '17',
    symbol: 'USD/CHF',
    pipPosition: 5,
    digit: 5,
    bid: 0.8750,
    ask: 0.8751,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '18',
    symbol: 'AUD/USD',
    pipPosition: 5,
    digit: 5,
    bid: 0.6650,
    ask: 0.6651,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '19',
    symbol: 'NZD/USD',
    pipPosition: 5,
    digit: 5,
    bid: 0.6150,
    ask: 0.6151,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '20',
    symbol: 'CAD/USD',
    pipPosition: 5,
    digit: 5,
    bid: 0.7350,
    ask: 0.7351,
    assetClass: 'Forex',
    leverageProfile: '1:500',
    status: 'Active',
  },
  {
    id: '21',
    symbol: 'SILVER/USD',
    pipPosition: 3,
    digit: 3,
    bid: 23.45,
    ask: 23.46,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '22',
    symbol: 'COPPER/USD',
    pipPosition: 3,
    digit: 3,
    bid: 4.25,
    ask: 4.26,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '23',
    symbol: 'NATURAL_GAS/USD',
    pipPosition: 4,
    digit: 4,
    bid: 2.85,
    ask: 2.86,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '24',
    symbol: 'CORN/USD',
    pipPosition: 2,
    digit: 2,
    bid: 4.75,
    ask: 4.76,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '25',
    symbol: 'WHEAT/USD',
    pipPosition: 2,
    digit: 2,
    bid: 5.85,
    ask: 5.86,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '26',
    symbol: 'SOYBEANS/USD',
    pipPosition: 2,
    digit: 2,
    bid: 12.45,
    ask: 12.46,
    assetClass: 'Commodity',
    leverageProfile: '1:200',
    status: 'Active',
  },
  {
    id: '27',
    symbol: 'DOW/USD',
    pipPosition: 2,
    digit: 2,
    bid: 38500.75,
    ask: 38500.80,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '28',
    symbol: 'FTSE/USD',
    pipPosition: 2,
    digit: 2,
    bid: 7650.25,
    ask: 7650.30,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '29',
    symbol: 'DAX/USD',
    pipPosition: 2,
    digit: 2,
    bid: 16850.50,
    ask: 16850.75,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
  {
    id: '30',
    symbol: 'NIKKEI/USD',
    pipPosition: 2,
    digit: 2,
    bid: 32500.75,
    ask: 32500.80,
    assetClass: 'Index',
    leverageProfile: '1:100',
    status: 'Active',
  },
]

const columnHelper = createColumnHelper<SymbolData>()

const SymbolsTable: React.FC = () => {
  console.log('SymbolsTable component rendering') // Debug log
  
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

  // Symbols data state
  const [symbolsData, setSymbolsData] = useState<SymbolData[]>(mockSymbolsData)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editingSymbol, setEditingSymbol] = useState<SymbolData | null>(null)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)

  // Define columns
  const columns = [
    columnHelper.accessor('id', {
      header: 'Symbol ID',
      cell: ({ getValue }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: ({ getValue }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {getValue().includes('BTC') || getValue().includes('ETH') ? (
              <Bitcoin className="w-4 h-4 text-white" />
            ) : getValue().includes('EUR') || getValue().includes('GBP') ? (
              <Euro className="w-4 h-4 text-white" />
            ) : getValue().includes('GOLD') || getValue().includes('OIL') ? (
              <DollarSign className="w-4 h-4 text-white" />
            ) : getValue().includes('SPX') || getValue().includes('NDX') ? (
              <BarChart3 className="w-4 h-4 text-white" />
            ) : (
              <Globe className="w-4 h-4 text-white" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {getValue()}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('pipPosition', {
      header: 'Pip Position',
      cell: ({ getValue }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('digit', {
      header: 'Digit',
      cell: ({ getValue }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('bid', {
      header: 'Bid',
      cell: ({ getValue }) => (
        <div className="font-medium text-green-600 dark:text-green-400">
          {getValue().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
        </div>
      ),
    }),
    columnHelper.accessor('ask', {
      header: 'Ask',
      cell: ({ getValue }) => (
        <div className="font-medium text-red-600 dark:text-red-400">
          {getValue().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
        </div>
      ),
    }),
    columnHelper.accessor('assetClass', {
      header: 'Asset Class',
      cell: ({ getValue }) => {
        const assetClass = getValue()
        const getAssetClassColor = (assetClass: string) => {
          switch (assetClass.toLowerCase()) {
            case 'stock':
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            case 'crypto':
              return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
            case 'forex':
              return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'commodity':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            case 'index':
              return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAssetClassColor(assetClass)}`}>
            {assetClass}
          </span>
        )
      },
    }),
    columnHelper.accessor('leverageProfile', {
      header: 'Leverage Profile',
      cell: ({ getValue }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue()
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'Active':
              return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'Inactive':
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            case 'Suspended':
              return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row.original)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }),
  ]

  // Table instance
  const table = useReactTable({
    data: symbolsData,
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

  // Action handlers
  const handleView = (symbol: SymbolData) => {
    console.log('View symbol:', symbol)
    // Implement view functionality
  }

  const handleEdit = (symbol: SymbolData) => {
    console.log('Edit symbol:', symbol)
    setEditingSymbol(symbol)
    setShowEditPopup(true)
  }

  const handleDelete = (symbol: SymbolData) => {
    console.log('Delete symbol:', symbol)
    // Implement delete functionality
  }

  const handleUpdateSymbol = (updatedSymbol: any) => {
    console.log('Updating symbol:', updatedSymbol)
    // Update the symbol in the data
    setSymbolsData(prevData => 
      prevData.map(symbol => 
        symbol.id === editingSymbol?.id ? { ...symbol, ...updatedSymbol } : symbol
      )
    )
    setShowEditPopup(false)
    setEditingSymbol(null)
  }

  const handleRefresh = () => {
    console.log('Refreshing symbols data...')
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
              placeholder="Search symbols..."
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
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Symbol</span>
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
                  Download Symbols Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Upload">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Symbols Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Settings">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Symbol Settings
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Alerts">
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Symbol Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={() => setShowColumnVisibility(!showColumnVisibility)}
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
                  Symbol Info
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
                placeholder="Search symbols..."
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
                  onClick={() => handleEdit(row.original)}
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

        {/* Professional Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            {/* Left side - Results info and page size selector */}
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{' '}
                of <span className="font-semibold text-gray-900 dark:text-white">{table.getFilteredRowModel().rows.length}</span> results
              </span>
            </div>
            
            {/* Right side - Pagination controls */}
            <div className="table-footer-right">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Column Visibility</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show or hide table columns</p>
                </div>
              </div>
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Column Toggles */}
            <div className="p-4 space-y-3">
              {table.getAllLeafColumns()
                .filter(column => column.id !== 'actions')
                .map(column => (
                  <div key={column.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={column.id}
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={column.id}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                    </label>
                  </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Symbol Popup */}
      <EditSymbolPopup
        isOpen={showEditPopup}
        onClose={() => {
          setShowEditPopup(false)
          setEditingSymbol(null)
        }}
        onSubmit={handleUpdateSymbol}
        initialData={editingSymbol ? {
          symbolName: editingSymbol.symbol,
          assetClass: editingSymbol.assetClass,
          digit: editingSymbol.digit,
          maintenanceMargin: '',
          baseAsset: editingSymbol.symbol.split('/')[0] || '',
          category: 'Default Category',
          lotSize: 10000,
          lastTradeDate: '',
          quoteAsset: editingSymbol.symbol.split('/')[1] || '',
          status: editingSymbol.status,
          units: editingSymbol.symbol.split('/')[0] || '',
          expirationDate: '',
          description: `${editingSymbol.symbol} trading pair`,
          pipPosition: editingSymbol.pipPosition,
          timeZone: '(UTC-6:00- With DST )US(Chicago)',
          leverageProfile: editingSymbol.leverageProfile
        } : undefined}
      />
    </div>
  )
}

export default SymbolsTable 