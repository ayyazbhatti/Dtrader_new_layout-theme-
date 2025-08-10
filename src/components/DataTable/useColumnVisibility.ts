import { useState } from 'react'
import { Table } from '@tanstack/react-table'

export interface ColumnVisibilityMenuState {
  show: boolean
  x: number
  y: number
}

export const useColumnVisibility = <T>() => {
  const [columnVisibilityMenu, setColumnVisibilityMenu] = useState<ColumnVisibilityMenuState>({
    show: false,
    x: 0,
    y: 0
  })

  const handleColumnVisibilityMenu = (e: React.MouseEvent, table: Table<T>) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get the button element
    const button = e.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    
    // Calculate popup position relative to the button
    const popupWidth = 280
    const popupHeight = 400
    const margin = 20
    
    let left = rect.left + (rect.width / 2)
    let top = rect.bottom + 10
    
    // Adjust horizontal position to keep popup within viewport
    if (left + (popupWidth / 2) > window.innerWidth - margin) {
      left = window.innerWidth - (popupWidth / 2) - margin
    }
    if (left - (popupWidth / 2) < margin) {
      left = (popupWidth / 2) + margin
    }
    
    // Adjust vertical position to keep popup within viewport
    if (top + popupHeight > window.innerHeight - margin) {
      // Show above the button if there's not enough space below
      top = rect.top - popupHeight - 10
    }
    if (top < margin) {
      top = margin
    }
    
    setColumnVisibilityMenu(prev => ({
      show: !prev.show,
      x: left,
      y: top
    }))
  }

  const closeColumnVisibilityMenu = () => {
    setColumnVisibilityMenu(prev => ({ ...prev, show: false }))
  }

  return {
    columnVisibilityMenu,
    handleColumnVisibilityMenu,
    closeColumnVisibilityMenu
  }
} 