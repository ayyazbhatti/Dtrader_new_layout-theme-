import React from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from 'lucide-react'
import TagsTable from '../components/DataTable/TagsTable'
import AccessRightsTable from '../components/DataTable/AccessRightsTable'

const LabelsSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      tags: 'Tags Management',
      'access-rights': 'Access Rights',
    }
    return titles[subPage || ''] || 'Labels'
  }

  // Render content based on subPage
  const renderContent = () => {
    console.log('Current subPage:', subPage) // Debug log
    
    switch (subPage) {
      case 'tags':
        return <TagsTable />
      case 'access-rights':
        console.log('Rendering AccessRightsTable') // Debug log
        return <AccessRightsTable />
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Labels Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select a sub-category from the navigation to manage specific label types.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Tag className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getPageTitle(subPage)}
        </h1>
      </div>

      {renderContent()}
    </div>
  )
}

export default LabelsSub
