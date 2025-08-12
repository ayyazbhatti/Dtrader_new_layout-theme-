import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import ManagerDetailsPopup from './ManagerDetailsPopup'
import AddManagerPopup from './AddManagerPopup'

// Types for manager data
import { ManagerData } from './types'

// Mock data for managers
const mockManagerData: ManagerData[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Senior Manager',
    domain: 'company.com',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-02-20'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@trading.com',
    role: 'Account Manager',
    domain: 'trading.com',
    status: 'active',
    createdAt: '2024-01-20',
    lastLogin: '2024-02-19'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@finance.com',
    role: 'Team Lead',
    domain: 'finance.com',
    status: 'inactive',
    createdAt: '2024-01-10',
    lastLogin: '2024-02-15'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@investment.com',
    role: 'Senior Manager',
    domain: 'investment.com',
    status: 'active',
    createdAt: '2024-01-25',
    lastLogin: '2024-02-20'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@broker.com',
    role: 'Account Manager',
    domain: 'broker.com',
    status: 'active',
    createdAt: '2024-01-30',
    lastLogin: '2024-02-18'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@trading.com',
    role: 'Team Lead',
    domain: 'trading.com',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-02-20'
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.taylor@finance.com',
    role: 'Senior Manager',
    domain: 'finance.com',
    status: 'inactive',
    createdAt: '2024-01-05',
    lastLogin: '2024-02-10'
  },
  {
    id: '8',
    name: 'Jennifer White',
    email: 'jennifer.white@investment.com',
    role: 'Account Manager',
    domain: 'investment.com',
    status: 'active',
    createdAt: '2024-01-28',
    lastLogin: '2024-02-19'
  }
]

const columnHelper = createColumnHelper<ManagerData>()

const ManagerTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectedManager, setSelectedManager] = useState<ManagerData | null>(null)
  const [isManagerDetailsOpen, setIsManagerDetailsOpen] = useState(false)
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false)

  const handleAddManager = (managerData: any) => {
    // TODO: Implement API call to create new manager
    console.log('Creating new manager:', managerData)
    
    // For now, just close the popup
    setIsAddManagerOpen(false)
    
    // You can add the new manager to the table data here
    // setTableData(prev => [...prev, newManager])
  }

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

      // Status column
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${getValue() === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className={`text-xs font-medium ${getValue() === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {getValue() === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        ),
        size: 80,
        enableResizing: true,
        enableHiding: true,
      }),

      // ID column
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
        size: 60,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Name column
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 150,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Email column
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => <span className="text-blue-600 dark:text-blue-400">{getValue()}</span>,
        size: 200,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Role column
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ getValue }) => <span>{getValue()}</span>,
        size: 140,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Domain column
      columnHelper.accessor('domain', {
        header: 'Domain',
        cell: ({ getValue }) => <span className="font-mono text-sm">{getValue()}</span>,
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Created Date column
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
        size: 100,
        enableResizing: true,
        enableHiding: true,
      }),

      // Last Login column
      columnHelper.accessor('lastLogin', {
        header: 'Last Login',
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
        size: 120,
        enableResizing: true,
        enableHiding: true,
      }),

      // Actions column
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('View manager:', row.original.id)
              }}
              className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="View Manager"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('Edit manager:', row.original.id)
              }}
              className="p-1 text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              title="Edit Manager"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('Delete manager:', row.original.id)
              }}
              className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Delete Manager"
            >
              <Trash2 className="w-4 h-4" />
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

  const table = useReactTable({
    data: mockManagerData,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="space-y-6 relative">
      {/* Enhanced Table Controls */}
      <div className="mobile-expanded-view bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 sm:p-3 lg:p-4 relative z-20">
        <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
          
          {/* Mobile Controls - Visible only on mobile */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsAddManagerOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manager</span>
              </button>
              
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8 pr-3 py-2 w-32 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden sm:block">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              {/* Left Controls */}
              <div className="flex items-center space-x-2">
                <button
                  className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
                  title="Add New Manager - Create a new manager account"
                  onClick={() => setIsAddManagerOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                    Add New Manager
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-2 ml-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search managers..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-8 pr-3 py-1.5 w-full sm:w-40 lg:w-56 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  {globalFilter && (
                    <button
                      onClick={() => setGlobalFilter('')}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                {columnFilters.length > 0 && (
                  <span className="text-sm text-orange-600 dark:text-orange-400 font-medium flex items-center">
                    <Filter className="w-3 h-3 mr-1" />
                    {columnFilters.length} active filters
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Main Table */}
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
                    >
                      <div className="flex items-center justify-between">
                        <span>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                        <div className="flex items-center space-x-1">
                          {header.column.getCanSort() && (
                            <div className="ml-2">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
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
                  onClick={() => {
                    setSelectedManager(row.original)
                    setIsManagerDetailsOpen(true)
                  }}
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
                    <ChevronsRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Details Popup */}
      <ManagerDetailsPopup
        manager={selectedManager}
        isOpen={isManagerDetailsOpen}
        onClose={() => {
          setIsManagerDetailsOpen(false)
          setSelectedManager(null)
        }}
      />

      {/* Add Manager Popup */}
      <AddManagerPopup
        isOpen={isAddManagerOpen}
        onClose={() => setIsAddManagerOpen(false)}
        onSave={handleAddManager}
      />
    </div>
  )
}

export default ManagerTable 