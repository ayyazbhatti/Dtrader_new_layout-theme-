import React from 'react'
import { Filter, X } from 'lucide-react'

interface GroupsTableFiltersProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    status: string
    stopOutLevel: string
    memberCount: string
    totalBalance: string
    priceStream: string
    createdAt: string
  }
  onFilterChange: (field: string, value: any) => void
  onClearFilters: () => void
  onApplyFilters: () => void
}

export const GroupsTableFilters: React.FC<GroupsTableFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters
}) => {
  if (!isOpen) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="hidden sm:inline">Advanced Filters</span>
          <span className="sm:hidden">Filters</span>
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Status */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Stop Out Level */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Stop Out Level
            </label>
            <select
              value={filters.stopOutLevel}
              onChange={(e) => onFilterChange('stopOutLevel', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Levels</option>
              <option value="0-20">0% - 20%</option>
              <option value="20-40">20% - 40%</option>
              <option value="40-60">40% - 60%</option>
              <option value="60-80">60% - 80%</option>
              <option value="80-100">80% - 100%</option>
            </select>
          </div>

          {/* Member Count */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Member Count
            </label>
            <select
              value={filters.memberCount}
              onChange={(e) => onFilterChange('memberCount', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Sizes</option>
              <option value="0-50">0 - 50 members</option>
              <option value="50-100">50 - 100 members</option>
              <option value="100-200">100 - 200 members</option>
              <option value="200+">200+ members</option>
            </select>
          </div>

          {/* Total Balance */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Balance
            </label>
            <select
              value={filters.totalBalance}
              onChange={(e) => onFilterChange('totalBalance', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Balances</option>
              <option value="0-100000">$0 - $100K</option>
              <option value="100000-500000">$100K - $500K</option>
              <option value="500000-1000000">$500K - $1M</option>
              <option value="1000000+">$1M+</option>
            </select>
          </div>

          {/* Price Stream */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Price Stream
            </label>
            <select
              value={filters.priceStream}
              onChange={(e) => onFilterChange('priceStream', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Streams</option>
              <option value="Default">Default Price Stream</option>
              <option value="Premium">Premium Price Stream</option>
              <option value="VIP">VIP Price Stream</option>
              <option value="Professional">Professional Price Stream</option>
            </select>
          </div>

          {/* Created Date */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Created Date
            </label>
            <input
              type="date"
              value={filters.createdAt}
              onChange={(e) => onFilterChange('createdAt', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Filters applied
            </span>
            <button
              onClick={onClearFilters}
              className="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onApplyFilters}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 