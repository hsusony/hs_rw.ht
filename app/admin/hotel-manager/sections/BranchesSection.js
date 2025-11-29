'use client'

import { useState } from 'react'

export default function BranchesSection({ language }) {
  const [branches, setBranches] = useState([
    {
      id: 1,
      nameAr: 'فرع بغداد المركزي',
      nameEn: 'Central Baghdad Branch',
      location: 'شارع أبو نواس - بغداد',
      manager: 'أحمد محمد الحسيني',
      phone: '07701234567',
      rooms: 85
    },
    {
      id: 2,
      nameAr: 'فرع البصرة',
      nameEn: 'Basra Branch',
      location: 'شارع الكورنيش - البصرة',
      manager: 'علي حسين البصري',
      phone: '07712345678',
      rooms: 60
    },
    {
      id: 3,
      nameAr: 'فرع النجف',
      nameEn: 'Najaf Branch',
      location: 'شارع الرسول - النجف',
      manager: 'محمد علي النجفي',
      phone: '07723456789',
      rooms: 45
    },
    {
      id: 4,
      nameAr: 'فرع أربيل',
      nameEn: 'Erbil Branch',
      location: 'منطقة أنكاوا - أربيل',
      manager: 'كريم أحمد الكردي',
      phone: '07734567890',
      rooms: 70
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    location: '',
    manager: '',
    phone: '',
    rooms: ''
  })

  const handleEdit = (branch) => {
    setSelectedBranch(branch)
    setFormData({
      nameAr: branch.nameAr,
      nameEn: branch.nameEn,
      location: branch.location,
      manager: branch.manager,
      phone: branch.phone,
      rooms: branch.rooms
    })
    setShowEditModal(true)
  }

  const handleDelete = (branchId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الفرع؟' : 'Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(b => b.id !== branchId))
    }
  }

  const handleSaveEdit = () => {
    setBranches(branches.map(b => 
      b.id === selectedBranch.id 
        ? { ...b, ...formData, rooms: parseInt(formData.rooms) }
        : b
    ))
    setShowEditModal(false)
    setSelectedBranch(null)
    setFormData({ nameAr: '', nameEn: '', location: '', manager: '', phone: '', rooms: '' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الفروع' : 'Branches Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-info-circle"></i>
            {language === 'ar' ? 'إضافة وإدارة فروع الفندق' : 'Add and manage hotel branches'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة فرع' : 'Add Branch'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i className="fas fa-code-branch text-white text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform inline-block">
                    {language === 'ar' ? branch.nameAr : branch.nameEn}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                      <i className="fas fa-map-marker-alt text-red-500 text-lg"></i>
                      <span className="font-semibold">{branch.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                      <i className="fas fa-user-tie text-purple-500 text-lg"></i>
                      <span className="font-semibold">{branch.manager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                      <i className="fas fa-phone text-green-500 text-lg"></i>
                      <span className="font-semibold">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                      <i className="fas fa-bed text-blue-500 text-lg"></i>
                      <span className="font-semibold">{branch.rooms} {language === 'ar' ? 'غرفة' : 'rooms'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleEdit(branch)}
                  className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <i className="fas fa-edit"></i>
                  <span className="hidden md:inline">{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                </button>
                <button 
                  onClick={() => handleDelete(branch.id)}
                  className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <i className="fas fa-trash"></i>
                  <span className="hidden md:inline">{language === 'ar' ? 'حذف' : 'Delete'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-blue-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-plus text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة فرع جديد' : 'Add New Branch'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'اسم الفرع (عربي)' : 'Branch Name (Arabic)'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'اسم الفرع (إنجليزي)' : 'Branch Name (English)'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'الموقع' : 'Location'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'المدير' : 'Manager'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBranch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-blue-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل الفرع' : 'Edit Branch'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الفرع (عربي)' : 'Branch Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الفرع (إنجليزي)' : 'Branch Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الموقع' : 'Location'}
                </label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'المدير' : 'Manager'}
                </label>
                <input 
                  type="text" 
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedBranch(null)
                  setFormData({ nameAr: '', nameEn: '', location: '', manager: '', phone: '', rooms: '' })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
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
