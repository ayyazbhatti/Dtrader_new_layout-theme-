import React, { useState, useMemo, useEffect } from 'react'
import { X, Settings, ChevronDown, ChevronUp, Eye, Edit, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface GroupSettingsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (settings: GroupSettingsData) => void
  groupData?: any
}

interface GroupSettingsData {
  leverageProfile: string
}

interface SymbolData {
  symbolId: string
  symbol: string
  pipPosition: number
  digit: number
  bid: string
  ask: string
  assetClass: string
  leverageProfile: string
  status: string
  baseAsset?: string
  quoteAsset?: string
  description?: string
  category?: string
  lotSize?: number
  units?: string
  timeZone?: string
  maintenanceMargin?: string
  lastTradeDate?: string
  expirationDate?: string
}

// Mock symbol data - moved outside component to prevent recreation
  const mockSymbols: SymbolData[] = [
    {
      symbolId: '3500',
      symbol: 'ABOT',
      pipPosition: 1,
      digit: 4,
      bid: '---',
      ask: '---',
      assetClass: 'Stocks',
      leverageProfile: 'Default Leverage',
    status: 'active',
    baseAsset: 'ABOT',
    quoteAsset: 'USD',
    description: 'Arbitrage Bot Token',
    category: 'Default Category',
    lotSize: 100,
    units: 'Shares',
    timeZone: '(UTC-6:00- With DST )US(Chicago)',
    maintenanceMargin: '25%',
    lastTradeDate: '2017-06-04',
    expirationDate: '2017-06-04'
    },
    {
      symbolId: '3501',
      symbol: 'AAPL',
      pipPosition: 1,
      digit: 4,
      bid: '150.25',
      ask: '150.30',
      assetClass: 'Stocks',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3502',
      symbol: 'GOOGL',
      pipPosition: 1,
      digit: 4,
      bid: '2,850.00',
      ask: '2,850.50',
      assetClass: 'Stocks',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3503',
      symbol: 'MSFT',
      pipPosition: 1,
      digit: 4,
      bid: '380.15',
      ask: '380.20',
      assetClass: 'Stocks',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3504',
      symbol: 'TSLA',
      pipPosition: 1,
      digit: 4,
      bid: '240.80',
      ask: '240.85',
      assetClass: 'Stocks',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3505',
      symbol: 'EURUSD',
      pipPosition: 1,
      digit: 5,
      bid: '1.0850',
      ask: '1.0852',
      assetClass: 'Forex',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3506',
      symbol: 'GBPUSD',
      pipPosition: 1,
      digit: 5,
      bid: '1.2650',
      ask: '1.2652',
      assetClass: 'Forex',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3507',
      symbol: 'BTCUSD',
      pipPosition: 1,
      digit: 2,
      bid: '43,250.00',
      ask: '43,255.00',
      assetClass: 'Crypto',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3508',
      symbol: 'ETHUSD',
      pipPosition: 1,
      digit: 2,
      bid: '2,650.00',
      ask: '2,650.50',
      assetClass: 'Crypto',
      leverageProfile: 'Default Leverage',
      status: 'active'
    },
    {
      symbolId: '3509',
      symbol: 'GOLD',
      pipPosition: 1,
      digit: 2,
      bid: '2,150.00',
      ask: '2,150.50',
      assetClass: 'Commodities',
      leverageProfile: 'Default Leverage',
      status: 'active'
  },
  {
    symbolId: '3510',
    symbol: 'AMZN',
    pipPosition: 1,
    digit: 4,
    bid: '3,250.00',
    ask: '3,250.50',
    assetClass: 'Stocks',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3511',
    symbol: 'META',
    pipPosition: 1,
    digit: 4,
    bid: '485.75',
    ask: '485.80',
    assetClass: 'Stocks',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3512',
    symbol: 'NVDA',
    pipPosition: 1,
    digit: 4,
    bid: '890.25',
    ask: '890.30',
    assetClass: 'Stocks',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3513',
    symbol: 'NFLX',
    pipPosition: 1,
    digit: 4,
    bid: '625.40',
    ask: '625.45',
    assetClass: 'Stocks',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3514',
    symbol: 'ADBE',
    pipPosition: 1,
    digit: 4,
    bid: '580.90',
    ask: '580.95',
    assetClass: 'Stocks',
    leverageProfile: 'Professional',
    status: 'active'
  },
  {
    symbolId: '3515',
    symbol: 'USDJPY',
    pipPosition: 1,
    digit: 5,
    bid: '148.50',
    ask: '148.52',
    assetClass: 'Forex',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3516',
    symbol: 'EURGBP',
    pipPosition: 1,
    digit: 5,
    bid: '0.8580',
    ask: '0.8582',
    assetClass: 'Forex',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3517',
    symbol: 'AUDUSD',
    pipPosition: 1,
    digit: 5,
    bid: '0.6520',
    ask: '0.6522',
    assetClass: 'Forex',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3518',
    symbol: 'USDCAD',
    pipPosition: 1,
    digit: 5,
    bid: '1.3580',
    ask: '1.3582',
    assetClass: 'Forex',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3519',
    symbol: 'CHFJPY',
    pipPosition: 1,
    digit: 5,
    bid: '168.50',
    ask: '168.52',
    assetClass: 'Forex',
    leverageProfile: 'Professional',
    status: 'active'
  },
  {
    symbolId: '3520',
    symbol: 'ADAUSDT',
    pipPosition: 1,
    digit: 5,
    bid: '0.4850',
    ask: '0.4852',
    assetClass: 'Crypto',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3521',
    symbol: 'DOTUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '7.250',
    ask: '7.252',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3522',
    symbol: 'LINKUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '18.50',
    ask: '18.52',
    assetClass: 'Crypto',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3523',
    symbol: 'UNIUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '12.80',
    ask: '12.82',
    assetClass: 'Crypto',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3524',
    symbol: 'LTCUSD',
    pipPosition: 1,
    digit: 2,
    bid: '85.50',
    ask: '85.55',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3525',
    symbol: 'SILVER',
    pipPosition: 1,
    digit: 3,
    bid: '24.850',
    ask: '24.852',
    assetClass: 'Commodities',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3526',
    symbol: 'OIL',
    pipPosition: 1,
    digit: 3,
    bid: '78.50',
    ask: '78.52',
    assetClass: 'Commodities',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3527',
    symbol: 'COPPER',
    pipPosition: 1,
    digit: 3,
    bid: '4.250',
    ask: '4.252',
    assetClass: 'Commodities',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3528',
    symbol: 'NATURAL_GAS',
    pipPosition: 1,
    digit: 3,
    bid: '2.850',
    ask: '2.852',
    assetClass: 'Commodities',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3529',
    symbol: 'SPX500',
    pipPosition: 1,
    digit: 2,
    bid: '4,850.00',
    ask: '4,850.50',
    assetClass: 'Indices',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3530',
    symbol: 'NAS100',
    pipPosition: 1,
    digit: 2,
    bid: '16,250.00',
    ask: '16,250.50',
    assetClass: 'Indices',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3531',
    symbol: 'GER30',
    pipPosition: 1,
    digit: 2,
    bid: '18,250.00',
    ask: '18,250.50',
    assetClass: 'Indices',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3532',
    symbol: 'UK100',
    pipPosition: 1,
    digit: 2,
    bid: '7,850.00',
    ask: '7,850.50',
    assetClass: 'Indices',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3533',
    symbol: 'JPN225',
    pipPosition: 1,
    digit: 2,
    bid: '38,250.00',
    ask: '38,250.50',
    assetClass: 'Indices',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3534',
    symbol: 'US10Y',
    pipPosition: 1,
    digit: 3,
    bid: '4.250',
    ask: '4.252',
    assetClass: 'Bonds',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3535',
    symbol: 'US30Y',
    pipPosition: 1,
    digit: 3,
    bid: '4.450',
    ask: '4.452',
    assetClass: 'Bonds',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3536',
    symbol: 'DE10Y',
    pipPosition: 1,
    digit: 3,
    bid: '2.150',
    ask: '2.152',
    assetClass: 'Bonds',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3537',
    symbol: 'UK10Y',
    pipPosition: 1,
    digit: 3,
    bid: '4.050',
    ask: '4.052',
    assetClass: 'Bonds',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3538',
    symbol: 'SOLUSDT',
    pipPosition: 1,
    digit: 3,
    bid: '98.50',
    ask: '98.52',
    assetClass: 'Crypto',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3539',
    symbol: 'MATICUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.7850',
    ask: '0.7852',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3540',
    symbol: 'AVAXUSDT',
    pipPosition: 1,
    digit: 3,
    bid: '32.50',
    ask: '32.52',
    assetClass: 'Crypto',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3541',
    symbol: 'ATOMUSDT',
    pipPosition: 1,
    digit: 3,
    bid: '8.50',
    ask: '8.52',
    assetClass: 'Crypto',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3542',
    symbol: 'NEARUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '6.250',
    ask: '6.252',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3543',
    symbol: 'ALGOUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.1850',
    ask: '0.1852',
    assetClass: 'Crypto',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3544',
    symbol: 'FTMUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.4250',
    ask: '0.4252',
    assetClass: 'Crypto',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3545',
    symbol: 'SANDUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.4850',
    ask: '0.4852',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3546',
    symbol: 'MANAUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.3850',
    ask: '0.3852',
    assetClass: 'Crypto',
    leverageProfile: 'Conservative',
    status: 'active'
  },
  {
    symbolId: '3547',
    symbol: 'ENJUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.2850',
    ask: '0.2852',
    assetClass: 'Crypto',
    leverageProfile: 'Moderate',
    status: 'active'
  },
  {
    symbolId: '3548',
    symbol: 'CHZUSDT',
    pipPosition: 1,
    digit: 4,
    bid: '0.0850',
    ask: '0.0852',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  },
  {
    symbolId: '3549',
    symbol: 'HOTUSDT',
    pipPosition: 1,
    digit: 6,
    bid: '0.001250',
    ask: '0.001252',
    assetClass: 'Crypto',
    leverageProfile: 'Aggressive',
    status: 'active'
  },
  {
    symbolId: '3550',
    symbol: 'VETUSDT',
    pipPosition: 1,
    digit: 5,
    bid: '0.0250',
    ask: '0.0252',
    assetClass: 'Crypto',
    leverageProfile: 'Default Leverage',
    status: 'active'
  }
]

const GroupSettingsPopup: React.FC<GroupSettingsPopupProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  groupData 
}) => {
  const [settings, setSettings] = useState<GroupSettingsData>({
    leverageProfile: 'Default Leverage'
  })

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [symbolSearchTerm, setSymbolSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<keyof SymbolData>('symbol')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [isTransferPopupOpen, setIsTransferPopupOpen] = useState(false)
  const [settingsSearchTerm, setSettingsSearchTerm] = useState('')
  const [symbolsSearchTerm, setSymbolsSearchTerm] = useState('')
  const [groupsSearchTerm, setGroupsSearchTerm] = useState('')
  const [isEditSymbolPopupOpen, setIsEditSymbolPopupOpen] = useState(false)
  const [editingSymbol, setEditingSymbol] = useState<SymbolData | null>(null)

  // Filtered data for search functionality
  const filteredSettings = useMemo(() => {
    const allSettings = [
      { id: 'all-settings', label: 'All Settings', type: 'main' },
      { id: 'enabled', label: 'Enabled', type: 'sub' },
      { id: 'leverage-profile', label: 'Leverage Profile', type: 'sub' }
    ]
    
    if (!settingsSearchTerm) return allSettings
    
    return allSettings.filter(setting => 
      setting.label.toLowerCase().includes(settingsSearchTerm.toLowerCase())
    )
  }, [settingsSearchTerm])

  const filteredSymbols = useMemo(() => {
    const allSymbols = [
      { id: 'all-symbols', label: 'All Symbols', type: 'main' },
      { id: 'cryptocurrencies', label: 'Cryptocurrencies', type: 'main' },
      { id: 'default-category', label: 'Default Category', type: 'sub' },
      ...['ADAUSDT', 'APTUSDT', 'BCHUSDT', 'CHRUSDT', 'CRVUSDT', 'DOTUSDT', 'EIGENUSDT', 'LDOUSDT', 'MINAUSDT', 'PHAUSDT', 'PYTHUSDT', 'DLCLUSDT'].map(symbol => ({
        id: symbol,
        label: symbol,
        type: 'symbol'
      }))
    ]
    
    if (!symbolsSearchTerm) return allSymbols
    
    return allSymbols.filter(symbol => 
      symbol.label.toLowerCase().includes(symbolsSearchTerm.toLowerCase())
    )
  }, [symbolsSearchTerm])

  const filteredGroups = useMemo(() => {
    const allGroups = [
      { id: 'all-groups', label: 'All Groups', type: 'main' },
      ...['DefaultGroup', '17_Feb_Group', 'profitxbt', '21_Feb', 'Bot_group', 'Testing_25Feb', 'Tuesday_GROUP', 'new', 'abctestprice', 'Forex', 'maxuser'].map(group => ({
        id: group,
        label: group,
        type: 'group'
      }))
    ]
    
    if (!groupsSearchTerm) return allGroups
    
    return allGroups.filter(group => 
      group.label.toLowerCase().includes(groupsSearchTerm.toLowerCase())
    )
  }, [groupsSearchTerm])

  // Reset pagination when component opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1)
      setSymbolSearchTerm('')
      setSelectedSymbol(null)
      setSettings({
        leverageProfile: 'Default Leverage'
      })
    }
  }, [isOpen])

  // Reset search terms when Transfer Settings popup opens
  useEffect(() => {
    if (isTransferPopupOpen) {
      setSettingsSearchTerm('')
      setSymbolsSearchTerm('')
      setGroupsSearchTerm('')
    }
  }, [isTransferPopupOpen])

  // Filter and sort symbols
  const filteredAndSortedSymbols = useMemo(() => {
    let filtered = mockSymbols
    
    // Apply search filter
    if (symbolSearchTerm.trim()) {
      const searchLower = symbolSearchTerm.trim().toLowerCase()
      filtered = mockSymbols.filter(symbol => 
        symbol.symbol.toLowerCase().includes(searchLower) ||
        symbol.symbolId.toLowerCase().includes(searchLower) ||
        symbol.assetClass.toLowerCase().includes(searchLower) ||
        symbol.leverageProfile.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
    
    return filtered
  }, [symbolSearchTerm, sortField, sortDirection])

  // Pagination calculations
  const totalItems = filteredAndSortedSymbols.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentSymbols = filteredAndSortedSymbols.slice(startIndex, endIndex)

  // Update leverage profile when symbol is selected
  useEffect(() => {
    if (selectedSymbol) {
      const selectedSymbolData = currentSymbols.find(s => s.symbolId === selectedSymbol)
      if (selectedSymbolData) {
        setSettings(prev => ({
          ...prev,
          leverageProfile: selectedSymbolData.leverageProfile
        }))
      }
    }
  }, [selectedSymbol, currentSymbols])

  // Debug logging
  console.log('Pagination Debug:', {
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    currentSymbolsLength: currentSymbols.length,
    filteredLength: filteredAndSortedSymbols.length
  })

  // Handle sorting
  const handleSort = (field: keyof SymbolData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Reset to first page when sorting
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page)
    setCurrentPage(page)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    console.log('Changing items per page to:', newItemsPerPage)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
  }

  // Handle pagination button click with event prevention
  const handlePageButtonClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    e.stopPropagation()
    handlePageChange(page)
  }

  // Handle items per page change with event prevention
  const handleItemsPerPageButtonClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleItemsPerPageChange(Number(e.target.value))
  }

  // Get sort icon
  const getSortIcon = (field: keyof SymbolData) => {
    if (sortField !== field) {
      return <div className="w-4 h-4" />
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(settings)
    onClose()
  }

  const handleClose = () => {
    setSettings({
      leverageProfile: 'Default Leverage'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Group Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configure trading parameters and leverage profiles</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Unified Group Settings Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {groupData?.name || 'Group Name'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Group Information */}
              <div className="space-y-3">
              <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Group ID:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{groupData?.id || 'N/A'}</span>
              </div>
              <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{groupData?.createdAt || 'N/A'}</span>
            </div>
          </div>

              {/* Leverage Profile Configuration */}
              <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Leverage Profile
                  </label>
                  <div className="relative">
                    <select
                      value={settings.leverageProfile}
                      onChange={(e) => setSettings(prev => ({ ...prev, leverageProfile: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 appearance-none"
                    >
                      <option value="Default Leverage">Default Leverage (Default Leverage)</option>
                      <option value="Conservative">Conservative (1:100)</option>
                      <option value="Moderate">Moderate (1:200)</option>
                      <option value="Aggressive">Aggressive (1:500)</option>
                      <option value="Professional">Professional (1:1000)</option>
                      <option value="Institutional">Institutional (1:2000)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                  </div>
                  </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Symbol List Table */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Symbol List</h4>
                <div className="flex items-center space-x-2">
                  {selectedSymbol && (
                    <>
                      <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                          Selected: {currentSymbols.find(s => s.symbolId === selectedSymbol)?.symbol || 'Unknown'}
                        </span>
                      </div>
                    <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsTransferPopupOpen(true)
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Transfer Settings
                    </button>
                    </>
                  )}
                </div>
              </div>

              {/* Search Bar for Symbols */}
              <div className="mb-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search symbols, IDs, asset classes..."
                    value={symbolSearchTerm}
                    onChange={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSymbolSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset to first page when searching
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation()
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                  />
                  {symbolSearchTerm && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSymbolSearchTerm('')
                        setCurrentPage(1)
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {symbolSearchTerm && (
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Found {totalItems} symbol{totalItems !== 1 ? 's' : ''} matching "{symbolSearchTerm}"
                  </p>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-600 sticky top-0 z-10">
                      <tr>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('symbolId')}
                        >
                          <div className="flex items-center justify-between">
                        Symbol ID
                            {getSortIcon('symbolId')}
                          </div>
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('symbol')}
                        >
                          <div className="flex items-center justify-between">
                        Symbol
                            {getSortIcon('symbol')}
                          </div>
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('pipPosition')}
                        >
                          <div className="flex items-center justify-between">
                        Pip Position
                            {getSortIcon('pipPosition')}
                          </div>
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('digit')}
                        >
                          <div className="flex items-center justify-between">
                        Digit
                            {getSortIcon('digit')}
                          </div>
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500">
                        Bid
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500">
                        Ask
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('assetClass')}
                        >
                          <div className="flex items-center justify-between">
                        Asset Class
                            {getSortIcon('assetClass')}
                          </div>
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('leverageProfile')}
                        >
                          <div className="flex items-center justify-between">
                        Leverage Profile
                            {getSortIcon('leverageProfile')}
                          </div>
                      </th>
                        <th 
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center justify-between">
                        Status
                            {getSortIcon('status')}
                          </div>
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                      {currentSymbols.length > 0 ? (
                        currentSymbols.map((symbol, index) => (
                      <tr
                        key={symbol.symbolId}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150 cursor-pointer ${
                              selectedSymbol === symbol.symbolId 
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
                                : 'bg-white dark:bg-gray-700'
                            }`}
                        style={{ height: '34px' }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setSelectedSymbol(symbol.symbolId)
                            }}
                          >
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.symbolId}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500 font-medium">
                          {symbol.symbol}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.pipPosition}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.digit}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.bid}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.ask}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.assetClass}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-500">
                          {symbol.leverageProfile}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-green-600 dark:text-green-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-500 capitalize">
                          {symbol.status}
                        </td>
                        <td className="px-3 py-1.5 text-xs text-gray-900 dark:text-white whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    console.log('View symbol:', symbol.symbol)
                                  }}
                              className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              title="View Symbol"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setEditingSymbol(symbol)
                                    setIsEditSymbolPopupOpen(true)
                                  }}
                              className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              title="Edit Symbol"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col items-center space-y-2">
                              <Search className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                              <p className="text-sm">No symbols found matching "{symbolSearchTerm}"</p>
                              <p className="text-xs">Try adjusting your search terms</p>
                            </div>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="mt-4 flex items-center justify-between">
                {/* Items per page selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageButtonClick}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[5, 10, 20, 50, 100].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
                </div>

                {/* Pagination info and controls */}
                <div className="flex items-center space-x-4">
                  {/* Page info */}
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages} ({totalItems} total items)
                  </div>

                  {/* Pagination buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handlePageButtonClick(e, 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="First Page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handlePageButtonClick(e, currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {(() => {
                        const pages = []
                        
                        // Show first page
                        if (totalPages > 0) {
                          pages.push(
                            <button
                              key={1}
                              onClick={(e) => handlePageButtonClick(e, 1)}
                              className={`px-2 py-1 text-xs rounded-md ${
                                currentPage === 1
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                              }`}
                            >
                              1
                            </button>
                          )
                        }
                        
                        // Show ellipsis if needed
                        if (currentPage > 3) {
                          pages.push(
                            <span key="ellipsis1" className="px-1 text-gray-500">...</span>
                          )
                        }
                        
                        // Show pages around current page
                        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                          if (i > 1 && i < totalPages) {
                            pages.push(
                              <button
                                key={i}
                                onClick={(e) => handlePageButtonClick(e, i)}
                                className={`px-2 py-1 text-xs rounded-md ${
                                  currentPage === i
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                              >
                                {i}
                              </button>
                            )
                          }
                        }
                        
                        // Show ellipsis if needed
                        if (currentPage < totalPages - 2) {
                          pages.push(
                            <span key="ellipsis2" className="px-1 text-gray-500">...</span>
                          )
                        }
                        
                        // Show last page
                        if (totalPages > 1) {
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={(e) => handlePageButtonClick(e, totalPages)}
                              className={`px-2 py-1 text-xs rounded-md ${
                                currentPage === totalPages
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                              }`}
                            >
                              {totalPages}
                            </button>
                          )
                        }
                        
                        return pages
                      })()}
                    </div>
                    
                    <button
                      onClick={(e) => handlePageButtonClick(e, currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handlePageButtonClick(e, totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Last Page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Symbol Popup */}
      {isEditSymbolPopupOpen && editingSymbol && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Symbol</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Modify symbol configuration and settings</p>
              </div>
              <button
                onClick={() => {
                  setIsEditSymbolPopupOpen(false)
                  setEditingSymbol(null)
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault()
                // TODO: Implement save logic
                console.log('Saving symbol:', editingSymbol)
                setIsEditSymbolPopupOpen(false)
                setEditingSymbol(null)
              }}>
                {/* Symbol Details Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Symbol Details</h3>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                    {/* Symbol Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Symbol Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.symbol}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, symbol: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      />
                    </div>

                    {/* Base Asset */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Base Asset <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.baseAsset || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, baseAsset: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      />
                    </div>

                    {/* Quote Asset */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quote Asset <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.quoteAsset || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, quoteAsset: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.description || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, description: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      />
                    </div>

                    {/* Asset Class */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Asset Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editingSymbol.assetClass}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, assetClass: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      >
                        <option value="Stocks">Stocks</option>
                        <option value="Forex">Forex</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Commodities">Commodities</option>
                        <option value="Indices">Indices</option>
                        <option value="Bonds">Bonds</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editingSymbol.category || 'Default Category'}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, category: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      >
                        <option value="Default Category">Default Category</option>
                        <option value="Premium Category">Premium Category</option>
                        <option value="VIP Category">VIP Category</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={editingSymbol.status}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, status: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>

                    {/* Pip Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pip Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={editingSymbol.pipPosition}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, pipPosition: parseInt(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        min="0"
                        required
                      />
                    </div>

                    {/* Digit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Digit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={editingSymbol.digit}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, digit: parseInt(e.target.value)} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        min="0"
                        required
                      />
                    </div>

                    {/* Lot Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Lot Size
                      </label>
                      <input
                        type="number"
                        value={editingSymbol.lotSize || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, lotSize: e.target.value ? parseFloat(e.target.value) : undefined} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        step="0.01"
                      />
                    </div>

                    {/* Units */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Units
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.units || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, units: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      />
                    </div>

                    {/* Time Zone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time Zone
                      </label>
                      <select
                        value={editingSymbol.timeZone || '(UTC-6:00- With DST )US(Chicago)'}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, timeZone: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      >
                        <option value="(UTC-6:00- With DST )US(Chicago)">(UTC-6:00- With DST )US(Chicago)</option>
                        <option value="(UTC+0:00) GMT">(UTC+0:00) GMT</option>
                        <option value="(UTC+1:00) CET">(UTC+1:00) CET</option>
                        <option value="(UTC+8:00) CST">(UTC+8:00) CST</option>
                      </select>
                    </div>

                    {/* Maintenance Margin */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Maintenance Margin
                      </label>
                      <input
                        type="text"
                        value={editingSymbol.maintenanceMargin || ''}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, maintenanceMargin: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      />
                    </div>

                    {/* Last Trade Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Trade Date
                      </label>
                      <input
                        type="date"
                        value={editingSymbol.lastTradeDate || '2017-06-04'}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, lastTradeDate: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      />
                    </div>

                    {/* Expiration Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        value={editingSymbol.expirationDate || '2017-06-04'}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, expirationDate: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Default Profiles Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Default Profiles</h3>
                  <div className="grid grid-cols-3 gap-x-8">
                    {/* Leverage Profile */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Leverage Profile <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editingSymbol.leverageProfile}
                        onChange={(e) => setEditingSymbol(prev => prev ? {...prev, leverageProfile: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                        required
                      >
                        <option value="Default Leverage">Default Leverage</option>
                        <option value="Conservative">Conservative (1:100)</option>
                        <option value="Moderate">Moderate (1:200)</option>
                        <option value="Aggressive">Aggressive (1:500)</option>
                        <option value="Professional">Professional (1:1000)</option>
                        <option value="Institutional">Institutional (1:2000)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditSymbolPopupOpen(false)
                      setEditingSymbol(null)
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Settings Popup */}
      {isTransferPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Transfer Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Select target symbols and groups to transfer settings
                </p>
              </div>
              <button
                onClick={() => setIsTransferPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Settings Panel */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Settings</h3>
                  
                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                      type="text"
                      placeholder="Search settings..."
                      value={settingsSearchTerm}
                      onChange={(e) => setSettingsSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    />
                    {settingsSearchTerm && (
                      <button
                        onClick={() => setSettingsSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    </div>
                  
                  {/* Search Results Count */}
                  {settingsSearchTerm && (
                    <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                      Found {filteredSettings.length} setting{filteredSettings.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {filteredSettings.map(setting => (
                      <div key={setting.id} className={`flex items-center ${setting.type === 'sub' ? 'ml-4' : ''}`}>
                      <input
                        type="checkbox"
                          id={setting.id}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                        <label htmlFor={setting.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {setting.label}
                        </label>
                    </div>
                    ))}
                  </div>
                </div>

                {/* Symbols Panel */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Symbols</h3>
                  
                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                      type="text"
                      placeholder="Search symbols..."
                      value={symbolsSearchTerm}
                      onChange={(e) => setSymbolsSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    />
                    {symbolsSearchTerm && (
                      <button
                        onClick={() => setSymbolsSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    </div>
                  
                  {/* Search Results Count */}
                  {symbolsSearchTerm && (
                    <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                      Found {filteredSymbols.length} symbol{filteredSymbols.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {filteredSymbols.map(symbol => (
                      <div key={symbol.id} className={`flex items-center ${symbol.type === 'symbol' ? 'ml-8' : symbol.type === 'sub' ? 'ml-4' : ''}`}>
                        <input
                          type="checkbox"
                          id={symbol.id}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={symbol.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {symbol.label}
                        </label>
                          </div>
                        ))}
                  </div>
                </div>

                {/* Groups Panel */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Groups</h3>
                  
                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                      type="text"
                      placeholder="Search groups..."
                      value={groupsSearchTerm}
                      onChange={(e) => setGroupsSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    />
                    {groupsSearchTerm && (
                      <button
                        onClick={() => setGroupsSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    </div>
                  
                                     {/* Search Results Count */}
                   {groupsSearchTerm && (
                     <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                       Found {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''}
                     </div>
                   )}
                   
                   <div className="space-y-2">
                     {filteredGroups.map(group => (
                       <div key={group.id} className={`flex items-center ${group.type === 'group' ? 'ml-4' : ''}`}>
                        <input
                          type="checkbox"
                           id={group.id}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                         <label htmlFor={group.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                           {group.label}
                         </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                <button
                  onClick={() => setIsTransferPopupOpen(false)}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Transfer settings for symbol:', selectedSymbol)
                     console.log('Target leverage profile:', settings.leverageProfile)
                     // TODO: Implement actual transfer logic
                    setIsTransferPopupOpen(false)
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupSettingsPopup 