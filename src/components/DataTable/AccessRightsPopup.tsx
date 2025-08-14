import React, { useState, useMemo, useEffect } from 'react'
import { X, Save, Shield, Users, Lock, Key, Settings, AlertTriangle, Eye, Bot, Tag, Search } from 'lucide-react'

interface AccessRightsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AccessRightFormData) => void
  initialData?: AccessRightFormData
}

interface AccessRightFormData {
  name: string
  description: string
  userType: string
  permissions: Record<string, string[]>
  isActive: boolean
  priority: number
  expiresAt?: string
  notes?: string
}

const AccessRightsPopup: React.FC<AccessRightsPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<AccessRightFormData>(() => {
    if (initialData) {
      return initialData
    }
    return {
      name: '',
      description: '',
      userType: '',
      permissions: {},
      isActive: true,
      priority: 1,
      expiresAt: '',
      notes: ''
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState('')

  const userTypes = [
    'Admin',
    'Manager',
    'User',
    'Trader',
    'Analyst',
    'Support',
    'Guest',
    'Custom'
  ]

  const permissionCategories = [
    {
      name: 'Tags',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'Access Rights',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'Groups',
      actions: ['Create', 'Edit', 'Delete', 'Symbol Setting', 'Transfer Setting']
    },
    {
      name: 'Group Profile',
      actions: []
    },
    {
      name: 'Leverage Profile',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'Accounts and Users',
      actions: ['Change Password', 'View User', 'Create', 'Edit Settings and Details', 'Delete']
    },
    {
      name: 'Managers',
      actions: ['Create', 'Edit', 'Change Password', 'Change Own Password']
    },
    {
      name: 'Calls',
      actions: ['Create', 'Edit', 'Delete', 'View Call', 'View All Calls']
    },
    {
      name: 'Symbols',
      actions: []
    },
    {
      name: 'Swap and Dividends',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'Price Streams',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'Assets',
      actions: ['Create', 'Edit', 'Delete', 'View Asset']
    },
    {
      name: 'Deposits',
      actions: ['View Deposit Request', 'Create', 'Edit', 'Delete', 'View Deposit History', 'Crypto', 'Fiat', 'Deposit Manually']
    },
    {
      name: 'Withdraw',
      actions: ['View Withdraw Request', 'Create', 'Edit', 'Delete', 'Withdraw Commission Request', 'Forcefully Withdraw', 'View Withdraw History']
    },
    {
      name: 'Transactions Listings',
      actions: ['Edit', 'View', 'Credit']
    },
    {
      name: 'Bonus',
      actions: ['Add/Remove']
    },
    {
      name: 'Positions',
      actions: []
    },
    {
      name: 'Open Positions',
      actions: ['View', 'Create', 'Edit', 'Close']
    },
    {
      name: 'Close Positions',
      actions: ['Forcefully Open', 'View']
    },
    {
      name: 'Orders',
      actions: []
    },
    {
      name: 'Done Order',
      actions: []
    },
    {
      name: 'Pending Order',
      actions: ['Create', 'Edit', 'Close']
    },
    {
      name: 'Affiliate',
      actions: ['Affiliated Users', 'Affiliate Links']
    },
    {
      name: 'Commission Layers',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'All Commissions',
      actions: []
    },
    {
      name: 'Withdrawal Rules',
      actions: ['Create', 'Edit', 'Delete']
    },
    {
      name: 'History Per Deal',
      actions: []
    },
    {
      name: 'Dashboard Stats',
      actions: []
    },
    {
      name: 'Bank Details',
      actions: ['New', 'Edit', 'View']
    },
    {
      name: 'Leads',
      actions: ['New', 'Edit', 'Upload']
    },
    {
      name: 'Bot Settings',
      actions: ['New', 'Edit', 'Delete', 'Users']
    },
    {
      name: 'Agents',
      actions: ['New', 'Delete', 'Edit']
    },
    {
      name: 'Feedback',
      actions: ['Edit']
    },
    {
      name: 'Send Price Drop Alert',
      actions: []
    },
    {
      name: 'User KYC View',
      actions: []
    }
  ]

  const priorities = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
    { value: 4, label: 'Critical' }
  ]

  // Filter permissions based on search term
  const filteredPermissionCategories = useMemo(() => {
    if (!searchTerm.trim()) return permissionCategories
    
    const searchLower = searchTerm.toLowerCase()
    return permissionCategories.filter(category => {
      // Check if category name matches
      if (category.name.toLowerCase().includes(searchLower)) return true
      
      // Check if any action matches
      return category.actions.some(action => 
        action.toLowerCase().includes(searchLower)
      )
    })
  }, [searchTerm, permissionCategories])

  // Update form data when initialData changes (for editing mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setSearchTerm('')
    }
  }, [initialData])

  const handleInputChange = (field: keyof AccessRightFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handlePermissionToggle = (category: string, action: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: prev.permissions[category]?.includes(action)
          ? prev.permissions[category].filter(p => p !== action)
          : [...(prev.permissions[category] || []), action]
      }
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: prev.permissions[category]?.length === permissionCategories.find(c => c.name === category)?.actions.length
          ? []
          : permissionCategories.find(c => c.name === category)?.actions || []
      }
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Access right name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.userType) {
      newErrors.userType = 'User type is required'
    }
    
    const totalPermissions = Object.values(formData.permissions).flat().length
    if (totalPermissions === 0) {
      newErrors.permissions = 'At least one permission is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      userType: '',
      permissions: {},
      isActive: true,
      priority: 1,
      expiresAt: '',
      notes: ''
    })
    setErrors({})
    setSearchTerm('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {initialData ? 'Edit Access Right' : 'Add New Access Right'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {initialData ? 'Modify existing access right permissions' : 'Create a new access right with specific permissions'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Basic Information</span>
              </h3>
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Access Right Name <span className="text-red-500">*</span>
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
                  placeholder="Enter access right name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
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
                  placeholder="Describe the access right and its purpose"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => handleInputChange('userType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.userType
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <option value="">Select user type</option>
                  {userTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.userType}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                <Settings className="w-5 h-5 text-green-600" />
                <span>Configuration</span>
              </h3>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Active Status */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Access Right
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <span>Permissions <span className="text-red-500">*</span></span>
            </h3>
            
            {errors.permissions && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.permissions}</p>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search permissions and actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-700 transition-all duration-200"
              />
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Found {filteredPermissionCategories.length} categories matching "{searchTerm}"
              </div>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              {filteredPermissionCategories.map(category => (
                <div key={category.name} className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.permissions[category.name]?.length === category.actions.length}
                      onChange={() => handleCategoryToggle(category.name)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                  </div>
                  
                  {category.actions.length > 0 && (
                    <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.actions.map(action => (
                        <label key={action} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.permissions[category.name]?.includes(action) || false}
                            onChange={() => handlePermissionToggle(category.name, action)}
                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">{action}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Any additional notes or special instructions..."
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
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{initialData ? 'Update Access Right' : 'Create Access Right'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccessRightsPopup 