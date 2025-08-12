import React from 'react'
import { Search, ChevronDown, ChevronUp, Edit, Eye } from 'lucide-react'

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

interface SymbolTableProps {
  symbols: SymbolData[]
  searchTerm: string
  onSearchChange: (term: string) => void
  currentPage: number
  itemsPerPage: number
  sortField: keyof SymbolData
  sortDirection: 'asc' | 'desc'
  selectedSymbol: string | null
  onSymbolSelect: (symbolId: string) => void
  onSort: (field: keyof SymbolData) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  onEditSymbol: (symbol: SymbolData) => void
  onViewSymbol: (symbol: SymbolData) => void
}

export const SymbolTable: React.FC<SymbolTableProps> = ({
  symbols,
  searchTerm,
  onSearchChange,
  currentPage,
  itemsPerPage,
  sortField,
  sortDirection,
  selectedSymbol,
  onSymbolSelect,
  onSort,
  onPageChange,
  onItemsPerPageChange,
  onEditSymbol,
  onViewSymbol
}) => {
  // Pagination calculations
  const totalItems = symbols.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentSymbols = symbols.slice(startIndex, endIndex)

  const getSortIcon = (field: keyof SymbolData) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Search and Controls */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search symbols..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Items per page */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => onSort('symbol')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <span>Symbol</span>
                  {getSortIcon('symbol')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => onSort('symbolId')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <span>ID</span>
                  {getSortIcon('symbolId')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => onSort('assetClass')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <span>Asset Class</span>
                  {getSortIcon('assetClass')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <button
                  onClick={() => onSort('leverageProfile')}
                  className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <span>Leverage Profile</span>
                  {getSortIcon('leverageProfile')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <span>Bid/Ask</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentSymbols.map((symbol) => (
              <tr
                key={symbol.symbolId}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                  selectedSymbol === symbol.symbolId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => onSymbolSelect(symbol.symbolId)}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {symbol.symbol}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {symbol.symbolId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {symbol.assetClass}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                    {symbol.leverageProfile}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="space-y-1">
                    <div className="text-green-600 dark:text-green-400">Bid: {symbol.bid}</div>
                    <div className="text-red-600 dark:text-red-400">Ask: {symbol.ask}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewSymbol(symbol)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditSymbol(symbol)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Edit Symbol"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 