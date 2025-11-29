'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Header({ currentView, setCurrentView, toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  const viewTitles = {
    dashboard: t.dashboard,
    hotels: t.hotelManagement,
    rooms: t.roomManagement,
    reservations: t.reservationManagement,
    customers: t.customerManagement,
    tasks: t.taskManagement,
    reports: t.reportsAndStatistics,
    settings: t.systemSettings,
  }

  const notifications = [
    { 
      id: 1, 
      messageAr: 'حجز جديد لغرفة 203',
      messageEn: 'New booking for room 203',
      icon: 'fa-calendar-check', 
      color: 'blue' 
    },
    { 
      id: 2, 
      messageAr: 'طلب صيانة لغرفة 105',
      messageEn: 'Maintenance request for room 105',
      icon: 'fa-tools', 
      color: 'yellow' 
    },
    { 
      id: 3, 
      messageAr: 'تم إكمال مهمة تنظيف الغرف',
      messageEn: 'Room cleaning task completed',
      icon: 'fa-check-circle', 
      color: 'green' 
    },
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10 transition-colors duration-300">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none lg:hidden mr-3"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {viewTitles[currentView]}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
            title={language === 'ar' ? 'English' : 'العربية'}
          >
            <span className="text-sm">{language === 'ar' ? 'EN' : 'ع'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'light' ? (language === 'ar' ? 'الوضع الداكن' : 'Dark Mode') : (language === 'ar' ? 'الوضع الفاتح' : 'Light Mode')}
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-xl`}></i>
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600">
            <i className="fas fa-search text-gray-400 dark:text-gray-500 text-sm ml-2"></i>
            <input 
              type="text" 
              placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
              className="bg-transparent border-none outline-none text-sm w-40 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false)
              }}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{language === 'ar' ? 'الإشعارات' : 'Notifications'}</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className={`w-8 h-8 rounded-lg bg-${notification.color}-100 dark:bg-${notification.color}-900 flex items-center justify-center flex-shrink-0`}>
                          <i className={`fas ${notification.icon} text-${notification.color}-600 dark:text-${notification.color}-400 text-sm`}></i>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mr-3">
                          {language === 'ar' ? notification.messageAr : notification.messageEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowNotifications(false)
              }}
              className="flex items-center focus:outline-none"
            >
              <div className="h-9 w-9 rounded-full border-2 border-gray-300 overflow-hidden relative flex-shrink-0">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  width={36}
                  height={36}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="mr-2 text-gray-700 dark:text-gray-200 font-semibold hidden md:inline text-sm">{t.systemManager}</span>
              <i className="fas fa-chevron-down text-xs text-gray-500 dark:text-gray-400 mr-1"></i>
            </button>

            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => {
                    setCurrentView('profile')
                    setShowUserMenu(false)
                  }}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                >
                  <i className="fas fa-user text-gray-500 dark:text-gray-400 ml-3"></i>
                  <span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('settings')
                    setShowUserMenu(false)
                  }}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                >
                  <i className="fas fa-cog text-gray-500 dark:text-gray-400 ml-3"></i>
                  <span>{t.settings}</span>
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button className="w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center">
                  <i className="fas fa-sign-out-alt text-red-600 dark:text-red-400 ml-3"></i>
                  <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
