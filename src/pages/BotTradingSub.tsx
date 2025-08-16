import React from 'react'
import { useParams } from 'react-router-dom'
import { Bot, Settings, Activity, TrendingUp, Brain, Zap, Shield, Target, BarChart3, AlertTriangle, Activity as ActivityIcon } from 'lucide-react'
import BotTradingSettings from '@/components/DataTable/BotTradingSettingsMain'

const BotTradingSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      settings: 'Bot Settings',
    }
    return titles[subPage || ''] || 'Bot Trading'
  }

  // Render different content based on subPage
  if (subPage === 'settings') {
    return (
      <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">
              Bot Trading Settings
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate">Configure and manage bot trading parameters</p>
          </div>
        </div>

        <BotTradingSettings />
      </div>
    )
  }

  // Default content for other subpages
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            {getPageTitle(subPage)}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm truncate">Bot trading management and monitoring</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {getPageTitle(subPage || '').toLowerCase()}
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

export default BotTradingSub
