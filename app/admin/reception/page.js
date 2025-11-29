'use client'
import { useState, useEffect } from 'react'
import AddCustomer from './sections/AddCustomer'
import AddTourCompany from './sections/AddTourCompany'
import TempBooking from './sections/TempBooking'
import ConfirmedBooking from './sections/ConfirmedBooking'
import AddRoomToBooking from './sections/AddRoomToBooking'
import GroupBooking from './sections/GroupBooking'
import TransferGuest from './sections/TransferGuest'
import CreditBooking from './sections/CreditBooking'
import CancelBooking from './sections/CancelBooking'
import CheckOut from './sections/CheckOut'
import RoomMaintenance from './sections/RoomMaintenance'
import RoomCleaning from './sections/RoomCleaning'
import RoomUnavailable from './sections/RoomUnavailable'
import FloorUnavailable from './sections/FloorUnavailable'
import DoNotDisturb from './sections/DoNotDisturb'
import WakeUpCall from './sections/WakeUpCall'

export default function ReceptionDashboard() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('ar')
  const [activeTab, setActiveTab] = useState('overview')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDarkMode])

  const tabs = [
    { id: 'overview', nameAr: 'نظرة عامة', nameEn: 'Overview', icon: 'fa-chart-line' },
    { id: 'addCustomer', nameAr: 'إضافة زبون', nameEn: 'Add Customer', icon: 'fa-user-plus' },
    { id: 'addCompany', nameAr: 'شركات سياحية', nameEn: 'Tour Companies', icon: 'fa-building' },
    { id: 'tempBooking', nameAr: 'حجز مؤقت', nameEn: 'Temp Booking', icon: 'fa-clock' },
    { id: 'confirmedBooking', nameAr: 'حجز مؤكد', nameEn: 'Confirmed Booking', icon: 'fa-check-circle' },
    { id: 'addRoom', nameAr: 'إضافة غرفة للحجز', nameEn: 'Add Room', icon: 'fa-plus-square' },
    { id: 'groupBooking', nameAr: 'حجز كروبات', nameEn: 'Group Booking', icon: 'fa-users' },
    { id: 'transfer', nameAr: 'نقل نزيل', nameEn: 'Transfer Guest', icon: 'fa-exchange-alt' },
    { id: 'credit', nameAr: 'حجز أجل', nameEn: 'Credit Booking', icon: 'fa-credit-card' },
    { id: 'cancel', nameAr: 'إلغاء حجز', nameEn: 'Cancel Booking', icon: 'fa-times-circle' },
    { id: 'checkout', nameAr: 'مغادرة', nameEn: 'Check Out', icon: 'fa-sign-out-alt' },
    { id: 'maintenance', nameAr: 'صيانة غرفة', nameEn: 'Maintenance', icon: 'fa-tools' },
    { id: 'cleaning', nameAr: 'تنظيف غرفة', nameEn: 'Cleaning', icon: 'fa-broom' },
    { id: 'unavailable', nameAr: 'غرفة غير متاحة', nameEn: 'Unavailable', icon: 'fa-ban' },
    { id: 'floorOff', nameAr: 'طابق غير متاح', nameEn: 'Floor Off', icon: 'fa-building' },
    { id: 'dnd', nameAr: 'عدم إزعاج', nameEn: 'Do Not Disturb', icon: 'fa-door-closed' },
    { id: 'wakeup', nameAr: 'منبه غرفة', nameEn: 'Wake Up Call', icon: 'fa-bell' }
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 border-b-4 border-cyan-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-concierge-bell text-white text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'الريسبشن' : 'Reception'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'إدارة الحجوزات والنزلاء' : 'Manage Bookings & Guests'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 font-semibold transition-all"
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

                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-cyan-600"></i>
                  </div>
                  <span className="text-white font-semibold">
                    {language === 'ar' ? 'علي الريسبشن' : 'Ali Reception'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs - Scrollable */}
            <div className="mt-6 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <i className={`fas ${tab.icon} ml-2`}></i>
                    {language === 'ar' ? tab.nameAr : tab.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && <OverviewSection language={language} />}
          {activeTab === 'addCustomer' && <AddCustomer language={language} />}
          {activeTab === 'addCompany' && <AddTourCompany language={language} />}
          {activeTab === 'tempBooking' && <TempBooking language={language} />}
          {activeTab === 'confirmedBooking' && <ConfirmedBooking language={language} />}
          {activeTab === 'addRoom' && <AddRoomToBooking language={language} />}
          {activeTab === 'groupBooking' && <GroupBooking language={language} />}
          {activeTab === 'transfer' && <TransferGuest language={language} />}
          {activeTab === 'credit' && <CreditBooking language={language} />}
          {activeTab === 'cancel' && <CancelBooking language={language} />}
          {activeTab === 'checkout' && <CheckOut language={language} />}
          {activeTab === 'maintenance' && <RoomMaintenance language={language} />}
          {activeTab === 'cleaning' && <RoomCleaning language={language} />}
          {activeTab === 'unavailable' && <RoomUnavailable language={language} />}
          {activeTab === 'floorOff' && <FloorUnavailable language={language} />}
          {activeTab === 'dnd' && <DoNotDisturb language={language} />}
          {activeTab === 'wakeup' && <WakeUpCall language={language} />}
        </main>
      </div>
    </div>
  )
}

// Overview Section
function OverviewSection({ language }) {
  const stats = [
    {
      title: language === 'ar' ? 'الغرف المشغولة' : 'Occupied Rooms',
      value: '45/80',
      icon: 'fa-bed',
      color: 'from-green-500 to-emerald-500',
      percentage: '56%'
    },
    {
      title: language === 'ar' ? 'الحجوزات اليوم' : 'Today Bookings',
      value: '12',
      icon: 'fa-calendar-check',
      color: 'from-blue-500 to-cyan-500',
      change: '+3'
    },
    {
      title: language === 'ar' ? 'المغادرات المتوقعة' : 'Expected Checkouts',
      value: '8',
      icon: 'fa-sign-out-alt',
      color: 'from-orange-500 to-red-500',
      change: '2'
    },
    {
      title: language === 'ar' ? 'الوصول المتوقع' : 'Expected Arrivals',
      value: '15',
      icon: 'fa-user-plus',
      color: 'from-purple-500 to-pink-500',
      change: '+5'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'checkin', guest: 'حسين الجبوري', room: '301', time: '10:30 ص' },
    { id: 2, type: 'booking', guest: 'زينب الفرات', room: '215', time: '11:15 ص' },
    { id: 3, type: 'checkout', guest: 'محمد الحسيني', room: '408', time: '12:00 م' },
    { id: 4, type: 'transfer', guest: 'نور العمارة', room: '112 → 205', time: '01:30 م' },
    { id: 5, type: 'checkin', guest: 'أحمد الرفاعي', room: '505', time: '02:45 م' },
    { id: 6, type: 'booking', guest: 'فاطمة العباسي', room: '308', time: '03:20 م' },
    { id: 7, type: 'checkout', guest: 'عمر الكاظمي', room: '214', time: '04:10 م' },
    { id: 8, type: 'booking', guest: 'ليلى الحيدري', room: '412', time: '05:00 م' }
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
              {stat.percentage && (
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.percentage}
                </span>
              )}
              {stat.change && (
                <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <i className="fas fa-history text-cyan-600"></i>
          {language === 'ar' ? 'آخر الأنشطة' : 'Recent Activities'}
        </h3>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'checkin' ? 'bg-green-100 dark:bg-green-900 text-green-600' :
                  activity.type === 'checkout' ? 'bg-red-100 dark:bg-red-900 text-red-600' :
                  activity.type === 'booking' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' :
                  'bg-purple-100 dark:bg-purple-900 text-purple-600'
                }`}>
                  <i className={`fas ${
                    activity.type === 'checkin' ? 'fa-sign-in-alt' :
                    activity.type === 'checkout' ? 'fa-sign-out-alt' :
                    activity.type === 'booking' ? 'fa-calendar-check' :
                    'fa-exchange-alt'
                  }`}></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{activity.guest}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'غرفة' : 'Room'} {activity.room}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
