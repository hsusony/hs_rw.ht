'use client'

import { useState } from 'react'

export default function FreeServicesSection({ language }) {
  const [services, setServices] = useState([
    { id: 1, nameAr: 'إنترنت مجاني', nameEn: 'Free WiFi', category: 'internet', active: true },
    { id: 2, nameAr: 'إفطار مجاني', nameEn: 'Free Breakfast', category: 'food', active: true },
    { id: 3, nameAr: 'مواقف مجانية', nameEn: 'Free Parking', category: 'parking', active: true },
    { id: 4, nameAr: 'صالة رياضية', nameEn: 'Fitness Center', category: 'fitness', active: true },
    { id: 5, nameAr: 'مسبح', nameEn: 'Swimming Pool', category: 'pool', active: true },
    { id: 6, nameAr: 'مكتبة الفندق', nameEn: 'Hotel Library', category: 'other', active: true }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  const getCategoryColor = (category) => {
    switch(category) {
      case 'internet': return 'from-blue-500 to-cyan-500'
      case 'food': return 'from-orange-500 to-red-500'
      case 'parking': return 'from-gray-500 to-gray-600'
      case 'fitness': return 'from-green-500 to-teal-500'
      case 'pool': return 'from-blue-400 to-blue-600'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'الخدمات المجانية' : 'Free Services'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-gift"></i>
            {language === 'ar' ? 'خدمات مجانية مقدمة للنزلاء' : 'Free services provided to guests'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة خدمة مجانية' : 'Add Free Service'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-gradient-to-br from-green-50 via-teal-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:rotate-1 border-2 border-green-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-400 to-teal-400 opacity-10 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(service.category)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                <i className={`fas ${service.icon} text-3xl text-white`}></i>
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

            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2 relative z-10">
              {language === 'ar' ? service.nameAr : service.nameEn}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 relative z-10">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t-2 border-green-200 dark:border-gray-700 relative z-10">
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex items-center gap-2">
                <i className="fas fa-tag text-green-500"></i>
                {language === 'ar' ? 'مجاني' : 'FREE'}
              </span>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md backdrop-blur-sm ${service.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                {service.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-green-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-gift text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة خدمة مجانية' : 'Add Free Service'}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'اسم الخدمة (عربي)' : 'Service Name (Arabic)'} 
                className="w-full px-4 py-3 border-2 border-green-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              />
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'اسم الخدمة (إنجليزي)' : 'Service Name (English)'} 
                className="w-full px-4 py-3 border-2 border-green-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              />
              <select className="w-full px-4 py-3 border-2 border-green-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                <option value="">{language === 'ar' ? 'اختر الفئة' : 'Select Category'}</option>
                <option value="internet">{language === 'ar' ? 'إنترنت' : 'Internet'}</option>
                <option value="food">{language === 'ar' ? 'طعام' : 'Food'}</option>
                <option value="parking">{language === 'ar' ? 'موقف' : 'Parking'}</option>
                <option value="fitness">{language === 'ar' ? 'رياضة' : 'Fitness'}</option>
                <option value="pool">{language === 'ar' ? 'مسبح' : 'Pool'}</option>
              </select>
              <select className="w-full px-4 py-3 border-2 border-green-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                <option value="">{language === 'ar' ? 'اختر الأيقونة' : 'Select Icon'}</option>
                <option value="fa-wifi">WiFi</option>
                <option value="fa-utensils">Food</option>
                <option value="fa-parking">Parking</option>
                <option value="fa-dumbbell">Gym</option>
                <option value="fa-swimming-pool">Pool</option>
              </select>
              <textarea 
                placeholder={language === 'ar' ? 'الوصف' : 'Description'} 
                rows="3" 
                className="col-span-2 w-full px-4 py-3 border-2 border-green-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
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
