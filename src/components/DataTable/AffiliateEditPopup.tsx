import React, { useState, useEffect } from 'react'
import { X, Save, Users, Mail, Phone, Globe, Shield, TrendingUp } from 'lucide-react'

interface AffiliateUser {
  id: string
  accountId: string
  accountName: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalCommission: number
  monthlyCommission: number
  referralCount: number
  joinDate: string
  lastActivity: string
  country: string
  verificationStatus: 'verified' | 'unverified' | 'pending'
}

interface AffiliateEditPopupProps {
  user: AffiliateUser | null
  onClose: () => void
  onSave: (user: AffiliateUser) => void
}

const AffiliateEditPopup: React.FC<AffiliateEditPopupProps> = ({
  user,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<AffiliateUser>>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (user) {
      setFormData({
        accountName: user.accountName,
        email: user.email,
        phone: user.phone,
        status: user.status,
        tier: user.tier,
        country: user.country,
        verificationStatus: user.verificationStatus
      })
    }
  }, [user])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.accountName?.trim()) {
      newErrors.accountName = 'Account name is required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm() && user) {
      const updatedUser: AffiliateUser = {
        ...user,
        ...formData
      }
      onSave(updatedUser)
    }
  }

  const handleInputChange = (field: keyof AffiliateUser, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Edit Affiliate</h2>
              <p className="text-gray-400 text-sm">Account ID: {user.accountId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    value={formData.accountName || ''}
                    onChange={(e) => handleInputChange('accountName', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.accountName ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Enter account name"
                  />
                  {errors.accountName && (
                    <p className="text-red-400 text-xs mt-1">{errors.accountName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.country ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Enter country"
                  />
                  {errors.country && (
                    <p className="text-red-400 text-xs mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Status & Settings */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-400" />
                Status & Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tier
                  </label>
                  <select
                    value={formData.tier || 'bronze'}
                    onChange={(e) => handleInputChange('tier', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verification
                  </label>
                  <select
                    value={formData.verificationStatus || 'pending'}
                    onChange={(e) => handleInputChange('verificationStatus', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Commission Settings */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
                Commission Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Commission
                  </label>
                  <input
                    type="number"
                    value={formData.totalCommission || 0}
                    onChange={(e) => handleInputChange('totalCommission', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Commission
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyCommission || 0}
                    onChange={(e) => handleInputChange('monthlyCommission', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AffiliateEditPopup 