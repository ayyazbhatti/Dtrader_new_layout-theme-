// Main component
export { default as DataTable } from './DataTable'

// Types
export type { UserData, ContextMenuState, FilterConfig } from './types'

// Utilities
export {
  formatCurrency,
  getSortIcon,
  calculateColumnStats,
  formatMarginLevel,
  formatPnL,
} from './utils'

// Hooks
export {
  useContextMenu,
  useKeyboardShortcuts,
} from './hooks'

// Column Visibility Hook
export { useColumnVisibility } from './useColumnVisibility'

// Column Visibility Components
export { ColumnVisibilityButton } from './ColumnVisibilityButton'
export { ColumnVisibilityPopup } from './ColumnVisibilityPopup'
export { MobileColumnVisibility } from './MobileColumnVisibility'

// Group Management Components
export { GroupAssignmentPopup } from './GroupAssignmentPopup'

// Constants
export {
  TABLE_CONFIG,
  CSS_CLASSES,
  CONTEXT_MENU_OPTIONS,
  COLUMN_CONFIGS,
} from './constants'

// Data
export {
  mockUserData,
} from './data' 