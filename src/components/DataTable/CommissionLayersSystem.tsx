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
  Users,
  DollarSign,
  Activity,
  Layers,
  Target,
  Percent
} from 'lucide-react'

interface CommissionLayer {
  id: string
  level: number
  name: string
  description: string
  commissionRate: number
  maxDepth: number
  status: 'active' | 'inactive' | 'draft'
  createdAt: string
  updatedAt: string
  totalUsers: number
  totalCommission: number
  example: string
  conditions: string[]
  currency: string
}

interface AffiliateUser {
  id: string
  accountId: string
  accountName: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  joinDate: string
  lastActivity: string
  country: string
  commissionEarned: number
  referralCount: number
}

interface CommissionLayerDetailsPopupProps {
  layer: CommissionLayer
  onClose: () => void
  onEdit: (layer: CommissionLayer) => void
}

interface AddCommissionLayerPopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (layer: Omit<CommissionLayer, 'id' | 'createdAt' | 'updatedAt' | 'totalUsers' | 'totalCommission'>) => void
}



const AddCommissionLayerPopup: React.FC<AddCommissionLayerPopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    level: 1,
    name: '',
    description: '',
    commissionRate: 0,
    maxDepth: 1,
    status: 'active' as 'active' | 'inactive',
    example: '',
    conditions: [''],
    currency: 'USD'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Layer name is required'
    }

    if (formData.level < 1) {
      newErrors.level = 'Level must be at least 1'
    }

    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = 'Commission rate must be between 0 and 100'
    }

    if (formData.maxDepth < 1) {
      newErrors.maxDepth = 'Max depth must be at least 1'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
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
      level: 1,
      name: '',
      description: '',
      commissionRate: 0,
      maxDepth: 1,
      status: 'active',
      example: '',
      conditions: [''],
      currency: 'USD'
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Commission Layer</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new commission layer for your affiliate program</p>
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
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.level
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter level number"
                />
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.level}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Layer Name <span className="text-red-500">*</span>
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
                  placeholder="Enter layer name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Commission Rate (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => handleInputChange('commissionRate', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.commissionRate
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="0.0"
                />
                {errors.commissionRate && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.commissionRate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Depth <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxDepth}
                  onChange={(e) => handleInputChange('maxDepth', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.maxDepth
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter max depth"
                />
                {errors.maxDepth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxDepth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                errors.description
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
              placeholder="Enter layer description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Example */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Example
            </label>
            <textarea
              value={formData.example}
              onChange={(e) => handleInputChange('example', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter example scenario (optional)"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Layer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const CommissionLayerDetailsPopup: React.FC<CommissionLayerDetailsPopupProps> = ({
  layer,
  onClose,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState('detail')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<CommissionLayer>(() => ({ ...layer }))
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when layer prop changes
  React.useEffect(() => {
    setFormData({ ...layer })
    setErrors({})
  }, [layer])

  const handleInputChange = (field: keyof CommissionLayer, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Layer name is required'
    }

    if (formData.level < 1) {
      newErrors.level = 'Level must be at least 1'
    }

    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = 'Commission rate must be between 0 and 100'
    }

    if (formData.maxDepth < 1) {
      newErrors.maxDepth = 'Max depth must be at least 1'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      // Call the parent's onEdit function
      onEdit({
        ...formData,
        updatedAt: new Date().toISOString()
      })
      setIsEditing(false)
      setErrors({})
    }
  }

  const handleCancel = () => {
    setFormData({ ...layer })
    setIsEditing(false)
    setErrors({})
  }

  // Mock affiliate users data for this level
  const mockAffiliateUsers: AffiliateUser[] = [
    {
      id: '1',
      accountId: '12345678',
      accountName: 'JohnDoe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      status: 'active',
      joinDate: '2024-01-15',
      lastActivity: '2024-12-19',
      country: 'USA',
      commissionEarned: 125.50,
      referralCount: 5
    },
    {
      id: '2',
      accountId: '87654321',
      accountName: 'JaneSmith',
      email: 'jane@example.com',
      phone: '+1-555-0124',
      status: 'active',
      joinDate: '2024-02-20',
      lastActivity: '2024-12-18',
      country: 'Canada',
      commissionEarned: 89.25,
      referralCount: 3
    },
    {
      id: '3',
      accountId: '11223344',
      accountName: 'MikeJohnson',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      status: 'pending',
      joinDate: '2024-03-10',
      lastActivity: '2024-12-15',
      country: 'UK',
      commissionEarned: 156.75,
      referralCount: 8
    }
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'suspended': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const tabs = [
    {
      id: 'detail',
      label: 'Detail',
      icon: <Layers className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Layer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Level</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.level ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{formData.level}</span>
                    </div>
                    <span>Level {formData.level}</span>
                  </div>
                )}
                {errors.level && (
                  <p className="text-sm text-red-400">{errors.level}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Layer Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter layer name"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{formData.name}</div>
                )}
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Commission Rate</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.commissionRate}
                    onChange={(e) => handleInputChange('commissionRate', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.commissionRate ? 'border-red-500' : ''
                    }`}
                    placeholder="0.0"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-1">
                    <Percent className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{formData.commissionRate}%</span>
                  </div>
                )}
                {errors.commissionRate && (
                  <p className="text-sm text-red-400">{errors.commissionRate}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Max Depth</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={formData.maxDepth}
                    onChange={(e) => handleInputChange('maxDepth', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.maxDepth ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{formData.maxDepth} levels</div>
                )}
                {errors.maxDepth && (
                  <p className="text-sm text-red-400">{errors.maxDepth}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusClass(formData.status)}`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Total Users</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{formData.totalUsers}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-400" />
              Description
            </h3>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Enter layer description"
              />
            ) : (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300">{formData.description}</p>
              </div>
            )}
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Example */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Example
            </h3>
            {isEditing ? (
              <textarea
                value={formData.example}
                onChange={(e) => handleInputChange('example', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter example scenario"
              />
            ) : (
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300">{formData.example}</p>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-white">{formData.totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Commission</p>
                    <p className="text-2xl font-bold text-white">${formData.totalCommission.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'affiliateUsers',
      label: 'Affiliate Users',
      icon: <Users className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Affiliate Users - Level {formData.level}
          </h3>
          
          {/* Users Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-600">
              <h4 className="text-md font-medium text-white">Users in Level {formData.level}</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                      Account ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                      Account Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                      Commission Earned
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Referral Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  {mockAffiliateUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                        {user.accountId}
                      </td>
                      <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                        {user.accountName}
                      </td>
                      <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                        ${user.commissionEarned.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {user.referralCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{formData.name}</h2>
              <p className="text-sm text-gray-400">Level {formData.level} Commission Layer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Only show edit buttons when not on affiliateUsers tab */}
            {activeTab !== 'affiliateUsers' && (
              <>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
                <span className="hidden sm:inline lg:hidden">{tab.label.split(' ')[0]}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  )
}

const CommissionLayersSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddLayer, setShowAddLayer] = useState(false)
  const [showLayerDetails, setShowLayerDetails] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<CommissionLayer | null>(null)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [layerToDelete, setLayerToDelete] = useState<CommissionLayer | null>(null)
  const [columnVisibility, setColumnVisibility] = useState({
    level: true,
    name: true,
    commissionRate: true,
    maxDepth: true,
    status: true,
    users: true,
    totalCommission: true,
    actions: true
  })
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
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
  const mockLayers: CommissionLayer[] = [
    {
      id: '1',
      level: 1,
      name: 'Level 1 - Direct Referrals',
      description: 'Users directly referred by the affiliate',
      commissionRate: 10.0,
      maxDepth: 1,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-12-19',
      totalUsers: 45,
      totalCommission: 1250.00,
      example: 'User A refers User B → User B is Level 1 for User A',
      conditions: ['Direct referral only', '10% commission rate', 'No depth limit'],
      currency: 'USD'
    },
    {
      id: '2',
      level: 2,
      name: 'Level 2 - Indirect Referrals',
      description: 'Users referred by Level 1 users',
      commissionRate: 5.0,
      maxDepth: 2,
      status: 'active',
      createdAt: '2024-02-20',
      updatedAt: '2024-12-18',
      totalUsers: 28,
      totalCommission: 3200.00,
      example: 'User B refers User C → User C is Level 2 for User A',
      conditions: ['Indirect referral', '5% commission rate', '2 levels deep'],
      currency: 'USD'
    },
    {
      id: '3',
      level: 3,
      name: 'Level 3 - Deep Referrals',
      description: 'Users referred by Level 2 users',
      commissionRate: 2.5,
      maxDepth: 3,
      status: 'active',
      createdAt: '2024-03-10',
      updatedAt: '2024-12-15',
      totalUsers: 15,
      totalCommission: 8500.00,
      example: 'User C refers User D → User D is Level 3 for User A',
      conditions: ['Deep referral', '2.5% commission rate', '3 levels deep'],
      currency: 'USD'
    },
    {
      id: '4',
      level: 4,
      name: 'Level 4 - Extended Network',
      description: 'Users referred by Level 3 users',
      commissionRate: 1.0,
      maxDepth: 4,
      status: 'active',
      createdAt: '2024-04-05',
      updatedAt: '2024-12-10',
      totalUsers: 8,
      totalCommission: 15000.00,
      example: 'User D refers User E → User E is Level 4 for User A',
      conditions: ['Extended network', '1% commission rate', '4 levels deep'],
      currency: 'USD'
    },
    {
      id: '5',
      level: 5,
      name: 'Level 5 - Network Edge',
      description: 'Users referred by Level 4 users',
      commissionRate: 0.5,
      maxDepth: 5,
      status: 'inactive',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'User E refers User F → User F is Level 5 for User A',
      conditions: ['Network edge', '0.5% commission rate', '5 levels deep'],
      currency: 'USD'
    },
    {
      id: '6',
      level: 6,
      name: 'Level 6 - Premium Network',
      description: 'Premium users in extended network',
      commissionRate: 0.25,
      maxDepth: 6,
      status: 'active',
      createdAt: '2024-05-10',
      updatedAt: '2024-12-12',
      totalUsers: 12,
      totalCommission: 28000.00,
      example: 'Premium user referrals with enhanced benefits',
      conditions: ['Premium network', '0.25% commission rate', '6 levels deep'],
      currency: 'USD'
    },
    {
      id: '7',
      level: 7,
      name: 'Level 7 - Elite Network',
      description: 'Elite tier commission structure',
      commissionRate: 0.1,
      maxDepth: 7,
      status: 'active',
      createdAt: '2024-06-15',
      updatedAt: '2024-12-14',
      totalUsers: 6,
      totalCommission: 45000.00,
      example: 'Elite user referrals with maximum benefits',
      conditions: ['Elite network', '0.1% commission rate', '7 levels deep'],
      currency: 'USD'
    },
    {
      id: '8',
      level: 8,
      name: 'Level 8 - VIP Network',
      description: 'VIP tier commission structure',
      commissionRate: 0.05,
      maxDepth: 8,
      status: 'draft',
      createdAt: '2024-07-20',
      updatedAt: '2024-12-16',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'VIP user referrals with exclusive benefits',
      conditions: ['VIP network', '0.05% commission rate', '8 levels deep'],
      currency: 'USD'
    },
    {
      id: '9',
      level: 9,
      name: 'Level 9 - Diamond Network',
      description: 'Diamond tier commission structure',
      commissionRate: 0.025,
      maxDepth: 9,
      status: 'draft',
      createdAt: '2024-08-25',
      updatedAt: '2024-12-17',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Diamond user referrals with premium benefits',
      conditions: ['Diamond network', '0.025% commission rate', '9 levels deep'],
      currency: 'USD'
    },
    {
      id: '10',
      level: 10,
      name: 'Level 10 - Platinum Network',
      description: 'Platinum tier commission structure',
      commissionRate: 0.01,
      maxDepth: 10,
      status: 'draft',
      createdAt: '2024-09-30',
      updatedAt: '2024-12-18',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Platinum user referrals with ultimate benefits',
      conditions: ['Platinum network', '0.01% commission rate', '10 levels deep'],
      currency: 'USD'
    },
    {
      id: '11',
      level: 11,
      name: 'Level 11 - Gold Network',
      description: 'Gold tier commission structure',
      commissionRate: 0.005,
      maxDepth: 11,
      status: 'inactive',
      createdAt: '2024-10-05',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Gold user referrals with special benefits',
      conditions: ['Gold network', '0.005% commission rate', '11 levels deep'],
      currency: 'USD'
    },
    {
      id: '12',
      level: 12,
      name: 'Level 12 - Silver Network',
      description: 'Silver tier commission structure',
      commissionRate: 0.0025,
      maxDepth: 12,
      status: 'inactive',
      createdAt: '2024-10-10',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Silver user referrals with basic benefits',
      conditions: ['Silver network', '0.0025% commission rate', '12 levels deep'],
      currency: 'USD'
    },
    {
      id: '13',
      level: 13,
      name: 'Level 13 - Bronze Network',
      description: 'Bronze tier commission structure',
      commissionRate: 0.001,
      maxDepth: 13,
      status: 'inactive',
      createdAt: '2024-10-15',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Bronze user referrals with entry benefits',
      conditions: ['Bronze network', '0.001% commission rate', '13 levels deep'],
      currency: 'USD'
    },
    {
      id: '14',
      level: 14,
      name: 'Level 14 - Copper Network',
      description: 'Copper tier commission structure',
      commissionRate: 0.0005,
      maxDepth: 14,
      status: 'inactive',
      createdAt: '2024-10-20',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Copper user referrals with minimal benefits',
      conditions: ['Copper network', '0.0005% commission rate', '14 levels deep'],
      currency: 'USD'
    },
    {
      id: '15',
      level: 15,
      name: 'Level 15 - Iron Network',
      description: 'Iron tier commission structure',
      commissionRate: 0.0001,
      maxDepth: 15,
      status: 'inactive',
      createdAt: '2024-10-25',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Iron user referrals with basic entry benefits',
      conditions: ['Iron network', '0.0001% commission rate', '15 levels deep'],
      currency: 'USD'
    },
    {
      id: '16',
      level: 16,
      name: 'Level 16 - Carbon Network',
      description: 'Carbon tier commission structure',
      commissionRate: 0.00005,
      maxDepth: 16,
      status: 'inactive',
      createdAt: '2024-10-30',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Carbon user referrals with minimal benefits',
      conditions: ['Carbon network', '0.00005% commission rate', '16 levels deep'],
      currency: 'USD'
    },
    {
      id: '17',
      level: 17,
      name: 'Level 17 - Graphite Network',
      description: 'Graphite tier commission structure',
      commissionRate: 0.000025,
      maxDepth: 17,
      status: 'inactive',
      createdAt: '2024-11-05',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Graphite user referrals with basic benefits',
      conditions: ['Graphite network', '0.000025% commission rate', '17 levels deep'],
      currency: 'USD'
    },
    {
      id: '18',
      level: 18,
      name: 'Level 18 - Diamond Dust Network',
      description: 'Diamond dust tier commission structure',
      commissionRate: 0.00001,
      maxDepth: 18,
      status: 'inactive',
      createdAt: '2024-11-10',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Diamond dust user referrals with minimal benefits',
      conditions: ['Diamond dust network', '0.00001% commission rate', '18 levels deep'],
      currency: 'USD'
    },
    {
      id: '19',
      level: 19,
      name: 'Level 19 - Quantum Network',
      description: 'Quantum tier commission structure',
      commissionRate: 0.000005,
      maxDepth: 19,
      status: 'inactive',
      createdAt: '2024-11-15',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Quantum user referrals with advanced benefits',
      conditions: ['Quantum network', '0.000005% commission rate', '19 levels deep'],
      currency: 'USD'
    },
    {
      id: '20',
      level: 20,
      name: 'Level 20 - Infinity Network',
      description: 'Infinity tier commission structure',
      commissionRate: 0.000001,
      maxDepth: 20,
      status: 'inactive',
      createdAt: '2024-11-20',
      updatedAt: '2024-12-19',
      totalUsers: 0,
      totalCommission: 0.00,
      example: 'Infinity user referrals with ultimate benefits',
      conditions: ['Infinity network', '0.000001% commission rate', '20 levels deep'],
      currency: 'USD'
    }
  ]

  // Filtered layers based on search and filters
  const filteredLayers = useMemo(() => {
    return mockLayers.filter(layer => {
      const matchesSearch = layer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           layer.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || layer.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [mockLayers, searchTerm, statusFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredLayers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLayers = filteredLayers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Calculate stats
  const stats = useMemo(() => {
    const totalLayers = mockLayers.length
    const activeLayers = mockLayers.filter(layer => layer.status === 'active').length
    const totalUsers = mockLayers.reduce((sum, layer) => sum + layer.totalUsers, 0)
    const totalCommission = mockLayers.reduce((sum, layer) => sum + layer.totalCommission, 0)
    
    return {
      totalLayers,
      activeLayers,
      totalUsers,
      totalCommission
    }
  }, [mockLayers])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }



  const handleViewLayer = (layer: CommissionLayer) => {
    setSelectedLayer(layer)
    setShowLayerDetails(true)
  }

  const handleEditLayer = (layer: CommissionLayer) => {
    // This function is now called from the inline edit popup
    // TODO: Implement API call to save the updated layer
    console.log('Saving updated layer:', layer)
    // Show beautiful notification instead of alert
    setNotification({
      show: true,
      message: 'Commission layer updated successfully!',
      type: 'success'
    })
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      show: true,
      message,
      type
    })
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleAddLayer = (layerData: Omit<CommissionLayer, 'id' | 'createdAt' | 'updatedAt' | 'totalUsers' | 'totalCommission'>) => {
    // TODO: Implement API call to create new layer
    console.log('Creating new layer:', layerData)
    
    // For now, we'll just show a success message
    showNotification('Commission layer created successfully!', 'success')
    setShowAddLayer(false)
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

  const handleDeleteLayer = (layer: CommissionLayer) => {
    setLayerToDelete(layer)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // Handle delete logic here
    showNotification('Commission layer deleted successfully!', 'success')
    setShowDeleteConfirm(false)
    setLayerToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setLayerToDelete(null)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Layers</p>
              <p className="text-2xl font-bold text-white">{stats.totalLayers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Active Layers</p>
              <p className="text-2xl font-bold text-white">{stats.activeLayers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Download className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Commission</p>
              <p className="text-2xl font-bold text-white">${stats.totalCommission.toLocaleString()}</p>
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
              title="Export Commission Layers - Download commission layer data as CSV/Excel"
              onClick={() => console.log('Export Commission Layers clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Commission Layers
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Commission Layers - Upload commission layer data from CSV/Excel files"
              onClick={() => console.log('Import Commission Layers clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Commission Layers
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Add New Commission Layer - Create a new commission layer"
              onClick={() => setShowAddLayer(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Add New Commission Layer
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Commission Settings - Manage commission rates and tiers"
              onClick={() => console.log('Commission Settings clicked')}
            >
              <Settings className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Commission Settings
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Commission Analytics - View performance metrics and reports"
              onClick={() => console.log('Commission Analytics clicked')}
            >
              <TrendingUp className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Commission Analytics
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
                placeholder="Search commission layers..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => setStatusFilter('all')}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Total Commission Layers:</span>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {filteredLayers.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Active:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {mockLayers.filter(item => item.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Inactive:</span>
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                {mockLayers.filter(item => item.status === 'inactive').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Draft:</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {mockLayers.filter(item => item.status === 'draft').length}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Commission Layers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
                         <thead className="bg-gray-50 dark:bg-gray-700">
               <tr>
                 {columnVisibility.level && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Level</th>
                 )}
                 {columnVisibility.name && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>Layer Name</th>
                 )}
                 {columnVisibility.commissionRate && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Commission Rate</th>
                 )}
                 {columnVisibility.maxDepth && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Max Depth</th>
                 )}
                 {columnVisibility.status && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                 )}
                 {columnVisibility.users && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Users</th>
                 )}
                 {columnVisibility.totalCommission && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Total Commission</th>
                 )}
                 {columnVisibility.actions && (
                   <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                 )}
               </tr>
             </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentLayers.map((layer, index) => (
                                 <tr
                   key={layer.id}
                   onClick={() => handleViewLayer(layer)}
                   className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                     index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                   }`}
                 >
                   {columnVisibility.level && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                           <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{layer.level}</span>
                         </div>
                         <span className="font-medium text-gray-900 dark:text-white">Level {layer.level}</span>
                       </div>
                     </td>
                   )}
                   
                   {columnVisibility.name && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>
                       <div>
                         <div className="font-medium text-gray-900 dark:text-white">{layer.name}</div>
                         <div className="text-gray-500 dark:text-gray-400 text-xs">{layer.description}</div>
                       </div>
                     </td>
                   )}
                   
                   {columnVisibility.commissionRate && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                       <div className="flex items-center gap-1">
                         <Percent className="w-3 h-3 text-blue-500" />
                         <span className="font-medium">{layer.commissionRate}%</span>
                       </div>
                     </td>
                   )}
                   
                   {columnVisibility.maxDepth && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                       <div className="text-gray-900 dark:text-white">
                         {layer.maxDepth} levels
                       </div>
                     </td>
                   )}
                   
                   {columnVisibility.status && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(layer.status)}`}>
                         {layer.status.charAt(0).toUpperCase() + layer.status.slice(1)}
                       </span>
                     </td>
                   )}
                   
                   {columnVisibility.users && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                       <div className="text-gray-900 dark:text-white">{layer.totalUsers}</div>
                     </td>
                   )}
                   
                   {columnVisibility.totalCommission && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                       <div className="text-gray-900 dark:text-white">${layer.totalCommission.toLocaleString()}</div>
                     </td>
                   )}
                  
                   {columnVisibility.actions && (
                     <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                       <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                         <button
                           onClick={() => handleViewLayer(layer)}
                           className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                           title="View Details"
                         >
                           <Eye className="h-3 w-3" />
                         </button>
                         <button
                           onClick={() => handleEditLayer(layer)}
                           className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded transition-colors"
                           title="Edit Layer"
                         >
                           <Edit className="h-3 w-3" />
                         </button>
                         <button
                           onClick={() => handleDeleteLayer(layer)}
                           className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                           title="Delete Layer"
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
          {/* Pagination Controls */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[5, 10, 20, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {startIndex + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.min(endIndex, filteredLayers.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {filteredLayers.length}
                  </span>{' '}
                  results
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageIndex = i + 1
                    const isCurrentPage = pageIndex === currentPage
                    
                    // Show first page, last page, current page, and pages around current page
                    if (
                      pageIndex === 1 ||
                      pageIndex === totalPages ||
                      (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageIndex}
                          onClick={() => handlePageChange(pageIndex)}
                          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            isCurrentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {pageIndex}
                        </button>
                      )
                    } else if (
                      pageIndex === currentPage - 2 ||
                      pageIndex === currentPage + 2
                    ) {
                      return <span key={pageIndex} className="px-2 text-gray-500 dark:text-gray-400">...</span>
                    }
                    return null
                  })}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Commission Layer Details Popup */}
       {showLayerDetails && selectedLayer && (
         <CommissionLayerDetailsPopup
           layer={selectedLayer}
           onClose={() => {
             setShowLayerDetails(false)
             setSelectedLayer(null)
           }}
           onEdit={handleEditLayer}
         />
       )}

       {/* Add Commission Layer Popup */}
       <AddCommissionLayerPopup
         isOpen={showAddLayer}
         onClose={() => setShowAddLayer(false)}
         onSave={handleAddLayer}
       />

       {/* Column Visibility Popup */}
       {showColumnVisibility && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
             {/* Header */}
             <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                   <Eye className="w-4 h-4 text-white" />
                 </div>
                 <div>
                   <h2 className="text-lg font-bold text-gray-900 dark:text-white">Column Visibility</h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Show or hide table columns</p>
                 </div>
               </div>
               <button
                 onClick={() => setShowColumnVisibility(false)}
                 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>

             {/* Column Options */}
             <div className="p-4 space-y-3">
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.level}
                   onChange={(e) => handleColumnVisibilityChange('level', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Layer Name</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.name}
                   onChange={(e) => handleColumnVisibilityChange('name', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.commissionRate}
                   onChange={(e) => handleColumnVisibilityChange('commissionRate', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Depth</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.maxDepth}
                   onChange={(e) => handleColumnVisibilityChange('maxDepth', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.status}
                   onChange={(e) => handleColumnVisibilityChange('status', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Users</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.users}
                   onChange={(e) => handleColumnVisibilityChange('users', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Commission</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.totalCommission}
                   onChange={(e) => handleColumnVisibilityChange('totalCommission', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
               
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</label>
                 <input
                   type="checkbox"
                   checked={columnVisibility.actions}
                   onChange={(e) => handleColumnVisibilityChange('actions', e.target.checked)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
               </div>
             </div>

             {/* Footer */}
             <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
               <button
                 onClick={() => setShowColumnVisibility(false)}
                 className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       )}

            {/* Delete Confirmation Popup */}
      {showDeleteConfirm && layerToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Commission Layer</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Layer Name:</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{layerToDelete.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{layerToDelete.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(layerToDelete.status)}`}>
                      {layerToDelete.status.charAt(0).toUpperCase() + layerToDelete.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Warning</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Are you sure you want to delete "{layerToDelete.name}"? This action will permanently remove the commission layer and all associated data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={cancelDelete}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Layer
              </button>
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
              ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
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

export default CommissionLayersSystem 