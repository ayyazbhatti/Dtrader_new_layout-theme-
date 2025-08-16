import React, { useState } from 'react'
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag, 
  DollarSign,
  Users,
  TrendingUp,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface Promotion {
  id: string
  title: string
  description: string
  type: 'discount' | 'bonus' | 'cashback' | 'free_trial' | 'referral'
  value: string
  startDate: string
  endDate: string
  status: 'active' | 'inactive' | 'expired' | 'draft'
  targetAudience: 'all' | 'new_users' | 'existing_users' | 'vip_users'
  minDeposit?: number
  maxBonus?: number
  terms: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
  usageCount: number
  maxUsage?: number
}

const PromotionManagement: React.FC = () => {
  const [showAddPromotion, setShowAddPromotion] = useState(false)
  const [showEditPromotion, setShowEditPromotion] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Mock data for promotions
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Welcome Bonus',
      description: 'Get 100% bonus on your first deposit up to $500',
      type: 'bonus',
      value: '100%',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      targetAudience: 'new_users',
      minDeposit: 100,
      maxBonus: 500,
      terms: 'Minimum deposit $100. Maximum bonus $500. 30x wagering requirement.',
      imageUrl: '/api/promotions/welcome-bonus.jpg',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      usageCount: 45,
      maxUsage: 100
    },
    {
      id: '2',
      title: 'Cashback Friday',
      description: 'Get 20% cashback on all losses every Friday',
      type: 'cashback',
      value: '20%',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      targetAudience: 'existing_users',
      terms: 'Available every Friday. Minimum loss $50. Maximum cashback $200.',
      imageUrl: '/api/promotions/cashback-friday.jpg',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      usageCount: 23,
      maxUsage: 50
    },
    {
      id: '3',
      title: 'VIP Referral Program',
      description: 'Earn $100 for every VIP user you refer',
      type: 'referral',
      value: '$100',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      targetAudience: 'vip_users',
      terms: 'Referral must deposit minimum $1000. Bonus paid after 30 days.',
      imageUrl: '/api/promotions/vip-referral.jpg',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      usageCount: 12,
      maxUsage: 25
    }
  ])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'discount': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'bonus': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'cashback': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'free_trial': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'referral': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discount': return <DollarSign className="w-4 h-4" />
      case 'bonus': return <Gift className="w-4 h-4" />
      case 'cashback': return <TrendingUp className="w-4 h-4" />
      case 'free_trial': return <Calendar className="w-4 h-4" />
      case 'referral': return <Users className="w-4 h-4" />
      default: return <Tag className="w-4 h-4" />
    }
  }

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || promotion.status === statusFilter
    const matchesType = typeFilter === 'all' || promotion.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    totalPromotions: promotions.length,
    activePromotions: promotions.filter(p => p.status === 'active').length,
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
    expiringSoon: promotions.filter(p => {
      const endDate = new Date(p.endDate)
      const now = new Date()
      const diffTime = endDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 30 && diffDays > 0 && p.status === 'active'
    }).length
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            Promotion Management
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm truncate">Manage promotions to display on client side</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Promotions</p>
              <p className="text-2xl font-bold text-white">{stats.totalPromotions}</p>
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
              <p className="text-2xl font-bold text-white">{stats.activePromotions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsage}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-bold text-white">{stats.expiringSoon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Types</option>
              <option value="discount">Discount</option>
              <option value="bonus">Bonus</option>
              <option value="cashback">Cashback</option>
              <option value="free_trial">Free Trial</option>
              <option value="referral">Referral</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowAddPromotion(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Promotion</span>
          </button>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Promotion</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{promotion.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {promotion.description}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(promotion.type)}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeClass(promotion.type)}`}>
                        {promotion.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{promotion.value}</div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(promotion.status)}`}>
                      {promotion.status}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div>{new Date(promotion.startDate).toLocaleDateString()}</div>
                      <div>to {new Date(promotion.endDate).toLocaleDateString()}</div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {promotion.usageCount}
                      {promotion.maxUsage && ` / ${promotion.maxUsage}`}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPromotion(promotion)
                          setShowEditPromotion(true)
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="Edit Promotion"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => console.log('View promotion:', promotion.id)}
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedPromotion(promotion)
                          // Show delete confirmation
                        }}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Delete Promotion"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Promotion Popup */}
      {(showAddPromotion || showEditPromotion) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {showAddPromotion ? 'Add New Promotion' : 'Edit Promotion'}
              </h2>
              <button
                onClick={() => {
                  setShowAddPromotion(false)
                  setShowEditPromotion(false)
                  setSelectedPromotion(null)
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Promotion Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter promotion title"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter promotion description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Promotion Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                      <option value="discount">Discount</option>
                      <option value="bonus">Bonus</option>
                      <option value="cashback">Cashback</option>
                      <option value="free_trial">Free Trial</option>
                      <option value="referral">Referral</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 20%, $100, 100%"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Audience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                      <option value="all">All Users</option>
                      <option value="new_users">New Users</option>
                      <option value="existing_users">Existing Users</option>
                      <option value="vip_users">VIP Users</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  placeholder="Enter terms and conditions for this promotion"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddPromotion(false)
                    setShowEditPromotion(false)
                    setSelectedPromotion(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle save logic here
                    setShowAddPromotion(false)
                    setShowEditPromotion(false)
                    setSelectedPromotion(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  {showAddPromotion ? 'Create Promotion' : 'Update Promotion'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromotionManagement 