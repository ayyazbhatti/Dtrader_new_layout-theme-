import React from 'react'
import { User, Phone, Calendar, AlertTriangle, X } from 'lucide-react'
import { UserData } from '../types'

interface UserDetailsHeaderProps {
  user: UserData
  onScheduleMeeting: () => void
  onPriceDropAlert: () => void
  onClose: () => void
}

export const UserDetailsHeader: React.FC<UserDetailsHeaderProps> = ({
  user,
  onScheduleMeeting,
  onPriceDropAlert,
  onClose
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 sm:p-6 rounded-t-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* User Info */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              {user.name} | User Detail
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm truncate">
              Account ID: {user.accountId}
            </p>
          </div>
        </div>
        
        {/* Action Buttons - Stack on mobile, horizontal on larger screens */}
        <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
          <button 
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
            title="Contact User"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Contact User
            </div>
          </button>
          
          <button 
            onClick={onScheduleMeeting}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
            title="Schedule Meeting"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Schedule Meeting
            </div>
          </button>
          
          <button 
            onClick={onPriceDropAlert}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
            title="Price Drop Alert"
          >
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Price Drop Alert
            </div>
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
            title="Close Popup"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Close Popup
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 