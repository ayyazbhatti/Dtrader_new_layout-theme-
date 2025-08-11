import React from 'react'

/**
 * Demo component showcasing the new professional table footer styles
 * This demonstrates the improved design and responsiveness
 */
const TableFooterDemo: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Professional Table Footer Demo
        </h1>
        
        <div className="space-y-8">
          {/* Main DataTable Footer */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Main DataTable Footer
              </h2>
              <div className="table-footer">
                <div className="table-footer-content">
                  {/* Left side - Results info and page size selector */}
                  <div className="table-footer-left">
                    <span className="results-info">
                      Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">10</span> of{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">24</span> results
                    </span>
                    
                    {/* Page size selector */}
                    <div className="page-size-selector">
                      <span className="page-size-label">Show:</span>
                      <select className="page-size-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </select>
                      <span className="page-size-label">per page</span>
                    </div>
                  </div>

                  {/* Right side - Pagination controls */}
                  <div className="table-footer-right">
                    {/* Page numbers */}
                    <div className="pagination-container">
                      <button className="pagination-button active">1</button>
                      <button className="pagination-button">2</button>
                      <button className="pagination-button">3</button>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center space-x-2">
                      {/* First/Previous buttons */}
                      <div className="flex items-center space-x-1">
                        <button className="pagination-nav" title="First page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="pagination-nav" title="Previous page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Next/Last buttons */}
                      <div className="flex items-center space-x-1">
                        <button className="pagination-nav" title="Next page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button className="pagination-nav" title="Last page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GroupsTable Footer */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                GroupsTable Footer
              </h2>
              <div className="table-footer">
                <div className="table-footer-content">
                  {/* Left side - Results info and page size selector */}
                  <div className="table-footer-left">
                    <span className="results-info">
                      Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">5</span> of{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">15</span> results
                    </span>
                    
                    {/* Page size selector */}
                    <div className="page-size-selector">
                      <span className="page-size-label">Show:</span>
                      <select className="page-size-select">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                      <span className="page-size-label">entries</span>
                    </div>
                  </div>

                  {/* Right side - Pagination controls */}
                  <div className="table-footer-right">
                    {/* Page numbers */}
                    <div className="pagination-container">
                      <button className="pagination-button active">1</button>
                      <span className="px-1 text-gray-500">...</span>
                      <button className="pagination-button">3</button>
                      <button className="pagination-button">4</button>
                      <span className="px-1 text-gray-500">...</span>
                      <button className="pagination-button">15</button>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center space-x-2">
                      {/* First/Previous buttons */}
                      <div className="flex items-center space-x-1">
                        <button className="pagination-nav" title="First Page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="pagination-nav" title="Previous Page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Next/Last buttons */}
                      <div className="flex items-center space-x-1">
                        <button className="pagination-nav" title="Next Page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button className="pagination-nav" title="Last Page">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UserDetailsPopup Footer */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                UserDetailsPopup Footer
              </h2>
              <div className="table-footer">
                <div className="table-footer-content">
                  {/* Left side - Results info and page size selector */}
                  <div className="table-footer-left">
                    <span className="results-info">
                      Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">10</span> of{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">45</span> entries
                    </span>
                    
                    {/* Page size selector */}
                    <div className="page-size-selector">
                      <span className="page-size-label">Show:</span>
                      <select className="page-size-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </select>
                      <span className="page-size-label">entries</span>
                    </div>
                  </div>
                  
                  {/* Right side - Pagination controls */}
                  <div className="table-footer-right">
                    <div className="flex items-center space-x-2">
                      <button className="pagination-nav">
                        Previous
                      </button>
                      <button className="pagination-nav">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Features Demo */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Responsive Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Mobile Optimizations</h3>
                  <ul className="space-y-1">
                    <li>• Touch-friendly button sizes (44px minimum)</li>
                    <li>• Stacked layout on small screens</li>
                    <li>• Optimized spacing and typography</li>
                    <li>• Improved mobile scrolling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Professional Styling</h3>
                  <ul className="space-y-1">
                    <li>• Consistent color scheme</li>
                    <li>• Smooth hover transitions</li>
                    <li>• Focus states for accessibility</li>
                    <li>• Dark mode support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableFooterDemo 