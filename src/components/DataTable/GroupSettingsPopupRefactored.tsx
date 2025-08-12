import React, { useState, useMemo, useEffect } from 'react'
import { GroupSettingsHeader } from './components/GroupSettingsHeader'
import { SymbolTable } from './components/SymbolTable'

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
  }
]

/**
 * Refactored GroupSettingsPopup Component
 * 
 * This version demonstrates the improved architecture by:
 * - Using smaller, focused components
 * - Better separation of concerns
 * - Improved maintainability
 * - Cleaner main component logic
 */
const GroupSettingsPopupRefactored: React.FC<GroupSettingsPopupProps> = ({
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

  // Update leverage profile when symbol is selected
  useEffect(() => {
    if (selectedSymbol) {
      const selectedSymbolData = filteredAndSortedSymbols.find(s => s.symbolId === selectedSymbol)
      if (selectedSymbolData) {
        setSettings(prev => ({
          ...prev,
          leverageProfile: selectedSymbolData.leverageProfile
        }))
      }
    }
  }, [selectedSymbol, filteredAndSortedSymbols])

  // Event handlers
  const handleSort = (field: keyof SymbolData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Reset to first page when sorting
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
  }

  const handleSymbolSelect = (symbolId: string) => {
    setSelectedSymbol(symbolId)
  }

  const handleEditSymbol = (symbol: SymbolData) => {
    console.log('Edit symbol:', symbol)
    // TODO: Implement edit symbol functionality
  }

  const handleViewSymbol = (symbol: SymbolData) => {
    console.log('View symbol:', symbol)
    // TODO: Implement view symbol functionality
  }

  const handleSubmit = () => {
    onSubmit(settings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header Component */}
        <GroupSettingsHeader
          onClose={onClose}
          groupData={groupData}
        />

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          {/* Leverage Profile Selection */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Leverage Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {['Default Leverage', 'Conservative', 'Moderate', 'Aggressive', 'Professional'].map((profile) => (
                <button
                  key={profile}
                  onClick={() => setSettings({ leverageProfile: profile })}
                  className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                    settings.leverageProfile === profile
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                  }`}
                >
                  {profile}
                </button>
              ))}
            </div>
          </div>

          {/* Symbol Table Component */}
          <SymbolTable
            symbols={filteredAndSortedSymbols}
            searchTerm={symbolSearchTerm}
            onSearchChange={setSymbolSearchTerm}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            sortField={sortField}
            sortDirection={sortDirection}
            selectedSymbol={selectedSymbol}
            onSymbolSelect={handleSymbolSelect}
            onSort={handleSort}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onEditSymbol={handleEditSymbol}
            onViewSymbol={handleViewSymbol}
          />

          {/* Selected Symbol Info */}
          {selectedSymbol && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Selected Symbol: {selectedSymbol}
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Current leverage profile: {settings.leverageProfile}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupSettingsPopupRefactored 