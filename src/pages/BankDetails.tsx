import React from 'react'
import { Building } from 'lucide-react'

const BankDetails: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Building className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bank Details
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Bank Account Information
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bank Name
              </label>
              <input type="text" defaultValue="Chase Bank" className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Number
              </label>
              <input type="text" defaultValue="****1234" className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Routing Number
              </label>
              <input type="text" defaultValue="021000021" className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Type
              </label>
              <select className="input">
                <option>Checking</option>
                <option>Savings</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Account Holder Name
            </label>
            <input type="text" defaultValue="John Doe" className="input" />
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary">Update Bank Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankDetails
