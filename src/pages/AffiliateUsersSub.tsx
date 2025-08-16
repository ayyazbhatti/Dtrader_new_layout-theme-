import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Users } from 'lucide-react'
import AffiliateSystem from '@/components/DataTable/AffiliateSystem'
import AffiliateDetailsPopup from '@/components/DataTable/AffiliateDetailsPopup'
import AffiliateEditPopup from '@/components/DataTable/AffiliateEditPopup'
import AffiliateAddPopup from '@/components/DataTable/AffiliateAddPopup'
import CommissionLayersSystem from '@/components/DataTable/CommissionLayersSystem'
import CommissionsTable from '@/components/DataTable/CommissionsTable'
import WithdrawalRulesSystem from '@/components/DataTable/WithdrawalRulesSystem'


interface AffiliateUser {
  id: string
  accountId: string
  accountName: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalCommission: number
  monthlyCommission: number
  referralCount: number
  joinDate: string
  lastActivity: string
  country: string
  verificationStatus: 'verified' | 'unverified' | 'pending'
}

const AffiliateUsersSub: React.FC = () => {
  const { subPage } = useParams<{ subPage: string }>()
  
  const [selectedUser, setSelectedUser] = useState<AffiliateUser | null>(null)
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [userToDelete, setUserToDelete] = useState<AffiliateUser | null>(null)

  const getPageTitle = (subPage: string | undefined) => {
    const titles: { [key: string]: string } = {
      'view-all': 'View All Affiliates',
      'commission-layers': 'Commission Layers',
      'withdrawal-rule': 'Withdrawal Rules',
      'commissions': 'Commissions Management',
      'all': 'All Affiliate Users',
      'add': 'Add Affiliate',
    }
    return titles[subPage || ''] || 'Affiliate Users'
  }

  const handleViewDetails = (user: AffiliateUser) => {
    setSelectedUser(user)
    setShowDetailsPopup(true)
  }

  const handleEditUser = (user: AffiliateUser) => {
    setSelectedUser(user)
    setShowEditPopup(true)
  }

  const handleDeleteUser = (user: AffiliateUser) => {
    setUserToDelete(user)
    setShowDeletePopup(true)
  }

  const handleSaveUser = (updatedUser: AffiliateUser) => {
    // Handle save logic here
    console.log('Saving user:', updatedUser)
    setShowEditPopup(false)
    setSelectedUser(null)
  }

  const handleAddUser = (newUserData: Omit<AffiliateUser, 'id' | 'accountId' | 'joinDate' | 'lastActivity' | 'referralCount'>) => {
    // Handle add logic here
    const newUser: AffiliateUser = {
      ...newUserData,
      id: Date.now().toString(),
      accountId: Math.floor(Math.random() * 90000000 + 10000000).toString(),
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      referralCount: 0
    }
    console.log('Adding new user:', newUser)
    setShowAddPopup(false)
  }

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false)
    setSelectedUser(null)
  }

  const closeEditPopup = () => {
    setShowEditPopup(false)
    setSelectedUser(null)
  }

  const closeAddPopup = () => {
    setShowAddPopup(false)
  }

  const closeDeletePopup = () => {
    setShowDeletePopup(false)
    setUserToDelete(null)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      // Handle delete logic here
      console.log('Deleting user:', userToDelete)
      // You can add API call here to actually delete the user
    }
    closeDeletePopup()
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            {getPageTitle(subPage)}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm truncate">Affiliate section</p>
        </div>
      </div>

      {subPage === 'all' ? (
        <AffiliateSystem
          onViewDetails={handleViewDetails}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onAddAffiliate={() => setShowAddPopup(true)}
        />
      ) : subPage === 'commission-layers' ? (
        <CommissionLayersSystem />
      ) : subPage === 'commissions' ? (
        <CommissionsTable />
      ) : subPage === 'withdrawal-rule' ? (
        <WithdrawalRulesSystem />
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-3 sm:p-4 lg:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            {getPageTitle(subPage)}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-xs sm:text-sm">
              This is the {getPageTitle(subPage || '').toLowerCase()} page. Content will be added here based on the specific functionality needed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">Feature 1</h3>
                <p className="text-xs sm:text-sm text-gray-400">Description of feature 1</p>
              </div>
              <div className="p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">Feature 2</h3>
                <p className="text-xs sm:text-sm text-gray-400">Description of feature 2</p>
              </div>
              <div className="p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">Feature 3</h3>
                <p className="text-xs sm:text-sm text-gray-400">Description of feature 3</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
      {showDetailsPopup && selectedUser && (
        <AffiliateDetailsPopup
          user={selectedUser}
          onClose={closeDetailsPopup}
          onEdit={handleEditUser}
        />
      )}

      {showEditPopup && selectedUser && (
        <AffiliateEditPopup
          user={selectedUser}
          onClose={closeEditPopup}
          onSave={handleSaveUser}
        />
      )}

      {showAddPopup && (
        <AffiliateAddPopup
          onClose={closeAddPopup}
          onAdd={handleAddUser}
        />
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delete Affiliate
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">{userToDelete.accountName}</span>?
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  This will permanently remove the affiliate account and all associated data.
                </p>
              </div>

              {/* User Info Card */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{userToDelete.accountName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userToDelete.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${userToDelete.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {userToDelete.status.charAt(0).toUpperCase() + userToDelete.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {userToDelete.accountId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeDeletePopup}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Delete Affiliate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AffiliateUsersSub
