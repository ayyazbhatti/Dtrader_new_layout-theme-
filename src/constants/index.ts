// Application constants and configuration

export const APP_CONFIG = {
  name: 'DTrader Dashboard',
  version: '1.0.0',
  description: 'Modern trading dashboard with responsive design',
  author: 'DTrader Team',
  supportEmail: 'support@dtrader.com',
} as const

export const API_CONFIG = {
  baseUrl: 'http://localhost:8000/api',
  timeout: 30000,
  retryAttempts: 3,
} as const

export const ROUTES = {
  dashboard: '/',
  trading: '/trading',
  portfolio: '/portfolio',
  settings: '/settings',
  generalSetting: '/general-setting',
  labels: '/labels',
  markets: '/markets',
  affiliateUsers: '/affiliate-users',
  transactions: '/transactions',
  botTrading: '/bot-trading',
  bankDetails: '/bank-details',
  ticket: '/ticket',
} as const

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const

export const THEME = {
  light: 'light',
  dark: 'dark',
} as const

export const TRADING_STATUS = {
  pending: 'pending',
  completed: 'completed',
  cancelled: 'cancelled',
} as const

export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
  manager: 'manager',
} as const

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
} as const

export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection.',
  serverError: 'Server error. Please try again later.',
  unauthorized: 'Unauthorized access.',
  forbidden: 'Access forbidden.',
  notFound: 'Resource not found.',
  validationError: 'Please check your input and try again.',
} as const

export const SUCCESS_MESSAGES = {
  saved: 'Changes saved successfully.',
  created: 'Item created successfully.',
  updated: 'Item updated successfully.',
  deleted: 'Item deleted successfully.',
} as const 