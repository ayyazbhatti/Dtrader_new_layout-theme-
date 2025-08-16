import React from 'react'
import { Users } from 'lucide-react'

const AffiliateUsers: React.FC = () => {
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            Affiliate Users
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm truncate">Manage affiliate users and commissions</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-3 sm:p-4 lg:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Affiliate Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-r border-gray-600 first:border-l border-gray-600">User</th>
                <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-r border-gray-600 first:border-l border-gray-600">Commission</th>
                <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-r border-gray-600 first:border-l border-gray-600">Status</th>
                <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-r border-gray-600 first:border-l border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {[
                {
                  name: 'John Doe',
                  email: 'john@example.com',
                  commission: '$1,250',
                  status: 'Active',
                },
                {
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                  commission: '$890',
                  status: 'Active',
                },
                {
                  name: 'Mike Johnson',
                  email: 'mike@example.com',
                  commission: '$2,100',
                  status: 'Pending',
                },
              ].map(user => (
                <tr key={user.email} className="hover:bg-gray-700 transition-colors">
                  <td className="px-3 sm:px-4 py-2 align-top">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white">
                    {user.commission}
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <span className={`px-2 py-1 text-[10px] sm:text-xs rounded-full ${
                      user.status === 'Active' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                    <button className="text-red-400 hover:text-red-300">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AffiliateUsers
