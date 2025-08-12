import React from 'react'
import { Filter, X } from 'lucide-react'

interface DataTableFiltersProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    onlineStatus: string
    botStatus: string
    balanceRange: string
    group: string
    emailDomain: string
    createdDate: string
    tags: string[]
  }
  onFilterChange: (field: string, value: any) => void
  onClearFilters: () => void
  onApplyFilters: () => void
}

export const DataTableFilters: React.FC<DataTableFiltersProps> = ({
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Online Status */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Online Status
            </label>
            <select
              value={filters.onlineStatus}
              onChange={(e) => onFilterChange('onlineStatus', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Bot Status */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Bot Status
            </label>
            <select
              value={filters.botStatus}
              onChange={(e) => onFilterChange('botStatus', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Balance Range */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Balance Range
            </label>
            <select
              value={filters.balanceRange}
              onChange={(e) => onFilterChange('balanceRange', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-10000">$1,000 - $10,000</option>
              <option value="10000-50000">$10,000 - $50,000</option>
              <option value="50000+">$50,000+</option>
            </select>
          </div>

          {/* Group */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Group
            </label>
            <select
              value={filters.group}
              onChange={(e) => onFilterChange('group', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Groups</option>
              <option value="DefaultGro">Default Group</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Email Domain */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Domain
            </label>
            <input
              type="text"
              placeholder="e.g., gmail.com"
              value={filters.emailDomain}
              onChange={(e) => onFilterChange('emailDomain', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Created Date */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Created Date
            </label>
            <input
              type="date"
              value={filters.createdDate}
              onChange={(e) => onFilterChange('createdDate', e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <select
              multiple
              value={filters.tags}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                onFilterChange('tags', selectedOptions)
              }}
              className="w-full px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="Premium User">Premium User</option>
              <option value="VIP Member">VIP Member</option>
              <option value="Active Trader">Active Trader</option>
              <option value="Bot User">Bot User</option>
              <option value="Manual Trader">Manual Trader</option>
            </select>
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