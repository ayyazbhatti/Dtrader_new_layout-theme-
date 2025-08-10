import React, { useState, useMemo } from 'react'
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
  type ColumnSizingState,
} from '@tanstack/react-table'
import {
  Download,
  Upload,
  Eye,
  Bot,
  Users2,
  Tag,
  AlertTriangle,
  Settings,
  Filter,
  X,
  Search,
  MoreHorizontal,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { getSortIcon, formatCurrency, formatMarginLevel, formatPnL } from './utils'
import { TABLE_CONFIG, CSS_CLASSES, COLUMN_CONFIGS } from './constants'

// Local imports
import { UserData, ContextMenuState } from './types'
import { mockUserData } from './data'
import { useContextMenu, useKeyboardShortcuts } from './hooks'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'
import { GroupAssignmentPopup } from './GroupAssignmentPopup'
import { BotAssignmentPopup } from './BotAssignmentPopup'
import { PriceDropAlertPopup } from './PriceDropAlertPopup'
import { SubscriptionDatePopup } from './SubscriptionDatePopup'
import { PriceDropAlertData, SubscriptionDateData } from './types'

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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [showFilters, setShowFilters] = useState(false)
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    columnId: '',
    columnName: ''
  })

  // User data state for managing updates
  const [userData, setUserData] = useState<UserData[]>(mockUserData)

  // Column visibility state
  const [columnVisibilityMenu, setColumnVisibilityMenu] = useState<{
    show: boolean
    x: number
    y: number
  }>({
    show: false,
    x: 0,
    y: 0
  })

  // Selected user for details popup
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  // Tag functionality
  const [showTagModal, setShowTagModal] = useState(false)
  const [selectedUserForTags, setSelectedUserForTags] = useState<UserData | null>(null)
  const [userTags, setUserTags] = useState<{ [userId: string]: string[] }>({})
  const [availableTags] = useState([
    'Default Dtrader Tag',
    '17_Feb',
    'Premium User',
    'VIP Member',
    'New User',
    'Active Trader',
    'Bot User',
    'Manual Trader',
    'High Volume',
    'Low Risk',
    'Aggressive',
    'Conservative'
  ])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearch, setTagSearch] = useState('')

  // Global Tag Management functionality
  const [showGlobalTagModal, setShowGlobalTagModal] = useState(false)
  const [globalTagSearch, setGlobalTagSearch] = useState('')
  const [globalSelectedTags, setGlobalSelectedTags] = useState<string[]>([])

  // Edit user functionality
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<UserData>>({})

  // Group assignment functionality
  const [showGroupAssignmentModal, setShowGroupAssignmentModal] = useState(false)
  const [availableGroups] = useState(['DefaultGro', 'Premium', 'Standard', 'VIP'])

  // Bot assignment functionality
  const [showBotAssignmentModal, setShowBotAssignmentModal] = useState(false)
  const [availableBotSettings] = useState([
    'Conservative',
    'Aggressive',
    'Moderate',
    'Manual',
    'High Risk',
    'Balanced',
    'Ultra Aggressive',
    'High Frequency',
    'Ultra High Risk',
    'Quantum Trading'
  ])

  // Price Drop Alert functionality
  const [showPriceDropAlertModal, setShowPriceDropAlertModal] = useState(false)

  // Subscription Date functionality
  const [showSubscriptionDateModal, setShowSubscriptionDateModal] = useState(false)

  // Search functionality
  const [searchValue, setSearchValue] = useState('')
  const [globalFilter, setGlobalFilter] = useState('')



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

  // Resize info state for visual feedback
  const [resizeInfo, setResizeInfo] = useState<{
    show: boolean
    columnId: string
    width: number
    x: number
    y: number
  }>({
    show: false,
    columnId: '',
    width: 0,
    x: 0,
    y: 0
  })

  // Data
  const data = useMemo(() => userData, [userData])



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
        enableResizing: false,
        enableHiding: false, // Selection column should not be hideable
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
        enableResizing: true,
        enableHiding: true,
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
        enableResizing: true,
        enableHiding: true,
      }),

      // Account ID
      columnHelper.accessor('accountId', {
        header: 'Account Id',
        cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Name
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 150,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Email
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => <span className="text-blue-600 dark:text-blue-400">{getValue()}</span>,
        size: 200,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Group
      columnHelper.accessor('group', {
        header: 'Group',
        cell: ({ getValue }) => <span>{getValue()}</span>,
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Referral
      columnHelper.accessor('referral', {
        header: 'Referral',
        cell: ({ getValue }) => <span className="font-mono text-sm">{getValue()}</span>,
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Leverage
      columnHelper.accessor('leverage', {
        header: 'Leverage',
        cell: ({ getValue }) => <span className="text-right">{getValue()}</span>,
        size: 100,
        enableResizing: true,
        enableHiding: true,
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
        enableResizing: true,
        enableHiding: true,
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
        enableResizing: true,
        enableHiding: true,
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
        enableResizing: true,
        enableHiding: true,
      }),

      // Unrealized PnL
      columnHelper.accessor('unrealizedPnL', {
        header: 'Unrealized PnL',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-mono font-medium ${colorClass}`}>{value}</span>
        },
        size: 140,
        enableResizing: true,
        enableHiding: true,
      }),

      // Realized PnL
      columnHelper.accessor('realizedPnL', {
        header: 'Realized PnL',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-medium ${colorClass}`}>{value}</span>
        },
        size: 140,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Profit
      columnHelper.accessor('botProfit', {
        header: 'Bot Profit',
        cell: ({ getValue }) => {
          const { value, colorClass } = formatPnL(getValue())
          return <span className={`text-right font-mono font-medium ${colorClass}`}>{value}</span>
        },
        size: 120,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Setting
      columnHelper.accessor('botSetting', {
        header: 'Bot Setting',
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
        size: 140,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Subscription
      columnHelper.accessor('botSubscription', {
        header: 'Bot Subscription',
        cell: ({ getValue, row }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleToggleBotSubscription(row.original.id, isEnabled)
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isEnabled 
                    ? 'bg-green-600' 
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )
        },
        size: 130,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Enabled
      columnHelper.accessor('botEnabled', {
        header: 'Bot Enabled',
        cell: ({ getValue, row }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleToggleBotEnabled(row.original.id, isEnabled)
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isEnabled 
                    ? 'bg-green-600' 
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )
        },
        size: 120,
        enableResizing: true,
        enableHiding: true,
      }),

      // Show Bot Settings
      columnHelper.accessor('showBotSettings', {
        header: 'Show Bot Settings',
        cell: ({ getValue, row }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleToggleShowBotSettings(row.original.id, isEnabled)
                }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isEnabled 
                    ? 'bg-green-600' 
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )
        },
        size: 130,
        enableResizing: true,
        enableHiding: true,
      }),

      // Tags Column
      columnHelper.display({
        id: 'tags',
        header: 'Tags',
        cell: ({ row }) => {
          const userTagsList = userTags[row.original.id] || []
          return (
            <div className="flex flex-wrap gap-1">
              {userTagsList.length > 0 ? (
                userTagsList.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400">No tags</span>
              )}
            </div>
          )
        },
        size: 150,
        enableResizing: true,
        enableHiding: true,
      }),

      // Actions Column
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleOpenTagModal(row.original)
              }}
              className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Assign Tags"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRowClick(row.original)
              }}
              className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              title="View Details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleOpenEditModal(row.original)
              }}
              className="p-1 text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              title="Edit User"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Implement delete functionality
                console.log('Delete user:', row.original.id)
              }}
              className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Delete User"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        size: 120,
        enableResizing: true,
        enableHiding: true,
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
      columnVisibility,
      rowSelection,
      columnFilters,
      columnSizing,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnSizingChange: (updater) => {
      console.log('Column sizing change:', updater)
      setColumnSizing(updater)
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: TABLE_CONFIG.COLUMN_RESIZE_MODE,
    enableColumnResizing: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: 'includesString',
    columnResizeDirection: 'ltr',
  })



  // Initialize column visibility state after table creation
  React.useEffect(() => {
    if (table) {
      // Initialize all columns as visible by default
      const initialVisibility: VisibilityState = {}
      table.getAllColumns().forEach(column => {
        if (column.getCanHide()) {
          initialVisibility[column.id] = true
        }
      })
      setColumnVisibility(initialVisibility)
      console.log('Initialized column visibility:', initialVisibility)
    }
  }, [table])

    // Event handlers for resize feedback
  const handleMouseMove = (e: MouseEvent) => {
    if (resizeInfo.show) {
      setResizeInfo(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }))
    }
  }

  const handleMouseUp = () => {
    if (resizeInfo.show) {
      setResizeInfo(prev => ({ ...prev, show: false }))
    }
  }

  // Add global mouse event listeners for resize feedback
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeInfo.show])
  
  // Update resize info when column sizing changes
  React.useEffect(() => {
    if (resizeInfo.show && resizeInfo.columnId) {
      const column = table.getColumn(resizeInfo.columnId)
      if (column) {
        const actualWidth = column.getSize()
        setResizeInfo(prev => ({
          ...prev,
          width: actualWidth
        }))
      }
    }
  }, [columnSizing, table, resizeInfo.show, resizeInfo.columnId])



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

  const handleRowClick = (user: UserData) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  // Toggle handlers


  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, show: false }))
  }



  // Column visibility functions
  const handleColumnVisibilityMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get the button element
    const button = e.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    
    // Calculate popup position relative to the button
    const popupWidth = 280
    const popupHeight = 400
    const margin = 20
    
    let left = rect.left + (rect.width / 2)
    let top = rect.bottom + 10
    
    // Adjust horizontal position to keep popup within viewport
    if (left + (popupWidth / 2) > window.innerWidth - margin) {
      left = window.innerWidth - (popupWidth / 2) - margin
    }
    if (left - (popupWidth / 2) < margin) {
      left = (popupWidth / 2) + margin
    }
    
    // Adjust vertical position to keep popup within viewport
    if (top + popupHeight > window.innerHeight - margin) {
      // Show above the button if there's not enough space below
      top = rect.top - popupHeight - 10
    }
    if (top < margin) {
      top = margin
    }
    
    // Debug: Log column information
    console.log('Opening column visibility menu')
    console.log('All columns:', table.getAllColumns().map(col => ({ id: col.id, header: col.columnDef.header, canHide: col.getCanHide(), isVisible: col.getIsVisible() })))
    console.log('Current column visibility state:', table.getState().columnVisibility)
    
    setColumnVisibilityMenu(prev => ({
      show: !prev.show,
      x: left,
      y: top
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

  // Tag handlers
  const handleOpenTagModal = (user: UserData) => {
    setSelectedUserForTags(user)
    setSelectedTags(userTags[user.id] || [])
    setShowTagModal(true)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleSelectAllTags = () => {
    setSelectedTags([...availableTags])
  }

  const handleSelectNoneTags = () => {
    setSelectedTags([])
  }

  const handleSaveTags = () => {
    if (selectedUserForTags) {
      setUserTags(prev => ({
        ...prev,
        [selectedUserForTags.id]: selectedTags
      }))
      setShowTagModal(false)
      setSelectedUserForTags(null)
      setSelectedTags([])
    }
  }

  const getFilteredTags = () => {
    return availableTags.filter(tag => 
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    )
  }

  // Global Tag Management handlers
  const handleOpenGlobalTagModal = () => {
    setGlobalSelectedTags([])
    setGlobalTagSearch('')
    setShowGlobalTagModal(true)
  }

  const handleGlobalTagToggle = (tag: string) => {
    setGlobalSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleGlobalSelectAllTags = () => {
    setGlobalSelectedTags([...availableTags])
  }

  const handleGlobalSelectNoneTags = () => {
    setGlobalSelectedTags([])
  }

  const handleSaveGlobalTags = () => {
    // Here you can implement logic to apply selected tags to multiple users
    // For now, we'll just close the modal
    setShowGlobalTagModal(false)
    setGlobalSelectedTags([])
    setGlobalTagSearch('')
  }

  const getGlobalFilteredTags = () => {
    return availableTags.filter(tag => 
      tag.toLowerCase().includes(globalTagSearch.toLowerCase())
    )
  }

  // Edit user handlers
  const handleOpenEditModal = (user: UserData) => {
    setEditingUser(user)
    setEditFormData({
      id: user.id,
      online: user.online,
      botStatus: user.botStatus,
      accountId: user.accountId,
      name: user.name,
      email: user.email,
      group: user.group,
      referral: user.referral,
      leverage: user.leverage,
      balance: user.balance,
      equity: user.equity,
      marginLevel: user.marginLevel,
      unrealizedPnL: user.unrealizedPnL,
      realizedPnL: user.realizedPnL,
      botProfit: user.botProfit,
      botSetting: user.botSetting,
      botSubscription: user.botSubscription,
      botEnabled: user.botEnabled,
      showBotSettings: user.showBotSettings
    })
    setShowEditModal(true)
  }

  const handleEditFormChange = (field: keyof UserData, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveEdit = () => {
    if (editingUser && editFormData) {
      // Update the user data in the state
      setUserData(prev => prev.map(user => 
        user.id === editingUser.id ? { ...user, ...editFormData } : user
      ))
      setShowEditModal(false)
      setEditingUser(null)
      setEditFormData({})
    }
  }

  // Group assignment handlers
  const handleOpenGroupAssignmentModal = () => {
    setShowGroupAssignmentModal(true)
  }

  const handleAssignGroup = (userId: string, group: string) => {
    setUserData(prev => prev.map(user => 
      user.id === userId ? { ...user, group } : user
    ))
  }

  // Bot assignment handlers
  const handleOpenBotAssignmentModal = () => {
    setShowBotAssignmentModal(true)
  }

  const handleAssignBot = (userId: string, botSetting: string) => {
    setUserData(prev => prev.map(user => 
      user.id === userId ? { ...user, botSetting } : user
    ))
  }

  const handleUnassignBot = (userId: string) => {
    setUserData(prev => prev.map(user => 
      user.id === userId ? { ...user, botSetting: '---' } : user
    ))
  }

  // Price Drop Alert handlers
  const handleOpenPriceDropAlertModal = () => {
    setShowPriceDropAlertModal(true)
  }

  const handleSendPriceDropAlert = (data: PriceDropAlertData) => {
    console.log('Price Drop Alert sent:', data)
    // Here you would typically send the alert data to your backend
    // For now, we'll just log it to the console
  }

  // Subscription Date handlers
  const handleOpenSubscriptionDateModal = () => {
    setShowSubscriptionDateModal(true)
  }

  const handleSaveSubscription = (data: SubscriptionDateData) => {
    console.log('Subscription option saved:', data.subscriptionOption)
    // Here you would typically save the subscription option to your backend
  }

  const handleSaveDate = (data: SubscriptionDateData) => {
    console.log('Subscription date saved:', data.subscriptionEndDate)
    // Here you would typically save the subscription date to your backend
  }

  // Toggle handlers for bot settings
  const handleToggleBotSubscription = (userId: string, currentValue: boolean) => {
    setUserData(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, botSubscription: !currentValue }
        : user
    ))
  }

  const handleToggleBotEnabled = (userId: string, currentValue: boolean) => {
    setUserData(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, botEnabled: !currentValue }
        : user
    ))
  }

  const handleToggleShowBotSettings = (userId: string, currentValue: boolean) => {
    setUserData(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, showBotSettings: !currentValue }
        : user
    ))
  }

  return (
    <div className="space-y-6 relative">
      {/* Enhanced Table Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 relative z-20">
        <div className="flex flex-col space-y-4">
          {/* Mobile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Title and Row Count */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {columnFilters.length > 0 && `${columnFilters.length} active`}
              </span>
            </div>
          </div>

          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden sm:block">
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
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Bot Management - Manage bot settings and configurations"
                  onClick={handleOpenBotAssignmentModal}
                >
                  <Bot className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Bot Management
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Group Management - Manage user groups and permissions"
                  onClick={handleOpenGroupAssignmentModal}
                >
                  <Users2 className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Group Management
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Tag Management - Manage user tags and labels"
                  onClick={handleOpenGlobalTagModal}
                >
                  <Tag className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Tag Management
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Price Drop Alert - Create price drop alerts for users"
                  onClick={handleOpenPriceDropAlertModal}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Price Drop Alert
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Bot Subscription - Set subscription dates for bot services"
                  onClick={handleOpenSubscriptionDateModal}
                >
                  <Bot className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Bot Subscription
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Column Visibility - Show/hide table columns"
                  onClick={handleColumnVisibilityMenu}
                >
                  <Eye className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Column Visibility
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>

                <button 
                  className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible" 
                  title="Settings - Configure table and display options"
                  onClick={() => console.log('Settings clicked')}
                >
                  <Settings className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Settings
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>
                </div>
              </div>
              

              
              {/* Right Controls */}
              <div className="flex items-center space-x-2 ml-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search table..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  {globalFilter && (
                    <button
                      onClick={() => setGlobalFilter('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
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
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      <ColumnVisibilityPopup 
        table={table}
        columnVisibilityMenu={columnVisibilityMenu}
        onClose={closeColumnVisibilityMenu}
      />

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Resize Indicator */}
        {resizeInfo.show && (
          <div
            className="fixed z-50 px-3 py-2 text-sm font-mono bg-blue-600 text-white rounded-lg shadow-lg pointer-events-none border border-blue-500"
            style={{
              left: resizeInfo.x + 10,
              top: resizeInfo.y - 40,
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>{resizeInfo.columnId}: {Math.round(resizeInfo.width)}px</span>
            </div>
          </div>
        )}
        

        {/* Mobile Table Controls */}
        <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {table.getFilteredRowModel().rows.length} results
            </span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Mobile Column Visibility */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {table.getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => (
                <button
                  key={column.id}
                  onClick={() => column.toggleVisibility()}
                  className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
                    column.getIsVisible()
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {column.columnDef.header as string}
                </button>
              ))}
          </div>

        </div>

        {/* Mobile Table */}
        <div className="block sm:hidden overflow-x-auto">
          <table className="w-full" key={JSON.stringify(columnSizing)}>
            <thead className={`${CSS_CLASSES.TABLE_HEADER} block sm:table-header-group`}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} style={{ height: '36px' }}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`relative border-r border-gray-200 dark:border-gray-600 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider select-none group ${
                        header.column.getFilterValue() ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700' : ''
                      }`}
                      style={{ width: header.getSize(), minWidth: '80px' }}
                    >
                      <div 
                        className="px-3 py-2 flex items-center justify-between cursor-pointer"
                        onContextMenu={(e) => handleContextMenu(e, header.column.id, header.column.columnDef.header as string)}
                      >
                        <div className="flex items-center space-x-2">
                          {header.isPlaceholder ? null : (
                            <>
                              <span className="font-medium">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                              {header.column.getCanSort() && (
                                <button
                                  onClick={(e) => header.column.getToggleSortingHandler()?.(e)}
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
                                                      onMouseDown={(e) => {
                              console.log('Resize started for column:', header.column.id, 'Current width:', header.column.getSize())
                              
                              e.preventDefault()
                              e.stopPropagation()
                              
                              const startX = e.clientX
                              const startWidth = header.column.getSize()
                              
                              const handleMouseMove = (moveEvent: MouseEvent) => {
                                const deltaX = moveEvent.clientX - startX
                                const newWidth = Math.max(80, startWidth + deltaX)
                                
                                // Update the table's column sizing state directly
                                table.setColumnSizing(prev => ({
                                  ...prev,
                                  [header.column.id]: newWidth
                                }))
                                
                                // Update our local state
                                setColumnSizing(prev => ({
                                  ...prev,
                                  [header.column.id]: newWidth
                                }))
                                
                                // Update resize info
                                setResizeInfo(prev => ({
                                  ...prev,
                                  width: newWidth,
                                  x: moveEvent.clientX,
                                  y: moveEvent.clientY
                                }))
                              }
                              
                              const handleMouseUp = () => {
                                document.removeEventListener('mousemove', handleMouseMove)
                                document.removeEventListener('mouseup', handleMouseUp)
                                setResizeInfo(prev => ({ ...prev, show: false }))
                              }
                              
                              document.addEventListener('mousemove', handleMouseMove)
                              document.addEventListener('mouseup', handleMouseUp)
                              
                              // Show resize info
                              setResizeInfo({
                                show: true,
                                columnId: header.column.id,
                                width: startWidth,
                                x: e.clientX,
                                y: e.clientY
                              })
                            }}
                          onMouseMove={(e) => {
                            if (resizeInfo.show && resizeInfo.columnId === header.column.id) {
                              // Update resize info with current mouse position
                              setResizeInfo(prev => ({
                                ...prev,
                                x: e.clientX,
                                y: e.clientY
                              }))
                            }
                          }}
                          onTouchStart={(e) => header.getResizeHandler()?.(e)}
                          className={`absolute top-0 right-0 w-2 h-full cursor-col-resize transition-all duration-200 ${
                            header.column.getIsResizing()
                              ? 'bg-blue-500 opacity-100'
                              : 'bg-transparent hover:bg-blue-400 hover:opacity-80 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                          } hover:w-3 hover:bg-blue-100 dark:hover:bg-blue-900/30`}
                          style={{ zIndex: 10 }}
                          title="Drag to resize column width"
                        >
                          {/* Visual indicator for resize handle */}
                          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 rounded-full transition-all duration-200 ${
                            header.column.getIsResizing()
                              ? 'bg-white'
                              : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-gray-600 dark:group-hover:bg-gray-400'
                          }`} />
                        </div>
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
                  style={{ height: '34px' }}
                  onClick={() => handleRowClick(row.original)}
                >
                  {/* Mobile Row Layout */}
                  <td className="sm:hidden p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="space-y-2">
                      {/* User Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {row.original.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {row.original.name || 'Unknown User'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {row.original.email || 'No email'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {row.original.online ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenEditModal(row.original)
                            }}
                            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                            title="Edit user"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-md">
                          <div className="text-gray-500 dark:text-gray-400 text-xs">Balance</div>
                          <div className="font-medium text-gray-900 dark:text-white text-xs">
                            {formatCurrency(row.original.balance || 0)}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-md">
                          <div className="text-gray-500 dark:text-gray-400 text-xs">Unrealized PnL</div>
                          <div className={`font-medium text-xs ${(row.original.unrealizedPnL || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatPnL(row.original.unrealizedPnL || 0).value}
                          </div>
                        </div>
                      </div>

                      {/* Bot Status */}
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Bot Status</div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            row.original.botSubscription 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {row.original.botSubscription ? 'Active' : 'Inactive'}
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            row.original.botEnabled 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {row.original.botEnabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenTagModal(row.original)
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          <span>Tags</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle view details
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Desktop Row Layout */}
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="hidden sm:table-cell border-r border-gray-100 dark:border-gray-700 px-3 py-2 text-xs text-gray-900 dark:text-gray-100"
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

      {/* Desktop Table */}
      <div className={`${CSS_CLASSES.TABLE_CONTAINER} hidden sm:block`}>
        <div className="overflow-x-auto">
          <table className="w-full" key={JSON.stringify(columnSizing)}>
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 ${
                        header.column.getCanSort() ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                      }`}
                      style={{ width: header.getSize(), minWidth: '80px' }}
                      onClick={(e) => header.column.getToggleSortingHandler()?.(e)}
                      onContextMenu={(e) => handleContextMenu(e, header.id, header.column.columnDef.header as string)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                        <div className="flex items-center space-x-1">
                          {header.column.getCanSort() && getSortIcon(header.column)}
                          {header.column.getCanResize() && (
                            <div
                              onMouseDown={(e) => {
                                console.log('Resize started for column:', header.column.id, 'Current width:', header.column.getSize())
                                
                                e.preventDefault()
                                e.stopPropagation()
                                
                                const startX = e.clientX
                                const startWidth = header.column.getSize()
                                
                                const handleMouseMove = (moveEvent: MouseEvent) => {
                                  const deltaX = moveEvent.clientX - startX
                                  const newWidth = Math.max(80, startWidth + deltaX)
                                  
                                  // Update the table's column sizing state directly
                                  table.setColumnSizing(prev => ({
                                    ...prev,
                                    [header.column.id]: newWidth
                                  }))
                                  
                                  // Update our local state
                                  setColumnSizing(prev => ({
                                    ...prev,
                                    [header.column.id]: newWidth
                                  }))
                                  
                                  // Update resize info
                                  setResizeInfo(prev => ({
                                    ...prev,
                                    width: newWidth,
                                    x: moveEvent.clientX,
                                    y: moveEvent.clientY
                                  }))
                                }
                                
                                const handleMouseUp = () => {
                                  document.removeEventListener('mousemove', handleMouseMove)
                                  document.removeEventListener('mouseup', handleMouseUp)
                                  setResizeInfo(prev => ({ ...prev, show: false }))
                                }
                                
                                document.addEventListener('mousemove', handleMouseMove)
                                document.addEventListener('mouseup', handleMouseUp)
                                
                                // Show resize info
                                setResizeInfo({
                                  show: true,
                                  columnId: header.column.id,
                                  width: startWidth,
                                  x: e.clientX,
                                  y: e.clientY
                                })
                              }}
                              onTouchStart={(e) => header.getResizeHandler()?.(e)}
                              className={`absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none transition-all duration-200 ${
                                header.column.getIsResizing() 
                                  ? 'bg-blue-500 opacity-100' 
                                  : 'bg-transparent hover:bg-blue-400 hover:opacity-80 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                              } hover:w-3 hover:bg-blue-100 dark:hover:bg-blue-900/30`}
                              style={{ zIndex: 10 }}
                              title="Drag to resize column width"
                            >
                              {/* Visual indicator for resize handle */}
                              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 rounded-full transition-all duration-200 ${
                                header.column.getIsResizing()
                                  ? 'bg-white'
                                  : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-gray-600 dark:group-hover:bg-gray-400'
                              }`} />
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                  style={{ height: '34px' }}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600"
                      style={{ width: cell.column.getSize(), minWidth: '80px' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Pagination */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Results Info */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{' '}
                of <span className="font-semibold text-gray-900 dark:text-white">{table.getFilteredRowModel().rows.length}</span> results
              </span>
              
              {/* Rows per page selector */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-3">
              {/* First/Previous buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="First page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Page numbers */}
              {table.getPageCount() > 0 && (
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                    const pageIndex = table.getState().pagination.pageIndex
                    const pageCount = table.getPageCount()
                    let pageNumber
                    
                    if (pageCount <= 5) {
                      pageNumber = i
                    } else if (pageIndex < 3) {
                      pageNumber = i
                    } else if (pageIndex >= pageCount - 3) {
                      pageNumber = pageCount - 5 + i
                    } else {
                      pageNumber = pageIndex - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => table.setPageIndex(pageNumber)}
                        className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          pageNumber === pageIndex
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {pageNumber + 1}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Next/Last buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="Last page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
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
                table.getColumn(contextMenu.columnId)?.setFilterValue(undefined)
                closeContextMenu()
              }}
              className="flex-1 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={() => {
                closeContextMenu()
              }}
              className="flex-1 px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* User Details Popup */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Details
              </h2>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      User ID
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Online Status
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.online 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {selectedUser.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trading Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Trading Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account Balance
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-mono">
                      {formatCurrency(selectedUser.balance)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Margin Level
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatMarginLevel(selectedUser.marginLevel).value}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unrealized P&L
                    </label>
                    <p className={`text-sm font-mono ${
                      selectedUser.unrealizedPnL >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatPnL(selectedUser.unrealizedPnL).value}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Realized P&L
                    </label>
                    <p className={`text-sm font-mono ${
                      selectedUser.realizedPnL >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatPnL(selectedUser.realizedPnL).value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account ID
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.accountId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Group
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.group}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Leverage
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.leverage}:1</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Equity
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white font-mono">
                      {formatCurrency(selectedUser.equity)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bot Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Bot Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Subscription
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.botSubscription 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {selectedUser.botSubscription ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Enabled
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.botEnabled 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {selectedUser.botEnabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Show Bot Settings
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.showBotSettings 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {selectedUser.showBotSettings ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Profit
                    </label>
                    <p className={`text-sm font-mono ${
                      selectedUser.botProfit >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatCurrency(selectedUser.botProfit)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Referral
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.referral}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Setting
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedUser.botSetting}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowUserDetails(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleOpenEditModal(selectedUser)
                  setShowUserDetails(false)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Assignment Modal */}
      {showTagModal && selectedUserForTags && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assign Tags to User
              </h2>
              <button
                onClick={() => setShowTagModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* User Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Assigning tags to: <span className="font-medium text-gray-900 dark:text-white">{selectedUserForTags.name}</span>
                </p>
              </div>

              {/* Tag Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Tags *
                </label>
                
                {/* Selected Tags Display */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedTags.length} Tags selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSelectAllTags}
                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                      >
                        All
                      </button>
                      <button
                        onClick={handleSelectNoneTags}
                        className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag List */}
                <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
                  {getFilteredTags().map((tag) => (
                    <label
                      key={tag}
                      className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedTags.includes(tag) ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ml-3 text-sm text-gray-900 dark:text-white">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTagModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveTags}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Tag Management Modal */}
      {showGlobalTagModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tag Management
              </h2>
              <button
                onClick={() => setShowGlobalTagModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tag Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manage Tags
                </label>
                
                {/* Selected Tags Display */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {globalSelectedTags.length} Tags selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleGlobalSelectAllTags}
                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                      >
                        All
                      </button>
                      <button
                        onClick={handleGlobalSelectNoneTags}
                        className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        None
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={globalTagSearch}
                    onChange={(e) => setGlobalTagSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag List */}
                <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
                  {getGlobalFilteredTags().map((tag) => (
                    <label
                      key={tag}
                      className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        globalSelectedTags.includes(tag) ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={globalSelectedTags.includes(tag)}
                        onChange={() => handleGlobalTagToggle(tag)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ml-3 text-sm text-gray-900 dark:text-white">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowGlobalTagModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveGlobalTags}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Assignment Modal */}
      <GroupAssignmentPopup
        isOpen={showGroupAssignmentModal}
        onClose={() => setShowGroupAssignmentModal(false)}
        selectedUsers={Object.keys(rowSelection).map(id => userData.find(user => user.id === id)).filter(Boolean) as UserData[]}
        onAssignGroups={handleAssignGroup}
        availableGroups={availableGroups}
      />

      {/* Bot Assignment Modal */}
      <BotAssignmentPopup
        isOpen={showBotAssignmentModal}
        onClose={() => setShowBotAssignmentModal(false)}
        selectedUsers={Object.keys(rowSelection).map(id => userData.find(user => user.id === id)).filter(Boolean) as UserData[]}
        onAssignBot={handleAssignBot}
        onUnassignBot={handleUnassignBot}
        availableBotSettings={availableBotSettings}
      />

      {/* Price Drop Alert Modal */}
      <PriceDropAlertPopup
        isOpen={showPriceDropAlertModal}
        onClose={() => setShowPriceDropAlertModal(false)}
        onSend={handleSendPriceDropAlert}
      />

      {/* Subscription Date Modal */}
      <SubscriptionDatePopup
        isOpen={showSubscriptionDateModal}
        onClose={() => setShowSubscriptionDateModal(false)}
        onSaveSubscription={handleSaveSubscription}
        onSaveDate={handleSaveDate}
      />

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit User: {editingUser.name}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      User ID
                    </label>
                    <input
                      type="text"
                      value={editFormData.id || ''}
                      onChange={(e) => handleEditFormChange('id', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account ID
                    </label>
                    <input
                      type="text"
                      value={editFormData.accountId || ''}
                      onChange={(e) => handleEditFormChange('accountId', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.name || ''}
                      onChange={(e) => handleEditFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editFormData.email || ''}
                      onChange={(e) => handleEditFormChange('email', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Group
                    </label>
                    <select
                      value={editFormData.group || ''}
                      onChange={(e) => handleEditFormChange('group', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="DefaultGro">DefaultGro</option>
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Referral
                    </label>
                    <input
                      type="text"
                      value={editFormData.referral || ''}
                      onChange={(e) => handleEditFormChange('referral', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Trading Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Trading Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Leverage
                    </label>
                    <select
                      value={editFormData.leverage || 100}
                      onChange={(e) => handleEditFormChange('leverage', parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={100}>100:1</option>
                      <option value={150}>150:1</option>
                      <option value={200}>200:1</option>
                      <option value={250}>250:1</option>
                      <option value={300}>300:1</option>
                      <option value={350}>350:1</option>
                      <option value={400}>400:1</option>
                      <option value={500}>500:1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Balance
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.balance || 0}
                      onChange={(e) => handleEditFormChange('balance', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Equity
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.equity || 0}
                      onChange={(e) => handleEditFormChange('equity', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Margin Level
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.marginLevel || 0}
                      onChange={(e) => handleEditFormChange('marginLevel', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unrealized P&L
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.unrealizedPnL || 0}
                      onChange={(e) => handleEditFormChange('unrealizedPnL', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Realized P&L
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.realizedPnL || 0}
                      onChange={(e) => handleEditFormChange('realizedPnL', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Bot Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Bot Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Setting
                    </label>
                    <select
                      value={editFormData.botSetting || ''}
                      onChange={(e) => handleEditFormChange('botSetting', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="---">---</option>
                      <option value="Conservative">Conservative</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Aggressive">Aggressive</option>
                      <option value="Manual">Manual</option>
                      <option value="Balanced">Balanced</option>
                      <option value="High Risk">High Risk</option>
                      <option value="Ultra Aggressive">Ultra Aggressive</option>
                      <option value="High Frequency">High Frequency</option>
                      <option value="Ultra High Risk">Ultra High Risk</option>
                      <option value="Quantum Trading">Quantum Trading</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bot Profit
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.botProfit || 0}
                      onChange={(e) => handleEditFormChange('botProfit', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Status Toggles */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Status Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Online Status
                    </label>
                    <input
                      type="checkbox"
                      checked={editFormData.online || false}
                      onChange={(e) => handleEditFormChange('online', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bot Status
                    </label>
                    <input
                      type="checkbox"
                      checked={editFormData.botStatus || false}
                      onChange={(e) => handleEditFormChange('botStatus', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bot Subscription
                    </label>
                    <input
                      type="checkbox"
                      checked={editFormData.botSubscription || false}
                      onChange={(e) => handleEditFormChange('botSubscription', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bot Enabled
                    </label>
                    <input
                      type="checkbox"
                      checked={editFormData.botEnabled || false}
                      onChange={(e) => handleEditFormChange('botEnabled', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Bot Settings
                    </label>
                    <input
                      type="checkbox"
                      checked={editFormData.showBotSettings || false}
                      onChange={(e) => handleEditFormChange('showBotSettings', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable 