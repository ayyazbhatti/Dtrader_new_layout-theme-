import React, { useState, useMemo, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Settings, 
  TrendingUp,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  MessageSquare,
  DollarSign,
  Activity,
  Target,
  Percent,
  Clock,
  Calendar,
  FileText,
  Zap,
  Shield,
  Brain,
  Gauge,
  Target as TargetIcon,
  BarChart3,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Banknote,
  Wallet,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Ticket,
  Tag,
  User,
  Reply,
  Send,
  Archive,
  Star,
  StarOff,
  Flag,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import ModernColumnVisibilityPopup from './ModernColumnVisibilityPopup'
import AddTicketPopup from './TicketSystem'
import TicketChatPopup from './TicketChatPopup'

interface Ticket {
  id: string
  title: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'pending' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical'
  category: 'technical' | 'billing' | 'account' | 'trading' | 'general' | 'bug' | 'feature-request' | 'support'
  assignedTo: string
  assignedToId: string
  createdBy: string
  createdById: string
  createdAt: string
  updatedAt: string
  lastActivity: string
  responseTime: string
  resolutionTime: string
  totalMessages: number
  unreadMessages: number
  tags: string[]
  attachments: number
  customerRating: number
  internalNotes: string
  escalationLevel: number
  department: string
  estimatedResolution: string
  actualResolution: string
  customerSatisfaction: 'satisfied' | 'neutral' | 'dissatisfied' | 'pending'
  customerInfo: {
    name: string
    email: string
    phone: string
    accountId: string
    company: string
    location: string
    joinDate: string
    totalTrades: number
    accountBalance: number
    tradingVolume: number
  }
}

const TicketSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddTicket, setShowAddTicket] = useState(false)
  const [showColumnVisibility, setShowColumnVisibility] = useState(false)
  const [showChatPopup, setShowChatPopup] = useState(false)
  const [selectedTicketForChat, setSelectedTicketForChat] = useState<Ticket | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [ticketsPerPage, setTicketsPerPage] = useState(10)
  const [showTagManagement, setShowTagManagement] = useState(false)
  const [selectedTicketForTags, setSelectedTicketForTags] = useState<Ticket | null>(null)
  const [newTag, setNewTag] = useState('')
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedTicketForDelete, setSelectedTicketForDelete] = useState<Ticket | null>(null)
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    status: true,
    priority: true,
    category: true,
    assignedTo: true,
    createdBy: true,
    createdAt: true,
    lastActivity: true,
    totalMessages: true,
    unreadMessages: true,
    department: true,
    tags: true,
    actions: true
  })
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  // Mock data - replace with actual API calls
  const [mockTickets, setMockTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Login authentication issue',
      description: 'Users are unable to log in to the platform. Getting 401 error.',
      status: 'in-progress',
      priority: 'high',
      category: 'technical',
      assignedTo: 'John Smith',
      assignedToId: 'user1',
      createdBy: 'Customer Support',
      createdById: 'cs1',
      createdAt: '2024-12-19 10:30:00',
      updatedAt: '2024-12-19 15:45:00',
      lastActivity: '2024-12-19 15:45:00',
      responseTime: '2 hours',
      resolutionTime: 'Pending',
      totalMessages: 8,
      unreadMessages: 2,
      tags: ['authentication', 'login', 'urgent'],
      attachments: 3,
      customerRating: 0,
      internalNotes: 'Issue appears to be related to recent API changes',
      escalationLevel: 2,
      department: 'technical',
      estimatedResolution: '2024-12-20',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        accountId: 'MT4-12345',
        company: 'Trading Corp',
        location: 'New York, NY',
        joinDate: '2023-06-15',
        totalTrades: 156,
        accountBalance: 25000,
        tradingVolume: 125000
      }
    },
    {
      id: '2',
      title: 'Billing discrepancy in monthly statement',
      description: 'Customer reports incorrect charges on their monthly billing statement.',
      status: 'open',
      priority: 'medium',
      category: 'billing',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'Customer',
      createdById: 'cust1',
      createdAt: '2024-12-19 09:15:00',
      updatedAt: '2024-12-19 09:15:00',
      lastActivity: '2024-12-19 09:15:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['billing', 'statement', 'dispute'],
      attachments: 1,
      customerRating: 0,
      internalNotes: 'Need to verify transaction history',
      escalationLevel: 1,
      department: 'billing',
      estimatedResolution: '2024-12-22',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0456',
        accountId: 'MT4-67890',
        company: 'Investment LLC',
        location: 'Los Angeles, CA',
        joinDate: '2023-09-22',
        totalTrades: 89,
        accountBalance: 18000,
        tradingVolume: 95000
      }
    },
    {
      id: '3',
      title: 'Feature request: Dark mode for mobile app',
      description: 'Customer requests dark mode theme for the mobile trading application.',
      status: 'pending',
      priority: 'low',
      category: 'feature-request',
      assignedTo: 'Mike Davis',
      assignedToId: 'user3',
      createdBy: 'Customer',
      createdById: 'cust2',
      createdAt: '2024-12-19 08:45:00',
      updatedAt: '2024-12-19 08:45:00',
      lastActivity: '2024-12-19 08:45:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 0,
      tags: ['feature', 'mobile', 'ui'],
      attachments: 0,
      customerRating: 0,
      internalNotes: 'Add to Q1 2025 roadmap',
      escalationLevel: 1,
      department: 'development',
      estimatedResolution: '2025-03-31',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1-555-0789',
        accountId: 'MT4-11111',
        company: 'Tech Solutions',
        location: 'Chicago, IL',
        joinDate: '2024-01-10',
        totalTrades: 234,
        accountBalance: 42000,
        tradingVolume: 280000
      }
    },
    {
      id: '4',
      title: 'Trading platform connection issues',
      description: 'Customer experiencing frequent disconnections from the trading platform during market hours.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      assignedTo: 'John Smith',
      assignedToId: 'user1',
      createdBy: 'Customer',
      createdById: 'cust3',
      createdAt: '2024-12-19 07:30:00',
      updatedAt: '2024-12-19 07:30:00',
      lastActivity: '2024-12-19 07:30:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['connection', 'platform', 'urgent'],
      attachments: 2,
      customerRating: 0,
      internalNotes: 'Check server logs and network connectivity',
      escalationLevel: 1,
      department: 'technical',
      estimatedResolution: '2024-12-20',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        phone: '+1-555-0321',
        accountId: 'MT4-22222',
        company: 'Financial Partners',
        location: 'Miami, FL',
        joinDate: '2023-11-05',
        totalTrades: 67,
        accountBalance: 15000,
        tradingVolume: 75000
      }
    },
    {
      id: '5',
      title: 'Account verification documents rejected',
      description: 'Customer submitted KYC documents but they were rejected. Need clarification on requirements.',
      status: 'in-progress',
      priority: 'medium',
      category: 'account',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'Customer',
      createdById: 'cust4',
      createdAt: '2024-12-18 16:45:00',
      updatedAt: '2024-12-19 11:20:00',
      lastActivity: '2024-12-19 11:20:00',
      responseTime: '4 hours',
      resolutionTime: 'Pending',
      totalMessages: 5,
      unreadMessages: 0,
      tags: ['kyc', 'verification', 'account'],
      attachments: 3,
      customerRating: 0,
      internalNotes: 'Documents seem valid, check compliance requirements',
      escalationLevel: 1,
      department: 'account',
      estimatedResolution: '2024-12-21',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1-555-0654',
        accountId: 'MT4-33333',
        company: 'Global Investments',
        location: 'Seattle, WA',
        joinDate: '2024-02-15',
        totalTrades: 123,
        accountBalance: 35000,
        tradingVolume: 180000
      }
    },
    {
      id: '6',
      title: 'Mobile app crashes on iOS 17',
      description: 'App crashes immediately when opening on iPhone with iOS 17.2. Works fine on Android and older iOS versions.',
      status: 'open',
      priority: 'high',
      category: 'bug',
      assignedTo: 'Mike Davis',
      assignedToId: 'user3',
      createdBy: 'Customer',
      createdById: 'cust5',
      createdAt: '2024-12-19 06:15:00',
      updatedAt: '2024-12-19 06:15:00',
      lastActivity: '2024-12-19 06:15:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['mobile', 'ios', 'crash', 'urgent'],
      attachments: 1,
      customerRating: 0,
      internalNotes: 'Known issue with iOS 17.2, development team investigating',
      escalationLevel: 2,
      department: 'development',
      estimatedResolution: '2024-12-23',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@example.com',
        phone: '+1-555-0987',
        accountId: 'MT4-44444',
        company: 'Tech Traders',
        location: 'Austin, TX',
        joinDate: '2023-08-12',
        totalTrades: 89,
        accountBalance: 22000,
        tradingVolume: 110000
      }
    },
    {
      id: '7',
      title: 'Withdrawal request pending for 5 days',
      description: 'Submitted withdrawal request on Monday but still showing as pending. Usually processed within 24 hours.',
      status: 'in-progress',
      priority: 'high',
      category: 'billing',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'Customer',
      createdById: 'cust6',
      createdAt: '2024-12-14 14:30:00',
      updatedAt: '2024-12-19 10:15:00',
      lastActivity: '2024-12-19 10:15:00',
      responseTime: '2 hours',
      resolutionTime: 'Pending',
      totalMessages: 7,
      unreadMessages: 0,
      tags: ['withdrawal', 'pending', 'urgent', 'billing'],
      attachments: 2,
      customerRating: 0,
      internalNotes: 'Bank holiday delays, escalated to finance team',
      escalationLevel: 2,
      department: 'billing',
      estimatedResolution: '2024-12-20',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Robert Chen',
        email: 'robert.chen@example.com',
        phone: '+1-555-0123',
        accountId: 'MT4-55555',
        company: 'Capital Partners',
        location: 'San Francisco, CA',
        joinDate: '2022-11-03',
        totalTrades: 456,
        accountBalance: 75000,
        tradingVolume: 450000
      }
    },
    {
      id: '8',
      title: 'Request for API access and documentation',
      description: 'Need API access for automated trading strategies. Looking for comprehensive documentation and rate limits.',
      status: 'open',
      priority: 'medium',
      category: 'feature-request',
      assignedTo: 'Mike Davis',
      assignedToId: 'user3',
      createdBy: 'Customer',
      createdById: 'cust7',
      createdAt: '2024-12-19 05:45:00',
      updatedAt: '2024-12-19 05:45:00',
      lastActivity: '2024-12-19 05:45:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['api', 'documentation', 'automation', 'trading'],
      attachments: 0,
      customerRating: 0,
      internalNotes: 'Enterprise customer, high priority for business development',
      escalationLevel: 1,
      department: 'development',
      estimatedResolution: '2024-12-26',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Lisa Thompson',
        email: 'lisa.thompson@example.com',
        phone: '+1-555-0456',
        accountId: 'MT4-66666',
        company: 'Quantitative Capital',
        location: 'Boston, MA',
        joinDate: '2023-03-18',
        totalTrades: 234,
        accountBalance: 125000,
        tradingVolume: 890000
      }
    },
    {
      id: '9',
      title: 'Chart indicators not displaying correctly',
      description: 'RSI and MACD indicators showing incorrect values on 4H and 1D timeframes. 1H and 15M work fine.',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      assignedTo: 'John Smith',
      assignedToId: 'user1',
      createdBy: 'Customer',
      createdById: 'cust8',
      createdAt: '2024-12-19 04:20:00',
      updatedAt: '2024-12-19 04:20:00',
      lastActivity: '2024-12-19 04:20:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['charts', 'indicators', 'technical-analysis', 'ui'],
      attachments: 3,
      customerRating: 0,
      internalNotes: 'Possible data feed issue on higher timeframes',
      escalationLevel: 1,
      department: 'technical',
      estimatedResolution: '2024-12-22',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Michael O\'Connor',
        email: 'michael.oconnor@example.com',
        phone: '+1-555-0789',
        accountId: 'MT4-77777',
        company: 'Strategic Trading',
        location: 'Denver, CO',
        joinDate: '2024-05-22',
        totalTrades: 67,
        accountBalance: 18000,
        tradingVolume: 95000
      }
    },
    {
      id: '10',
      title: 'Account verification documents approved',
      description: 'All KYC documents have been verified and approved. Account should now have full trading access.',
      status: 'resolved',
      priority: 'low',
      category: 'account',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'System',
      createdById: 'system',
      createdAt: '2024-12-18 16:00:00',
      updatedAt: '2024-12-19 09:30:00',
      lastActivity: '2024-12-19 09:30:00',
      responseTime: '1 hour',
      resolutionTime: '17 hours',
      totalMessages: 3,
      unreadMessages: 0,
      tags: ['kyc', 'verification', 'approved', 'resolved'],
      attachments: 0,
      customerRating: 5,
      internalNotes: 'Customer satisfied with verification process',
      escalationLevel: 0,
      department: 'account',
      estimatedResolution: '2024-12-19',
      actualResolution: '2024-12-19 09:30:00',
      customerSatisfaction: 'satisfied',
      customerInfo: {
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        phone: '+1-555-0321',
        accountId: 'MT4-88888',
        company: 'Lee Investments',
        location: 'Portland, OR',
        joinDate: '2024-06-10',
        totalTrades: 23,
        accountBalance: 12000,
        tradingVolume: 45000
      }
    },
    {
      id: '11',
      title: 'Feature request: Multi-currency wallet',
      description: 'Would like to see support for multiple currencies in the wallet. Currently only supports USD, need EUR and GBP.',
      status: 'pending',
      priority: 'low',
      category: 'feature-request',
      assignedTo: 'Mike Davis',
      assignedToId: 'user3',
      createdBy: 'Customer',
      createdById: 'cust9',
      createdAt: '2024-12-18 15:30:00',
      updatedAt: '2024-12-18 15:30:00',
      lastActivity: '2024-12-18 15:30:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 0,
      tags: ['wallet', 'multi-currency', 'feature', 'international'],
      attachments: 0,
      customerRating: 0,
      internalNotes: 'Add to Q2 2025 roadmap, good for international expansion',
      escalationLevel: 1,
      department: 'development',
      estimatedResolution: '2025-06-30',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Carlos Mendez',
        email: 'carlos.mendez@example.com',
        phone: '+1-555-0654',
        accountId: 'MT4-99999',
        company: 'Mendez Trading',
        location: 'Miami, FL',
        joinDate: '2023-12-05',
        totalTrades: 156,
        accountBalance: 32000,
        tradingVolume: 180000
      }
    },
    {
      id: '12',
      title: 'Trading bot configuration error',
      description: 'Getting "Invalid strategy parameters" error when trying to configure automated trading bot. Parameters seem correct.',
      status: 'in-progress',
      priority: 'medium',
      category: 'technical',
      assignedTo: 'John Smith',
      assignedToId: 'user1',
      createdBy: 'Customer',
      createdById: 'cust10',
      createdAt: '2024-12-18 14:15:00',
      updatedAt: '2024-12-19 11:45:00',
      lastActivity: '2024-12-19 11:45:00',
      responseTime: '3 hours',
      resolutionTime: 'Pending',
      totalMessages: 6,
      unreadMessages: 0,
      tags: ['bot', 'automation', 'strategy', 'configuration'],
      attachments: 4,
      customerRating: 0,
      internalNotes: 'Parameter validation issue, checking bot engine',
      escalationLevel: 1,
      department: 'technical',
      estimatedResolution: '2024-12-21',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Amanda Foster',
        email: 'amanda.foster@example.com',
        phone: '+1-555-0987',
        accountId: 'MT4-10101',
        company: 'Foster Capital',
        location: 'Nashville, TN',
        joinDate: '2024-01-28',
        totalTrades: 89,
        accountBalance: 28000,
        tradingVolume: 120000
      }
    },
    {
      id: '13',
      title: 'Market data feed delay issue',
      description: 'Real-time market data showing 5-10 second delays. Affecting all currency pairs and timeframes.',
      status: 'open',
      priority: 'critical',
      category: 'technical',
      assignedTo: 'John Smith',
      assignedToId: 'user1',
      createdBy: 'Customer',
      createdById: 'cust11',
      createdAt: '2024-12-19 03:00:00',
      updatedAt: '2024-12-19 03:00:00',
      lastActivity: '2024-12-19 03:00:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['market-data', 'delay', 'critical', 'real-time'],
      attachments: 2,
      customerRating: 0,
      internalNotes: 'Infrastructure issue, escalated to DevOps team',
      escalationLevel: 3,
      department: 'technical',
      estimatedResolution: '2024-12-19',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Thomas Anderson',
        email: 'thomas.anderson@example.com',
        phone: '+1-555-0123',
        accountId: 'MT4-11111',
        company: 'Anderson Trading',
        location: 'Las Vegas, NV',
        joinDate: '2022-09-15',
        totalTrades: 567,
        accountBalance: 95000,
        tradingVolume: 650000
      }
    },
    {
      id: '14',
      title: 'Request for educational resources',
      description: 'Looking for comprehensive trading tutorials, webinars, and educational materials for beginner traders.',
      status: 'open',
      priority: 'low',
      category: 'support',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'Customer',
      createdById: 'cust12',
      createdAt: '2024-12-18 13:00:00',
      updatedAt: '2024-12-18 13:00:00',
      lastActivity: '2024-12-18 13:00:00',
      responseTime: 'Pending',
      resolutionTime: 'Pending',
      totalMessages: 1,
      unreadMessages: 1,
      tags: ['education', 'tutorials', 'beginner', 'support'],
      attachments: 0,
      customerRating: 0,
      internalNotes: 'Good opportunity for customer engagement and retention',
      escalationLevel: 1,
      department: 'support',
      estimatedResolution: '2024-12-22',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Rachel Green',
        email: 'rachel.green@example.com',
        phone: '+1-555-0456',
        accountId: 'MT4-12121',
        company: 'Green Trading Academy',
        location: 'Phoenix, AZ',
        joinDate: '2024-07-08',
        totalTrades: 12,
        accountBalance: 5000,
        tradingVolume: 15000
      }
    },
    {
      id: '15',
      title: 'Deposit not credited to account',
      description: 'Made bank transfer deposit yesterday but funds not showing in trading account. Bank confirms transfer completed.',
      status: 'escalated',
      priority: 'urgent',
      category: 'billing',
      assignedTo: 'Sarah Johnson',
      assignedToId: 'user2',
      createdBy: 'Customer',
      createdById: 'cust13',
      createdAt: '2024-12-17 11:30:00',
      updatedAt: '2024-12-19 12:00:00',
      lastActivity: '2024-12-19 12:00:00',
      responseTime: '1 hour',
      resolutionTime: 'Pending',
      totalMessages: 12,
      unreadMessages: 0,
      tags: ['deposit', 'urgent', 'billing', 'escalated'],
      attachments: 5,
      customerRating: 0,
      internalNotes: 'Finance team investigating, possible reconciliation issue',
      escalationLevel: 3,
      department: 'billing',
      estimatedResolution: '2024-12-20',
      actualResolution: '',
      customerSatisfaction: 'pending',
      customerInfo: {
        name: 'Kevin Martinez',
        email: 'kevin.martinez@example.com',
        phone: '+1-555-0789',
        accountId: 'MT4-13131',
        company: 'Martinez Capital',
        location: 'San Diego, CA',
        joinDate: '2023-04-12',
        totalTrades: 234,
        accountBalance: 45000,
        tradingVolume: 280000
      }
    }
  ])

  // Filtered tickets based on search and filters
  const filteredTickets = useMemo(() => {
    return mockTickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
  }, [mockTickets, searchTerm, statusFilter, priorityFilter, categoryFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage)
  const startIndex = (currentPage - 1) * ticketsPerPage
  const endIndex = startIndex + ticketsPerPage
  const currentTickets = filteredTickets.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Near start: show 1, 2, 3, 4, 5, ..., last
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near end: show 1, ..., last-4, last-3, last-2, last-1, last
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  // Calculate stats
  const stats = useMemo(() => {
    const totalTickets = mockTickets.length
    const openTickets = mockTickets.filter(t => t.status === 'open').length
    const inProgressTickets = mockTickets.filter(t => t.status === 'in-progress').length
    const resolvedTickets = mockTickets.filter(t => t.status === 'resolved').length
    const urgentTickets = mockTickets.filter(t => t.priority === 'urgent' || t.priority === 'critical').length
    const avgResponseTime = mockTickets.filter(t => t.responseTime !== 'Pending').length > 0 
      ? '2.5 hours' 
      : 'Pending'
    
    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      urgentTickets,
      avgResponseTime
    }
  }, [mockTickets])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'escalated': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="w-4 h-4 text-blue-500" />
      case 'billing': return <DollarSign className="w-4 h-4 text-green-500" />
      case 'account': return <User className="w-4 h-4 text-purple-500" />
      case 'trading': return <TrendingUp className="w-4 h-4 text-yellow-500" />
      case 'general': return <HelpCircle className="w-4 h-4 text-gray-500" />
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />
      case 'feature-request': return <Lightbulb className="w-4 h-4 text-indigo-500" />
      case 'support': return <MessageSquare className="w-4 h-4 text-orange-500" />
      default: return <Ticket className="w-4 h-4 text-gray-500" />
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      show: true,
      message,
      type
    })
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleAddTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'lastActivity' | 'responseTime' | 'resolutionTime' | 'totalMessages' | 'unreadMessages' | 'attachments' | 'customerRating' | 'escalationLevel' | 'actualResolution' | 'customerSatisfaction' | 'customerInfo'>) => {
    console.log('Creating new ticket:', ticketData)
    showNotification('Ticket created successfully!', 'success')
    setShowAddTicket(false)
  }

  const handleTicketUpdate = (ticketId: string, updates: Partial<Ticket>) => {
    console.log('=== PARENT TICKET UPDATE START ===')
    console.log('Function called with ticketId:', ticketId)
    console.log('Function called with updates:', updates)
    console.log('Current mockTickets length:', mockTickets.length)
    console.log('Current selectedTicketForChat:', selectedTicketForChat)
    
    // Update the ticket in the mockTickets array
    setMockTickets(prev => {
      console.log('Updating mockTickets, previous length:', prev.length)
      const updated = prev.map(ticket => {
        if (ticket.id === ticketId) {
          console.log('Found ticket to update:', ticket)
          const newTicket = { ...ticket, ...updates }
          console.log('Updated ticket:', newTicket)
          return newTicket
        }
        return ticket
      })
      console.log('Updated mockTickets:', updated)
      return updated
    })
    
    // Also update the selected ticket if it's the one being updated
    if (selectedTicketForChat?.id === ticketId) {
      console.log('Updating selectedTicketForChat')
      setSelectedTicketForChat(prev => {
        const updated = prev ? { ...prev, ...updates } : null
        console.log('Updated selectedTicketForChat:', updated)
        return updated
      })
    } else {
      console.log('selectedTicketForChat ID does not match ticketId')
    }
    
    console.log('=== PARENT TICKET UPDATE END ===')
  }

  const openTagManagement = (ticket: Ticket) => {
    setSelectedTicketForTags(ticket)
    setShowTagManagement(true)
  }

  const addTag = (tagToAdd: string) => {
    if (!selectedTicketForTags) return
    
    // Check if tag is already assigned
    if (selectedTicketForTags.tags.includes(tagToAdd)) {
      return
    }
    
    const updatedTicket = {
      ...selectedTicketForTags,
      tags: [...selectedTicketForTags.tags, tagToAdd]
    }
    
    // Update the ticket in the main list
    setMockTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicketForTags.id ? updatedTicket : ticket
    ))
    
    // Update the selected ticket for tags
    setSelectedTicketForTags(updatedTicket)
  }

  const removeTag = (tagToRemove: string) => {
    if (!selectedTicketForTags) return
    
    const updatedTicket = {
      ...selectedTicketForTags,
      tags: selectedTicketForTags.tags.filter(tag => tag !== tagToRemove)
    }
    
    // Update the ticket in the main list
    setMockTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicketForTags.id ? updatedTicket : ticket
    ))
    
    // Update the selected ticket for tags
    setSelectedTicketForTags(updatedTicket)
  }

  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }))
  }

  const toggleColumnVisibility = () => {
    setShowColumnVisibility(!showColumnVisibility)
  }

  const openDeletePopup = (ticket: Ticket) => {
    setSelectedTicketForDelete(ticket)
    setShowDeletePopup(true)
  }

  const deleteTicket = () => {
    if (!selectedTicketForDelete) return
    
    // Remove the ticket from the list
    setMockTickets(prev => prev.filter(ticket => ticket.id !== selectedTicketForDelete.id))
    
    // Close the popup and reset state
    setShowDeletePopup(false)
    setSelectedTicketForDelete(null)
    
    // Show success notification
    setNotification({
      show: true,
      message: `Ticket "${selectedTicketForDelete.title}" has been deleted successfully`,
      type: 'success'
    })
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // Predefined tags for assignment
  const predefinedTags = [
    'urgent', 'bug', 'feature', 'support', 'billing', 'technical', 
    'account', 'trading', 'mobile', 'desktop', 'api', 'security',
    'performance', 'ui', 'ux', 'documentation', 'training', 'escalated'
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Tickets</p>
              <p className="text-2xl font-bold text-white">{stats.totalTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Open</p>
              <p className="text-2xl font-bold text-white">{stats.openTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-white">{stats.inProgressTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Resolved</p>
              <p className="text-2xl font-bold text-white">{stats.resolvedTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Urgent</p>
              <p className="text-2xl font-bold text-white">{stats.urgentTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Avg Response</p>
              <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
            </div>
          </div>
        </div>
        
      </div>

      {/* Icon Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-visible relative z-10">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Export Tickets - Download ticket data as CSV/Excel"
              onClick={() => console.log('Export Tickets clicked')}
            >
              <Download className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Export Tickets
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Import Tickets - Upload ticket data from CSV/Excel files"
              onClick={() => console.log('Import Tickets clicked')}
            >
              <Upload className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Import Tickets
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Create New Ticket - Create a new support ticket"
              onClick={() => setShowAddTicket(true)}
            >
              <Plus className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Create New Ticket
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Ticket Analytics - View performance metrics and reports"
              onClick={() => console.log('Ticket Analytics clicked')}
            >
              <TrendingUp className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Ticket Analytics
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>

            <button
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative group overflow-visible"
              title="Column Visibility - Show/hide table columns"
              onClick={toggleColumnVisibility}
            >
              <Eye className="w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Column Visibility
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="account">Account</option>
                  <option value="trading">Trading</option>
                  <option value="general">General</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setPriorityFilter('all')
                    setCategoryFilter('all')
                  }}
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Click to Trade Notice */}
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                💡 Click on any ticket row to open the trade chat popup
              </span>
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Viewing {startIndex + 1}-{Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} tickets
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columnVisibility.title && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '250px', minWidth: '250px' }}>Title</th>
                )}
                {columnVisibility.status && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Status</th>
                )}
                {columnVisibility.priority && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Priority</th>
                )}
                {columnVisibility.category && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Category</th>
                )}
                {columnVisibility.assignedTo && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Assigned To</th>
                )}
                {columnVisibility.createdBy && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Created By</th>
                )}
                {columnVisibility.createdAt && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Created</th>
                )}
                {columnVisibility.lastActivity && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>Last Activity</th>
                )}
                {columnVisibility.totalMessages && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Messages</th>
                )}
                {columnVisibility.unreadMessages && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Unread</th>
                )}
                {columnVisibility.department && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>Department</th>
                )}
                {columnVisibility.tags && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>Tags</th>
                )}
                {columnVisibility.actions && (
                  <th className="data-table-header px-2 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '140px', minWidth: '140px' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicketForChat(ticket)
                    setShowChatPopup(true)
                  }}
                  className={`data-table-row hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  {columnVisibility.title && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '250px', minWidth: '250px' }}>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{ticket.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[200px]">{ticket.description}</div>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.status && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.priority && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                  )}
                  
                  {columnVisibility.category && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(ticket.category)}
                        <span className="capitalize text-gray-900 dark:text-white">{ticket.category.replace('-', ' ')}</span>
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.assignedTo && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{ticket.assignedTo}</div>
                    </td>
                  )}
                  
                  {columnVisibility.createdBy && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-900 dark:text-white">{ticket.createdBy}</div>
                    </td>
                  )}
                  
                  {columnVisibility.createdAt && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-500 dark:text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.lastActivity && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '120px', minWidth: '120px' }}>
                      <div className="text-gray-500 dark:text-gray-400">{new Date(ticket.lastActivity).toLocaleDateString()}</div>
                    </td>
                  )}
                  
                  {columnVisibility.totalMessages && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{ticket.totalMessages}</div>
                    </td>
                  )}
                  
                  {columnVisibility.unreadMessages && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white">{ticket.unreadMessages}</div>
                    </td>
                  )}
                  
                  {columnVisibility.department && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '100px', minWidth: '100px' }}>
                      <div className="text-gray-900 dark:text-white capitalize">{ticket.department}</div>
                    </td>
                  )}
                  
                  {columnVisibility.tags && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap border-r border-gray-200 dark:border-gray-600" style={{ width: '150px', minWidth: '150px' }}>
                      <div className="flex items-center">
                        {ticket.tags.length > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {ticket.tags[0]}
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-xs">No tags</span>
                        )}
                      </div>
                    </td>
                  )}
                  
                  {columnVisibility.actions && (
                    <td className="data-table-cell px-2 text-xs text-gray-900 dark:text-white whitespace-nowrap" style={{ width: '140px', minWidth: '140px' }}>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedTicketForChat(ticket)
                            setShowChatPopup(true)
                          }}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="Chat"
                        >
                          <MessageSquare className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => openTagManagement(ticket)}
                          className="p-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                          title="Assign Tags"
                        >
                          <Tag className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => openDeletePopup(ticket)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete Ticket"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="table-footer">
          <div className="table-footer-content">
            <div className="table-footer-left">
              <span className="results-info">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{Math.min(endIndex, filteredTickets.length)}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredTickets.length}</span> tickets
              </span>
            </div>
            <div className="table-footer-right">
              <div className="flex items-center space-x-4">
                {/* Items per page selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                  <select
                    value={ticketsPerPage}
                    onChange={(e) => {
                      setTicketsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  {/* Go to page input */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Go to:</span>
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value)
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const page = parseInt(e.currentTarget.value)
                          if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page)
                          }
                        }
                      }}
                      className="w-16 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>
                  
                  {/* First page button */}
                  <button 
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="First page"
                  >
                    «
                  </button>
                  
                  {/* Previous page button */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Previous page"
                  >
                    ‹
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className={`px-2 py-1 text-sm rounded transition-colors ${
                          page === currentPage
                            ? 'bg-blue-500 text-white'
                            : page === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  {/* Next page button */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Next page"
                  >
                    ›
                  </button>
                  
                  {/* Last page button */}
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 transition-colors"
                    title="Last page"
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Visibility Popup */}
      <ModernColumnVisibilityPopup
        isOpen={showColumnVisibility}
        onClose={() => setShowColumnVisibility(false)}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        title="Ticket Columns"
        description="Show or hide ticket table columns"
      />

      {/* Add Ticket Popup */}
      <AddTicketPopup
        isOpen={showAddTicket}
        onClose={() => setShowAddTicket(false)}
        onSave={handleAddTicket}
      />

      {/* Ticket Chat Popup */}
      <TicketChatPopup
        isOpen={showChatPopup}
        onClose={() => {
          setShowChatPopup(false)
          setSelectedTicketForChat(null)
        }}
        selectedTicket={selectedTicketForChat}
        tickets={mockTickets}
        onTicketUpdate={handleTicketUpdate}
      />

      {/* Tag Management Popup */}
      {showTagManagement && selectedTicketForTags && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assign Tags
              </h2>
              <button
                onClick={() => {
                  setShowTagManagement(false)
                  setSelectedTicketForTags(null)
                  setNewTag('')
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Ticket Info */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticket</h3>
                <p className="text-sm text-gray-900 dark:text-white">{selectedTicketForTags.title}</p>
              </div>

              {/* Current Tags */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTicketForTags.tags.length > 0 ? (
                    selectedTicketForTags.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No tags assigned</p>
                  )}
                </div>
              </div>

              {/* Available Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Tags</h3>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {predefinedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      disabled={selectedTicketForTags.tags.includes(tag)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedTicketForTags.tags.includes(tag)
                          ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 dark:bg-gray-700 dark:hover:bg-blue-900/30 dark:text-gray-300 dark:hover:text-blue-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowTagManagement(false)
                    setSelectedTicketForTags(null)
                    setNewTag('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && selectedTicketForDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delete Ticket
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowDeletePopup(false)
                  setSelectedTicketForDelete(null)
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Warning Message */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <span className="text-lg font-medium text-red-600 dark:text-red-400">Warning</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You are about to delete this ticket. This action cannot be undone and all associated data will be permanently removed.
                </p>
              </div>

              {/* Ticket Details */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticket Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Title:</span>
                    <span className="ml-2 text-gray-900 dark:text-white font-medium">{selectedTicketForDelete.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">ID:</span>
                    <span className="ml-2 text-gray-900 dark:text-white font-mono">#{selectedTicketForDelete.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedTicketForDelete.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{selectedTicketForDelete.priority}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowDeletePopup(false)
                    setSelectedTicketForDelete(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteTicket}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beautiful Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' 
              : notification.type === 'error'
              ? 'bg-red-500 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'info' && <Info className="w-5 h-5" />}
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicketSystem 