import React from 'react'
import { X, Settings } from 'lucide-react'

interface GroupSettingsHeaderProps {
  onClose: () => void
  groupData?: any
}

export const GroupSettingsHeader: React.FC<GroupSettingsHeaderProps> = ({
  onClose,
  groupData
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 sm:p-6 rounded-t-lg">
      <div className="flex items-center justify-between">
        {/* Header Content */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              Group Settings
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm truncate">
              {groupData ? `Configure settings for ${groupData.name}` : 'Configure group settings and leverage profiles'}
            </p>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-gray-200 hover:text-white transition-colors rounded-lg hover:bg-blue-600/50"
          title="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  )
} 