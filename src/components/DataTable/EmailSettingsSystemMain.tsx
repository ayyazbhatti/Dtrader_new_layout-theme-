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
  Globe,
  DollarSign,
  Activity,
  Target,
  Percent,
  Clock,
  Calendar,
  FileText,
  Zap,
  Shield,
  Brain,
  Gauge,
  Target as TargetIcon,
  BarChart3,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  Banknote,
  Wallet,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Coins,
  Network,
  Server,
  Database,
  Key,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Zap as ZapIcon,
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  Settings as SettingsIcon,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Play,
  Pause,
  Power,
  PowerOff,
  Send,
  Inbox,
  Archive,
  Star,
  AlertCircle as AlertCircleIcon,
  Bell,
  BellOff,
  Shield as ShieldIcon2,
  Globe as GlobeIcon2,
  Zap as ZapIcon2,
  Activity as ActivityIcon2,
  TrendingUp as TrendingUpIcon2,
  BarChart3 as BarChart3Icon2,
  Settings as SettingsIcon2,
  AlertCircle as AlertCircleIcon2,
  HelpCircle as HelpCircleIcon2,
  Bug as BugIcon,
  Lightbulb as LightbulbIcon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  RefreshCw as RefreshCwIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'
import AddEmailTemplatePopup from './EmailSettingsSystem'

interface Broker {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive' | 'maintenance'
  emailProvider: 'smtp' | 'sendgrid' | 'mailgun' | 'aws-ses' | 'custom'
  smtpSettings?: {
    host: string
    port: number
    username: string
    password: string
    encryption: 'none' | 'ssl' | 'tls'
  }
  apiSettings?: {
    apiKey: string
    apiSecret?: string
    region?: string
    endpoint?: string
  }
  fromEmail: string
  fromName: string
  replyToEmail?: string
  dailyLimit: number
  monthlyLimit: number
  createdAt: string
  updatedAt: string
}

interface EmailTemplate {
  id: string
  brokerId: string
  name: string
  subject: string
  type: 'welcome' | 'notification' | 'alert' | 'marketing' | 'transaction' | 'security' | 'support' | 'custom'
  status: 'active' | 'inactive' | 'draft' | 'archived'
  category: 'system' | 'user' | 'admin' | 'marketing' | 'support'
  language: string
  variables: string[]
  content: string
  htmlContent: string
  plainTextContent: string
  createdAt: string
  updatedAt: string
  lastUsed: string
  usageCount: number
  createdBy: string
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  deliveryTime: string
  retryAttempts: number
  successRate: number
  bounces: number
  complaints: number
}

const EmailSettingsSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [brokerFilter, setBrokerFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddTemplate, setShowAddTemplate] = useState(false)
  const [showAddBroker, setShowAddBroker] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    broker: true,
    subject: true,
    type: true,
    status: true,
    category: true,
    language: true,
    priority: true,
    usageCount: true,
    successRate: true,
    lastUsed: true,
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

  // Mock brokers data
  const mockBrokers: Broker[] = [
    {
      id: '1',
      name: 'DTrader Main',
      domain: 'dtrader.com',
      status: 'active',
      emailProvider: 'sendgrid',
      apiSettings: {
        apiKey: 'sg_xxxxxxxxxxxxxxxxxxxxx',
        apiSecret: 'xxxxxxxxxxxxxxxxxxxxx'
      },
      fromEmail: 'noreply@dtrader.com',
      fromName: 'DTrader',
      replyToEmail: 'support@dtrader.com',
      dailyLimit: 10000,
      monthlyLimit: 300000,
      createdAt: '2024-01-01 00:00:00',
      updatedAt: '2024-12-19 10:00:00'
    },
    {
      id: '2',
      name: 'DTrader Europe',
      domain: 'dtrader.eu',
      status: 'active',
      emailProvider: 'mailgun',
      apiSettings: {
        apiKey: 'key-xxxxxxxxxxxxxxxxxxxxx',
        endpoint: 'https://api.eu.mailgun.net'
      },
      fromEmail: 'noreply@dtrader.eu',
      fromName: 'DTrader Europe',
      replyToEmail: 'support@dtrader.eu',
      dailyLimit: 5000,
      monthlyLimit: 150000,
      createdAt: '2024-06-01 00:00:00',
      updatedAt: '2024-12-19 10:00:00'
    },
    {
      id: '3',
      name: 'DTrader Asia',
      domain: 'dtrader.asia',
      status: 'active',
      emailProvider: 'aws-ses',
      apiSettings: {
        apiKey: 'AKIAXXXXXXXXXXXXXXXX',
        apiSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        region: 'ap-southeast-1'
      },
      fromEmail: 'noreply@dtrader.asia',
      fromName: 'DTrader Asia',
      replyToEmail: 'support@dtrader.asia',
      dailyLimit: 8000,
      monthlyLimit: 240000,
      createdAt: '2024-09-01 00:00:00',
      updatedAt: '2024-12-19 10:00:00'
    }
  ]

  // Mock data - replace with actual API calls
  const mockTemplates: EmailTemplate[] = [
    {
      id: '1',
      brokerId: '1',
      name: 'Welcome Email',
      subject: 'Welcome to DTrader - Get Started Today!',
      type: 'welcome',
      status: 'active',
      category: 'user',
      language: 'en',
      variables: ['username', 'email', 'company'],
      content: 'Welcome email for new users',
      htmlContent: '<h1>Welcome {{username}}!</h1><p>Thank you for joining DTrader...</p>',
      plainTextContent: 'Welcome username! Thank you for joining DTrader...',
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 15:45:00',
      lastUsed: '2024-12-19 16:20:00',
      usageCount: 1250,
      createdBy: 'admin@dtrader.com',
      tags: ['welcome', 'onboarding', 'user'],
      priority: 'medium',
      deliveryTime: 'immediate',
      retryAttempts: 3,
      successRate: 98.5,
      bounces: 12,
      complaints: 2
    },
    {
      id: '2',
      brokerId: '1',
      name: 'Security Alert',
      subject: 'Security Alert - Unusual Login Activity',
      type: 'security',
      status: 'active',
      category: 'system',
      language: 'en',
      variables: ['username', 'location', 'time', 'device'],
      content: 'Security alert for suspicious login attempts',
      htmlContent: '<h2>Security Alert</h2><p>We detected unusual login activity...</p>',
      plainTextContent: 'Security Alert: We detected unusual login activity...',
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 14:20:00',
      lastUsed: '2024-12-19 17:30:00',
      usageCount: 89,
      createdBy: 'security@dtrader.com',
      tags: ['security', 'alert', 'login'],
      priority: 'high',
      deliveryTime: 'immediate',
      retryAttempts: 5,
      successRate: 99.2,
      bounces: 3,
      complaints: 0
    },
    {
      id: '3',
      brokerId: '2',
      name: 'Transaction Confirmation',
      subject: 'Transaction Confirmed - {{transaction_id}}',
      type: 'transaction',
      status: 'active',
      category: 'user',
      language: 'en',
      variables: ['username', 'transaction_id', 'amount', 'currency', 'date'],
      content: 'Transaction confirmation email',
      htmlContent: '<h3>Transaction Confirmed</h3><p>Your transaction {{transaction_id}} has been confirmed...</p>',
      plainTextContent: 'Transaction Confirmed: Your transaction has been confirmed...',
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 13:30:00',
      lastUsed: '2024-12-19 18:15:00',
      usageCount: 567,
      createdBy: 'system@dtrader.com',
      tags: ['transaction', 'confirmation', 'finance'],
      priority: 'medium',
      deliveryTime: 'immediate',
      retryAttempts: 3,
      successRate: 97.8,
      bounces: 8,
      complaints: 1
    }
  ]

  // Filtered templates based on search and filters
  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'all' || template.status === statusFilter
      const matchesType = typeFilter === 'all' || template.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
      const matchesBroker = brokerFilter === 'all' || template.brokerId === brokerFilter
      
      return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesBroker
    })
  }, [mockTemplates, searchTerm, statusFilter, typeFilter, categoryFilter, brokerFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const totalTemplates = mockTemplates.length
    const activeTemplates = mockTemplates.filter(t => t.status === 'active').length
    const totalUsage = mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)
    const avgSuccessRate = mockTemplates.reduce((sum, t) => sum + t.successRate, 0) / mockTemplates.length
    const totalBounces = mockTemplates.reduce((sum, t) => sum + t.bounces, 0)
    const totalComplaints = mockTemplates.reduce((sum, t) => sum + t.complaints, 0)
    
    // Broker-specific stats
    const brokerStats = mockBrokers.map(broker => {
      const brokerTemplates = mockTemplates.filter(t => t.brokerId === broker.id)
      const brokerUsage = brokerTemplates.reduce((sum, t) => sum + t.usageCount, 0)
      const brokerSuccessRate = brokerTemplates.length > 0 
        ? brokerTemplates.reduce((sum, t) => sum + t.successRate, 0) / brokerTemplates.length 
        : 0
      
      return {
        ...broker,
        templateCount: brokerTemplates.length,
        totalUsage: brokerUsage,
        avgSuccessRate: Math.round(brokerSuccessRate * 10) / 10
      }
    })
    
    return {
      totalTemplates,
      activeTemplates,
      totalUsage,
      avgSuccessRate: Math.round(avgSuccessRate * 10) / 10,
      totalBounces,
      totalComplaints,
      brokerStats
    }
  }, [mockTemplates, mockBrokers])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'notification': return <Bell className="w-4 h-4 text-blue-500" />
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'marketing': return <TrendingUp className="w-4 h-4 text-purple-500" />
      case 'transaction': return <DollarSign className="w-4 h-4 text-yellow-500" />
      case 'security': return <Shield className="w-4 h-4 text-orange-500" />
      case 'support': return <HelpCircle className="w-4 h-4 text-indigo-500" />
      case 'custom': return <Settings className="w-4 h-4 text-gray-500" />
      default: return <Mail className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
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

  const handleAddTemplate = (templateData: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt' | 'lastUsed' | 'usageCount' | 'bounces' | 'complaints'>) => {
    console.log('Creating new email template:', templateData)
    showNotification('Email template created successfully!', 'success')
    setShowAddTemplate(false)
  }

  const handleAddBroker = () => {
    setShowAddBroker(true)
  }

  const getBrokerName = (brokerId: string) => {
    const broker = mockBrokers.find(b => b.id === brokerId)
    return broker ? broker.name : 'Unknown Broker'
  }

  const getBrokerDomain = (brokerId: string) => {
    const broker = mockBrokers.find(b => b.id === brokerId)
    return broker ? broker.domain : 'Unknown Domain'
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
            <div className="p-2 bg-blue-600 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Templates</p>
              <p className="text-2xl font-bold text-white">{stats.totalTemplates}</p>
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
              <p className="text-2xl font-bold text-white">{stats.activeTemplates}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsage.toLocaleString()}</p>
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
            <div className="p-2 bg-orange-600 rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Complaints</p>
              <p className="text-2xl font-bold text-white">{stats.totalComplaints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Management Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Broker Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage email providers and broker configurations</p>
          </div>
          <button
            onClick={handleAddBroker}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Broker
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.brokerStats.map((broker) => (
            <div key={broker.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    broker.status === 'active' ? 'bg-green-500' : 
                    broker.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <h4 className="font-medium text-gray-900 dark:text-white">{broker.name}</h4>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                  {broker.emailProvider}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Domain:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Templates:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.templateCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Usage:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.totalUsage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.avgSuccessRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Daily Limit:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.dailyLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Limit:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{broker.monthlyLimit.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Mail className="w-3 h-3" />
                  {broker.fromEmail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Export Templates - Download template data as CSV/Excel"
              onClick={() => console.log('Export Templates clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Templates
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Templates - Upload template data from CSV/Excel files"
              onClick={() => console.log('Import Templates clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Templates
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Add New Template - Create a new email template"
              onClick={() => setShowAddTemplate(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Add New Template
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Email Analytics - View delivery metrics and performance"
              onClick={() => console.log('Email Analytics clicked')}
            >
              <BarChart3 className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Email Analytics
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
                placeholder="Search templates..."
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
                  <option value="welcome">Welcome</option>
                  <option value="notification">Notification</option>
                  <option value="alert">Alert</option>
                  <option value="marketing">Marketing</option>
                  <option value="transaction">Transaction</option>
                  <option value="security">Security</option>
                  <option value="support">Support</option>
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
                  <option value="marketing">Marketing</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Broker</label>
                <select
                  value={brokerFilter}
                  onChange={(e) => setBrokerFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Brokers</option>
                  {mockBrokers.map(broker => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name} ({broker.domain})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                    setCategoryFilter('all')
                    setBrokerFilter('all')
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

      {/* Templates Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.name && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Name</th>
                )}
                {columnVisibility.broker && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Broker</th>
                )}
                {columnVisibility.subject && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>Subject</th>
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
                {columnVisibility.language && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Lang</th>
                )}
                {columnVisibility.priority && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Priority</th>
                )}
                {columnVisibility.usageCount && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Usage</th>
                )}
                {columnVisibility.successRate && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Success</th>
                )}
                {columnVisibility.lastUsed && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Last Used</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTemplates.map((template, index) => (
                <tr
                  key={template.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.name && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="text-gray-900 dark:text-white font-medium">{template.name}</div>
                    </td>
                  )}
                  
                  {columnVisibility.broker && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="text-gray-900 dark:text-white">
                        <div className="font-medium">{getBrokerName(template.brokerId)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{getBrokerDomain(template.brokerId)}</div>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.subject && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>
                      <div className="text-gray-900 dark:text-white truncate" title={template.subject}>{template.subject}</div>
                    </td>
                  )}
                  
                  {columnVisibility.type && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(template.type)}
                        <span className="capitalize text-gray-900 dark:text-white">{template.type}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.status && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(template.status)}`}>
                        {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.category && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{template.category}</div>
                    </td>
                  )}
                  
                  {columnVisibility.language && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <div className="text-gray-900 dark:text-white uppercase">{template.language}</div>
                    </td>
                  )}
                  
                  {columnVisibility.priority && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(template.priority)}`}>
                        {template.priority.charAt(0).toUpperCase() + template.priority.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.usageCount && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{template.usageCount.toLocaleString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.successRate && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{template.successRate}%</div>
                    </td>
                  )}
                  
                  {columnVisibility.lastUsed && (
                    <td className="data-table-cell px-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-500 dark:text-gray-400">{template.lastUsed}</div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('View template:', template.id)}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Edit template:', template.id)}
                          className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded transition-colors"
                          title="Edit Template"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Delete template:', template.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Template"
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
                <span className="font-semibold text-gray-900 dark:text-white">{filteredTemplates.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{mockTemplates.length}</span> templates
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
        title="Template Columns"
        description="Show or hide email template table columns"
      />

      {/* Add Template Popup */}
      <AddEmailTemplatePopup
        isOpen={showAddTemplate}
        onClose={() => setShowAddTemplate(false)}
        onSave={handleAddTemplate}
      />

      {/* Add Broker Popup */}
      {showAddBroker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Broker</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configure email provider for new broker domain</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddBroker(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Broker Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., DTrader Europe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., dtrader.eu"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Provider <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="">Select provider</option>
                      <option value="smtp">SMTP</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="mailgun">Mailgun</option>
                      <option value="aws-ses">AWS SES</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="noreply@domain.com"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowAddBroker(false)}
                    className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Broker added successfully!', 'success')
                      setShowAddBroker(false)
                    }}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Add Broker
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default EmailSettingsSystem 