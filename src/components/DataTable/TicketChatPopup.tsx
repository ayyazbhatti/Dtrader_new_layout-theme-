import React, { useState, useEffect } from 'react'
import { 
  X, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Search, 
  Filter,
  Clock,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Star,
  Archive,
  Flag,
  Reply,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  FileText,
  Image,
  Video,
  File,
  Download,
  Settings,
  ChevronDown
} from 'lucide-react'

interface TicketMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: 'customer' | 'agent' | 'admin' | 'system'
  message: string
  timestamp: string
  isRead: boolean
  attachments: Array<{
    id: string
    name: string
    type: 'image' | 'document' | 'video' | 'audio'
    size: string
    url: string
  }>
  internalNote?: boolean
}

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

interface TicketChatPopupProps {
  isOpen: boolean
  onClose: () => void
  selectedTicket?: Ticket | null
  tickets: Ticket[]
  onTicketUpdate?: (ticketId: string, updates: Partial<Ticket>) => void
}

const TicketChatPopup: React.FC<TicketChatPopupProps> = ({
  isOpen,
  onClose,
  selectedTicket,
  tickets,
  onTicketUpdate
}) => {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(selectedTicket || null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [newMessage, setNewMessage] = useState('')
  const [showAttachments, setShowAttachments] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  // Mock messages for the selected ticket
  const [messages, setMessages] = useState<TicketMessage[]>([
    {
      id: '1',
      senderId: 'customer1',
      senderName: 'John Doe',
      senderRole: 'customer',
      message: 'Hello, I\'m experiencing an issue with my trading account. I can\'t seem to place any orders.',
      timestamp: '2024-12-19 10:30:00',
      isRead: true,
      attachments: []
    },
    {
      id: '2',
      senderId: 'agent1',
      senderName: 'Sarah Johnson',
      senderRole: 'agent',
      message: 'Hi John, I\'m sorry to hear about this issue. Let me help you troubleshoot. Can you tell me what error message you\'re seeing when trying to place an order?',
      timestamp: '2024-12-19 10:35:00',
      isRead: true,
      attachments: []
    },
    {
      id: '3',
      senderId: 'customer1',
      senderName: 'John Doe',
      senderRole: 'customer',
      message: 'I\'m getting a "Insufficient margin" error, but I have plenty of funds in my account.',
      timestamp: '2024-12-19 10:40:00',
      isRead: true,
      attachments: []
    },
    {
      id: '4',
      senderId: 'agent1',
      senderName: 'Sarah Johnson',
      senderRole: 'agent',
      message: 'I see the issue. This sometimes happens when there\'s a temporary system delay in margin calculations. Let me check your account status and refresh the margin data.',
      timestamp: '2024-12-19 10:45:00',
      isRead: true,
      attachments: []
    },
    {
      id: '5',
      senderId: 'system',
      senderName: 'System',
      senderRole: 'system',
      message: 'Ticket status updated to: In Progress',
      timestamp: '2024-12-19 10:45:00',
      isRead: true,
      attachments: []
    },
    {
      id: '6',
      senderId: 'agent1',
      senderName: 'Sarah Johnson',
      senderRole: 'agent',
      message: 'I\'ve refreshed your margin data. Can you try placing an order now? If you still get the error, please let me know and I\'ll escalate this to our technical team.',
      timestamp: '2024-12-19 11:00:00',
      isRead: true,
      attachments: []
    },
    {
      id: '7',
      senderId: 'customer1',
      senderName: 'John Doe',
      senderRole: 'customer',
      message: 'Great! It\'s working now. Thank you for the quick help. I was able to place my EUR/USD order successfully.',
      timestamp: '2024-12-19 11:05:00',
      isRead: true,
      attachments: []
    },
    {
      id: '8',
      senderId: 'agent1',
      senderName: 'Sarah Johnson',
      senderRole: 'agent',
      message: 'Excellent! I\'m glad we could resolve this quickly. Is there anything else I can help you with regarding your trading account?',
      timestamp: '2024-12-19 11:10:00',
      isRead: true,
      attachments: []
    }
  ])

  useEffect(() => {
    if (selectedTicket) {
      setActiveTicket(selectedTicket)
    }
  }, [selectedTicket])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showStatusDropdown) {
        setShowStatusDropdown(false)
      }
      if (showPriorityDropdown) {
        setShowPriorityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStatusDropdown, showPriorityDropdown])

  useEffect(() => {
    if (activeTicket) {
      // Load messages for the active ticket
      // In a real app, this would be an API call
      console.log('Loading messages for ticket:', activeTicket.id)
      
      // Generate different messages based on ticket category
      if (activeTicket.category === 'billing') {
        if (activeTicket.title.includes('withdrawal')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'Hi, I submitted a withdrawal request on Monday but it\'s still showing as pending. This usually takes only 24 hours.',
              timestamp: '2024-12-14 14:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'Hello! I can see your withdrawal request is indeed pending longer than usual. Let me investigate this for you.',
              timestamp: '2024-12-14 16:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '3',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'I\'ve checked with our finance team. There are some bank holiday delays affecting processing times. Your withdrawal should be processed by tomorrow.',
              timestamp: '2024-12-19 10:15:00',
              isRead: true,
              attachments: []
            }
          ])
        } else if (activeTicket.title.includes('deposit')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'I made a bank transfer deposit yesterday but the funds aren\'t showing in my trading account. My bank confirms the transfer was completed.',
              timestamp: '2024-12-17 11:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'I understand your concern. Let me check the status of your deposit with our finance department.',
              timestamp: '2024-12-17 12:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '3',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'I can see the issue. There\'s a reconciliation delay due to the bank holiday. I\'ve escalated this to our finance team for immediate attention.',
              timestamp: '2024-12-19 12:00:00',
              isRead: true,
              attachments: []
            }
          ])
        } else {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'Hi, I noticed some unusual charges on my monthly statement. Can you help me understand what these fees are for?',
              timestamp: '2024-12-19 09:15:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'Hello! I\'d be happy to help you review your statement. Could you please specify which charges you\'re referring to?',
              timestamp: '2024-12-19 09:20:00',
              isRead: true,
              attachments: []
            }
          ])
        }
      } else if (activeTicket.category === 'feature-request') {
        if (activeTicket.title.includes('API')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'Hi, I need API access for automated trading strategies. Can you provide documentation and rate limit information?',
              timestamp: '2024-12-19 05:45:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Mike Davis',
              senderRole: 'agent',
              message: 'Hello! I\'d be happy to help you with API access. This is a great opportunity for enterprise customers like yourselves.',
              timestamp: '2024-12-19 06:00:00',
              isRead: true,
              attachments: []
            }
          ])
        } else if (activeTicket.title.includes('wallet')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'I would love to see multi-currency support in the wallet. Currently only USD is supported, but I need EUR and GBP for international trading.',
              timestamp: '2024-12-18 15:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Mike Davis',
              senderRole: 'agent',
              message: 'Thank you for the suggestion! Multi-currency wallets are on our roadmap for Q2 2025. This will be great for our international expansion.',
              timestamp: '2024-12-18 15:45:00',
              isRead: true,
              attachments: []
            }
          ])
        } else {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'I would love to see a dark mode option for the mobile app. It would be much easier on the eyes during night trading sessions.',
              timestamp: '2024-12-19 08:45:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Mike Davis',
              senderRole: 'agent',
              message: 'Thank you for the suggestion! Dark mode is actually on our roadmap for Q1 2025. I\'ll add your request to our feature tracking system.',
              timestamp: '2024-12-19 08:50:00',
              isRead: true,
              attachments: []
            }
          ])
        }
      } else if (activeTicket.category === 'bug') {
        setMessages([
          {
            id: '1',
            senderId: 'customer1',
            senderName: activeTicket.customerInfo.name,
            senderRole: 'customer',
            message: 'The mobile app crashes immediately when I try to open it on my iPhone with iOS 17.2. It works fine on Android and older iOS versions.',
            timestamp: '2024-12-19 06:15:00',
            isRead: true,
            attachments: []
          },
          {
            id: '2',
            senderId: 'agent1',
            senderName: 'Mike Davis',
            senderRole: 'agent',
            message: 'Thank you for reporting this issue. We\'re aware of the iOS 17.2 compatibility problem and our development team is actively working on a fix.',
            timestamp: '2024-12-19 06:30:00',
            isRead: true,
            attachments: []
          }
        ])
      } else if (activeTicket.category === 'support') {
        setMessages([
          {
            id: '1',
            senderId: 'customer1',
            senderName: activeTicket.customerInfo.name,
            senderRole: 'customer',
            message: 'I\'m a beginner trader and looking for comprehensive educational resources. Do you have tutorials, webinars, or learning materials?',
            timestamp: '2024-12-18 13:00:00',
            isRead: true,
            attachments: []
          },
          {
            id: '2',
            senderId: 'agent1',
            senderName: 'Sarah Johnson',
            senderRole: 'agent',
            message: 'Absolutely! We have a comprehensive library of educational resources for traders at all levels. Let me send you our learning path guide.',
            timestamp: '2024-12-18 13:15:00',
            isRead: true,
            attachments: []
          }
        ])
      } else if (activeTicket.category === 'account') {
        if (activeTicket.status === 'resolved') {
          setMessages([
            {
              id: '1',
              senderId: 'system',
              senderName: 'System',
              senderRole: 'system',
              message: 'Account verification completed successfully. All KYC documents have been approved.',
              timestamp: '2024-12-18 16:00:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'Great news! Your account verification has been completed and approved. You now have full trading access to all features.',
              timestamp: '2024-12-19 09:30:00',
              isRead: true,
              attachments: []
            }
          ])
        } else {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'I submitted my KYC documents but they were rejected. Can you help me understand what\'s wrong?',
              timestamp: '2024-12-18 14:15:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'I\'d be happy to help review your documents. Let me check the rejection reason and guide you through the process.',
              timestamp: '2024-12-18 15:00:00',
              isRead: true,
              attachments: []
            }
          ])
        }
      } else {
        // Default technical support messages
        if (activeTicket.title.includes('chart')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'Hi, I\'m having issues with chart indicators. RSI and MACD are showing incorrect values on 4H and 1D timeframes.',
              timestamp: '2024-12-19 04:20:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'John Smith',
              senderRole: 'agent',
              message: 'Hello! I can see the issue with the chart indicators. This appears to be a data feed problem on higher timeframes. Let me investigate.',
              timestamp: '2024-12-19 04:35:00',
              isRead: true,
              attachments: []
            }
          ])
        } else if (activeTicket.title.includes('bot')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'I\'m getting an "Invalid strategy parameters" error when configuring my trading bot. The parameters look correct to me.',
              timestamp: '2024-12-18 14:15:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'John Smith',
              senderRole: 'agent',
              message: 'I can help you with the bot configuration. Let me check the parameter validation logic and see what might be causing this error.',
              timestamp: '2024-12-18 15:00:00',
              isRead: true,
              attachments: []
            }
          ])
        } else if (activeTicket.title.includes('market data')) {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'There\'s a significant delay in market data feeds. Real-time data is showing 5-10 second delays across all currency pairs.',
              timestamp: '2024-12-19 03:00:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'John Smith',
              senderRole: 'agent',
              message: 'This is a critical infrastructure issue affecting all users. I\'ve escalated this to our DevOps team for immediate resolution.',
              timestamp: '2024-12-19 03:15:00',
              isRead: true,
              attachments: []
            }
          ])
        } else {
          setMessages([
            {
              id: '1',
              senderId: 'customer1',
              senderName: activeTicket.customerInfo.name,
              senderRole: 'customer',
              message: 'Hello, I\'m experiencing an issue with my trading account. I can\'t seem to place any orders.',
              timestamp: '2024-12-19 10:30:00',
              isRead: true,
              attachments: []
            },
            {
              id: '2',
              senderId: 'agent1',
              senderName: 'Sarah Johnson',
              senderRole: 'agent',
              message: 'Hi, I\'m sorry to hear about this issue. Let me help you troubleshoot. Can you tell me what error message you\'re seeing when trying to place an order?',
              timestamp: '2024-12-19 10:35:00',
              isRead: true,
              attachments: []
            }
          ])
        }
      }
    }
  }, [activeTicket])

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

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

  const handleStatusUpdate = (newStatus: string) => {
    console.log('=== STATUS UPDATE START ===')
    console.log('Function called with newStatus:', newStatus)
    console.log('activeTicket exists:', !!activeTicket)
    
    if (!activeTicket) {
      console.log('No active ticket, returning early')
      return
    }
    
    console.log('Current ticket status:', activeTicket.status)
    console.log('Updating status from:', activeTicket.status, 'to:', newStatus)
    
    // Update the local ticket state
    const updatedTicket = { ...activeTicket, status: newStatus as any }
    console.log('Created updatedTicket:', updatedTicket)
    
    setActiveTicket(updatedTicket)
    console.log('Called setActiveTicket')
    
    // Call parent callback to update the main ticket list
    if (onTicketUpdate) {
      console.log('Calling onTicketUpdate with:', activeTicket.id, { status: newStatus as any })
      onTicketUpdate(activeTicket.id, { status: newStatus as any })
    } else {
      console.log('onTicketUpdate is not defined!')
    }
    
    // Add a system message about the status change
    const statusMessage: TicketMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      senderName: 'System',
      senderRole: 'system',
      message: `Ticket status updated to: ${newStatus.replace('-', ' ')}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: []
    }
    
    console.log('Adding status message to chat:', statusMessage)
    setMessages(prev => [...prev, statusMessage])
    setShowStatusDropdown(false)
    
    // Show update notification
    setUpdateMessage(`Status updated to: ${newStatus.replace('-', ' ')}`)
    setShowUpdateNotification(true)
    setTimeout(() => setShowUpdateNotification(false), 3000)
    
    console.log('Status updated successfully. New ticket state:', updatedTicket)
    console.log('=== STATUS UPDATE END ===')
  }

  const handlePriorityUpdate = (newPriority: string) => {
    console.log('=== PRIORITY UPDATE START ===')
    console.log('Function called with newPriority:', newPriority)
    console.log('activeTicket exists:', !!activeTicket)
    
    if (!activeTicket) {
      console.log('No active ticket, returning early')
      return
    }
    
    console.log('Current ticket priority:', activeTicket.priority)
    console.log('Updating priority from:', activeTicket.priority, 'to:', newPriority)
    
    // Update the local ticket state
    const updatedTicket = { ...activeTicket, priority: newPriority as any }
    console.log('Created updatedTicket:', updatedTicket)
    
    setActiveTicket(updatedTicket)
    console.log('Called setActiveTicket')
    
    // Call parent callback to update the main ticket list
    if (onTicketUpdate) {
      console.log('Calling onTicketUpdate with:', activeTicket.id, { priority: newPriority as any })
      onTicketUpdate(activeTicket.id, { priority: newPriority as any })
    } else {
      console.log('onTicketUpdate is not defined!')
    }
    
    // Add a system message about the priority change
    const priorityMessage: TicketMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      senderName: 'System',
      senderRole: 'system',
      message: `Ticket priority updated to: ${newPriority.charAt(0).toUpperCase() + newPriority.slice(1)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: []
    }
    
    console.log('Adding priority message to chat:', priorityMessage)
    setMessages(prev => [...prev, priorityMessage])
    setShowPriorityDropdown(false)
    
    // Show update notification
    setUpdateMessage(`Priority updated to: ${newPriority.charAt(0).toUpperCase() + newPriority.slice(1)}`)
    setShowUpdateNotification(true)
    setTimeout(() => setShowUpdateNotification(false), 3000)
    
    console.log('Priority updated successfully. New ticket state:', updatedTicket)
    console.log('=== PRIORITY UPDATE END ===')
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return

    const newMsg: TicketMessage = {
      id: Date.now().toString(),
      senderId: 'agent1',
      senderName: 'Sarah Johnson',
      senderRole: 'agent',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: []
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
    
    // Simulate customer response after a short delay
    setTimeout(() => {
      const customerResponse: TicketMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'customer1',
        senderName: activeTicket.customerInfo.name,
        senderRole: 'customer',
        message: 'Thank you for your response. I\'ll try that and let you know if it works.',
        timestamp: new Date().toISOString(),
        isRead: false,
        attachments: []
      }
      setMessages(prev => [...prev, customerResponse])
    }, 2000)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Ticket Support Chat
            </h2>
            {activeTicket && (
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(activeTicket.status)}`}>
                  {activeTicket.status.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(activeTicket.priority)}`}>
                  {activeTicket.priority}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Tickets List */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Tickets List */}
            <div className="flex-1 overflow-y-auto">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    activeTicket?.id === ticket.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                      {ticket.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {ticket.unreadMessages > 0 && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                          {ticket.unreadMessages}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{ticket.customerInfo.name}</span>
                    <span>{new Date(ticket.lastActivity).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeTicket ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  {/* Update Notification */}
                  {showUpdateNotification && (
                    <div className="mb-3 p-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                          {updateMessage}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {activeTicket.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        #{activeTicket.id} • {activeTicket.customerInfo.name} • {activeTicket.department}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Status Update Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            console.log('Status dropdown button clicked!')
                            console.log('Current showStatusDropdown:', showStatusDropdown)
                            setShowStatusDropdown(!showStatusDropdown)
                          }}
                          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(activeTicket.status)}`}>
                            {activeTicket.status.replace('-', ' ')}
                          </span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </button>
                        
                        {/* Status Dropdown Menu */}
                        {showStatusDropdown && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-2">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Update Status
                              </div>
                              {[
                                { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
                                { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
                                { value: 'pending', label: 'Pending', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
                                { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
                                { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
                                { value: 'escalated', label: 'Escalated', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
                              ].map((status) => (
                                <button
                                  key={status.value}
                                  onClick={() => {
                                    console.log('Status option clicked:', status.value)
                                    console.log('Calling handleStatusUpdate with:', status.value)
                                    handleStatusUpdate(status.value)
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                    activeTicket.status === status.value ? 'bg-gray-50 dark:bg-gray-700' : ''
                                  }`}
                                >
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                    {status.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Priority Update Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            console.log('Priority dropdown button clicked!')
                            console.log('Current showPriorityDropdown:', showPriorityDropdown)
                            setShowPriorityDropdown(!showPriorityDropdown)
                          }}
                          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(activeTicket.priority)}`}>
                            {activeTicket.priority.charAt(0).toUpperCase() + activeTicket.priority.slice(1)}
                          </span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </button>
                        
                        {/* Priority Dropdown Menu */}
                        {showPriorityDropdown && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-2">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Update Priority
                              </div>
                              {[
                                { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
                                { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
                                { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
                                { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
                                { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
                              ].map((priority) => (
                                <button
                                  key={priority.value}
                                  onClick={() => {
                                    console.log('Priority option clicked:', priority.value)
                                    console.log('Calling handlePriorityUpdate with:', priority.value)
                                    handlePriorityUpdate(priority.value)
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                    activeTicket.priority === priority.value ? 'bg-gray-50 dark:bg-gray-700' : ''
                                  }`}
                                >
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                                    {priority.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Customer Info Bar */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{activeTicket.customerInfo.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{activeTicket.customerInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{activeTicket.customerInfo.company}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Account: {activeTicket.customerInfo.accountId}
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderRole === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.senderRole === 'customer' ? 'order-1' : 'order-2'
                      }`}>
                        <div className={`rounded-lg px-4 py-2 ${
                          message.senderRole === 'customer'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : message.senderRole === 'system'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-center'
                            : 'bg-blue-500 text-white'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium">
                              {message.senderName}
                            </span>
                            {message.senderRole === 'customer' && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Customer
                              </span>
                            )}
                            {message.senderRole === 'agent' && (
                              <span className="text-xs opacity-75">
                                Agent
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{message.message}</p>
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-white/20 rounded">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-xs">{attachment.name}</span>
                                  <span className="text-xs opacity-75">({attachment.size})</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                          message.senderRole === 'customer' ? 'text-left' : 'text-right'
                        }`}>
                          {new Date(message.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Attachments ({selectedFiles.length})
                        </span>
                        <button
                          onClick={() => setSelectedFiles([])}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({formatFileSize(file.size)})
                              </span>
                            </div>
                            <button
                              onClick={() => removeSelectedFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <label className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Paperclip className="h-4 w-4" />
                      </label>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Smile className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* No Ticket Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Ticket
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a ticket from the left sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketChatPopup 