import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  TrendingUp, 
  Settings, 
  BarChart3,
  Wallet,
  Activity,
  Tag,
  Store,
  Users,
  FileText,
  CreditCard,
  Bot,
  Building,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  User,
  UserCheck,
  UserPlus,
  Phone,
  UserCog,
  Target,
  PhoneCall,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  TrendingDown,
  History,
  Plus,
  PlusCircle,
  Gift,
  Minus,
  Mail,
  Layout,
  Bell,
  Menu,
  X,
} from 'lucide-react'

interface SidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onMobileClose, isCollapsed = false, onToggleCollapse }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    )
  }

  const navigation = [
    {
      name: 'General Setting',
      href: '/general-setting',
      icon: Home,
      subMenus: [
        { name: 'User', href: '/general-setting/user', icon: User },
        { name: 'Groups', href: '/general-setting/groups', icon: UserCheck },
        { name: 'Manager', href: '/general-setting/manager', icon: UserPlus },
        {
          name: 'Group Profiles',
          href: '/general-setting/group-profiles',
          icon: UserCog,
        },
        { name: 'Calls', href: '/general-setting/calls', icon: Phone },
        { name: 'Agents', href: '/general-setting/agents', icon: UserCog },
        { name: 'Leads', href: '/general-setting/leads', icon: Target },
        {
          name: 'Call Logs',
          href: '/general-setting/call-logs',
          icon: PhoneCall,
        },
        {
          name: 'Appointments',
          href: '/general-setting/appointments',
          icon: Calendar,
        },
      ],
    },
    {
      name: 'Labels',
      href: '/labels',
      icon: Tag,
      subMenus: [
        { name: 'Tags', href: '/labels/tags', icon: Tag },
        { name: 'Access Rights', href: '/labels/access-rights', icon: Shield },
      ],
    },
    {
      name: 'Markets',
      href: '/markets',
      icon: Store,
      subMenus: [
        { name: 'Market Overview', href: '/markets/overview', icon: BarChart3 },
        { name: 'Market Analysis', href: '/markets/analysis', icon: TrendingUp },
      ],
    },
    {
      name: 'Affiliate Users',
      href: '/affiliate-users',
      icon: Users,
      subMenus: [
        { name: 'All Affiliates', href: '/affiliate-users/all', icon: Users },
        { name: 'Add Affiliate', href: '/affiliate-users/add', icon: UserPlus },
      ],
    },
    {
      name: 'Trading',
      href: '/trading',
      icon: TrendingUp,
      subMenus: [
        { name: 'Active Trades', href: '/trading/active', icon: Activity },
        { name: 'Trade History', href: '/trading/history', icon: History },
      ],
    },
    {
      name: 'Transactions',
      href: '/transactions',
      icon: FileText,
      subMenus: [
        { name: 'All Transactions', href: '/transactions/all', icon: FileText },
        { name: 'Pending', href: '/transactions/pending', icon: Clock },
        { name: 'Completed', href: '/transactions/completed', icon: CheckCircle },
      ],
    },
    {
      name: 'Bot Trading',
      href: '/bot-trading',
      icon: Bot,
      subMenus: [
        { name: 'Bot Settings', href: '/bot-trading/settings', icon: Settings },
        { name: 'Bot Performance', href: '/bot-trading/performance', icon: TrendingUp },
      ],
    },
    {
      name: 'Bank Details',
      href: '/bank-details',
      icon: Building,
      subMenus: [
        {
          name: 'View Accounts',
          href: '/bank-details/view-accounts',
          icon: FileText,
        },
      ],
    },
    {
      name: 'Ticket',
      href: '/ticket',
      icon: MessageSquare,
      subMenus: [
        {
          name: 'All Tickets',
          href: '/ticket/all-tickets',
          icon: MessageSquare,
        },
      ],
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      subMenus: [
        { name: 'Exchange Settings', href: '/settings/exchange', icon: Store },
        { name: 'Email Settings', href: '/settings/email', icon: Mail },
        { name: 'Panel Settings', href: '/settings/panel', icon: Layout },
        {
          name: 'System Notifications',
          href: '/settings/notifications',
          icon: Bell,
        },
        { name: 'Promotion Settings', href: '/settings/promotion', icon: Gift },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden md:hidden sm:block"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:relative md:relative sm:fixed left-0 top-0 z-50 ${
        isCollapsed ? 'w-16 lg:w-16 md:w-16 sm:w-48' : 'w-64 lg:w-64 md:w-56 sm:w-48'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen flex-shrink-0 transition-all duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : 'lg:translate-x-0 md:translate-x-0 sm:-translate-x-full'
      }`}>
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl lg:text-xl md:text-lg sm:text-base font-bold text-gray-900 dark:text-white transition-opacity duration-300 ${
              isCollapsed ? 'opacity-0 lg:opacity-0 md:opacity-0 sm:opacity-100' : 'opacity-100'
            }`}>
              DTrader
            </span>
          </div>
          {/* Collapse Button - Desktop Only */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="lg:block md:block sm:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 lg:px-4 md:px-3 sm:px-2 py-6 lg:py-6 md:py-4 sm:py-3 space-y-2 overflow-y-auto">
          {navigation.map(item => {
            const Icon = item.icon
            const isExpanded = expandedMenus.includes(item.name)
            const hasSubMenus = item.subMenus && item.subMenus.length > 0

            return (
              <div key={item.name}>
                <button
                  onClick={() =>
                    hasSubMenus ? toggleMenu(item.name) : undefined
                  }
                  className={`w-full flex items-center justify-between px-3 lg:px-3 md:px-2 sm:px-1 py-2 lg:py-2 md:py-1.5 sm:py-1 text-sm lg:text-sm md:text-xs sm:text-xs font-medium rounded-md transition-colors ${
                    hasSubMenus
                      ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 mr-3 lg:mr-3 md:mr-2 sm:mr-1" />
                    <span className={`transition-opacity duration-300 ${
                      isCollapsed ? 'opacity-0 lg:opacity-0 md:opacity-0 sm:opacity-100' : 'opacity-100'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  {!isCollapsed && (hasSubMenus ? (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4 lg:w-4 lg:h-4 md:w-3 md:h-3 sm:w-2 sm:h-2" />
                    )
                  ) : (
                    <ChevronRight className="w-4 h-4 lg:w-4 lg:h-4 md:w-3 md:h-3 sm:w-2 sm:h-2" />
                  ))}
                </button>

                {/* Sub-menus */}
                {hasSubMenus && !isCollapsed && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-6 lg:ml-6 md:ml-4 sm:ml-2 mt-2 space-y-1">
                      {item.subMenus.map(subItem => {
                        const SubIcon = subItem.icon
                        return (
                          <NavLink
                            key={subItem.name}
                            to={subItem.href}
                            className={({ isActive }) =>
                              `flex items-center px-3 lg:px-3 md:px-2 sm:px-1 py-2 lg:py-2 md:py-1.5 sm:py-1 text-sm lg:text-sm md:text-xs sm:text-xs font-medium rounded-md transition-colors ${
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'
                              }`
                            }
                          >
                            <SubIcon className="w-4 h-4 lg:w-4 lg:h-4 md:w-3 md:h-3 sm:w-2 sm:h-2 mr-3 lg:mr-3 md:mr-2 sm:mr-1" />
                            <span className="lg:block md:block sm:hidden">{subItem.name}</span>
                          </NavLink>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 lg:p-4 md:p-3 sm:p-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3 lg:space-x-3 md:space-x-2 sm:space-x-1 min-w-0">
            <div className="w-8 h-8 lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-5 sm:h-5 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm lg:text-sm md:text-xs sm:text-xs font-medium text-white">JD</span>
            </div>
            <div className={`flex-1 min-w-0 transition-opacity duration-300 overflow-hidden ${
              isCollapsed ? 'opacity-0 lg:opacity-0 md:opacity-0 sm:opacity-100' : 'opacity-100 lg:block md:block sm:hidden'
            }`}>
              <p className="text-sm lg:text-sm md:text-xs sm:text-xs font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs lg:text-xs md:text-xs sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
