import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Search, 
  ChevronUp, 
  ChevronDown,
  Users,
  Bookmark,
  Bot,
  Triangle,
  Settings,
  RefreshCw,
  Plus,
  User,
  Filter,
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
  Info
} from 'lucide-react'
import DataTable from '../components/DataTable/DataTable'

const GeneralSettingSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()
  const [filterPanelOpen, setFilterPanelOpen] = useState(true)

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
        <div className="px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    User Management
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Manage and monitor all user accounts and trading activities
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Filter Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Refine your search with multiple criteria</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">3 active filters</span>
              {filterPanelOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>

          {filterPanelOpen && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or account ID..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    User Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>All Users</option>
                    <option>Active Users</option>
                    <option>Inactive Users</option>
                    <option>Online Users</option>
                    <option>Offline Users</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Bot className="w-4 h-4 mr-2 text-purple-500" />
                    Bot Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>All Bot Status</option>
                    <option>Bot Enabled</option>
                    <option>Bot Disabled</option>
                    <option>Bot Active</option>
                    <option>Bot Inactive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    User Group
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>All Groups</option>
                    <option>Whatsapp.</option>
                    <option>DefaultGro</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    Created Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2 text-emerald-500" />
                    Balance Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-teal-500" />
                    PnL Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>All PnL</option>
                    <option>Positive PnL</option>
                    <option>Negative PnL</option>
                    <option>Zero PnL</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-indigo-500" />
                    Subscription
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>All Subscriptions</option>
                    <option>Subscribed</option>
                    <option>Not Subscribed</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-red-500" />
                    Page Size
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option>10 per page</option>
                    <option>25 per page</option>
                    <option>50 per page</option>
                    <option>100 per page</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing 1-10 of 1,234 results
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">3 active filters</span>
                    <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    Reset
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
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
    </div>
  )
}

export default GeneralSettingSub