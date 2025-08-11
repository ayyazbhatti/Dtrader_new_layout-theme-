/**
 * Table configuration constants
 */
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  COLUMN_RESIZE_MODE: 'onChange' as const,
  MIN_COLUMN_WIDTH: 50,
  MAX_COLUMN_WIDTH: 500,
} as const

/**
 * Column configuration constants
 */
export const COLUMN_CONFIGS = {
  GROUP_OPTIONS: [
    'DefaultGroup',
    'Premium',
    'VIP',
    'Whatsapp',
    'Admin',
    'Manager',
    'User'
  ],
  DOMAIN_OPTIONS: [
    'dtrader',
    'mt4',
    'mt5',
    'cTrader'
  ],
  CURRENCY_OPTIONS: [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF'
  ],
  ACCOUNT_TYPE_OPTIONS: [
    'CFD Hedging',
    'CFD Netting',
    'Standard',
    'Premium',
    'VIP'
  ]
} as const

/**
 * CSS class names for consistent styling
 */
export const CSS_CLASSES = {
  // Table classes
  TABLE_CONTAINER: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden',
  TABLE_HEADER: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800',
  TABLE_ROW: 'hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200',
  TABLE_CELL: 'border-r border-gray-100 dark:border-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-gray-100',
  
  // Button classes
  BUTTON_PRIMARY: 'px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200',
  BUTTON_SECONDARY: 'px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200',
  
  // Input classes
  INPUT_BASE: 'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
  
  // Status classes
  STATUS_ONLINE: 'text-green-600 dark:text-green-400',
  STATUS_OFFLINE: 'text-gray-500 dark:text-gray-400',
  STATUS_ACTIVE: 'text-green-600 dark:text-green-400',
  STATUS_INACTIVE: 'text-gray-500 dark:text-gray-400',
} as const

/**
 * Context menu options configuration
 */
export const CONTEXT_MENU_OPTIONS = {
  SORT: {
    ASC: 'Sort A to Z',
    DESC: 'Sort Z to A',
  },
  FILTER: {
    CREATE: 'Create a filter',
    CLEAR: 'Clear filter',
  },
  COLUMN: {
    HIDE: 'Hide column',
    SHOW_ALL: 'Show all columns',
  },
  FINANCIAL: {
    EXPORT: 'Export',
    STATS: 'Column stats',
  },
  USER: {
    BULK_OPERATIONS: 'Bulk user operations',
    ANALYTICS: 'User analytics',
  },
  STATUS: {
    ACTIVE_ONLY: 'Show active only',
    INACTIVE_ONLY: 'Show inactive only',
  },
} as const 