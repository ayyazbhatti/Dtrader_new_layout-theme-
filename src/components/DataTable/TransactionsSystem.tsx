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
  CreditCard,
  Target,
  Percent,
  Clock,
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'

interface Transaction {
  id: string
  transactionId: string
  accountId: string
  accountName: string
  type: 'deposit' | 'withdrawal' | 'transfer' | 'bonus' | 'commission' | 'fee'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  createdAt: string
  updatedAt: string
  description: string
  reference: string
  method: string
  fees: number
  netAmount: number
  category: string
  tags: string[]
}

interface TransactionDetailsPopupProps {
  transaction: Transaction
  onClose: () => void
  onEdit: (transaction: Transaction) => void
}

interface AddTransactionPopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
}

const AddTransactionPopup: React.FC<AddTransactionPopupProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    transactionId: '',
    accountId: '',
    accountName: '',
    type: 'deposit' as Transaction['type'],
    amount: 0,
    currency: 'USD',
    status: 'pending' as Transaction['status'],
    description: '',
    reference: '',
    method: '',
    fees: 0,
    netAmount: 0,
    category: '',
    tags: [] as string[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required'
    }

    if (!formData.accountId.trim()) {
      newErrors.accountId = 'Account ID is required'
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
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
      transactionId: '',
      accountId: '',
      accountName: '',
      type: 'deposit',
      amount: 0,
      currency: 'USD',
      status: 'pending',
      description: '',
      reference: '',
      method: '',
      fees: 0,
      netAmount: 0,
      category: '',
      tags: []
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Transaction</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new transaction record</p>
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
              <CreditCard className="w-5 h-5 text-blue-500" />
              Transaction Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => handleInputChange('transactionId', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.transactionId
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter transaction ID"
                />
                {errors.transactionId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.transactionId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.accountId}
                  onChange={(e) => handleInputChange('accountId', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.accountId
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter account ID"
                />
                {errors.accountId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.accountId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as Transaction['type'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="bonus">Bonus</option>
                  <option value="commission">Commission</option>
                  <option value="fee">Fee</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    errors.amount
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as Transaction['status'])}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
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
              placeholder="Enter transaction description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
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
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const TransactionDetailsPopup: React.FC<TransactionDetailsPopupProps> = ({
  transaction,
  onClose,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState('detail')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Transaction>(() => ({ ...transaction }))
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when transaction prop changes
  React.useEffect(() => {
    setFormData({ ...transaction })
    setErrors({})
  }, [transaction])

  const handleInputChange = (field: keyof Transaction, value: any) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required'
    }

    if (!formData.accountId.trim()) {
      newErrors.accountId = 'Account ID is required'
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onEdit({
        ...formData,
        updatedAt: new Date().toISOString()
      })
      setIsEditing(false)
      setErrors({})
    }
  }

  const handleCancel = () => {
    setFormData({ ...transaction })
    setIsEditing(false)
    setErrors({})
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case 'transfer': return <ArrowUpRight className="w-4 h-4 text-blue-500" />
      case 'bonus': return <DollarSign className="w-4 h-4 text-yellow-500" />
      case 'commission': return <Percent className="w-4 h-4 text-purple-500" />
      case 'fee': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      default: return <CreditCard className="w-4 h-4 text-gray-500" />
    }
  }

  const tabs = [
    {
      id: 'detail',
      label: 'Details',
      icon: <CreditCard className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Transaction Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Transaction ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => handleInputChange('transactionId', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.transactionId ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white font-mono">{formData.transactionId}</div>
                )}
                {errors.transactionId && (
                  <p className="text-sm text-red-400">{errors.transactionId}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Account ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.accountId}
                    onChange={(e) => handleInputChange('accountId', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.accountId ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{formData.accountId}</div>
                )}
                {errors.accountId && (
                  <p className="text-sm text-red-400">{errors.accountId}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Type</label>
                {isEditing ? (
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as Transaction['type'])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                    <option value="transfer">Transfer</option>
                    <option value="bonus">Bonus</option>
                    <option value="commission">Commission</option>
                    <option value="fee">Fee</option>
                  </select>
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-2">
                    {getTypeIcon(formData.type)}
                    <span className="capitalize">{formData.type}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Amount</label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.amount ? 'border-red-500' : ''
                    }`}
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{formData.amount.toFixed(2)} {formData.currency}</span>
                  </div>
                )}
                {errors.amount && (
                  <p className="text-sm text-red-400">{errors.amount}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as Transaction['status'])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusClass(formData.status)}`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Created</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{new Date(formData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
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
                placeholder="Enter transaction description"
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

          {/* Financial Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Financial Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Gross Amount</p>
                    <p className="text-2xl font-bold text-white">${formData.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Net Amount</p>
                    <p className="text-2xl font-bold text-white">${formData.netAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
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
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{formData.transactionId}</h2>
              <p className="text-sm text-gray-400">{formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Transaction</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
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

export default AddTransactionPopup 