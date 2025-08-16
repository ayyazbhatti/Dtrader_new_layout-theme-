import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SystemLogs from '../components/DataTable/SystemLogs'
import ServerLogsComponent from '../components/DataTable/ServerLogsComponent'
import ApplicationLogs from '../components/DataTable/ApplicationLogs'
import ErrorLogs from '../components/DataTable/ErrorLogs'
import PerformanceLogs from '../components/DataTable/PerformanceLogs'

const ServerLogs: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  // If no subPage is provided, redirect to system logs
  if (!subPage) {
    return <Navigate to="/server-logs/system" replace />
  }

  // Get page configuration based on subPage
  const getPageConfig = (subPage: string) => {
    const configs = {
      'system': {
        title: 'System Logs',
        description: 'Monitor system-level events and operations',
        component: <SystemLogs />,
        icon: '🖥️'
      },
      'server': {
        title: 'Server Logs',
        description: 'View server performance and infrastructure logs',
        component: <ServerLogsComponent />,
        icon: '🖥️'
      },
      'application': {
        title: 'Application Logs',
        description: 'Track application-level events and user actions',
        component: <ApplicationLogs />,
        icon: '📱'
      },
      'errors': {
        title: 'Error Logs',
        description: 'Monitor error occurrences and debugging information',
        component: <ErrorLogs />,
        icon: '❌'
      },
      'performance': {
        title: 'Performance Logs',
        description: 'Analyze system performance metrics and bottlenecks',
        component: <PerformanceLogs />,
        icon: '📊'
      }
    }
    
    return configs[subPage as keyof typeof configs] || configs.system
  }

  const pageConfig = getPageConfig(subPage)

  // If invalid subPage, redirect to system logs
  if (!pageConfig) {
    return <Navigate to="/server-logs/system" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{pageConfig.icon}</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pageConfig.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {pageConfig.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <nav className="flex space-x-1" aria-label="Tabs">
                  {[
                    { name: 'System', href: '/server-logs/system', current: subPage === 'system' },
                    { name: 'Server', href: '/server-logs/server', current: subPage === 'server' },
                    { name: 'Application', href: '/server-logs/application', current: subPage === 'application' },
                    { name: 'Errors', href: '/server-logs/errors', current: subPage === 'errors' },
                    { name: 'Performance', href: '/server-logs/performance', current: subPage === 'performance' }
                  ].map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        tab.current
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {pageConfig.component}
        </div>
      </div>
    </div>
  )
}

export default ServerLogs 