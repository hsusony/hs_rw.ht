'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }) {
  const { language } = useLanguage()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { id: 'dashboard', name: t.dashboard, icon: 'fa-tachometer-alt' },
    { id: 'hotels', name: t.hotels, icon: 'fa-hotel' },
    { id: 'rooms', name: t.rooms, icon: 'fa-bed' },
    { id: 'reservations', name: t.reservations, icon: 'fa-calendar-check' },
    { id: 'customers', name: t.customers, icon: 'fa-users' },
    { id: 'tasks', name: t.tasks, icon: 'fa-tasks' },
    { id: 'reports', name: t.reports, icon: 'fa-chart-bar' },
    { id: 'settings', name: t.settings, icon: 'fa-cog' },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div 
        className={`fixed lg:relative h-full z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white shadow-2xl relative transition-colors duration-300">

          {/* Header */}
          <div className="relative p-6 border-b border-gray-700 flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center tracking-wide">
              <div className="bg-gray-700 p-2.5 rounded-lg ml-3">
                <i className="fas fa-hotel text-gray-300 text-lg"></i>
              </div>
              <span className="text-white">NINESOFT</span>
            </h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white lg:hidden"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4 px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id)
                  if (window.innerWidth < 1024) {
                    setIsOpen(false)
                  }
                }}
                className={`w-full flex items-center p-3.5 mb-2 rounded-lg transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gray-700 text-white border-r-4 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} text-base ml-3 ${
                  currentView === item.id ? 'text-blue-400' : 'text-gray-400'
                }`}></i>
                <span className="font-semibold text-sm">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full border-2 border-gray-600 overflow-hidden relative flex-shrink-0 bg-gray-700">
                {mounted && (
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="mr-3">
                <p className="text-sm font-semibold text-white">{t.systemManager}</p>
                <p className="text-xs text-gray-400">{t.admin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
