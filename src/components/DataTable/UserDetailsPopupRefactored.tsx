import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Phone, 
  AlertTriangle, 
  Settings, 
  Link, 
  Tag,
  Calendar,
  DollarSign
} from 'lucide-react'
import { UserData } from './types'
import { PriceDropAlertPopup } from './PriceDropAlertPopup'
import { ScheduleMeetingPopup } from './ScheduleMeetingPopup'
import { UserDetailsHeader } from './components/UserDetailsHeader'
import { UserDetailsTabs, TabItem } from './components/UserDetailsTabs'

interface UserDetailsPopupRefactoredProps {
  user: UserData
  isOpen: boolean
  onClose: () => void
}

/**
 * Refactored UserDetailsPopup Component
 * 
 * This version demonstrates the improved architecture by:
 * - Using smaller, focused components
 * - Better separation of concerns
 * - Improved maintainability
 * - Cleaner main component logic
 */
const UserDetailsPopupRefactored: React.FC<UserDetailsPopupRefactoredProps> = ({
  user,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('positions')
  const [isPriceDropAlertOpen, setIsPriceDropAlertOpen] = useState(false)
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false)

  if (!isOpen) return null

  // Event handlers
  const handleScheduleMeeting = () => setIsScheduleMeetingOpen(true)
  const handlePriceDropAlert = () => setIsPriceDropAlertOpen(true)
  
  const handlePriceDropAlertClose = () => setIsPriceDropAlertOpen(false)
  const handleScheduleMeetingClose = () => setIsScheduleMeetingOpen(false)
  
  const handlePriceDropAlertSend = (data: any) => {
    console.log('Price drop alert sent:', data)
    setIsPriceDropAlertOpen(false)
  }
  
  const handleScheduleMeetingSubmit = (data: any) => {
    console.log('Meeting scheduled:', data)
    setIsScheduleMeetingOpen(false)
  }

  // Tab definitions with content
  const tabs: TabItem[] = [
    {
      id: 'positions',
      label: 'Positions',
      icon: <BarChart3 className="w-4 h-4" />,
      content: <UserDetailsTabs.PositionsTabContent />
    },
    {
      id: 'openPositions',
      label: 'Open Positions',
      icon: <TrendingUp className="w-4 h-4" />,
      content: <UserDetailsTabs.OpenPositionsTabContent />
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <FileText className="w-4 h-4" />,
      content: <UserDetailsTabs.OrdersTabContent />
    },
    {
      id: 'dealHistory',
      label: 'Deal History',
      icon: <DollarSign className="w-4 h-4" />,
      content: <UserDetailsTabs.DealHistoryTabContent />
    },
    {
      id: 'callHistory',
      label: 'Call History',
      icon: <Phone className="w-4 h-4" />,
      content: <UserDetailsTabs.CallHistoryTabContent />
    },
    {
      id: 'priceDropAlert',
      label: 'Price Drop Alert',
      icon: <AlertTriangle className="w-4 h-4" />,
      content: <UserDetailsTabs.PriceDropAlertTabContent />
    },
    {
      id: 'scheduleMeeting',
      label: 'Schedule Meeting',
      icon: <Calendar className="w-4 h-4" />,
      content: <UserDetailsTabs.ScheduleMeetingTabContent />
    },
    {
      id: 'accountSettings',
      label: 'Account Settings',
      icon: <Settings className="w-4 h-4" />,
      content: <UserDetailsTabs.AccountSettingsTabContent />
    },
    {
      id: 'affiliateLinks',
      label: 'Affiliate Links',
      icon: <Link className="w-4 h-4" />,
      content: <UserDetailsTabs.AffiliateLinksTabContent />
    },
    {
      id: 'assignTags',
      label: 'Assign Tags',
      icon: <Tag className="w-4 h-4" />,
      content: <UserDetailsTabs.AssignTagsTabContent />
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header Component */}
        <UserDetailsHeader
          user={user}
          onScheduleMeeting={handleScheduleMeeting}
          onPriceDropAlert={handlePriceDropAlert}
          onClose={onClose}
        />

        {/* Tabs Component */}
        <UserDetailsTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* Price Drop Alert Popup */}
      <PriceDropAlertPopup
        isOpen={isPriceDropAlertOpen}
        onClose={handlePriceDropAlertClose}
        onSend={handlePriceDropAlertSend}
      />

      {/* Schedule Meeting Popup */}
      <ScheduleMeetingPopup
        isOpen={isScheduleMeetingOpen}
        onClose={handleScheduleMeetingClose}
        onSchedule={handleScheduleMeetingSubmit}
      />
    </div>
  )
}

export default UserDetailsPopupRefactored 