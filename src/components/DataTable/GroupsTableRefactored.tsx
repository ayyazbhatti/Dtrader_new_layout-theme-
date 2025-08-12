import React, { useState, useMemo } from 'react'
import { 
  createColumnHelper, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  ColumnSizingState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  useReactTable,
  flexRender
} from '@tanstack/react-table'
import { 
  ChevronDown, 
  ChevronUp, 
  Settings,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Edit,
  Trash2
} from 'lucide-react'
import { GroupsTableHeader } from './components/GroupsTableHeader'
import { GroupsTableFilters } from './components/GroupsTableFilters'
import AddGroupPopup from './AddGroupPopup'
import GroupSettingsPopup from './GroupSettingsPopup'

// Group data interface
export interface GroupData {
  id: string
  name: string
  stopOutLevel: number
  priceStream: string
  memberCount: number
  totalBalance: number
  totalEquity: number
  status: 'active' | 'inactive'
  createdAt: string
  description: string
  swapsProfile?: string
  tags?: string
  openPositionDelay?: number
  tradeExecutionDelay?: number
  minMarginLevel?: number
  showSwapDetails?: boolean
  showStopOutDetails?: boolean
}

// Mock data for groups
const groupData: GroupData[] = [
  {
    id: '1',
    name: 'Default Group',
    stopOutLevel: 50.0,
    priceStream: 'Default Price Stream',
    memberCount: 45,
    totalBalance: 1250000,
    totalEquity: 1280000,
    status: 'active',
    createdAt: '2024-01-15',
    description: 'Default group for new users with standard trading conditions'
  },
  {
    id: '2',
    name: 'Premium Group',
    stopOutLevel: 30.0,
    priceStream: 'Premium Price Stream',
    memberCount: 23,
    totalBalance: 890000,
    totalEquity: 915000,
    status: 'active',
    createdAt: '2024-02-01',
    description: 'Premium trading group with advanced features and lower spreads'
  },
  {
    id: '3',
    name: 'VIP Group',
    stopOutLevel: 20.0,
    priceStream: 'VIP Price Stream',
    memberCount: 12,
    totalBalance: 2100000,
    totalEquity: 2180000,
    status: 'active',
    createdAt: '2024-01-20',
    description: 'VIP group for high-value traders with exclusive benefits'
  },
  {
    id: '4',
    name: 'Standard Group',
    stopOutLevel: 60.0,
    priceStream: 'Standard Price Stream',
    memberCount: 67,
    totalBalance: 980000,
    totalEquity: 995000,
    status: 'active',
    createdAt: '2024-01-10',
    description: 'Standard group for regular traders with balanced conditions'
  },
  {
    id: '5',
    name: 'Test Group',
    stopOutLevel: 80.0,
    priceStream: 'Test Price Stream',
    memberCount: 8,
    totalBalance: 150000,
    totalEquity: 148000,
    status: 'inactive',
    createdAt: '2024-03-01',
    description: 'Test group for development and testing purposes'
  }
]

/**
 * Refactored GroupsTable Component
 * 
 * This version demonstrates the improved architecture by:
 * - Using smaller, focused components
 * - Better separation of concerns
 * - Improved maintainability
 * - Cleaner main component logic
 */
const GroupsTableRefactored: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [isAddGroupPopupOpen, setIsAddGroupPopupOpen] = useState(false)
  const [isGroupSettingsPopupOpen, setIsGroupSettingsPopupOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [isEditGroupPopupOpen, setIsEditGroupPopupOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<GroupData | null>(null)

  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    stopOutLevel: '',
    memberCount: '',
    totalBalance: '',
    priceStream: '',
    createdAt: ''
  })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columnHelper = createColumnHelper<GroupData>()

  // Event handlers
  const handleAddGroup = (groupData: any) => {
    console.log('Adding new group:', groupData)
    setIsAddGroupPopupOpen(false)
  }

  const handleGroupSettings = (settings: any) => {
    console.log('Updating group settings:', settings)
    setIsGroupSettingsPopupOpen(false)
  }

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      status: '',
      stopOutLevel: '',
      memberCount: '',
      totalBalance: '',
      priceStream: '',
      createdAt: ''
    })
  }

  const handleApplyFilters = () => {
    // Apply filter logic here
    setFilterPanelOpen(false)
  }

  const handleExport = () => {
    console.log('Exporting groups data...')
  }

  const handleImport = () => {
    console.log('Importing groups data...')
  }

  const handleTagManagement = () => {
    console.log('Opening tag management...')
  }

  const getSortIcon = (field: string) => {
    const column = sorting.find(col => col.id === field)
    if (!column) return null
    return column.desc ? (
      <ChevronDown className="w-4 h-4" />
    ) : (
      <ChevronUp className="w-4 h-4" />
    )
  }

  const columns = useMemo<ColumnDef<GroupData, any>[]>(
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
        size: 50,
      }),

      // Name column
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 200,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Stop Out Level column
      columnHelper.display({
        id: 'stopOutLevel',
        header: 'Stop Out %',
        cell: ({ row }) => <span>{row.original.stopOutLevel || '0.00'}</span>,
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Price Stream column
      columnHelper.display({
        id: 'priceStream',
        header: 'Price Feed',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <span>{row.original.priceStream || 'Default Price Stream'}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedGroup(row.original)
                // TODO: Implement price stream popup
              }}
              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
              title="View Price Stream"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 150,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Member Count column
      columnHelper.accessor('memberCount', {
        header: 'Members',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Total Balance column
      columnHelper.accessor('totalBalance', {
        header: 'Total Balance',
        cell: ({ getValue }) => (
          <span className="font-mono text-right">
            ${getValue().toLocaleString()}
          </span>
        ),
        size: 140,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Total Equity column
      columnHelper.accessor('totalEquity', {
        header: 'Total Equity',
        cell: ({ getValue }) => (
          <span className="font-mono text-right">
            ${getValue().toLocaleString()}
          </span>
        ),
        size: 140,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Status column
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            getValue() === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {getValue()}
          </span>
        ),
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Created Date column
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(getValue()).toLocaleDateString()}
          </span>
        ),
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Actions column
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedGroup(row.original)
                setIsGroupSettingsPopupOpen(true)
              }}
              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              title="Group Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setEditingGroup(row.original)
                setIsEditGroupPopupOpen(true)
              }}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Edit Group"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // TODO: Implement delete confirmation
                console.log('Delete group:', row.original.id)
              }}
              className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              title="Delete Group"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
      }),
    ],
    [sorting]
  )

  // Table instance
  const table = useReactTable({
    data: groupData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnSizing,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnSizingChange: setColumnSizing,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
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

  return (
    <div className="space-y-4">
      {/* Header Component */}
      <GroupsTableHeader
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        onShowFilters={() => setFilterPanelOpen(!filterPanelOpen)}
        showFilters={filterPanelOpen}
        onAddGroup={() => setIsAddGroupPopupOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
        onTagManagement={handleTagManagement}
        selectedRows={table.getFilteredSelectedRowModel().rows.length}
        totalRows={table.getFilteredRowModel().rows.length}
      />

      {/* Filters Component */}
      {filterPanelOpen && (
        <GroupsTableFilters
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
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
            <thead className="bg-gray-50 dark:bg-gray-700">
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
                        {header.column.getCanSort() && getSortIcon(header.column.id)}
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
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
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

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Components */}
      {isAddGroupPopupOpen && (
        <AddGroupPopup
          isOpen={isAddGroupPopupOpen}
          onClose={() => setIsAddGroupPopupOpen(false)}
          onSubmit={handleAddGroup}
        />
      )}

      {isGroupSettingsPopupOpen && selectedGroup && (
        <GroupSettingsPopup
          isOpen={isGroupSettingsPopupOpen}
          onClose={() => {
            setIsGroupSettingsPopupOpen(false)
            setSelectedGroup(null)
          }}
          onSubmit={handleGroupSettings}
          groupData={selectedGroup}
        />
      )}
    </div>
  )
}

export default GroupsTableRefactored 