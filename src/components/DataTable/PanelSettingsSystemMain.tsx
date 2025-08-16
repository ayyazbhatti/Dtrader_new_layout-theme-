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
  PowerOff as PowerOffIcon,
  Layout,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Grid,
  List,
  Sidebar as SidebarIcon,
  Menu,
  Sun,
  Moon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Grid as GridIcon,
  List as ListIcon,
  Sidebar as SidebarIcon2,
  Menu as MenuIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  MessageSquare
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'
import AddPanelSettingPopup from './PanelSettingsSystem'

interface PanelSetting {
  id: string
  name: string
  type: 'layout' | 'theme' | 'navigation' | 'widget' | 'dashboard' | 'sidebar' | 'header' | 'footer' | 'custom'
  status: 'active' | 'inactive' | 'draft' | 'testing' | 'archived'
  category: 'system' | 'user' | 'admin' | 'custom' | 'default'
  priority: 'low' | 'medium' | 'high' | 'critical'
  target: 'desktop' | 'mobile' | 'tablet' | 'all'
  theme: 'light' | 'dark' | 'auto' | 'custom'
  layout: 'grid' | 'list' | 'sidebar' | 'compact' | 'expanded'
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating'
  size: 'small' | 'medium' | 'large' | 'full' | 'auto'
  visibility: 'public' | 'private' | 'admin' | 'role-based'
  permissions: string[]
  dependencies: string[]
  config: Record<string, any>
  createdAt: string
  updatedAt: string
  lastModified: string
  version: string
  author: string
  description: string
  tags: string[]
  usageCount: number
  rating: number
  reviews: number
}

const PanelSettingsSystem: React.FC = () => {
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
    theme: true,
    layout: true,
    author: true,
    version: true,
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
  const mockSettings: PanelSetting[] = [
    {
      id: '1',
      name: 'Dark Theme Layout',
      type: 'theme',
      status: 'active',
      category: 'system',
      priority: 'high',
      target: 'all',
      theme: 'dark',
      layout: 'compact',
      position: 'center',
      size: 'full',
      visibility: 'public',
      permissions: ['read', 'write'],
      dependencies: ['theme-engine'],
      config: { colorScheme: 'dark', contrast: 'high' },
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 15:45:00',
      lastModified: '2024-12-19 16:20:00',
      version: '2.1.0',
      author: 'admin@dtrader.com',
      description: 'Dark theme configuration for the main panel',
      tags: ['theme', 'dark', 'layout'],
      usageCount: 1250,
      rating: 4.8,
      reviews: 45
    },
    {
      id: '2',
      name: 'Mobile Responsive Grid',
      type: 'layout',
      status: 'active',
      category: 'user',
      priority: 'medium',
      target: 'mobile',
      theme: 'auto',
      layout: 'grid',
      position: 'center',
      size: 'auto',
      visibility: 'public',
      permissions: ['read'],
      dependencies: ['responsive-framework'],
      config: { columns: 2, spacing: 'compact' },
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 14:20:00',
      lastModified: '2024-12-19 17:30:00',
      version: '1.5.2',
      author: 'ui@dtrader.com',
      description: 'Mobile-optimized grid layout for responsive design',
      tags: ['layout', 'mobile', 'responsive'],
      usageCount: 890,
      rating: 4.6,
      reviews: 32
    },
    {
      id: '3',
      name: 'Admin Dashboard Widget',
      type: 'widget',
      status: 'active',
      category: 'admin',
      priority: 'critical',
      target: 'desktop',
      theme: 'light',
      layout: 'sidebar',
      position: 'right',
      size: 'medium',
      visibility: 'admin',
      permissions: ['read', 'write', 'delete'],
      dependencies: ['admin-panel', 'widget-system'],
      config: { refreshRate: 30, dataSource: 'analytics' },
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 13:30:00',
      lastModified: '2024-12-19 18:15:00',
      version: '3.0.1',
      author: 'admin@dtrader.com',
      description: 'Administrative dashboard widget for system monitoring',
      tags: ['widget', 'admin', 'dashboard'],
      usageCount: 156,
      rating: 4.9,
      reviews: 28
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
    const totalUsage = mockSettings.reduce((sum, s) => sum + s.usageCount, 0)
    const avgRating = mockSettings.reduce((sum, s) => sum + s.rating, 0) / mockSettings.length
    const totalReviews = mockSettings.reduce((sum, s) => sum + s.reviews, 0)
    const criticalSettings = mockSettings.filter(s => s.priority === 'critical').length
    
    return {
      totalSettings,
      activeSettings,
      totalUsage,
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews,
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
      case 'layout': return <Layout className="w-4 h-4 text-blue-500" />
      case 'theme': return <Palette className="w-4 h-4 text-purple-500" />
      case 'navigation': return <Menu className="w-4 h-4 text-green-500" />
      case 'widget': return <Grid className="w-4 h-4 text-yellow-500" />
      case 'dashboard': return <BarChart3 className="w-4 h-4 text-indigo-500" />
      case 'sidebar': return <SidebarIcon className="w-4 h-4 text-orange-500" />
      case 'header': return <Settings className="w-4 h-4 text-red-500" />
      case 'footer': return <Settings className="w-4 h-4 text-gray-500" />
      case 'custom': return <Settings className="w-4 h-4 text-gray-500" />
      default: return <Settings className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'desktop': return <Monitor className="w-4 h-4 text-blue-500" />
      case 'mobile': return <Smartphone className="w-4 h-4 text-green-500" />
      case 'tablet': return <Tablet className="w-4 h-4 text-purple-500" />
      case 'all': return <Globe className="w-4 h-4 text-gray-500" />
      default: return <Globe className="w-4 h-4 text-gray-500" />
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

  const handleAddSetting = (settingData: Omit<PanelSetting, 'id' | 'createdAt' | 'updatedAt' | 'lastModified' | 'usageCount' | 'rating' | 'reviews'>) => {
    console.log('Creating new panel setting:', settingData)
    showNotification('Panel setting created successfully!', 'success')
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
            <div className="p-2 bg-purple-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
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
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsage.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-white">{stats.avgRating}/5.0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Reviews</p>
              <p className="text-2xl font-bold text-white">{stats.totalReviews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
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
              title="Export Settings - Download panel settings as CSV/Excel"
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
              title="Import Settings - Upload panel settings from CSV/Excel files"
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
              title="Add New Setting - Create a new panel configuration"
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
              title="Panel Analytics - View usage metrics and performance"
              onClick={() => console.log('Panel Analytics clicked')}
            >
              <BarChart3 className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Panel Analytics
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
                  <option value="layout">Layout</option>
                  <option value="theme">Theme</option>
                  <option value="navigation">Navigation</option>
                  <option value="widget">Widget</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
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
                  <option value="custom">Custom</option>
                  <option value="default">Default</option>
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
                {columnVisibility.theme && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Theme</th>
                )}
                {columnVisibility.layout && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Layout</th>
                )}
                {columnVisibility.author && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Author</th>
                )}
                {columnVisibility.version && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>Version</th>
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
                      <div className="flex items-center gap-2">
                        {getTargetIcon(setting.target)}
                        <span className="capitalize text-gray-900 dark:text-white">{setting.target}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.theme && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{setting.theme}</div>
                    </td>
                  )}
                  
                  {columnVisibility.layout && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{setting.layout}</div>
                    </td>
                  )}
                  
                  {columnVisibility.author && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.author}</div>
                    </td>
                  )}
                  
                  {columnVisibility.version && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '80px', minWidth: '80px' }}>
                      <div className="text-gray-900 dark:text-white">{setting.version}</div>
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
        title="Panel Setting Columns"
        description="Show or hide panel setting table columns"
      />

      {/* Add Setting Popup */}
      <AddPanelSettingPopup
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

export default PanelSettingsSystem 