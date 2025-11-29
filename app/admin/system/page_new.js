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
      messageEn: '5 subscriptions will expire within a week',
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
                {/* Language Toggle */}
                <button
                  onClick={() => {/* يمكن إضافة تغيير اللغة هنا */}}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  title={language === 'ar' ? 'English' : 'العربية'}
                >
                  <i className="fas fa-language text-gray-700 dark:text-gray-300 text-xl"></i>
                </button>

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

// استيراد باقي المكونات من الملف الأصلي
// (سأضيف الدوال الباقية في الرسالة التالية)
