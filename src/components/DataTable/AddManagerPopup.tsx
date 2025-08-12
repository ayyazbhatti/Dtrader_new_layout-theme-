import React, { useState } from 'react'
import { X, User, Mail, Lock, Phone, MapPin, Building, Save, Eye, EyeOff } from 'lucide-react'

interface AddManagerPopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (managerData: ManagerFormData) => void
}

interface ManagerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  domain: string
  role: string
  password: string
  confirmPassword: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  assignedTags: string[]
  subManager: string
}

const AddManagerPopup: React.FC<AddManagerPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<ManagerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    domain: '',
    role: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    assignedTags: [],
    subManager: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<ManagerFormData>>({})
  const [availableTags] = useState([
    'Senior Manager',
    'Team Lead', 
    'Project Manager',
    'Department Head',
    'Regional Manager',
    'Supervisor',
    'Coordinator'
  ])
  const [showAddTagPopup, setShowAddTagPopup] = useState(false)

  const handleInputChange = (field: keyof ManagerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTags: prev.assignedTags.includes(tag)
        ? prev.assignedTags.filter(t => t !== tag)
        : [...prev.assignedTags, tag]
    }))
  }



  const validateForm = (): boolean => {
    const newErrors: Partial<ManagerFormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.domain.trim()) newErrors.domain = 'Domain is required'
    if (!formData.role.trim()) newErrors.role = 'Manager Access Rights is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        domain: '',
        role: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        assignedTags: [],
        subManager: ''
      })
      setErrors({})
      setShowAddTagPopup(false)
    }
  }

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      domain: '',
      role: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      assignedTags: [],
      subManager: ''
    })
    setErrors({})
    setShowAddTagPopup(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Manager</h2>
              <p className="text-gray-400 text-sm">Create a new manager account</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-500'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-500'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-500'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Domain <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.domain ? 'border-red-500' : 'border-gray-500'
                  }`}
                  placeholder="Enter domain"
                />
                {errors.domain && (
                  <p className="text-red-400 text-xs mt-1">{errors.domain}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Manager Access Rights <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.role ? 'border-red-500' : 'border-gray-500'
                  }`}
                >
                  <option value="">Select access level</option>
                  <option value="Full Access">Full Access</option>
                  <option value="Limited Access">Limited Access</option>
                  <option value="Read Only">Read Only</option>
                  <option value="Restricted Access">Restricted Access</option>
                  <option value="Supervisor Level">Supervisor Level</option>
                </select>
                {errors.role && (
                  <p className="text-red-400 text-xs mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          </div>

          {/* Manager Configuration */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Manager Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assign Tags
                </label>
                <div className="space-y-3">
                  {/* Selected Tags Display */}
                  <div className="flex flex-wrap gap-2">
                    {formData.assignedTags.map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          index === 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          index === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                        }`}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            assignedTags: prev.assignedTags.filter(t => t !== tag)
                          }))}
                          className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {formData.assignedTags.length === 0 && (
                      <span className="text-gray-500 text-xs italic">No tags assigned</span>
                    )}
                  </div>
                  
                  {/* Assign Tags Button */}
                  <button
                    type="button"
                    onClick={() => setShowAddTagPopup(true)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Assign Tags
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Sub Manager
                </label>
                <select 
                  value={formData.subManager}
                  onChange={(e) => handleInputChange('subManager', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select sub manager</option>
                  <option value="none">No Sub Manager</option>
                  <option value="john-smith">John Smith - Senior Manager</option>
                  <option value="sarah-johnson">Sarah Johnson - Account Manager</option>
                  <option value="michael-brown">Michael Brown - Team Lead</option>
                  <option value="emily-davis">Emily Davis - Senior Manager</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Security Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 bg-gray-600 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-500'
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter ZIP code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Manager
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Select Tags Popup */}
      {showAddTagPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Select Tags</h3>
              <button
                onClick={() => setShowAddTagPopup(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Available Tags with Checkboxes */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-300">Available Tags</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.assignedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            assignedTags: [...prev.assignedTags, tag]
                          }))
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            assignedTags: prev.assignedTags.filter(t => t !== tag)
                          }))
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-white">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-600">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, assignedTags: availableTags }))}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, assignedTags: [] }))}
                  className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <button
                onClick={() => setShowAddTagPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Done
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddManagerPopup 