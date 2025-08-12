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
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Download,
  Upload,
  UserPlus,
  Filter,
  Tag,
  Trash2,
  Edit
} from 'lucide-react'
import AddGroupPopup from './AddGroupPopup'
import GroupSettingsPopup from './GroupSettingsPopup'
import { useColumnVisibility } from './useColumnVisibility'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'

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
  },
  {
    id: '6',
    name: 'Professional Group',
    stopOutLevel: 25.0,
    priceStream: 'Professional Price Stream',
    memberCount: 18,
    totalBalance: 1750000,
    totalEquity: 1820000,
    status: 'active',
    createdAt: '2024-01-25',
    description: 'Professional traders group with institutional-grade conditions'
  },
  {
    id: '7',
    name: 'Beginner Group',
    stopOutLevel: 70.0,
    priceStream: 'Beginner Price Stream',
    memberCount: 89,
    totalBalance: 450000,
    totalEquity: 465000,
    status: 'active',
    createdAt: '2024-02-15',
    description: 'Beginner-friendly group with educational resources and support'
  },
  {
    id: '8',
    name: 'Scalper Group',
    stopOutLevel: 15.0,
    priceStream: 'Scalper Price Stream',
    memberCount: 15,
    totalBalance: 3200000,
    totalEquity: 3350000,
    status: 'active',
    createdAt: '2024-01-05',
    description: 'Scalping-focused group with ultra-low spreads and fast execution'
  },
  {
    id: '9',
    name: 'Swing Group',
    stopOutLevel: 40.0,
    priceStream: 'Swing Price Stream',
    memberCount: 34,
    totalBalance: 680000,
    totalEquity: 695000,
    status: 'active',
    createdAt: '2024-02-10',
    description: 'Swing trading group for medium to long-term positions'
  },
  {
    id: '10',
    name: 'Demo Group',
    stopOutLevel: 100.0,
    priceStream: 'Demo Price Stream',
    memberCount: 156,
    totalBalance: 0,
    totalEquity: 0,
    status: 'active',
    createdAt: '2024-01-01',
    description: 'Demo trading group for practice and learning'
  },
  {
    id: '11',
    name: 'Corporate Group',
    stopOutLevel: 35.0,
    priceStream: 'Corporate Price Stream',
    memberCount: 7,
    totalBalance: 4500000,
    totalEquity: 4680000,
    status: 'active',
    createdAt: '2024-01-30',
    description: 'Corporate clients group with specialized services'
  },
  {
    id: '12',
    name: 'Retirement Group',
    stopOutLevel: 45.0,
    priceStream: 'Retirement Price Stream',
    memberCount: 42,
    totalBalance: 890000,
    totalEquity: 905000,
    status: 'active',
    createdAt: '2024-02-20',
    description: 'Retirement-focused group with conservative trading strategies'
  },
  {
    id: '13',
    name: 'High Frequency Group',
    stopOutLevel: 10.0,
    priceStream: 'HF Price Stream',
    memberCount: 5,
    totalBalance: 8500000,
    totalEquity: 8720000,
    status: 'active',
    createdAt: '2024-01-08',
    description: 'High-frequency trading group with ultra-fast execution'
  },
  {
    id: '14',
    name: 'Islamic Group',
    stopOutLevel: 55.0,
    priceStream: 'Islamic Price Stream',
    memberCount: 28,
    totalBalance: 620000,
    totalEquity: 635000,
    status: 'active',
    createdAt: '2024-02-05',
    description: 'Islamic-compliant trading group with no swap fees'
  },
  {
    id: '15',
    name: 'Student Group',
    stopOutLevel: 75.0,
    priceStream: 'Student Price Stream',
    memberCount: 203,
    totalBalance: 180000,
    totalEquity: 185000,
    status: 'active',
    createdAt: '2024-03-10',
    description: 'Student-focused group with educational discounts and support'
  },
  {
    id: '16',
    name: 'Institutional Group',
    stopOutLevel: 20.0,
    priceStream: 'Institutional Price Stream',
    memberCount: 3,
    totalBalance: 12500000,
    totalEquity: 12800000,
    status: 'active',
    createdAt: '2024-01-12',
    description: 'Institutional clients group with premium services'
  },
  {
    id: '17',
    name: 'Mobile Group',
    stopOutLevel: 65.0,
    priceStream: 'Mobile Price Stream',
    memberCount: 78,
    totalBalance: 340000,
    totalEquity: 355000,
    status: 'active',
    createdAt: '2024-02-25',
    description: 'Mobile trading optimized group with app-specific features'
  },
  {
    id: '18',
    name: 'Weekend Group',
    stopOutLevel: 90.0,
    priceStream: 'Weekend Price Stream',
    memberCount: 12,
    totalBalance: 280000,
    totalEquity: 285000,
    status: 'inactive',
    createdAt: '2024-03-15',
    description: 'Weekend trading group (currently suspended)'
  },
  {
    id: '19',
    name: 'Algorithmic Group',
    stopOutLevel: 25.0,
    priceStream: 'Algo Price Stream',
    memberCount: 22,
    totalBalance: 2100000,
    totalEquity: 2180000,
    status: 'active',
    createdAt: '2024-01-18',
    description: 'Algorithmic trading group with API access and automation tools'
  },
  {
    id: '20',
    name: 'Social Group',
    stopOutLevel: 60.0,
    priceStream: 'Social Price Stream',
    memberCount: 134,
    totalBalance: 420000,
    totalEquity: 435000,
    status: 'active',
    createdAt: '2024-02-28',
    description: 'Social trading group with copy trading features'
  }
]

const GroupsTable: React.FC = () => {
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
  const [isPriceStreamPopupOpen, setIsPriceStreamPopupOpen] = useState(false)
  const [isSwapsProfilePopupOpen, setIsSwapsProfilePopupOpen] = useState(false)
  const [isTagManagementPopupOpen, setIsTagManagementPopupOpen] = useState(false)
  const [tagSearch, setTagSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Column visibility hook
  const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<GroupData>()

  // Available tags for groups
  const availableTags = [
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
  ]

  // Tag management functions
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
    // TODO: Implement save logic for selected groups
    console.log('Saving tags for selected groups:', selectedTags)
    setIsTagManagementPopupOpen(false)
    setSelectedTags([])
  }

  const getFilteredTags = () => {
    return availableTags.filter(tag => 
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    )
  }

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columnHelper = createColumnHelper<GroupData>()

  // Function to get tooltip text for each column
  const handleAddGroup = (groupData: any) => {
    console.log('Adding new group:', groupData)
    // TODO: Implement API call to add new group
    // For now, just log the data
  }

  const handleGroupSettings = (settings: any) => {
    console.log('Updating group settings:', settings)
    // TODO: Implement API call to update group settings
    // For now, just log the data
  }

  const getColumnTooltip = (columnId: string): string => {
    switch (columnId) {
      case 'select':
        return 'Select all rows on this page'
      case 'name':
        return 'Group name and identifier'
      case 'stopOutLevel':
        return 'Stop out level percentage for risk management (e.g., 50% = close positions when equity drops to 50% of balance)'
      case 'priceStream':
        return 'Price feed source and configuration for this group'
      case 'memberCount':
        return 'Number of active members in this group'
      case 'totalBalance':
        return 'Combined account balance of all group members'
      case 'totalEquity':
        return 'Combined account equity of all group members (balance + unrealized P&L)'
      case 'status':
        return 'Current status of the group (Active/Inactive)'
      case 'createdAt':
        return 'Date when the group was created'
      case 'description':
        return 'Detailed description of the group features and trading conditions'
      case 'actions':
        return 'Available actions: Settings, View, Edit, Delete'
      default:
        return ''
    }
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

      // Price Stream column (hidden by default)
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
                setIsPriceStreamPopupOpen(true)
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
        meta: { hidden: true }, // Hidden by default
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
                setIsGroupSettingsPopupOpen(true)
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
                setEditingGroup(row.original)
                setIsEditGroupPopupOpen(true)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Edit className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Edit Group
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Implement delete group
                console.log('Delete group:', row.original)
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
        size: 200,
        enableResizing: true,
        enableHiding: true,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: groupData,
    columns,
    initialState: {
      columnVisibility: {
        stopOutLevel: false,
        priceStream: false,
        memberCount: false,
        totalBalance: false,
        totalEquity: false,
        status: false,
        createdAt: false,
      },
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
                placeholder="Search table..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
              />
            </div>

            {/* Action Buttons */}
           
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
                  Download Groups Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Groups Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={() => setIsAddGroupPopupOpen(true)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" 
              >
                <UserPlus className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Add New Group
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Group Settings
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
              <button 
                className={`p-2 text-white rounded-md transition-colors duration-200 border border-transparent relative group overflow-visible ${
                  Object.keys(rowSelection).length > 0 
                    ? 'bg-blue-600 hover:bg-blue-700 hover:border-blue-400' 
                    : 'bg-gray-600 hover:bg-gray-500 hover:border-gray-400 opacity-50 cursor-not-allowed'
                }`} 
                disabled={Object.keys(rowSelection).length === 0}
                onClick={() => {
                  if (Object.keys(rowSelection).length > 0) {
                    setIsTagManagementPopupOpen(true)
                  }
                }}
              >
                <Tag className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Manage Tags
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
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 ${
                        header.column.getCanSort() ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                      }`}
                      style={{ 
                        width: header.getSize(), 
                        minWidth: '60px'
                      }}
                      onClick={header.column.getToggleSortingHandler()}
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
              <span className="results-info text-xs sm:text-sm">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{' '}
                of {table.getFilteredRowModel().rows.length} results
              </span>
              
              {/* Page size selector */}
              <div className="page-size-selector">
                <span className="page-size-label text-xs sm:text-sm">Show:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="page-size-select text-xs sm:text-sm"
                >
                  {[5, 10, 20, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span className="page-size-label text-xs sm:text-sm">entries</span>
              </div>
            </div>
            
            {/* Right side - Pagination controls */}
            <div className="table-footer-right">
              {/* Page numbers */}
              <div className="pagination-container">
                {(() => {
                  const pageCount = table.getPageCount()
                  const currentPage = table.getState().pagination.pageIndex
                  const pages = []
                  
                  // Show first page
                  if (pageCount > 0) {
                    pages.push(
                      <button
                        key={0}
                        onClick={() => table.setPageIndex(0)}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                          currentPage === 0
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]`}
                      >
                        1
                      </button>
                    )
                  }
                  
                  // Show ellipsis if needed
                  if (currentPage > 3) {
                    pages.push(
                      <span key="ellipsis1" className="px-1 text-gray-500 text-xs">...</span>
                    )
                  }
                  
                  // Show pages around current page
                  for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount - 2, currentPage + 1); i++) {
                    if (i > 0 && i < pageCount - 1) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => table.setPageIndex(i)}
                          className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                            currentPage === i
                              ? 'bg-blue-600 text-white border border-blue-600'
                              : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]`}
                        >
                          {i + 1}
                        </button>
                      )
                    }
                  }
                  
                  // Show ellipsis if needed
                  if (currentPage < pageCount - 4) {
                    pages.push(
                      <span key="ellipsis2" className="px-1 text-gray-500 text-xs">...</span>
                    )
                  }
                  
                  // Show last page
                  if (pageCount > 1) {
                    pages.push(
                      <button
                        key={pageCount - 1}
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                          currentPage === pageCount - 1
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]`}
                      >
                        {pageCount}
                      </button>
                    )
                  }
                  
                  return pages
                })()}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex items-center space-x-1">
                {/* First/Previous buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="First Page"
                  >
                    <ChevronsLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Previous Page"
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
                    title="Next Page"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Last Page"
                  >
                    <ChevronsRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Group Popup */}
      <AddGroupPopup
        isOpen={isAddGroupPopupOpen}
        onClose={() => setIsAddGroupPopupOpen(false)}
        onSubmit={handleAddGroup}
      />

      {/* Group Settings Popup */}
      <GroupSettingsPopup
        isOpen={isGroupSettingsPopupOpen}
        onClose={() => setIsGroupSettingsPopupOpen(false)}
        onSubmit={handleGroupSettings}
        groupData={selectedGroup}
      />

      {/* Edit Group Popup */}
      {isEditGroupPopupOpen && editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Group</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Modify group configuration and settings</p>
              </div>
              <button
                onClick={() => {
                  setIsEditGroupPopupOpen(false)
                  setEditingGroup(null)
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault()
                // TODO: Implement save logic
                console.log('Saving group:', editingGroup)
                setIsEditGroupPopupOpen(false)
                setEditingGroup(null)
              }}>
                {/* General Profiles and Tags Row */}
                <div className="mb-8">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingGroup.name}
                        onChange={(e) => setEditingGroup((prev: GroupData | null) => prev ? {...prev, name: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                      />
                    </div>

                    {/* Price Stream Profile */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Stream Profile <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={editingGroup.priceStream || 'Default Price Stream'}
                          onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, priceStream: e.target.value} : null)}
                          className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          required
                        >
                          <option value="Default Price Stream">Default Price Stream</option>
                          <option value="Premium Price Stream">Premium Price Stream</option>
                          <option value="VIP Price Stream">VIP Price Stream</option>
                          <option value="Professional Price Stream">Professional Price Stream</option>
                        </select>
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-500">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setIsPriceStreamPopupOpen(true)
                            }}
                            className="p-1 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                            title="View Price Stream Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Swaps and Dividend Profile */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Swaps and Dividend Profile <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={editingGroup.swapsProfile || 'Default Swap Dividend'}
                          onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, swapsProfile: e.target.value} : null)}
                          className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          required
                        >
                          <option value="Default Swap Dividend">Default Swap Dividend</option>
                          <option value="Premium Swap Dividend">Premium Swap Dividend</option>
                          <option value="VIP Swap Dividend">VIP Swap Dividend</option>
                          <option value="Professional Swap Dividend">Professional Swap Dividend</option>
                        </select>
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-500">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setIsSwapsProfilePopupOpen(true)
                            }}
                            className="p-1 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                            title="View Swaps and Dividend Profile Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Assign Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Assign Tags
                      </label>
                      <select
                        value={editingGroup.tags || '1 Tags selected'}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, tags: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      >
                        <option value="1 Tags selected">1 Tags selected</option>
                        <option value="2 Tags selected">2 Tags selected</option>
                        <option value="3 Tags selected">3 Tags selected</option>
                        <option value="No Tags">No Tags</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Numerical Settings Row */}
                <div className="mb-8">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Stop Out Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stop Out Level (in %)
                      </label>
                      <input
                        type="number"
                        value={editingGroup.stopOutLevel || 0}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, stopOutLevel: parseFloat(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    {/* Open Position Delay Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Open Position Delay Time
                      </label>
                      <input
                        type="number"
                        value={editingGroup.openPositionDelay || 0}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, openPositionDelay: parseInt(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min="0"
                      />
                    </div>

                    {/* Trade Execution Delay Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Trade Execution Delay Time
                      </label>
                      <input
                        type="number"
                        value={editingGroup.tradeExecutionDelay || 0}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, tradeExecutionDelay: parseInt(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min="0"
                      />
                    </div>

                    {/* Minimum Margin Level Call */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Margin Level Call
                      </label>
                      <input
                        type="number"
                        value={editingGroup.minMarginLevel || 0}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, minMarginLevel: parseFloat(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="mb-8">
                  <div className="grid grid-cols-4 gap-6">
                    {/* Accounts */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Accounts
                      </label>
                      <input
                        type="number"
                        value={editingGroup.memberCount || 0}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, memberCount: parseInt(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        min="0"
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Comment
                      </label>
                      <input
                        type="text"
                        value={editingGroup.description || ''}
                        onChange={(e) => setEditingGroup((prev: GroupData) => prev ? {...prev, description: e.target.value} : null)}
                        placeholder="Comment"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>

                    {/* Show Swap Details Display */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Show Swap Details on Symbol Info
                      </label>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${editingGroup.showSwapDetails ? 'text-blue-600' : 'text-gray-500'}`}>
                          {editingGroup.showSwapDetails ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>

                    {/* Show Stop Out Details Display */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Show Stop Out Details on Matrics Info
                      </label>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${editingGroup.showStopOutDetails ? 'text-blue-600' : 'text-gray-500'}`}>
                          {editingGroup.showStopOutDetails ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditGroupPopupOpen(false)
                      setEditingGroup(null)
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Price Stream Popup */}
      {isPriceStreamPopupOpen && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Price Stream Details</h2>
              <button
                onClick={() => setIsPriceStreamPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {selectedGroup.name} Price Stream
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedGroup.priceStream || 'No specific price stream configured.'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This group uses the default price stream. To change it, please update the group settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Swaps and Dividend Profile Popup */}
      {isSwapsProfilePopupOpen && editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Swaps and Dividend Profile Details</h2>
              <button
                onClick={() => setIsSwapsProfilePopupOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingGroup.name} Swaps and Dividend Profile
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {editingGroup.swapsProfile || 'No specific swaps and dividend profile configured.'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This group uses the default swaps and dividend profile. To change it, please update the group settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tag Management Popup */}
      {isTagManagementPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tag Management</h2>
              <button
                onClick={() => setIsTagManagementPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tag Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manage Tags for Selected Groups
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
                onClick={() => setIsTagManagementPopupOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveTags}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
              >
                Apply Changes
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
    </div>
  )
}

export default GroupsTable 