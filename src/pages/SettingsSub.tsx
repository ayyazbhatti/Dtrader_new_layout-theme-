import React from 'react'
import { useParams } from 'react-router-dom'
import { Settings, Building2, Mail, PanelLeft, Bell, Megaphone } from 'lucide-react'
import ExchangeSettingsSystem from '@/components/DataTable/ExchangeSettingsSystemMain'
import EmailSettingsSystem from '@/components/DataTable/EmailSettingsSystemMain'
import PanelSettingsSystem from '@/components/DataTable/PanelSettingsSystemMain'
import NotificationsSettingsSystem from '@/components/DataTable/NotificationsSettingsSystemMain'

const SettingsSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      exchange: 'Exchange Settings',
      email: 'Email Settings',
      panel: 'Panel Settings',
      notifications: 'System Notifications',
      promotion: 'Promotion Settings',
    }
    return titles[subPage || ''] || 'Settings'
  }

  // Render exchange settings for exchange subpage
  if (subPage === 'exchange') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Exchange Settings
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Manage exchange configurations and trading parameters</p>
          </div>
        </div>
        
        <ExchangeSettingsSystem />
      </div>
    )
  }

  // Render email settings for email subpage
  if (subPage === 'email') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Email Settings
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Manage email templates and notification preferences</p>
          </div>
        </div>
        
        <EmailSettingsSystem />
      </div>
    )
  }

  // Render panel settings for panel subpage
  if (subPage === 'panel') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <PanelLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Panel Settings
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Customize panel layouts, themes, and appearance</p>
          </div>
        </div>
        
        <PanelSettingsSystem />
      </div>
    )
  }

  // Render notifications settings for notifications subpage
  if (subPage === 'notifications') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 rounded-full flex items-center justify-center">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              System Notifications
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Configure notification settings and delivery preferences</p>
          </div>
        </div>
        
        <NotificationsSettingsSystem />
      </div>
    )
  }

  // Default content for other subpages
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getPageTitle(subPage)}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {getPageTitle(subPage)}
        </h2>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            This is the {getPageTitle(subPage || '').toLowerCase()} page.
            Content will be added here based on the specific functionality
            needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 1
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 1
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 2
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 2
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Feature 3
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of feature 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsSub
