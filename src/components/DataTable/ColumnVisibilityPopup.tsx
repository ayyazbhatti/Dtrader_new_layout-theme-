import React from 'react'
import { Table } from '@tanstack/react-table'
import { ColumnVisibilityMenuState } from './useColumnVisibility'

interface ColumnVisibilityPopupProps<T> {
  table: Table<T>
  columnVisibilityMenu: ColumnVisibilityMenuState
}

export const ColumnVisibilityPopup = <T,>({ 
  table, 
  columnVisibilityMenu 
}: ColumnVisibilityPopupProps<T>) => {
  if (!columnVisibilityMenu.show) return null

  return (
    <div
      data-column-menu
      className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-50 min-w-[280px] max-h-[400px] overflow-y-auto transition-all duration-200 ease-out"
      style={{
        left: columnVisibilityMenu.x - 140,
        top: columnVisibilityMenu.y
      }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Column Visibility
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Show or hide table columns
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {table.getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => (
            <label key={column.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={() => column.toggleVisibility()}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {column.columnDef.header as string}
              </span>
            </label>
          ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-600 flex justify-between">
        <button
          onClick={() => {
            table.toggleAllColumnsVisible(true)
          }}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          Show All
        </button>
        <button
          onClick={() => {
            table.toggleAllColumnsVisible(false)
          }}
          className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
        >
          Hide All
        </button>
      </div>
    </div>
  )
} 