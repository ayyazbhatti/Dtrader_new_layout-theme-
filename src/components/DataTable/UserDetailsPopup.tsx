import React, { useState } from 'react'
import { X, User, Settings, CreditCard, Bot, History, FileText, Phone, Calendar, AlertTriangle, Users2, TrendingUp, ExternalLink } from 'lucide-react'
import { UserData, PositionData, OpenPositionData, OrderData, DealHistoryData } from './types'
import { mockPositionData, mockOpenPositionData, mockOrderData, mockDealHistoryData } from './data'
import { PriceDropAlertPopup } from './PriceDropAlertPopup'
import { ScheduleMeetingPopup } from './ScheduleMeetingPopup'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
} from '@tanstack/react-table'

interface UserDetailsPopupProps {
  user: UserData | null
  isOpen: boolean
  onClose: () => void
}

interface TabData {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

// Position Details Popup Component
interface PositionDetailsPopupProps {
  position: PositionData | null
  isOpen: boolean
  onClose: () => void
}

const PositionDetailsPopup: React.FC<PositionDetailsPopupProps> = ({ position, isOpen, onClose }) => {
  if (!isOpen || !position) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Position Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center gap-1">
                Account ID
                <ExternalLink className="w-3 h-3" />
              </label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">71836450</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Account Name</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">MuhammadAyyaz</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Position ID</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.positionId}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Open Time</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.openTime}</div>
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Symbol</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.symbol}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Is Bot Trade</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">Yes</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Entry Price</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">0.91610000</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Account Type</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">cfd_hedging</div>
            </div>

            {/* Row 3 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Exit Price</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">0.92190000</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Quantity</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">498.07215220</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Direction</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm capitalize">{position.type}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">T/P (Take Profit)</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">0.92190000</div>
            </div>

            {/* Row 4 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">S/L (Stop Loss)</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">0.00000000</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Margin</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">4.00000000</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Trade Type</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">units</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Gross Realized PnL</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">Not Provided</div>
            </div>

            {/* Row 5 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Realized PnL</label>
              <div className={`px-3 py-2 rounded text-sm font-medium ${
                position.realizedPnL >= 0 ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
              }`}>
                {position.realizedPnL.toFixed(2)}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Close Time</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.closeTime}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Swap Fee</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.swapFee || '0.00'}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Device Info - Open</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.deviceInfoOpen}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Open Position Details Popup Component
interface OpenPositionDetailsPopupProps {
  position: OpenPositionData | null
  isOpen: boolean
  onClose: () => void
}

const OpenPositionDetailsPopup: React.FC<OpenPositionDetailsPopupProps> = ({ position, isOpen, onClose }) => {
  if (!isOpen || !position) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Open Position Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center gap-1">
                Account ID
                <ExternalLink className="w-3 h-3" />
              </label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">4557622101</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Account Name</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">aayz</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Position ID</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.positionId}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Open Time</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.openTime}</div>
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Symbol</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.symbol}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Is Bot Trade</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">Yes</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Entry Price</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">184.43000000</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Account Type</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">cfd_hedging</div>
            </div>

            {/* Row 3 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Quantity</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.quantity}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Direction</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm capitalize">{position.direction}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">T/P</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.takeProfit || '---'}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">S/L</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.stopLoss || '---'}</div>
            </div>

            {/* Row 4 */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Margin</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.marginUsed.toFixed(8)}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Trade Type</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">units</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Type</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm capitalize">{position.type}</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Device Info</label>
              <div className="bg-gray-700 px-3 py-2 rounded text-white text-sm">{position.deviceInfo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Position Popup Component
interface EditPositionPopupProps {
  position: OpenPositionData | null
  isOpen: boolean
  onClose: () => void
}

const EditPositionPopup: React.FC<EditPositionPopupProps> = ({ position, isOpen, onClose }) => {
  if (!isOpen || !position) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Edit Position</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <form className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-4 gap-4">
              {/* User */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">User</label>
                <input
                  type="text"
                  value="aayz - 4557622"
                  readOnly
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm cursor-not-allowed"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Quantity*</label>
                <input
                  type="number"
                  defaultValue={position.quantity}
                  step="0.00000001"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Direction */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Direction</label>
                <select
                  defaultValue={position.direction}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              {/* Entry Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Entry Price*</label>
                <input
                  type="number"
                  defaultValue="184.43000000"
                  step="0.00000001"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-4 gap-4">
              {/* Stop Loss */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Stop Loss</label>
                <input
                  type="number"
                  placeholder="Enter Stop Loss"
                  step="0.00000001"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Take Profit */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Take Profit</label>
                <input
                  type="number"
                  defaultValue="184.56"
                  step="0.00000001"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Opening Date Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Opening Date Time*</label>
                <input
                  type="date"
                  defaultValue="2025-08-11"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Comment</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// OrderTable component
const OrderTable: React.FC<{ data: OrderData[]; searchQuery?: string; startDate?: string; endDate?: string }> = ({ data, searchQuery = '', startDate = '', endDate = '' }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columnHelper = createColumnHelper<OrderData>()

  const columns = [
    columnHelper.accessor('accountId', {
      header: 'Account ID',
      cell: ({ getValue }) => (
        <div className="text-blue-400 underline cursor-pointer hover:text-blue-300">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('orderId', {
      header: 'Order ID',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => (
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          getValue() === 'filled' ? 'bg-green-600 text-white' :
          getValue() === 'cancelled' ? 'bg-red-600 text-white' :
          getValue() === 'pending' ? 'bg-yellow-600 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('direction', {
      header: 'Direction',
      cell: ({ getValue }) => (
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          getValue() === 'buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {getValue().toUpperCase()}
        </div>
      ),
    }),
    columnHelper.accessor('volume', {
      header: 'Volume',
      cell: ({ getValue }) => <div className="text-white">{getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('executionPrice', {
      header: 'Execution Price',
      cell: ({ getValue }) => <div className="text-white">{getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('expectedPrice', {
      header: 'Expected Price',
      cell: ({ getValue }) => <div className="text-white">{getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('submittedTime', {
      header: 'Submitted Time',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('resolvedTime', {
      header: 'Resolved Time',
      cell: ({ getValue }) => <div className="text-white">{getValue() || '---'}</div>,
    }),
    columnHelper.accessor('desiredStopLoss', {
      header: 'Desired SL',
      cell: ({ getValue }) => <div className="text-white">{getValue() ? getValue()?.toLocaleString() : '---'}</div>,
    }),
    columnHelper.accessor('desiredTakeProfit', {
      header: 'Desired TP',
      cell: ({ getValue }) => <div className="text-white">{getValue() ? getValue()?.toLocaleString() : '---'}</div>,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  return (
    <div className="space-y-1">
      {/* Table */}
      <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 border border-gray-700 rounded-lg">
        <table className="w-full min-w-[1200px] text-xs">
          <thead className="bg-gray-700 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-2 py-1 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600 first:border-l border-gray-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-700 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-1 border-r border-gray-600 first:border-l border-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-white">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          
          {/* Records per page selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Show:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[10, 20, 30, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-300">entries</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

// Deal History Table Component
const DealHistoryTable: React.FC<{ data: DealHistoryData[]; searchQuery?: string; startDate?: string; endDate?: string }> = ({ data, searchQuery = '', startDate = '', endDate = '' }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columnHelper = createColumnHelper<DealHistoryData>()

  const columns = [
    columnHelper.accessor('dealId', {
      header: 'Deal ID',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('resultingPosition', {
      header: 'Resulting Posi...',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('accountId', {
      header: 'Account ID',
      cell: ({ getValue }) => (
        <div className="text-blue-400 underline cursor-pointer hover:text-blue-300">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => (
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          getValue() === 'filled' ? 'bg-green-600 text-white' :
          getValue() === 'cancelled' ? 'bg-red-600 text-white' :
          getValue() === 'pending' ? 'bg-yellow-600 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('positionImpact', {
      header: 'Position Impa...',
      cell: ({ getValue }) => (
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          getValue() === 'opening' ? 'bg-blue-600 text-white' : 'bg-orange-600 text-white'
        }`}>
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: ({ getValue }) => <div className="text-white">{getValue()}</div>,
    }),
    columnHelper.accessor('direction', {
      header: 'Direction',
      cell: ({ getValue }) => (
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          getValue() === 'buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {getValue().toUpperCase()}
        </div>
      ),
    }),
    columnHelper.accessor('filledVolume', {
      header: 'Filled Volume',
      cell: ({ getValue }) => <div className="text-white">{getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('executionPrice', {
      header: 'Execution Price',
      cell: ({ getValue }) => <div className="text-white">{getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('netRealizedPnL', {
      header: 'Net Realized P...',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <div className={`${value ? (value > 0 ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
            {value ? value.toLocaleString() : '---'}
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  return (
    <div className="space-y-1">
      {/* Table */}
      <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 border border-gray-700 rounded-lg">
        <table className="w-full min-w-[1200px] text-xs">
          <thead className="bg-gray-700 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-2 py-1 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600 first:border-l border-gray-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-700 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-1 border-r border-gray-600 first:border-l border-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-white">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          
          {/* Records per page selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Show:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[10, 20, 30, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-300">entries</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

// OpenPositionsTable component
const OpenPositionsTable: React.FC<{ data: OpenPositionData[]; searchQuery?: string; startDate?: string; endDate?: string }> = ({ data, searchQuery = '', startDate = '', endDate = '' }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [selectedPosition, setSelectedPosition] = useState<OpenPositionData | null>(null)
  const [isPositionDetailsOpen, setIsPositionDetailsOpen] = useState(false)
  const [isEditPositionOpen, setIsEditPositionOpen] = useState(false)

  const columnHelper = createColumnHelper<OpenPositionData>()

  const handleViewPosition = (position: OpenPositionData) => {
    setSelectedPosition(position)
    setIsPositionDetailsOpen(true)
  }

  const handleEditPosition = (position: OpenPositionData) => {
    setSelectedPosition(position)
    setIsEditPositionOpen(true)
  }

  const columns = [
    columnHelper.accessor('type', {
      header: 'Type',
      cell: () => (
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    }),
    columnHelper.accessor('positionId', {
      header: 'Position ID',
      cell: ({ getValue }) => <span className="font-mono text-xs text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('openTime', {
      header: 'Open Time',
      cell: ({ getValue }) => <span className="text-xs text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('deviceInfo', {
      header: 'Device Info',
      cell: ({ getValue }) => <span className="text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: ({ getValue }) => <span className="font-medium text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: ({ getValue }) => <span className="text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('direction', {
      header: 'Direction',
      cell: ({ getValue }) => (
        <span className={`font-medium capitalize ${getValue() === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('takeProfit', {
      header: 'T/P',
      cell: ({ getValue }) => <span className="text-white">{getValue() || '---'}</span>,
    }),
    columnHelper.accessor('stopLoss', {
      header: 'S/L',
      cell: ({ getValue }) => <span className="text-white">{getValue() || '---'}</span>,
    }),
    columnHelper.accessor('marginUsed', {
      header: 'Margin Used',
      cell: ({ getValue }) => <span className="text-white">{getValue().toFixed(8)}</span>,
    }),
    columnHelper.accessor('unrealizedPnL', {
      header: 'Unr. P&L',
      cell: ({ getValue }) => (
        <span className={`font-medium ${getValue() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handleViewPosition(row.original)}
            className="w-6 h-6 bg-green-600 rounded flex items-center justify-center hover:bg-green-700 transition-colors"
            title="View Details"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" />
            </svg>
          </button>
          <button 
            onClick={() => handleEditPosition(row.original)}
            className="w-6 h-6 bg-green-600 rounded flex items-center justify-center hover:bg-green-700 transition-colors"
            title="Edit Position"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            className="w-6 h-6 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
            title="Close Position"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    }),
  ]

  // Filter data based on date range
  const filteredData = React.useMemo(() => {
    if (!startDate && !endDate) return data;
    
    return data.filter(position => {
      const openTime = new Date(position.openTime);
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return openTime >= start && openTime <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return openTime >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        return openTime <= end;
      }
      
      return true;
    });
  }, [data, startDate, endDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  return (
    <div className="space-y-1">
      {/* Table */}
      <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 border border-gray-700 rounded-lg">
        <table className="w-full min-w-[1400px] text-xs">
          <thead className="bg-gray-700 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-2 py-1 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600 first:border-l border-gray-600"
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-700 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-1 border-r border-gray-600 first:border-l border-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-white">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            className="px-2 py-0.5 bg-gray-700 text-white rounded border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[10, 20, 30, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="text-gray-300">entries</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {table.getPageCount() > 1 && (
            <div className="flex items-center space-x-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`px-2 py-0.5 text-sm rounded transition-colors ${
                    table.getState().pagination.pageIndex === i
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Open Position Details Popup */}
      <OpenPositionDetailsPopup
        position={selectedPosition}
        isOpen={isPositionDetailsOpen}
        onClose={() => {
          setIsPositionDetailsOpen(false)
          setSelectedPosition(null)
        }}
      />
      
      {/* Edit Position Popup */}
      <EditPositionPopup
        position={selectedPosition}
        isOpen={isEditPositionOpen}
        onClose={() => {
          setIsEditPositionOpen(false)
          setSelectedPosition(null)
        }}
      />
    </div>
  )
}

// PositionsTable component
const PositionsTable: React.FC<{ data: PositionData[]; searchQuery?: string; startDate?: string; endDate?: string }> = ({ data, searchQuery = '', startDate = '', endDate = '' }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(null)
  const [isPositionDetailsOpen, setIsPositionDetailsOpen] = useState(false)

  const columnHelper = createColumnHelper<PositionData>()

  const handleViewPosition = (position: PositionData) => {
    setSelectedPosition(position)
    setIsPositionDetailsOpen(true)
  }

  const columns = [
    columnHelper.accessor('type', {
      header: 'Type',
      cell: () => (
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    }),
    columnHelper.accessor('positionId', {
      header: 'Position ID',
      cell: ({ getValue }) => <span className="font-mono text-xs text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('deviceInfoOpen', {
      header: 'Device Info - Open',
      cell: ({ getValue }) => <span className="text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('deviceInfoClose', {
      header: 'Device Info - Close',
      cell: ({ getValue }) => <span className="text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('symbol', {
      header: 'Symbol',
      cell: ({ getValue }) => <span className="font-medium text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('openTime', {
      header: 'Open Time (UTC+0)',
      cell: ({ getValue }) => <span className="text-xs text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('closeTime', {
      header: 'Close Time (UTC+0)',
      cell: ({ getValue }) => <span className="text-xs text-white">{getValue()}</span>,
    }),
    columnHelper.accessor('realizedPnL', {
      header: 'Realized PnL',
      cell: ({ getValue }) => (
        <span className={`font-medium ${getValue() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor('swapFee', {
      header: 'Swap Fee',
      cell: ({ getValue }) => <span className="text-white">{getValue() || '---'}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <button 
          onClick={() => handleViewPosition(row.original)}
          className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          title="View Position Details"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" />
          </svg>
        </button>
      ),
    }),
  ]

  // Filter data based on date range
  const filteredData = React.useMemo(() => {
    if (!startDate && !endDate) return data;
    
    return data.filter(position => {
      const openTime = new Date(position.openTime);
      const closeTime = new Date(position.closeTime);
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (openTime >= start && openTime <= end) || (closeTime >= start && closeTime <= end);
      } else if (startDate) {
        const start = new Date(startDate);
        return openTime >= start || closeTime >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        return openTime <= end || closeTime <= end;
      }
      
      return true;
    });
  }, [data, startDate, endDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  return (
    <div className="space-y-1">
      {/* Table */}
      <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 border border-gray-700 rounded-lg">
        <table className="w-full min-w-[1200px] text-xs">
          <thead className="bg-gray-700 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-2 py-1 text-left font-medium cursor-pointer hover:bg-gray-600 transition-colors border-r border-gray-600 first:border-l border-gray-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-700 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-1 border-r border-gray-600 first:border-l border-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-white">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          
          {/* Records per page selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Show:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[10, 20, 30, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-300">entries</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
                      <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {table.getPageCount() > 1 && (
            <div className="flex items-center space-x-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`px-2 py-0.5 text-sm rounded transition-colors ${
                    table.getState().pagination.pageIndex === i
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-0.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Position Details Popup */}
      <PositionDetailsPopup
        position={selectedPosition}
        isOpen={isPositionDetailsOpen}
        onClose={() => {
          setIsPositionDetailsOpen(false)
          setSelectedPosition(null)
        }}
      />
    </div>
  )
}

const UserDetailsPopup: React.FC<UserDetailsPopupProps> = ({ user, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('user-details')
  const [showAddForm, setShowAddForm] = useState(false)
  const [transactionType, setTransactionType] = useState('transaction-history')
  const [activePositionTab, setActivePositionTab] = useState<'open' | 'closed'>('closed')
  const [positionSearchQuery, setPositionSearchQuery] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderSearchQuery, setOrderSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [orderUpdatedAt, setOrderUpdatedAt] = useState('')
  const [dealHistorySearchQuery, setDealHistorySearchQuery] = useState('')
  const [selectedPositionImpact, setSelectedPositionImpact] = useState('')
  const [dealHistoryGroup, setDealHistoryGroup] = useState('')
  const [dealHistoryCreatedAt, setDealHistoryCreatedAt] = useState('')
  const [isPriceDropAlertOpen, setIsPriceDropAlertOpen] = useState(false)
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false)

  if (!isOpen || !user) return null

  const handlePriceDropAlert = () => {
    setIsPriceDropAlertOpen(true)
  }

  const handlePriceDropAlertClose = () => {
    setIsPriceDropAlertOpen(false)
  }

  const handlePriceDropAlertSend = (data: any) => {
    // Handle the price drop alert data
    console.log('Price Drop Alert Data:', data)
    setIsPriceDropAlertOpen(false)
  }

  const handleScheduleMeeting = () => {
    setIsScheduleMeetingOpen(true)
  }

  const handleScheduleMeetingClose = () => {
    setIsScheduleMeetingOpen(false)
  }

  const handleScheduleMeetingSubmit = (data: any) => {
    // Handle the schedule meeting data
    console.log('Schedule Meeting Data:', data)
    setIsScheduleMeetingOpen(false)
  }

  const tabs: TabData[] = [
    {
      id: 'user-details',
      label: 'User Details',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={user.name || 'apex'}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={user.name || 'apex'}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue={user.email || 'apex@gmail.com'}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+3343243354544"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="american-samoa">American Samoa</option>
                <option value="pakistan">Pakistan</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                defaultValue="lahore"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Update
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'account-settings',
      label: 'Account Settings',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Type
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="cfd-hedging">CFD Hedging</option>
                <option value="cfd-net">CFD Net</option>
                <option value="spot">Spot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Margin Calculation Type
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="sum">Sum</option>
                <option value="net">Net</option>
                <option value="gross">Gross</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="eur">EUR</option>
                <option value="usd">USD</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum Margin Level Call
              </label>
              <input
                type="number"
                defaultValue="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Group <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="default-group">DefaultGroup</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assign Tags <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="1-tag">1 Tags selected</option>
                <option value="2-tags">2 Tags selected</option>
                <option value="no-tags">No Tags</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform Access Rights
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="full-access">Full Access</option>
                <option value="limited-access">Limited Access</option>
                <option value="read-only">Read Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User's Panel Access Right <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="default-user-panel">Default User_panel</option>
                <option value="admin-panel">Admin Panel</option>
                <option value="user-panel">User Panel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Leverage
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="1-100">1:100</option>
                <option value="1-200">1:200</option>
                <option value="1-500">1:500</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Leverage
              </label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="1-1000">1:1000</option>
                <option value="1-2000">1:2000</option>
                <option value="1-5000">1:5000</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Domain Name
              </label>
              <input
                type="url"
                defaultValue="https://backoffice.dtrader.tech"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Account Detail Section - Merged from Account Detail tab */}
          <div className="border-t border-gray-600 pt-6 mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Account Details</h4>
            
            {/* Email Information */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Email Information</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email || 'apex@gmail.com'}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Change Your Password</h5>
              <div className="space-y-3">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter New Password"
                      className="w-full px-3 py-2 pr-10 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Verify User
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Login User As View Mode
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Change Password
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Update
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'balance-info',
      label: 'Balance Info',
      icon: <CreditCard className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-400">Balance Info</h3>
            <div className="flex items-center space-x-2">
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Financial Metrics Grid */}
          <div className="space-y-6">
            {/* First Row - Currency Values */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Balance</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Equity</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Margin</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Free Margin</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Bonus</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Commission</div>
              </div>
            </div>

            {/* Second Row - Mixed Values */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 %</div>
                <div className="text-sm text-gray-400">Margin Level</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Unrealized Pnl</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Realized Pnl</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Bot Pnl</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">Total Deposits</div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white mb-1">0.00 EUR</div>
                <div className="text-sm text-gray-400">
                  Total Withdrawals
                  <div className="text-xs text-gray-500 mt-1">(Non-commissioned)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'bot-info',
      label: 'Bot Info',
      icon: <Bot className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-400">Bot Info</h3>
            <div className="flex items-center space-x-2">
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bot Metrics Grid */}
          <div className="space-y-6">
            {/* First Row - 6 cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Bot Name</div>
                    <div className="text-sm text-white font-semibold text-right">---</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Opened Positions</div>
                    <div className="text-sm text-white font-semibold text-right">0</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Closed Positions</div>
                    <div className="text-sm text-white font-semibold text-right">0</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Subscription Start</div>
                    <div className="text-sm text-white font-semibold text-right">---</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Subscription End</div>
                    <div className="text-sm text-white font-semibold text-right">---</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Today Profit Target</div>
                    <div className="text-sm text-white font-semibold text-right">0.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - 6 cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Today Gain</div>
                    <div className="text-sm text-white font-semibold text-right">0.00</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Remaining Gain</div>
                    <div className="text-sm text-white font-semibold text-right">0.00</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Prev. Subscription</div>
                    <div className="text-sm text-white font-semibold text-right">0.00</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">All-Time</div>
                    <div className="text-sm text-white font-semibold text-right">---</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Current Profit</div>
                    <div className="text-sm text-white font-semibold text-right">0.00 €</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase font-medium">Daily Goal %</div>
                    <div className="text-sm text-white font-semibold text-right">0.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'notes',
      label: 'Notes',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-4">User Notes</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Customer requested higher leverage for trading. Approved after verification.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-12 by Admin</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">Account verified successfully. All documents submitted.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-08 by Support</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Add a new note..."
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Note
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comment',
      label: 'Comment',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-4">User Comments</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-600 rounded-lg">
                <p className="text-white text-sm">User has been active in trading for the past 3 months.</p>
                <p className="text-gray-400 text-xs mt-2">2024-01-15 by Admin</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Add a new comment..."
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
      id: 'affiliate-links',
      label: 'Affiliate Links',
      icon: <Users2 className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-400">Affiliate Links (1)</h3>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* Search and Add Section */}
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Affiliate Links
              </label>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-2 border border-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </button>
          </div>

          {/* Add New Affiliate Link Form */}
          {showAddForm && (
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
              <h4 className="text-lg font-semibold text-white mb-4">Add New Affiliate Link</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Code (Leave empty to auto-generate) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom referral code"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Save Link
                </button>
              </div>
            </div>
          )}

          {/* Affiliate Links Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span>Referral Link</span>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span>Campaign</span>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span>Action</span>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  <tr className="hover:bg-gray-600">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300 truncate max-w-xs">
                          https://backoffice.dtrader.tech/r...
                        </span>
                        <button className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">Registered</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">Active</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'transactions',
      label: 'Transactions',
      icon: <CreditCard className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-400">Transaction Management</h3>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* Transaction Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Transaction Type
            </label>
            <select 
              className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              onChange={(e) => setTransactionType(e.target.value)}
              value={transactionType}
            >
              <option value="transaction-history">Transaction History</option>
              <option value="direct-deposit-withdraw">Direct (Deposit/Withdraw)</option>
              <option value="forcefully-withdraw">Forcefully Withdraw</option>
              <option value="add-remove-bonus">Add/Remove Bonus</option>
            </select>
          </div>

          {/* Dynamic Transaction Forms */}
          {transactionType === 'transaction-history' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">Transaction History</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-600 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Deposit</p>
                    <p className="text-sm text-gray-400">Bank Transfer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">+€5,000.00</p>
                    <p className="text-sm text-gray-400">2024-01-15 14:30</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-600 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Withdrawal</p>
                    <p className="text-sm text-gray-400">Bank Transfer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-medium">-€2,500.00</p>
                    <p className="text-sm text-gray-400">2024-01-10 09:15</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-600 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Trading Fee</p>
                    <p className="text-sm text-gray-400">EUR/USD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-medium">-€12.50</p>
                    <p className="text-sm text-gray-400">2024-01-08 16:45</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {transactionType === 'direct-deposit-withdraw' && (
            <div className="space-y-6">
              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                <textarea
                  placeholder="Enter Your Comment"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          )}

          {transactionType === 'forcefully-withdraw' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">Force Withdrawal</h4>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h5 className="text-red-400 font-semibold mb-2">Warning: Force Withdrawal</h5>
                    <p className="text-gray-300 text-sm mb-3">This action will forcefully withdraw all funds from the user's account. This operation cannot be undone and may affect the user's trading activities.</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="confirm-force" className="text-red-600 rounded" />
                        <label htmlFor="confirm-force" className="text-sm text-gray-300">I understand this action is irreversible</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="confirm-notification" className="text-red-600 rounded" />
                        <label htmlFor="confirm-notification" className="text-sm text-gray-300">Notify user about this action</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Withdrawal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Enter withdrawal amount"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                  <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason/Comment <span className="text-red-500">*</span></label>
                <textarea
                  placeholder="Enter reason for force withdrawal"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Force Withdraw
                </button>
              </div>
            </div>
          )}

          {transactionType === 'add-remove-bonus' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">Bonus Management</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Bonus Section */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <h5 className="text-green-400 font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Bonus
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bonus Amount <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        placeholder="Enter bonus amount"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bonus Type</label>
                      <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="welcome">Welcome Bonus</option>
                        <option value="deposit">Deposit Bonus</option>
                        <option value="loyalty">Loyalty Bonus</option>
                        <option value="promotional">Promotional Bonus</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                      <textarea
                        placeholder="Reason for bonus"
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Add Bonus
                    </button>
                  </div>
                </div>

                {/* Remove Bonus Section */}
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h5 className="text-red-400 font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                    Remove Bonus
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bonus Amount <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        placeholder="Enter amount to remove"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
                      <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="violation">Terms Violation</option>
                        <option value="expired">Bonus Expired</option>
                        <option value="manual">Manual Removal</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                      <textarea
                        placeholder="Reason for removal"
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Remove Bonus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: <TrendingUp className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Top Section - Summary Metrics */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Balance</div>
                <div className="text-lg font-bold text-white">10034.90</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Equity</div>
                <div className="text-lg font-bold text-white">10034.90</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Margin</div>
                <div className="text-lg font-bold text-white">0.00</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Free Margin</div>
                <div className="text-lg font-bold text-white">10034.90</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Bonus</div>
                <div className="text-lg font-bold text-white">0.00</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Commission</div>
                <div className="text-lg font-bold text-white">0.00</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Margin Level</div>
                <div className="text-lg font-bold text-white">0.00 %</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Unrealized PnL</div>
                <div className="text-lg font-bold text-white">0.00</div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Middle Section - Position Management */}
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">Positions (0 - 20)</h3>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Position Tabs */}
            <div className="flex space-x-1 mb-3">
              <button 
                onClick={() => setActivePositionTab('open')}
                className={`px-2 py-1 transition-colors border-b-2 ${
                  activePositionTab === 'open' 
                    ? 'text-white border-green-500' 
                    : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <svg className={`w-4 h-4 ${activePositionTab === 'open' ? 'text-green-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Open Positions</span>
                </div>
              </button>
              <button 
                onClick={() => setActivePositionTab('closed')}
                className={`px-2 py-1 transition-colors border-b-2 ${
                  activePositionTab === 'closed' 
                    ? 'text-white border-green-500' 
                    : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <svg className={`w-4 h-4 ${activePositionTab === 'closed' ? 'text-green-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Closed Positions</span>
                </div>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-3 flex flex-wrap gap-2">
              {/* Search Bar */}
              <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={positionSearchQuery}
                    onChange={(e) => setPositionSearchQuery(e.target.value)}
                    className="w-full px-2 py-1 pr-8 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {positionSearchQuery && (
                    <button
                      onClick={() => setPositionSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-300 mb-1">Date Range</label>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-400 self-center">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {(startDate || endDate) && (
                    <button
                      onClick={() => { setStartDate(''); setEndDate(''); }}
                      className="px-2 py-1 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 hover:text-white transition-colors"
                      title="Clear date filters"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Conditional Content Based on Selected Tab */}
            {activePositionTab === 'open' && (
              <OpenPositionsTable 
                data={mockOpenPositionData} 
                searchQuery={positionSearchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            )}

            {/* Positions Table - Show only for Closed Positions */}
            {activePositionTab === 'closed' && (
              <PositionsTable 
                data={mockPositionData} 
                searchQuery={positionSearchQuery}
                startDate={startDate}
                endDate={endDate}
              />
            )}


          </div>
        </div>
      )
    },
                {
              id: 'orders',
              label: 'Orders',
              icon: <FileText className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  {/* Filter Panel */}
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-gray-300">Filter Panel</h4>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {/* Search */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search orders..."
                            value={orderSearchQuery}
                            onChange={(e) => setOrderSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {orderSearchQuery && (
                            <button
                              onClick={() => setOrderSearchQuery('')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear search"
                              >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {/* All Statuses */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">All Statuses</label>
                        <div className="relative">
                          <select 
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">All Statuses</option>
                            <option value="filled">Filled</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {selectedStatus && (
                            <button
                              onClick={() => setSelectedStatus('')}
                              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear status filter"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {/* All Groups */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">All Groups</label>
                        <div className="relative">
                          <select 
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">All Groups</option>
                            <option value="default">Default</option>
                            <option value="premium">Premium</option>
                            <option value="vip">VIP</option>
                          </select>
                          {selectedGroup && (
                            <button
                              onClick={() => setSelectedGroup('')}
                              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear group filter"
                            >
                              ×
                            </button>
                            )}
                        </div>
                      </div>

                      {/* Order Updated At */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Order Updated At</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={orderUpdatedAt}
                            onChange={(e) => setOrderUpdatedAt(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {orderUpdatedAt && (
                            <button
                              onClick={() => setOrderUpdatedAt('')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear date filter"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <OrderTable 
                      data={mockOrderData} 
                      searchQuery={orderSearchQuery}
                      startDate=""
                      endDate=""
                    />
                  </div>
                </div>
              )
            },
            {
              id: 'dealHistory',
              label: 'Deal History',
              icon: <History className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  {/* Filter Panel */}
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-gray-300">Filter Panel</h4>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {/* Search */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search deals..."
                            value={dealHistorySearchQuery}
                            onChange={(e) => setDealHistorySearchQuery(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {dealHistorySearchQuery && (
                            <button
                              onClick={() => setDealHistorySearchQuery('')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear search"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {/* All Position Impacts */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">All Position Impacts</label>
                        <div className="relative">
                          <select 
                            value={selectedPositionImpact}
                            onChange={(e) => setSelectedPositionImpact(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">All Position Impacts</option>
                            <option value="opening">Opening</option>
                            <option value="closing">Closing</option>
                          </select>
                          {selectedPositionImpact && (
                            <button
                              onClick={() => setSelectedPositionImpact('')}
                              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear position impact filter"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {/* All Groups */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">All Groups</label>
                        <div className="relative">
                          <select 
                            value={dealHistoryGroup}
                            onChange={(e) => setDealHistoryGroup(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">All Groups</option>
                            <option value="default">Default</option>
                            <option value="premium">Premium</option>
                            <option value="vip">VIP</option>
                          </select>
                          {dealHistoryGroup && (
                            <button
                              onClick={() => setDealHistoryGroup('')}
                              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear group filter"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>

                      {/* History per deal Created At */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-300 mb-2">History per deal Created At</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={dealHistoryCreatedAt}
                            onChange={(e) => setDealHistoryCreatedAt(e.target.value)}
                            className="w-full px-3 py-2 pr-8 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {dealHistoryCreatedAt && (
                            <button
                              onClick={() => setDealHistoryCreatedAt('')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              title="Clear date filter"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deal History Table */}
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <DealHistoryTable 
                      data={mockDealHistoryData} 
                      searchQuery={dealHistorySearchQuery}
                      startDate=""
                      endDate=""
                    />
                  </div>
                </div>
              )
            }
          ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user.name} | User Detail
              </h2>
              <p className="text-gray-400 text-sm">Account ID: {user.accountId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Contact User"
            >
              <Phone className="w-5 h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Contact User
              </div>
            </button>
            <button 
              onClick={handleScheduleMeeting}
              className="p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Schedule Meeting"
            >
              <Calendar className="w-5 h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Schedule Meeting
              </div>
            </button>
            <button 
              onClick={handlePriceDropAlert}
              className="p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Price Drop Alert"
            >
              <AlertTriangle className="w-5 h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Price Drop Alert
              </div>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Close Popup"
            >
              <X className="w-5 h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Close Popup
              </div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex space-x-1 p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
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
        <div className="p-6 overflow-y-auto max-h-[60vh]">
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

export default UserDetailsPopup 