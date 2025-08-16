import React from 'react'
import { Eye, X, Check, Minus } from 'lucide-react'

interface ModernColumnVisibilityPopupProps {
  isOpen: boolean
  onClose: () => void
  columnVisibility: Record<string, boolean>
  onColumnVisibilityChange: (column: string, visible: boolean) => void
  title?: string
  description?: string
}

const ModernColumnVisibilityPopup: React.FC<ModernColumnVisibilityPopupProps> = ({
  isOpen,
  onClose,
  columnVisibility,
  onColumnVisibilityChange,
  title = 'Column Visibility',
  description = 'Show or hide table columns as needed'
}) => {
  if (!isOpen) return null

  const handleSelectAll = () => {
    Object.keys(columnVisibility).forEach(column => {
      onColumnVisibilityChange(column, true)
    })
  }

  const handleSelectNone = () => {
    Object.keys(columnVisibility).forEach(column => {
      onColumnVisibilityChange(column, false)
    })
  }

  const visibleColumnsCount = Object.values(columnVisibility).filter(Boolean).length
  const totalColumns = Object.keys(columnVisibility).length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary and Action Buttons */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {visibleColumnsCount} of {totalColumns} columns visible
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  All
                </button>
                <button
                  onClick={handleSelectNone}
                  className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                  <Minus className="w-3 h-3" />
                  None
                </button>
              </div>
            </div>
          </div>

          {/* Column List */}
          <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
            {Object.entries(columnVisibility).map(([key, visible]) => (
              <label
                key={key}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  visible ? 'bg-green-50 dark:bg-green-900/20' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={(e) => onColumnVisibilityChange(key, e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {visible && (
                  <Check className="w-4 h-4 text-green-600 ml-auto" />
                )}
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernColumnVisibilityPopup 