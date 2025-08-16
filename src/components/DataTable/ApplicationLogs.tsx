import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Activity,
  User,
  Database,
  FileText,
  Eye,
  Trash2,
  Settings,
  BarChart3,
  X
} from 'lucide-react'

interface ApplicationLog {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug'
  category: 'user-action' | 'business-logic' | 'data-access' | 'api-call' | 'performance' | 'validation'
  message: string
  userId?: string
  sessionId?: string
  ipAddress?: string
  userAgent?: string
  details: string
  tags: string[]
}

const ApplicationLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [columnVisibility, setColumnVisibility] = useState({
    timestamp: true,
    level: true,
    category: true,
    message: true,
    userId: true,
    details: true,
    actions: true
  })

  // Mock application logs data
  const mockApplicationLogs: ApplicationLog[] = [
    {
      id: '1',
      timestamp: '2024-12-19 15:30:45',
      level: 'info',
      category: 'user-action',
      message: 'User login successful',
      userId: 'user123',
      sessionId: 'sess_456',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'User john.doe@example.com logged in successfully',
      tags: ['login', 'authentication', 'success']
    },
    {
      id: '2',
      timestamp: '2024-12-19 15:28:12',
      level: 'info',
      category: 'business-logic',
      message: 'Trade order created',
      userId: 'user123',
      sessionId: 'sess_456',
      ipAddress: '192.168.1.100',
      details: 'Buy order for 100 BTC at $45,000 created successfully',
      tags: ['trade', 'order', 'buy', 'btc']
    },
    {
      id: '3',
      timestamp: '2024-12-19 15:25:33',
      level: 'warning',
      category: 'validation',
      message: 'Invalid input data detected',
      userId: 'user456',
      sessionId: 'sess_789',
      ipAddress: '192.168.1.101',
      details: 'Email format validation failed for user input',
      tags: ['validation', 'email', 'input']
    },
    {
      id: '4',
      timestamp: '2024-12-19 15:22:18',
      level: 'error',
      category: 'data-access',
      message: 'Database query failed',
      userId: 'user789',
      sessionId: 'sess_012',
      ipAddress: '192.168.1.102',
      details: 'Failed to retrieve user profile data: Connection timeout',
      tags: ['database', 'query', 'timeout']
    },
    {
      id: '5',
      timestamp: '2024-12-19 15:20:05',
      level: 'info',
      category: 'api-call',
      message: 'External API call successful',
      userId: 'user123',
      sessionId: 'sess_456',
      ipAddress: '192.168.1.100',
      details: 'Payment gateway API call completed in 250ms',
      tags: ['api', 'payment', 'external']
    },
    {
      id: '6',
      timestamp: '2024-12-19 15:18:42',
      level: 'debug',
      category: 'performance',
      message: 'Page load time recorded',
      userId: 'user456',
      sessionId: 'sess_789',
      ipAddress: '192.168.1.101',
      details: 'Dashboard page loaded in 1.2 seconds',
      tags: ['performance', 'page-load', 'dashboard']
    }
  ]

  // Filtered logs based on search and filters
  const filteredLogs = useMemo(() => {
    return mockApplicationLogs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesLevel = levelFilter === 'all' || log.level === levelFilter
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter
      
      return matchesSearch && matchesLevel && matchesCategory
    })
  }, [mockApplicationLogs, searchTerm, levelFilter, categoryFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const totalLogs = mockApplicationLogs.length
    const infoLogs = mockApplicationLogs.filter(l => l.level === 'info').length
    const warningLogs = mockApplicationLogs.filter(l => l.level === 'warning').length
    const errorLogs = mockApplicationLogs.filter(l => l.level === 'error').length
    const criticalLogs = mockApplicationLogs.filter(l => l.level === 'critical').length
    const debugLogs = mockApplicationLogs.filter(l => l.level === 'debug').length
    
    return {
      totalLogs,
      infoLogs,
      warningLogs,
      errorLogs,
      criticalLogs,
      debugLogs
    }
  }, [mockApplicationLogs])

  const getLevelClass = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'critical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'debug': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'critical': return <AlertTriangle className="w-4 h-4 text-purple-500" />
      case 'debug': return <Settings className="w-4 h-4 text-gray-500" />
      default: return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user-action': return <User className="w-4 h-4 text-blue-500" />
      case 'business-logic': return <Activity className="w-4 h-4 text-green-500" />
      case 'data-access': return <Database className="w-4 h-4 text-orange-500" />
      case 'api-call': return <FileText className="w-4 h-4 text-purple-500" />
      case 'performance': return <BarChart3 className="w-4 h-4 text-indigo-500" />
      case 'validation': return <CheckCircle className="w-4 h-4 text-yellow-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }))
  }

  const toggleColumnVisibility = () => {
    setShowColumnVisibility(!showColumnVisibility)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Logs</p>
              <p className="text-2xl font-bold text-white">{stats.totalLogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Info</p>
              <p className="text-2xl font-bold text-white">{stats.infoLogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Warnings</p>
              <p className="text-2xl font-bold text-white">{stats.warningLogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Errors</p>
              <p className="text-2xl font-bold text-white">{stats.errorLogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-white">{stats.criticalLogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gray-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Debug</p>
              <p className="text-2xl font-bold text-white">{stats.debugLogs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Export Logs - Download log data as CSV/Excel"
              onClick={() => console.log('Export Logs clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Logs
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Refresh Logs - Update log data"
              onClick={() => console.log('Refresh Logs clicked')}
            >
              <RefreshCw className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Refresh Logs
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Column Visibility - Show/hide table columns"
              onClick={toggleColumnVisibility}
            >
              <Eye className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Column Visibility
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search application logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="critical">Critical</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="user-action">User Action</option>
                  <option value="business-logic">Business Logic</option>
                  <option value="data-access">Data Access</option>
                  <option value="api-call">API Call</option>
                  <option value="performance">Performance</option>
                  <option value="validation">Validation</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setLevelFilter('all')
                    setCategoryFilter('all')
                  }}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.timestamp && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Timestamp</th>
                )}
                {columnVisibility.level && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Level</th>
                )}
                {columnVisibility.category && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Category</th>
                )}
                {columnVisibility.message && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '250px', minWidth: '250px' }}>Message</th>
                )}
                {columnVisibility.userId && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>User ID</th>
                )}
                {columnVisibility.details && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>Details</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px', minWidth: '100px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.timestamp && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{log.timestamp}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.level && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelClass(log.level)}`}>
                          {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                        </span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.category && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(log.category)}
                        <span className="text-gray-900 dark:text-white capitalize">{log.category.replace('-', ' ')}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.message && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '250px', minWidth: '250px' }}>
                      <div className="text-gray-900 dark:text-white font-medium truncate" title={log.message}>{log.message}</div>
                    </td>
                  )}
                  
                  {columnVisibility.userId && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-blue-500" />
                        <span className="text-gray-900 dark:text-white font-mono">{log.userId || 'N/A'}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.details && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '200px', minWidth: '200px' }}>
                      <div className="text-gray-900 dark:text-white truncate" title={log.details}>{log.details}</div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => console.log('View log details:', log.id)}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => console.log('Delete log:', log.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Log"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredLogs.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{mockApplicationLogs.length}</span> application logs
              </span>
            </div>
            <div className="table-footer-right">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Page 1 of 1</span>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Column Visibility</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show or hide table columns</p>
                </div>
              </div>
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {Object.entries(columnVisibility).map(([column, visible]) => (
                <label key={column} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => handleColumnVisibilityChange(column, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {column.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationLogs 