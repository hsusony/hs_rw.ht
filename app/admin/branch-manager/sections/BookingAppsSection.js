'use client'

import { useState } from 'react'

export default function BookingAppsSection({ language }) {
  const [apps, setApps] = useState([
    { 
      id: 1, 
      nameAr: 'بوكينج دوت كوم', 
      nameEn: 'Booking.com', 
      logo: '🅱️',
      commissionPercent: 15,
      apiKey: 'BKG-2024-XXX-123',
      status: 'active',
      totalBookings: 156,
      monthlyFee: 0
    },
    { 
      id: 2, 
      nameAr: 'إكسبيديا', 
      nameEn: 'Expedia', 
      logo: '🅴',
      commissionPercent: 18,
      apiKey: 'EXP-2024-YYY-456',
      status: 'active',
      totalBookings: 89,
      monthlyFee: 0
    },
    { 
      id: 3, 
      nameAr: 'أجودا', 
      nameEn: 'Agoda', 
      logo: '🅰️',
      commissionPercent: 12,
      apiKey: 'AGD-2024-ZZZ-789',
      status: 'active',
      totalBookings: 67,
      monthlyFee: 0
    },
    { 
      id: 4, 
      nameAr: 'ترافيل سيتي', 
      nameEn: 'Travel City', 
      logo: '🏨',
      commissionPercent: 10,
      apiKey: '',
      status: 'inactive',
      totalBookings: 0,
      monthlyFee: 50000
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showApiModal, setShowApiModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'اشتراك تطبيقات الحجز' : 'Booking Apps Subscription'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-mobile-alt"></i>
            {language === 'ar' ? 'الربط مع منصات الحجز العالمية' : 'Connect with global booking platforms'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة تطبيق' : 'Add App'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div key={app.id} className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-2 border-blue-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {app.logo}
              </div>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md backdrop-blur-sm ${app.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                {app.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
              </span>
            </div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 relative z-10">
              {language === 'ar' ? app.nameAr : app.nameEn}
            </h3>

            <div className="space-y-3 mb-4 relative z-10">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <span className="text-sm text-white font-bold">{language === 'ar' ? 'العمولة:' : 'Commission:'}</span>
                <span className="font-extrabold text-white text-lg">{app.commissionPercent}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <span className="text-sm text-white font-bold">{language === 'ar' ? 'الحجوزات:' : 'Bookings:'}</span>
                <span className="font-extrabold text-white text-lg">{app.totalBookings}</span>
              </div>

              {app.monthlyFee > 0 && (
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <span className="text-sm text-white font-bold">{language === 'ar' ? 'اشتراك شهري:' : 'Monthly Fee:'}</span>
                  <span className="font-extrabold text-white text-lg">{app.monthlyFee.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
              )}

              {app.apiKey && (
                <div className="p-3 bg-white/70 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm">
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-bold block mb-2 uppercase tracking-wide">{language === 'ar' ? 'مفتاح API:' : 'API Key:'}</span>
                  <code className="text-xs font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{app.apiKey}</code>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t-2 border-blue-200 dark:border-gray-700 relative z-10">
              <button 
                onClick={() => {
                  setSelectedApp(app)
                  setShowApiModal(true)
                }}
                className="flex-1 px-3 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold"
              >
                <i className="fas fa-key"></i> API
              </button>
              <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold">
                <i className="fas fa-edit"></i>
              </button>
              <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-bold">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة تطبيق حجز' : 'Add Booking App'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'اسم التطبيق (عربي)' : 'App Name (Arabic)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'اسم التطبيق (إنجليزي)' : 'App Name (English)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="number" step="0.1" placeholder={language === 'ar' ? 'نسبة العمولة %' : 'Commission %'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'الاشتراك الشهري' : 'Monthly Fee'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'مفتاح API' : 'API Key'} className="col-span-2 w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="url" placeholder={language === 'ar' ? 'رابط API' : 'API URL'} className="col-span-2 w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showApiModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إعدادات API - ' : 'API Settings - '}
              {language === 'ar' ? selectedApp.nameAr : selectedApp.nameEn}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'مفتاح API:' : 'API Key:'}
                </label>
                <input type="text" value={selectedApp.apiKey} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رابط API:' : 'API URL:'}
                </label>
                <input type="url" placeholder="https://api.example.com" className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                <i className="fas fa-sync-alt ml-2"></i>
                {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => {setShowApiModal(false); setSelectedApp(null)}} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
