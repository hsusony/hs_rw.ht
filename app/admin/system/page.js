'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../translations'

export default function SystemAdminDashboard() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeSection, setActiveSection] = useState('overview')
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'subscription',
      titleAr: 'اشتراك جديد',
      titleEn: 'New Subscription',
      messageAr: 'فندق بغداد الكبير - اشتراك سنوي جديد',
      messageEn: 'Grand Baghdad Hotel - New annual subscription',
      detailsAr: 'تم إضافة اشتراك سنوي جديد لفندق بغداد الكبير. قيمة الاشتراك: 2400$ سنوياً. المدة: من 01/11/2025 إلى 01/11/2026. المندوب: علي أحمد. طريقة الدفع: تحويل بنكي.',
      detailsEn: 'New annual subscription added for Grand Baghdad Hotel. Subscription value: $2400 annually. Duration: from 01/11/2025 to 01/11/2026. Agent: Ali Ahmed. Payment method: Bank Transfer.',
      time: '30 min ago',
      icon: 'fa-calendar-check',
      color: 'text-green-600',
      isRead: false
    },
    {
      id: 2,
      type: 'payment',
      titleAr: 'دفع عمولة مندوب',
      titleEn: 'Agent Commission Payment',
      messageAr: 'طلب دفع عمولة للمندوب محمد حسن',
      messageEn: 'Commission payment request for agent Mohammed Hassan',
      detailsAr: 'يوجد طلب دفع عمولة للمندوب محمد حسن بمبلغ 800$. عدد الفنادق: 5 فنادق. نسبة العمولة: 12%. يرجى المراجعة والموافقة على الدفع.',
      detailsEn: 'Commission payment request for agent Mohammed Hassan for $800. Number of hotels: 5 hotels. Commission rate: 12%. Please review and approve payment.',
      time: '2 hours ago',
      icon: 'fa-money-bill-wave',
      color: 'text-orange-600',
      isRead: false
    },
    {
      id: 3,
      type: 'warning',
      titleAr: 'اشتراكات قريبة من الانتهاء',
      titleEn: 'Subscriptions Expiring Soon',
      messageAr: '5 اشتراكات ستنتهي خلال أسبوع',
      messageEn: '5 subscriptions expiring within a week',
      detailsAr: 'يوجد 5 اشتراكات ستنتهي خلال الأسبوع القادم. يرجى التواصل مع الفنادق لتجديد اشتراكاتهم. قائمة الفنادق: فندق النخيل، فندق السلام، فندق دجلة، فندق الوركاء، فندق الأندلس.',
      detailsEn: 'There are 5 subscriptions expiring next week. Please contact hotels to renew their subscriptions. Hotels list: Palm Hotel, Al Salam Hotel, Tigris Hotel, Al Warka Hotel, Al Andalus Hotel.',
      time: '5 hours ago',
      icon: 'fa-exclamation-triangle',
      color: 'text-red-600',
      isRead: false
    }
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Notification functions
  const markAsRead = (notifId) => {
    setNotifications(notifications.map(n => 
      n.id === notifId ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const viewNotificationDetails = (notif) => {
    setSelectedNotification(notif)
    markAsRead(notif.id)
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!mounted) {
    return null
  }

  const menuItems = [
    { id: 'overview', icon: 'fa-chart-line', labelAr: 'نظرة عامة', labelEn: 'Overview' },
    { id: 'hotels', icon: 'fa-hotel', labelAr: 'إدارة الفنادق', labelEn: 'Hotels Management' },
    { id: 'hotelManagers', icon: 'fa-user-tie', labelAr: 'مدراء الفنادق', labelEn: 'Hotel Managers' },
    { id: 'subscriptions', icon: 'fa-calendar-alt', labelAr: 'الاشتراكات', labelEn: 'Subscriptions' },
    { id: 'payments', icon: 'fa-money-bill-wave', labelAr: 'المدفوعات', labelEn: 'Payments' },
    { id: 'agents', icon: 'fa-users', labelAr: 'المندوبين', labelEn: 'Agents' },
    { id: 'cashbox', icon: 'fa-cash-register', labelAr: 'الصندوق', labelEn: 'Cashbox' },
    { id: 'reports', icon: 'fa-file-alt', labelAr: 'التقارير', labelEn: 'Reports' }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
          <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'لوحة مدير النظام' : 'System Admin Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الإدارة الكاملة للنظام' : 'Complete System Management'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  title={darkMode ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
                >
                  <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-700 dark:text-gray-300 text-xl`}></i>
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <i className="fas fa-bell text-gray-700 dark:text-gray-300 text-xl"></i>
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
                        <h3 className="text-white font-bold">
                          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-3">
                              <i className={`fas ${notif.icon} ${notif.color} text-lg mt-1`}></i>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {language === 'ar' ? notif.titleAr : notif.titleEn}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {language === 'ar' ? notif.messageAr : notif.messageEn}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-center">
                        <button 
                          onClick={() => {
                            setShowAllNotifications(true)
                            setShowNotifications(false)
                          }}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                          {language === 'ar' ? 'عرض الكل' : 'View All'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg border border-indigo-200 dark:border-gray-600">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-user-shield text-white"></i>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {language === 'ar' ? 'مدير النظام' : 'System Admin'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'صلاحيات كاملة' : 'Full Access'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="mx-auto px-6">
              <div className="flex gap-1 overflow-x-auto">
                {menuItems.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                      activeSection === section.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className={`fas ${section.icon}`}></i>
                    {language === 'ar' ? section.labelAr : section.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto px-6 py-8">
          {activeSection === 'overview' && <OverviewSection language={language} />}
          {activeSection === 'hotels' && <HotelsSection language={language} />}
          {activeSection === 'hotelManagers' && <HotelManagersSection language={language} />}
          {activeSection === 'subscriptions' && <SubscriptionsSection language={language} />}
          {activeSection === 'payments' && <PaymentsSection language={language} />}
          {activeSection === 'agents' && <AgentsSection language={language} />}
          {activeSection === 'cashbox' && <CashboxSection language={language} />}
          {activeSection === 'reports' && <ReportsSection language={language} />}
        </main>

        {/* Notification Details Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i className={`fas ${selectedNotification.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {language === 'ar' ? selectedNotification.titleAr : selectedNotification.titleEn}
                    </h2>
                    <p className="text-white text-opacity-80 text-sm">{selectedNotification.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-info-circle text-indigo-600"></i>
                    {language === 'ar' ? 'الملخص' : 'Summary'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    {language === 'ar' ? selectedNotification.messageAr : selectedNotification.messageEn}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-file-alt text-purple-600"></i>
                    {language === 'ar' ? 'التفاصيل الكاملة' : 'Full Details'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl leading-relaxed">
                    {language === 'ar' ? selectedNotification.detailsAr : selectedNotification.detailsEn}
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <i className="fas fa-bolt text-yellow-600"></i>
                    {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all">
                      <i className="fas fa-eye mr-2"></i>
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </button>
                    <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all">
                      <i className="fas fa-check mr-2"></i>
                      {language === 'ar' ? 'الموافقة' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Notifications Modal */}
        {showAllNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <i className="fas fa-bell"></i>
                  {language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'}
                </h2>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="space-y-4">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`rounded-xl p-4 hover:shadow-lg transition-all border ${
                        notif.isRead 
                          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-75' 
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`fas ${notif.icon} ${notif.color} text-2xl`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                {language === 'ar' ? notif.titleAr : notif.titleEn}
                              </h4>
                              {!notif.isRead && (
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? notif.messageAr : notif.messageEn}
                          </p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => viewNotificationDetails(notif)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              <i className="fas fa-eye mr-2"></i>
                              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>
                            {!notif.isRead && (
                              <button 
                                onClick={() => markAsRead(notif.id)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold transition-all"
                              >
                                <i className="fas fa-check mr-2"></i>
                                {language === 'ar' ? 'تم القراءة' : 'Mark as Read'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                <button 
                  className="text-indigo-600 hover:text-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <i className="fas fa-check-double"></i>
                  {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Overview Section
function OverviewSection({ language }) {
  const stats = [
    { icon: 'fa-hotel', labelAr: 'إجمالي الفنادق', labelEn: 'Total Hotels', value: '45', color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' },
    { icon: 'fa-user-tie', labelAr: 'مدراء الفنادق', labelEn: 'Hotel Managers', value: '38', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' },
    { icon: 'fa-users', labelAr: 'المندوبين', labelEn: 'Agents', value: '12', color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' },
    { icon: 'fa-dollar-sign', labelAr: 'الإيرادات الشهرية', labelEn: 'Monthly Revenue', value: '$12,500', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'نظرة عامة' : 'Overview'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              {language === 'ar' ? stat.labelAr : stat.labelEn}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'الاشتراكات الحديثة' : 'Recent Subscriptions'}
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <i className="fas fa-hotel text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? `فندق بغداد ${item}` : `Baghdad Hotel ${item}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'ar' ? 'اشتراك سنوي' : 'Annual Subscription'}
                    </p>
                  </div>
                </div>
                <span className="text-green-600 dark:text-green-400 font-bold">$200</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'أنشطة حديثة' : 'Recent Activities'}
          </h3>
          <div className="space-y-3">
            {[
              { icon: 'fa-plus', textAr: 'إضافة فندق جديد', textEn: 'New hotel added', time: '5 min ago' },
              { icon: 'fa-check', textAr: 'تجديد اشتراك', textEn: 'Subscription renewed', time: '15 min ago' },
              { icon: 'fa-user-plus', textAr: 'إضافة مندوب جديد', textEn: 'New agent added', time: '1 hour ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <i className={`fas ${activity.icon} text-gray-600 dark:text-gray-300 text-sm`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{language === 'ar' ? activity.textAr : activity.textEn}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hotels Section
function HotelsSection({ language }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [hotels, setHotels] = useState([])

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel)
    setShowEditForm(true)
  }

  const handleDelete = (hotelId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الفندق؟' : 'Are you sure you want to delete this hotel?')) {
      setHotels(hotels.filter(h => h.id !== hotelId))
    }
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    // هنا يتم حفظ التعديلات
    alert(language === 'ar' ? 'تم تحديث الفندق بنجاح!' : 'Hotel updated successfully!')
    setShowEditForm(false)
    setSelectedHotel(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'إدارة الفنادق' : 'Hotels Management'}
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'إضافة فندق' : 'Add Hotel'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <i className="fas fa-hotel text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? hotel.name : hotel.nameEn}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold">
                      {hotel.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'ar' ? 'المجموعة الرئيسية:' : 'Main Group:'} {hotel.mainGroup}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'ar' ? 'المجموعة الفرعية:' : 'Sub Group:'} {hotel.subGroup}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {hotel.rooms} {language === 'ar' ? 'غرفة' : 'rooms'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(hotel)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(hotel.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'إضافة فندق جديد' : 'Add New Hotel'}
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (إنجليزي)' : 'Hotel Name (English)'}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'تصنيف الفندق' : 'Hotel Category'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>1 {language === 'ar' ? 'نجمة' : 'Star'}</option>
                  <option>2 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>3 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>4 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>5 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المجموعة الرئيسية' : 'Main Group'}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option>{language === 'ar' ? 'مجموعة A' : 'Group A'}</option>
                    <option>{language === 'ar' ? 'مجموعة B' : 'Group B'}</option>
                    <option>{language === 'ar' ? 'مجموعة C' : 'Group C'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المجموعة الفرعية' : 'Sub Group'}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option>{language === 'ar' ? 'فرعية 1' : 'Sub 1'}</option>
                    <option>{language === 'ar' ? 'فرعية 2' : 'Sub 2'}</option>
                    <option>{language === 'ar' ? 'فرعية 3' : 'Sub 3'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                </label>
                <input type="number" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
                </label>
                <input type="number" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder={language === 'ar' ? 'أدخل عدد الطوابق' : 'Enter number of floors'} />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditForm && selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'تعديل الفندق' : 'Edit Hotel'}
              </h3>
              <button onClick={() => { setShowEditForm(false); setSelectedHotel(null); }} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedHotel.name}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (إنجليزي)' : 'Hotel Name (English)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedHotel.nameEn}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'تصنيف الفندق' : 'Hotel Category'}
                </label>
                <select 
                  defaultValue={selectedHotel.category}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option>1 {language === 'ar' ? 'نجمة' : 'Star'}</option>
                  <option>2 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>3 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>4 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                  <option>5 {language === 'ar' ? 'نجوم' : 'Stars'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المجموعة الرئيسية' : 'Main Group'}
                  </label>
                  <select 
                    defaultValue={selectedHotel.mainGroup}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option>{language === 'ar' ? 'مجموعة A' : 'Group A'}</option>
                    <option>{language === 'ar' ? 'مجموعة B' : 'Group B'}</option>
                    <option>{language === 'ar' ? 'مجموعة C' : 'Group C'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المجموعة الفرعية' : 'Sub Group'}
                  </label>
                  <select 
                    defaultValue={selectedHotel.subGroup}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option>{language === 'ar' ? 'فرعية 1' : 'Sub 1'}</option>
                    <option>{language === 'ar' ? 'فرعية 2' : 'Sub 2'}</option>
                    <option>{language === 'ar' ? 'فرعية 3' : 'Sub 3'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                </label>
                <input 
                  type="number" 
                  defaultValue={selectedHotel.rooms}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
                </label>
                <input 
                  type="number" 
                  defaultValue={selectedHotel.floors}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  placeholder={language === 'ar' ? 'أدخل عدد الطوابق' : 'Enter number of floors'} 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowEditForm(false); setSelectedHotel(null); }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Hotel Managers Section
function HotelManagersSection({ language }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedManager, setSelectedManager] = useState(null)
  const [managers, setManagers] = useState([
    { id: 1, firstName: 'أحمد', lastName: 'الجبوري', firstNameEn: 'Ahmed', lastNameEn: 'Al-Jubouri', hotel: 'فندق بغداد الكبير', email: 'ahmed.jubouri@baghdadhotel.com', phone: '+964 770 123 4567' },
    { id: 2, firstName: 'فاطمة', lastName: 'العلي', firstNameEn: 'Fatima', lastNameEn: 'Al-Ali', hotel: 'فندق الرشيد', email: 'fatima.ali@rasheedhotel.com', phone: '+964 771 234 5678' },
    { id: 3, firstName: 'محمد', lastName: 'الخزرجي', firstNameEn: 'Mohammed', lastNameEn: 'Al-Khazraji', hotel: 'فندق بابل', email: 'mohammed.khazraji@babelhotel.com', phone: '+964 772 345 6789' }
  ])

  const handleEdit = (manager) => {
    setSelectedManager(manager)
    setShowEditModal(true)
  }

  const handleDelete = (managerId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المدير؟' : 'Are you sure you want to delete this manager?')) {
      setManagers(managers.filter(m => m.id !== managerId))
    }
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم تحديث المدير بنجاح!' : 'Manager updated successfully!')
    setShowEditModal(false)
    setSelectedManager(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'مدراء الفنادق' : 'Hotel Managers'}
        </h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'إضافة مدير' : 'Add Manager'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الاسم' : 'Name'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الفندق' : 'Hotel'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الهاتف' : 'Phone'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {managers.map((manager) => (
              <tr key={manager.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                  {language === 'ar' ? `${manager.firstName} ${manager.lastName}` : `${manager.firstNameEn} ${manager.lastNameEn}`}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {manager.hotel}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{manager.email}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{manager.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(manager)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(manager.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'إضافة مدير فندق' : 'Add Hotel Manager'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder={language === 'ar' ? 'أدخل الاسم الأول' : 'Enter first name'} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder={language === 'ar' ? 'أدخل الاسم الأخير' : 'Enter last name'} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder={language === 'ar' ? 'example@hotel.com' : 'example@hotel.com'} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="+964 770 123 4567" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اختيار الفندق' : 'Select Hotel'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'فندق بغداد الكبير' : 'Grand Baghdad Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق الرشيد' : 'Al Rasheed Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق بابل' : 'Babel Hotel'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input type="password" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'} />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && selectedManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'تعديل مدير الفندق' : 'Edit Hotel Manager'}
              </h3>
              <button onClick={() => { setShowEditModal(false); setSelectedManager(null); }} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedManager.firstName}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                    placeholder={language === 'ar' ? 'أدخل الاسم الأول' : 'Enter first name'} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedManager.lastName}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                    placeholder={language === 'ar' ? 'أدخل الاسم الأخير' : 'Enter last name'} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input 
                  type="email" 
                  defaultValue={selectedManager.email}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  placeholder={language === 'ar' ? 'example@hotel.com' : 'example@hotel.com'} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  defaultValue={selectedManager.phone}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  placeholder="+964 770 123 4567" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اختيار الفندق' : 'Select Hotel'}
                </label>
                <select 
                  defaultValue={selectedManager.hotel}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option>{language === 'ar' ? 'فندق بغداد الكبير' : 'Grand Baghdad Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق الرشيد' : 'Al Rasheed Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق بابل' : 'Babel Hotel'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'كلمة المرور الجديدة (اختياري)' : 'New Password (Optional)'}
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  placeholder={language === 'ar' ? 'اتركه فارغاً إذا لم ترد التغيير' : 'Leave blank if no change'} 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedManager(null); }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Subscriptions Section
function SubscriptionsSection({ language }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const handleEditClick = (subscription) => {
    setSelectedSubscription(subscription)
    setShowEditModal(true)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'إدارة الاشتراكات' : 'Subscriptions Management'}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {[
          { id: 1, hotel: 'فندق السلام', hotelEn: 'Al-Salam Hotel', email: 'info@salamhotel.com', type: 'سنوي', typeEn: 'Annual', trial: 30, discount: 15, price: 2040, expiry: '2026-11-21' },
          { id: 2, hotel: 'فندق دجلة', hotelEn: 'Tigris Hotel', email: 'contact@tigrishotel.com', type: 'شهري', typeEn: 'Monthly', trial: 15, discount: 10, price: 180, expiry: '2025-12-21' }
        ].map((subscription) => (
          <div key={subscription.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? subscription.hotel : subscription.hotelEn}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subscription.email}</p>
              </div>
              <button 
                onClick={() => handleEditClick(subscription)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                <i className="fas fa-edit ml-2"></i>
                {language === 'ar' ? 'تعديل الاشتراك' : 'Edit Subscription'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {language === 'ar' ? 'نوع الاشتراك' : 'Subscription Type'}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? subscription.type : subscription.typeEn}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {language === 'ar' ? 'الفترة التجريبية' : 'Trial Period'}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{subscription.trial} {language === 'ar' ? 'يوم' : 'days'}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {language === 'ar' ? 'الخصم' : 'Discount'}
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{subscription.discount}%</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {language === 'ar' ? 'السعر النهائي' : 'Final Price'}
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${subscription.price}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    {language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'} {subscription.expiry}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    {language === 'ar' ? 'متبقي 45 يوم' : '45 days remaining'}
                  </p>
                </div>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-bold">
                  {language === 'ar' ? 'نشط' : 'Active'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'تعديل الاشتراك' : 'Edit Subscription'}
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم الفندق' : 'Hotel Name'}
                </label>
                <input 
                  type="text" 
                  defaultValue={language === 'ar' ? selectedSubscription.hotel : selectedSubscription.hotelEn}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نوع الاشتراك' : 'Subscription Type'}
                </label>
                <select 
                  defaultValue={selectedSubscription.typeEn}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Monthly">{language === 'ar' ? 'شهري' : 'Monthly'}</option>
                  <option value="Annual">{language === 'ar' ? 'سنوي' : 'Annual'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الفترة التجريبية (أيام)' : 'Trial Period (days)'}
                  </label>
                  <input 
                    type="number" 
                    defaultValue={selectedSubscription.trial}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'نسبة الخصم (%)' : 'Discount (%)'}
                  </label>
                  <input 
                    type="number" 
                    defaultValue={selectedSubscription.discount}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'السعر النهائي ($)' : 'Final Price ($)'}
                </label>
                <input 
                  type="number" 
                  defaultValue={selectedSubscription.price}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                </label>
                <input 
                  type="date" 
                  defaultValue={selectedSubscription.expiry}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Payments Section
function PaymentsSection({ language }) {
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showDisbursementModal, setShowDisbursementModal] = useState(false)
  const [showAddMethodModal, setShowAddMethodModal] = useState(false)
  const [accountNumbers, setAccountNumbers] = useState([''])

  const handleAddAccountNumber = () => {
    setAccountNumbers([...accountNumbers, ''])
  }

  const handleRemoveAccountNumber = (index) => {
    if (accountNumbers.length > 1) {
      setAccountNumbers(accountNumbers.filter((_, i) => i !== index))
    }
  }

  const handleAccountNumberChange = (index, value) => {
    const newAccountNumbers = [...accountNumbers]
    newAccountNumbers[index] = value
    setAccountNumbers(newAccountNumbers)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'إدارة المدفوعات' : 'Payments Management'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <button 
          onClick={() => setShowReceiptModal(true)}
          className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg"
        >
          <i className="fas fa-plus-circle text-4xl mb-3"></i>
          <p className="text-xl font-bold">{language === 'ar' ? 'سند قبض' : 'Receipt Voucher'}</p>
        </button>
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="p-6 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg"
        >
          <i className="fas fa-minus-circle text-4xl mb-3"></i>
          <p className="text-xl font-bold">{language === 'ar' ? 'سند دفع' : 'Payment Voucher'}</p>
        </button>
        <button 
          onClick={() => setShowDisbursementModal(true)}
          className="p-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 shadow-lg"
        >
          <i className="fas fa-file-invoice-dollar text-4xl mb-3"></i>
          <p className="text-xl font-bold">{language === 'ar' ? 'سند صرف' : 'Disbursement Voucher'}</p>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'ar' ? 'طرق الدفع والاستلام' : 'Payment Methods'}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {['نقدي', 'بطاقة ائتمان', 'تحويل بنكي', 'PayPal', 'Zain Cash', 'Asia Hawala'].map((method, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <i className="fas fa-credit-card text-2xl text-blue-600 dark:text-blue-400 mb-2"></i>
              <p className="font-semibold text-gray-900 dark:text-white">{method}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setShowAddMethodModal(true)}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'إضافة طريقة دفع' : 'Add Payment Method'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">
          {language === 'ar' ? 'آخر المعاملات' : 'Recent Transactions'}
        </h3>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'رقم السند' : 'Voucher No.'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'النوع' : 'Type'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الفندق' : 'Hotel'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'المبلغ' : 'Amount'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'التاريخ' : 'Date'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">#{1000 + item}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item % 2 === 0 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {item % 2 === 0 ? (language === 'ar' ? 'قبض' : 'Receipt') : (language === 'ar' ? 'دفع' : 'Payment')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'فندق بغداد' : 'Baghdad Hotel'}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">$200</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">2025-11-16</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Voucher Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'سند قبض جديد' : 'New Receipt Voucher'}
              </h3>
              <button onClick={() => setShowReceiptModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم السند' : 'Voucher Number'}
                </label>
                <input 
                  type="text" 
                  defaultValue={`REC-${Date.now().toString().slice(-6)}`}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اختيار الفندق' : 'Select Hotel'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'فندق بغداد الكبير' : 'Grand Baghdad Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق الرشيد' : 'Al Rasheed Hotel'}</option>
                  <option>{language === 'ar' ? 'فندق بابل' : 'Babel Hotel'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المبلغ ($)' : 'Amount ($)'}
                </label>
                <input 
                  type="number" 
                  placeholder={language === 'ar' ? 'أدخل المبلغ' : 'Enter amount'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option>{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                  <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option>PayPal</option>
                  <option>Zain Cash</option>
                  <option>Asia Hawala</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البيان' : 'Description'}
                </label>
                <textarea 
                  rows="3"
                  placeholder={language === 'ar' ? 'أدخل تفاصيل السند' : 'Enter voucher details'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Voucher Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'سند دفع جديد' : 'New Payment Voucher'}
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم السند' : 'Voucher Number'}
                </label>
                <input 
                  type="text" 
                  defaultValue={`PAY-${Date.now().toString().slice(-6)}`}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white" 
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المستفيد' : 'Payee'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'أدخل اسم المستفيد' : 'Enter payee name'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المبلغ ($)' : 'Amount ($)'}
                </label>
                <input 
                  type="number" 
                  placeholder={language === 'ar' ? 'أدخل المبلغ' : 'Enter amount'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option>{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                  <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option>PayPal</option>
                  <option>Zain Cash</option>
                  <option>Asia Hawala</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البيان' : 'Description'}
                </label>
                <textarea 
                  rows="3"
                  placeholder={language === 'ar' ? 'أدخل تفاصيل السند' : 'Enter voucher details'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disbursement Voucher Modal */}
      {showDisbursementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'سند صرف جديد' : 'New Disbursement Voucher'}
              </h3>
              <button onClick={() => setShowDisbursementModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم السند' : 'Voucher Number'}
                </label>
                <input 
                  type="text" 
                  defaultValue={`DIS-${Date.now().toString().slice(-6)}`}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white" 
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نوع الصرف' : 'Disbursement Type'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'رواتب الموظفين' : 'Employee Salaries'}</option>
                  <option>{language === 'ar' ? 'عمولات المندوبين' : 'Agent Commissions'}</option>
                  <option>{language === 'ar' ? 'مصاريف إدارية' : 'Administrative Expenses'}</option>
                  <option>{language === 'ar' ? 'صيانة وتشغيل' : 'Maintenance & Operations'}</option>
                  <option>{language === 'ar' ? 'مصاريف تسويق' : 'Marketing Expenses'}</option>
                  <option>{language === 'ar' ? 'فواتير ومستحقات' : 'Bills & Dues'}</option>
                  <option>{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المستفيد / الموظف' : 'Beneficiary / Employee'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'أدخل اسم المستفيد أو الموظف' : 'Enter beneficiary or employee name'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'القسم / الإدارة' : 'Department'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'الإدارة العامة' : 'General Management'}</option>
                  <option>{language === 'ar' ? 'المبيعات' : 'Sales'}</option>
                  <option>{language === 'ar' ? 'التسويق' : 'Marketing'}</option>
                  <option>{language === 'ar' ? 'الدعم الفني' : 'Technical Support'}</option>
                  <option>{language === 'ar' ? 'الحسابات' : 'Accounting'}</option>
                  <option>{language === 'ar' ? 'الموارد البشرية' : 'Human Resources'}</option>
                  <option>{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المبلغ ($)' : 'Amount ($)'}
                </label>
                <input 
                  type="number" 
                  placeholder={language === 'ar' ? 'أدخل المبلغ' : 'Enter amount'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'طريقة الصرف' : 'Disbursement Method'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option>{language === 'ar' ? 'شيك' : 'Check'}</option>
                  <option>PayPal</option>
                  <option>Zain Cash</option>
                  <option>Asia Hawala</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم الفاتورة / المرجع (اختياري)' : 'Invoice/Reference Number (Optional)'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'رقم الفاتورة أو المرجع' : 'Invoice or reference number'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البيان / الغرض من الصرف' : 'Description / Purpose'}
                </label>
                <textarea 
                  rows="3"
                  placeholder={language === 'ar' ? 'أدخل تفاصيل وغرض الصرف' : 'Enter disbursement details and purpose'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-orange-600 dark:text-orange-400 text-xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-1">
                      {language === 'ar' ? 'ملاحظة هامة' : 'Important Note'}
                    </h4>
                    <p className="text-sm text-orange-800 dark:text-orange-400">
                      {language === 'ar' 
                        ? 'سند الصرف يستخدم لتوثيق جميع المصروفات والمدفوعات الصادرة من الشركة. يرجى التأكد من صحة البيانات المدخلة.'
                        : 'Disbursement voucher is used to document all expenses and outgoing payments from the company. Please verify the accuracy of entered data.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDisbursementModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddMethodModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'إضافة طريقة دفع جديدة' : 'Add New Payment Method'}
              </h3>
              <button onClick={() => setShowAddMethodModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم طريقة الدفع (عربي)' : 'Payment Method Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'مثال: ماستر كارد' : 'Example: Master Card'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم طريقة الدفع (إنجليزي)' : 'Payment Method Name (English)'}
                </label>
                <input 
                  type="text" 
                  placeholder="Example: Master Card"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نوع الطريقة' : 'Method Type'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option>{language === 'ar' ? 'بطاقة بنكية' : 'Bank Card'}</option>
                  <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option>{language === 'ar' ? 'محفظة إلكترونية' : 'E-Wallet'}</option>
                  <option>{language === 'ar' ? 'حوالة' : 'Money Transfer'}</option>
                  <option>{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رمز الأيقونة (Font Awesome)' : 'Icon Code (Font Awesome)'}
                </label>
                <input 
                  type="text" 
                  placeholder="fa-credit-card"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'مثال: fa-wallet, fa-credit-card, fa-money-bill' : 'Example: fa-wallet, fa-credit-card, fa-money-bill'}
                </p>
              </div>

              {/* Account Numbers Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'أرقام الحسابات' : 'Account Numbers'}
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAccountNumber}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-semibold transition-all"
                  >
                    <i className="fas fa-plus"></i>
                    {language === 'ar' ? 'إضافة رقم حساب' : 'Add Account Number'}
                  </button>
                </div>

                <div className="space-y-3">
                  {accountNumbers.map((accountNumber, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={accountNumber}
                          onChange={(e) => handleAccountNumberChange(index, e.target.value)}
                          placeholder={language === 'ar' ? `رقم الحساب ${index + 1}` : `Account Number ${index + 1}`}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                        />
                      </div>
                      {accountNumbers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAccountNumber(index)}
                          className="p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-all"
                          title={language === 'ar' ? 'حذف' : 'Remove'}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {language === 'ar' 
                    ? 'يمكنك إضافة أكثر من رقم حساب لنفس طريقة الدفع (مثلاً: حسابات بنكية متعددة)'
                    : 'You can add multiple account numbers for the same payment method (e.g., multiple bank accounts)'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="active">{language === 'ar' ? 'نشط' : 'Active'}</option>
                  <option value="inactive">{language === 'ar' ? 'غير نشط' : 'Inactive'}</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddMethodModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'إضافة الطريقة' : 'Add Method'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Agents Section
function AgentsSection({ language }) {
  const [showAddAgentModal, setShowAddAgentModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPayCommissionModal, setShowPayCommissionModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [agents, setAgents] = useState([
    { id: 1, firstName: 'علي', lastName: 'الكعبي', firstNameEn: 'Ali', lastNameEn: 'Al-Kaabi', email: 'ali.kaabi@agents.com', phone: '+964 773 456 7890', commission: 12, hotelsAdded: 8, totalCommission: 3840000 },
    { id: 2, firstName: 'زينب', lastName: 'البصري', firstNameEn: 'Zainab', lastNameEn: 'Al-Basri', email: 'zainab.basri@agents.com', phone: '+964 774 567 8901', commission: 15, hotelsAdded: 5, totalCommission: 3000000 }
  ])

  const handleEdit = (agent) => {
    setSelectedAgent(agent)
    setShowEditModal(true)
  }

  const handlePayCommission = (agent) => {
    setSelectedAgent(agent)
    setShowPayCommissionModal(true)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم تحديث المندوب بنجاح!' : 'Agent updated successfully!')
    setShowEditModal(false)
    setSelectedAgent(null)
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم دفع العمولة بنجاح!' : 'Commission paid successfully!')
    setShowPayCommissionModal(false)
    setSelectedAgent(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'المندوبين والوكلاء' : 'Agents & Representatives'}
        </h2>
        <button 
          onClick={() => setShowAddAgentModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'إضافة مندوب' : 'Add Agent'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <i className="fas fa-user-tie text-purple-600 dark:text-purple-400 text-2xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? `${agent.firstName} ${agent.lastName}` : `${agent.firstNameEn} ${agent.lastNameEn}`}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{agent.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'العمولة' : 'Commission'}</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{agent.commission}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'الفنادق المضافة' : 'Hotels Added'}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.hotelsAdded}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'إجمالي العمولات' : 'Total Commission'}</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{agent.totalCommission} {language === 'ar' ? 'د.ع' : 'IQD'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(agent)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <i className="fas fa-edit ml-2"></i>
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </button>
              <button 
                onClick={() => handlePayCommission(agent)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <i className="fas fa-money-bill-wave ml-2"></i>
                {language === 'ar' ? 'دفع عمولة' : 'Pay Commission'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {showAddAgentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'إضافة مندوب جديد' : 'Add New Agent'}
              </h3>
              <button onClick={() => setShowAddAgentModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'أدخل الاسم الأول' : 'Enter first name'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'أدخل الاسم الأخير' : 'Enter last name'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input 
                  type="email" 
                  placeholder={language === 'ar' ? 'agent@example.com' : 'agent@example.com'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  placeholder="+964 770 123 4567"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نسبة العمولة (%)' : 'Commission Rate (%)'}
                </label>
                <input 
                  type="number" 
                  defaultValue="15"
                  min="0"
                  max="100"
                  placeholder="15"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'نسبة العمولة من كل عملية اشتراك' : 'Commission percentage from each subscription'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نوع المندوب' : 'Agent Type'}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                  <option>{language === 'ar' ? 'مندوب مبيعات' : 'Sales Agent'}</option>
                  <option>{language === 'ar' ? 'وكيل معتمد' : 'Authorized Representative'}</option>
                  <option>{language === 'ar' ? 'مسوق' : 'Marketer'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المنطقة' : 'Area'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'بغداد، البصرة، أربيل...' : 'Baghdad, Basra, Erbil...'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  type="password" 
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddAgentModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'إضافة المندوب' : 'Add Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {showEditModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-user-edit"></i>
                {language === 'ar' ? 'تعديل مندوب' : 'Edit Agent'}
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedAgent(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأول (عربي)' : 'First Name (Arabic)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedAgent.firstName}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأخير (عربي)' : 'Last Name (Arabic)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedAgent.lastName}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأول (English)' : 'First Name (English)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedAgent.firstNameEn}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الأخير (English)' : 'Last Name (English)'}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={selectedAgent.lastNameEn}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input 
                    type="email" 
                    defaultValue={selectedAgent.email}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input 
                    type="tel" 
                    defaultValue={selectedAgent.phone}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'نسبة العمولة (%)' : 'Commission Rate (%)'}
                  </label>
                  <input 
                    type="number" 
                    defaultValue={selectedAgent.commission}
                    min="0"
                    max="100"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'نوع المندوب' : 'Agent Type'}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option>{language === 'ar' ? 'مندوب مبيعات' : 'Sales Agent'}</option>
                    <option>{language === 'ar' ? 'وكيل معتمد' : 'Authorized Representative'}</option>
                    <option>{language === 'ar' ? 'مسوق' : 'Marketer'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المنطقة' : 'Area'}
                  </label>
                  <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'بغداد، البصرة، أربيل...' : 'Baghdad, Basra, Erbil...'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'كلمة المرور الجديدة (اختياري)' : 'New Password (Optional)'}
                  </label>
                  <input 
                    type="password" 
                    placeholder={language === 'ar' ? 'اتركه فارغاً للاحتفاظ بالقديم' : 'Leave blank to keep current'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedAgent(null)
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Commission Modal */}
      {showPayCommissionModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-money-bill-wave"></i>
                {language === 'ar' ? 'دفع عمولة' : 'Pay Commission'}
              </h3>
              <button
                onClick={() => {
                  setShowPayCommissionModal(false)
                  setSelectedAgent(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              {/* Agent Info Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 mb-6 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {selectedAgent.firstName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {language === 'ar' 
                          ? `${selectedAgent.firstName} ${selectedAgent.lastName}`
                          : `${selectedAgent.firstNameEn} ${selectedAgent.lastNameEn}`
                        }
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedAgent.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'ar' ? 'إجمالي العمولة المستحقة' : 'Total Commission Due'}
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {selectedAgent.totalCommission} {language === 'ar' ? 'د.ع' : 'IQD'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-percentage text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'نسبة العمولة:' : 'Commission Rate:'} {selectedAgent.commission}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-hotel text-green-600"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'عدد الفنادق المضافة:' : 'Hotels Added:'} {selectedAgent.hotelsAdded}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'مبلغ الدفع (د.ع)' : 'Payment Amount (IQD)'}
                    </label>
                    <input 
                      type="number" 
                      placeholder={selectedAgent.totalCommission.toString()}
                      defaultValue={selectedAgent.totalCommission}
                      min="0"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white" 
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ar' ? 'يمكنك دفع كامل المبلغ أو جزء منه' : 'You can pay full or partial amount'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">{language === 'ar' ? 'اختر طريقة الدفع' : 'Select Payment Method'}</option>
                      <option>{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                      <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                      <option>{language === 'ar' ? 'شيك' : 'Check'}</option>
                      <option>{language === 'ar' ? 'محفظة إلكترونية' : 'E-Wallet'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'تاريخ الدفع' : 'Payment Date'}
                    </label>
                    <input 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'رقم المرجع/الإيصال' : 'Reference/Receipt Number'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={language === 'ar' ? 'مثال: REC-2024-001' : 'e.g., REC-2024-001'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'ملاحظات' : 'Notes'}
                  </label>
                  <textarea 
                    rows="3"
                    placeholder={language === 'ar' ? 'أدخل أي ملاحظات إضافية...' : 'Enter any additional notes...'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPayCommissionModal(false)
                      setSelectedAgent(null)
                    }}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    <i className="fas fa-check-circle ml-2"></i>
                    {language === 'ar' ? 'تأكيد الدفع' : 'Confirm Payment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Cashbox Section
function CashboxSection({ language }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'الصندوق الخاص' : 'My Cashbox'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
          <i className="fas fa-wallet text-4xl mb-3 opacity-80"></i>
          <p className="text-sm opacity-80 mb-1">{language === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}</p>
          <p className="text-4xl font-bold">$25,450</p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white shadow-lg">
          <i className="fas fa-arrow-down text-4xl mb-3 opacity-80"></i>
          <p className="text-sm opacity-80 mb-1">{language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
          <p className="text-4xl font-bold">$32,100</p>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-white shadow-lg">
          <i className="fas fa-arrow-up text-4xl mb-3 opacity-80"></i>
          <p className="text-sm opacity-80 mb-1">{language === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</p>
          <p className="text-4xl font-bold">$6,650</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'حركة الصندوق' : 'Cashbox Transactions'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'النوع' : 'Type'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الرصيد' : 'Balance'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { date: '2025-11-16', desc: 'اشتراك فندق بغداد', descEn: 'Baghdad Hotel subscription', type: 'in', amount: 200, balance: 25450 },
                { date: '2025-11-15', desc: 'دفع عمولة مندوب', descEn: 'Agent commission payment', type: 'out', amount: 150, balance: 25250 },
                { date: '2025-11-14', desc: 'تجديد اشتراك', descEn: 'Subscription renewal', type: 'in', amount: 200, balance: 25400 }
              ].map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{transaction.date}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {language === 'ar' ? transaction.desc : transaction.descEn}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      transaction.type === 'in' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {transaction.type === 'in' ? (language === 'ar' ? 'إيراد' : 'Income') : (language === 'ar' ? 'مصروف' : 'Expense')}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${transaction.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'in' ? '+' : '-'}${transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">${transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Reports Section
function ReportsSection({ language }) {
  const [selectedReport, setSelectedReport] = useState(null)
  const [showReportView, setShowReportView] = useState(false)

  const handleReportClick = (report) => {
    setSelectedReport(report)
    setShowReportView(true)
  }

  const handleCloseReport = () => {
    setShowReportView(false)
    setSelectedReport(null)
  }

  const exportReport = (format) => {
    alert(language === 'ar' ? `جاري تصدير التقرير بصيغة ${format}...` : `Exporting report as ${format}...`)
  }

  const printReport = () => {
    window.print()
  }

  if (showReportView && selectedReport) {
    return (
      <div className="space-y-6">
        {/* Report Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleCloseReport}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <i className="fas fa-arrow-right ml-2"></i>
                {language === 'ar' ? 'رجوع' : 'Back'}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? selectedReport.titleAr : selectedReport.titleEn}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'تاريخ الإنشاء: ' : 'Generated on: '}
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={printReport}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <i className="fas fa-print ml-2"></i>
                {language === 'ar' ? 'طباعة' : 'Print'}
              </button>
              <button 
                onClick={() => exportReport('PDF')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <i className="fas fa-file-pdf ml-2"></i>
                PDF
              </button>
              <button 
                onClick={() => exportReport('Excel')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <i className="fas fa-file-excel ml-2"></i>
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <i className={`fas ${selectedReport.icon} text-blue-600 dark:text-blue-400 text-xl`}></i>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'إجمالي السجلات' : 'Total Records'}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'نشط' : 'Active'}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">38</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-yellow-600 dark:text-yellow-400 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <i className="fas fa-dollar-sign text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'الإجمالي' : 'Total'}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'بيانات التقرير' : 'Report Data'}
            </h3>
          </div>
          
          {selectedReport.id === 'hotels' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'اسم الفندق' : 'Hotel Name'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'التصنيف' : 'Category'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'عدد الغرف' : 'Rooms'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'المدير' : 'Manager'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { id: 1, name: 'فندق بغداد الكبير', nameEn: 'Grand Baghdad Hotel', stars: 5, rooms: 120, manager: 'أحمد الجبوري', status: 'نشط' },
                  { id: 2, name: 'فندق الرشيد', nameEn: 'Al-Rasheed Hotel', stars: 4, rooms: 85, manager: 'فاطمة العلي', status: 'نشط' },
                  { id: 3, name: 'فندق بابل', nameEn: 'Babel Hotel', stars: 4, rooms: 95, manager: 'محمد الخزرجي', status: 'نشط' },
                  { id: 4, name: 'فندق السلام', nameEn: 'Al-Salam Hotel', stars: 3, rooms: 60, manager: 'حسن الموسوي', status: 'صيانة' },
                  { id: 5, name: 'فندق دجلة', nameEn: 'Tigris Hotel', stars: 4, rooms: 75, manager: 'سارة النجار', status: 'نشط' }
                ].map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{hotel.id}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                      {language === 'ar' ? hotel.name : hotel.nameEn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-500">
                        {'★'.repeat(hotel.stars)}{'☆'.repeat(5-hotel.stars)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{hotel.rooms}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{hotel.manager}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        hotel.status === 'نشط' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {language === 'ar' ? hotel.status : (hotel.status === 'نشط' ? 'Active' : 'Maintenance')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport.id === 'subscriptions' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الفندق' : 'Hotel'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'نوع الاشتراك' : 'Subscription Type'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { id: 1, hotel: 'فندق بغداد الكبير', type: 'سنوي', start: '2025-01-15', end: '2026-01-15', amount: 2400 },
                  { id: 2, hotel: 'فندق الرشيد', type: 'سنوي', start: '2025-02-20', end: '2026-02-20', amount: 2400 },
                  { id: 3, hotel: 'فندق بابل', type: 'شهري', start: '2025-11-01', end: '2025-12-01', amount: 200 },
                  { id: 4, hotel: 'فندق السلام', type: 'سنوي', start: '2025-03-10', end: '2026-03-10', amount: 2040 }
                ].map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{sub.id}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{sub.hotel}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        sub.type === 'سنوي'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                      }`}>
                        {language === 'ar' ? sub.type : (sub.type === 'سنوي' ? 'Annual' : 'Monthly')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.start}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.end}</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">${sub.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport.id === 'payments' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'رقم السند' : 'Voucher No.'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الفندق' : 'Hotel'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'طريقة الدفع' : 'Method'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { no: 'REC-001', type: 'قبض', hotel: 'فندق بغداد', method: 'نقدي', amount: 2400, date: '2025-11-15' },
                  { no: 'PAY-001', type: 'دفع', hotel: 'فندق الرشيد', method: 'تحويل بنكي', amount: 500, date: '2025-11-14' },
                  { no: 'REC-002', type: 'قبض', hotel: 'فندق بابل', method: 'بطاقة ائتمان', amount: 2400, date: '2025-11-13' },
                  { no: 'REC-003', type: 'قبض', hotel: 'فندق السلام', method: 'Zain Cash', amount: 200, date: '2025-11-12' }
                ].map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{payment.no}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.type === 'قبض'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {language === 'ar' ? payment.type : (payment.type === 'قبض' ? 'Receipt' : 'Payment')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.hotel}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.method}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">${payment.amount}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport.id === 'agents' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'اسم المندوب' : 'Agent Name'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'نسبة العمولة' : 'Commission Rate'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الفنادق المضافة' : 'Hotels Added'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'إجمالي العمولات' : 'Total Commission'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { id: 1, name: 'علي الكعبي', rate: 12, hotels: 8, commission: 3840 },
                  { id: 2, name: 'زينب البصري', rate: 15, hotels: 5, commission: 3000 },
                  { id: 3, name: 'حسين العبادي', rate: 10, hotels: 6, commission: 2400 },
                  { id: 4, name: 'مريم السامرائي', rate: 13, hotels: 7, commission: 3640 }
                ].map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{agent.id}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{agent.name}</td>
                    <td className="px-6 py-4 text-purple-600 dark:text-purple-400 font-bold">{agent.rate}%</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{agent.hotels}</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">${agent.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(selectedReport.id === 'revenue' || selectedReport.id === 'commissions') && (
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { month: 'يناير', revenue: 12500, expenses: 3200, profit: 9300 },
                  { month: 'فبراير', revenue: 14200, expenses: 3500, profit: 10700 },
                  { month: 'مارس', revenue: 13800, expenses: 3100, profit: 10700 },
                  { month: 'أبريل', revenue: 15600, expenses: 3800, profit: 11800 }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.month}</h4>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'الإيرادات' : 'Revenue'}</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">${item.revenue}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'المصروفات' : 'Expenses'}</p>
                          <p className="text-lg font-bold text-red-600 dark:text-red-400">${item.expenses}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'الصافي' : 'Net'}</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${item.profit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Report Footer */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>{language === 'ar' ? 'تم إنشاء هذا التقرير بواسطة نظام إدارة الفنادق - NineSoft' : 'This report was generated by Hotel Management System - NineSoft'}</p>
            <p className="mt-2">{new Date().toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'التقارير' : 'Reports'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'hotels', icon: 'fa-hotel', titleAr: 'تقرير الفنادق', titleEn: 'Hotels Report', colorClasses: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' },
          { id: 'subscriptions', icon: 'fa-calendar-check', titleAr: 'تقرير الاشتراكات', titleEn: 'Subscriptions Report', colorClasses: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400' },
          { id: 'payments', icon: 'fa-money-bill-wave', titleAr: 'تقرير المدفوعات', titleEn: 'Payments Report', colorClasses: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400' },
          { id: 'agents', icon: 'fa-users', titleAr: 'تقرير المندوبين', titleEn: 'Agents Report', colorClasses: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400' },
          { id: 'revenue', icon: 'fa-chart-line', titleAr: 'تقرير الإيرادات', titleEn: 'Revenue Report', colorClasses: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400' },
          { id: 'commissions', icon: 'fa-file-invoice-dollar', titleAr: 'تقرير العمولات', titleEn: 'Commissions Report', colorClasses: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400' }
        ].map((report, index) => (
          <button
            key={index}
            onClick={() => handleReportClick(report)}
            className={`p-6 ${report.colorClasses} border-2 rounded-xl hover:shadow-lg transition-all`}
          >
            <i className={`fas ${report.icon} text-4xl mb-4`}></i>
            <p className="text-lg font-bold">
              {language === 'ar' ? report.titleAr : report.titleEn}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {language === 'ar' ? 'انقر لعرض التقرير' : 'Click to view report'}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
