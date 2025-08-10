import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Trading from './pages/Trading'
import Portfolio from './pages/Portfolio'
import Settings from './pages/Settings'
import GeneralSetting from './pages/GeneralSetting'
import GeneralSettingSub from './pages/GeneralSettingSub'
import Labels from './pages/Labels'
import LabelsSub from './pages/LabelsSub'
import Markets from './pages/Markets'
import MarketsSub from './pages/MarketsSub'
import AffiliateUsers from './pages/AffiliateUsers'
import AffiliateUsersSub from './pages/AffiliateUsersSub'
import Transactions from './pages/Transactions'
import TransactionsSub from './pages/TransactionsSub'
import TradingSub from './pages/TradingSub'
import BotTrading from './pages/BotTrading'
import BotTradingSub from './pages/BotTradingSub'
import BankDetails from './pages/BankDetails'
import BankDetailsSub from './pages/BankDetailsSub'
import Ticket from './pages/Ticket'
import TicketSub from './pages/TicketSub'
import SettingsSub from './pages/SettingsSub'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      if (isMobile) {
        // On mobile, ensure mobile menu is closed by default
        setMobileMenuOpen(false)
        // On mobile, sidebar should not be collapsed
        setSidebarCollapsed(false)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar 
            isMobileOpen={mobileMenuOpen} 
            onMobileClose={handleMobileMenuClose}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={handleSidebarToggle}
          />
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <Header onMobileMenuToggle={handleMobileMenuToggle} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 min-w-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="/general-setting" element={<GeneralSetting />} />
                <Route
                  path="/general-setting/:subPage"
                  element={<GeneralSettingSub />}
                />
                <Route path="/labels" element={<Labels />} />
                <Route path="/labels/:subPage" element={<LabelsSub />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/markets/:subPage" element={<MarketsSub />} />
                <Route path="/affiliate-users" element={<AffiliateUsers />} />
                <Route
                  path="/affiliate-users/:subPage"
                  element={<AffiliateUsersSub />}
                />
                <Route path="/trading" element={<Trading />} />
                <Route path="/trading/:subPage" element={<TradingSub />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route
                  path="/transactions/:subPage"
                  element={<TransactionsSub />}
                />
                <Route path="/bot-trading" element={<BotTrading />} />
                <Route
                  path="/bot-trading/:subPage"
                  element={<BotTradingSub />}
                />
                <Route path="/bank-details" element={<BankDetails />} />
                <Route
                  path="/bank-details/:subPage"
                  element={<BankDetailsSub />}
                />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/ticket/:subPage" element={<TicketSub />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/:subPage" element={<SettingsSub />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
