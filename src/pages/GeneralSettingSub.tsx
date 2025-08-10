import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Users,
  Bookmark,
  Bot,
  Triangle,
  Settings,
  RefreshCw,
  Plus,
  User,
  Bell,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  CreditCard,
  BarChart3,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  X
} from 'lucide-react'
import DataTable from '../components/DataTable/DataTable'

const GeneralSettingSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  
  // Filter states
  const [searchFilter, setSearchFilter] = useState('')
  const [activeUsersFilter, setActiveUsersFilter] = useState('')
  const [domainFilter, setDomainFilter] = useState('')
  const [groupFilter, setGroupFilter] = useState('')
  const [botSettingsFilter, setBotSettingsFilter] = useState('')
  const [pageLimitFilter, setPageLimitFilter] = useState('10')
  const [userCreatedAtFilter, setUserCreatedAtFilter] = useState('')

  // Mock statistics data
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Users', value: '892', change: '+8%', icon: CheckCircle, color: 'green' },
    { title: 'Bot Users', value: '567', change: '+15%', icon: Bot, color: 'purple' },
    { title: 'Revenue', value: '$45,678', change: '+23%', icon: CreditCard, color: 'emerald' },
    { title: 'Avg. Balance', value: '$2,456', change: '+5%', icon: BarChart3, color: 'orange' },
    { title: 'Success Rate', value: '94.2%', change: '+2%', icon: TrendingUp, color: 'teal' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
      orange: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      teal: 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  User Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  Manage and monitor all user accounts and trading activities
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{stat.value}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${getColorClasses(stat.color)}`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-3 sm:mt-4">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 truncate">{stat.change}</span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 hidden sm:inline">from last month</span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 sm:hidden">vs last month</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-3 sm:space-y-0"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Refine your search with multiple criteria</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">0 active filters</span>
              {filterPanelOpen ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              )}
            </div>
          </div>

          {filterPanelOpen && (
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or account ID..."
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">


                {/* Active Users Only */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Active Users Only</label>
                  <div className="relative">
                    <select 
                      value={activeUsersFilter}
                      onChange={(e) => setActiveUsersFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Users</option>
                      <option value="active">Active Users Only</option>
                      <option value="inactive">Inactive Users Only</option>
                    </select>
                    {activeUsersFilter && (
                      <button 
                        onClick={() => setActiveUsersFilter('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* All Domain */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">All Domain</label>
                  <div className="relative">
                    <select 
                      value={domainFilter}
                      onChange={(e) => setDomainFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Domain</option>
                      <option value="dtrader">DTrader</option>
                      <option value="mt4">MT4</option>
                      <option value="mt5">MT5</option>
                    </select>
                    {domainFilter && (
                      <button 
                        onClick={() => setDomainFilter('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* All Groups */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">All Groups</label>
                  <div className="relative">
                    <select 
                      value={groupFilter}
                      onChange={(e) => setGroupFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Groups</option>
                      <option value="whatsapp">Whatsapp.</option>
                      <option value="default">DefaultGro</option>
                      <option value="premium">Premium</option>
                      <option value="vip">VIP</option>
                    </select>
                    {groupFilter && (
                      <button 
                        onClick={() => setGroupFilter('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* All Bot Settings */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">All Bot Settings</label>
                  <div className="relative">
                    <select 
                      value={botSettingsFilter}
                      onChange={(e) => setBotSettingsFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Bot Settings</option>
                      <option value="enabled">Bot Enabled</option>
                      <option value="disabled">Bot Disabled</option>
                      <option value="active">Bot Active</option>
                      <option value="inactive">Bot Inactive</option>
                    </select>
                    {botSettingsFilter && (
                      <button 
                        onClick={() => setBotSettingsFilter('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Page Limit */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Page Limit (10)</label>
                  <div className="relative">
                    <select 
                      value={pageLimitFilter}
                      onChange={(e) => setPageLimitFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="50">50 per page</option>
                      <option value="100">100 per page</option>
                    </select>
                    {pageLimitFilter !== '10' && (
                      <button 
                        onClick={() => setPageLimitFilter('10')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* User Created At */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User Created At</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={userCreatedAtFilter}
                      onChange={(e) => setUserCreatedAtFilter(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                    {userCreatedAtFilter && (
                      <button 
                        onClick={() => setUserCreatedAtFilter('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Showing 1-10 of 1,234 results
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">0 active filters</span>
                    <button className="text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button className="px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm sm:text-base">
                    Reset
                  </button>
                  <button className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <DataTable />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Create a new user account with all necessary details</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 self-end sm:self-auto"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Account Settings Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Account Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* User Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User Name</label>
                    <input
                      type="text"
                      placeholder="Enter User Name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      placeholder="Your valid email.."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      />
                      <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Minimum Margin Level Call % */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Margin Level Call %</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Group */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Group <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="DefaultGroup">DefaultGroup</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  {/* Domain */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Domain <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="dtrader"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Assign Tags */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Assign Tags <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="0 Tags selected"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Platform Access Rights */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Platform Access Rights <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Full Access">Full Access</option>
                      <option value="Limited Access">Limited Access</option>
                      <option value="Read Only">Read Only</option>
                    </select>
                  </div>

                  {/* User's Panel Access Right */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User's Panel Access Right <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Default User_panel">Default User_panel</option>
                      <option value="Admin Panel">Admin Panel</option>
                      <option value="Custom Panel">Custom Panel</option>
                    </select>
                  </div>

                  {/* Leverage */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Leverage</label>
                    <input
                      type="text"
                      defaultValue="1:100"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Max Leverage */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Max Leverage</label>
                    <input
                      type="text"
                      defaultValue="1:1000"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Account Type */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="CFD Hedging">CFD Hedging</option>
                      <option value="CFD Netting">CFD Netting</option>
                      <option value="Standard">Standard</option>
                    </select>
                  </div>

                  {/* Total margin calculation Type */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Total margin calculation Type</label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Sum">Sum</option>
                      <option value="Net">Net</option>
                      <option value="Gross">Gross</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Currency <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="EUR"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Account Details Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+92-3001234543"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                    <input
                      type="text"
                      placeholder="Enter your city name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
                    <input
                      type="text"
                      defaultValue="Description"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Country <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-4 sm:px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneralSettingSub