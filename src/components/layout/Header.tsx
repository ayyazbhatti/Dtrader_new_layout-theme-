import React from 'react'
import {
  Bell,
  Search,
  Settings,
  User,
  TrendingUp,
  Sun,
  Moon,
  Menu,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 lg:px-6 md:px-4 sm:px-2 py-4 lg:py-4 md:py-3 sm:py-2">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 lg:space-x-4 md:space-x-3 sm:space-x-2 min-w-0">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMobileMenuToggle}
            className="block sm:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl lg:text-2xl md:text-xl sm:text-base font-bold text-gray-900 dark:text-white truncate flex-1 min-w-0">
            Dashboard
          </h1>
          <div className="flex items-center space-x-2 lg:space-x-2 md:space-x-1 sm:space-x-1 text-sm lg:text-sm md:text-xs sm:text-xs text-gray-500 dark:text-gray-400 lg:flex md:flex sm:hidden">
            <TrendingUp className="w-4 h-4 lg:w-4 lg:h-4 md:w-3 md:h-3 sm:w-2 sm:h-2 text-success-500" />
            <span className="text-success-600 font-medium">+2.5%</span>
            <span>Today</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4 lg:space-x-4 md:space-x-3 sm:space-x-2">
                      {/* Search */}
            <div className="relative lg:block md:block sm:hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 lg:w-64 md:w-48 sm:w-32"
              />
            </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
            ) : (
              <Sun className="w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Settings className="w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 lg:space-x-3 md:space-x-2 sm:space-x-1">
            <div className="text-right lg:block md:block sm:hidden">
              <p className="text-sm lg:text-sm md:text-xs sm:text-xs font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs lg:text-xs md:text-xs sm:text-xs text-gray-500 dark:text-gray-400">
                Premium Account
              </p>
            </div>
            <button className="w-8 h-8 lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-5 sm:h-5 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 lg:w-4 lg:h-4 md:w-3 md:h-3 sm:w-2 sm:h-2 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
