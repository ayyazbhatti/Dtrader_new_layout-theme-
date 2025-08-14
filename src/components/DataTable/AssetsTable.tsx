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
  type PaginationState,
} from '@tanstack/react-table'
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertTriangle,
  Info,
  Tag,
  X,
} from 'lucide-react'
import { CSS_CLASSES } from './constants'
import CreateAssetPopup from './CreateAssetPopup'
import EditAssetPopup from './EditAssetPopup'

// Define the asset data type
interface AssetData {
  id: string
  name: string
  description: string
  assetType: string
  category: string
  status: 'Active' | 'Inactive' | 'Suspended' | 'Maintenance'
  symbol: string
  decimals: number
  isTradable: boolean
  isActive: boolean
  notes: string
}

// Mock data for assets
const mockAssetsData: AssetData[] = [
  {
    id: '1',
    name: 'Bitcoin (BTC)',
    description: 'The first and most well-known cryptocurrency, created by Satoshi Nakamoto in 2009',
    assetType: 'Cryptocurrency',
    category: 'Digital Assets',
    status: 'Active',
    symbol: 'BTC',
    decimals: 8,
    isTradable: true,
    isActive: true,
    notes: 'First cryptocurrency, high volatility'
  },
  {
    id: '2',
    name: 'Ethereum (ETH)',
    description: 'A decentralized platform that enables smart contracts and decentralized applications',
    assetType: 'Cryptocurrency',
    category: 'Digital Assets',
    status: 'Active',
    symbol: 'ETH',
    decimals: 8,
    isTradable: true,
    isActive: true,
    notes: 'Smart contract platform, DeFi leader'
  },
  {
    id: '3',
    name: 'US Dollar (USD)',
    description: 'The official currency of the United States and a major global reserve currency',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'USD',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Global reserve currency, major forex pair'
  },
  {
    id: '4',
    name: 'Euro (EUR)',
    description: 'The official currency of the European Union and the second most traded currency',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'EUR',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'EU currency, major forex pair'
  },
  {
    id: '5',
    name: 'British Pound (GBP)',
    description: 'The official currency of the United Kingdom and one of the oldest currencies',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'GBP',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'UK currency, major forex pair'
  },
  {
    id: '6',
    name: 'Japanese Yen (JPY)',
    description: 'The official currency of Japan and a major currency in the Asian markets',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'JPY',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Japanese currency, major forex pair'
  },
  {
    id: '7',
    name: 'Gold (XAU)',
    description: 'A precious metal that has been used as a store of value for thousands of years',
    assetType: 'Commodity',
    category: 'Precious Metals',
    status: 'Active',
    symbol: 'XAU',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Safe haven asset, inflation hedge'
  },
  {
    id: '8',
    name: 'Silver (XAG)',
    description: 'A precious metal used in jewelry, electronics, and as an investment asset',
    assetType: 'Commodity',
    category: 'Precious Metals',
    status: 'Active',
    symbol: 'XAG',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Industrial and investment metal'
  },
  {
    id: '9',
    name: 'Crude Oil (WTI)',
    description: 'West Texas Intermediate crude oil, a major benchmark for oil pricing',
    assetType: 'Commodity',
    category: 'Energy',
    status: 'Active',
    symbol: 'WTI',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Energy commodity, global benchmark'
  },
  {
    id: '10',
    name: 'Natural Gas (NG)',
    description: 'A fossil fuel used for heating, electricity generation, and industrial processes',
    assetType: 'Commodity',
    category: 'Energy',
    status: 'Active',
    symbol: 'NG',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Energy commodity, seasonal patterns'
  },
  {
    id: '11',
    name: 'Apple Inc. (AAPL)',
    description: 'A multinational technology company that designs and manufactures consumer electronics',
    assetType: 'Stock',
    category: 'Technology',
    status: 'Active',
    symbol: 'AAPL',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Tech giant, consumer electronics leader'
  },
  {
    id: '12',
    name: 'Microsoft Corporation (MSFT)',
    description: 'A multinational technology company that develops, manufactures, and licenses software',
    assetType: 'Stock',
    category: 'Technology',
    status: 'Active',
    symbol: 'MSFT',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Software giant, cloud computing leader'
  },
  {
    id: '13',
    name: 'Amazon.com Inc. (AMZN)',
    description: 'A multinational technology company focusing on e-commerce, cloud computing, and AI',
    assetType: 'Stock',
    category: 'Technology',
    status: 'Active',
    symbol: 'AMZN',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'E-commerce leader, cloud services'
  },
  {
    id: '14',
    name: 'Tesla Inc. (TSLA)',
    description: 'An electric vehicle and clean energy company founded by Elon Musk',
    assetType: 'Stock',
    category: 'Technology',
    status: 'Active',
    symbol: 'TSLA',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'EV manufacturer, clean energy'
  },
  {
    id: '15',
    name: 'NVIDIA Corporation (NVDA)',
    description: 'A technology company that designs graphics processing units and AI chips',
    assetType: 'Stock',
    category: 'Technology',
    status: 'Active',
    symbol: 'NVDA',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'GPU manufacturer, AI leader'
  },
  {
    id: '16',
    name: 'S&P 500 Index (SPX)',
    description: 'A stock market index that measures the performance of 500 large companies',
    assetType: 'Index',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'SPX',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'US large-cap benchmark index'
  },
  {
    id: '17',
    name: 'NASDAQ 100 Index (NDX)',
    description: 'A stock market index that includes 100 of the largest non-financial companies',
    assetType: 'Index',
    category: 'Technology',
    status: 'Active',
    symbol: 'NDX',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Tech-heavy index, growth focus'
  },
  {
    id: '18',
    name: 'Dow Jones Industrial Average (DJI)',
    description: 'A stock market index that tracks 30 large, publicly-owned companies',
    assetType: 'Index',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'DJI',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Price-weighted index, 30 blue chips'
  },
  {
    id: '19',
    name: 'FTSE 100 Index (UKX)',
    description: 'A share index of the 100 companies listed on the London Stock Exchange',
    assetType: 'Index',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'UKX',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'UK market benchmark index'
  },
  {
    id: '20',
    name: 'German DAX Index (GDAXI)',
    description: 'A stock market index that represents 30 major German companies',
    assetType: 'Index',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'GDAXI',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'German market benchmark index'
  },
  {
    id: '21',
    name: 'Swiss Franc (CHF)',
    description: 'The official currency of Switzerland and Liechtenstein',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'CHF',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Swiss currency, safe haven'
  },
  {
    id: '22',
    name: 'Australian Dollar (AUD)',
    description: 'The official currency of Australia and its external territories',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'AUD',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Commodity currency, risk-on asset'
  },
  {
    id: '23',
    name: 'Canadian Dollar (CAD)',
    description: 'The official currency of Canada and one of the major world currencies',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'CAD',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Commodity currency, oil correlation'
  },
  {
    id: '24',
    name: 'New Zealand Dollar (NZD)',
    description: 'The official currency of New Zealand and its territories',
    assetType: 'Fiat Currency',
    category: 'Traditional Finance',
    status: 'Active',
    symbol: 'NZD',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Commodity currency, risk-on asset'
  },
  {
    id: '25',
    name: 'Copper (HG)',
    description: 'A base metal used in electrical wiring, plumbing, and construction',
    assetType: 'Commodity',
    category: 'Industrial',
    status: 'Active',
    symbol: 'HG',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Industrial metal, economic indicator'
  },
  {
    id: '26',
    name: 'Corn (ZC)',
    description: 'A cereal grain that is the most widely grown crop in the Americas',
    assetType: 'Commodity',
    category: 'Agriculture',
    status: 'Active',
    symbol: 'ZC',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Agricultural commodity, food staple'
  },
  {
    id: '27',
    name: 'Wheat (ZW)',
    description: 'A cereal grain that is a staple food in many countries',
    assetType: 'Commodity',
    category: 'Agriculture',
    status: 'Active',
    symbol: 'ZW',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Agricultural commodity, global staple'
  },
  {
    id: '28',
    name: 'Soybeans (ZS)',
    description: 'A legume that is an important source of protein and oil',
    assetType: 'Commodity',
    category: 'Agriculture',
    status: 'Active',
    symbol: 'ZS',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Agricultural commodity, protein source'
  },
  {
    id: '29',
    name: 'Sugar (SB)',
    description: 'A sweet crystalline substance obtained from various plants',
    assetType: 'Commodity',
    category: 'Agriculture',
    status: 'Active',
    symbol: 'SB',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Agricultural commodity, sweetener'
  },
  {
    id: '30',
    name: 'Coffee (KC)',
    description: 'A brewed drink prepared from roasted coffee beans',
    assetType: 'Commodity',
    category: 'Agriculture',
    status: 'Active',
    symbol: 'KC',
    decimals: 2,
    isTradable: true,
    isActive: true,
    notes: 'Agricultural commodity, beverage'
  },
]

const columnHelper = createColumnHelper<AssetData>()

const AssetsTable: React.FC = () => {
  console.log('AssetsTable component rendering') // Debug log
  
  // State management
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  // Assets data state
  const [assetsData, setAssetsData] = useState<AssetData[]>(mockAssetsData)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editingAsset, setEditingAsset] = useState<AssetData | null>(null)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showCreatePopup, setShowCreatePopup] = useState(false)

  // Define columns
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {getValue().includes('BTC') || getValue().includes('ETH') ? (
              <Tag className="w-4 h-4 text-white" />
            ) : getValue().includes('USD') || getValue().includes('EUR') || getValue().includes('GBP') ? (
              <Tag className="w-4 h-4 text-white" />
            ) : getValue().includes('GOLD') || getValue().includes('SILVER') || getValue().includes('OIL') ? (
              <Tag className="w-4 h-4 text-white" />
            ) : getValue().includes('AAPL') || getValue().includes('MSFT') || getValue().includes('TSLA') ? (
              <Tag className="w-4 h-4 text-white" />
            ) : getValue().includes('SPX') || getValue().includes('NDX') || getValue().includes('DJI') ? (
              <Tag className="w-4 h-4 text-white" />
            ) : (
              <Tag className="w-4 h-4 text-white" />
            )}
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
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue()
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'Active':
              return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'Inactive':
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            case 'Suspended':
              return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            case 'Maintenance':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
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
    data: assetsData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Action handlers
  const handleView = (asset: AssetData) => {
    console.log('View asset:', asset)
    // Implement view functionality
  }

  const handleEdit = (asset: AssetData) => {
    console.log('Edit asset:', asset)
    setEditingAsset(asset)
    setShowEditPopup(true)
  }

  const handleDelete = (asset: AssetData) => {
    console.log('Delete asset:', asset)
    // Implement delete functionality
  }

  const handleUpdateAsset = (updatedAsset: AssetData) => {
    console.log('Updating asset:', updatedAsset)
    // Update the asset in the data
    setAssetsData(prevData => 
      prevData.map(asset => 
        asset.id === editingAsset?.id ? { ...asset, ...updatedAsset } : asset
      )
    )
    setShowEditPopup(false)
    setEditingAsset(null)
  }

  const handleCreateAsset = (newAsset: any) => {
    console.log('Creating new asset:', newAsset)
    // Create new asset with unique ID
    const assetToAdd = {
      id: (assetsData.length + 1).toString(),
      name: newAsset.name,
      description: newAsset.description,
      assetType: newAsset.assetType,
      category: newAsset.category,
      status: newAsset.status,
      symbol: newAsset.symbol,
      decimals: newAsset.decimals,
      isTradable: newAsset.isTradable,
      isActive: newAsset.isActive,
      notes: newAsset.notes
    }
    setAssetsData(prevData => [...prevData, assetToAdd])
    setShowCreatePopup(false)
  }

  const handleRefresh = () => {
    console.log('Refreshing assets data...')
    // Implement refresh functionality
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
              placeholder="Search assets..."
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
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowCreatePopup(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </div>
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
                  Download Assets Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Upload">
                <Upload className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Upload Assets Data
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Settings">
                <Settings className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Asset Settings
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Alerts">
                <AlertTriangle className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Asset Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={() => setShowColumnVisibility(!showColumnVisibility)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" 
                title="Column Visibility"
              >
                <Eye className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Column Visibility
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible" title="Info">
                <Info className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Asset Info
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
                placeholder="Search assets..."
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
                  onClick={() => handleEdit(row.original)}
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

      {/* Column Visibility Popup */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Column Visibility</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show or hide table columns</p>
                </div>
              </div>
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Column Toggles */}
            <div className="p-4 space-y-3">
              {table.getAllLeafColumns()
                .filter(column => column.id !== 'actions')
                .map(column => (
                  <div key={column.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={column.id}
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={column.id}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                    </label>
                  </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Asset Popup */}
      {showEditPopup && editingAsset && (
        <EditAssetPopup
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          onSubmit={handleUpdateAsset}
          initialData={editingAsset}
        />
      )}

      {/* Create Asset Popup */}
      <CreateAssetPopup
        isOpen={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSubmit={handleCreateAsset}
      />
    </div>
  )
}

export default AssetsTable 