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
} from '@tanstack/react-table'
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Users,
  Lock,
  Key,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Bot,
  Tag,
} from 'lucide-react'
import { CSS_CLASSES } from './constants'
import AccessRightsPopup from './AccessRightsPopup'

// Define the access rights data type
interface AccessRight {
  id: string
  name: string
  description: string
  userType: string
  permissions: Record<string, string[]>
  isActive: boolean
  priority: number
  expiresAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Mock data for access rights
const mockAccessRightsData: AccessRight[] = [
  {
    id: '1',
    name: 'Full Access',
    description: 'Complete access to all platform features and data',
    userType: 'Admin',
    permissions: {
      'Tags': ['Create', 'Edit', 'Delete'],
      'Groups': ['Create', 'Edit', 'Delete', 'Symbol Setting', 'Transfer Setting'],
      'Accounts and Users': ['Create', 'Edit', 'Delete', 'Change Password', 'View User']
    },
    isActive: true,
    priority: 4,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Limited Access',
    description: 'Access to basic features with restricted data visibility',
    userType: 'Manager',
    permissions: {
      'Tags': ['View'],
      'Groups': ['View'],
      'Accounts and Users': ['View User']
    },
    isActive: true,
    priority: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Read Only',
    description: 'View-only access to platform data without modification rights',
    userType: 'User',
    permissions: {
      'Tags': ['View'],
      'Groups': ['View'],
      'Accounts and Users': ['View User']
    },
    isActive: true,
    priority: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Trading Access',
    description: 'Access to trading features and portfolio management',
    userType: 'Trader',
    permissions: {
      'Positions': ['View'],
      'Open Positions': ['View', 'Create', 'Close'],
      'Orders': ['View'],
      'Pending Order': ['View', 'Create']
    },
    isActive: true,
    priority: 3,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Analytics Access',
    description: 'Access to market analysis and reporting tools',
    userType: 'Analyst',
    permissions: {
      'Dashboard Stats': ['View'],
      'History Per Deal': ['View'],
      'Transactions Listings': ['View']
    },
    isActive: true,
    priority: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '6',
    name: 'Support Access',
    description: 'Access to customer support and ticket management',
    userType: 'Support',
    permissions: {
      'Calls': ['View Call', 'View All Calls'],
      'Feedback': ['Edit']
    },
    isActive: true,
    priority: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
]

const columnHelper = createColumnHelper<AccessRight>()

const AccessRightsTable: React.FC = () => {
  console.log('AccessRightsTable component rendering') // Debug log
  
  // State management
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Access rights data state
  const [accessRightsData, setAccessRightsData] = useState<AccessRight[]>(mockAccessRightsData)
  
  // Popup state
  const [showAddAccessRight, setShowAddAccessRight] = useState(false)
  const [editingAccessRight, setEditingAccessRight] = useState<AccessRight | null>(null)

  // Define columns
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {getValue()}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="text-gray-600 dark:text-gray-300 max-w-xs">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('userType', {
      header: 'User Type',
      cell: ({ getValue }) => {
        const userType = getValue()
        const getTypeColor = (type: string) => {
          switch (type.toLowerCase()) {
            case 'admin':
              return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            case 'manager':
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            case 'user':
              return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'trader':
              return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
            case 'analyst':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            case 'support':
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(userType)}`}>
            {userType}
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
    data: accessRightsData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Action handlers
  const handleView = (accessRight: AccessRight) => {
    console.log('View access right:', accessRight)
    // Implement view functionality
  }

  const handleEdit = (accessRight: AccessRight) => {
    setEditingAccessRight(accessRight)
  }

  const handleDelete = (accessRight: AccessRight) => {
    console.log('Delete access right:', accessRight)
    // Implement delete functionality
  }

  const handleAddNew = () => {
    setShowAddAccessRight(true)
  }

  const handleAddAccessRight = (data: any) => {
    const newAccessRight: AccessRight = {
      id: (accessRightsData.length + 1).toString(),
      name: data.name,
      description: data.description,
      userType: data.userType,
      permissions: data.permissions,
      isActive: data.isActive,
      priority: data.priority,
      expiresAt: data.expiresAt,
      notes: data.notes,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setAccessRightsData(prev => [...prev, newAccessRight])
    console.log('New access right added:', newAccessRight)
  }

  const handleEditAccessRight = (accessRight: AccessRight) => {
    setEditingAccessRight(accessRight)
  }

  const handleUpdateAccessRight = (data: any) => {
    if (editingAccessRight) {
      const updatedAccessRight: AccessRight = {
        ...editingAccessRight,
        name: data.name,
        description: data.description,
        userType: data.userType,
        permissions: data.permissions,
        isActive: data.isActive,
        priority: data.priority,
        expiresAt: data.expiresAt,
        notes: data.notes,
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setAccessRightsData(prev => 
        prev.map(item => 
          item.id === editingAccessRight.id ? updatedAccessRight : item
        )
      )
      
      console.log('Access right updated:', updatedAccessRight)
    }
    setEditingAccessRight(null)
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
              placeholder="Search access rights..."
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
        
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Access Right</span>
        </button>
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
                  Download Access Rights
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Upload">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Access Rights
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Add User">
                <Users className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Add New User
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Bot Management">
                <Bot className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Bot Management
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Groups">
                <Users className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Manage Groups
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Tags">
                <Tag className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Manage Tags
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Alerts">
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Access Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="View">
                <Eye className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  View Details
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Settings">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Access Settings
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
                placeholder="Search table..."
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

      {/* Add Access Right Popup */}
      <AccessRightsPopup
        isOpen={showAddAccessRight}
        onClose={() => setShowAddAccessRight(false)}
        onSubmit={handleAddAccessRight}
      />

      {/* Edit Access Right Popup */}
      {editingAccessRight && (
        <AccessRightsPopup
          isOpen={true}
          onClose={() => setEditingAccessRight(null)}
          onSubmit={handleUpdateAccessRight}
          initialData={editingAccessRight}
        />
      )}
    </div>
  )
}

export default AccessRightsTable 