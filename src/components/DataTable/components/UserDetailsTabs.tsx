import React from 'react'
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

export interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

interface UserDetailsTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

// Define the component type with tab content components
interface UserDetailsTabsComponent extends React.FC<UserDetailsTabsProps> {
  PositionsTabContent: React.FC
  OpenPositionsTabContent: React.FC
  OrdersTabContent: React.FC
  DealHistoryTabContent: React.FC
  CallHistoryTabContent: React.FC
  PriceDropAlertTabContent: React.FC
  ScheduleMeetingTabContent: React.FC
  AccountSettingsTabContent: React.FC
  AffiliateLinksTabContent: React.FC
  AssignTagsTabContent: React.FC
}

export const UserDetailsTabs: UserDetailsTabsComponent = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="border-b border-gray-700">
      <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span className="hidden lg:inline">{tab.label}</span>
            <span className="hidden sm:inline lg:hidden">{tab.label.split(' ')[0]}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Tab content components for different sections
const PositionsTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Positions</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Positions content will be rendered here</p>
    </div>
  </div>
)

const OpenPositionsTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Open Positions</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Open positions content will be rendered here</p>
    </div>
  </div>
)

const OrdersTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Orders</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Orders content will be rendered here</p>
    </div>
  </div>
)

const DealHistoryTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Deal History</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Deal history content will be rendered here</p>
    </div>
  </div>
)

const CallHistoryTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Call History</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Call history content will be rendered here</p>
    </div>
  </div>
)

const PriceDropAlertTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Price Drop Alert</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Price drop alert content will be rendered here</p>
    </div>
  </div>
)

const ScheduleMeetingTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Schedule Meeting</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Schedule meeting content will be rendered here</p>
    </div>
  </div>
)

const AccountSettingsTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Account Settings</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Account settings content will be rendered here</p>
    </div>
  </div>
)

const AffiliateLinksTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Affiliate Links</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Affiliate links content will be rendered here</p>
    </div>
  </div>
)

const AssignTagsTabContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Assign Tags</h3>
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-gray-300">Assign tags content will be rendered here</p>
    </div>
  </div>
)

// Export tab content components as properties of UserDetailsTabs
UserDetailsTabs.PositionsTabContent = PositionsTabContent
UserDetailsTabs.OpenPositionsTabContent = OpenPositionsTabContent
UserDetailsTabs.OrdersTabContent = OrdersTabContent
UserDetailsTabs.DealHistoryTabContent = DealHistoryTabContent
UserDetailsTabs.CallHistoryTabContent = CallHistoryTabContent
UserDetailsTabs.PriceDropAlertTabContent = PriceDropAlertTabContent
UserDetailsTabs.ScheduleMeetingTabContent = ScheduleMeetingTabContent
UserDetailsTabs.AccountSettingsTabContent = AccountSettingsTabContent
UserDetailsTabs.AffiliateLinksTabContent = AffiliateLinksTabContent
UserDetailsTabs.AssignTagsTabContent = AssignTagsTabContent 