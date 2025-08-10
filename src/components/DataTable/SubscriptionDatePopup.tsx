import React, { useState } from 'react'
import { X } from 'lucide-react'
import { SubscriptionDateData } from './types'

interface SubscriptionDatePopupProps {
  isOpen: boolean
  onClose: () => void
  onSaveSubscription: (data: SubscriptionDateData) => void
  onSaveDate: (data: SubscriptionDateData) => void
}

export const SubscriptionDatePopup: React.FC<SubscriptionDatePopupProps> = ({
  isOpen,
  onClose,
  onSaveSubscription,
  onSaveDate
}) => {
  const [formData, setFormData] = useState<SubscriptionDateData>({
    subscriptionOption: '',
    subscriptionEndDate: ''
  })

  // Mock subscription options for demonstration
  const availableSubscriptionOptions = [
    'Basic Plan',
    'Premium Plan', 
    'Pro Plan',
    'Enterprise Plan',
    'Custom Plan'
  ]

  const handleInputChange = (field: keyof SubscriptionDateData, value: string) => {
    setFormData((prev: SubscriptionDateData) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveSubscription = () => {
    if (formData.subscriptionOption) {
      onSaveSubscription(formData)
      // Don't close the modal, just save the subscription option
    }
  }

  const handleSaveDate = () => {
    if (formData.subscriptionEndDate) {
      onSaveDate(formData)
      // Don't close the modal, just save the date
    }
  }

  const handleClose = () => {
    setFormData({
      subscriptionOption: '',
      subscriptionEndDate: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Set Subscription Date
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Select Subscription Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Subscription Option
            </label>
            <div className="flex gap-3">
              <select
                value={formData.subscriptionOption}
                onChange={(e) => handleInputChange('subscriptionOption', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Option</option>
                {availableSubscriptionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveSubscription}
                disabled={!formData.subscriptionOption}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>

          {/* Subscription End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subscription End Date
            </label>
            <div className="flex gap-3">
              <input
                type="date"
                value={formData.subscriptionEndDate}
                onChange={(e) => handleInputChange('subscriptionEndDate', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="mm/dd/yyyy"
              />
              <button
                onClick={handleSaveDate}
                disabled={!formData.subscriptionEndDate}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 