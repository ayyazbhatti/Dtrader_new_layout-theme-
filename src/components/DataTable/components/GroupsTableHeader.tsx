import React from 'react'
import { Search, Filter, Plus, Download, Upload, Tag } from 'lucide-react'

interface GroupsTableHeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onShowFilters: () => void
  showFilters: boolean
  onAddGroup: () => void
  onExport: () => void
  onImport: () => void
  onTagManagement: () => void
  selectedRows: number
  totalRows: number
}

export const GroupsTableHeader: React.FC<GroupsTableHeaderProps> = ({
  searchValue,
  onSearchChange,
  onShowFilters,
  showFilters,
  onAddGroup,
  onExport,
  onImport,
  onTagManagement,
  selectedRows,
  totalRows
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Left side - Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-48 lg:w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={onShowFilters}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              showFilters
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* Tag Management */}
          <button
            onClick={onTagManagement}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Tag className="w-4 h-4" />
            <span className="hidden sm:inline">Tags</span>
          </button>
        </div>

        {/* Right side - Actions and Info */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Row Selection Info */}
          {selectedRows > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedRows} of {totalRows} selected
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onAddGroup}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Group</span>
            </button>

            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={onImport}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 