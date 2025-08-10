export interface UserData {
  id: string
  online: boolean
  botStatus: boolean
  accountId: string
  name: string
  email: string
  group: string
  referral: string
  leverage: number
  balance: number
  equity: number
  marginLevel: number
  unrealizedPnL: number
  realizedPnL: number
  botProfit: number
  botSetting: string
  botSubscription: boolean
  botEnabled: boolean
  showBotSettings: boolean
}

export interface ContextMenuState {
  show: boolean
  x: number
  y: number
  columnId: string
  columnName: string
}

export interface FilterConfig {
  id: string
  label: string
  type: 'select' | 'range' | 'boolean'
  options?: string[]
  min?: number
  max?: number
}

export interface PriceDropAlertData {
  symbol: string
  title: string
  quantity: number
  allowUserChangeQuantity: boolean
  sendEmailToOfflineUsers: boolean
  sendNotificationsToOfflineUsers: boolean
  comment: string
}

export interface SubscriptionDateData {
  subscriptionOption: string
  subscriptionEndDate: string
} 