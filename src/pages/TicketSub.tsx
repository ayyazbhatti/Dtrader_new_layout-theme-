import React from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'

const TicketSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      'all-tickets': 'All Tickets',
    }
    return titles[subPage || ''] || 'Ticket'
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-6 h-6 text-primary-600" />
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

export default TicketSub
