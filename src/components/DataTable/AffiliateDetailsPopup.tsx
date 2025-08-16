import React, { useState } from 'react'
import { X, User, Users, Link, Edit, Save, TrendingUp, DollarSign, Activity, Calendar, Globe, Phone, Mail, Shield, CheckCircle, Clock } from 'lucide-react'

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

interface AffiliateDetailsPopupProps {
  user: AffiliateUser
  onClose: () => void
  onEdit: (user: AffiliateUser) => void
}

interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

const AffiliateDetailsPopup: React.FC<AffiliateDetailsPopupProps> = ({
  user,
  onClose,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState('detail')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<AffiliateUser>(user)

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      onEdit(editData)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleInputChange = (field: keyof AffiliateUser, value: string | number) => {
    setEditData((prev: AffiliateUser) => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'suspended': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'gold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'silver': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'bronze': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getVerificationClass = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'unverified': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Tab definitions with content
  const tabs: TabItem[] = [
    {
      id: 'detail',
      label: 'Detail',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Account Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.accountName}
                    onChange={(e) => handleInputChange('accountName', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.accountName}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Account ID</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.accountId}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.email}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.phone}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.country}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Join Date</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.joinDate}</div>
              </div>
            </div>
          </div>

          {/* Status & Verification */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Status & Verification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                {isEditing ? (
                  <select
                    value={editData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusClass(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Tier</label>
                {isEditing ? (
                  <select
                    value={editData.tier}
                    onChange={(e) => handleInputChange('tier', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getTierClass(user.tier)}`}>
                    {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Verification</label>
                {isEditing ? (
                  <select
                    value={editData.verificationStatus}
                    onChange={(e) => handleInputChange('verificationStatus', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                    <option value="pending">Pending</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getVerificationClass(user.verificationStatus)}`}>
                    {user.verificationStatus.charAt(0).toUpperCase() + user.verificationStatus.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Total Commission</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">${user.totalCommission.toLocaleString()}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Monthly Commission</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">${user.monthlyCommission.toLocaleString()}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Referral Count</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.referralCount}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Activity</label>
                <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">{user.lastActivity}</div>
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
            Affiliate Users
          </h3>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white">{user.referralCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">{Math.floor(user.referralCount * 0.8)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">User Commission</p>
                  <p className="text-2xl font-bold text-white">${(user.totalCommission * 0.1).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

                     {/* Users Table */}
           <div className="bg-gray-700 rounded-lg overflow-hidden">
             <div className="px-4 py-3 border-b border-gray-600">
               <h4 className="text-md font-medium text-white">Affiliate Users</h4>
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
                       Affiliate Code
                     </th>
                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                       Affiliate Level
                     </th>
                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-r border-gray-500">
                       Commission Earned
                     </th>
                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody className="bg-gray-700 divide-y divide-gray-600">
                   {/* Sample data - replace with actual data */}
                   <tr className="hover:bg-gray-600 transition-colors">
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       12345678
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       JohnDoe
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       REF{user.accountId}
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                         Level 1
                       </span>
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       $125.50
                     </td>
                     <td className="px-4 py-3 text-sm text-white">
                       <div className="flex items-center space-x-2">
                         <button className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors" title="View Details">
                           <User className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 rounded transition-colors" title="Edit">
                           <Edit className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors" title="Delete">
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                     </td>
                   </tr>
                   <tr className="hover:bg-gray-600 transition-colors">
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       87654321
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       JaneSmith
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       REF{user.accountId}
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                         Level 2
                       </span>
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       $89.25
                     </td>
                     <td className="px-4 py-3 text-sm text-white">
                       <div className="flex items-center space-x-2">
                         <button className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors" title="View Details">
                           <User className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 rounded transition-colors" title="Edit">
                           <Edit className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors" title="Delete">
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                     </td>
                   </tr>
                   <tr className="hover:bg-gray-600 transition-colors">
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       11223344
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       MikeJohnson
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       REF{user.accountId}
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                         Level 3
                       </span>
                     </td>
                     <td className="px-4 py-3 text-sm text-white border-r border-gray-600">
                       $156.75
                     </td>
                     <td className="px-4 py-3 text-sm text-white">
                       <div className="flex items-center space-x-2">
                         <button className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors" title="View Details">
                           <User className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 rounded transition-colors" title="Edit">
                           <Edit className="w-4 h-4" />
                         </button>
                         <button className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors" title="Delete">
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      )
    },
    {
      id: 'affiliateLinks',
      label: 'Affiliate Links',
      icon: <Link className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Link className="w-5 h-5 text-blue-400" />
            Affiliate Links
          </h3>
          
          {/* Link Generation */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-md font-medium text-white mb-4">Generate New Link</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Campaign Name</label>
                <input
                  type="text"
                  placeholder="Enter campaign name"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Commission Rate (%)</label>
                <input
                  type="number"
                  placeholder="5.0"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
              Generate Link
            </button>
          </div>

          {/* Existing Links */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-600">
              <h4 className="text-md font-medium text-white">Existing Links</h4>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">Main Affiliate Link</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-300 break-all">
                      https://dtrader.com/ref/{user.accountId}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>Commission: 5%</span>
                      <span>Clicks: 24</span>
                      <span>Conversions: 3</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 rounded text-white text-sm transition-colors">
                    Copy
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">Social Media Campaign</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-300 break-all">
                      https://dtrader.com/ref/{user.accountId}?campaign=social
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>Commission: 7%</span>
                      <span>Clicks: 18</span>
                      <span>Conversions: 2</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 rounded text-white text-sm transition-colors">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Link Analytics */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="text-md font-medium text-white mb-4">Link Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">42</p>
                <p className="text-sm text-gray-400">Total Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-sm text-gray-400">Total Conversions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">11.9%</p>
                <p className="text-sm text-gray-400">Conversion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${(user.totalCommission * 0.3).toFixed(2)}</p>
                <p className="text-sm text-gray-400">Link Revenue</p>
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
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{user.accountName}</h2>
              <p className="text-sm text-gray-400">Affiliate ID: {user.accountId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
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

export default AffiliateDetailsPopup 