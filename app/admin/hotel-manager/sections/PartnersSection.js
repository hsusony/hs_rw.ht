'use client'

import { useState } from 'react'

export default function PartnersSection({ language }) {
  const [partners, setPartners] = useState([
    {
      id: 1,
      nameAr: 'شركة السياحة الذهبية',
      nameEn: 'Golden Tourism Company',
      contactPerson: 'أحمد محمد',
      phone: '07701234567',
      commission: 10
    },
    {
      id: 2,
      nameAr: 'مكتب الرحلات العالمية',
      nameEn: 'International Travels Office',
      contactPerson: 'فاطمة علي',
      phone: '07712345678',
      commission: 12
    },
    {
      id: 3,
      nameAr: 'وكالة الأفق للسفر',
      nameEn: 'Horizon Travel Agency',
      contactPerson: 'محمود حسن',
      phone: '07723456789',
      commission: 8
    },
    {
      id: 4,
      nameAr: 'شركة النجوم السبعة',
      nameEn: 'Seven Stars Company',
      contactPerson: 'سارة يوسف',
      phone: '07734567890',
      commission: 15
    },
    {
      id: 5,
      nameAr: 'مجموعة الرحلات المميزة',
      nameEn: 'Premium Tours Group',
      contactPerson: 'عمر خالد',
      phone: '07745678901',
      commission: 11
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    contactPerson: '',
    phone: '',
    commission: ''
  })

  const handleEdit = (partner) => {
    setSelectedPartner(partner)
    setFormData({
      nameAr: partner.nameAr,
      nameEn: partner.nameEn,
      contactPerson: partner.contactPerson,
      phone: partner.phone,
      commission: partner.commission
    })
    setShowEditModal(true)
  }

  const handleDelete = (partnerId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الشريك؟' : 'Are you sure you want to delete this partner?')) {
      setPartners(partners.filter(p => p.id !== partnerId))
    }
  }

  const handleSaveEdit = () => {
    setPartners(partners.map(p => 
      p.id === selectedPartner.id 
        ? { ...p, ...formData, commission: parseFloat(formData.commission) }
        : p
    ))
    setShowEditModal(false)
    setSelectedPartner(null)
    setFormData({ nameAr: '', nameEn: '', contactPerson: '', phone: '', commission: '' })
  }

  const handleAddPartner = () => {
    if (!formData.nameAr || !formData.nameEn || !formData.contactPerson || !formData.phone || !formData.commission) {
      alert(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    const newPartner = {
      id: partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1,
      nameAr: formData.nameAr,
      nameEn: formData.nameEn,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      commission: parseFloat(formData.commission)
    }

    setPartners([...partners, newPartner])
    setShowAddModal(false)
    setFormData({ nameAr: '', nameEn: '', contactPerson: '', phone: '', commission: '' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الشركاء' : 'Partners Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-handshake"></i>
            {language === 'ar' ? 'إدارة شركاء وشراكات الفندق' : 'Manage hotel partners and partnerships'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة شريك' : 'Add Partner'}
        </button>
      </div>

      <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'اسم الشريك' : 'Partner Name'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'جهة الاتصال' : 'Contact Person'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الهاتف' : 'Phone'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'العمولة %' : 'Commission %'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                  {language === 'ar' ? partner.nameAr : partner.nameEn}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{partner.contactPerson}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{partner.phone}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{partner.commission}%</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(partner)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(partner.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة شريك جديد' : 'Add New Partner'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشريك (عربي)' : 'Partner Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الشريك (عربي)' : 'Partner Name (Arabic)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشريك (إنجليزي)' : 'Partner Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الشريك (إنجليزي)' : 'Partner Name (English)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'جهة الاتصال' : 'Contact Person'}
                </label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder={language === 'ar' ? 'جهة الاتصال' : 'Contact Person'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={language === 'ar' ? 'الهاتف' : 'Phone'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'نسبة العمولة %' : 'Commission %'}
                </label>
                <input 
                  type="number" 
                  value={formData.commission}
                  onChange={(e) => setFormData({...formData, commission: e.target.value})}
                  placeholder={language === 'ar' ? 'نسبة العمولة %' : 'Commission %'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowAddModal(false)
                  setFormData({ nameAr: '', nameEn: '', contactPerson: '', phone: '', commission: '' })
                }} 
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleAddPartner}
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
      {showEditModal && selectedPartner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-purple-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل الشريك' : 'Edit Partner'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشريك (عربي)' : 'Partner Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشريك (إنجليزي)' : 'Partner Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'جهة الاتصال' : 'Contact Person'}
                </label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'نسبة العمولة %' : 'Commission %'}
                </label>
                <input 
                  type="number" 
                  value={formData.commission}
                  onChange={(e) => setFormData({...formData, commission: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedPartner(null)
                  setFormData({ nameAr: '', nameEn: '', contactPerson: '', phone: '', commission: '' })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
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
