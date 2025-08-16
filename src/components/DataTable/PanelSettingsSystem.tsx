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
  Moon as MoonIcon
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'

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

interface PanelSettingDetailsPopupProps {
  setting: PanelSetting
  onClose: () => void
  onEdit: (setting: PanelSetting) => void
}

interface AddPanelSettingPopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (setting: Omit<PanelSetting, 'id' | 'createdAt' | 'updatedAt' | 'lastModified' | 'usageCount' | 'rating' | 'reviews'>) => void
}

const AddPanelSettingPopup: React.FC<AddPanelSettingPopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'layout' as PanelSetting['type'],
    status: 'draft' as PanelSetting['status'],
    category: 'custom' as PanelSetting['category'],
    priority: 'medium' as PanelSetting['priority'],
    target: 'all' as PanelSetting['target'],
    theme: 'auto' as PanelSetting['theme'],
    layout: 'grid' as PanelSetting['layout'],
    position: 'center' as PanelSetting['position'],
    size: 'medium' as PanelSetting['size'],
    visibility: 'public' as PanelSetting['visibility'],
    permissions: [] as string[],
    dependencies: [] as string[],
    config: {} as Record<string, any>,
    version: '1.0.0',
    author: '',
    description: '',
    tags: [] as string[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'basic' | 'appearance' | 'advanced'>('basic')

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleArrayInputChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Setting name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      type: 'layout',
      status: 'draft',
      category: 'custom',
      priority: 'medium',
      target: 'all',
      theme: 'auto',
      layout: 'grid',
      position: 'center',
      size: 'medium',
      visibility: 'public',
      permissions: [],
      dependencies: [],
      config: {},
      version: '1.0.0',
      author: '',
      description: '',
      tags: []
    })
    setErrors({})
    setActiveTab('basic')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Panel Setting</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new panel configuration or customization</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'basic'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Basic Settings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appearance')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'appearance'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Appearance
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('advanced')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'advanced'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Advanced
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-500" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Setting Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 ${
                      errors.name
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter setting name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Setting Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as PanelSetting['type'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as PanelSetting['status'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="testing">Testing</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value as PanelSetting['category'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="custom">Custom</option>
                    <option value="system">System</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="default">Default</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value as PanelSetting['priority'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Platform
                  </label>
                  <select
                    value={formData.target}
                    onChange={(e) => handleInputChange('target', e.target.value as PanelSetting['target'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Platforms</option>
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="1.0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 ${
                      errors.author
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.author}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 ${
                    errors.description
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Describe the panel setting..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayInputChange('tags', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., layout, theme, customization"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" />
                Appearance Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <select
                    value={formData.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value as PanelSetting['theme'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="auto">Auto (System)</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Layout
                  </label>
                  <select
                    value={formData.layout}
                    onChange={(e) => handleInputChange('layout', e.target.value as PanelSetting['layout'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="compact">Compact</option>
                    <option value="expanded">Expanded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value as PanelSetting['position'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="floating">Floating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value as PanelSetting['size'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="auto">Auto</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="full">Full</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Advanced Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Visibility
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => handleInputChange('visibility', e.target.value as PanelSetting['visibility'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="admin">Admin Only</option>
                    <option value="role-based">Role Based</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Permissions (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.permissions.join(', ')}
                    onChange={(e) => handleArrayInputChange('permissions', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., read, write, delete"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dependencies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.dependencies.join(', ')}
                    onChange={(e) => handleArrayInputChange('dependencies', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., theme-system, layout-engine"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'basic' ? 'basic' : activeTab === 'appearance' ? 'basic' : 'appearance')}
                disabled={activeTab === 'basic'}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'basic' ? 'appearance' : 'advanced')}
                disabled={activeTab === 'advanced'}
                className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              {activeTab === 'advanced' && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Create Setting
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPanelSettingPopup 