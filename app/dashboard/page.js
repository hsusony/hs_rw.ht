'use client'

import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Hotels from '../components/Hotels'
import Rooms from '../components/Rooms'
import Reservations from '../components/Reservations'
import Customers from '../components/Customers'
import Tasks from '../components/Tasks'
import Reports from '../components/Reports'
import Settings from '../components/Settings'
import Profile from '../components/Profile'

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'hotels':
        return <Hotels />
      case 'rooms':
        return <Rooms />
      case 'reservations':
        return <Reservations />
      case 'customers':
        return <Customers />
      case 'tasks':
        return <Tasks />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentView={currentView}
          setCurrentView={setCurrentView}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900">
          {renderView()}
        </main>
      </div>
    </div>
  )
}
