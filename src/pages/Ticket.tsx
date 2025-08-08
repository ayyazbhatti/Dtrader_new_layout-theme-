import React from 'react'
import { MessageSquare } from 'lucide-react'

const Ticket: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Support Tickets
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Tickets
          </h2>

          <div className="space-y-4">
            {[
              {
                id: 'TKT-001',
                subject: 'Withdrawal Issue',
                status: 'Open',
                priority: 'High',
                date: '2024-01-15',
              },
              {
                id: 'TKT-002',
                subject: 'Trading Bot Setup',
                status: 'In Progress',
                priority: 'Medium',
                date: '2024-01-14',
              },
              {
                id: 'TKT-003',
                subject: 'Account Verification',
                status: 'Closed',
                priority: 'Low',
                date: '2024-01-13',
              },
            ].map(ticket => (
              <div
                key={ticket.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {ticket.subject}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'High'
                        ? 'bg-danger-100 text-danger-800'
                        : ticket.priority === 'Medium'
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-success-100 text-success-800'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>#{ticket.id}</span>
                  <span>{ticket.date}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'Open'
                        ? 'bg-primary-100 text-primary-800'
                        : ticket.status === 'In Progress'
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-success-100 text-success-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create New Ticket
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter ticket subject"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select className="input">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Describe your issue..."
                className="input"
              ></textarea>
            </div>

            <button className="btn btn-primary w-full">Submit Ticket</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
