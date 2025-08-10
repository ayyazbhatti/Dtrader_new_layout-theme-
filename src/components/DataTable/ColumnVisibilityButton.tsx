import React from 'react'
import { Eye } from 'lucide-react'

interface ColumnVisibilityButtonProps {
  onClick: (e: React.MouseEvent) => void
  className?: string
}

export const ColumnVisibilityButton: React.FC<ColumnVisibilityButtonProps> = ({ 
  onClick, 
  className = "p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
}) => {
  return (
    <button 
      className={className}
      title="Column Visibility - Show/hide table columns"
      onClick={onClick}
    >
      <Eye className="w-4 h-4" />
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
        Column Visibility
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
      </div>
    </button>
  )
} 