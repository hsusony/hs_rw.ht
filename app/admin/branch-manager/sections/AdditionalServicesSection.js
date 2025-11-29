'use client'

import { useState } from 'react'

export default function AdditionalServicesSection({ language }) {
  const [services, setServices] = useState([
    { id: 1, nameAr: 'خدمة الغرف', nameEn: 'Room Service', price: 15000, category: 'food', active: true },
    { id: 2, nameAr: 'غسيل وكي', nameEn: 'Laundry Service', price: 20000, category: 'laundry', active: true },
    { id: 3, nameAr: 'ميني بار', nameEn: 'Mini Bar', price: 50000, category: 'minibar', active: true },
    { id: 4, nameAr: 'نقل من/إلى المطار', nameEn: 'Airport Transfer', price: 75000, category: 'transport', active: true },
    { id: 5, nameAr: 'جلسة مساج', nameEn: 'Massage Session', price: 100000, category: 'wellness', active: true },
    { id: 6, nameAr: 'إفطار في الغرفة', nameEn: 'Breakfast in Room', price: 35000, category: 'food', active: true },
    { id: 7, nameAr: 'استئجار سيارة', nameEn: 'Car Rental', price: 150000, category: 'transport', active: true },
    { id: 8, nameAr: 'جلسة سبا', nameEn: 'Spa Session', price: 120000, category: 'wellness', active: true }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'food': return 'fa-utensils'
      case 'laundry': return 'fa-shirt'
      case 'minibar': return 'fa-wine-bottle'
      case 'transport': return 'fa-car'
      case 'wellness': return 'fa-spa'
      default: return 'fa-concierge-bell'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'food': return 'from-orange-500 to-red-500'
      case 'laundry': return 'from-blue-500 to-cyan-500'
      case 'minibar': return 'from-purple-500 to-pink-500'
      case 'transport': return 'from-green-500 to-teal-500'
      case 'wellness': return 'from-pink-500 to-rose-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'الخدمات المدفوعة' : 'Paid Services'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-dollar-sign"></i>
            {language === 'ar' ? 'خدمات إضافية مدفوعة على الحجز' : 'Paid additional services on booking'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة خدمة' : 'Add Service'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-gradient-to-br from-pink-50 via-rose-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:rotate-1 border-2 border-pink-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-400 opacity-10 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(service.category)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                <i className={`fas ${getCategoryIcon(service.category)} text-3xl text-white`}></i>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 relative z-10">
              {language === 'ar' ? service.nameAr : service.nameEn}
            </h3>
            <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-pink-200 dark:border-gray-700 relative z-10">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {service.price.toLocaleString()}
                <span className="text-sm ml-1">{language === 'ar' ? 'د.ع' : 'IQD'}</span>
              </div>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md backdrop-blur-sm ${service.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                {service.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-pink-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-dollar-sign text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة خدمة مدفوعة' : 'Add Paid Service'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'اسم الخدمة (عربي)' : 'Service Name (Arabic)'} className="w-full px-4 py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'اسم الخدمة (إنجليزي)' : 'Service Name (English)'} className="w-full px-4 py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'السعر (د.ع)' : 'Price (IQD)'} className="w-full px-4 py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <select className="w-full px-4 py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white">
                <option value="">{language === 'ar' ? 'اختر الفئة' : 'Select Category'}</option>
                <option value="food">{language === 'ar' ? 'طعام' : 'Food'}</option>
                <option value="laundry">{language === 'ar' ? 'غسيل' : 'Laundry'}</option>
                <option value="minibar">{language === 'ar' ? 'مينيبار' : 'Minibar'}</option>
                <option value="transport">{language === 'ar' ? 'مواصلات' : 'Transport'}</option>
                <option value="wellness">{language === 'ar' ? 'عناية' : 'Wellness'}</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
