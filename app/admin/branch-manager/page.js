'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../translations'
import PartnersSection from './sections/PartnersSection'
import FloorsSection from './sections/FloorsSection'
import AdditionalServicesSection from './sections/AdditionalServicesSection'
import FreeServicesSection from './sections/FreeServicesSection'
import RoomsSection from './sections/RoomsSection'
import RoomTypesSection from './sections/RoomTypesSection'
import HallsSection from './sections/HallsSection'
import PaymentMethodsSection from './sections/PaymentMethodsSection'
import ExpenseAccountsSection from './sections/ExpenseAccountsSection'
import EmployeesSection from './sections/EmployeesSection'
import PermanentCustomersSection from './sections/PermanentCustomersSection'
import BookingAppsSection from './sections/BookingAppsSection'
import SystemSettingsSection from './sections/SystemSettingsSection'

export default function BranchManagerDashboard() {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', darkMode.toString())
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  if (!mounted) {
    return null
  }

  const menuItems = [
    { id: 'overview', icon: 'fa-chart-line', labelAr: 'نظرة عامة', labelEn: 'Overview' },
    { id: 'partners', icon: 'fa-handshake', labelAr: 'الشركاء', labelEn: 'Partners' },
    { id: 'floors', icon: 'fa-building', labelAr: 'الطوابق', labelEn: 'Floors' },
    { id: 'roomTypes', icon: 'fa-bed', labelAr: 'أنواع الغرف', labelEn: 'Room Types' },
    { id: 'rooms', icon: 'fa-door-open', labelAr: 'الغرف', labelEn: 'Rooms' },
    { id: 'halls', icon: 'fa-users', labelAr: 'القاعات', labelEn: 'Halls' },
    { id: 'paidServices', icon: 'fa-dollar-sign', labelAr: 'خدمات مدفوعة', labelEn: 'Paid Services' },
    { id: 'freeServices', icon: 'fa-gift', labelAr: 'خدمات مجانية', labelEn: 'Free Services' },
    { id: 'paymentMethods', icon: 'fa-credit-card', labelAr: 'وسائل الدفع', labelEn: 'Payment Methods' },
    { id: 'expenseAccounts', icon: 'fa-receipt', labelAr: 'حسابات المصروفات', labelEn: 'Expense Accounts' },
    { id: 'employees', icon: 'fa-user-tie', labelAr: 'الموظفين', labelEn: 'Employees' },
    { id: 'permanentCustomers', icon: 'fa-briefcase', labelAr: 'الزبائن الدائمين', labelEn: 'Permanent Customers' },
    { id: 'bookingApps', icon: 'fa-mobile-alt', labelAr: 'تطبيقات الحجز', labelEn: 'Booking Apps' },
    { id: 'settings', icon: 'fa-cog', labelAr: 'الإعدادات', labelEn: 'Settings' }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-xl sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <i className="fas fa-user-tie text-white text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {language === 'ar' ? 'لوحة مدير الفرع' : 'Branch Manager Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i className="fas fa-circle text-green-500 text-xs animate-pulse"></i>
                    {language === 'ar' ? 'متصل الآن' : 'Online Now'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 hover:from-purple-100 hover:to-pink-100 dark:hover:bg-gray-600 rounded-xl transition-all shadow-sm hover:shadow-md group border-2 border-purple-200 dark:border-gray-600"
                  title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                >
                  <i className="fas fa-language text-purple-600 dark:text-purple-400 text-xl group-hover:scale-110 transition-transform"></i>
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                    {language === 'ar' ? 'EN' : 'ع'}
                  </span>
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md group"
                  title={darkMode ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
                >
                  <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform`}></i>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border-2 border-purple-200 dark:border-gray-600 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {language === 'ar' ? 'مدير الفرع' : 'Branch Manager'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'فرع بغداد' : 'Baghdad Branch'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-[73px] z-30">
          <div className="mx-auto px-6">
            <div className="flex gap-2 overflow-x-auto pb-2 pt-2 scrollbar-hide">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-6 py-3 rounded-t-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="mx-auto px-6 py-8">
          {activeSection === 'overview' && <OverviewSection language={language} />}
          {activeSection === 'partners' && <PartnersSection language={language} />}
          {activeSection === 'floors' && <FloorsSection language={language} />}
          {activeSection === 'roomTypes' && <RoomTypesSection language={language} />}
          {activeSection === 'rooms' && <RoomsSection language={language} />}
          {activeSection === 'halls' && <HallsSection language={language} />}
          {activeSection === 'paidServices' && <AdditionalServicesSection language={language} />}
          {activeSection === 'freeServices' && <FreeServicesSection language={language} />}
          {activeSection === 'paymentMethods' && <PaymentMethodsSection language={language} />}
          {activeSection === 'expenseAccounts' && <ExpenseAccountsSection language={language} />}
          {activeSection === 'employees' && <EmployeesSection language={language} />}
          {activeSection === 'permanentCustomers' && <PermanentCustomersSection language={language} />}
          {activeSection === 'bookingApps' && <BookingAppsSection language={language} />}
          {activeSection === 'settings' && <SystemSettingsSection language={language} />}
        </main>
      </div>
    </div>
  )
}

// Overview Section
function OverviewSection({ language }) {
  const stats = [
    { icon: 'fa-bed', labelAr: 'إجمالي الغرف', labelEn: 'Total Rooms', value: '50', gradient: 'from-blue-500 to-cyan-500', lightBg: 'from-blue-50 to-cyan-50' },
    { icon: 'fa-door-open', labelAr: 'غرف متاحة', labelEn: 'Available Rooms', value: '18', gradient: 'from-green-500 to-emerald-600', lightBg: 'from-green-50 to-emerald-50' },
    { icon: 'fa-calendar-check', labelAr: 'حجوزات اليوم', labelEn: 'Today Bookings', value: '5', gradient: 'from-purple-500 to-pink-600', lightBg: 'from-purple-50 to-pink-50' },
    { icon: 'fa-users', labelAr: 'الشركاء', labelEn: 'Partners', value: '3', gradient: 'from-orange-500 to-red-600', lightBg: 'from-orange-50 to-red-50' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        {language === 'ar' ? 'نظرة عامة على الفرع' : 'Branch Overview'}
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
        <div className="bg-gradient-to-br from-white via-purple-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl border-2 border-purple-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {language === 'ar' ? 'صلاحيات مدير الفرع' : 'Branch Manager Permissions'}
          </h3>
          <div className="space-y-3">
            {[
              { icon: 'fa-handshake', textAr: 'إضافة وإدارة الشركاء', textEn: 'Add and manage partners' },
              { icon: 'fa-building', textAr: 'إضافة وإدارة الطوابق', textEn: 'Add and manage floors' },
              { icon: 'fa-bed', textAr: 'إضافة أنواع وأسعار الغرف', textEn: 'Add room types and prices' },
              { icon: 'fa-door-open', textAr: 'إضافة الغرف في الطوابق', textEn: 'Add rooms to floors' },
              { icon: 'fa-users', textAr: 'إضافة قاعات قابلة للإيجار', textEn: 'Add rentable halls' },
              { icon: 'fa-dollar-sign', textAr: 'إضافة خدمات مدفوعة', textEn: 'Add paid services' },
              { icon: 'fa-gift', textAr: 'إضافة خدمات مجانية', textEn: 'Add free services' },
              { icon: 'fa-credit-card', textAr: 'إدارة وسائل الدفع', textEn: 'Manage payment methods' },
              { icon: 'fa-receipt', textAr: 'إدارة حسابات المصروفات', textEn: 'Manage expense accounts' },
              { icon: 'fa-user-tie', textAr: 'إدارة الموظفين والصلاحيات', textEn: 'Manage employees and permissions' },
              { icon: 'fa-briefcase', textAr: 'إدارة الزبائن الدائمين', textEn: 'Manage permanent customers' },
              { icon: 'fa-mobile-alt', textAr: 'إدارة تطبيقات الحجز', textEn: 'Manage booking apps' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className={`fas ${item.icon} text-white`}></i>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  {language === 'ar' ? item.textAr : item.textEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
            {language === 'ar' ? 'الإحصائيات السريعة' : 'Quick Statistics'}
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{language === 'ar' ? 'معدل الإشغال' : 'Occupancy Rate'}</span>
                <span className="text-white text-2xl font-bold">64%</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{language === 'ar' ? 'الخدمات المدفوعة' : 'Paid Services'}</span>
                <span className="text-white text-2xl font-bold">8</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{language === 'ar' ? 'الخدمات المجانية' : 'Free Services'}</span>
                <span className="text-white text-2xl font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
