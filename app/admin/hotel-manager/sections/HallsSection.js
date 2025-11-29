'use client'

import { useState } from 'react'

export default function HallsSection({ language }) {
  const [halls, setHalls] = useState([
    {
      id: 1,
      nameAr: 'قاعة الزفاف الملكية',
      nameEn: 'Royal Wedding Hall',
      capacity: 500,
      floor: 2,
      pricePerHour: 500000,
      equipment: ['مسرح', 'إضاءة LED', 'صوت محيطي'],
      status: 'available'
    },
    {
      id: 2,
      nameAr: 'قاعة المؤتمرات الكبرى',
      nameEn: 'Grand Conference Hall',
      capacity: 300,
      floor: 3,
      pricePerHour: 350000,
      equipment: ['بروجكتر', 'مايكروفون', 'انترنت'],
      status: 'booked'
    },
    {
      id: 3,
      nameAr: 'قاعة الاجتماعات',
      nameEn: 'Meeting Room',
      capacity: 50,
      floor: 1,
      pricePerHour: 100000,
      equipment: ['شاشة عرض', 'سبورة', 'WiFi'],
      status: 'available'
    },
    {
      id: 4,
      nameAr: 'قاعة العرس الصغيرة',
      nameEn: 'Small Party Hall',
      capacity: 150,
      floor: 1,
      pricePerHour: 200000,
      equipment: ['ديجي', 'إضاءة ملونة', 'صوت'],
      status: 'available'
    },
    {
      id: 5,
      nameAr: 'قاعة المناسبات الخاصة',
      nameEn: 'VIP Events Hall',
      capacity: 100,
      floor: 3,
      pricePerHour: 400000,
      equipment: ['تصميم خاص', 'خدمة VIP', 'كاميرات'],
      status: 'booked'
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedHall, setSelectedHall] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    capacity: '',
    floor: '',
    pricePerHour: '',
    equipment: '',
    status: 'available'
  })

  const handleEdit = (hall) => {
    setSelectedHall(hall)
    setFormData({
      nameAr: hall.nameAr,
      nameEn: hall.nameEn,
      capacity: hall.capacity,
      floor: hall.floor,
      pricePerHour: hall.pricePerHour,
      equipment: hall.equipment.join(', '),
      status: hall.status
    })
    setShowEditModal(true)
  }

  const handleDelete = (hallId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه القاعة؟' : 'Are you sure you want to delete this hall?')) {
      setHalls(halls.filter(h => h.id !== hallId))
    }
  }

  const handleSaveEdit = () => {
    setHalls(halls.map(h => 
      h.id === selectedHall.id 
        ? { 
            ...h, 
            nameAr: formData.nameAr,
            nameEn: formData.nameEn,
            capacity: parseInt(formData.capacity),
            floor: parseInt(formData.floor),
            pricePerHour: parseInt(formData.pricePerHour),
            equipment: formData.equipment.split(',').map(e => e.trim()),
            status: formData.status
          }
        : h
    ))
    setShowEditModal(false)
    setSelectedHall(null)
    setFormData({ nameAr: '', nameEn: '', capacity: '', floor: '', pricePerHour: '', equipment: '', status: 'available' })
  }

  const handleAddHall = () => {
    if (!formData.nameAr || !formData.nameEn || !formData.capacity || !formData.floor || !formData.pricePerHour || !formData.equipment) {
      alert(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    const newHall = {
      id: Math.max(...halls.map(h => h.id)) + 1,
      nameAr: formData.nameAr,
      nameEn: formData.nameEn,
      capacity: parseInt(formData.capacity),
      floor: parseInt(formData.floor),
      pricePerHour: parseInt(formData.pricePerHour),
      equipment: formData.equipment.split(',').map(e => e.trim()),
      status: formData.status
    }

    setHalls([...halls, newHall])
    setShowAddModal(false)
    setFormData({ nameAr: '', nameEn: '', capacity: '', floor: '', pricePerHour: '', equipment: '', status: 'available' })
  }

  const getStatusColor = (status) => {
    return status === 'available' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة القاعات' : 'Halls Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-users"></i>
            {language === 'ar' ? 'قاعات المؤتمرات والفعاليات' : 'Conference and event halls'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة قاعة' : 'Add Hall'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div key={hall.id} className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-violet-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-violet-400 to-purple-400 opacity-10 rounded-full -mr-20 -mb-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <i className="fas fa-hotel text-3xl text-white"></i>
              </div>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md backdrop-blur-sm ${getStatusColor(hall.status)}`}>
                {hall.status === 'available' ? (language === 'ar' ? 'متاحة' : 'Available') : (language === 'ar' ? 'محجوزة' : 'Booked')}
              </span>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4 relative z-10">
              {language === 'ar' ? hall.nameAr : hall.nameEn}
            </h3>
            <div className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 mb-4 relative z-10">
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-users text-violet-500"></i>
                <span className="font-semibold">{hall.capacity} {language === 'ar' ? 'شخص' : 'persons'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-layer-group text-purple-500"></i>
                <span className="font-semibold">{language === 'ar' ? 'الطابق' : 'Floor'} {hall.floor}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-tools text-pink-500"></i>
                <span className="font-semibold text-xs">{hall.equipment.join(' • ')}</span>
              </div>
            </div>
            <div className="border-t-2 border-violet-200 dark:border-gray-700 pt-4 relative z-10">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {hall.pricePerHour.toLocaleString()}
                <span className="text-sm ml-1">{language === 'ar' ? 'د.ع/ساعة' : 'IQD/hour'}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(hall)}
                  className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(hall.id)}
                  className="flex-1 px-3 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة قاعة جديدة' : 'Add New Hall'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم القاعة (عربي)' : 'Hall Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم القاعة (عربي)' : 'Hall Name (Arabic)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم القاعة (إنجليزي)' : 'Hall Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم القاعة (إنجليزي)' : 'Hall Name (English)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'السعة' : 'Capacity'}
                </label>
                <input 
                  type="number" 
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  placeholder={language === 'ar' ? 'السعة' : 'Capacity'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'السعر لكل ساعة' : 'Price per Hour'}
                </label>
                <input 
                  type="number" 
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                  placeholder={language === 'ar' ? 'السعر لكل ساعة' : 'Price per Hour'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الطابق' : 'Floor'}
                </label>
                <select 
                  value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{language === 'ar' ? 'الطابق' : 'Floor'}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'المعدات (افصل بفاصلة)' : 'Equipment (comma separated)'}
                </label>
                <input 
                  type="text" 
                  value={formData.equipment}
                  onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                  placeholder={language === 'ar' ? 'المعدات (افصل بفاصلة)' : 'Equipment (comma separated)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button onClick={handleAddHall} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedHall && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-violet-200 dark:border-gray-700 transform animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل القاعة' : 'Edit Hall'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم القاعة (عربي)' : 'Hall Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم القاعة (إنجليزي)' : 'Hall Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'السعة' : 'Capacity'}
                </label>
                <input 
                  type="number" 
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الطابق' : 'Floor'}
                </label>
                <select 
                  value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'السعر لكل ساعة' : 'Price per Hour'}
                </label>
                <input 
                  type="number" 
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'المعدات (افصل بفاصلة)' : 'Equipment (comma separated)'}
                </label>
                <input 
                  type="text" 
                  value={formData.equipment}
                  onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500" 
                  placeholder="مسرح, إضاءة, صوت"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500"
                >
                  <option value="available">{language === 'ar' ? 'متاحة' : 'Available'}</option>
                  <option value="booked">{language === 'ar' ? 'محجوزة' : 'Booked'}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedHall(null)
                  setFormData({ nameAr: '', nameEn: '', capacity: '', floor: '', pricePerHour: '', equipment: '', status: 'available' })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
              >
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
