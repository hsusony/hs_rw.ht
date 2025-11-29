'use client'

import { useState } from 'react'

export default function HallsSection({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [editingHall, setEditingHall] = useState(null)
  const [halls, setHalls] = useState([
    { 
      id: 1, 
      nameAr: 'قاعة الأفراح الكبرى', 
      nameEn: 'Grand Wedding Hall', 
      capacity: 500,
      floor: 1,
      hourlyRate: 100000,
      dailyRate: 800000,
      monthlyRate: 18000000,
      status: 'available',
      amenities: ['ac', 'sound', 'lighting', 'stage']
    },
    { 
      id: 2, 
      nameAr: 'قاعة المؤتمرات', 
      nameEn: 'Conference Hall', 
      capacity: 200,
      floor: 2,
      hourlyRate: 75000,
      dailyRate: 600000,
      monthlyRate: 14000000,
      status: 'booked',
      amenities: ['ac', 'sound', 'projector', 'wifi']
    },
    { 
      id: 3, 
      nameAr: 'قاعة الاجتماعات', 
      nameEn: 'Meeting Hall', 
      capacity: 50,
      floor: 3,
      hourlyRate: 50000,
      dailyRate: 400000,
      monthlyRate: 10000000,
      status: 'available',
      amenities: ['ac', 'wifi', 'projector']
    }
  ])

  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    capacity: '',
    floor: '',
    hourlyRate: '',
    dailyRate: '',
    monthlyRate: '',
    status: 'available',
    amenities: []
  })

  const amenitiesOptions = [
    { id: 'ac', icon: 'fa-snowflake', labelAr: 'تكييف', labelEn: 'Air Conditioning' },
    { id: 'sound', icon: 'fa-volume-up', labelAr: 'نظام صوت', labelEn: 'Sound System' },
    { id: 'lighting', icon: 'fa-lightbulb', labelAr: 'إضاءة مميزة', labelEn: 'Special Lighting' },
    { id: 'stage', icon: 'fa-tv', labelAr: 'منصة', labelEn: 'Stage' },
    { id: 'projector', icon: 'fa-video', labelAr: 'بروجكتر', labelEn: 'Projector' },
    { id: 'wifi', icon: 'fa-wifi', labelAr: 'واي فاي', labelEn: 'WiFi' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingHall) {
      setHalls(halls.map(h => h.id === editingHall.id ? { ...formData, id: h.id } : h))
    } else {
      setHalls([...halls, { ...formData, id: Date.now() }])
    }
    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      capacity: '',
      floor: '',
      hourlyRate: '',
      dailyRate: '',
      monthlyRate: '',
      status: 'available',
      amenities: []
    })
    setEditingHall(null)
  }

  const handleEdit = (hall) => {
    setEditingHall(hall)
    setFormData(hall)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه القاعة؟' : 'Are you sure you want to delete this hall?')) {
      setHalls(halls.filter(h => h.id !== id))
    }
  }

  const toggleAmenity = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          {language === 'ar' ? 'إدارة القاعات' : 'Halls Management'}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة قاعة' : 'Add Hall'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div key={hall.id} className="bg-gradient-to-br from-white via-violet-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-violet-100 dark:border-gray-700 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {language === 'ar' ? hall.nameAr : hall.nameEn}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-building"></i>
                  <span>{language === 'ar' ? `الطابق ${hall.floor}` : `Floor ${hall.floor}`}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                hall.status === 'available' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
              }`}>
                {hall.status === 'available' 
                  ? (language === 'ar' ? 'متاحة' : 'Available')
                  : (language === 'ar' ? 'محجوزة' : 'Booked')
                }
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
                <i className="fas fa-users text-violet-600"></i>
                <span className="font-semibold">{language === 'ar' ? 'السعة:' : 'Capacity:'} {hall.capacity} {language === 'ar' ? 'شخص' : 'persons'}</span>
              </div>

              <div className="space-y-2 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i className="fas fa-clock text-xs"></i>
                    {language === 'ar' ? 'بالساعة' : 'Hourly'}
                  </span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{hall.hourlyRate.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i className="fas fa-calendar-day text-xs"></i>
                    {language === 'ar' ? 'يومي' : 'Daily'}
                  </span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{hall.dailyRate.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-xs"></i>
                    {language === 'ar' ? 'شهري' : 'Monthly'}
                  </span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{hall.monthlyRate.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">{language === 'ar' ? 'المرافق:' : 'Amenities:'}</p>
              <div className="flex flex-wrap gap-2">
                {hall.amenities.map(amenityId => {
                  const amenity = amenitiesOptions.find(a => a.id === amenityId)
                  return amenity ? (
                    <span key={amenityId} className="px-2 py-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-lg text-xs flex items-center gap-1">
                      <i className={`fas ${amenity.icon}`}></i>
                      {language === 'ar' ? amenity.labelAr : amenity.labelEn}
                    </span>
                  ) : null
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleEdit(hall)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
              >
                <i className="fas fa-edit mr-2"></i>
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </button>
              <button
                onClick={() => handleDelete(hall.id)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                <i className="fas fa-trash mr-2"></i>
                {language === 'ar' ? 'حذف' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-2xl font-bold text-white">
                {editingHall 
                  ? (language === 'ar' ? 'تعديل قاعة' : 'Edit Hall')
                  : (language === 'ar' ? 'إضافة قاعة جديدة' : 'Add New Hall')
                }
              </h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم القاعة (عربي)' : 'Hall Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr}
                    onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم القاعة (إنجليزي)' : 'Hall Name (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'السعة (عدد الأشخاص)' : 'Capacity (Persons)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الطابق' : 'Floor Number'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'سعر الساعة (د.ع)' : 'Hourly Rate (IQD)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'السعر اليومي (د.ع)' : 'Daily Rate (IQD)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.dailyRate}
                    onChange={(e) => setFormData({...formData, dailyRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'السعر الشهري (د.ع)' : 'Monthly Rate (IQD)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyRate}
                    onChange={(e) => setFormData({...formData, monthlyRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="available">{language === 'ar' ? 'متاحة' : 'Available'}</option>
                    <option value="booked">{language === 'ar' ? 'محجوزة' : 'Booked'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'المرافق المتاحة' : 'Available Amenities'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesOptions.map(amenity => (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        formData.amenities.includes(amenity.id)
                          ? 'border-violet-600 bg-violet-50 dark:bg-violet-900 text-violet-700 dark:text-violet-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:text-gray-300'
                      }`}
                    >
                      <i className={`fas ${amenity.icon}`}></i>
                      <span className="text-sm font-semibold">{language === 'ar' ? amenity.labelAr : amenity.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  {editingHall ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes') : (language === 'ar' ? 'إضافة' : 'Add')}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
