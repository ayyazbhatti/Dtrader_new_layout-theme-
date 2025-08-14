import React from 'react'
import { useParams } from 'react-router-dom'
import { Store } from 'lucide-react'
import SymbolsTable from '../components/DataTable/SymbolsTable'
import AssetsTable from '../components/DataTable/AssetsTable'
import SwapsTable from '../components/DataTable/SwapsTable'
import PriceStreamsTable from '../components/DataTable/PriceStreamsTable'

const MarketsSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      symbols: 'Symbols',
      assets: 'Assets',
      swaps: 'Swaps',
      'price-streams': 'Price Streams',
    }
    return titles[subPage || ''] || 'Markets'
  }

  // Check if the subPage is valid
  const isValidSubPage = (subPage: string | undefined) => {
    const validPages = ['symbols', 'assets', 'swaps', 'price-streams']
    return subPage && validPages.includes(subPage)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Store className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getPageTitle(subPage)}
        </h1>
      </div>

      {!isValidSubPage(subPage) ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              The requested market page could not be found. Please check the URL and try again.
            </p>
            
            <div className="inline-flex items-center space-x-2 px-4 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-lg">
              <span className="text-sm font-medium">404 Error</span>
            </div>
          </div>
        </div>
      ) : subPage === 'symbols' ? (
        <SymbolsTable />
      ) : subPage === 'assets' ? (
        <AssetsTable />
      ) : subPage === 'swaps' ? (
        <SwapsTable />
      ) : subPage === 'price-streams' ? (
        <PriceStreamsTable />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {getPageTitle(subPage)}
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              This page is under development. The {getPageTitle(subPage || '').toLowerCase()} functionality will be implemented soon.
            </p>
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketsSub
