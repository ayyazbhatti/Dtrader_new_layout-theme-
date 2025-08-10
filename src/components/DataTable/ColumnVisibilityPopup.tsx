import React from 'react'
import { Table } from '@tanstack/react-table'
import { ColumnVisibilityMenuState } from './useColumnVisibility'
import { X } from 'lucide-react'

interface ColumnVisibilityPopupProps<T> {
  table: Table<T>
  columnVisibilityMenu: ColumnVisibilityMenuState
  onClose: () => void
}

export const ColumnVisibilityPopup = <T,>({ 
  table, 
  columnVisibilityMenu,
  onClose
}: ColumnVisibilityPopupProps<T>) => {
  if (!columnVisibilityMenu.show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Column Visibility
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Show or hide table columns as needed
            </p>
          </div>

          {/* Column Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Column Visibility *
            </label>
            
            {/* Selected Columns Display */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {table.getAllColumns().filter(col => col.getCanHide() && col.getIsVisible()).length} Columns visible
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      table.toggleAllColumnsVisible(true)
                    }}
                    className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                  >
                    All
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      table.toggleAllColumnsVisible(false)
                    }}
                    className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:text-gray-600 transition-colors"
                  >
                    None
                  </button>
                </div>
              </div>
            </div>

            {/* Column List */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
              {table.getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <label
                    key={`${column.id}-${column.getIsVisible()}`}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      column.getIsVisible() ? 'bg-green-50 dark:bg-green-900/20' : ''
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={(e) => {
                        e.stopPropagation()
                        
                        // Direct state update
                        const newState = {...table.getState().columnVisibility}
                        newState[column.id] = !column.getIsVisible()
                        
                        table.setColumnVisibility(newState)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-3 text-sm text-gray-900 dark:text-white">
                      {column.columnDef.header as string}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  )
} 