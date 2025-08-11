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
  X,
  UserCheck,
  UserPlus,
  UserCog,
  Target,
  PhoneCall,
  AlertTriangle
} from 'lucide-react'
import DataTable from '../components/DataTable/DataTable'
import GroupsTable from '../components/DataTable/GroupsTable'

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

  // Get page configuration based on subPage
  const getPageConfig = () => {
    switch (subPage) {
      case 'groups':
        return {
          title: 'Group Management',
          description: 'Manage and monitor all trading groups and their settings',
          icon: UserCheck,
          color: 'purple',
          stats: [
            { title: 'Total Groups', value: '5', change: '+1', icon: UserCheck, color: 'purple' },
            { title: 'Active Groups', value: '4', change: '+0', icon: CheckCircle, color: 'green' },
            { title: 'Total Members', value: '155', change: '+12', icon: Users, color: 'blue' },
            { title: 'Total Balance', value: '$5.37M', change: '+8%', icon: CreditCard, color: 'emerald' },
            { title: 'Avg. Members', value: '31', change: '+2', icon: BarChart3, color: 'orange' },
            { title: 'Success Rate', value: '96.8%', change: '+1%', icon: TrendingUp, color: 'teal' }
          ]
        }
      case 'manager':
        return {
          title: 'Manager Management',
          description: 'Manage and monitor all manager accounts and permissions',
          icon: UserPlus,
          color: 'blue',
          stats: [
            { title: 'Total Managers', value: '12', change: '+2', icon: UserPlus, color: 'blue' },
            { title: 'Active Managers', value: '10', change: '+1', icon: CheckCircle, color: 'green' },
            { title: 'Managed Users', value: '234', change: '+15', icon: Users, color: 'purple' },
            { title: 'Total Revenue', value: '$12.5K', change: '+18%', icon: CreditCard, color: 'emerald' },
            { title: 'Avg. Performance', value: '94.2%', change: '+3%', icon: BarChart3, color: 'orange' },
            { title: 'Success Rate', value: '97.1%', change: '+2%', icon: TrendingUp, color: 'teal' }
          ]
        }
      case 'group-profiles':
        return {
          title: 'Group Profiles',
          description: 'Manage group profiles and configuration settings',
          icon: UserCog,
          color: 'indigo',
          stats: [
            { title: 'Total Profiles', value: '8', change: '+1', icon: UserCog, color: 'indigo' },
            { title: 'Active Profiles', value: '7', change: '+0', icon: CheckCircle, color: 'green' },
            { title: 'Custom Settings', value: '23', change: '+3', icon: Settings, color: 'purple' },
            { title: 'Profile Usage', value: '89%', change: '+5%', icon: BarChart3, color: 'emerald' },
            { title: 'Avg. Configs', value: '12', change: '+2', icon: Activity, color: 'orange' },
            { title: 'Success Rate', value: '95.3%', change: '+1%', icon: TrendingUp, color: 'teal' }
          ]
        }
      case 'calls':
        return {
          title: 'Call Management',
          description: 'Manage and monitor all call activities and recordings',
          icon: Phone,
          color: 'green',
          stats: [
            { title: 'Total Calls', value: '156', change: '+23', icon: Phone, color: 'green' },
            { title: 'Active Calls', value: '8', change: '+2', icon: PhoneCall, color: 'blue' },
            { title: 'Call Duration', value: '2.3h', change: '+0.5h', icon: Clock, color: 'purple' },
            { title: 'Success Rate', value: '87%', change: '+3%', icon: TrendingUp, color: 'emerald' },
            { title: 'Avg. Rating', value: '4.6', change: '+0.2', icon: Star, color: 'orange' },
            { title: 'Response Time', value: '2.1m', change: '-0.3m', icon: Activity, color: 'teal' }
          ]
        }
      case 'agents':
        return {
          title: 'Agent Management',
          description: 'Manage and monitor all support agents and their performance',
          icon: UserCog,
          color: 'teal',
          stats: [
            { title: 'Total Agents', value: '18', change: '+3', icon: UserCog, color: 'teal' },
            { title: 'Active Agents', value: '15', change: '+2', icon: CheckCircle, color: 'green' },
            { title: 'Tickets Handled', value: '89', change: '+12', icon: Activity, color: 'blue' },
            { title: 'Avg. Rating', value: '4.7', change: '+0.1', icon: Star, color: 'emerald' },
            { title: 'Response Time', value: '1.8m', change: '-0.2m', icon: Clock, color: 'orange' },
            { title: 'Success Rate', value: '93.2%', change: '+2%', icon: TrendingUp, color: 'purple' }
          ]
        }
      case 'leads':
        return {
          title: 'Lead Management',
          description: 'Manage and track all potential leads and conversions',
          icon: Target,
          color: 'orange',
          stats: [
            { title: 'Total Leads', value: '234', change: '+18', icon: Target, color: 'orange' },
            { title: 'New Leads', value: '45', change: '+8', icon: UserPlus, color: 'blue' },
            { title: 'Converted', value: '67', change: '+12', icon: CheckCircle, color: 'green' },
            { title: 'Conversion Rate', value: '28.6%', change: '+2.1%', icon: TrendingUp, color: 'emerald' },
            { title: 'Avg. Value', value: '$2.3K', change: '+$150', icon: CreditCard, color: 'purple' },
            { title: 'Response Time', value: '3.2m', change: '-0.5m', icon: Clock, color: 'teal' }
          ]
        }
      case 'call-logs':
        return {
          title: 'Call Logs',
          description: 'View and analyze detailed call logs and history',
          icon: PhoneCall,
          color: 'cyan',
          stats: [
            { title: 'Total Logs', value: '1,234', change: '+89', icon: PhoneCall, color: 'cyan' },
            { title: 'Today\'s Calls', value: '23', change: '+5', icon: Phone, color: 'blue' },
            { title: 'Avg. Duration', value: '4.2m', change: '+0.3m', icon: Clock, color: 'purple' },
            { title: 'Success Rate', value: '91%', change: '+2%', icon: TrendingUp, color: 'emerald' },
            { title: 'Follow-ups', value: '45', change: '+8', icon: RefreshCw, color: 'orange' },
            { title: 'Quality Score', value: '8.7', change: '+0.2', icon: Star, color: 'teal' }
          ]
        }
      case 'appointments':
        return {
          title: 'Appointment Management',
          description: 'Schedule and manage all client appointments and meetings',
          icon: Calendar,
          color: 'pink',
          stats: [
            { title: 'Total Appointments', value: '89', change: '+12', icon: Calendar, color: 'pink' },
            { title: 'Today\'s Meetings', value: '7', change: '+2', icon: Clock, color: 'blue' },
            { title: 'Confirmed', value: '67', change: '+8', icon: CheckCircle, color: 'green' },
            { title: 'Pending', value: '12', change: '+3', icon: AlertCircle, color: 'orange' },
            { title: 'Cancelled', value: '3', change: '-1', icon: XCircle, color: 'red' },
            { title: 'Success Rate', value: '94.4%', change: '+1%', icon: TrendingUp, color: 'teal' }
          ]
        }
      default:
        return {
          title: 'User Management',
          description: 'Manage and monitor all user accounts and trading activities',
          icon: Users,
          color: 'blue',
          stats: [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Users', value: '892', change: '+8%', icon: CheckCircle, color: 'green' },
    { title: 'Bot Users', value: '567', change: '+15%', icon: Bot, color: 'purple' },
    { title: 'Revenue', value: '$45,678', change: '+23%', icon: CreditCard, color: 'emerald' },
    { title: 'Avg. Balance', value: '$2,456', change: '+5%', icon: BarChart3, color: 'orange' },
    { title: 'Success Rate', value: '94.2%', change: '+2%', icon: TrendingUp, color: 'teal' }
  ]
        }
    }
  }

  const pageConfig = getPageConfig()

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
      orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
      indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
      cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
      pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  // Render appropriate content based on subPage
  const renderContent = () => {
    switch (subPage) {
      case 'groups':
        return <GroupsTable />
      case 'user':
      default:
  return (
          <>
        {/* Advanced Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-2 sm:space-y-3 lg:space-y-0"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h2>
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
            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or account ID..."
                  className="w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {/* Active Users Only */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Active Users Only</label>
                  <div className="relative">
                    <select 
                      value={activeUsersFilter}
                      onChange={(e) => setActiveUsersFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Users</option>
                      <option value="active">Active Users Only</option>
                      <option value="inactive">Inactive Users Only</option>
                    </select>
                    {activeUsersFilter && (
                      <button 
                        onClick={() => setActiveUsersFilter('')}
                        className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* All Domain */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">All Domain</label>
                  <div className="relative">
                    <select 
                      value={domainFilter}
                      onChange={(e) => setDomainFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Domains</option>
                      <option value="domain1.com">domain1.com</option>
                      <option value="domain2.com">domain2.com</option>
                      <option value="domain3.com">domain3.com</option>
                    </select>
                    {domainFilter && (
                      <button 
                        onClick={() => setDomainFilter('')}
                        className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Group */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Group</label>
                  <div className="relative">
                    <select 
                      value={groupFilter}
                      onChange={(e) => setGroupFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Groups</option>
                      <option value="DefaultGro">Default Group</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                      <option value="Standard">Standard</option>
                    </select>
                    {groupFilter && (
                      <button 
                        onClick={() => setGroupFilter('')}
                        className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bot Settings */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Bot Settings</label>
                  <div className="relative">
                    <select 
                      value={botSettingsFilter}
                      onChange={(e) => setBotSettingsFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="">All Bot Settings</option>
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                    {botSettingsFilter && (
                      <button 
                        onClick={() => setBotSettingsFilter('')}
                        className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Page Limit */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Page Limit</label>
                  <div className="relative">
                    <select 
                      value={pageLimitFilter}
                      onChange={(e) => setPageLimitFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-6 sm:pr-8 lg:pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="50">50 per page</option>
                      <option value="100">100 per page</option>
                    </select>
                  </div>
                </div>

                {/* User Created At */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User Created At</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={userCreatedAtFilter}
                      onChange={(e) => setUserCreatedAtFilter(e.target.value)}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                    {userCreatedAtFilter && (
                      <button 
                        onClick={() => setUserCreatedAtFilter('')}
                        className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                
                
              
                
                
                
              </div>
            </div>
          )}
        </div>

            {/* Data Table */}
            <DataTable />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${getColorClasses(pageConfig.color)}`}>
                <pageConfig.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {pageConfig.title}
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {pageConfig.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {pageConfig.stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-2 sm:mr-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</p>
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{stat.value}</p>
                  </div>
                  <div className={`p-1.5 sm:p-2 lg:p-3 rounded-lg flex-shrink-0 ${getColorClasses(stat.color)}`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-2 sm:mt-3 lg:mt-4">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 truncate">{stat.change}</span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 hidden sm:inline">from last month</span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 sm:hidden">vs last month</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Content based on subPage */}
        {renderContent()}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-3 lg:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Create a new user account with all necessary details</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 self-end sm:self-auto"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Account Settings Section */}
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6">Account Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {/* User Name */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User Name</label>
                    <input
                      type="text"
                      placeholder="Enter User Name"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      placeholder="Your valid email.."
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 pr-8 sm:pr-10 lg:pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      />
                      <button className="absolute right-1.5 sm:right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Minimum Margin Level Call % */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Margin Level Call %</label>
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Group */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Group <span className="text-red-500">*</span></label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="DefaultGroup">DefaultGroup</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  {/* Domain */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Domain <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="dtrader"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Assign Tags */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Assign Tags <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="0 Tags selected"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Platform Access Rights */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Platform Access Rights <span className="text-red-500">*</span></label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Full Access">Full Access</option>
                      <option value="Limited Access">Limited Access</option>
                      <option value="Read Only">Read Only</option>
                    </select>
                  </div>

                  {/* User's Panel Access Right */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">User's Panel Access Right <span className="text-red-500">*</span></label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Default User_panel">Default User_panel</option>
                      <option value="Admin Panel">Admin Panel</option>
                      <option value="Custom Panel">Custom Panel</option>
                    </select>
                  </div>

                  {/* Leverage */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Leverage</label>
                    <input
                      type="text"
                      defaultValue="1:100"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Max Leverage */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Max Leverage</label>
                    <input
                      type="text"
                      defaultValue="1:1000"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Account Type */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="CFD Hedging">CFD Hedging</option>
                      <option value="CFD Netting">CFD Netting</option>
                      <option value="Standard">Standard</option>
                    </select>
                  </div>

                  {/* Total margin calculation Type */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Total margin calculation Type</label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
                      <option value="Sum">Sum</option>
                      <option value="Net">Net</option>
                      <option value="Gross">Gross</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Currency <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      defaultValue="EUR"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Account Details Section */}
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {/* First Name */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+92-3001234543"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                    <input
                      type="text"
                      placeholder="Enter your city name"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state name"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
                    <input
                      type="text"
                      defaultValue="Description"
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Country <span className="text-red-500">*</span></label>
                    <select className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-3 sm:px-4 lg:px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button className="px-3 sm:px-4 lg:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
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