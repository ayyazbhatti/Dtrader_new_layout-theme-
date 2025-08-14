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
  RefreshCw,
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
        { name: 'Symbols', href: '/markets/symbols', icon: Tag },
        { name: 'Assets', href: '/markets/assets', icon: Building },
        { name: 'Swaps', href: '/markets/swaps', icon: RefreshCw },
        { name: 'Price Streams', href: '/markets/price-streams', icon: TrendingUp },
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:relative left-0 top-0 z-50 h-screen transition-all duration-300 ease-in-out ${
        // Mobile: Always full width when open, hidden when closed
        isMobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
      } ${
        // Desktop: Collapsible behavior
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0`}>
        
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold text-gray-900 dark:text-white transition-opacity duration-300 ${
              isCollapsed ? 'lg:opacity-0' : 'opacity-100'
            }`}>
              DTrader
            </span>
          </div>
          
          {/* Collapse Button - Desktop Only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    hasSubMenus
                      ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className={`transition-opacity duration-300 ${
                      isCollapsed ? 'lg:opacity-0' : 'opacity-100'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  {!isCollapsed && hasSubMenus && (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  )}
                </button>

                {/* Sub-menus */}
                {hasSubMenus && !isCollapsed && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subMenus.map(subItem => {
                        const SubIcon = subItem.icon
                        return (
                          <NavLink
                            key={subItem.name}
                            to={subItem.href}
                            onClick={onMobileClose} // Close mobile menu when clicking submenu
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'
                              }`
                            }
                          >
                            <SubIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <span>{subItem.name}</span>
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
            <div className={`flex-1 min-w-0 transition-opacity duration-300 overflow-hidden ${
              isCollapsed ? 'lg:opacity-0' : 'opacity-100'
            }`}>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
 