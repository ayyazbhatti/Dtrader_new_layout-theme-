import React from 'react'
import { Table } from '@tanstack/react-table'

interface MobileColumnVisibilityProps<T> {
  table: Table<T>
}

export const MobileColumnVisibility = <T,>({ table }: MobileColumnVisibilityProps<T>) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {table.getAllColumns()
        .filter(column => column.getCanHide())
        .map(column => (
          <button
            key={column.id}
            onClick={() => column.toggleVisibility()}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
              column.getIsVisible()
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            {column.columnDef.header as string}
          </button>
        ))}
    </div>
  )
} 