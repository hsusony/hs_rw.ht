'use client'

import { useState } from 'react'

export default function FloorsSection({ language }) {
  const [floors, setFloors] = useState([
    {
      id: 1,
      number: 1,
      nameAr: 'الطابق الأرضي',
      nameEn: 'Ground Floor',
      rooms: 15
    },
    {
      id: 2,
      number: 2,
      nameAr: 'الطابق الأول',
      nameEn: 'First Floor',
      rooms: 20
    },
    {
      id: 3,
      number: 3,
      nameAr: 'الطابق الثاني',
      nameEn: 'Second Floor',
      rooms: 20
    },
    {
      id: 4,
      number: 4,
      nameAr: 'الطابق الثالث',
      nameEn: 'Third Floor',
      rooms: 18
    },
    {
      id: 5,
      number: 5,
      nameAr: 'الطابق الرباعي - VIP',
      nameEn: 'Fourth Floor - VIP',
      rooms: 12
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedFloor, setSelectedFloor] = useState(null)
  const [formData, setFormData] = useState({
    number: '',
    nameAr: '',
    nameEn: '',
    rooms: ''
  })

  const handleEdit = (floor) => {
    setSelectedFloor(floor)
    setFormData({
      number: floor.number,
      nameAr: floor.nameAr,
      nameEn: floor.nameEn,
      rooms: floor.rooms
    })
    setShowEditModal(true)
  }

  const handleDelete = (floorId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الطابق؟' : 'Are you sure you want to delete this floor?')) {
      setFloors(floors.filter(f => f.id !== floorId))
    }
  }

  const handleSaveEdit = () => {
    setFloors(floors.map(f => 
      f.id === selectedFloor.id 
        ? { ...f, ...formData }
        : f
    ))
    setShowEditModal(false)
    setSelectedFloor(null)
    setFormData({ number: '', nameAr: '', nameEn: '', rooms: '' })
  }

  const handleAddFloor = () => {
    if (!formData.number || !formData.nameAr || !formData.nameEn || !formData.rooms) {
      alert(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    const newFloor = {
      id: floors.length > 0 ? Math.max(...floors.map(f => f.id)) + 1 : 1,
      number: parseInt(formData.number),
      nameAr: formData.nameAr,
      nameEn: formData.nameEn,
      rooms: parseInt(formData.rooms)
    }

    setFloors([...floors, newFloor])
    setShowAddModal(false)
    setFormData({ number: '', nameAr: '', nameEn: '', rooms: '' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الطوابق' : 'Floors Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-building"></i>
            {language === 'ar' ? 'تنظيم طوابق الفندق' : 'Organize hotel floors'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة طابق' : 'Add Floor'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {floors.map((floor) => (
          <div key={floor.id} className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:rotate-1 border-2 border-green-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-400 opacity-20 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <span className="text-4xl font-extrabold text-white drop-shadow-lg">{floor.number}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(floor)}
                  className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(floor.id)}
                  className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-3 relative z-10">
              {language === 'ar' ? floor.nameAr : floor.nameEn}
            </h3>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md relative z-10">
              <i className="fas fa-door-open text-green-500 text-lg"></i>
              <span className="font-semibold">{floor.rooms} {language === 'ar' ? 'غرفة' : 'rooms'}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة طابق جديد' : 'Add New Floor'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'رقم الطابق' : 'Floor Number'}
                </label>
                <input 
                  type="number" 
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  placeholder={language === 'ar' ? 'رقم الطابق' : 'Floor Number'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الطابق (عربي)' : 'Floor Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الطابق (عربي)' : 'Floor Name (Arabic)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الطابق (إنجليزي)' : 'Floor Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الطابق (إنجليزي)' : 'Floor Name (English)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                </label>
                <input 
                  type="number" 
                  value={formData.rooms}
                  onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                  placeholder={language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowAddModal(false)
                  setFormData({ number: '', nameAr: '', nameEn: '', rooms: '' })
                }} 
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleAddFloor}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedFloor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border-2 border-green-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل الطابق' : 'Edit Floor'}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'رقم الطابق' : 'Floor Number'}
                </label>
                <input 
                  type="number" 
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الطابق (عربي)' : 'Floor Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الطابق (إنجليزي)' : 'Floor Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                </label>
                <input 
                  type="number" 
                  value={formData.rooms}
                  onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedFloor(null)
                  setFormData({ number: '', nameAr: '', nameEn: '', rooms: '' })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
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
