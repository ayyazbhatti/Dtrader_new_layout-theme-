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
import { Eye, Bot, Users2, Tag, AlertTriangle, Settings, MoreHorizontal } from 'lucide-react'
import { getSortIcon, formatCurrency, formatMarginLevel, formatPnL } from './utils'
import { TABLE_CONFIG, CSS_CLASSES } from './constants'
import { UserData } from './types'
import { mockUserData } from './data'
import { useContextMenu, useKeyboardShortcuts } from './hooks'
import { useColumnVisibility } from './useColumnVisibility'
import {
  DataTableHeader,
  DataTableFilters,
  DataTablePagination,
  ColumnVisibilityPopup,
  GroupAssignmentPopup,
  BotAssignmentPopup,
  PriceDropAlertPopup,
  SubscriptionDatePopup,
  AddNewUserPopup,
  UserDetailsPopup
} from './components'

const columnHelper = createColumnHelper<UserData>()

/**
 * Refactored DataTable Component
 * 
 * This version demonstrates the improved architecture by:
 * - Using smaller, focused components
 * - Better separation of concerns
 * - Improved maintainability
 * - Cleaner main component logic
 */
const DataTableRefactored: React.FC = () => {
  // Core table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)

  // Popup states
  const [showAddNewUser, setShowAddNewUser] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [showGroupAssignment, setShowGroupAssignment] = useState(false)
  const [showBotAssignment, setShowBotAssignment] = useState(false)
  const [showPriceDropAlert, setShowPriceDropAlert] = useState(false)
  const [showSubscriptionDate, setShowSubscriptionDate] = useState(false)

  // Selected user for details
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

  // Filter state
  const [filters, setFilters] = useState({
    onlineStatus: '',
    botStatus: '',
    balanceRange: '',
    group: '',
    emailDomain: '',
    createdDate: '',
    tags: [] as string[]
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
        enableHiding: false,
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

      // Actions
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedUser(row.original)
                setShowUserDetails(true)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedUser(row.original)
                setShowGroupAssignment(true)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Assign Group"
            >
              <Users2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedUser(row.original)
                setShowBotAssignment(true)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Assign Bot"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedUser(row.original)
                setShowPriceDropAlert(true)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Price Alert"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedUser(row.original)
                setShowSubscriptionDate(true)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Subscription"
            >
              <Tag className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
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
    onColumnSizingChange: setColumnSizing,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    enableColumnResizing: true,
    enableSorting: true,
    enableFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: 'includesString',
  })

  // Event handlers
  const handleSearchChange = (value: string) => setGlobalFilter(value)
  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }
  const handleClearFilters = () => setFilters({
    onlineStatus: '',
    botStatus: '',
    balanceRange: '',
    group: '',
    emailDomain: '',
    createdDate: '',
    tags: []
  })
  const handleApplyFilters = () => {
    // Apply filter logic here
    setShowFilters(false)
  }

  const handleExport = () => {
    // Export logic here
    console.log('Exporting data...')
  }

  const handleImport = () => {
    // Import logic here
    console.log('Importing data...')
  }

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1)
  }

  const handlePageSizeChange = (size: number) => {
    table.setPageSize(size)
  }

  // Keyboard shortcuts
  useKeyboardShortcuts(table, showFilters, setShowFilters)

  return (
    <div className="space-y-4">
      {/* Header Component */}
      <DataTableHeader
        searchValue={globalFilter}
        onSearchChange={handleSearchChange}
        onShowFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        onAddNewUser={() => setShowAddNewUser(true)}
        onExport={handleExport}
        onImport={handleImport}
        selectedRows={table.getFilteredSelectedRowModel().rows.length}
        totalRows={table.getFilteredRowModel().rows.length}
      />

      {/* Filters Component */}
      {showFilters && (
        <DataTableFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onApplyFilters={handleApplyFilters}
        />
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`border-r border-gray-100 dark:border-gray-700 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getCanSort() && getSortIcon(header.column)}
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
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                    row.getIsSelected() ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
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

        {/* Pagination Component */}
        <DataTablePagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          totalRows={table.getFilteredRowModel().rows.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {/* Popup Components */}
      {showAddNewUser && (
        <AddNewUserPopup
          isOpen={showAddNewUser}
          onClose={() => setShowAddNewUser(false)}
          onSubmit={(data) => {
            console.log('New user data:', data)
            setShowAddNewUser(false)
          }}
        />
      )}

      {showUserDetails && selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          isOpen={showUserDetails}
          onClose={() => {
            setShowUserDetails(false)
            setSelectedUser(null)
          }}
        />
      )}

      {showGroupAssignment && selectedUser && (
        <GroupAssignmentPopup
          isOpen={showGroupAssignment}
          onClose={() => {
            setShowGroupAssignment(false)
            setSelectedUser(null)
          }}
          selectedUsers={[selectedUser]}
          onAssignGroups={(userId: string, group: string) => {
            console.log('Assigning user to group:', { userId, group })
            setShowGroupAssignment(false)
            setSelectedUser(null)
          }}
          availableGroups={['DefaultGro', 'Premium', 'Standard', 'VIP']}
        />
      )}

      {showBotAssignment && selectedUser && (
        <BotAssignmentPopup
          isOpen={showBotAssignment}
          onClose={() => {
            setShowBotAssignment(false)
            setSelectedUser(null)
          }}
          selectedUsers={[selectedUser]}
          onAssignBot={(userId: string, botSetting: string) => {
            console.log('Assigning bot setting:', { userId, botSetting })
            setShowBotAssignment(false)
            setSelectedUser(null)
          }}
          onUnassignBot={(userId: string) => {
            console.log('Unassigning bot from user:', userId)
            setShowBotAssignment(false)
            setSelectedUser(null)
          }}
          availableBotSettings={['Conservative', 'Aggressive', 'Moderate', 'Manual', 'High Risk', 'Balanced']}
        />
      )}

      {showPriceDropAlert && selectedUser && (
        <PriceDropAlertPopup
          isOpen={showPriceDropAlert}
          onClose={() => {
            setShowPriceDropAlert(false)
            setSelectedUser(null)
          }}
          onSend={(data) => {
            console.log('Price drop alert data:', data)
            setShowPriceDropAlert(false)
            setSelectedUser(null)
          }}
        />
      )}

      {showSubscriptionDate && selectedUser && (
        <SubscriptionDatePopup
          isOpen={showSubscriptionDate}
          onClose={() => {
            setShowSubscriptionDate(false)
            setSelectedUser(null)
          }}
          onSaveSubscription={(data) => {
            console.log('Subscription data:', data)
            setShowSubscriptionDate(false)
            setSelectedUser(null)
          }}
          onSaveDate={(data) => {
            console.log('Subscription date data:', data)
            setShowSubscriptionDate(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

export default DataTableRefactored 