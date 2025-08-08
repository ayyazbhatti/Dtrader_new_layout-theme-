// Configuration for the DTrader Dashboard

export const config = {
  // Application settings
  app: {
    name: 'DTrader Dashboard',
    version: '1.0.0',
    description: 'Modern trading dashboard with responsive design',
  },

  // API configuration
  api: {
    baseUrl: 'http://localhost:8000/api',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Feature flags
  features: {
    darkMode: true,
    mobileMenu: true,
    realTimeUpdates: false,
    advancedCharts: false,
    notifications: true,
  },

  // UI configuration
  ui: {
    theme: {
      default: 'light',
      storageKey: 'dtrader-theme',
    },
    sidebar: {
      collapsedWidth: 64,
      expandedWidth: 256,
    },
    breakpoints: {
      mobile: 640,
      tablet: 1024,
      desktop: 1280,
    },
  },

  // Trading configuration
  trading: {
    defaultCurrency: 'USD',
    supportedCurrencies: ['USD', 'EUR', 'GBP'],
    maxDecimalPlaces: 2,
    refreshInterval: 5000, // 5 seconds
  },

  // Security configuration
  security: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
  },

  // Performance configuration
  performance: {
    debounceDelay: 300,
    throttleDelay: 100,
    maxRetries: 3,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
  },
} as const

// Environment-specific configurations
export const isDevelopment = true // Will be replaced with actual env check
export const isProduction = false // Will be replaced with actual env check
export const isTest = false // Will be replaced with actual env check

// Development-specific settings
export const devConfig = {
  enableLogging: true,
  enableDebugTools: true,
  mockApiResponses: true,
}

// Production-specific settings
export const prodConfig = {
  enableLogging: false,
  enableDebugTools: false,
  mockApiResponses: false,
}

// Get current environment configuration
export const getCurrentConfig = () => {
  if (isDevelopment) {
    return { ...config, ...devConfig }
  }
  if (isProduction) {
    return { ...config, ...prodConfig }
  }
  return config
} 