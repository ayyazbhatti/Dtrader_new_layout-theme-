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
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  UserPlus,
} from 'lucide-react'
import { getSortIcon, formatCurrency, formatMarginLevel, formatPnL } from './utils'
import { TABLE_CONFIG, CSS_CLASSES, COLUMN_CONFIGS } from './constants'

// Local imports
import { UserData, ContextMenuState } from './types'
import { mockUserData } from './data'
import { useContextMenu, useKeyboardShortcuts } from './hooks'
import { useColumnVisibility } from './useColumnVisibility'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'

import { GroupAssignmentPopup } from './GroupAssignmentPopup'
import { BotAssignmentPopup } from './BotAssignmentPopup'
import { PriceDropAlertPopup } from './PriceDropAlertPopup'
import { SubscriptionDatePopup } from './SubscriptionDatePopup'
import { PriceDropAlertData, SubscriptionDateData, AddNewUserData } from './types'
import { AddNewUserPopup } from './AddNewUserPopup'
import UserDetailsPopup from './UserDetailsPopup'

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

  // Add New User functionality
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false)

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
            className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        enableSorting: false,
        enableResizing: false,
        enableHiding: false, // Selection column should not be hideable
        size: 40,
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
        size: 70,
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
        size: 85,
        enableResizing: true,
        enableHiding: true,
      }),

      // Account ID
      columnHelper.accessor('accountId', {
        header: 'Account Id',
        cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Name
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Email
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => <span className="text-blue-600 dark:text-blue-400">{getValue()}</span>,
        size: 160,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Group
      columnHelper.accessor('group', {
        header: 'Group',
        cell: ({ getValue }) => <span>{getValue()}</span>,
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Referral
      columnHelper.accessor('referral', {
        header: 'Referral',
        cell: ({ getValue }) => <span className="font-mono text-sm">{getValue()}</span>,
        size: 80,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Leverage
      columnHelper.accessor('leverage', {
        header: 'Leverage',
        cell: ({ getValue }) => <span className="text-right">{getValue()}</span>,
        size: 80,
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
        size: 100,
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
        size: 100,
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
        size: 110,
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
        size: 120,
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
        size: 120,
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
        size: 100,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Setting
      columnHelper.accessor('botSetting', {
        header: 'Bot Setting',
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
        size: 110,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Subscription
      columnHelper.accessor('botSubscription', {
        header: 'Bot Subscription',
        cell: ({ getValue }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center justify-center">
              <span className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          )
        },
        size: 110,
        enableResizing: true,
        enableHiding: true,
      }),

      // Bot Enabled
      columnHelper.accessor('botEnabled', {
        header: 'Bot Enabled',
        cell: ({ getValue }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center justify-center">
              <span className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          )
        },
        size: 100,
        enableResizing: true,
        enableHiding: true,
      }),

      // Show Bot Settings
      columnHelper.accessor('showBotSettings', {
        header: 'Show Bot Settings',
        cell: ({ getValue }) => {
          const isEnabled = getValue()
          return (
            <div className="flex items-center justify-center">
              <span className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          )
        },
        size: 110,
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
        size: 120,
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
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedUser(row.original)
                setShowUserDetails(true)
              }}
              className="p-1 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title="User Details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

  // Custom filter functions
  const customFilterFns = {
    // Value-based filtering (for checkboxes)
    valueFilter: (row: any, columnId: string, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const value = String(row.getValue(columnId))
      return filterValue.includes(value)
    },
    
    // Condition-based filtering
    conditionFilter: (row: any, columnId: string, filterValue: any) => {
      if (!filterValue || filterValue.condition === 'None') return true
      
      const cellValue = row.getValue(columnId)
      const { condition, value, value2 } = filterValue
      
      switch (condition) {
        case 'equals':
          return String(cellValue) === value
        case 'not_equals':
          return String(cellValue) !== value
        case 'contains':
          return String(cellValue).toLowerCase().includes(value.toLowerCase())
        case 'not_contains':
          return !String(cellValue).toLowerCase().includes(value.toLowerCase())
        case 'starts_with':
          return String(cellValue).toLowerCase().startsWith(value.toLowerCase())
        case 'ends_with':
          return String(cellValue).toLowerCase().endsWith(value.toLowerCase())
        case 'greater_than':
          return Number(cellValue) > Number(value)
        case 'less_than':
          return Number(cellValue) < Number(value)
        case 'between':
          return Number(cellValue) >= Number(value) && Number(cellValue) <= Number(value2)
        case 'is_empty':
          return !cellValue || String(cellValue).trim() === ''
        case 'is_not_empty':
          return cellValue && String(cellValue).trim() !== ''
        default:
          return true
      }
    }
  } as const

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
      console.log('Column sizing change triggered:', updater)
      const newSizing = typeof updater === 'function' ? updater(columnSizing) : updater
      console.log('New column sizing:', newSizing)
      setColumnSizing(updater)
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: 'includesString',
    filterFns: customFilterFns,
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

  // Initialize column sizing state with default column sizes
  React.useEffect(() => {
    if (table) {
      const initialSizing: ColumnSizingState = {}
      table.getAllColumns().forEach(column => {
        if (column.getCanResize()) {
          initialSizing[column.id] = column.getSize()
        }
      })
      setColumnSizing(initialSizing)
      console.log('Initialized column sizing:', initialSizing)
    }
  }, [table])





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

  const handleRowClick = (user: UserData, event: React.MouseEvent) => {
    // Check if the click target is an interactive element that shouldn't trigger row click
    const target = event.target as HTMLElement
    const isCheckbox = target.closest('input[type="checkbox"]')
    const isCheckboxLabel = target.closest('label')
    const isCheckboxContainer = target.closest('.checkbox-container')
    const isButton = target.closest('button')
    const isSelect = target.closest('select')
    const isInput = target.closest('input')
    const isLink = target.closest('a')
    const isActionButton = target.closest('[data-action]')
    
    // Don't open user details if clicking on interactive elements
    if (isCheckbox || isCheckboxLabel || isCheckboxContainer || isButton || isSelect || isInput || isLink || isActionButton) {
      return
    }
    
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  // Toggle handlers


  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, show: false }))
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
    } else {
      // If no values selected, clear the filter
      table.getColumn(valueFilter.columnId)?.setFilterValue(undefined)
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
    } else {
      // If no condition selected, clear the filter
      table.getColumn(conditionFilter.columnId)?.setFilterValue(undefined)
    }
    closeConditionFilter()
  }

  const resetConditionFilter = () => {
    table.getColumn(conditionFilter.columnId)?.setFilterValue(undefined)
    closeConditionFilter()
  }

  // Column visibility hook
  const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<UserData>()

  // Custom hooks
  useContextMenu(contextMenu, closeContextMenu)
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

  const handleOpenAddNewUserModal = () => {
    setShowAddNewUserModal(true)
  }

  const handleSaveSubscription = (data: SubscriptionDateData) => {
    console.log('Subscription option saved:', data.subscriptionOption)
    // Here you would typically save the subscription option to your backend
  }

  const handleSaveDate = (data: SubscriptionDateData) => {
    console.log('Subscription date saved:', data)
    // Here you would typically save the date to your backend
  }

  const handleAddNewUser = (data: AddNewUserData) => {
    console.log('New user data:', data)
    // Here you would typically save the new user to your backend
    // For now, we'll just close the modal
    setShowAddNewUserModal(false)
  }



  return (
    <div className="space-y-6 relative">
      {/* Enhanced Table Controls */}
      <div className="mobile-expanded-view bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6 relative z-20">
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Mobile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Title and Row Count */}
            

            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {columnFilters.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                    {columnFilters.length}
                  </span>
                )}
              </button>
              <div className="flex flex-col items-end text-xs text-gray-500 dark:text-gray-400">
                <span>{table.getFilteredRowModel().rows.length} results</span>
                {columnFilters.length > 0 && (
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {columnFilters.length} active filters
                  </span>
                )}
              </div>
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
                  title="Add New User - Create a new user account"
                  onClick={handleOpenAddNewUserModal}
                >
                  <UserPlus className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Add New User
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
                  onClick={(e) => handleColumnVisibilityMenu(e, table)}
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
                    className="pl-10 pr-4 py-2 w-full sm:w-48 lg:w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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

      {/* Enhanced Filter Popup */}
      {(valueFilter.show || conditionFilter.show) && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 min-w-[450px] max-w-[500px]"
          style={{
            left: (valueFilter.show ? valueFilter.position?.left : conditionFilter.position?.left) || 0,
            top: (valueFilter.show ? valueFilter.position?.top : conditionFilter.position?.top) || 0,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter: {valueFilter.show ? valueFilter.columnName : conditionFilter.columnName}
            </h3>
            <button
              onClick={valueFilter.show ? closeValueFilter : closeConditionFilter}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sorting Options */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sorting Options</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  const column = table.getColumn(valueFilter.show ? valueFilter.columnId : conditionFilter.columnId)
                  column?.toggleSorting(false)
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Sort A to Z
              </button>
              <button
                onClick={() => {
                  const column = table.getColumn(valueFilter.show ? valueFilter.columnId : conditionFilter.columnId)
                  column?.toggleSorting(true)
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Sort Z to A
              </button>
              <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer">
                <span>Sort by color</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 mb-6"></div>

          {/* Filtering Options */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filtering Options</h4>
            
            {/* Filter by color */}
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer mb-3">
              <span>Filter by color</span>
              <ChevronRight className="w-4 h-4" />
            </div>

                         {/* Filter by condition */}
             <div className="mb-4">
               <button
                 onClick={() => {
                   if (valueFilter.show) {
                     closeValueFilter()
                   }
                   showConditionFilter(valueFilter.columnId || conditionFilter.columnId, valueFilter.columnName || conditionFilter.columnName)
                 }}
                 className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
               >
                 <span>Filter by condition</span>
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>

                         {/* Filter by values */}
             <div className="mb-4">
               <button
                 onClick={() => {
                   if (conditionFilter.show) {
                     closeConditionFilter()
                   }
                   showValueFilter(valueFilter.columnId || conditionFilter.columnId, valueFilter.columnName || conditionFilter.columnName)
                 }}
                 className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
               >
                 <span>Filter by values</span>
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 mb-6"></div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={valueFilter.show ? closeValueFilter : closeConditionFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-white dark:bg-gray-700 border border-green-600 dark:border-green-400 rounded-md hover:bg-green-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={valueFilter.show ? applyValueFilter : applyConditionFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 dark:bg-green-700 border border-transparent rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Condition Filter Popup - Google Sheets Style */}
      {conditionFilter.show && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 min-w-[400px] max-w-[450px]"
          style={{
            left: conditionFilter.position?.left || 0,
            top: conditionFilter.position?.top || 0,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter by condition: {conditionFilter.columnName}
            </h3>
            <button
              onClick={closeConditionFilter}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Configuration */}
          <div className="space-y-6">
            {/* Condition Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Filter Condition
              </label>
              <select
                value={conditionFilter.selectedCondition}
                onChange={(e) => setConditionFilter(prev => ({ ...prev, selectedCondition: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="None">Select condition...</option>
                <option value="equals">Equals</option>
                <option value="not_equals">Not equals</option>
                <option value="contains">Contains</option>
                <option value="not_contains">Not contains</option>
                <option value="starts_with">Starts with</option>
                <option value="ends_with">Ends with</option>
                <option value="greater_than">Greater than</option>
                <option value="less_than">Less than</option>
                <option value="between">Between</option>
                <option value="is_empty">Is empty</option>
                <option value="is_not_empty">Is not empty</option>
              </select>
            </div>

            {/* Value Input */}
            {conditionFilter.selectedCondition !== 'None' && 
             conditionFilter.selectedCondition !== 'is_empty' && 
             conditionFilter.selectedCondition !== 'is_not_empty' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filter Value
                </label>
                <input
                  type="text"
                  value={conditionFilter.filterValue}
                  onChange={(e) => setConditionFilter(prev => ({ ...prev, filterValue: e.target.value }))}
                  placeholder="Enter filter value..."
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            )}

            {/* Second Value Input for Between */}
            {conditionFilter.selectedCondition === 'between' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Second Value
                </label>
                <input
                  type="text"
                  value={conditionFilter.filterValue2 || ''}
                  onChange={(e) => setConditionFilter(prev => ({ ...prev, filterValue2: e.target.value }))}
                  placeholder="Enter second value..."
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            )}

            {/* Preview */}
            {conditionFilter.selectedCondition !== 'None' && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter Preview
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {conditionFilter.selectedCondition === 'equals' && `Show rows where ${conditionFilter.columnName} equals "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'not_equals' && `Show rows where ${conditionFilter.columnName} does not equal "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'contains' && `Show rows where ${conditionFilter.columnName} contains "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'not_contains' && `Show rows where ${conditionFilter.columnName} does not contain "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'starts_with' && `Show rows where ${conditionFilter.columnName} starts with "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'ends_with' && `Show rows where ${conditionFilter.columnName} ends with "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'greater_than' && `Show rows where ${conditionFilter.columnName} is greater than "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'less_than' && `Show rows where ${conditionFilter.columnName} is less than "${conditionFilter.filterValue}"`}
                  {conditionFilter.selectedCondition === 'between' && `Show rows where ${conditionFilter.columnName} is between "${conditionFilter.filterValue}" and "${conditionFilter.filterValue2}"`}
                  {conditionFilter.selectedCondition === 'is_empty' && `Show rows where ${conditionFilter.columnName} is empty`}
                  {conditionFilter.selectedCondition === 'is_not_empty' && `Show rows where ${conditionFilter.columnName} is not empty`}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={resetConditionFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={applyConditionFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 border border-transparent rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Value Filter Popup - Google Sheets Style */}
      {valueFilter.show && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 min-w-[450px] max-w-[500px]"
          style={{
            left: valueFilter.position?.left || 0,
            top: valueFilter.position?.top || 0,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter by values: {valueFilter.columnName}
            </h3>
            <button
              onClick={closeValueFilter}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Configuration */}
          <div className="space-y-6">
            {/* Select all / Clear */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  const allValues = valueFilter.values
                  setValueFilter(prev => ({
                    ...prev,
                    selectedValues: prev.selectedValues.length === allValues.length ? [] : allValues
                  }))
                }}
                className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                {valueFilter.selectedValues.length === valueFilter.values.length 
                  ? 'Clear' 
                  : `Select all ${valueFilter.values.length}`}
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Displaying {valueFilter.values.length} values
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search values..."
                className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Values list */}
            <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg">
              {/* Blanks option */}
              <label className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-600">
                <input
                  type="checkbox"
                  checked={valueFilter.selectedValues.includes('(Blanks)')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValueFilter(prev => ({
                        ...prev,
                        selectedValues: [...prev.selectedValues, '(Blanks)']
                      }))
                    } else {
                      setValueFilter(prev => ({
                        ...prev,
                        selectedValues: prev.selectedValues.filter(v => v !== '(Blanks)')
                      }))
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-900 dark:text-white font-medium">(Blanks)</span>
              </label>
              
              {/* Other values */}
              {valueFilter.values.map((value, index) => (
                <label
                  key={value}
                  className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index !== valueFilter.values.length - 1 ? 'border-b border-gray-100 dark:border-gray-600' : ''
                  }`}
                >
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
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-900 dark:text-white">{value}</span>
                </label>
              ))}
            </div>

            {/* Selection Summary */}
            {valueFilter.selectedValues.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Selection Summary
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {valueFilter.selectedValues.length} value{valueFilter.selectedValues.length !== 1 ? 's' : ''} selected
                  {valueFilter.selectedValues.includes('(Blanks)') && ' (including blanks)'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={resetValueFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={applyValueFilter}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 border border-transparent rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="mobile-expanded-view bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

        

        {/* Mobile Table Controls */}
        <div className="mobile-expanded-view sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show/Hide Columns</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    table.getAllColumns().forEach(column => {
                      if (column.getCanHide()) {
                        column.toggleVisibility(true)
                      }
                    })
                  }}
                  className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Show All
                </button>
                <button
                  onClick={() => {
                    table.getAllColumns().forEach(column => {
                      if (column.getCanHide()) {
                        column.toggleVisibility(false)
                      }
                    })
                  }}
                  className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Hide All
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {table.getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <button
                    key={column.id}
                    onClick={() => column.toggleVisibility()}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors ${
                      column.getIsVisible()
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <span className="truncate">{column.columnDef.header as string}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      column.getIsVisible() ? 'bg-blue-600' : 'bg-gray-400'
                    }`} />
                  </button>
                ))}
            </div>
          </div>

        </div>

        {/* Mobile Table - Hidden for now to show table format */}
        <div className="hidden">
          {table.getRowModel().rows.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 mb-3">
                <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">No results found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {globalFilter ? 'Try adjusting your search terms.' : 'No data available to display.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {table.getRowModel().rows.map((row, index) => (
              <div
                key={row.id}
                className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${
                  row.getIsSelected() 
                    ? 'ring-2 ring-blue-500 ring-opacity-50' 
                    : ''
                } ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                onClick={(e) => handleRowClick(row.original, e)}
              >
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-base">
                        {row.original.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-base text-gray-900 dark:text-white">
                          {row.original.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {row.original.email || 'No email'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Online Status */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${row.original.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className={`text-xs font-medium ${row.original.online ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                          {row.original.online ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      
                      {/* Bot Status */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${row.original.botStatus ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className={`text-xs font-medium ${row.original.botStatus ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                          {row.original.botStatus ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Account ID</div>
                      <div className="font-mono text-sm text-gray-900 dark:text-white">
                        {row.original.accountId || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Group</div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {row.original.group || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Balance</div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {formatCurrency(row.original.balance || 0)}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Equity</div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {formatCurrency(row.original.equity || 0)}
                      </div>
                    </div>
                  </div>

                  {/* PnL Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Unrealized PnL</div>
                      <div className={`font-medium text-sm ${(row.original.unrealizedPnL || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatPnL(row.original.unrealizedPnL || 0).value}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Realized PnL</div>
                      <div className={`font-medium text-sm ${(row.original.realizedPnL || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatPnL(row.original.realizedPnL || 0).value}
                      </div>
                    </div>
                  </div>

                  {/* Bot Settings */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Bot Setting</div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {row.original.botSetting || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Bot Profit</div>
                      <div className={`font-medium text-sm ${(row.original.botProfit || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {formatPnL(row.original.botProfit || 0).value}
                      </div>
                    </div>
                  </div>

                  {/* Bot Status Display */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Bot Subscription</span>
                      <span className={`text-xs font-medium ${row.original.botSubscription ? 'text-green-600' : 'text-gray-500'}`}>
                        {row.original.botSubscription ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Bot Enabled</span>
                      <span className={`text-xs font-medium ${row.original.botEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                        {row.original.botEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Show Settings</span>
                      <span className={`text-xs font-medium ${row.original.showBotSettings ? 'text-green-600' : 'text-gray-500'}`}>
                        {row.original.showBotSettings ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {(userTags[row.original.id] || []).length > 0 ? (
                        (userTags[row.original.id] || []).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400">No tags assigned</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenTagModal(row.original)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                      <span>Tags</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenEditModal(row.original)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedUser(row.original)
                        setShowUserDetails(true)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>



      {/* Google Sheets Style Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Advanced Filters</span>
              <span className="sm:hidden">Filters</span>
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* First Row - 4 filters in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Online Status</label>
                <select
                  value={columnFilters.find(f => f.id === 'online')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'online', value: value === 'true' }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'online'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'online'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">All Status</option>
                  <option value="true">Online</option>
                  <option value="false">Offline</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Bot Status</label>
                <select
                  value={columnFilters.find(f => f.id === 'botSubscription')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'botSubscription', value: value === 'true' }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'botSubscription'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'botSubscription'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">All Bot Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Balance Range</label>
                <select
                  value={columnFilters.find(f => f.id === 'balance')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'balance', value }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'balance'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'balance'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">All Balances</option>
                  <option value="0-1000">$0 - $1,000</option>
                  <option value="1000-10000">$1,000 - $10,000</option>
                  <option value="10000-100000">$10,000 - $100,000</option>
                  <option value="100000+">$100,000+</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
                <select
                  value={columnFilters.find(f => f.id === 'group')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'group', value }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'group'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'group'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">All Groups</option>
                  <option value="Default">Default</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
            </div>

            {/* Second Row - Additional filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email Domain</label>
                <input
                  type="text"
                  placeholder="e.g., gmail.com"
                  value={columnFilters.find(f => f.id === 'emailDomain')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'emailDomain', value }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'emailDomain'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'emailDomain'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Created Date</label>
                <input
                  type="date"
                  value={columnFilters.find(f => f.id === 'createdAt')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'createdAt', value }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'createdAt'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'createdAt'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                <select
                  value={columnFilters.find(f => f.id === 'tags')?.value?.toString() || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value) {
                      const newFilter = { id: 'tags', value }
                      setColumnFilters(prev => [...prev.filter(f => f.id !== 'tags'), newFilter])
                    } else {
                      setColumnFilters(prev => prev.filter(f => f.id !== 'tags'))
                    }
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">All Tags</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                  <option value="New">New</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {columnFilters.length} active filters
                </span>
                {columnFilters.length > 0 && (
                  <button
                    onClick={() => setColumnFilters([])}
                    className="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Tags */}
      {columnFilters.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Active Filters</h4>
            <button
              onClick={() => setColumnFilters([])}
              className="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {columnFilters.map((filter) => (
              <div
                key={filter.id}
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg text-xs sm:text-sm text-blue-800 dark:text-blue-200"
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{filter.id}</span>
                  <span className="truncate">{filter.value?.toString()}</span>
                </div>
                <button
                  onClick={() => setColumnFilters(prev => prev.filter(f => f.id !== filter.id))}
                  className="ml-2 p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* Desktop Table Container */}
        <div className="block">
          {/* Main Table */}
                  <div className={`${CSS_CLASSES.TABLE_CONTAINER}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 ${
                          header.column.getCanSort() ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                        }`}
                        style={{ 
                          width: header.getSize(), 
                          minWidth: '60px'
                        }}
                        onClick={(e) => header.column.getToggleSortingHandler()?.(e)}
                        onContextMenu={(e) => handleContextMenu(e, header.id, header.column.columnDef.header as string)}
                        onDoubleClick={(e) => {
                          e.preventDefault()
                          handleContextMenu(e, header.id, header.column.columnDef.header as string)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <div className="flex items-center space-x-1">
                            {header.column.getCanSort() && getSortIcon(header.column)}
                            {header.column.getCanResize() && (
                              <div
                                onMouseDown={(e) => {
                                  console.log('Resize handler called for column:', header.id)
                                  header.getResizeHandler()(e)
                                }}
                                onTouchStart={(e) => {
                                  console.log('Touch resize handler called for column:', header.id)
                                  header.getResizeHandler()(e)
                                }}
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
                    className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    }`}

                    onClick={(e) => handleRowClick(row.original, e)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600"
                        style={{ 
                          width: cell.column.getSize(), 
                          minWidth: '60px'
                        }}
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
                
                {/* Page size selector */}
                <div className="page-size-selector">
                  <span className="page-size-label">Show:</span>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value))
                    }}
                    className="page-size-select"
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <span className="page-size-label">per page</span>
                </div>
              </div>

              {/* Right side - Pagination controls */}
              <div className="table-footer-right">
                {/* Page numbers */}
                {table.getPageCount() > 0 && (
                  <div className="pagination-container">
                    {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                      const pageIndex = table.getState().pagination.pageIndex
                      const pageCount = table.getPageCount()
                      let pageNumber
                      
                      if (pageCount <= 5) {
                        pageNumber = i
                      } else if (pageIndex < 3) {
                        pageNumber = i
                      } else if (pageIndex >= pageCount - 3) {
                        pageNumber = pageIndex - 2 + i
                      } else {
                        pageNumber = pageIndex - 2 + i
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => table.setPageIndex(pageNumber)}
                          className={`pagination-button ${pageNumber === pageIndex ? 'active' : ''}`}
                        >
                          {pageNumber + 1}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center space-x-2">
                  {/* First/Previous buttons */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                      className="pagination-nav"
                      title="First page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="pagination-nav"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Next/Last buttons */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="pagination-nav"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                      className="pagination-nav"
                      title="Last page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
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

     

      {/* Tag Assignment Modal */}
      {showTagModal && selectedUserForTags && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Assign Tags to User
              </h2>
              <button
                onClick={() => setShowTagModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto">
              {/* User Info */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Assigning tags to: <span className="font-medium text-gray-900 dark:text-white">{selectedUserForTags.name}</span>
                </p>
              </div>

              {/* Tag Selection */}
              <div className="mb-3 sm:mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Tags *
                </label>
                
                {/* Selected Tags Display */}
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {selectedTags.length} Tags selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSelectAllTags}
                        className="flex-1 sm:flex-none px-3 py-2 sm:py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                      >
                        All
                      </button>
                      <button
                        onClick={handleSelectNoneTags}
                        className="flex-1 sm:flex-none px-3 py-2 sm:py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag List */}
                <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
                  {getFilteredTags().map((tag) => (
                    <label
                      key={tag}
                      className={`flex items-start sm:items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedTags.includes(tag) ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5 sm:mt-0 flex-shrink-0"
                      />
                      <span className="ml-3 text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTagModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveTags}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
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
                        className="w-3 h-3 md:w-4 md:h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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

      {/* Add New User Modal */}
      <AddNewUserPopup
        isOpen={showAddNewUserModal}
        onClose={() => setShowAddNewUserModal(false)}
        onSubmit={handleAddNewUser}
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

      {/* User Details Popup */}
      <UserDetailsPopup
        user={selectedUser}
        isOpen={showUserDetails}
        onClose={() => setShowUserDetails(false)}
      />
    </div>
  )
}

export default DataTable 