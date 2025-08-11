import React, { useState } from 'react'
import { X, Calendar, Clock, History, Plus } from 'lucide-react'

interface ScheduleMeetingData {
  callSubject: string
  startDate: string
  startTime: string
  duration: string
  assignToManager: string
  managerPopup: string
  userPopup: string
  managerEmailInvites: string
  userEmailInvites: string
  status: string
  note: string
}

interface CallHistoryData {
  id: string
  callSubject: string
  startDate: string
  startTime: string
  duration: string
  assignToManager: string
  status: string
  createdAt: string
  lastModified: string
}

interface ScheduleMeetingPopupProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: (data: ScheduleMeetingData) => void
}

export const ScheduleMeetingPopup: React.FC<ScheduleMeetingPopupProps> = ({
  isOpen,
  onClose,
  onSchedule
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule')
  const [formData, setFormData] = useState<ScheduleMeetingData>({
    callSubject: '',
    startDate: '',
    startTime: '09:30 AM',
    duration: '01:00',
    assignToManager: '17_Feb_Manager',
    managerPopup: 'Not Active',
    userPopup: 'Not Active',
    managerEmailInvites: 'Not Active',
    userEmailInvites: 'Not Active',
    status: 'Active',
    note: ''
  })

  // Mock data for call history
  const mockCallHistory: CallHistoryData[] = [
    {
      id: '1',
      callSubject: 'Weekly Team Sync',
      startDate: '2024-02-20',
      startTime: '10:00 AM',
      duration: '01:00',
      assignToManager: '17_Feb_Manager',
      status: 'Completed',
      createdAt: '2024-02-18 09:30 AM',
      lastModified: '2024-02-20 10:00 AM'
    },
    {
      id: '2',
      callSubject: 'Project Review Meeting',
      startDate: '2024-02-22',
      startTime: '02:00 PM',
      duration: '01:30',
      assignToManager: '18_Feb_Manager',
      status: 'Scheduled',
      createdAt: '2024-02-19 11:15 AM',
      lastModified: '2024-02-19 11:15 AM'
    },
    {
      id: '3',
      callSubject: 'Client Consultation',
      startDate: '2024-02-19',
      startTime: '11:00 AM',
      duration: '00:45',
      assignToManager: '17_Feb_Manager',
      status: 'Cancelled',
      createdAt: '2024-02-17 03:20 PM',
      lastModified: '2024-02-18 04:30 PM'
    },
    {
      id: '4',
      callSubject: 'Training Session',
      startDate: '2024-02-21',
      startTime: '09:00 AM',
      duration: '02:00',
      assignToManager: '19_Feb_Manager',
      status: 'Scheduled',
      createdAt: '2024-02-18 02:45 PM',
      lastModified: '2024-02-18 02:45 PM'
    },
    {
      id: '5',
      callSubject: 'Monthly Review',
      startDate: '2024-02-25',
      startTime: '03:00 PM',
      duration: '01:00',
      assignToManager: '17_Feb_Manager',
      status: 'Scheduled',
      createdAt: '2024-02-20 10:20 AM',
      lastModified: '2024-02-20 10:20 AM'
    }
  ]

  const handleInputChange = (field: keyof ScheduleMeetingData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSchedule = () => {
    if (formData.callSubject && formData.startDate && formData.startTime) {
      onSchedule(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      callSubject: '',
      startDate: '',
      startTime: '09:30 AM',
      duration: '01:00',
      assignToManager: '17_Feb_Manager',
      managerPopup: 'Not Active',
      userPopup: 'Not Active',
      managerEmailInvites: 'Not Active',
      userEmailInvites: 'Not Active',
      status: 'Active',
      note: ''
    })
    onClose()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-600 text-white'
      case 'scheduled':
        return 'bg-blue-600 text-white'
      case 'cancelled':
        return 'bg-red-600 text-white'
      case 'in-progress':
        return 'bg-yellow-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-700 flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-750 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Schedule a call
          </h2>
          <button
            onClick={handleClose}
            className="p-1 sm:p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-gray-700 bg-gray-750/50 flex-shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'schedule'
                ? 'text-white border-b-2 border-blue-500 bg-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Schedule New Call</span>
            <span className="sm:hidden">Schedule</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'history'
                ? 'text-white border-b-2 border-blue-500 bg-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <History className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Call History</span>
            <span className="sm:hidden">History</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'schedule' ? (
            <>
              {/* Current Call Status Section */}
              <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-750/50">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Current Call Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-gray-300">
                      Making Call To
                    </label>
                    <div className="bg-gray-700 px-3 py-2 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-600">
                      <span className="text-gray-500">No active call</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-gray-300">
                      Phone Number
                    </label>
                    <div className="bg-gray-700 px-3 py-2 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-600">
                      <span className="text-gray-500">No number</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-gray-300">
                      Calling
                    </label>
                    <div className="bg-gray-700 px-3 py-2 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-600">
                      <span className="text-gray-500">Not connected</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center sm:justify-end">
                  <button className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25 text-sm sm:text-base">
                    HangUp
                  </button>
                </div>
              </div>

              {/* Scheduling Form Section */}
              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                {/* Call Details Row */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Call Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Call Subject <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter call subject"
                        value={formData.callSubject}
                        onChange={(e) => handleInputChange('callSubject', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="mm/dd/yyyy"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="w-full px-3 py-2 pr-10 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <Calendar className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Start Time
                      </label>
                      <input
                        type="text"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className="w-full px-3 py-2 pr-10 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <Clock className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment & Popup Row */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Assignment & Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Assign To Manager <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.assignToManager}
                        onChange={(e) => handleInputChange('assignToManager', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="17_Feb_Manager">17_Feb_Manager</option>
                        <option value="18_Feb_Manager">18_Feb_Manager</option>
                        <option value="19_Feb_Manager">19_Feb_Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Manager Popup
                      </label>
                      <select
                        value={formData.managerPopup}
                        onChange={(e) => handleInputChange('managerPopup', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Not Active">Not Active</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        User Popup
                      </label>
                      <select
                        value={formData.userPopup}
                        onChange={(e) => handleInputChange('userPopup', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Not Active">Not Active</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Invites, Status & Note Row */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Notifications & Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Manager Email invites <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.managerEmailInvites}
                        onChange={(e) => handleInputChange('managerEmailInvites', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Not Active">Not Active</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        User Email invites <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.userEmailInvites}
                        onChange={(e) => handleInputChange('userEmailInvites', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Not Active">Not Active</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      {/* Empty space */}
                    </div>
                  </div>
                </div>

                {/* Note Section */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Additional Information</h3>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                      Note
                    </label>
                    <textarea
                      placeholder="Enter additional details or comments..."
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Call History Table */
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Call Schedule History</h3>
              
              {/* Responsive Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Call Subject</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Date & Time</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Duration</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Manager</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Status</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Created</th>
                      <th className="px-2 sm:px-3 py-2 text-left font-medium border-b border-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 text-gray-300">
                    {mockCallHistory.map((call) => (
                      <tr key={call.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                        <td className="px-2 sm:px-3 py-2">
                          <div className="font-medium text-white text-xs sm:text-sm">{call.callSubject}</div>
                        </td>
                        <td className="px-2 sm:px-3 py-2">
                          <div className="text-xs sm:text-sm">{call.startDate}</div>
                          <div className="text-xs text-gray-400">{call.startTime}</div>
                        </td>
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{call.duration}</td>
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{call.assignToManager}</td>
                        <td className="px-2 sm:px-3 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="px-2 sm:px-3 py-2">
                          <div className="text-xs">{call.createdAt}</div>
                        </td>
                        <td className="px-2 sm:px-3 py-2">
                          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                            <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                              Edit
                            </button>
                            <button className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border-t border-gray-700 bg-gray-750/50 flex-shrink-0">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            {activeTab === 'schedule' && <><span className="text-red-400">*</span> Required fields</>}
            {activeTab === 'history' && <span>Showing {mockCallHistory.length} scheduled calls</span>}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {activeTab === 'schedule' && (
              <>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                >
                  Close
                </button>
                <button
                  onClick={handleSchedule}
                  disabled={!formData.callSubject || !formData.startDate || !formData.startTime}
                  className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
                >
                  Add call
                </button>
              </>
            )}
            {activeTab === 'history' && (
              <button
                onClick={() => setActiveTab('schedule')}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Schedule New Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 