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

export interface ManagerData {
  id: string
  name: string
  email: string
  role: string
  domain: string
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin: string
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

export interface AddNewUserData {
  userName: string
  email: string
  password: string
  minimumMarginLevelCall: string
  group: string
  domain: string
  assignTags: string[]
  platformAccessRights: string
  userPanelAccessRight: string
  leverage: string
  maxLeverage: string
  accountType: string
  totalMarginCalculationType: string
  currency: string
  firstName: string
  lastName: string
  phone: string
  city: string
  state: string
  address: string
  comment: string
  country: string
}

export interface PositionData {
  id: string
  type: 'buy' | 'sell'
  positionId: string
  deviceInfoOpen: string
  deviceInfoClose: string
  symbol: string
  openTime: string
  closeTime: string
  realizedPnL: number
  swapFee: number
}

export interface OpenPositionData {
  id: string
  type: 'buy' | 'sell'
  positionId: string
  openTime: string
  deviceInfo: string
  symbol: string
  quantity: number
  direction: 'buy' | 'sell'
  takeProfit: number
  stopLoss: number
  marginUsed: number
  unrealizedPnL: number
}

export interface OrderData {
  id: string
  accountId: string
  accountName: string
  orderId: string
  status: 'filled' | 'cancelled' | 'pending' | 'rejected'
  symbol: string
  direction: 'buy' | 'sell'
  volume: number
  executionPrice: number
  expectedPrice: number
  submittedTime: string
  resolvedTime: string
  desiredStopLoss: number | null
  desiredTakeProfit: number | null
}

export interface DealHistoryData {
  id: string
  dealId: string
  resultingPosition: string
  accountId: string
  accountName: string
  status: 'filled' | 'cancelled' | 'pending' | 'rejected'
  positionImpact: 'opening' | 'closing'
  symbol: string
  direction: 'buy' | 'sell'
  filledVolume: number
  executionPrice: number
  netRealizedPnL: number | null
} 