'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CustomerAccountPage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Mock data
  const customerInfo = {
    name: 'أحمد محمد علي',
    email: 'ahmad@example.com',
    phone: '+964 770 123 4567',
    memberSince: '2023-05-15'
  }

  const currentBookings = [
    {
      id: 1,
      hotel: 'فندق بغداد الملكي',
      hotelEn: 'Baghdad Royal Hotel',
      room: 'جناح',
      roomEn: 'Suite',
      checkIn: '2024-11-25',
      checkOut: '2024-11-28',
      nights: 3,
      total: 1200000,
      status: 'confirmed'
    },
    {
      id: 2,
      hotel: 'فندق أربيل الكبير',
      hotelEn: 'Erbil Grand Hotel',
      room: 'غرفة مزدوجة',
      roomEn: 'Double Room',
      checkIn: '2024-12-10',
      checkOut: '2024-12-15',
      nights: 5,
      total: 1500000,
      status: 'pending'
    }
  ]

  const pastBookings = [
    {
      id: 3,
      hotel: 'فندق البصرة الدولي',
      hotelEn: 'Basra International Hotel',
      room: 'غرفة مزدوجة',
      roomEn: 'Double Room',
      checkIn: '2024-10-01',
      checkOut: '2024-10-05',
      nights: 4,
      total: 600000,
      status: 'completed',
      rated: false
    }
  ]

  const serviceRequests = [
    {
      id: 1,
      type: 'طلب طعام',
      typeEn: 'Food Order',
      hotel: 'فندق بغداد الملكي',
      date: '2024-11-20',
      status: 'delivered',
      total: 75000
    },
    {
      id: 2,
      type: 'طلب تنظيف',
      typeEn: 'Cleaning Request',
      hotel: 'فندق بغداد الملكي',
      date: '2024-11-18',
      status: 'completed',
      total: 0
    },
    {
      id: 3,
      type: 'شكوى',
      typeEn: 'Complaint',
      hotel: 'فندق البصرة الدولي',
      date: '2024-10-03',
      status: 'resolved',
      total: 0
    }
  ]

  const getStatusBadge = (status) => {
    const statuses = {
      confirmed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300', label: language === 'ar' ? 'مؤكد' : 'Confirmed' },
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300', label: language === 'ar' ? 'قيد المعالجة' : 'Pending' },
      completed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300', label: language === 'ar' ? 'مكتمل' : 'Completed' },
      delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300', label: language === 'ar' ? 'تم التوصيل' : 'Delivered' },
      resolved: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300', label: language === 'ar' ? 'تم الحل' : 'Resolved' }
    }
    const s = statuses[status]
    return <span className={`${s.bg} ${s.text} px-3 py-1 rounded-full text-sm font-bold`}>{s.label}</span>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/customer/hotels')}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-3xl font-black text-white">
                {language === 'ar' ? 'حسابي' : 'My Account'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black">
                {customerInfo.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  {customerInfo.name}
                </h2>
                <div className="space-y-1 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{customerInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{customerInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{language === 'ar' ? 'عضو منذ' : 'Member since'} {customerInfo.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
              {language === 'ar' ? 'تعديل الحساب' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: 'bookings', label: language === 'ar' ? 'حجوزاتي' : 'My Bookings', icon: '🏨' },
                { id: 'history', label: language === 'ar' ? 'السجل' : 'History', icon: '📜' },
                { id: 'services', label: language === 'ar' ? 'الخدمات' : 'Services', icon: '🛎️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-bold whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Current Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'الحجوزات الحالية' : 'Current Bookings'}
                </h3>
                {currentBookings.map(booking => (
                  <div key={booking.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-4 border-indigo-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                          {language === 'ar' ? booking.hotel : booking.hotelEn}
                        </h4>
                        <div className="text-gray-600 dark:text-gray-400 font-semibold">
                          {language === 'ar' ? booking.room : booking.roomEn}
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'تاريخ الوصول' : 'Check-in'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{booking.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'تاريخ المغادرة' : 'Check-out'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{booking.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'عدد الليالي' : 'Nights'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{booking.nights}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-black text-indigo-600">
                        {booking.total.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
                          {language === 'ar' ? 'طلب خدمة' : 'Request Service'}
                        </button>
                        <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
                          {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'الحجوزات السابقة' : 'Past Bookings'}
                </h3>
                {pastBookings.map(booking => (
                  <div key={booking.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                          {language === 'ar' ? booking.hotel : booking.hotelEn}
                        </h4>
                        <div className="text-gray-600 dark:text-gray-400 font-semibold">
                          {language === 'ar' ? booking.room : booking.roomEn}
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'تاريخ الوصول' : 'Check-in'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{booking.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'تاريخ المغادرة' : 'Check-out'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{booking.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'المبلغ' : 'Total'}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {booking.total.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </div>
                      </div>
                    </div>

                    {!booking.rated && (
                      <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                        {language === 'ar' ? '⭐ قيم تجربتك' : '⭐ Rate Your Stay'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {language === 'ar' ? 'طلبات الخدمة' : 'Service Requests'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push('/customer/services/room-service')}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                    >
                      🍽️ {language === 'ar' ? 'طلب طعام' : 'Order Food'}
                    </button>
                    <button
                      onClick={() => router.push('/customer/services/cleaning')}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                    >
                      🧹 {language === 'ar' ? 'طلب تنظيف' : 'Cleaning'}
                    </button>
                    <button
                      onClick={() => router.push('/customer/services/complaint')}
                      className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                    >
                      📝 {language === 'ar' ? 'شكوى' : 'Complaint'}
                    </button>
                  </div>
                </div>

                {serviceRequests.map(request => (
                  <div key={request.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-black text-gray-900 dark:text-white">
                            {language === 'ar' ? request.type : request.typeEn}
                          </h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 space-y-1">
                          <div>{request.hotel}</div>
                          <div className="text-sm">{request.date}</div>
                        </div>
                      </div>
                      {request.total > 0 && (
                        <div className="text-xl font-black text-gray-900 dark:text-white">
                          {request.total.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
