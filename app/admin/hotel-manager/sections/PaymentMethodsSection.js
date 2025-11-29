'use client'

import { useState } from 'react'

export default function PaymentMethodsSection({ language }) {
  const [methods, setMethods] = useState([
    {
      id: 1,
      nameAr: 'نقدي',
      nameEn: 'Cash',
      icon: 'fa-money-bill-wave',
      feePercent: 0,
      active: true
    },
    {
      id: 2,
      nameAr: 'بطاقة فيزا',
      nameEn: 'Visa Card',
      icon: 'fa-credit-card',
      feePercent: 2.5,
      active: true
    },
    {
      id: 3,
      nameAr: 'بطاقة ماستركارد',
      nameEn: 'Mastercard',
      icon: 'fa-credit-card',
      feePercent: 2.5,
      active: true
    },
    {
      id: 4,
      nameAr: 'تحويل بنكي',
      nameEn: 'Bank Transfer',
      icon: 'fa-university',
      feePercent: 0,
      active: true
    },
    {
      id: 5,
      nameAr: 'زين كاش',
      nameEn: 'Zain Cash',
      icon: 'fa-wallet',
      feePercent: 1,
      active: true
    },
    {
      id: 6,
      nameAr: 'آسيا هول',
      nameEn: 'Asia Hawala',
      icon: 'fa-wallet',
      feePercent: 1.5,
      active: true
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    icon: 'fa-money-bill-wave',
    feePercent: '',
    active: true
  })

  const handleEdit = (method) => {
    setSelectedMethod(method)
    setFormData({
      nameAr: method.nameAr,
      nameEn: method.nameEn,
      icon: method.icon,
      feePercent: method.feePercent,
      active: method.active
    })
    setShowEditModal(true)
  }

  const handleDelete = (methodId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الوسيلة؟' : 'Are you sure you want to delete this payment method?')) {
      setMethods(methods.filter(m => m.id !== methodId))
    }
  }

  const handleSaveEdit = () => {
    setMethods(methods.map(m => 
      m.id === selectedMethod.id 
        ? { ...m, ...formData, feePercent: parseFloat(formData.feePercent) }
        : m
    ))
    setShowEditModal(false)
    setSelectedMethod(null)
    setFormData({ nameAr: '', nameEn: '', icon: 'fa-money-bill-wave', feePercent: '', active: true })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'وسائل الدفع والقبض' : 'Payment Methods'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-credit-card"></i>
            {language === 'ar' ? 'طرق الدفع المتاحة' : 'Available payment methods'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة وسيلة' : 'Add Method'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((method) => (
          <div key={method.id} className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-2 border-emerald-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400 to-green-400 opacity-10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <i className={`fas ${method.icon} text-3xl text-white`}></i>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(method)}
                  className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(method.id)}
                  className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 relative z-10">
              {language === 'ar' ? method.nameAr : method.nameEn}
            </h3>
            <div className="space-y-2.5 relative z-10">
              {method.feePercent > 0 && (
                <div className="flex items-center justify-between text-sm bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{language === 'ar' ? 'رسوم:' : 'Fee:'}</span>
                  <span className="font-bold text-orange-600 text-lg">{method.feePercent}%</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t-2 border-emerald-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">{language === 'ar' ? 'الحالة:' : 'Status:'}</span>
                <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md backdrop-blur-sm ${method.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {method.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة وسيلة دفع' : 'Add Payment Method'}
            </h3>
            <div className="space-y-4">
              <input type="text" placeholder={language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="number" step="0.1" placeholder={language === 'ar' ? 'نسبة الرسوم %' : 'Fee Percentage %'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <select className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                <option>{language === 'ar' ? 'اختر الأيقونة' : 'Select Icon'}</option>
                <option value="fa-money-bill-wave">{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                <option value="fa-credit-card">{language === 'ar' ? 'بطاقة' : 'Card'}</option>
                <option value="fa-university">{language === 'ar' ? 'بنك' : 'Bank'}</option>
                <option value="fa-wallet">{language === 'ar' ? 'محفظة' : 'Wallet'}</option>
              </select>
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

      {/* Edit Modal */}
      {showEditModal && selectedMethod && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-xl w-full p-8 shadow-2xl border-2 border-emerald-200 dark:border-gray-700 transform animate-scaleIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل وسيلة الدفع' : 'Edit Payment Method'}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'نسبة الرسوم %' : 'Fee Percentage %'}
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.feePercent}
                  onChange={(e) => setFormData({...formData, feePercent: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الأيقونة' : 'Icon'}
                </label>
                <select 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="fa-money-bill-wave">{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option value="fa-credit-card">{language === 'ar' ? 'بطاقة' : 'Card'}</option>
                  <option value="fa-university">{language === 'ar' ? 'بنك' : 'Bank'}</option>
                  <option value="fa-wallet">{language === 'ar' ? 'محفظة' : 'Wallet'}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'الوسيلة نشطة' : 'Method Active'}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedMethod(null)
                  setFormData({ nameAr: '', nameEn: '', icon: 'fa-money-bill-wave', feePercent: '', active: true })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
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
