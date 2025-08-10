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