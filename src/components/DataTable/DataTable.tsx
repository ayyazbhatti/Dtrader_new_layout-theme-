import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
  SortingState,
  ColumnResizeMode,
  VisibilityState,
  RowSelectionState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import {
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Download,
  Upload,
  Eye,
  Trash2,
  Bot,
  Tag,
  Link,
  User,
  Users,
  Bell,
  Search,
  X,
  Check,
} from 'lucide-react'

// Local imports
import { UserData, ContextMenuState } from './types'
import { mockUserData, COLUMN_CONFIGS } from './data'
import { getSortIcon, formatCurrency, formatMarginLevel, formatPnL, calculateColumnStats } from './utils'
import { useContextMenu, useKeyboardShortcuts } from './hooks'
import { TABLE_CONFIG, CSS_CLASSES, CONTEXT_MENU_OPTIONS } from './constants'

const columnHelper = createColumnHelper<UserData>()

/**
 * Professional DataTable Component
 * 
 * Features:
 * - Advanced filtering with Google Sheets-style interface
 * - Context menu for column operations
 * - Professional styling with dark mode support
 * - Financial data formatting and statistics
 * - Responsive design with keyboard shortcuts
 */
const DataTable: React.FC = () => {
  // State management
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [showFilters, setShowFilters] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    columnId: '',
    columnName: ''
  })
  const [columnVisibilityMenu, setColumnVisibilityMenu] = useState<{
    show: boolean
    x: number
    y: number
  }>({
    show: false,
    x: 0,
    y: 0
  })

  // Value filter state
  const [valueFilter, setValueFilter] = useState<{
    show: boolean
    columnId: string
    columnName: string
    values: string[]
    selectedValues: string[]
    position?: { left: number; top: number }
  }>({
    show: false,
    columnId: '',
    columnName: '',
    values: [],
    selectedValues: []
  })

  // Condition filter state
  const [conditionFilter, setConditionFilter] = useState<{
    show: boolean
    columnId: string
    columnName: string
    selectedCondition: string
    filterValue: string
    filterValue2?: string
    position?: { left: number; top: number }
  }>({
    show: false,
    columnId: '',
    columnName: '',
    selectedCondition: 'None',
    filterValue: '',
    filterValue2: ''
  })

  // Data
  const data = useMemo(() => mockUserData, [])

  // Column definitions
  const columns = useMemo(
    () => [
      // Selection column
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        enableSorting: false,
        size: 50,
      }),

      // Online status
      columnHelper.accessor('online', {
        header: 'Online',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${getValue() ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className={`text-xs font-medium ${getValue() ? CSS_CLASSES.STATUS_ONLINE : CSS_CLASSES.STATUS_OFFLINE}`}>
              {getValue() ? 'Online' : 'Offline'}
            </span>
          </div>
        ),
        size: 80,
      }),

      // Bot status
      columnHelper.accessor('botStatus', {
        header: 'Bot Status',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${getValue() ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className={`text-xs font-medium ${getValue() ? CSS_CLASSES.STATUS_ACTIVE : CSS_CLASSES.STATUS_INACTIVE}`}>
              {getValue() ? 'Active' : 'Inactive'}
            </span>
          </div>
        ),
        size: 100,
      }),

      // Account ID
      columnHelper.accessor('accountId', {
        header: 'Account Id',
        cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
        size: 120,
      }),

      // Name
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 150,
      }),

      // Email
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => <span className="text-blue-600 dark:text-blue-400">{getValue()}</span>,
        size: 200,
      }),

      // Group
      columnHelper.accessor('group', {
        header: 'Group',
        cell: ({ getValue }) => <span>{getValue()}</span>,
        size: 120,
      }),

      // Referral
      columnHelper.accessor('referral', {
        header: 'Referral',
        cell: ({ getValue }) => <span className="font-mono text-sm">{getValue()}</span>,
        size: 100,
      }),

      // Leverage
      columnHelper.accessor('leverage', {
        header: 'Leverage',
        cell: ({ getValue }) => <span className="text-right">{getValue()}</span>,
        size: 100,
      }),

      // Balance
      columnHelper.accessor('balance', {
        header: 'Balance',
        cell: ({ getValue }) => (
          <span className="text-right font-mono text-gray-900 dark:text-gray-100">
            {formatCurrency(getValue())}
          </span>
        ),
        size: 120,
      }),

      // Equity
      columnHelper.accessor('equity', {
        header: 'Equity',
        cell: ({ getValue }) => (
          <span className="text-right font-mono text-gray-900 dark:text-gray-100">
            {formatCurrency(getValue())}
          </span>
        ),
        size: 120,
      }),

      // Margin Level
      columnHelper.accessor('marginLevel', {
        header: 'Margin Level',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatMarginLevel(getValue())
          return (
            <span className="text-right font-mono">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                {value}
              </span>
            </span>
          )
        },
        size: 130,
      }),

      // Unrealized PnL
      columnHelper.accessor('unrealizedPnL', {
        header: 'Unrealized PnL',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-mono font-medium ${colorClass}`}>{value}</span>
        },
        size: 140,
      }),

      // Realized PnL
      columnHelper.accessor('realizedPnL', {
        header: 'Realized PnL',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-mono font-medium ${colorClass}`}>{value}</span>
        },
        size: 140,
      }),

      // Bot Profit
      columnHelper.accessor('botProfit', {
        header: 'Bot Profit',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-mono font-medium ${colorClass}`}>{value}</span>
        },
        size: 120,
      }),

      // Bot Setting
      columnHelper.accessor('botSetting', {
        header: 'Bot Setting',
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
        size: 140,
      }),

      // Bot Subscription
      columnHelper.accessor('botSubscription', {
        header: 'Bot Subscription',
        cell: ({ getValue }) => (
          <div className={`w-3 h-3 rounded-full ${getValue() ? 'bg-green-500' : 'bg-gray-400'}`} />
        ),
        size: 130,
      }),

      // Bot Enabled
      columnHelper.accessor('botEnabled', {
        header: 'Bot Enabled',
        cell: ({ getValue }) => (
          <div className={`w-3 h-3 rounded-full ${getValue() ? 'bg-green-500' : 'bg-gray-400'}`} />
        ),
        size: 120,
      }),

      // Show Bot Settings
      columnHelper.accessor('showBotSettings', {
        header: 'Show Bot Settings',
        cell: ({ getValue }) => (
          <div className={`w-3 h-3 rounded-full ${getValue() ? 'bg-green-500' : 'bg-gray-400'}`} />
        ),
        size: 130,
      }),

      // Actions
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center space-x-1">
            <button 
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200"
              title="Bot Settings"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-all duration-200"
              title="Tag User"
            >
              <Tag className="w-4 h-4" />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all duration-200"
              title="View Details"
            >
              <Link className="w-4 h-4" />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 120,
      }),
    ],
    []
  )

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: TABLE_CONFIG.COLUMN_RESIZE_MODE,
    enableColumnResizing: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enableRowSelection: true,
    enableColumnFilters: true,
  })

  // Event handlers
  const handleContextMenu = (e: React.MouseEvent, columnId: string, columnName: string) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      columnId,
      columnName
    })
  }

  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, show: false }))
  }

  const handleColumnVisibilityMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setColumnVisibilityMenu(prev => ({
      show: !prev.show,
      x: e.clientX,
      y: e.clientY
    }))
  }

  const closeColumnVisibilityMenu = () => {
    setColumnVisibilityMenu(prev => ({ ...prev, show: false }))
  }

  // Value filter functions
  const showValueFilter = (columnId: string, columnName: string) => {
    // Get unique values from the column
    const columnValues = data.map(row => {
      const value = row[columnId as keyof UserData]
      if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No'
      }
      if (typeof value === 'number') {
        return value.toString()
      }
      return String(value)
    })
    
    const uniqueValues = [...new Set(columnValues)].sort()
    
    // Calculate optimal position for the popup
    const popupWidth = 400
    const popupHeight = 400
    const margin = 20
    
    let left = contextMenu.x
    let top = contextMenu.y + 50
    
    // Adjust horizontal position to keep popup within viewport
    if (left + popupWidth > window.innerWidth - margin) {
      left = window.innerWidth - popupWidth - margin
    }
    if (left < margin) {
      left = margin
    }
    
    // Adjust vertical position to keep popup within viewport
    if (top + popupHeight > window.innerHeight - margin) {
      // Show above the context menu if there's not enough space below
      top = contextMenu.y - popupHeight - 10
    }
    if (top < margin) {
      top = margin
    }
    
    setValueFilter({
      show: true,
      columnId,
      columnName,
      values: uniqueValues,
      selectedValues: [],
      position: { left, top }
    })
  }

  const closeValueFilter = () => {
    setValueFilter(prev => ({ ...prev, show: false }))
  }

  const applyValueFilter = () => {
    if (valueFilter.selectedValues.length > 0) {
      // Apply the filter to the table
      table.getColumn(valueFilter.columnId)?.setFilterValue(valueFilter.selectedValues)
    }
    closeValueFilter()
  }

  const resetValueFilter = () => {
    table.getColumn(valueFilter.columnId)?.setFilterValue(undefined)
    closeValueFilter()
  }

  // Condition filter functions
  const showConditionFilter = (columnId: string, columnName: string) => {
    // Calculate optimal position for the popup
    const popupWidth = 350
    const popupHeight = 400
    const margin = 20
    
    let left = contextMenu.x
    let top = contextMenu.y + 50
    
    // Adjust horizontal position to keep popup within viewport
    if (left + popupWidth > window.innerWidth - margin) {
      left = window.innerWidth - popupWidth - margin
    }
    if (left < margin) {
      left = margin
    }
    
    // Adjust vertical position to keep popup within viewport
    if (top + popupHeight > window.innerHeight - margin) {
      // Show above the context menu if there's not enough space below
      top = contextMenu.y - popupHeight - 10
    }
    if (top < margin) {
      top = margin
    }
    
    setConditionFilter({
      show: true,
      columnId,
      columnName,
      selectedCondition: 'None',
      filterValue: '',
      filterValue2: '',
      position: { left, top }
    })
  }

  const closeConditionFilter = () => {
    setConditionFilter(prev => ({ ...prev, show: false }))
  }

  const applyConditionFilter = () => {
    if (conditionFilter.selectedCondition !== 'None') {
      // Apply the condition filter to the table
      const filterConfig = {
        condition: conditionFilter.selectedCondition,
        value: conditionFilter.filterValue,
        value2: conditionFilter.filterValue2
      }
      table.getColumn(conditionFilter.columnId)?.setFilterValue(filterConfig)
    }
    closeConditionFilter()
  }

  const resetConditionFilter = () => {
    table.getColumn(conditionFilter.columnId)?.setFilterValue(undefined)
    closeConditionFilter()
  }

  // Custom hooks
  useContextMenu(contextMenu, closeContextMenu, columnVisibilityMenu, closeColumnVisibilityMenu)
  useKeyboardShortcuts(table, showFilters, setShowFilters)

  return (
    <div className="space-y-6 relative">
      {/* Enhanced Table Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Controls */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">

              <button 
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Export Data - Download table data as CSV/Excel"
                onClick={() => console.log('Export Data clicked')}
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
                onClick={() => console.log('Import Data clicked')}
              >
                <Upload className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Import Data
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>

              <button 
                onClick={handleColumnVisibilityMenu}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                title="Column Visibility - Show/hide table columns"
              >
                <Eye className="w-4 h-4" />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {table.getFilteredRowModel().rows.length} of {table.getPrePaginationRowModel().rows.length} rows
              </span>
              {Object.keys(rowSelection).length > 0 && (
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {Object.keys(rowSelection).length} selected
                </span>
              )}
              {columnFilters.length > 0 && (
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium flex items-center">
                  <Filter className="w-3 h-3 mr-1" />
                  {columnFilters.length} active filters
                </span>
              )}
              {/* Filtered columns summary */}
              {columnFilters.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Filtered:</span>
                  <div className="flex flex-wrap gap-1">
                    {table.getAllColumns()
                      .filter(column => column.getFilterValue())
                      .map(column => (
                        <span
                          key={column.id}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full"
                        >
                          {column.columnDef.header as string}
                          <button
                            onClick={() => column.setFilterValue(undefined)}
                            className="ml-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search all columns..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-w-[300px]"
              />
            </div>
            
            <button
              onClick={() => table.toggleAllPageRowsSelected()}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {table.getIsAllPageRowsSelected() ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      </div>

      {/* Google Sheets Style Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {/* First Row - 4 filters in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Row - 5 filters */}
            <div className="space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Online Status</label>
              <select
                value={columnFilters.find(f => f.id === 'online')?.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    table.getColumn('online')?.setFilterValue(value === 'true')
                  } else {
                    table.getColumn('online')?.setFilterValue(undefined)
                  }
                }}
                className={`w-full ${CSS_CLASSES.INPUT_BASE}`}
              >
                <option value="">All Status</option>
                <option value="true">Online Only</option>
                <option value="false">Offline Only</option>
              </select>
            </div>

            <div className="space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bot Status</label>
              <select
                value={columnFilters.find(f => f.id === 'botStatus')?.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    table.getColumn('botStatus')?.setFilterValue(value === 'true')
                  } else {
                    table.getColumn('botStatus')?.setFilterValue(undefined)
                  }
                }}
                className={`w-full ${CSS_CLASSES.INPUT_BASE}`}
              >
                <option value="">All Bot Status</option>
                <option value="true">Active Bots</option>
                <option value="false">Inactive Bots</option>
              </select>
            </div>

            <div className="space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
              <select
                value={columnFilters.find(f => f.id === 'group')?.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    table.getColumn('group')?.setFilterValue(value)
                  } else {
                    table.getColumn('group')?.setFilterValue(undefined)
                  }
                }}
                className={`w-full ${CSS_CLASSES.INPUT_BASE}`}
              >
                <option value="">All Groups</option>
                {COLUMN_CONFIGS.GROUP_OPTIONS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bot Subscription</label>
              <select
                value={columnFilters.find(f => f.id === 'botSubscription')?.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    table.getColumn('botSubscription')?.setFilterValue(value === 'true')
                  } else {
                    table.getColumn('botSubscription')?.setFilterValue(undefined)
                  }
                }}
                className={`w-full ${CSS_CLASSES.INPUT_BASE}`}
              >
                <option value="">All Subscriptions</option>
                <option value="true">Subscribed</option>
                <option value="false">Not Subscribed</option>
              </select>
            </div>
          </div>

          {/* Second Row - Balance Range and PnL Type with absolute separation */}
          <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-4 lg:space-y-0">
            <div className="lg:w-2/3 space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Balance Range</label>
              <div className="flex space-x-4">
                <select
                  value={(columnFilters.find(f => f.id === 'balance')?.value as any)?.min || ''}
                  onChange={(e) => {
                    const min = e.target.value ? parseFloat(e.target.value) : undefined
                    const max = (columnFilters.find(f => f.id === 'balance')?.value as any)?.max
                    table.getColumn('balance')?.setFilterValue({ min, max })
                  }}
                  className={`flex-1 min-w-0 max-w-[200px] ${CSS_CLASSES.INPUT_BASE}`}
                >
                  <option value="">Min Balance</option>
                  <option value="0">$0</option>
                  <option value="100">$100</option>
                  <option value="500">$500</option>
                  <option value="1000">$1,000</option>
                  <option value="5000">$5,000</option>
                  <option value="10000">$10,000</option>
                  <option value="50000">$50,000</option>
                  <option value="100000">$100,000</option>
                </select>
                <select
                  value={(columnFilters.find(f => f.id === 'balance')?.value as any)?.max || ''}
                  onChange={(e) => {
                    const max = e.target.value ? parseFloat(e.target.value) : undefined
                    const min = (columnFilters.find(f => f.id === 'balance')?.value as any)?.min
                    table.getColumn('balance')?.setFilterValue({ min, max })
                  }}
                  className={`flex-1 min-w-0 max-w-[200px] ${CSS_CLASSES.INPUT_BASE}`}
                >
                  <option value="">Max Balance</option>
                  <option value="100">$100</option>
                  <option value="500">$500</option>
                  <option value="1000">$1,000</option>
                  <option value="5000">$5,000</option>
                  <option value="10000">$10,000</option>
                  <option value="50000">$50,000</option>
                  <option value="100000">$100,000</option>
                  <option value="500000">$500,000</option>
                  <option value="1000000">$1,000,000</option>
                </select>
              </div>
            </div>

            <div className="lg:w-1/3 space-y-2 min-w-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">PnL Type</label>
              <select
                value={columnFilters.find(f => f.id === 'unrealizedPnL')?.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    table.getColumn('unrealizedPnL')?.setFilterValue(value)
                  } else {
                    table.getColumn('unrealizedPnL')?.setFilterValue(undefined)
                  }
                }}
                className={`w-full max-w-[200px] ${CSS_CLASSES.INPUT_BASE}`}
              >
                <option value="">All PnL</option>
                <option value="positive">Positive PnL</option>
                <option value="negative">Negative PnL</option>
                <option value="zero">Zero PnL</option>
              </select>
            </div>
          </div>
        </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {table.getFilteredRowModel().rows.length} of {table.getPrePaginationRowModel().rows.length} rows filtered
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  table.resetColumnFilters()
                  setColumnFilters([])
                }}
                className={CSS_CLASSES.BUTTON_SECONDARY}
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className={CSS_CLASSES.BUTTON_PRIMARY}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Table */}
      <div className={CSS_CLASSES.TABLE_CONTAINER}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={CSS_CLASSES.TABLE_HEADER}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} style={{ height: '52px' }}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`relative border-r border-gray-200 dark:border-gray-600 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider select-none group ${
                        header.column.getFilterValue() ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700' : ''
                      }`}
                      style={{ width: header.getSize() }}
                    >
                      <div 
                        className="px-4 py-3 flex items-center justify-between cursor-pointer"
                        onContextMenu={(e) => handleContextMenu(e, header.column.id, header.column.columnDef.header as string)}
                      >
                        <div className="flex items-center space-x-2">
                          {header.isPlaceholder ? null : (
                            <>
                              <span className="font-medium">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                              {header.column.getCanSort() && (
                                <button
                                  onClick={header.column.getToggleSortingHandler()}
                                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                                >
                                  {getSortIcon(header.column)}
                                </button>
                              )}
                              {/* Filter indicator */}
                              {header.column.getFilterValue() && (
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                                    Filtered
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize transition-all duration-200 ${
                            header.column.getIsResizing()
                              ? 'bg-blue-500 opacity-100'
                              : 'bg-transparent hover:bg-blue-400 hover:opacity-80 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                          }`}
                          style={{ zIndex: 10 }}
                          title="Drag to resize column"
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {table.getRowModel().rows.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={`${CSS_CLASSES.TABLE_ROW} ${
                    row.getIsSelected() 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
                      : ''
                  } ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                  style={{ height: '48px' }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-r border-gray-100 dark:border-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                      style={{ width: cell.column.getSize() }}
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

      {/* Enhanced Pagination */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Page Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </span>
            {Object.keys(rowSelection).length > 0 && (
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                ({Object.keys(rowSelection).length} selected)
              </span>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                title="First page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                  const pageIndex = table.getState().pagination.pageIndex
                  const pageCount = table.getPageCount()
                  let pageNumber
                  
                  if (pageCount <= 5) {
                    pageNumber = i + 1
                  } else if (pageIndex <= 2) {
                    pageNumber = i + 1
                  } else if (pageIndex >= pageCount - 3) {
                    pageNumber = pageCount - 4 + i
                  } else {
                    pageNumber = pageIndex - 1 + i
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => table.setPageIndex(pageNumber - 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        pageNumber === pageIndex + 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                title="Last page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>

            {/* Rows per page */}
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {COLUMN_CONFIGS.PAGE_SIZE_OPTIONS.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sheets Style Context Menu */}
      {contextMenu.show && (
        <div
          data-context-menu
          className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-3 min-w-[220px]"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          {/* Filter Options */}
          <div className="px-3 py-2">
            <button
              onClick={() => {
                // Filter by condition - show condition filter dropdown
                showConditionFilter(contextMenu.columnId, contextMenu.columnName)
                closeContextMenu()
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center justify-between"
            >
              <span>Filter by condition</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Filter by values - show value-based filter
                showValueFilter(contextMenu.columnId, contextMenu.columnName)
                closeContextMenu()
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center justify-between"
            >
              <span>Filter by values</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="px-3 py-2 border-t border-gray-700 flex space-x-2">
            <button
              onClick={() => {
                // Reset filter logic
                table.getColumn(contextMenu.columnId)?.setFilterValue(undefined)
                closeContextMenu()
              }}
              className="flex-1 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={() => {
                // Apply filter logic - this will be handled by the specific filter popups
                closeContextMenu()
              }}
              className="flex-1 px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Value Filter Popup */}
      {valueFilter.show && (
        <div
          className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-3 min-w-[280px] max-w-[400px]"
          style={{
            left: valueFilter.position?.left ?? Math.min(contextMenu.x, window.innerWidth - 400),
            top: valueFilter.position?.top ?? Math.min(contextMenu.y + 50, window.innerHeight - 400),
          }}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="text-sm font-medium text-white">
              Filter {valueFilter.columnName}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Select values to filter by
            </div>
          </div>

          {/* Value List */}
          <div className="px-4 py-3 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {valueFilter.values.map((value) => (
                <label key={value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={valueFilter.selectedValues.includes(value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValueFilter(prev => ({
                          ...prev,
                          selectedValues: [...prev.selectedValues, value]
                        }))
                      } else {
                        setValueFilter(prev => ({
                          ...prev,
                          selectedValues: prev.selectedValues.filter(v => v !== value)
                        }))
                      }
                    }}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
                  />
                  <span className="text-sm text-white">
                    {value}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-3 border-t border-gray-700 flex space-x-2">
            <button
              onClick={resetValueFilter}
              className="flex-1 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={applyValueFilter}
              className="flex-1 px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Condition Filter Dropdown */}
      {conditionFilter.show && (
        <div
          className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-0 min-w-[280px] max-w-[350px]"
          style={{
            left: conditionFilter.position?.left ?? Math.min(contextMenu.x, window.innerWidth - 350),
            top: conditionFilter.position?.top ?? Math.min(contextMenu.y + 50, window.innerHeight - 400),
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-blue-600 rounded-t-lg">
            <div className="text-sm font-medium text-white text-center">
              {conditionFilter.selectedCondition}
            </div>
          </div>

          {/* Filter Conditions List */}
          <div className="py-2 max-h-64 overflow-y-auto">
            <div className="space-y-0">
              {/* Text-based Filters */}
              <div className="px-4 py-2">
                <div className="text-xs text-gray-400 mb-2">Text Filters</div>
                {[
                  'Is empty',
                  'Is not empty',
                  'Text contains',
                  'Text does not contain',
                  'Text starts with',
                  'Text ends with',
                  'Text is exactly'
                ].map((condition) => (
                  <div
                    key={condition}
                    onClick={() => setConditionFilter(prev => ({ ...prev, selectedCondition: condition }))}
                    className={`px-3 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200 ${
                      conditionFilter.selectedCondition === condition ? 'bg-blue-600' : ''
                    }`}
                  >
                    {condition}
                  </div>
                ))}
              </div>

              {/* Date-based Filters */}
              <div className="px-4 py-2 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Date Filters</div>
                {[
                  'Date is before',
                  'Date is after'
                ].map((condition) => (
                  <div
                    key={condition}
                    onClick={() => setConditionFilter(prev => ({ ...prev, selectedCondition: condition }))}
                    className={`px-3 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200 ${
                      conditionFilter.selectedCondition === condition ? 'bg-blue-600' : ''
                    }`}
                  >
                    {condition}
                  </div>
                ))}
              </div>

              {/* Numerical/Comparison Filters */}
              <div className="px-4 py-2 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Number Filters</div>
                {[
                  'Greater than',
                  'Less than',
                  'Greater than or equal to',
                  'Less than or equal to'
                ].map((condition) => (
                  <div
                    key={condition}
                    onClick={() => setConditionFilter(prev => ({ ...prev, selectedCondition: condition }))}
                    className={`px-3 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200 ${
                      conditionFilter.selectedCondition === condition ? 'bg-blue-600' : ''
                    }`}
                  >
                    {condition}
                  </div>
                ))}
              </div>

              {/* Equality/Range Filters */}
              <div className="px-4 py-2 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Comparison Filters</div>
                {[
                  'Is equal to',
                  'Is not equal to',
                  'Is between',
                  'Is not between'
                ].map((condition) => (
                  <div
                    key={condition}
                    onClick={() => setConditionFilter(prev => ({ ...prev, selectedCondition: condition }))}
                    className={`px-3 py-2 text-sm text-white cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200 ${
                      conditionFilter.selectedCondition === condition ? 'bg-blue-600' : ''
                    }`}
                  >
                    {condition}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Value Input */}
          {conditionFilter.selectedCondition !== 'None' && !['Is empty', 'Is not empty'].includes(conditionFilter.selectedCondition) && (
            <div className="px-4 py-3 border-t border-gray-700">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Value</label>
                  <input
                    type="text"
                    value={conditionFilter.filterValue}
                    onChange={(e) => setConditionFilter(prev => ({ ...prev, filterValue: e.target.value }))}
                    placeholder="Enter value..."
                    className="w-full px-3 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Second value for range filters */}
                {['Is between', 'Is not between'].includes(conditionFilter.selectedCondition) && (
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Second Value</label>
                    <input
                      type="text"
                      value={conditionFilter.filterValue2 || ''}
                      onChange={(e) => setConditionFilter(prev => ({ ...prev, filterValue2: e.target.value }))}
                      placeholder="Enter second value..."
                      className="w-full px-3 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-4 py-3 border-t border-gray-700 flex space-x-2">
            <button
              onClick={resetConditionFilter}
              className="flex-1 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={applyConditionFilter}
              className="flex-1 px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Column Visibility Menu */}
      {columnVisibilityMenu.show && (
        <div
          data-column-menu
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[250px]"
          style={{
            left: columnVisibilityMenu.x,
            top: columnVisibilityMenu.y,
          }}
        >
          {/* Menu Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Column Visibility
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Show or hide columns in the table
            </div>
          </div>

          {/* Column List */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {table.getAllLeafColumns()
              .filter(column => column.id !== 'select' && column.id !== 'actions')
              .map(column => (
                <div key={column.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {column.columnDef.header as string}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({column.id})
                    </span>
                  </label>
                </div>
              ))}
          </div>

          {/* Menu Actions */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  table.toggleAllColumnsVisible(true)
                  closeColumnVisibilityMenu()
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Show All
              </button>
              <button
                onClick={() => {
                  table.toggleAllColumnsVisible(false)
                  closeColumnVisibilityMenu()
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Hide All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable 