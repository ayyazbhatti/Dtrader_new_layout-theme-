import { useEffect } from 'react'
import { ContextMenuState } from './types'

/**
 * Custom hook to handle context menu outside clicks
 */
export const useContextMenu = (
  contextMenu: ContextMenuState,
  closeContextMenu: () => void,
  columnVisibilityMenu?: { show: boolean },
  closeColumnVisibilityMenu?: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      
      // Check if click is outside context menu
      if (contextMenu.show && !target.closest('[data-context-menu]')) {
        closeContextMenu()
      }
      
      // Check if click is outside column visibility menu
      if (columnVisibilityMenu?.show && !target.closest('[data-column-menu]')) {
        closeColumnVisibilityMenu?.()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [contextMenu.show, closeContextMenu, columnVisibilityMenu?.show, closeColumnVisibilityMenu])
}

/**
 * Custom hook to handle keyboard shortcuts
 */
export const useKeyboardShortcuts = (
  table: any,
  showFilters: boolean,
  setShowFilters: (show: boolean) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + F to open filters
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setShowFilters(!showFilters)
      }
      
      // Escape to close filters
      if (e.key === 'Escape' && showFilters) {
        setShowFilters(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showFilters, setShowFilters, table])
} 