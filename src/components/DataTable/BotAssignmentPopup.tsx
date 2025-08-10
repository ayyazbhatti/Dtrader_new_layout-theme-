import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { UserData } from './types'

interface BotAssignmentPopupProps {
  isOpen: boolean
  onClose: () => void
  selectedUsers: UserData[]
  onAssignBot: (userId: string, botSetting: string) => void
  onUnassignBot: (userId: string) => void
  availableBotSettings: string[]
}

export const BotAssignmentPopup: React.FC<BotAssignmentPopupProps> = ({
  isOpen,
  onClose,
  selectedUsers,
  onAssignBot,
  onUnassignBot,
  availableBotSettings
}) => {
  const [selectedBotSetting, setSelectedBotSetting] = useState<string>('')
  const [botSearch, setBotSearch] = useState('')

  // Initialize selected bot setting when popup opens
  useEffect(() => {
    if (isOpen) {
      setSelectedBotSetting('')
      setBotSearch('')
    }
  }, [isOpen])

  // Filter bot settings based on search term
  const getFilteredBotSettings = () => {
    if (!botSearch.trim()) {
      return availableBotSettings
    }
    return availableBotSettings.filter(setting =>
      setting.toLowerCase().includes(botSearch.toLowerCase())
    )
  }

  const handleBotSelection = (setting: string) => {
    setSelectedBotSetting(setting)
  }

  const handleClearSelection = () => {
    setSelectedBotSetting('')
  }

  const handleAssignBot = () => {
    if (selectedBotSetting && selectedUsers.length > 0) {
      selectedUsers.forEach(user => {
        onAssignBot(user.id, selectedBotSetting)
      })
      setSelectedBotSetting('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Bot Management
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bot Settings Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Manage Bot Settings
            </label>

            {/* Selected Bot Setting Display */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedBotSetting ? '1 Bot Setting selected' : 'No Bot Setting selected'}
                </span>
                {selectedBotSetting && (
                  <button
                    onClick={handleClearSelection}
                    className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search bot settings..."
                value={botSearch}
                onChange={(e) => setBotSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bot Settings List */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md">
              {getFilteredBotSettings().map((setting) => (
                <label
                  key={setting}
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedBotSetting === setting ? 'bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="botSetting"
                    checked={selectedBotSetting === setting}
                    onChange={() => handleBotSelection(setting)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-3 text-sm text-gray-900 dark:text-white">{setting}</span>
                </label>
              ))}
            </div>
          </div>

          {/* User Count Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This will assign the selected bot setting to <span className="font-medium text-gray-900 dark:text-white">{selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleAssignBot}
            disabled={!selectedBotSetting}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Bot
          </button>
        </div>
      </div>
    </div>
  )
} 