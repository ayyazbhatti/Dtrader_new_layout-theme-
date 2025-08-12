import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalRows: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100]
}) => {
  const startRow = (currentPage - 1) * pageSize + 1
  const endRow = Math.min(currentPage * pageSize, totalRows)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Showing {startRow} to {endRow} of {totalRows} results
          </div>
          
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Show:
            </label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center sm:justify-end space-x-1">
          {/* First Page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                page === currentPage
                  ? 'bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 