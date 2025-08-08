// API service layer for the DTrader Dashboard

import { ApiResponse } from '../types'
import { API_CONFIG } from '../constants'
import { handleApiError } from '../utils'

/**
 * Base API client
 */
class ApiClient {
  private baseUrl: string
  private timeout: number

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
    this.timeout = API_CONFIG.timeout
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const apiError = handleApiError(error)
      return { success: false, error: apiError.message }
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create singleton instance
const apiClient = new ApiClient()

/**
 * Trading API service
 */
export const tradingApi = {
  /**
   * Get trading statistics
   */
  getStats: () => apiClient.get<any>('/trading/stats'),

  /**
   * Get recent trades
   */
  getRecentTrades: (limit = 10) => 
    apiClient.get<any>(`/trading/recent?limit=${limit}`),

  /**
   * Place new trade
   */
  placeTrade: (tradeData: any) => 
    apiClient.post<any>('/trading/place', tradeData),

  /**
   * Cancel trade
   */
  cancelTrade: (tradeId: string) => 
    apiClient.delete<any>(`/trading/${tradeId}`),
}

/**
 * User API service
 */
export const userApi = {
  /**
   * Get user profile
   */
  getProfile: () => apiClient.get<any>('/user/profile'),

  /**
   * Update user profile
   */
  updateProfile: (profileData: any) => 
    apiClient.put<any>('/user/profile', profileData),

  /**
   * Get user settings
   */
  getSettings: () => apiClient.get<any>('/user/settings'),

  /**
   * Update user settings
   */
  updateSettings: (settingsData: any) => 
    apiClient.put<any>('/user/settings', settingsData),
}

/**
 * Portfolio API service
 */
export const portfolioApi = {
  /**
   * Get portfolio overview
   */
  getOverview: () => apiClient.get<any>('/portfolio/overview'),

  /**
   * Get portfolio holdings
   */
  getHoldings: () => apiClient.get<any>('/portfolio/holdings'),

  /**
   * Get portfolio performance
   */
  getPerformance: (period: string) => 
    apiClient.get<any>(`/portfolio/performance?period=${period}`),
}

/**
 * Market API service
 */
export const marketApi = {
  /**
   * Get market data
   */
  getMarketData: (symbol: string) => 
    apiClient.get<any>(`/market/data/${symbol}`),

  /**
   * Get market symbols
   */
  getSymbols: () => apiClient.get<any>('/market/symbols'),

  /**
   * Get market news
   */
  getNews: (limit = 10) => 
    apiClient.get<any>(`/market/news?limit=${limit}`),
}

/**
 * Notification API service
 */
export const notificationApi = {
  /**
   * Get notifications
   */
  getNotifications: () => apiClient.get<any>('/notifications'),

  /**
   * Mark notification as read
   */
  markAsRead: (notificationId: string) => 
    apiClient.put<any>(`/notifications/${notificationId}/read`),

  /**
   * Delete notification
   */
  deleteNotification: (notificationId: string) => 
    apiClient.delete<any>(`/notifications/${notificationId}`),
}

export default apiClient 