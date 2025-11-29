'use client'
import { useState, useEffect } from 'react'
import RenewSubscription from './sections/RenewSubscription'
import TrialVersion from './sections/TrialVersion'
import ReceiptVoucher from './sections/ReceiptVoucher'
import PaymentVoucher from './sections/PaymentVoucher'
import ExpenseVoucher from './sections/ExpenseVoucher'

export default function UserAccountantDashboard() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('ar')
  const [activeTab, setActiveTab] = useState('overview')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [notificationFilter, setNotificationFilter] = useState('all')
  const [notificationsList, setNotificationsList] = useState([])
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showNotificationDetails, setShowNotificationDetails] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: language === 'ar' ? 'اشتراك قارب على الانتهاء' : 'Subscription Expiring Soon',
      message: language === 'ar' ? 'فندق النخيل - ينتهي خلال 7 أيام' : 'Al-Nakheel Hotel - Expires in 7 days',
      time: language === 'ar' ? 'منذ ساعة' : '1 hour ago',
      icon: 'fa-exclamation-triangle',
      color: 'text-yellow-600'
    },
    {
      id: 2,
      type: 'success',
      title: language === 'ar' ? 'تم استلام دفعة جديدة' : 'New Payment Received',
      message: language === 'ar' ? 'سند قبض RV-2025-001 - 1,200,000 د.ع' : 'Receipt RV-2025-001 - 1,200,000 IQD',
      time: language === 'ar' ? 'منذ ساعتين' : '2 hours ago',
      icon: 'fa-check-circle',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'info',
      title: language === 'ar' ? 'طلب نسخة تجريبية جديد' : 'New Trial Request',
      message: language === 'ar' ? 'فندق الشرق الأوسط يطلب نسخة تجريبية' : 'Middle East Hotel requested trial',
      time: language === 'ar' ? 'منذ 3 ساعات' : '3 hours ago',
      icon: 'fa-gift',
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'critical',
      title: language === 'ar' ? 'اشتراك منتهي' : 'Subscription Expired',
      message: language === 'ar' ? 'فندق الربيع - انتهى منذ يومين' : 'Al-Rabee Hotel - Expired 2 days ago',
      time: language === 'ar' ? 'منذ يوم' : '1 day ago',
      icon: 'fa-times-circle',
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'info',
      title: language === 'ar' ? 'تم إنشاء سند صرف' : 'Expense Voucher Created',
      message: language === 'ar' ? 'سند صرف EV-2025-001 - مصاريف إدارية' : 'Expense EV-2025-001 - Administrative',
      time: language === 'ar' ? 'منذ يومين' : '2 days ago',
      icon: 'fa-receipt',
      color: 'text-purple-600'
    }
  ]

  const tabs = [
    { id: 'overview', nameAr: 'نظرة عامة', nameEn: 'Overview', icon: 'fa-chart-line' },
    { id: 'renew', nameAr: 'تجديد الاشتراكات', nameEn: 'Renew Subscriptions', icon: 'fa-sync-alt' },
    { id: 'receipt', nameAr: 'سند قبض', nameEn: 'Receipt Voucher', icon: 'fa-money-bill-wave' },
    { id: 'payment', nameAr: 'سند دفع', nameEn: 'Payment Voucher', icon: 'fa-file-invoice-dollar' },
    { id: 'expense', nameAr: 'سند صرف', nameEn: 'Expense Voucher', icon: 'fa-receipt' },
    { id: 'trial', nameAr: 'النسخ التجريبية', nameEn: 'Trial Versions', icon: 'fa-gift' }
  ]

  // Initialize notifications list
  useEffect(() => {
    if (mounted) {
      setNotificationsList(notifications)
    }
  }, [mounted])

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification)
    setShowNotificationDetails(true)
  }

  const handleDismissNotification = (notificationId) => {
    setNotificationsList(notificationsList.filter(n => n.id !== notificationId))
  }

  const handleMarkAllRead = () => {
    setNotificationsList([])
    setShowAllNotifications(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-calculator text-white text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'محاسب المستخدم' : 'User Accountant'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'إدارة الحسابات والاشتراكات' : 'Manage Accounts & Subscriptions'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 font-semibold transition-all"
                >
                  <i className="fas fa-language ml-2"></i>
                  {language === 'ar' ? 'EN' : 'عربي'}
                </button>
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <i className={`fas ${isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600'} text-xl`}></i>
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all relative"
                  >
                    <i className="fas fa-bell text-gray-600 dark:text-gray-300 text-xl"></i>
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {notifications.length}
                    </span>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[500px] overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex justify-between items-center">
                        <h3 className="text-white font-bold text-lg">
                          <i className="fas fa-bell ml-2"></i>
                          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                        </h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-white hover:text-gray-200"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">
                        {notificationsList.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                notification.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                                notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                                notification.type === 'critical' ? 'bg-red-100 dark:bg-red-900' :
                                'bg-blue-100 dark:bg-blue-900'
                              }`}>
                                <i className={`fas ${notification.icon} ${notification.color}`}></i>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                  <i className="fas fa-clock ml-1"></i>
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-center">
                        <button 
                          onClick={() => {
                            setShowNotifications(false)
                            setShowAllNotifications(true)
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm"
                        >
                          {language === 'ar' ? 'عرض جميع الإشعارات' : 'View All Notifications'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-blue-600"></i>
                  </div>
                  <span className="text-white font-semibold">
                    {language === 'ar' ? 'أحمد المحاسب' : 'Ahmed Accountant'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <i className={`fas ${tab.icon} ml-2`}></i>
                  {language === 'ar' ? tab.nameAr : tab.nameEn}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && <OverviewSection language={language} />}
          {activeTab === 'renew' && <RenewSubscription language={language} />}
          {activeTab === 'receipt' && <ReceiptVoucher language={language} />}
          {activeTab === 'payment' && <PaymentVoucher language={language} />}
          {activeTab === 'expense' && <ExpenseVoucher language={language} />}
          {activeTab === 'trial' && <TrialVersion language={language} />}
        </main>

        {/* All Notifications Modal */}
        {showAllNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <i className="fas fa-bell"></i>
                  {language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'}
                </h3>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  <button 
                    onClick={() => setNotificationFilter('all')}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                      notificationFilter === 'all' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {language === 'ar' ? 'الكل' : 'All'} ({notificationsList.length})
                  </button>
                  <button 
                    onClick={() => setNotificationFilter('warning')}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                      notificationFilter === 'warning' 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {language === 'ar' ? 'تحذيرات' : 'Warnings'} ({notificationsList.filter(n => n.type === 'warning').length})
                  </button>
                  <button 
                    onClick={() => setNotificationFilter('success')}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                      notificationFilter === 'success' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {language === 'ar' ? 'نجاحات' : 'Success'} ({notificationsList.filter(n => n.type === 'success').length})
                  </button>
                  <button 
                    onClick={() => setNotificationFilter('critical')}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                      notificationFilter === 'critical' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {language === 'ar' ? 'حرجة' : 'Critical'} ({notificationsList.filter(n => n.type === 'critical').length})
                  </button>
                  <button 
                    onClick={() => setNotificationFilter('info')}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                      notificationFilter === 'info' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {language === 'ar' ? 'معلومات' : 'Info'} ({notificationsList.filter(n => n.type === 'info').length})
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto space-y-3">
                  {notificationsList
                    .filter(notification => notificationFilter === 'all' || notification.type === notificationFilter)
                    .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-lg transition-all border-l-4"
                      style={{
                        borderLeftColor: 
                          notification.type === 'success' ? '#10b981' :
                          notification.type === 'warning' ? '#f59e0b' :
                          notification.type === 'critical' ? '#ef4444' : '#3b82f6'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                          notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                          notification.type === 'critical' ? 'bg-red-100 dark:bg-red-900' :
                          'bg-blue-100 dark:bg-blue-900'
                        }`}>
                          <i className={`fas ${notification.icon} ${notification.color} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                              {notification.title}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              notification.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' :
                              notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300' :
                              notification.type === 'critical' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' :
                              'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                            }`}>
                              {notification.type === 'success' ? (language === 'ar' ? 'نجاح' : 'Success') :
                               notification.type === 'warning' ? (language === 'ar' ? 'تحذير' : 'Warning') :
                               notification.type === 'critical' ? (language === 'ar' ? 'حرج' : 'Critical') :
                               (language === 'ar' ? 'معلومة' : 'Info')}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <i className="fas fa-clock ml-1"></i>
                              {notification.time}
                            </p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleViewNotification(notification)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-semibold"
                              >
                                {language === 'ar' ? 'عرض' : 'View'}
                              </button>
                              <button 
                                onClick={() => handleDismissNotification(notification.id)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 text-sm font-semibold"
                              >
                                {language === 'ar' ? 'تجاهل' : 'Dismiss'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold"
                  >
                    <i className="fas fa-check-double ml-2"></i>
                    {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
                  </button>
                  <button 
                    onClick={() => setShowAllNotifications(false)}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Details Modal */}
        {showNotificationDetails && selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
              <div className={`px-6 py-4 flex justify-between items-center rounded-t-2xl ${
                selectedNotification.type === 'success' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                selectedNotification.type === 'warning' ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                selectedNotification.type === 'critical' ? 'bg-gradient-to-r from-red-600 to-rose-600' :
                'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <i className={`fas ${selectedNotification.icon}`}></i>
                  {language === 'ar' ? 'تفاصيل الإشعار' : 'Notification Details'}
                </h3>
                <button
                  onClick={() => setShowNotificationDetails(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-6">
                <div className={`mb-6 p-4 rounded-lg ${
                  selectedNotification.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                  selectedNotification.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                  selectedNotification.type === 'critical' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                  'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedNotification.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                      selectedNotification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      selectedNotification.type === 'critical' ? 'bg-red-100 dark:bg-red-900' :
                      'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      <i className={`fas ${selectedNotification.icon} ${selectedNotification.color} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                          {selectedNotification.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedNotification.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' :
                          selectedNotification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300' :
                          selectedNotification.type === 'critical' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' :
                          'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        }`}>
                          {selectedNotification.type === 'success' ? (language === 'ar' ? 'نجاح' : 'Success') :
                           selectedNotification.type === 'warning' ? (language === 'ar' ? 'تحذير' : 'Warning') :
                           selectedNotification.type === 'critical' ? (language === 'ar' ? 'حرج' : 'Critical') :
                           (language === 'ar' ? 'معلومة' : 'Info')}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-3">
                        {selectedNotification.message}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <i className="fas fa-clock ml-1"></i>
                        {selectedNotification.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'إجراءات مقترحة' : 'Suggested Actions'}
                  </h5>
                  <ul className="space-y-2">
                    {selectedNotification.type === 'warning' && (
                      <>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-green-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'تواصل مع الفندق لتجديد الاشتراك' : 'Contact the hotel to renew subscription'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-green-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'قم بإعداد سند قبض للدفعة الجديدة' : 'Prepare a receipt voucher for the new payment'}
                          </span>
                        </li>
                      </>
                    )}
                    {selectedNotification.type === 'success' && (
                      <>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-green-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'تم توثيق العملية بنجاح' : 'Operation documented successfully'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-green-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'يمكنك طباعة السند من السجلات' : 'You can print the voucher from records'}
                          </span>
                        </li>
                      </>
                    )}
                    {selectedNotification.type === 'critical' && (
                      <>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-exclamation-circle text-red-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'اتصل بالفندق فوراً' : 'Contact the hotel immediately'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-exclamation-circle text-red-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'قد يتم تعليق الخدمة' : 'Service may be suspended'}
                          </span>
                        </li>
                      </>
                    )}
                    {selectedNotification.type === 'info' && (
                      <>
                        <li className="flex items-start gap-2">
                          <i className="fas fa-info-circle text-blue-600 mt-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' ? 'راجع التفاصيل في القسم المناسب' : 'Review details in the appropriate section'}
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleDismissNotification(selectedNotification.id)
                      setShowNotificationDetails(false)
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times ml-2"></i>
                    {language === 'ar' ? 'تجاهل وإغلاق' : 'Dismiss & Close'}
                  </button>
                  <button
                    onClick={() => setShowNotificationDetails(false)}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    <i className="fas fa-check ml-2"></i>
                    {language === 'ar' ? 'حسناً' : 'OK'}
                  </button>
                </div>
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
    {
      title: language === 'ar' ? 'الاشتراكات النشطة' : 'Active Subscriptions',
      value: '156',
      icon: 'fa-check-circle',
      color: 'from-green-500 to-emerald-500',
      change: '+12'
    },
    {
      title: language === 'ar' ? 'سندات القبض' : 'Receipt Vouchers',
      value: '89',
      icon: 'fa-money-bill-wave',
      color: 'from-blue-500 to-cyan-500',
      change: '+5'
    },
    {
      title: language === 'ar' ? 'سندات الدفع' : 'Payment Vouchers',
      value: '43',
      icon: 'fa-file-invoice-dollar',
      color: 'from-purple-500 to-pink-500',
      change: '+8'
    },
    {
      title: language === 'ar' ? 'النسخ التجريبية' : 'Trial Versions',
      value: '24',
      icon: 'fa-gift',
      color: 'from-orange-500 to-red-500',
      change: '+3'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'subscription', typeAr: 'اشتراك', typeEn: 'Subscription', hotel: 'فندق النخيل الذهبي', description: 'تجديد اشتراك', date: '2025-11-21 11:30', amount: 5000000, status: 'completed' },
    { id: 2, type: 'commission', typeAr: 'عمولة', typeEn: 'Commission', hotel: 'فندق الزهور', description: 'عمولة Booking.com', date: '2025-11-21 10:15', amount: 850000, status: 'pending' },
    { id: 3, type: 'payment', typeAr: 'دفعة', typeEn: 'Payment', hotel: 'فندق النجوم', description: 'دفع رسوم سنوية', date: '2025-11-20 16:45', amount: 12000000, status: 'completed' },
    { id: 4, type: 'trial', typeAr: 'تجربة', typeEn: 'Trial', hotel: 'فندق الربيع', description: 'تفعيل نسخة تجريبية', date: '2025-11-20 14:20', amount: 0, status: 'active' },
    { id: 5, type: 'subscription', typeAr: 'اشتراك', typeEn: 'Subscription', hotel: 'فندق البحر', description: 'اشتراك جديد - باقة ذهبية', date: '2025-11-20 09:30', amount: 8000000, status: 'completed' },
    { id: 6, type: 'commission', typeAr: 'عمولة', typeEn: 'Commission', hotel: 'فندق الأمل', description: 'عمولة Expedia', date: '2025-11-19 18:00', amount: 620000, status: 'completed' },
    { id: 7, type: 'payment', typeAr: 'دفعة', typeEn: 'Payment', hotel: 'فندق الشمس', description: 'دفع رسوم إضافية', date: '2025-11-19 15:30', amount: 1500000, status: 'completed' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'نظرة عامة' : 'Overview'}
      </h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <i className={`fas ${stat.icon} text-white text-2xl`}></i>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <i className="fas fa-history text-blue-600"></i>
          {language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
        </h3>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'receipt' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' :
                  activity.type === 'payment' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' :
                  activity.type === 'expense' ? 'bg-red-100 dark:bg-red-900 text-red-600' :
                  activity.type === 'renew' ? 'bg-green-100 dark:bg-green-900 text-green-600' :
                  'bg-orange-100 dark:bg-orange-900 text-orange-600'
                }`}>
                  <i className={`fas ${
                    activity.type === 'receipt' ? 'fa-money-bill-wave' :
                    activity.type === 'payment' ? 'fa-file-invoice-dollar' :
                    activity.type === 'expense' ? 'fa-receipt' :
                    activity.type === 'renew' ? 'fa-sync-alt' :
                    'fa-gift'
                  }`}></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{activity.hotel}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  {activity.amount} {language === 'ar' ? 'د.ع' : 'IQD'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.type === 'receipt' ? (language === 'ar' ? 'سند قبض' : 'Receipt') :
                   activity.type === 'payment' ? (language === 'ar' ? 'سند دفع' : 'Payment') :
                   activity.type === 'expense' ? (language === 'ar' ? 'سند صرف' : 'Expense') :
                   activity.type === 'renew' ? (language === 'ar' ? 'تجديد' : 'Renewal') :
                   (language === 'ar' ? 'نسخة تجريبية' : 'Trial')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
