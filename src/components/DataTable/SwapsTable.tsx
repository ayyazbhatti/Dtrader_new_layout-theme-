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
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertTriangle,
  Info,
  X,
  RefreshCw as SwapIcon,
} from 'lucide-react'
import { CSS_CLASSES } from './constants'
import CreateSwapPopup from './CreateSwapPopup'
import EditSwapPopup from './EditSwapPopup'

// Define the swap data type
interface SwapData {
  id: string
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: 'Active' | 'Inactive' | 'Suspended' | 'Maintenance'
  lastUpdated: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
}

// Define the swap form data type for creating/editing
interface SwapFormData {
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
}

// Mock data for swap profiles
const mockSwapsData: SwapData[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    instrument: 'Forex',
    longSwap: 2.50,
    shortSwap: -3.20,
    longSwapPercent: 0.025,
    shortSwapPercent: -0.032,
    profile: 'Default Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Standard swap dividend profile for regular trading accounts with competitive rates and standard commission structure',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 1000000,
    commission: 0.1,
  },
  {
    id: '2',
    symbol: 'GBP/USD',
    instrument: 'Forex',
    longSwap: 3.15,
    shortSwap: -4.10,
    longSwapPercent: 0.032,
    shortSwapPercent: -0.041,
    profile: 'Premium Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Enhanced swap dividend profile for premium accounts with improved rates and lower commission fees',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 1000000,
    commission: 0.15,
  },
  {
    id: '3',
    symbol: 'USD/JPY',
    instrument: 'Forex',
    longSwap: 1.80,
    shortSwap: -2.45,
    longSwapPercent: 0.018,
    shortSwapPercent: -0.025,
    profile: 'Default Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'VIP swap dividend profile for high-value accounts with exclusive rates and premium support',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 1000000,
    commission: 0.12,
  },
  {
    id: '4',
    symbol: 'BTC/USD',
    instrument: 'Crypto',
    longSwap: 15.50,
    shortSwap: -18.75,
    longSwapPercent: 0.155,
    shortSwapPercent: -0.188,
    profile: 'VIP Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Bitcoin/US Dollar cryptocurrency swap rates',
    currency: 'USD',
    minVolume: 100,
    maxVolume: 100000,
    commission: 0.25,
  },
  {
    id: '5',
    symbol: 'ETH/USD',
    instrument: 'Crypto',
    longSwap: 12.30,
    shortSwap: -14.90,
    longSwapPercent: 0.123,
    shortSwapPercent: -0.149,
    profile: 'Premium Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Ethereum/US Dollar cryptocurrency swap rates',
    currency: 'USD',
    minVolume: 100,
    maxVolume: 100000,
    commission: 0.22,
  },
  {
    id: '6',
    symbol: 'XAU/USD',
    instrument: 'Commodity',
    longSwap: 8.75,
    shortSwap: -10.20,
    longSwapPercent: 0.088,
    shortSwapPercent: -0.102,
    profile: 'Professional Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Gold/US Dollar commodity swap rates',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 500000,
    commission: 0.18,
  },
  {
    id: '7',
    symbol: 'AAPL',
    instrument: 'Stock',
    longSwap: 5.25,
    shortSwap: -6.80,
    longSwapPercent: 0.053,
    shortSwapPercent: -0.068,
    profile: 'Default Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Apple Inc. stock swap rates',
    currency: 'USD',
    minVolume: 100,
    maxVolume: 10000,
    commission: 0.15,
  },
  {
    id: '8',
    symbol: 'SPX',
    instrument: 'Index',
    longSwap: 4.20,
    shortSwap: -5.10,
    longSwapPercent: 0.042,
    shortSwapPercent: -0.051,
    profile: 'Premium Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'S&P 500 Index swap rates',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 100000,
    commission: 0.12,
  },
  {
    id: '9',
    symbol: 'WTI',
    instrument: 'Commodity',
    longSwap: 6.80,
    shortSwap: -8.45,
    longSwapPercent: 0.068,
    shortSwapPercent: -0.085,
    profile: 'Default Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'West Texas Intermediate crude oil swap rates',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 500000,
    commission: 0.20,
  },
  {
    id: '10',
    symbol: 'AUD/USD',
    instrument: 'Forex',
    longSwap: 2.90,
    shortSwap: -3.75,
    longSwapPercent: 0.029,
    shortSwapPercent: -0.038,
    profile: 'Default Swap Dividend',
    status: 'Active',
    lastUpdated: '2024-01-15 14:30:00',
    description: 'Australian Dollar/US Dollar currency pair swap rates',
    currency: 'USD',
    minVolume: 1000,
    maxVolume: 1000000,
    commission: 0.13,
  },
]

const columnHelper = createColumnHelper<SwapData>()

const SwapsTable: React.FC = () => {
  console.log('SwapsTable component rendering') // Debug log
  
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

  // Swaps data state
  const [swapsData, setSwapsData] = useState<SwapData[]>(mockSwapsData)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editingSwap, setEditingSwap] = useState<SwapData | null>(null)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showCreatePopup, setShowCreatePopup] = useState(false)

  // Define columns
  const columns = [
    columnHelper.accessor('profile', {
      header: 'Name',
      cell: ({ getValue, row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <SwapIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {getValue()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.original.status}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue, row }) => (
        <div className="text-gray-600 dark:text-gray-300 max-w-xs">
          <div className="font-medium text-gray-900 dark:text-white mb-1">
            {getValue()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.symbol} • {row.original.instrument} • {row.original.currency}
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
    data: swapsData,
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
  const handleView = (swap: SwapData) => {
    console.log('View swap:', swap)
    // Implement view functionality
  }

  const handleEdit = (swap: SwapData) => {
    console.log('Edit swap:', swap)
    setEditingSwap(swap)
    setShowEditPopup(true)
  }

  const handleDelete = (swap: SwapData) => {
    console.log('Delete swap:', swap)
    // Implement delete functionality
  }

  const handleUpdateSwap = (updatedSwap: SwapFormData) => {
    console.log('Updating swap:', updatedSwap)
    // Update the swap in the data
    setSwapsData(prevData => 
      prevData.map(swap => 
        swap.id === editingSwap?.id ? { 
          ...swap, 
          ...updatedSwap,
          status: updatedSwap.status as 'Active' | 'Inactive' | 'Suspended' | 'Maintenance',
          lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' ')
        } : swap
      )
    )
    setShowEditPopup(false)
    setEditingSwap(null)
  }

  const handleCreateSwap = (newSwap: SwapFormData) => {
    console.log('Creating new swap:', newSwap)
    // Create new swap with unique ID
    const swapToAdd = {
      id: (swapsData.length + 1).toString(),
      symbol: newSwap.symbol,
      instrument: newSwap.instrument,
      longSwap: newSwap.longSwap,
      shortSwap: newSwap.shortSwap,
      longSwapPercent: newSwap.longSwapPercent,
      shortSwapPercent: newSwap.shortSwapPercent,
      profile: newSwap.profile,
      status: newSwap.status as 'Active' | 'Inactive' | 'Suspended' | 'Maintenance',
      lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' '),
      description: newSwap.description,
      currency: newSwap.currency,
      minVolume: newSwap.minVolume,
      maxVolume: newSwap.maxVolume,
      commission: newSwap.commission,
    }
    setSwapsData(prevData => [...prevData, swapToAdd])
    setShowCreatePopup(false)
  }

  const handleRefresh = () => {
    console.log('Refreshing swaps data...')
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
              placeholder="Search swap profiles..."
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
              <span>Add Profile</span>
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
                  Download Swaps Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Upload">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Swaps Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Settings">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Swap Settings
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Alerts">
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Swap Alerts
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
                  Swap Info
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
              placeholder="Search swap profiles..."
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
                  disabled={!table.getCanPreviousPage()}
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

      {/* Edit Swap Popup */}
      {showEditPopup && editingSwap && (
        <EditSwapPopup
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          onSubmit={handleUpdateSwap}
          initialData={editingSwap}
        />
      )}

      {/* Create Swap Popup */}
      {showCreatePopup && (
        <CreateSwapPopup
          isOpen={showCreatePopup}
          onClose={() => setShowCreatePopup(false)}
          onSubmit={handleCreateSwap}
        />
      )}
    </div>
  )
}

export default SwapsTable 