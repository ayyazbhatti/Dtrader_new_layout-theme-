import React, { useState } from 'react'

/**
 * Test component to verify that checkbox clicks don't trigger row clicks
 * This helps ensure the fix for the User Details popup issue works correctly
 */
const CheckboxClickTest: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [lastAction, setLastAction] = useState<string>('None')

  const testData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ]

  const handleRowClick = (user: any, event: React.MouseEvent) => {
    // Check if the click target is an interactive element that shouldn't trigger row click
    const target = event.target as HTMLElement
    const isCheckbox = target.closest('input[type="checkbox"]')
    const isCheckboxLabel = target.closest('label')
    const isCheckboxContainer = target.closest('.checkbox-container')
    const isButton = target.closest('button')
    const isSelect = target.closest('select')
    const isInput = target.closest('input')
    const isLink = target.closest('a')
    const isActionButton = target.closest('[data-action]')
    
    // Don't open user details if clicking on interactive elements
    if (isCheckbox || isCheckboxLabel || isCheckboxContainer || isButton || isSelect || isInput || isLink || isActionButton) {
      setLastAction(`Blocked row click for ${user.name} - clicked on interactive element`)
      return
    }
    
    setLastAction(`Row clicked for ${user.name}`)
  }

  const handleCheckboxChange = (userId: string, checked: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(userId)
      } else {
        newSet.delete(userId)
      }
      return newSet
    })
    setLastAction(`Checkbox ${checked ? 'checked' : 'unchecked'} for user ${userId}`)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === testData.length) {
      setSelectedRows(new Set())
      setLastAction('Deselected all users')
    } else {
      setSelectedRows(new Set(testData.map(user => user.id)))
      setLastAction('Selected all users')
    }
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Checkbox Click Test
        </h1>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Test Instructions
          </h2>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Click on checkboxes - should NOT trigger row click</li>
            <li>• Click on empty row areas - SHOULD trigger row click</li>
            <li>• Click on buttons - should NOT trigger row click</li>
            <li>• Watch the "Last Action" display below</li>
          </ul>
        </div>

        <div className="mb-4">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedRows.size === testData.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="card">
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === testData.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testData.map((user) => (
                  <tr
                    key={user.id}
                    onClick={(e) => handleRowClick(user, e)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(user.id)}
                        onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="p-2 text-gray-900 dark:text-white">{user.name}</td>
                    <td className="p-2 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="p-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setLastAction(`Button clicked for ${user.name}`)
                        }}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        Action
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Last Action
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{lastAction}</p>
        </div>

        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            Expected Behavior
          </h3>
          <ul className="text-green-800 dark:text-green-200 space-y-1">
            <li>✅ Checkbox clicks should show "Checkbox checked/unchecked"</li>
            <li>✅ Button clicks should show "Button clicked"</li>
            <li>✅ Row clicks should show "Row clicked"</li>
            <li>❌ Checkbox clicks should NOT show "Row clicked"</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CheckboxClickTest 