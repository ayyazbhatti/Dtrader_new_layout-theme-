import React, { useState } from 'react'
import { X, User, Settings, MessageSquare, Users2, Phone } from 'lucide-react'
import { ManagerData } from './types'

interface ManagerDetailsPopupProps {
  manager: ManagerData | null
  isOpen: boolean
  onClose: () => void
}

interface TabData {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

const ManagerDetailsPopup: React.FC<ManagerDetailsPopupProps> = ({ manager, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('manager-details')
  const [comment, setComment] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [managerSettings, setManagerSettings] = useState({
    canManageUsers: true,
    canAssignTags: true,
    canViewReports: true,
    canEditSettings: false
  })

  const [assignedTags, setAssignedTags] = useState(['Senior Manager', 'Team Lead'])
  const [availableTags] = useState([
    'Senior Manager',
    'Team Lead',
    'Project Manager',
    'Department Head',
    'Regional Manager',
    'Supervisor',
    'Coordinator'
  ])
  const [showTagSelectionPopup, setShowTagSelectionPopup] = useState(false)


  // Handler functions
  const handleUpdateManager = () => {
    // TODO: Implement update manager logic
    console.log('Updating manager:', manager?.name)
    // Add your update logic here
  }

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    console.log('Changing password for manager:', manager?.name)
    // Add your password change logic here
  }

  const handleAddTag = (tag: string) => {
    if (!assignedTags.includes(tag)) {
      setAssignedTags(prev => [...prev, tag])
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setAssignedTags(prev => prev.filter(tag => tag !== tagToRemove))
  }



  if (!isOpen || !manager) return null

  const tabs: TabData[] = [
    {
      id: 'manager-details',
      label: 'Manager Details',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {/* Row 1 - Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="ccman"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="ccman"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="cc_man@gmail.com"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Row 2 - Middle Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ID Number
              </label>
              <input
                type="text"
                defaultValue="12289224"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                State
              </label>
              <input
                type="text"
                defaultValue="State"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                defaultValue="Lahore Pakistan"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Row 3 - Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+924236407566"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Domain Name
              </label>
              <input
                type="url"
                defaultValue="https://backoffice.comgestfx.com"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password Change Section */}
          <div className="border-t border-gray-600 pt-4 sm:pt-6 mt-4 sm:mt-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Change Password</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-1"
                  >
                    {showCurrentPassword ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-1"
                  >
                    {showNewPassword ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 p-1"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button 
              onClick={handleUpdateManager}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Update Manager
            </button>
            <button 
              onClick={handleChangePassword}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Change Password
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'comment',
      label: 'Comment',
      icon: <MessageSquare className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-4">Manager Comments</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Manager has been performing well in team management.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-15 by Admin</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Successfully managed 15 team members this month.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-10 by Supervisor</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Excellent communication skills with clients and team members.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-08 by HR Manager</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Consistently meets monthly targets and deadlines.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-05 by Operations Lead</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Shows strong leadership qualities in crisis situations.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-03 by Senior Director</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Proactive approach to problem-solving and team development.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-01 by CEO</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Demonstrates excellent analytical and strategic thinking.</p>
                <p className="text-gray-400 text-xs mt-2">2023-12-28 by Strategy Manager</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Add a new comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'manager-settings',
      label: 'Manager Settings',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-4">Manager Configuration</h4>
            <div className="space-y-4">
              {/* Assign Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assign Tags
                </label>
                <div className="space-y-3">
                  {/* Current Tags Display */}
                  <div className="flex flex-wrap gap-2">
                    {assignedTags.map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          index === 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          index === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                        }`}
                      >
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  {/* Add Tag Button */}
                  <button 
                    onClick={() => setShowTagSelectionPopup(true)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              {/* Supervisor Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Supervisor Manager
                </label>
                <input
                  type="text"
                  placeholder="Enter supervisor manager name"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Manager Access Rights */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Manager Access Rights <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select access level</option>
                  <option value="full">Full Access</option>
                  <option value="limited">Limited Access</option>
                  <option value="readonly">Read Only</option>
                  <option value="restricted">Restricted Access</option>
                  <option value="supervisor">Supervisor Level</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition-colors duration-200 font-medium">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'referred-users',
      label: 'Referred Users',
      icon: <Users2 className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {/* Referral Link Section */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Referral Link</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={`https://dtrader.com/ref/${manager.id}`}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm font-mono"
              />
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`https://dtrader.com/ref/${manager.id}`);
                    // Show success feedback
                    const button = event?.target as HTMLButtonElement;
                    if (button) {
                      const originalText = button.innerHTML;
                      button.innerHTML = `
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      `;
                      button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                      button.classList.add('bg-green-600');
                      setTimeout(() => {
                        button.innerHTML = originalText;
                        button.classList.remove('bg-green-600');
                        button.classList.add('bg-blue-600', 'hover:bg-blue-700');
                      }, 1500);
                    }
                  } catch (err) {
                    console.error('Failed to copy: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = `https://dtrader.com/ref/${manager.id}`;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                  }
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Copy link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Referred Users Table */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-300">Users Referred by {manager.name}</h4>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                Add Referral
              </button>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600">
                      Online
                    </th>
                    <th className="data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600">
                      Account ID
                    </th>
                    <th className="data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600">
                      Email
                    </th>
                    <th className="data-table-header px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600">
                      Group
                    </th>
                    <th className="data-table-header px-2 text-left text-xs font-medium text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Online</span>
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">71836450</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">john.doe@email.com</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">Premium</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View</button>
                    </td>
                  </tr>
                  <tr className="data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Offline</span>
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">71836451</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">jane.smith@email.com</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">Standard</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View</button>
                    </td>
                  </tr>
                  <tr className="data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Pending</span>
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">71836452</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">mike.johnson@email.com</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">Basic</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View</button>
                    </td>
                  </tr>
                  <tr className="data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Online</span>
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">71836453</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">sarah.wilson@email.com</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">Premium</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View</button>
                    </td>
                  </tr>
                  <tr className="data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Offline</span>
                      </div>
                    </td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">71836454</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">david.brown@email.com</td>
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600">Standard</td>
                    <td className="data-table-cell px-2 text-xs text-xs text-gray-900 dark:text-white whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {manager.name} | Manager Detail
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm truncate">Manager ID: {manager.id}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
            <button 
              className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Contact Manager"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Contact Manager
              </div>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Close Popup"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Close Popup
              </div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

        {/* Tab Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* Tag Selection Popup */}
      {showTagSelectionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Select Tags</h3>
              <button
                onClick={() => setShowTagSelectionPopup(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Available Tags with Checkboxes */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-300">Available Tags</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleAddTag(tag)
                        } else {
                          handleRemoveTag(tag)
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-white">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-600">
              <div className="flex space-x-2">
                <button
                  onClick={() => setAssignedTags(availableTags)}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => setAssignedTags([])}
                  className="px-3 py-1.5 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <button
                onClick={() => setShowTagSelectionPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerDetailsPopup 