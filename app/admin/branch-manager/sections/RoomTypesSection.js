'use client'

import { useState } from 'react'

export default function RoomTypesSection({ language }) {
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, nameAr: 'غرفة فردية', nameEn: 'Single Room', capacity: 1, basePrice: 50000, description: 'غرفة فردية مريحة بسرير مفرد' },
    { id: 2, nameAr: 'غرفة مزدوجة', nameEn: 'Double Room', capacity: 2, basePrice: 85000, description: 'غرفة مزدوجة بسرير مزدوج' },
    { id: 3, nameAr: 'جناح عائلي', nameEn: 'Family Suite', capacity: 4, basePrice: 150000, description: 'جناح فسيح للعائلات' },
    { id: 4, nameAr: 'جناح ملكي', nameEn: 'Royal Suite', capacity: 2, basePrice: 300000, description: 'جناح فاخر بمرافق متكاملة' },
    { id: 5, nameAr: 'غرفة ثلاثية', nameEn: 'Triple Room', capacity: 3, basePrice: 120000, description: 'غرفة بثلاثة أسرة' },
    { id: 6, nameAr: 'جناح تنفيذي', nameEn: 'Executive Suite', capacity: 2, basePrice: 220000, description: 'جناح لرجال الأعمال' }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'أنواع الغرف' : 'Room Types'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-bed"></i>
            {language === 'ar' ? 'تصنيف وتسعير أنواع الغرف' : 'Classify and price room types'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة نوع' : 'Add Type'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roomTypes.map((type) => (
          <div key={type.id} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-indigo-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform inline-block">
                  {language === 'ar' ? type.nameAr : type.nameEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{type.description}</p>
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
            <div className="border-t-2 border-indigo-200 dark:border-gray-700 pt-4 mt-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                  <i className="fas fa-users text-indigo-500 text-lg"></i>
                  <span className="font-semibold">{type.capacity} {language === 'ar' ? 'أشخاص' : 'persons'}</span>
                </div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {type.basePrice.toLocaleString()}
                  <span className="text-sm ml-1">{language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-indigo-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-bed text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة نوع غرفة' : 'Add Room Type'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'اسم النوع (عربي)' : 'Type Name (Arabic)'} className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'اسم النوع (إنجليزي)' : 'Type Name (English)'} className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'السعة (عدد الأشخاص)' : 'Capacity (persons)'} className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'السعر الأساسي (د.ع)' : 'Base Price (IQD)'} className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <textarea placeholder={language === 'ar' ? 'الوصف' : 'Description'} rows="3" className="col-span-2 w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white"></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
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
