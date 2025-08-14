import React, { useState, useMemo, useEffect } from 'react'
import { 
  createColumnHelper, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  ColumnSizingState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  useReactTable,
  flexRender
} from '@tanstack/react-table'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Phone,
  Clock,
  User,
  Eye,
  Trash2,
  X,
  Calendar,
  CalendarPlus,
  History,
  FileText
} from 'lucide-react'

// Call data interface
export interface CallData {
  id: string
  subject: string
  managerAssigned: string
  accountId: string
  phoneNumber: string
  invitedUser: string
  startTime: string
  duration: string
  note: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'missed'
}

// Mock data for calls
const callData: CallData[] = [
  {
    id: '1',
    subject: 'Trading Strategy Consultation',
    managerAssigned: 'John Manager',
    accountId: 'ACC001',
    phoneNumber: '+1-555-0123',
    invitedUser: 'Alice Trader',
    startTime: '2024-03-20 10:00 AM',
    duration: '45 min',
    note: 'Discuss new trading strategies and risk management',
    status: 'completed'
  },
  {
    id: '2',
    subject: 'Account Setup Call',
    managerAssigned: 'Sarah Advisor',
    accountId: 'ACC002',
    phoneNumber: '+1-555-555-0124',
    invitedUser: 'Bob Investor',
    startTime: '2024-03-20 02:00 PM',
    duration: '30 min',
    note: 'New account setup and verification process',
    status: 'scheduled'
  },
  {
    id: '3',
    subject: 'Technical Support',
    managerAssigned: 'Mike Tech',
    accountId: 'ACC003',
    phoneNumber: '+1-555-0125',
    invitedUser: 'Carol User',
    startTime: '2024-03-20 11:30 AM',
    duration: '20 min',
    note: 'Platform access issues resolution',
    status: 'in-progress'
  },
  {
    id: '4',
    subject: 'Portfolio Review',
    managerAssigned: 'Lisa Analyst',
    accountId: 'ACC004',
    phoneNumber: '+1-555-0126',
    invitedUser: 'David Client',
    startTime: '2024-03-19 03:00 PM',
    duration: '60 min',
    note: 'Quarterly portfolio performance review',
    status: 'completed'
  },
  {
    id: '5',
    subject: 'Risk Assessment Call',
    managerAssigned: 'Tom Risk',
    accountId: 'ACC005',
    phoneNumber: '+1-555-0127',
    invitedUser: 'Emma Risk',
    startTime: '2024-03-25 09:00 AM',
    duration: '40 min',
    note: 'Risk assessment and mitigation strategies',
    status: 'scheduled'
  },
  {
    id: '6',
    subject: 'Client Onboarding',
    managerAssigned: 'Anna Client',
    accountId: 'ACC006',
    phoneNumber: '+1-555-0128',
    invitedUser: 'Frank New',
    startTime: '2024-03-28 01:00 PM',
    duration: '50 min',
    note: 'New client onboarding process',
    status: 'scheduled'
  },
  {
    id: '7',
    subject: 'Market Analysis',
    managerAssigned: 'Carl Market',
    accountId: 'ACC007',
    phoneNumber: '+1-555-0129',
    invitedUser: 'Grace Analyst',
    startTime: '2024-03-30 10:30 AM',
    duration: '35 min',
    note: 'Weekly market analysis discussion',
    status: 'scheduled'
  },
  {
    id: '8',
    subject: 'Client Consultation',
    managerAssigned: 'Emma Advisor',
    accountId: 'ACC008',
    phoneNumber: '+1-555-0130',
    invitedUser: 'Michael Client',
    startTime: '2024-03-15 11:00 AM',
    duration: '45 min',
    note: 'Investment strategy consultation',
    status: 'scheduled'
  },
  {
    id: '9',
    subject: 'Platform Training',
    managerAssigned: 'David Trainer',
    accountId: 'ACC009',
    phoneNumber: '+1-555-0131',
    invitedUser: 'Sarah New',
    startTime: '2024-03-18 02:00 PM',
    duration: '60 min',
    note: 'New user platform training session',
    status: 'scheduled'
  },
  {
    id: '10',
    subject: 'Portfolio Review',
    managerAssigned: 'Lisa Analyst',
    accountId: 'ACC010',
    phoneNumber: '+1-555-0132',
    invitedUser: 'Robert Investor',
    startTime: '2024-03-22 09:30 AM',
    duration: '50 min',
    note: 'Monthly portfolio performance review',
    status: 'scheduled'
  },
  {
    id: '11',
    subject: 'Risk Management',
    managerAssigned: 'Tom Risk',
    accountId: 'ACC011',
    phoneNumber: '+1-555-0133',
    invitedUser: 'Jennifer Risk',
    startTime: '2024-03-26 03:00 PM',
    duration: '40 min',
    note: 'Risk assessment and mitigation planning',
    status: 'scheduled'
  },
  {
    id: '12',
    subject: 'Compliance Check',
    managerAssigned: 'Rachel Compliance',
    accountId: 'ACC012',
    phoneNumber: '+1-555-0134',
    invitedUser: 'William Client',
    startTime: '2024-03-29 10:00 AM',
    duration: '30 min',
    note: 'Annual compliance verification',
    status: 'scheduled'
  },
  {
    id: '13',
    subject: 'Strategy Meeting',
    managerAssigned: 'Alex Strategy',
    accountId: 'ACC013',
    phoneNumber: '+1-555-0135',
    invitedUser: 'Amanda Team',
    startTime: '2024-03-12 01:30 PM',
    duration: '90 min',
    note: 'Quarterly strategy planning session',
    status: 'scheduled'
  },
  {
    id: '14',
    subject: 'Client Onboarding',
    managerAssigned: 'Anna Client',
    accountId: 'ACC014',
    phoneNumber: '+1-555-0136',
    invitedUser: 'Christopher New',
    startTime: '2024-03-19 02:30 PM',
    duration: '55 min',
    note: 'New client account setup',
    status: 'scheduled'
  },
  {
    id: '15',
    subject: 'Technical Support',
    managerAssigned: 'Mike Tech',
    accountId: 'ACC015',
    phoneNumber: '+1-555-0137',
    invitedUser: 'Patricia User',
    startTime: '2024-03-21 11:30 AM',
    duration: '25 min',
    note: 'Platform access troubleshooting',
    status: 'scheduled'
  },
  {
    id: '16',
    subject: 'Market Update',
    managerAssigned: 'Carl Market',
    accountId: 'ACC016',
    phoneNumber: '+1-555-0138',
    invitedUser: 'Daniel Analyst',
    startTime: '2024-03-27 09:00 AM',
    duration: '45 min',
    note: 'Weekly market trends discussion',
    status: 'scheduled'
  },
  {
    id: '17',
    subject: 'Investment Review',
    managerAssigned: 'Emma Advisor',
    accountId: 'ACC017',
    phoneNumber: '+1-555-0139',
    invitedUser: 'Victoria Client',
    startTime: '2024-03-14 03:30 PM',
    duration: '40 min',
    note: 'Investment portfolio assessment',
    status: 'scheduled'
  },
  {
    id: '18',
    subject: 'Training Session',
    managerAssigned: 'David Trainer',
    accountId: 'ACC018',
    phoneNumber: '+1-555-0140',
    invitedUser: 'Thomas New',
    startTime: '2024-03-23 01:00 PM',
    duration: '75 min',
    note: 'Advanced trading techniques training',
    status: 'scheduled'
  }
]

// Mock data for view detail popup tabs
const callHistoryData = [
  {
    id: '1',
    date: '2024-03-15T09:00:00',
    duration: '45 minutes',
    status: 'completed',
    notes: 'Discussed portfolio performance and investment strategy',
    outcome: 'Client satisfied with current performance'
  },
  {
    id: '2',
    date: '2024-03-10T14:30:00',
    duration: '30 minutes',
    status: 'completed',
    notes: 'Follow-up call regarding new investment opportunities',
    outcome: 'Client interested in tech sector investments'
  },
  {
    id: '3',
    date: '2024-03-05T11:00:00',
    duration: '60 minutes',
    status: 'completed',
    notes: 'Initial consultation and risk assessment',
    outcome: 'Risk profile established, portfolio recommendations made'
  }
]

const commentsNotesData = [
  {
    id: '1',
    author: 'John Smith',
    date: '2024-03-15T10:30:00',
    type: 'note',
    content: 'Client expressed concerns about market volatility. Recommended defensive positioning.',
    priority: 'high'
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    date: '2024-03-14T16:45:00',
    type: 'comment',
    content: 'Follow-up required in 2 weeks to discuss new investment opportunities.',
    priority: 'medium'
  },
  {
    id: '3',
    author: 'John Smith',
    date: '2024-03-12T09:15:00',
    type: 'note',
    content: 'Client requested information about sustainable investment options.',
    priority: 'low'
  }
]

const appointmentsData = [
  {
    id: '1',
    date: '2024-03-20T10:00:00',
    type: 'Portfolio Review',
    status: 'confirmed',
    location: 'Virtual Meeting',
    attendees: ['John Smith', 'Sarah Johnson'],
    notes: 'Quarterly portfolio review and strategy adjustment'
  },
  {
    id: '2',
    date: '2024-03-25T14:00:00',
    type: 'Investment Planning',
    status: 'pending',
    location: 'Office Meeting',
    attendees: ['John Smith', 'Sarah Johnson', 'Financial Advisor'],
    notes: 'Long-term investment planning session'
  },
  {
    id: '3',
    date: '2024-03-28T11:30:00',
    type: 'Risk Assessment',
    status: 'confirmed',
    location: 'Virtual Meeting',
    attendees: ['John Smith', 'Sarah Johnson'],
    notes: 'Annual risk tolerance review and portfolio rebalancing'
  }
]

const CallsTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [isDialpadOpen, setIsDialpadOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month')
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false)
  const [scheduleCallData, setScheduleCallData] = useState({
    subject: '',
    managerAssigned: '',
    accountId: '',
    phoneNumber: '',
    invitedUser: '',
    startTime: '',
    duration: '30',
    note: '',
    status: 'scheduled'
  })
  const [isViewDetailOpen, setIsViewDetailOpen] = useState(false)
  const [selectedCallForDetail, setSelectedCallForDetail] = useState<CallData | null>(null)
  const [activeTab, setActiveTab] = useState<'callHistory' | 'comments' | 'appointments'>('callHistory')
  const [showAddCommentForm, setShowAddCommentForm] = useState(false)
  const [newComment, setNewComment] = useState({
    content: '',
    type: 'comment',
    priority: 'medium'
  })
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [callToDelete, setCallToDelete] = useState<CallData | null>(null)

  // Handle long press for 0 button
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)

  const handleZeroButtonMouseDown = () => {
    const timer = setTimeout(() => {
      setIsLongPressing(true)
      setPhoneNumber(prev => prev + '+')
    }, 500) // 500ms for long press
    setLongPressTimer(timer)
  }

  const handleZeroButtonMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    if (!isLongPressing) {
      setPhoneNumber(prev => prev + '0')
    }
    setIsLongPressing(false)
  }

  const handleZeroButtonMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    setIsLongPressing(false)
  }

  const handleScheduleCall = (callData?: CallData) => {
    if (callData) {
      setScheduleCallData({
        subject: callData.subject,
        managerAssigned: callData.managerAssigned,
        accountId: callData.accountId,
        phoneNumber: callData.phoneNumber,
        invitedUser: callData.invitedUser,
        startTime: callData.startTime,
        duration: callData.duration,
        note: callData.note,
        status: 'scheduled'
      })
    } else {
      setScheduleCallData({
        subject: '',
        managerAssigned: '',
        accountId: '',
        phoneNumber: '',
        invitedUser: '',
        startTime: '',
        duration: '30',
        note: '',
        status: 'scheduled'
      })
    }
    setIsScheduleCallOpen(true)
  }

  const handleViewDetail = (callData: CallData) => {
    setSelectedCallForDetail(callData)
    setActiveTab('callHistory')
    setIsViewDetailOpen(true)
  }

  const handleAddComment = () => {
    if (newComment.content.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'Current User',
        date: new Date().toISOString(),
        type: newComment.type as 'note' | 'comment',
        content: newComment.content.trim(),
        priority: newComment.priority as 'high' | 'medium' | 'low'
      }
      
      // Add to comments data (in a real app, this would be an API call)
      commentsNotesData.push(comment)
      
      // Reset form
      setNewComment({
        content: '',
        type: 'comment',
        priority: 'medium'
      })
      setShowAddCommentForm(false)
    }
  }

  const handleDeleteCall = (callData: CallData) => {
    setCallToDelete(callData)
    setIsDeletePopupOpen(true)
  }

  const confirmDeleteCall = () => {
    if (callToDelete) {
      // Remove from call data (in a real app, this would be an API call)
      const index = callData.findIndex(call => call.id === callToDelete.id)
      if (index > -1) {
        callData.splice(index, 1)
      }
      
      // Close popup and reset
      setIsDeletePopupOpen(false)
      setCallToDelete(null)
    }
  }

  // Calendar helper functions
  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }
    return week
  }

  const getDayEvents = (date: Date) => {
    return callData.filter(call => {
      if (call.status !== 'scheduled') return false
      const callDate = new Date(call.startTime)
      return callDate.toDateString() === date.toDateString()
    }).sort((a, b) => {
      const timeA = new Date(a.startTime).getTime()
      const timeB = new Date(b.startTime).getTime()
      return timeA - timeB
    })
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase()
  }

  // Handle keyboard input for dialpad
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isDialpadOpen) return
      
      const key = event.key
      
      // Allow numbers 0-9
      if (/^[0-9]$/.test(key)) {
        setPhoneNumber(prev => prev + key)
      }
      // Allow special characters * and #
      else if (key === '*' || key === '#') {
        setPhoneNumber(prev => prev + key)
      }
      // Allow backspace
      else if (key === 'Backspace') {
        setPhoneNumber(prev => prev.slice(0, -1))
      }
      // Allow Enter to make call
      else if (key === 'Enter' && phoneNumber.length > 0) {
        console.log('Making call to:', phoneNumber)
        // Handle call logic here
        // You can add API call here to actually make the call
        
        // Close popup and reset
        setIsDialpadOpen(false)
        setPhoneNumber('')
      }
      // Allow Escape to close popup
      else if (key === 'Escape') {
        setIsDialpadOpen(false)
        setPhoneNumber('')
      }
    }

    if (isDialpadOpen) {
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isDialpadOpen, phoneNumber])

  const columnHelper = createColumnHelper<CallData>()

  const columns = useMemo<ColumnDef<CallData, any>[]>(
    () => [
      // Checkbox column
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
          />
        ),
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        size: 50,
      }),

      // Subject column
      columnHelper.accessor('subject', {
        header: 'Subject',
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        size: 250,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Manager Assigned column
      columnHelper.accessor('managerAssigned', {
        header: 'Manager Assigned',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm">{getValue()}</span>
          </div>
        ),
        size: 180,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Account ID column
      columnHelper.accessor('accountId', {
        header: 'Account ID',
        cell: ({ getValue }) => (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono">
            {getValue()}
          </span>
        ),
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Phone Number column
      columnHelper.accessor('phoneNumber', {
        header: 'Phone Number',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3 text-gray-500" />
            <span className="text-sm">{getValue()}</span>
          </div>
        ),
        size: 150,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Invited User column
      columnHelper.accessor('invitedUser', {
        header: 'Invited User',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm">{getValue()}</span>
          </div>
        ),
        size: 150,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Start Time column
      columnHelper.accessor('startTime', {
        header: 'Start Time',
        cell: ({ getValue }) => (
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-sm">{getValue()}</span>
          </div>
        ),
        size: 160,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Duration column
      columnHelper.accessor('duration', {
        header: 'Duration',
        cell: ({ getValue }) => (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-xs">
            {getValue()}
          </span>
        ),
        size: 100,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Note column
      columnHelper.accessor('note', {
        header: 'Note',
        cell: ({ getValue }) => {
          const note = getValue<string>();
          const words = note.split(' ');
          const truncatedText = words.length > 8 ? `${words.slice(0, 8).join(' ')}...` : note;
          
          return (
            <span 
              className="text-sm text-gray-600 dark:text-gray-400 max-w-xs cursor-help"
              title={note}
            >
              {truncatedText}
            </span>
          );
        },
        size: 200,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Status column
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<string>();
          const statusConfig = {
            'scheduled': { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', label: 'Scheduled' },
            'in-progress': { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', label: 'In Progress' },
            'completed': { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', label: 'Completed' },
            'cancelled': { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Cancelled' },
            'missed': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: 'Missed' }
          };
          
          const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
          
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
              {config.label}
            </span>
          );
        },
        size: 120,
        enableGlobalFilter: true,
        enableResizing: true,
        enableHiding: true,
      }),

      // Actions column
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleViewDetail(row.original)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Eye className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                View Details
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Handle make call
                console.log('Make call to:', row.original.phoneNumber)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Phone className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Make Call
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleScheduleCall(row.original)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <CalendarPlus className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Schedule Call
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteCall(row.original)
              }}
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center relative group overflow-visible"
            >
              <Trash2 className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Delete Call
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
          </div>
        ),
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        size: 180,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: callData,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnSizing,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnSizingChange: setColumnSizing,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: 'includesString',
    columnResizeDirection: 'ltr',
  })

  return (
    <div className="space-y-4">
      {/* Advanced Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
        <div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-2 sm:space-y-0"
          onClick={() => setFilterPanelOpen(!filterPanelOpen)}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Refine your search with multiple criteria</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">0 active filters</span>
            {filterPanelOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            )}
          </div>
        </div>

        {filterPanelOpen && (
          <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search calls..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-8 sm:pl-10 lg:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toolbar with Action Buttons and Search */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 mb-4 border-2 border-gray-600 dark:border-gray-500 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left Section - Action Buttons */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-700 dark:bg-gray-600 rounded-lg p-2 flex items-center space-x-2 border border-gray-500 dark:border-gray-400 shadow-md">
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Phone className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Schedule New Call
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <Clock className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Call History
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible">
                <User className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Manage Managers
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
              <button 
                onClick={() => setIsDialpadOpen(true)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
              >
                <Phone className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Dialpad
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>

              {/* Event Calendar Button */}
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
              >
                <Calendar className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Event Calendar
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>

              {/* Schedule Call Button */}
              <button
                onClick={() => handleScheduleCall()}
                className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
              >
                <CalendarPlus className="w-4 h-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  Schedule Call
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Section - Search */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-48 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`data-table-header px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none relative border-r border-gray-200 dark:border-gray-600 ${
                        header.column.getCanSort() ? 'hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                      }`}
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center justify-between ${
                            header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center space-x-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="w-4 h-4 text-blue-600" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600"
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            {/* Left side - Results info and page size selector */}
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{' '}
                of <span className="font-semibold text-gray-900 dark:text-white">{table.getFilteredRowModel().rows.length}</span> results
              </span>
              
              {/* Page size selector */}
              <div className="page-size-selector">
                <span className="page-size-label">Show:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="page-size-select"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span className="page-size-label">per page</span>
              </div>
            </div>

            {/* Right side - Pagination controls */}
            <div className="table-footer-right">
              {/* Page numbers */}
              {table.getPageCount() > 0 && (
                <div className="pagination-container">
                  {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                    const pageIndex = table.getState().pagination.pageIndex
                    const pageCount = table.getPageCount()
                    let pageNumber
                    
                    if (pageCount <= 5) {
                      pageNumber = i
                    } else if (pageIndex < 3) {
                      pageNumber = i
                    } else if (pageIndex >= pageCount - 3) {
                      pageNumber = pageIndex - 2 + i
                    } else {
                      pageNumber = pageIndex - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => table.setPageIndex(pageNumber)}
                        className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                          pageNumber === pageIndex
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]`}
                      >
                        {pageNumber + 1}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center space-x-1">
                {/* First/Previous buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="First page"
                  >
                    <ChevronsLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                </div>

                {/* Next/Last buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Next page"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-1.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[2rem] min-h-[2rem]"
                    title="Last page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialpad Popup */}
      {isDialpadOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-2xl max-w-[256px] w-full border border-gray-200/50 dark:border-gray-600/50 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-2 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-12 h-12 bg-white rounded-full -mr-6 -mt-6"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-white rounded-full -ml-4 -mb-4"></div>
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 shadow-lg">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Dialpad</h3>
                    <p className="text-blue-100 text-xs">Enter phone number to make a call</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsDialpadOpen(false)
                    setPhoneNumber('')
                  }}
                  className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Phone Number Display */}
            <div className="p-2">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-2 text-center border border-gray-200/50 dark:border-gray-600/50 shadow-inner">
                <div className="text-lg font-mono font-bold text-gray-900 dark:text-white min-h-[1.5rem] flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-sm">
                  {phoneNumber || (
                    <span className="text-gray-400 dark:text-gray-500">Enter number...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Dialpad Grid */}
            <div className="px-2 pb-2">
              <div className="grid grid-cols-3 gap-1.5 justify-items-center">
                {/* Number buttons 1-9 */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const letters = {
                    1: '',
                    2: 'ABC',
                    3: 'DEF',
                    4: 'GHI',
                    5: 'JKL',
                    6: 'MNO',
                    7: 'PQRS',
                    8: 'TUV',
                    9: 'WXYZ'
                  }
                  
                  return (
                    <button
                      key={num}
                      onClick={() => setPhoneNumber(prev => prev + num.toString())}
                      className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-900 text-gray-900 dark:text-white rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-200/50 dark:border-gray-600/50 flex flex-col items-center justify-center"
                    >
                      <span className="text-lg">{num}</span>
                      {letters[num as keyof typeof letters] && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-normal">
                          {letters[num as keyof typeof letters]}
                        </span>
                      )}
                    </button>
                  )
                })}
                
                {/* Special buttons */}
                <button
                  onClick={() => setPhoneNumber(prev => prev + '*')}
                  className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-900 text-gray-900 dark:text-white rounded-lg font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center"
                >
                  *
                </button>
                <button
                  onMouseDown={handleZeroButtonMouseDown}
                  onMouseUp={handleZeroButtonMouseUp}
                  onMouseLeave={handleZeroButtonMouseLeave}
                  className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-900 text-gray-900 dark:text-white rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-200/50 dark:border-gray-600/50 flex flex-col items-center justify-center"
                >
                  <span className="text-lg">0</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-normal">+</span>
                </button>
                <button
                  onClick={() => setPhoneNumber(prev => prev + '#')}
                  className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-900 text-gray-900 dark:text-white rounded-lg font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-green-200/50 dark:border-gray-600/50 flex items-center justify-center"
                >
                  #
                </button>
              </div>


            </div>

            {/* Action buttons */}
            <div className="px-2 pb-2">
              <div className="flex items-center justify-between space-x-2">
                <button
                  onClick={() => setPhoneNumber('')}
                  className="flex-1 px-2 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    if (phoneNumber.length > 0) {
                      setPhoneNumber(prev => prev.slice(0, -1))
                    }
                  }}
                  className="flex-1 px-2 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm"
                >
                  Backspace
                </button>
              </div>
            </div>

            {/* Call Button */}
            <div className="px-2 pb-2">
              <button
                onClick={() => {
                  if (phoneNumber.length > 0) {
                    console.log('Making call to:', phoneNumber)
                    // Handle call logic here
                    // You can add API call here to actually make the call
                    
                    // Close popup and reset
                    setIsDialpadOpen(false)
                    setPhoneNumber('')
                  }
                }}
                disabled={phoneNumber.length === 0}
                className="w-full px-3 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 active:scale-95 border border-green-400/50"
              >
                <div className="w-3 h-3 bg-white/20 rounded-full p-0.5">
                  <Phone className="w-2 h-2 text-white" />
                </div>
                <span>Call {phoneNumber || 'Number'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Calendar Popup */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full border border-gray-700 dark:border-gray-600 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800 dark:bg-gray-900 p-4 text-white relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-xl flex items-center justify-center border border-gray-600 dark:border-gray-500 shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Call Schedule Calendar</h3>
                    <p className="text-gray-300 text-sm">View and manage scheduled calls</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Navigation */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                {/* Left Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const prevMonth = new Date(currentMonth)
                      prevMonth.setMonth(prevMonth.getMonth() - 1)
                      setCurrentMonth(prevMonth)
                    }}
                    className="p-2 text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date())}
                    className="px-3 py-2 text-sm text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    today
                  </button>
                  <button
                    onClick={() => {
                      const nextMonth = new Date(currentMonth)
                      nextMonth.setMonth(nextMonth.getMonth() + 1)
                      setCurrentMonth(nextMonth)
                    }}
                    className="p-2 text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Center Month/Year */}
                <h4 className="text-xl font-bold text-white">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
                </h4>

                {/* Right View Options */}
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => setCalendarView('month')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      calendarView === 'month' 
                        ? 'text-white bg-gray-700 dark:bg-gray-600' 
                        : 'text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    month
                  </button>
                  <button 
                    onClick={() => setCalendarView('week')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      calendarView === 'week' 
                        ? 'text-white bg-gray-700 dark:bg-gray-600' 
                        : 'text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    week
                  </button>
                  <button 
                    onClick={() => setCalendarView('day')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      calendarView === 'day' 
                        ? 'text-white bg-gray-700 dark:bg-gray-600' 
                        : 'text-gray-400 dark:text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    day
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {calendarView === 'month' && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-white py-3">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
                      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
                      const startDate = new Date(firstDay)
                      startDate.setDate(startDate.getDate() - firstDay.getDay())
                      
                      const days = []
                      for (let i = 0; i < 42; i++) {
                        const date = new Date(startDate)
                        date.setDate(startDate.getDate() + i)
                        
                        // Check if this date has scheduled calls
                        const scheduledCalls = callData.filter(call => {
                          if (call.status !== 'scheduled') return false
                          const callDate = new Date(call.startTime)
                          return callDate.toDateString() === date.toDateString()
                        })
                        
                        const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                        const isToday = date.toDateString() === new Date().toDateString()
                        const isSelected = date.toDateString() === selectedDate.toDateString()
                        
                        days.push(
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date)}
                            className={`relative p-3 h-20 text-sm transition-all duration-200 ${
                              isCurrentMonth 
                                ? 'text-white hover:bg-gray-700 dark:hover:bg-gray-600' 
                                : 'text-gray-500 dark:text-gray-600'
                            } ${
                              isToday ? 'bg-green-600 dark:bg-green-600' : ''
                            } ${
                              isSelected ? 'bg-gray-700 dark:bg-gray-600' : ''
                            }`}
                          >
                            <span className="block text-right text-sm font-medium mb-1">{date.getDate()}</span>
                            {scheduledCalls.length > 0 && (
                              <div className="space-y-1">
                                {scheduledCalls.slice(0, 3).map((call, index) => (
                                  <div
                                    key={index}
                                    className="text-xs bg-gray-600 text-white px-2 py-1 rounded truncate flex items-center space-x-1"
                                    title={`${call.startTime} - ${call.subject}`}
                                  >
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="truncate">
                                      {formatTime(call.startTime)} {call.subject.length > 15 ? call.subject.substring(0, 15) + '...' : call.subject}
                                    </span>
                                  </div>
                                ))}
                                {scheduledCalls.length > 3 && (
                                  <div className="text-xs text-gray-400 text-center">
                                    +{scheduledCalls.length - 3} more
                                  </div>
                                )}
                              </div>
                            )}
                          </button>
                        )
                      }
                      return days
                    })()}
                  </div>
                </>
              )}

              {calendarView === 'week' && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-white py-3">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {getWeekDates(currentMonth).map((date, index) => {
                      const scheduledCalls = getDayEvents(date)
                      const isToday = date.toDateString() === new Date().toDateString()
                      const isSelected = date.toDateString() === selectedDate.toDateString()
                      
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          className={`relative p-3 h-32 text-sm transition-all duration-200 ${
                            'text-white hover:bg-gray-700 dark:hover:bg-gray-600'
                          } ${
                            isToday ? 'bg-green-600 dark:bg-green-600' : ''
                          } ${
                            isSelected ? 'bg-gray-700 dark:bg-gray-600' : ''
                          }`}
                        >
                          <span className="block text-right text-sm font-medium mb-2">{date.getDate()}</span>
                          {scheduledCalls.length > 0 && (
                            <div className="space-y-1">
                              {scheduledCalls.map((call, callIndex) => (
                                <div
                                  key={callIndex}
                                  className="text-xs bg-gray-600 text-white px-2 py-1 rounded truncate flex items-center space-x-1"
                                  title={`${call.startTime} - ${call.subject}`}
                                >
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  <span className="truncate">
                                    {formatTime(call.startTime)} {call.subject}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {calendarView === 'day' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h5 className="text-lg font-semibold text-white mb-2">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </h5>
                  </div>
                  
                  <div className="space-y-3">
                    {getDayEvents(selectedDate).length > 0 ? (
                      getDayEvents(selectedDate).map((call, index) => (
                        <div key={call.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-lg font-semibold text-white">{call.subject}</span>
                              </div>
                              <p className="text-gray-300 mb-1">
                                {call.managerAssigned} • {call.invitedUser}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {formatTime(call.startTime)} • {call.duration}
                              </p>
                              <p className="text-gray-400 text-sm mt-2">
                                {call.note}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                                <Phone className="w-4 h-4" />
                              </button>
                                                          <button 
                              onClick={() => handleScheduleCall(call)}
                              className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                              <CalendarPlus className="w-4 h-4" />
                            </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No scheduled calls for this date</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Date Details - Only for Month View */}
            {calendarView === 'month' && (() => {
              const selectedDateCalls = getDayEvents(selectedDate)
              
              return selectedDateCalls.length > 0 ? (
                <div className="p-4 bg-gray-800 dark:bg-gray-800 border-t border-gray-700 dark:border-gray-600">
                  <h5 className="text-lg font-semibold text-white mb-3">
                    Calls for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h5>
                  <div className="space-y-3">
                    {selectedDateCalls.map(call => (
                      <div key={call.id} className="bg-gray-700 dark:bg-gray-700 rounded-lg p-3 border border-gray-600 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h6 className="font-semibold text-white">{call.subject}</h6>
                            <p className="text-sm text-gray-300">
                              {call.managerAssigned} • {call.invitedUser}
                            </p>
                            <p className="text-sm text-gray-400">
                              {formatTime(call.startTime)} • {call.duration}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-600 rounded-lg transition-colors duration-200">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleScheduleCall(call)}
                              className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                            >
                              <CalendarPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            })()}
          </div>
        </div>
      )}

      {/* View Detail Popup */}
      {isViewDetailOpen && selectedCallForDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                    {selectedCallForDetail.subject} | Call Details
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">Account ID: {selectedCallForDetail.accountId}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                <button 
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
                  title="Make Call"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Make Call
                  </div>
                </button>
                <button 
                  onClick={() => handleScheduleCall(selectedCallForDetail)}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
                  title="Schedule Call"
                >
                  <CalendarPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Schedule Call
                  </div>
                </button>
                <button
                  onClick={() => setIsViewDetailOpen(false)}
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

            {/* Call Summary */}
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Manager Assigned</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.managerAssigned}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Account ID</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.accountId}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Phone Number</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.phoneNumber}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Status</label>
                  <div className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium capitalize ${
                    selectedCallForDetail.status === 'completed' 
                      ? 'bg-green-900 text-green-400' 
                      : selectedCallForDetail.status === 'scheduled' 
                        ? 'bg-blue-900 text-blue-400' 
                        : 'bg-yellow-900 text-yellow-400'
                  }`}>
                    {selectedCallForDetail.status}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Subject</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.subject}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Invited User</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.invitedUser}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Start Time</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">
                    {new Date(selectedCallForDetail.startTime).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })} at {new Date(selectedCallForDetail.startTime).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Duration</label>
                  <div className="bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-white text-xs sm:text-sm">{selectedCallForDetail.duration} minutes</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700">
              <div className="flex space-x-1 p-2 sm:p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                <button
                  onClick={() => setActiveTab('callHistory')}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                    activeTab === 'callHistory'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span className="hidden lg:inline">Call History</span>
                  <span className="hidden sm:inline lg:hidden">History</span>
                  <span className="sm:hidden">History</span>
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors text-xs font-medium min-w-fit flex-shrink-0 ${
                    activeTab === 'comments'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden lg:inline">Comments/Notes</span>
                  <span className="hidden sm:inline lg:hidden">Comments</span>
                  <span className="sm:hidden">Comments</span>
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md whitespace-nowrap transition-colors duration-200 text-xs font-medium min-w-fit flex-shrink-0 ${
                    activeTab === 'appointments'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden lg:inline">Appointments</span>
                  <span className="hidden sm:inline lg:hidden">Appointments</span>
                  <span className="sm:hidden">Appointments</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
              {/* Call History Tab */}
              {activeTab === 'callHistory' && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Call History</h3>
                  <div className="space-y-3">
                    {callHistoryData.map((call) => (
                      <div key={call.id} className="bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-300">
                              {new Date(call.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{call.duration}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            call.status === 'completed' 
                              ? 'bg-green-900 text-green-400'
                              : 'bg-yellow-900 text-yellow-400'
                          }`}>
                            {call.status}
                          </span>
                        </div>
                        <p className="text-white mb-2">{call.notes}</p>
                        <p className="text-sm text-gray-300">{call.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments/Notes Tab */}
              {activeTab === 'comments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Comments & Notes</h3>
                    <button
                      onClick={() => setShowAddCommentForm(!showAddCommentForm)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>+</span>
                      <span className="hidden sm:inline">Add Comment</span>
                    </button>
                  </div>

                  {/* Add Comment Form */}
                  {showAddCommentForm && (
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <h4 className="text-sm font-medium text-white mb-3">Add New Comment</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Comment Type</label>
                          <select
                            value={newComment.type}
                            onChange={(e) => setNewComment(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="comment">Comment</option>
                            <option value="note">Note</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Priority</label>
                          <select
                            value={newComment.priority}
                            onChange={(e) => setNewComment(prev => ({ ...prev, priority: e.target.value }))}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Content</label>
                          <textarea
                            value={newComment.content}
                            onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                            rows={3}
                            placeholder="Enter your comment or note..."
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setShowAddCommentForm(false)
                              setNewComment({
                                content: '',
                                type: 'comment',
                                priority: 'medium'
                              })
                            }}
                            className="px-3 py-2 text-gray-300 bg-gray-600 hover:bg-gray-500 text-sm rounded transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.content.trim()}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-sm rounded transition-colors duration-200"
                          >
                            Add Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-3">
                    {commentsNotesData.map((item) => (
                      <div key={item.id} className="bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              item.priority === 'high' ? 'bg-red-500' : 
                              item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm font-medium text-white">{item.author}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400 capitalize">{item.type}</span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(item.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-white">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Upcoming Appointments</h3>
                  <div className="space-y-3">
                    {appointmentsData.map((appointment) => (
                      <div key={appointment.id} className="bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-sm font-medium text-white">{appointment.type}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{appointment.location}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-900 text-green-400'
                              : 'bg-yellow-900 text-yellow-400'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-1">Date & Time:</p>
                          <p className="text-white">
                            {new Date(appointment.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })} at {new Date(appointment.date).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-1">Attendees:</p>
                          <div className="flex flex-wrap gap-2">
                            {appointment.attendees.map((attendee, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                                {attendee}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-white">{appointment.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && callToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                    Delete Call
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">Are you sure you want to delete this call?</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="space-y-4">
                {/* Call Details */}
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Subject:</span>
                      <span className="text-sm font-medium text-white">{callToDelete.subject}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Manager:</span>
                      <span className="text-sm font-medium text-white">{callToDelete.managerAssigned}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Account ID:</span>
                      <span className="text-sm font-medium text-white">{callToDelete.accountId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status:</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        callToDelete.status === 'completed' 
                          ? 'bg-green-900 text-green-400' 
                          : callToDelete.status === 'scheduled' 
                            ? 'bg-blue-900 text-blue-400' 
                            : 'bg-yellow-900 text-yellow-400'
                      }`}>
                        {callToDelete.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-red-300 text-sm font-medium mb-1">This action cannot be undone</p>
                      <p className="text-red-400 text-xs">Deleting this call will permanently remove it from the system and all associated data will be lost.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center sm:justify-end space-x-3 pt-4 border-t border-gray-600">
                  <button
                    onClick={() => {
                      setIsDeletePopupOpen(false)
                      setCallToDelete(null)
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteCall}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Call Popup */}
      {isScheduleCallOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CalendarPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                    Schedule Call
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">Create or update call schedule</p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setIsScheduleCallOpen(false)}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors relative group"
                title="Close Popup"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Close Popup
                </div>
              </button>
            </div>

            {/* Form */}
            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Subject */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={scheduleCallData.subject}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
                      placeholder="Enter call subject"
                    />
                  </div>

                  {/* Manager Assigned */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Manager Assigned
                    </label>
                    <input
                      type="text"
                      value={scheduleCallData.managerAssigned}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, managerAssigned: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
                      placeholder="Manager name"
                    />
                  </div>

                  {/* Account ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Account ID
                    </label>
                    <input
                      type="text"
                      value={scheduleCallData.accountId}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, accountId: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
                      placeholder="Account ID"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={scheduleCallData.phoneNumber}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Invited User */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Invited User
                    </label>
                    <input
                      type="text"
                      value={scheduleCallData.invitedUser}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, invitedUser: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
                      placeholder="User name"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduleCallData.startTime}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={scheduleCallData.duration}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  {/* Note */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Note
                    </label>
                    <textarea
                      value={scheduleCallData.note}
                      onChange={(e) => setScheduleCallData(prev => ({ ...prev, note: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400 resize-none"
                      placeholder="Add any additional notes about the call..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center sm:justify-end pt-4 border-t border-gray-600">
                  <button
                    onClick={() => setIsScheduleCallOpen(false)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm sm:text-base mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log('Scheduling call:', scheduleCallData)
                      // Here you would typically make an API call to save the scheduled call
                      // For now, we'll just close the popup
                      setIsScheduleCallOpen(false)
                    }}
                    disabled={!scheduleCallData.subject || !scheduleCallData.startTime}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg text-sm sm:text-base flex items-center justify-center space-x-2"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Schedule Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CallsTable 