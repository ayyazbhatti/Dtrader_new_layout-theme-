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
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Upload,
  UserPlus,
  Filter,
  Trash2,
  X,
  Eye
} from 'lucide-react'
import GroupSettingsDetailsPopup from './GroupSettingsDetailsPopup'
import { useColumnVisibility } from './useColumnVisibility'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'

// Group Profile data interface
export interface GroupProfileData {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
  memberCount: number
  totalBalance: number
  totalEquity: number
}

// Mock data for group profiles
const groupProfileData: GroupProfileData[] = [
  {
    id: '1',
    name: 'Default Group',
    description: 'Default group for new users with standard trading conditions',
    status: 'active',
    createdAt: '2024-01-15',
    memberCount: 45,
    totalBalance: 1250000,
    totalEquity: 1280000,
  },
  {
    id: '2',
    name: 'Premium Group',
    description: 'Premium trading group with advanced features and lower spreads',
    status: 'active',
    createdAt: '2024-02-01',
    memberCount: 23,
    totalBalance: 890000,
    totalEquity: 915000,
  },
  {
    id: '3',
    name: 'VIP Group',
    description: 'VIP group for high-value traders with exclusive benefits',
    status: 'active',
    createdAt: '2024-01-20',
    memberCount: 12,
    totalBalance: 2100000,
    totalEquity: 2180000,
  },
  {
    id: '4',
    name: 'Standard Group',
    description: 'Standard trading group with balanced features and moderate spreads',
    status: 'active',
    createdAt: '2024-01-10',
    memberCount: 67,
    totalBalance: 980000,
    totalEquity: 995000,
  },
  {
    id: '5',
    name: 'Test Group',
    description: 'Testing group for development and quality assurance purposes',
    status: 'inactive',
    createdAt: '2024-03-01',
    memberCount: 8,
    totalBalance: 150000,
    totalEquity: 148000,
  },
  {
    id: '6',
    name: 'Professional Group',
    description: 'Professional trading group for experienced traders',
    status: 'active',
    createdAt: '2024-01-25',
    memberCount: 18,
    totalBalance: 1750000,
    totalEquity: 1820000,
  },
  {
    id: '7',
    name: 'Beginner Group',
    description: 'Beginner-friendly group with educational resources and support',
    status: 'active',
    createdAt: '2024-02-15',
    memberCount: 89,
    totalBalance: 450000,
    totalEquity: 465000,
  },
  {
    id: '8',
    name: 'Scalper Group',
    description: 'High-frequency trading group for scalping strategies',
    status: 'active',
    createdAt: '2024-01-05',
    memberCount: 15,
    totalBalance: 3200000,
    totalEquity: 3350000,
  },
]

const GroupProfilesTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<GroupProfileData | null>(null)
  const [isGroupSettingsOpen, setIsGroupSettingsOpen] = useState(false)
  const [deleteGroup, setDeleteGroup] = useState<GroupProfileData | null>(null)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isAddGroupPopupOpen, setIsAddGroupPopupOpen] = useState(false)
    const [isClientVisible, setIsClientVisible] = useState(true)

  // Column visibility hook
  const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<GroupProfileData>()

  const columnHelper = createColumnHelper<GroupProfileData>()

  const columns = useMemo<ColumnDef<GroupProfileData, any>[]>(
    () => [
      // Checkbox column
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

      // Description column
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ getValue }) => {
          const description = getValue<string>();
          const words = description.split(' ');
          const truncatedText = words.length > 5 ? `${words.slice(0, 5).join(' ')}...` : description;
          
          return (
            <span 
              className="text-sm text-gray-600 dark:text-gray-400 max-w-xs cursor-help"
              title={description}
            >
              {truncatedText}
            </span>
          );
        },
        size: 300,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Actions column
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedGroup(row.original)
                setIsGroupSettingsOpen(true)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gray-600 text-gray-400 rounded-full hover:bg-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Settings className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Group Settings
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setDeleteGroup(row.original)
                setIsDeletePopupOpen(true)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Trash2 className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Delete Group
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
          </div>
        ),
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        size: 150,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: groupProfileData,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: 'includesString',
    columnResizeDirection: 'ltr',
  })

  return (
    <div className="space-y-4">
      {/* Advanced Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-2 sm:space-y-0"
          onClick={() => setFilterPanelOpen(!filterPanelOpen)}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Refine your search with multiple criteria</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">0 active filters</span>
            {filterPanelOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            )}
          </div>
        </div>

        {filterPanelOpen && (
          <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search group profiles..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toolbar with Action Buttons and Search */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 mb-4 border-2 border-gray-600 dark:border-gray-500 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left Section - Action Buttons */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-700 dark:bg-gray-600 rounded-lg p-2 flex items-center space-x-2 border border-gray-500 dark:border-gray-400 shadow-md">
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Download className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Download Group Profiles
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Import Group Profiles
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={() => setIsAddGroupPopupOpen(true)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
              >
                <UserPlus className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Add New Group Profile
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={(e) => handleColumnVisibilityMenu(e, table)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
              >
                <Eye className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Section - Column Visibility and Search */}
          <div className="flex items-center space-x-3">


            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-48 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 ${
                        header.column.getCanSort() ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                      }`}
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center justify-between ${
                            header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center space-x-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="w-4 h-4 text-blue-600" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm transition-all duration-150 cursor-pointer select-none ${
                    row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => {
                    setSelectedGroup(row.original)
                    setIsGroupSettingsOpen(true)
                  }}
                  title={`Click to view ${row.original.name} settings`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600"
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                          pageNumber === pageIndex
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]`}
                      >
                        {pageNumber + 1}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center space-x-1">
                {/* First/Previous buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="First page"
                  >
                    <ChevronsLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                </div>

                {/* Next/Last buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Next page"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
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



      {/* Group Settings Details Popup */}
      <GroupSettingsDetailsPopup
        group={selectedGroup}
        isOpen={isGroupSettingsOpen}
        onClose={() => {
          setIsGroupSettingsOpen(false)
          setSelectedGroup(null)
        }}
      />

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && deleteGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Group Profile</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">"{deleteGroup.name}"</span>?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This will permanently remove the group profile and all associated settings. Users assigned to this profile may be affected.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsDeletePopupOpen(false)
                  setDeleteGroup(null)
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete logic here
                  console.log('Deleting group:', deleteGroup.name)
                  // You can add API call here to actually delete the group
                  
                  // Close popup and reset state
                  setIsDeletePopupOpen(false)
                  setDeleteGroup(null)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Column Visibility Popup */}
      <ColumnVisibilityPopup 
        table={table}
        columnVisibilityMenu={columnVisibilityMenu}
        onClose={closeColumnVisibilityMenu}
      />

      {/* Add New Group Profile Popup */}
      {isAddGroupPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Group Profile</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create a new group profile with custom settings</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddGroupPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter profile name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter profile description"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Visibility
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsClientVisible(!isClientVisible)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isClientVisible ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          isClientVisible ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {isClientVisible ? 'Visible to Clients' : 'Hidden from Clients'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Toggle to control whether this leverage profile is visible to clients in their trading interface
                  </p>
                </div>
              </div>

              {/* Leverage Settings */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Leverage Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Base Leverage
                    </label>
                    <input
                      type="text"
                      placeholder="1:100"
                      defaultValue="1:100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maximum Leverage
                    </label>
                    <input
                      type="text"
                      placeholder="1:500"
                      defaultValue="1:500"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Margin Call Level
                    </label>
                    <input
                      type="text"
                      placeholder="150%"
                      defaultValue="150%"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Trading Settings */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Trading Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Minimum Lot Size
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.01"
                      defaultValue="0.01"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maximum Lot Size
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="100.0"
                      defaultValue="100.0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Commission Settings */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Commission Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Commission per Lot
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="7.00"
                      defaultValue="7.00"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Minimum Commission
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="3.50"
                      defaultValue="3.50"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsAddGroupPopupOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle create logic here
                  console.log('Creating new group profile with client visibility:', isClientVisible ? 'Visible' : 'Hidden')
                  // You can add API call here to actually create the group profile
                  
                  // Close popup
                  setIsAddGroupPopupOpen(false)
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupProfilesTable 