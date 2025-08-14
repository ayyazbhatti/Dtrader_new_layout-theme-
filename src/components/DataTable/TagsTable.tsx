import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table'
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  User,
  Globe,
  Tag,
} from 'lucide-react'
import { CSS_CLASSES } from './constants'

// Tag data interface
interface TagData {
  id: string
  name: string
  domain: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  description?: string
  color?: string
}

// Mock data for tags
const mockTagData: TagData[] = [
  {
    id: '1',
    name: 'Premium User',
    domain: 'dtrader.com',
    createdBy: 'John Admin',
    updatedBy: 'John Admin',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    description: 'Tag for premium users',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'VIP Member',
    domain: 'mt4.com',
    createdBy: 'Sarah Manager',
    updatedBy: 'Sarah Manager',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    description: 'Tag for VIP members',
    color: '#8B5CF6'
  },
  {
    id: '3',
    name: 'New Trader',
    domain: 'mt5.com',
    createdBy: 'Mike Support',
    updatedBy: 'Mike Support',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    description: 'Tag for new traders',
    color: '#10B981'
  },
  {
    id: '4',
    name: 'Risk Manager',
    domain: 'ctrader.com',
    createdBy: 'Lisa Admin',
    updatedBy: 'Lisa Admin',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    description: 'Tag for risk managers',
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Institutional',
    domain: 'dtrader.com',
    createdBy: 'David Manager',
    updatedBy: 'David Manager',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    description: 'Tag for institutional clients',
    color: '#EF4444'
  },
  {
    id: '6',
    name: 'Demo Account',
    domain: 'mt4.com',
    createdBy: 'Alex Support',
    updatedBy: 'Alex Support',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    description: 'Tag for demo accounts',
    color: '#6B7280'
  },
  {
    id: '7',
    name: 'Live Trading',
    domain: 'mt5.com',
    createdBy: 'Emma Admin',
    updatedBy: 'Emma Admin',
    createdAt: '2023-12-28',
    updatedAt: '2023-12-28',
    description: 'Tag for live trading accounts',
    color: '#EC4899'
  },
  {
    id: '8',
    name: 'Copy Trading',
    domain: 'ctrader.com',
    createdBy: 'Tom Manager',
    updatedBy: 'Tom Manager',
    createdAt: '2023-12-25',
    updatedAt: '2023-12-25',
    description: 'Tag for copy trading users',
    color: '#14B8A6'
  },
  {
    id: '9',
    name: 'Gold Trader',
    domain: 'dtrader.com',
    createdBy: 'Emma Analyst',
    updatedBy: 'Emma Analyst',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    description: 'Tag for gold trading specialists',
    color: '#F59E0B'
  },
  {
    id: '10',
    name: 'Forex Expert',
    domain: 'mt4.com',
    createdBy: 'Alex Trader',
    updatedBy: 'Alex Trader',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    description: 'Tag for forex trading experts',
    color: '#06B6D4'
  },
  {
    id: '11',
    name: 'Crypto Trader',
    domain: 'mt5.com',
    createdBy: 'Crypto Admin',
    updatedBy: 'Crypto Admin',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    description: 'Tag for cryptocurrency traders',
    color: '#8B5CF6'
  },
  {
    id: '12',
    name: 'Stock Investor',
    domain: 'ctrader.com',
    createdBy: 'Stock Manager',
    updatedBy: 'Stock Manager',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    description: 'Tag for stock market investors',
    color: '#10B981'
  },
  {
    id: '13',
    name: 'Commodity Trader',
    domain: 'dtrader.com',
    createdBy: 'Commodity Admin',
    updatedBy: 'Commodity Admin',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    description: 'Tag for commodity traders',
    color: '#F97316'
  },
  {
    id: '14',
    name: 'Scalper',
    domain: 'mt4.com',
    createdBy: 'Scalp Manager',
    updatedBy: 'Scalp Manager',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    description: 'Tag for scalping traders',
    color: '#EC4899'
  },
  {
    id: '15',
    name: 'Swing Trader',
    domain: 'mt5.com',
    createdBy: 'Swing Admin',
    updatedBy: 'Swing Admin',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    description: 'Tag for swing trading strategies',
    color: '#84CC16'
  },
  {
    id: '16',
    name: 'Day Trader',
    domain: 'ctrader.com',
    createdBy: 'Day Manager',
    updatedBy: 'Day Manager',
    createdAt: '2024-01-06',
    updatedAt: '2024-01-06',
    description: 'Tag for day trading specialists',
    color: '#6366F1'
  },
  {
    id: '17',
    name: 'Position Trader',
    domain: 'dtrader.com',
    createdBy: 'Position Admin',
    updatedBy: 'Position Admin',
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
    description: 'Tag for position trading',
    color: '#14B8A6'
  },
  {
    id: '18',
    name: 'Algorithmic Trader',
    domain: 'mt4.com',
    createdBy: 'Algo Manager',
    updatedBy: 'Algo Manager',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    description: 'Tag for algorithmic trading',
    color: '#F43F5E'
  },
  {
    id: '19',
    name: 'Social Trader',
    domain: 'mt5.com',
    createdBy: 'Social Admin',
    updatedBy: 'Social Admin',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    description: 'Tag for social trading',
    color: '#8B5CF6'
  },
  {
    id: '20',
    name: 'Professional Trader',
    domain: 'ctrader.com',
    createdBy: 'Professional Admin',
    updatedBy: 'Professional Admin',
    createdAt: '2023-12-30',
    updatedAt: '2023-12-30',
    description: 'Tag for professional traders',
    color: '#EF4444'
  }
]

const columnHelper = createColumnHelper<TagData>()

const TagsTable: React.FC = () => {
  // State management
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [domainFilter, setDomainFilter] = useState('')
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState<TagData | null>(null)
  const [showTagDetails, setShowTagDetails] = useState(false)

  // Define columns
  const columns = useMemo(
    () => [
      // Name Column
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: row.original.color || '#6B7280' }}
            />
            <span className="font-medium text-gray-900 dark:text-white">
              {row.original.name}
            </span>
          </div>
        ),
        size: 200,
      }),

      // Domain Column
      columnHelper.accessor('domain', {
        header: 'Domain',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {getValue()}
            </span>
          </div>
        ),
        size: 150,
      }),

      // Created By Column
      columnHelper.accessor('createdBy', {
        header: 'Created By',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {getValue()}
            </span>
          </div>
        ),
        size: 150,
      }),

      // Updated By Column
      columnHelper.accessor('updatedBy', {
        header: 'Updated By',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {getValue()}
            </span>
          </div>
        ),
        size: 150,
      }),

      // Action Column
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedTag(row.original)
                setShowTagDetails(true)
              }}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedTag(row.original)
                setShowAddTagModal(true)
              }}
              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-200"
              title="Edit Tag"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Handle delete
                if (confirm(`Are you sure you want to delete the tag "${row.original.name}"?`)) {
                  // Delete logic here
                }
              }}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
              title="Delete Tag"
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

  // Filter data based on search and domain
  const filteredData = useMemo(() => {
    let filtered = mockTagData

    if (searchValue) {
      filtered = filtered.filter(tag =>
        tag.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        tag.domain.toLowerCase().includes(searchValue.toLowerCase()) ||
        tag.createdBy.toLowerCase().includes(searchValue.toLowerCase()) ||
        tag.updatedBy.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    if (domainFilter) {
      filtered = filtered.filter(tag => tag.domain === domainFilter)
    }

    return filtered
  }, [searchValue, domainFilter])

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Get unique domains for filter
  const uniqueDomains = useMemo(() => {
    const domains = [...new Set(mockTagData.map(tag => tag.domain))]
    return domains.sort()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tags Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize tags for better user categorization
          </p>
        </div>
        <button
          onClick={() => setShowAddTagModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tag</span>
        </button>
      </div>

      {/* Advanced Filters */}
      <div className={CSS_CLASSES.TABLE_CONTAINER}>
        <div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-2 sm:space-y-3 lg:space-y-0"
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
            <span className="text-xs sm:text-sm text-gray-400">
              {searchValue || domainFilter ? '2 active filters' : '0 active filters'}
            </span>
            {filterPanelOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            )}
          </div>
        </div>

        {filterPanelOpen && (
          <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:gap-4 lg:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tags by name, domain, or user..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={CSS_CLASSES.INPUT_BASE + " w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 py-2 sm:py-3"}
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {/* Domain Filter */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Domain</label>
                <div className="relative">
                  <select 
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className={CSS_CLASSES.INPUT_BASE + " w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10"}
                  >
                    <option value="">All Domains</option>
                    {uniqueDomains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                  {domainFilter && (
                    <button 
                      onClick={() => setDomainFilter('')}
                      className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                onClick={() => {
                  setSearchValue('')
                  setDomainFilter('')
                }}
                className={CSS_CLASSES.BUTTON_SECONDARY + " px-3 sm:px-4 lg:px-6 py-2 text-sm sm:text-base"}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tags Table */}
      <div className={CSS_CLASSES.TABLE_CONTAINER}>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ 
                        width: header.getSize(), 
                        minWidth: '60px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        <div className="flex items-center space-x-1">
                          {header.column.getCanSort() && (
                            <span className="ml-1">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="w-4 h-4 text-blue-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </span>
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
                >
                  {row.getVisibleCells().map(cell => (
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
                of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{table.getFilteredRowModel().rows.length}</span>{' '}
                results
              </span>
            </div>

            <div className="table-footer-right">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Tag Modal */}
      {showAddTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTag ? 'Edit Tag' : 'Add New Tag'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {selectedTag ? 'Update existing tag information' : 'Create a new tag for your system'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddTagModal(false)
                  setSelectedTag(null)
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 self-end sm:self-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Tag Name and Domain Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tag Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTag?.name || ''}
                    placeholder="Enter tag name"
                    className={CSS_CLASSES.INPUT_BASE}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Domain
                  </label>
                  <select className={CSS_CLASSES.INPUT_BASE}>
                    <option value="">Select domain</option>
                    {uniqueDomains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedTag?.description || ''}
                  placeholder="Enter tag description"
                  rows={3}
                  className={CSS_CLASSES.INPUT_BASE}
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <input
                  type="color"
                  defaultValue={selectedTag?.color || '#3B82F6'}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
              <button
                onClick={() => {
                  setShowAddTagModal(false)
                  setSelectedTag(null)
                }}
                className={CSS_CLASSES.BUTTON_SECONDARY}
              >
                Cancel
              </button>
              <button className={CSS_CLASSES.BUTTON_PRIMARY}>
                {selectedTag ? 'Update Tag' : 'Create Tag'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Details Modal */}
      {showTagDetails && selectedTag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedTag.color || '#6B7280' }}
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tag Details
                </h3>
              </div>
              <button
                onClick={() => setShowTagDetails(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">{selectedTag.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Domain
                </label>
                <p className="text-gray-900 dark:text-white">{selectedTag.domain}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Description
                </label>
                <p className="text-gray-900 dark:text-white">{selectedTag.description || 'No description provided'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Created By
                </label>
                <p className="text-gray-900 dark:text-white">{selectedTag.createdBy}</p>
              </div>

                             <div>
                 <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                   Created At
                 </label>
                 <p className="text-gray-900 dark:text-white">{selectedTag.createdAt}</p>
               </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Updated By
                </label>
                <p className="text-gray-900 dark:text-white">{selectedTag.updatedBy}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Updated At
                </label>
                <p className="text-white">{selectedTag.updatedAt}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-3">
              <button
                onClick={() => setShowTagDetails(false)}
                className={CSS_CLASSES.BUTTON_SECONDARY}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowTagDetails(false)
                  setShowAddTagModal(true)
                }}
                className={CSS_CLASSES.BUTTON_PRIMARY}
              >
                Edit Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TagsTable 