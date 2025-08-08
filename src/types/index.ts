// Global type definitions for the DTrader Dashboard

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TradingStats {
  name: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ComponentType<any>
}

export interface Trade {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  quantity: number
  price: number
  time: string
  status: 'pending' | 'completed' | 'cancelled'
}

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  subMenus?: NavigationSubItem[]
}

export interface NavigationSubItem {
  name: string
  href: string
  icon: React.ComponentType<any>
}

export interface Theme {
  mode: 'light' | 'dark'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  total: number
}

export interface ApiError {
  code: string
  message: string
  details?: any
} 