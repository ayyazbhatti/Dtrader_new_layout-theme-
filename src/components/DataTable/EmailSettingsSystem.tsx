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

interface EmailTemplateDetailsPopupProps {
  template: EmailTemplate
  onClose: () => void
  onEdit: (template: EmailTemplate) => void
}

interface AddEmailTemplatePopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt' | 'lastUsed' | 'usageCount' | 'bounces' | 'complaints'>) => void
}

const AddEmailTemplatePopup: React.FC<AddEmailTemplatePopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    brokerId: '',
    name: '',
    subject: '',
    type: 'notification' as EmailTemplate['type'],
    status: 'draft' as EmailTemplate['status'],
    category: 'system' as EmailTemplate['category'],
    language: 'en',
    variables: [] as string[],
    content: '',
    htmlContent: '',
    plainTextContent: '',
    createdBy: '',
    tags: [] as string[],
    priority: 'medium' as EmailTemplate['priority'],
    deliveryTime: 'immediate',
    retryAttempts: 3,
    successRate: 0
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'details' | 'content' | 'preview'>('details')

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

    if (!formData.brokerId) {
      newErrors.brokerId = 'Please select a broker'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Template name is required'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Email subject is required'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Email content is required'
    }

    if (!formData.htmlContent.trim()) {
      newErrors.htmlContent = 'HTML content is required'
    }

    if (!formData.plainTextContent.trim()) {
      newErrors.plainTextContent = 'Plain text content is required'
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
      brokerId: '',
      name: '',
      subject: '',
      type: 'notification',
      status: 'draft',
      category: 'system',
      language: 'en',
      variables: [],
      content: '',
      htmlContent: '',
      plainTextContent: '',
      createdBy: '',
      tags: [],
      priority: 'medium',
      deliveryTime: 'immediate',
      retryAttempts: 3,
      successRate: 0
    })
    setErrors({})
    setActiveTab('details')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Email Template</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new email template for automated communications</p>
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
                onClick={() => setActiveTab('details')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Template Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'content'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Email Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Preview
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Template Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Broker <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.brokerId}
                    onChange={(e) => handleInputChange('brokerId', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.brokerId
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <option value="">Select a broker</option>
                    <option value="1">DTrader Main (dtrader.com)</option>
                    <option value="2">DTrader Europe (dtrader.eu)</option>
                    <option value="3">DTrader Asia (dtrader.asia)</option>
                  </select>
                  {errors.brokerId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.brokerId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.name
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter template name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      errors.subject
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter email subject"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as EmailTemplate['type'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="welcome">Welcome Email</option>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as EmailTemplate['status'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="draft">Draft</option>
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
                    onChange={(e) => handleInputChange('category', e.target.value as EmailTemplate['category'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="system">System</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="marketing">Marketing</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value as EmailTemplate['priority'])}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={formData.deliveryTime}
                    onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="batch">Batch</option>
                    <option value="off-peak">Off-Peak Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Retry Attempts
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.retryAttempts}
                    onChange={(e) => handleInputChange('retryAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Variables (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.variables.join(', ')}
                    onChange={(e) => handleArrayInputChange('variables', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., username, email, company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleArrayInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., welcome, onboarding, user"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                Email Content
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    HTML Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.htmlContent}
                    onChange={(e) => handleInputChange('htmlContent', e.target.value)}
                    rows={8}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-mono text-sm ${
                      errors.htmlContent
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter HTML content for the email..."
                  />
                  {errors.htmlContent && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.htmlContent}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Plain Text Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.plainTextContent}
                    onChange={(e) => handleInputChange('plainTextContent', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-mono text-sm ${
                      errors.plainTextContent
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter plain text content for the email..."
                  />
                  {errors.plainTextContent && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.plainTextContent}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Preview
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of the email content..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                Template Preview
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Preview</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Subject:</strong> {formData.subject || 'No subject'}</p>
                    <p><strong>Type:</strong> {formData.type} | <strong>Category:</strong> {formData.category}</p>
                    <p><strong>Language:</strong> {formData.language} | <strong>Priority:</strong> {formData.priority}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">HTML Content</h5>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded p-3 max-h-40 overflow-y-auto">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {formData.htmlContent || 'No HTML content'}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Plain Text Content</h5>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded p-3 max-h-40 overflow-y-auto">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {formData.plainTextContent || 'No plain text content'}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'details' ? 'details' : activeTab === 'content' ? 'details' : 'content')}
                disabled={activeTab === 'details'}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'details' ? 'content' : 'preview')}
                disabled={activeTab === 'preview'}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50"
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
              {activeTab === 'preview' && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Create Template
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmailTemplatePopup 