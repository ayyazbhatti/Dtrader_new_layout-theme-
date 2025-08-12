// Main component
export { default as DataTable } from './DataTable'

// Types
export type { UserData, ManagerData, ContextMenuState, FilterConfig } from './types'

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

// Bot Management Components
export { BotAssignmentPopup } from './BotAssignmentPopup'

// Price Drop Alert Components
export { PriceDropAlertPopup } from './PriceDropAlertPopup'
export { ScheduleMeetingPopup } from './ScheduleMeetingPopup'

// Subscription Date Components
export { SubscriptionDatePopup } from './SubscriptionDatePopup'

// Add New User Components
export { AddNewUserPopup } from './AddNewUserPopup'

// User Details Components
export { default as UserDetailsPopup } from './UserDetailsPopup'

// Manager Details Components
export { default as ManagerDetailsPopup } from './ManagerDetailsPopup'
export { default as AddManagerPopup } from './AddManagerPopup'

// Group Components
export { default as GroupProfilesTable } from './GroupProfilesTable'
export { default as GroupSettingsDetailsPopup } from './GroupSettingsDetailsPopup'

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