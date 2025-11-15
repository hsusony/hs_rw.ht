'use client'

import { useState } from 'react'

export default function Header({ currentView, toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const viewTitles = {
    dashboard: 'لوحة التحكم',
    hotels: 'إدارة الفنادق',
    rooms: 'إدارة الغرف',
    reservations: 'إدارة الحجوزات',
    customers: 'إدارة العملاء',
    tasks: 'إدارة المهام',
    reports: 'التقارير والإحصائيات',
  }

  const notifications = [
    { id: 1, message: 'حجز جديد لغرفة 203', icon: 'fa-calendar-check', color: 'blue' },
    { id: 2, message: 'طلب صيانة لغرفة 105', icon: 'fa-tools', color: 'yellow' },
    { id: 3, message: 'تم إكمال مهمة تنظيف الغرف', icon: 'fa-check-circle', color: 'green' },
  ]

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden mr-2"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mr-3">
            {viewTitles[currentView]}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false)
              }}
              className="text-gray-500 focus:outline-none relative"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">الإشعارات</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                    >
                      <div className="flex items-start">
                        <i className={`fas ${notification.icon} text-${notification.color}-500 mt-1`}></i>
                        <p className="text-sm text-gray-700 mr-3">{notification.message}</p>
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
              <img
                className="h-8 w-8 rounded-full object-cover border-2 border-blue-400"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
              />
              <span className="mr-2 text-gray-700 hidden md:inline">مدير النظام</span>
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>

            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                <button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-user ml-2 text-gray-500"></i>
                  الملف الشخصي
                </button>
                <button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-cog ml-2 text-gray-500"></i>
                  الإعدادات
                </button>
                <button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-sign-out-alt ml-2 text-gray-500"></i>
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
