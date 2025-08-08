import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'
import { UserData } from './types'

/**
 * Formats currency values with proper locale formatting
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

import React from 'react'

/**
 * Gets the appropriate sort icon for a column
 */
export const getSortIcon = (column: any) => {
  if (!column.getCanSort()) return null
  
  if (column.getIsSorted() === 'asc') {
    return React.createElement(ChevronUp, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" })
  } else if (column.getIsSorted() === 'desc') {
    return React.createElement(ChevronDown, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" })
  }
  return React.createElement(ArrowUpDown, { className: "w-4 h-4 text-gray-400 dark:text-gray-500" })
}

/**
 * Calculates financial statistics for a column
 */
export const calculateColumnStats = (data: UserData[], columnId: keyof UserData) => {
  const columnData = data.map(row => row[columnId]) as number[]
  const sum = columnData.reduce((a, b) => a + b, 0)
  const avg = sum / columnData.length
  const max = Math.max(...columnData)
  const min = Math.min(...columnData)
  
  return { sum, avg, max, min }
}

/**
 * Formats margin level with color coding
 */
export const formatMarginLevel = (value: number) => {
  const colorClass = value > 100 
    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    : value > 50 
    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  
  return {
    value: `${value.toFixed(2)}%`,
    colorClass
  }
}

/**
 * Formats PnL values with color coding and signs
 */
export const formatPnL = (value: number) => {
  const colorClass = value >= 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
  
  const sign = value >= 0 ? '+' : ''
  const formattedValue = formatCurrency(value)
  
  return {
    value: `${sign}${formattedValue}`,
    colorClass
  }
} 