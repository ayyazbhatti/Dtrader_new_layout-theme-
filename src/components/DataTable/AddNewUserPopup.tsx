import React, { useState } from 'react'
import { X, User, Eye, EyeOff, ChevronDown } from 'lucide-react'

interface AddNewUserData {
  userName: string
  email: string
  password: string
  minimumMarginLevelCall: string
  group: string
  domain: string
  assignTags: string[]
  platformAccessRights: string
  userPanelAccessRight: string
  leverage: string
  maxLeverage: string
  accountType: string
  totalMarginCalculationType: string
  currency: string
  firstName: string
  lastName: string
  phone: string
  city: string
  state: string
  address: string
  comment: string
  country: string
}

interface AddNewUserPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AddNewUserData) => void
}

export const AddNewUserPopup: React.FC<AddNewUserPopupProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<AddNewUserData>({
    userName: '',
    email: '',
    password: '',
    minimumMarginLevelCall: '0',
    group: 'DefaultGroup',
    domain: 'dtrader',
    assignTags: [],
    platformAccessRights: 'Full Access',
    userPanelAccessRight: 'Default User_panel',
    leverage: '1:100',
    maxLeverage: '1:1000',
    accountType: 'CFD Hedging',
    totalMarginCalculationType: 'Sum',
    currency: 'EUR',
    firstName: '',
    lastName: '',
    phone: '+92-3001234543',
    city: '',
    state: '',
    address: '',
    comment: '',
    country: 'Afghanistan'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showTagSelector, setShowTagSelector] = useState(false)

  // Mock data for dropdowns
  const groups = ['DefaultGroup', 'Premium', 'Standard', 'VIP']
  const platformAccessRights = ['Full Access', 'Limited Access', 'Read Only', 'Trading Only']
  const userPanelAccessRights = ['Default User_panel', 'Admin Panel', 'Manager Panel', 'User Panel']
  const accountTypes = ['CFD Hedging', 'CFD Netting', 'Standard', 'Premium']
  const totalMarginCalculationTypes = ['Sum', 'Net', 'Weighted']
  const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD']
  const availableTags = ['Premium User', 'VIP Member', 'Active Trader', 'Bot User', 'Manual Trader', 'High Volume', 'Low Risk']
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
    'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ]

  const handleInputChange = (field: keyof AddNewUserData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      assignTags: prev.assignTags.includes(tag)
        ? prev.assignTags.filter(t => t !== tag)
        : [...prev.assignTags, tag]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleClose = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
      minimumMarginLevelCall: '0',
      group: 'DefaultGroup',
      domain: 'dtrader',
      assignTags: [],
      platformAccessRights: 'Full Access',
      userPanelAccessRight: 'Default User_panel',
      leverage: '1:100',
      maxLeverage: '1:1000',
      accountType: 'CFD Hedging',
      totalMarginCalculationType: 'Sum',
      currency: 'EUR',
      firstName: '',
      lastName: '',
      phone: '+92-3001234543',
      city: '',
      state: '',
      address: '',
      comment: '',
      country: 'Afghanistan'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Add New User</h2>
              <p className="text-gray-400 text-sm">Create a new user account with all necessary details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Account Settings Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white border-l-4 border-blue-500 pl-4">
              Account Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">User Name</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  placeholder="Enter User Name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your valid email.."
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter Your Password"
                    required
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Minimum Margin Level Call */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Minimum Margin Level Call %</label>
                <input
                  type="number"
                  value={formData.minimumMarginLevelCall}
                  onChange={(e) => handleInputChange('minimumMarginLevelCall', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Group */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.group}
                    onChange={(e) => handleInputChange('group', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {groups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Domain */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Domain <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Assign Tags */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Assign Tags <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTagSelector(!showTagSelector)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    {formData.assignTags.length > 0 ? `${formData.assignTags.length} Tags selected` : '0 Tags selected'}
                  </button>
                  {showTagSelector && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg p-3 z-10 max-h-48 overflow-y-auto">
                      {availableTags.map(tag => (
                        <label key={tag} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.assignTags.includes(tag)}
                            onChange={() => handleTagToggle(tag)}
                            className="w-3 h-3 md:w-4 md:h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 bg-gray-700"
                          />
                          <span className="text-white text-sm">{tag}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Platform Access Rights */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Platform Access Rights <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.platformAccessRights}
                    onChange={(e) => handleInputChange('platformAccessRights', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {platformAccessRights.map(right => (
                      <option key={right} value={right}>{right}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* User Panel Access Right */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  User's Panel Access Right <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.userPanelAccessRight}
                    onChange={(e) => handleInputChange('userPanelAccessRight', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {userPanelAccessRights.map(right => (
                      <option key={right} value={right}>{right}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Leverage */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Leverage</label>
                <input
                  type="text"
                  value={formData.leverage}
                  onChange={(e) => handleInputChange('leverage', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Max Leverage */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Max Leverage</label>
                <input
                  type="text"
                  value={formData.maxLeverage}
                  onChange={(e) => handleInputChange('maxLeverage', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Account Type</label>
                <div className="relative">
                  <select
                    value={formData.accountType}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {accountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Total Margin Calculation Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Total Margin Calculation Type</label>
                <div className="relative">
                  <select
                    value={formData.totalMarginCalculationType}
                    onChange={(e) => handleInputChange('totalMarginCalculationType', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {totalMarginCalculationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Currency <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white border-l-4 border-blue-500 pl-4">
              Account Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter your state name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter Your Address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Description"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows={2}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 