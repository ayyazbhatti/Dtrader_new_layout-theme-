import React, { useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Settings, 
  TrendingUp,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Star,
  Activity,
  BarChart3,
  Users,
  Shield,
  Zap,
  Send,
  Inbox,
  Archive,
  Clock,
  Brain
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'
import AddNotificationSettingPopup from './NotificationsSettingsSystem'

interface NotificationSetting {
  id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'in-app' | 'webhook' | 'slack' | 'discord' | 'telegram' | 'custom'
  status: 'active' | 'inactive' | 'draft' | 'testing' | 'archived'
  category: 'system' | 'user' | 'admin' | 'security' | 'trading' | 'marketing' | 'support' | 'custom'
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical'
  target: 'all' | 'specific' | 'role-based' | 'group-based' | 'individual'
  delivery: 'immediate' | 'scheduled' | 'batch' | 'digest' | 'smart'
  frequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom'
  channels: string[]
  recipients: string[]
  conditions: Record<string, any>
  template: string
  content: string
  subject: string
  createdAt: string
  updatedAt: string
  lastSent: string
  totalSent: number
  successRate: number
  failureRate: number
  bounces: number
  complaints: number
  unsubscribes: number
  author: string
  description: string
  tags: string[]
  version: string
  enabled: boolean
  silent: boolean
  retryAttempts: number
  timeout: number
}

const NotificationsSettingsSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddSetting, setShowAddSetting] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    type: true,
    status: true,
    category: true,
    priority: true,
    target: true,
    delivery: true,
    frequency: true,
    author: true,
    totalSent: true,
    successRate: true,
    actions: true
  })
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  // Mock data - replace with actual API calls
  const mockSettings: NotificationSetting[] = [
    {
      id: '1',
      name: 'Trading Alerts',
      type: 'push',
      status: 'active',
      category: 'trading',
      priority: 'high',
      target: 'all',
      delivery: 'immediate',
      frequency: 'always',
      channels: ['push', 'email'],
      recipients: ['traders@dtrader.com'],
      conditions: { priceChange: '>5%', volume: '>1000' },
      template: 'trading-alert',
      content: 'Price alert: {{symbol}} has moved {{change}}%',
      subject: 'Trading Alert - {{symbol}}',
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 15:45:00',
      lastSent: '2024-12-19 16:20:00',
      totalSent: 1250,
      successRate: 98.5,
      failureRate: 1.5,
      bounces: 12,
      complaints: 2,
      unsubscribes: 8,
      author: 'admin@dtrader.com',
      description: 'Real-time trading alerts for price movements',
      tags: ['trading', 'alerts', 'real-time'],
      version: '2.1.0',
      enabled: true,
      silent: false,
      retryAttempts: 3,
      timeout: 30
    },
    {
      id: '2',
      name: 'Security Notifications',
      type: 'email',
      status: 'active',
      category: 'security',
      priority: 'critical',
      target: 'role-based',
      delivery: 'immediate',
      frequency: 'always',
      channels: ['email', 'sms'],
      recipients: ['security@dtrader.com'],
      conditions: { loginAttempts: '>3', suspiciousActivity: true },
      template: 'security-alert',
      content: 'Security alert: {{event}} detected from {{ip}}',
      subject: 'Security Alert - {{event}}',
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 14:20:00',
      lastSent: '2024-12-19 17:30:00',
      totalSent: 89,
      successRate: 99.2,
      failureRate: 0.8,
      bounces: 3,
      complaints: 0,
      unsubscribes: 0,
      author: 'security@dtrader.com',
      description: 'Critical security notifications for admins',
      tags: ['security', 'alerts', 'admin'],
      version: '1.5.2',
      enabled: true,
      silent: false,
      retryAttempts: 5,
      timeout: 15
    },
    {
      id: '3',
      name: 'Weekly Digest',
      type: 'email',
      status: 'active',
      category: 'marketing',
      priority: 'low',
      target: 'all',
      delivery: 'scheduled',
      frequency: 'weekly',
      channels: ['email'],
      recipients: ['users@dtrader.com'],
      conditions: { userType: 'active', subscription: 'premium' },
      template: 'weekly-digest',
      content: 'Your weekly trading summary: {{summary}}',
      subject: 'Weekly Trading Digest - {{date}}',
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 13:30:00',
      lastSent: '2024-12-19 18:15:00',
      totalSent: 567,
      successRate: 97.8,
      failureRate: 2.2,
      bounces: 8,
      complaints: 1,
      unsubscribes: 12,
      author: 'marketing@dtrader.com',
      description: 'Weekly digest of trading activities and insights',
      tags: ['digest', 'weekly', 'marketing'],
      version: '1.0.1',
      enabled: true,
      silent: true,
      retryAttempts: 3,
      timeout: 60
    }
  ]

  // Filtered settings based on search and filters
  const filteredSettings = useMemo(() => {
    return mockSettings.filter(setting => {
      const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           setting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           setting.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || setting.status === statusFilter
      const matchesType = typeFilter === 'all' || setting.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || setting.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesType && matchesCategory
    })
  }, [mockSettings, searchTerm, statusFilter, typeFilter, categoryFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const totalSettings = mockSettings.length
    const activeSettings = mockSettings.filter(s => s.status === 'active').length
    const totalSent = mockSettings.reduce((sum, s) => sum + s.totalSent, 0)
    const avgSuccessRate = mockSettings.reduce((sum, s) => sum + s.successRate, 0) / mockSettings.length
    const totalBounces = mockSettings.reduce((sum, s) => sum + s.bounces, 0)
    const totalComplaints = mockSettings.reduce((sum, s) => sum + s.complaints, 0)
    const criticalSettings = mockSettings.filter(s => s.priority === 'critical').length
    
    return {
      totalSettings,
      activeSettings,
      totalSent,
      avgSuccessRate: Math.round(avgSuccessRate * 10) / 10,
      totalBounces,
      totalComplaints,
      criticalSettings
    }
  }, [mockSettings])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'testing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4 text-blue-500" />
      case 'sms': return <Smartphone className="w-4 h-4 text-green-500" />
      case 'push': return <Bell className="w-4 h-4 text-purple-500" />
      case 'in-app': return <Inbox className="w-4 h-4 text-orange-500" />
      case 'webhook': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'slack': return <MessageSquare className="w-4 h-4 text-indigo-500" />
      case 'discord': return <MessageSquare className="w-4 h-4 text-indigo-500" />
      case 'telegram': return <MessageSquare className="w-4 h-4 text-blue-500" />
      case 'custom': return <Settings className="w-4 h-4 text-gray-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getDeliveryIcon = (delivery: string) => {
    switch (delivery) {
      case 'immediate': return <Zap className="w-4 h-4 text-green-500" />
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />
      case 'batch': return <Archive className="w-4 h-4 text-purple-500" />
      case 'digest': return <Inbox className="w-4 h-4 text-orange-500" />
      case 'smart': return <Brain className="w-4 h-4 text-indigo-500" />
      default: return <Send className="w-4 h-4 text-gray-500" />
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      show: true,
      message,
      type
    })
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleAddSetting = (settingData: Omit<NotificationSetting, 'id' | 'createdAt' | 'updatedAt' | 'lastSent' | 'totalSent' | 'successRate' | 'failureRate' | 'bounces' | 'complaints' | 'unsubscribes'>) => {
    console.log('Creating new notification setting:', settingData)
    showNotification('Notification setting created successfully!', 'success')
    setShowAddSetting(false)
  }

  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }))
  }

  const toggleColumnVisibility = () => {
    setShowColumnVisibility(!showColumnVisibility)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Settings</p>
              <p className="text-2xl font-bold text-white">{stats.totalSettings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active</p>
              <p className="text-2xl font-bold text-white">{stats.activeSettings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Sent</p>
              <p className="text-2xl font-bold text-white">{stats.totalSent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">{stats.avgSuccessRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Bounces</p>
              <p className="text-2xl font-bold text-white">{stats.totalBounces}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-white">{stats.criticalSettings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Export Settings - Download notification settings as CSV/Excel"
              onClick={() => console.log('Export Settings clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Settings
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Settings - Upload notification settings from CSV/Excel files"
              onClick={() => console.log('Import Settings clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Settings
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Add New Setting - Create a new notification configuration"
              onClick={() => setShowAddSetting(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Add New Setting
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Notification Analytics - View delivery metrics and performance"
              onClick={() => console.log('Notification Analytics clicked')}
            >
              <BarChart3 className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Notification Analytics
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Column Visibility - Show/hide table columns"
              onClick={toggleColumnVisibility}
            >
              <Eye className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Column Visibility
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="testing">Testing</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push</option>
                  <option value="in-app">In-App</option>
                  <option value="webhook">Webhook</option>
                  <option value="slack">Slack</option>
                  <option value="discord">Discord</option>
                  <option value="telegram">Telegram</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="system">System</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="security">Security</option>
                  <option value="trading">Trading</option>
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                    setCategoryFilter('all')
                  }}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.name && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>Name</th>
                )}
                {columnVisibility.type && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Type</th>
                )}
                {columnVisibility.status && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                )}
                {columnVisibility.category && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Category</th>
                )}
                {columnVisibility.priority && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Priority</th>
                )}
                {columnVisibility.target && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Target</th>
                )}
                {columnVisibility.delivery && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Delivery</th>
                )}
                {columnVisibility.frequency && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Frequency</th>
                )}
                {columnVisibility.author && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Author</th>
                )}
                {columnVisibility.totalSent && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Total Sent</th>
                )}
                {columnVisibility.successRate && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Success Rate</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSettings.map((setting, index) => (
                <tr
                  key={setting.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.name && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>
                      <div className="text-gray-900 dark:text-white font-medium">{setting.name}</div>
                    </td>
                  )}
                  
                  {columnVisibility.type && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(setting.type)}
                        <span className="capitalize text-gray-900 dark:text-white">{setting.type}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.status && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(setting.status)}`}>
                        {setting.status.charAt(0).toUpperCase() + setting.status.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.category && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{setting.category}</div>
                    </td>
                  )}
                  
                  {columnVisibility.priority && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(setting.priority)}`}>
                        {setting.priority.charAt(0).toUpperCase() + setting.priority.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.target && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{setting.target}</div>
                    </td>
                  )}
                  
                  {columnVisibility.delivery && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center gap-2">
                        {getDeliveryIcon(setting.delivery)}
                        <span className="capitalize text-gray-900 dark:text-white">{setting.delivery}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.frequency && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{setting.frequency}</div>
                    </td>
                  )}
                  
                  {columnVisibility.author && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.author}</div>
                    </td>
                  )}
                  
                  {columnVisibility.totalSent && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.totalSent.toLocaleString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.successRate && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.successRate}%</div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('View setting:', setting.id)}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Edit setting:', setting.id)}
                          className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded transition-colors"
                          title="Edit Setting"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Delete setting:', setting.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Setting"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredSettings.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{mockSettings.length}</span> settings
              </span>
            </div>
            <div className="table-footer-right">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Page 1 of 1</span>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      <ModernColumnVisibilityPopup
        isOpen={showColumnVisibility}
        onClose={() => setShowColumnVisibility(false)}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        title="Notification Setting Columns"
        description="Show or hide notification setting table columns"
      />

      {/* Add Setting Popup */}
      <AddNotificationSettingPopup
        isOpen={showAddSetting}
        onClose={() => setShowAddSetting(false)}
        onSave={handleAddSetting}
      />

      {/* Beautiful Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' 
              : notification.type === 'error'
              ? 'bg-red-500 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'info' && <Info className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsSettingsSystem 