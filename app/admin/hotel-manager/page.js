'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../translations'
import BranchesSection from './sections/BranchesSection'
import PartnersSection from './sections/PartnersSection'
import FloorsSection from './sections/FloorsSection'
import AdditionalServicesSection from './sections/AdditionalServicesSection'
import RoomsSection from './sections/RoomsSection'
import RoomTypesSection from './sections/RoomTypesSection'
import HallsSection from './sections/HallsSection'
import PaymentMethodsSection from './sections/PaymentMethodsSection'
import ExpenseAccountsSection from './sections/ExpenseAccountsSection'
import EmployeesSection from './sections/EmployeesSection'
import PermanentCustomersSection from './sections/PermanentCustomersSection'
import BookingAppsSection from './sections/BookingAppsSection'
import SystemSettingsSection from './sections/SystemSettingsSection'

export default function HotelManagerDashboard() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)

  useEffect(() => {
    setMounted(true)
    // Load dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true')
    }
  }, [])

  useEffect(() => {
    // Save dark mode to localStorage
    if (mounted) {
      localStorage.setItem('darkMode', darkMode.toString())
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reservation',
      titleAr: 'حجز جديد',
      titleEn: 'New Reservation',
      messageAr: 'حجز جديد للغرفة 205 - من 20/11 إلى 25/11',
      messageEn: 'New reservation for room 205 - from 20/11 to 25/11',
      detailsAr: 'تم استلام حجز جديد من السيد أحمد محمد للغرفة رقم 205 (جناح ملكي). مدة الإقامة: 5 ليالي. عدد النزلاء: 2. السعر الإجمالي: 750,000 د.ع. طريقة الدفع: بطاقة ائتمان.',
      detailsEn: 'New reservation received from Mr. Ahmed Mohammed for room 205 (Royal Suite). Duration: 5 nights. Guests: 2. Total: 750,000 IQD. Payment: Credit Card.',
      time: '10 min ago',
      icon: 'fa-calendar-check',
      color: 'text-blue-600',
      isRead: false
    },
    {
      id: 2,
      type: 'maintenance',
      titleAr: 'طلب صيانة',
      titleEn: 'Maintenance Request',
      messageAr: 'الغرفة 308 - عطل في نظام التكييف',
      messageEn: 'Room 308 - AC system malfunction',
      detailsAr: 'تم استلام طلب صيانة عاجل من الغرفة 308. المشكلة: عطل في نظام التكييف. الأولوية: عالية. تم تعيين المهمة لفريق الصيانة. الوقت المتوقع للإصلاح: 2 ساعة.',
      detailsEn: 'Urgent maintenance request from room 308. Issue: AC system malfunction. Priority: High. Task assigned to maintenance team. Expected fix time: 2 hours.',
      time: '1 hour ago',
      icon: 'fa-tools',
      color: 'text-orange-600',
      isRead: false
    },
    {
      id: 3,
      type: 'payment',
      titleAr: 'دفعة مستلمة',
      titleEn: 'Payment Received',
      messageAr: 'دفعة بقيمة 450,000 د.ع من شركة السياحة الذهبية',
      messageEn: 'Payment of 450,000 IQD from Golden Tourism Company',
      detailsAr: 'تم استلام دفعة من شركة السياحة الذهبية بقيمة 450,000 دينار عراقي. رقم الفاتورة: INV-2025-1543. طريقة الدفع: تحويل بنكي. الحساب: حساب الشركة الرئيسي.',
      detailsEn: 'Payment received from Golden Tourism Company for 450,000 IQD. Invoice: INV-2025-1543. Payment method: Bank transfer. Account: Main company account.',
      time: '3 hours ago',
      icon: 'fa-money-bill-wave',
      color: 'text-green-600',
      isRead: false
    }
  ])

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
    { id: 'overview', icon: 'fa-chart-line', labelAr: 'نظرة عامة', labelEn: 'Overview', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'branches', icon: 'fa-code-branch', labelAr: 'الفروع', labelEn: 'Branches' },
    { id: 'partners', icon: 'fa-handshake', labelAr: 'الشركاء', labelEn: 'Partners' },
    { id: 'floors', icon: 'fa-building', labelAr: 'الطوابق', labelEn: 'Floors' },
    { id: 'roomTypes', icon: 'fa-bed', labelAr: 'أنواع الغرف', labelEn: 'Room Types' },
    { id: 'rooms', icon: 'fa-door-open', labelAr: 'الغرف', labelEn: 'Rooms' },
    { id: 'additionalServices', icon: 'fa-concierge-bell', labelAr: 'الخدمات الإضافية', labelEn: 'Additional Services' },
    { id: 'halls', icon: 'fa-users', labelAr: 'القاعات', labelEn: 'Halls' },
    { id: 'paymentMethods', icon: 'fa-credit-card', labelAr: 'وسائل الدفع', labelEn: 'Payment Methods' },
    { id: 'expenseAccounts', icon: 'fa-receipt', labelAr: 'حسابات المصروفات', labelEn: 'Expense Accounts' },
    { id: 'employees', icon: 'fa-user-tie', labelAr: 'الموظفين', labelEn: 'Employees' },
    { id: 'permanentCustomers', icon: 'fa-briefcase', labelAr: 'الزبائن الدائمين', labelEn: 'Permanent Customers' },
    { id: 'bookingApps', icon: 'fa-mobile-alt', labelAr: 'تطبيقات الحجز', labelEn: 'Booking Apps' },
    { id: 'settings', icon: 'fa-cog', labelAr: 'الإعدادات', labelEn: 'Settings' }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-xl sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <i className="fas fa-hotel text-white text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {language === 'ar' ? 'لوحة مدير الفندق' : 'Hotel Manager Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i className="fas fa-circle text-green-500 text-xs animate-pulse"></i>
                    {language === 'ar' ? 'إدارة شاملة للفندق' : 'Complete Hotel Management'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 hover:from-blue-100 hover:to-cyan-100 dark:hover:bg-gray-600 rounded-xl transition-all shadow-sm hover:shadow-md group border-2 border-blue-200 dark:border-gray-600"
                  title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                >
                  <i className="fas fa-language text-blue-600 dark:text-blue-400 text-xl group-hover:scale-110 transition-transform"></i>
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'EN' : 'ع'}
                  </span>
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md group"
                  title={darkMode ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
                >
                  <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-700 dark:text-gray-300 text-xl group-hover:scale-110 transition-transform`}></i>
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md group"
                  >
                    <i className="fas fa-bell text-gray-700 dark:text-gray-300 text-xl group-hover:scale-110 group-hover:rotate-12 transition-all"></i>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3">
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
                          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          {language === 'ar' ? 'عرض الكل' : 'View All'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border-2 border-blue-200 dark:border-gray-600 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-user-tie text-white"></i>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      {language === 'ar' ? 'أحمد مدير الفندق' : 'Ahmed Hotel Manager'}
                      <i className="fas fa-crown text-yellow-500 text-xs"></i>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <i className="fas fa-shield-alt text-blue-600"></i>
                      {language === 'ar' ? 'مدير فندق' : 'Hotel Manager'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 overflow-x-auto bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
            <div className="mx-auto px-6">
              <div className="flex gap-2 py-1">
                {menuItems.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-5 py-3 font-semibold whitespace-nowrap transition-all text-sm rounded-t-xl relative group ${
                      activeSection === section.id
                        ? 'text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className={`fas ${section.icon} ${activeSection === section.id ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform`}></i>
                    {language === 'ar' ? section.labelAr : section.labelEn}
                    {activeSection === section.id && (
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto px-6 py-8 animate-fadeIn">
          {activeSection === 'overview' && <OverviewSection language={language} />}
          {activeSection === 'branches' && <BranchesSection language={language} />}
          {activeSection === 'partners' && <PartnersSection language={language} />}
          {activeSection === 'floors' && <FloorsSection language={language} />}
          {activeSection === 'roomTypes' && <RoomTypesSection language={language} />}
          {activeSection === 'rooms' && <RoomsSection language={language} />}
          {activeSection === 'additionalServices' && <AdditionalServicesSection language={language} />}
          {activeSection === 'halls' && <HallsSection language={language} />}
          {activeSection === 'paymentMethods' && <PaymentMethodsSection language={language} />}
          {activeSection === 'expenseAccounts' && <ExpenseAccountsSection language={language} />}
          {activeSection === 'employees' && <EmployeesSection language={language} />}
          {activeSection === 'permanentCustomers' && <PermanentCustomersSection language={language} />}
          {activeSection === 'bookingApps' && <BookingAppsSection language={language} />}
          {activeSection === 'settings' && <SystemSettingsSection language={language} />}
        </main>

        {/* Notification Details Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <div className={`bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between`}>
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
                    <i className="fas fa-info-circle text-blue-600"></i>
                    {language === 'ar' ? 'الملخص' : 'Summary'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    {language === 'ar' ? selectedNotification.messageAr : selectedNotification.messageEn}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-file-alt text-cyan-600"></i>
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
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
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
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
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
                  className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
    { icon: 'fa-bed', labelAr: 'إجمالي الغرف', labelEn: 'Total Rooms', value: '120', color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', gradient: 'from-blue-500 to-blue-600', lightBg: 'from-blue-50 to-cyan-50' },
    { icon: 'fa-door-open', labelAr: 'غرف متاحة', labelEn: 'Available Rooms', value: '45', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400', gradient: 'from-green-500 to-emerald-600', lightBg: 'from-green-50 to-emerald-50' },
    { icon: 'fa-calendar-check', labelAr: 'حجوزات اليوم', labelEn: 'Today Bookings', value: '8', color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400', gradient: 'from-purple-500 to-pink-600', lightBg: 'from-purple-50 to-pink-50' },
    { icon: 'fa-money-bill-wave', labelAr: 'الإيرادات اليوم', labelEn: 'Today Revenue', value: '2,450,000 د.ع', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400', gradient: 'from-yellow-500 to-orange-600', lightBg: 'from-yellow-50 to-orange-50' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'نظرة عامة' : 'Overview'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.lightBg} dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-2 border-transparent hover:border-white dark:hover:border-gray-600 group cursor-pointer relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white dark:bg-gray-700 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl relative z-10`}>
              <i className={`fas ${stat.icon} text-2xl text-white`}></i>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-semibold uppercase tracking-wide relative z-10">
              {language === 'ar' ? stat.labelAr : stat.labelEn}
            </p>
            <p className={`text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block relative z-10`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl border-2 border-blue-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-calendar-check text-white"></i>
            </div>
            {language === 'ar' ? 'الحجوزات الحديثة' : 'Recent Bookings'}
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-x-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                    <i className="fas fa-user text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {language === 'ar' ? `أحمد محمد ${item}` : `Ahmed Mohammed ${item}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <i className="fas fa-door-open text-xs"></i>
                      {language === 'ar' ? `الغرفة 20${item}` : `Room 20${item}`}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg font-bold text-sm">
                  {language === 'ar' ? 'مؤكد' : 'Confirmed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-6 shadow-2xl border-2 border-blue-300 relative overflow-hidden group hover:scale-105 transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-pie"></i>
            </div>
            {language === 'ar' ? 'الإشغال الشهري' : 'Monthly Occupancy'}
          </h3>
          <div className="text-center py-8 relative z-10">
            <div className="text-8xl font-extrabold text-white mb-3 drop-shadow-2xl tracking-tight group-hover:scale-110 transition-transform">75%</div>
            <p className="text-blue-100 text-lg font-medium">{language === 'ar' ? 'نسبة الإشغال' : 'Occupancy Rate'}</p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">90</div>
                <div className="text-xs text-blue-100">{language === 'ar' ? 'مشغولة' : 'Occupied'}</div>
              </div>
              <div className="w-px bg-white opacity-30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">30</div>
                <div className="text-xs text-blue-100">{language === 'ar' ? 'متاحة' : 'Available'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
