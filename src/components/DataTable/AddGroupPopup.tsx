import React, { useState } from 'react'
import { X, UserPlus } from 'lucide-react'

interface AddGroupPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (groupData: GroupFormData) => void
}

interface GroupFormData {
  name: string
  priceStreamProfile: string
  swapsDividendProfile: string
  assignTags: string[]
  stopOutLevel: number
  openPositionDelayTime: number
  tradeExecutionDelayTime: number
  minimumMarginLevelCall: number
  comment: string
}

const AddGroupPopup: React.FC<AddGroupPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    priceStreamProfile: 'Default Price Stream',
    swapsDividendProfile: 'Default Swap Dividend',
    assignTags: [],
    stopOutLevel: 0,
    openPositionDelayTime: 0,
    tradeExecutionDelayTime: 0,
    minimumMarginLevelCall: 0,
    comment: ''
  })

  const [errors, setErrors] = useState<Partial<GroupFormData>>({})

  const handleStringChange = (field: Exclude<keyof GroupFormData, 'assignTags'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleNumberChange = (field: Exclude<keyof GroupFormData, 'assignTags' | 'name' | 'priceStreamProfile' | 'swapsDividendProfile' | 'comment'>, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleTagsChange = (value: string[]) => {
    setFormData(prev => ({ ...prev, assignTags: value }))
    if (errors.assignTags) {
      setErrors(prev => ({ ...prev, assignTags: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<GroupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.priceStreamProfile) {
      newErrors.priceStreamProfile = 'Price Stream Profile is required'
    }
    if (!formData.swapsDividendProfile) {
      newErrors.swapsDividendProfile = 'Swaps and Dividend Profile is required'
    }
    if (formData.assignTags.length === 0) {
      newErrors.assignTags = 'At least one tag must be selected'
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
      priceStreamProfile: 'Default Price Stream',
      swapsDividendProfile: 'Default Swap Dividend',
      assignTags: [],
      stopOutLevel: 0,
      openPositionDelayTime: 0,
      tradeExecutionDelayTime: 0,
      minimumMarginLevelCall: 0,
      comment: ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Group</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create a new trading group with custom settings</p>
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
          {/* Top Row - Configuration Profiles and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Name */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
                             <input
                 type="text"
                 placeholder="Group name"
                 value={formData.name}
                 onChange={(e) => handleStringChange('name', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                   errors.name 
                     ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                 }`}
               />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Price Stream Profile */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Stream Profile <span className="text-red-500">*</span>
              </label>
                             <select
                 value={formData.priceStreamProfile}
                 onChange={(e) => handleStringChange('priceStreamProfile', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                   errors.priceStreamProfile 
                     ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                 }`}
               >
                <option value="Default Price Stream">Default Price Stream</option>
                <option value="Premium Price Stream">Premium Price Stream</option>
                <option value="VIP Price Stream">VIP Price Stream</option>
                <option value="Standard Price Stream">Standard Price Stream</option>
                <option value="Professional Price Stream">Professional Price Stream</option>
              </select>
              {errors.priceStreamProfile && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.priceStreamProfile}</p>
              )}
            </div>

            {/* Swaps and Dividend Profile */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Swaps and Dividend Profile <span className="text-red-500">*</span>
              </label>
                             <select
                 value={formData.swapsDividendProfile}
                 onChange={(e) => handleStringChange('swapsDividendProfile', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                   errors.swapsDividendProfile 
                     ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                 }`}
               >
                <option value="Default Swap Dividend">Default Swap Dividend</option>
                <option value="Premium Swap Dividend">Premium Swap Dividend</option>
                <option value="VIP Swap Dividend">VIP Swap Dividend</option>
                <option value="Standard Swap Dividend">Standard Swap Dividend</option>
                <option value="Professional Swap Dividend">Professional Swap Dividend</option>
              </select>
              {errors.swapsDividendProfile && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.swapsDividendProfile}</p>
              )}
            </div>

            {/* Assign Tags */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign Tags <span className="text-red-500">*</span>
              </label>
                             <select
                 multiple
                 value={formData.assignTags}
                 onChange={(e) => {
                   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                   handleTagsChange(selectedOptions)
                 }}
                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                   errors.assignTags 
                     ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                     : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                 }`}
               >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
                <option value="institutional">Institutional</option>
                <option value="scalping">Scalping</option>
                <option value="swing">Swing Trading</option>
                <option value="day-trading">Day Trading</option>
              </select>
              {errors.assignTags && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.assignTags}</p>
              )}
            </div>
          </div>

          {/* Middle Row - Numerical Settings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Stop Out Level */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stop Out Level (in %)
              </label>
                             <input
                 type="number"
                 min="0"
                 max="100"
                 step="0.1"
                 value={formData.stopOutLevel}
                 onChange={(e) => handleNumberChange('stopOutLevel', parseFloat(e.target.value) || 0)}
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
               />
            </div>

            {/* Open Position Delay Time */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Open Position Delay Time
              </label>
                             <input
                 type="number"
                 min="0"
                 step="1"
                 value={formData.openPositionDelayTime}
                 onChange={(e) => handleNumberChange('openPositionDelayTime', parseInt(e.target.value) || 0)}
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
               />
            </div>

            {/* Trade Execution Delay Time */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trade Execution Delay Time
              </label>
                             <input
                 type="number"
                 min="0"
                 step="1"
                 value={formData.tradeExecutionDelayTime}
                 onChange={(e) => handleNumberChange('tradeExecutionDelayTime', parseInt(e.target.value) || 0)}
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
               />
            </div>

            {/* Minimum Margin Level Call */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Margin Level Call
              </label>
                             <input
                 type="number"
                 min="0"
                 step="0.1"
                 value={formData.minimumMarginLevelCall}
                 onChange={(e) => handleNumberChange('minimumMarginLevelCall', parseFloat(e.target.value) || 0)}
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
               />
            </div>
          </div>

          {/* Bottom Row - Comment and Action Button */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Comment */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comment
              </label>
                             <textarea
                 placeholder="Add a Comment"
                 value={formData.comment}
                 onChange={(e) => handleStringChange('comment', e.target.value)}
                 rows={3}
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none"
               />
            </div>

            {/* Create Button */}
            <div className="md:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGroupPopup 