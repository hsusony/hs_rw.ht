'use client'

import { useState } from 'react'

export default function ElectronicCards({ language }) {
  const [cards, setCards] = useState([
    { 
      id: 1, 
      nameAr: 'بطاقة الماستر كارد الرئيسية', 
      nameEn: 'Main Mastercard', 
      cardNumber: '**** **** **** 5678',
      bank: 'البنك التجاري العراقي',
      openingBalance: 5000000,
      currentBalance: 7500000,
      type: 'debit',
      status: 'active'
    },
    { 
      id: 2, 
      nameAr: 'بطاقة الفيزا للمصروفات', 
      nameEn: 'Visa Card for Expenses', 
      cardNumber: '**** **** **** 1234',
      bank: 'الرشيد',
      openingBalance: 3000000,
      currentBalance: 2100000,
      type: 'credit',
      status: 'active'
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    cardNumber: '',
    bank: '',
    openingBalance: '',
    currentBalance: '',
    type: 'debit',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id ? { ...formData, id: c.id } : c))
    } else {
      setCards([...cards, { ...formData, id: Date.now(), currentBalance: formData.openingBalance }])
    }
    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      cardNumber: '',
      bank: '',
      openingBalance: '',
      currentBalance: '',
      type: 'debit',
      status: 'active'
    })
    setEditingCard(null)
  }

  const handleEdit = (card) => {
    setEditingCard(card)
    setFormData(card)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه البطاقة؟' : 'Are you sure you want to delete this card?')) {
      setCards(cards.filter(c => c.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'البطاقات الإلكترونية' : 'Electronic Cards'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة بطاقات القبض والدفع والأرصدة الافتتاحية' : 'Manage payment cards and opening balances'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة بطاقة' : 'Add Card'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-2xl transform hover:-translate-y-2 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <i className="fas fa-credit-card text-white text-3xl"></i>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    card.type === 'debit' ? 'bg-green-400 text-green-900' : 'bg-yellow-400 text-yellow-900'
                  }`}>
                    {card.type === 'debit' 
                      ? (language === 'ar' ? 'خصم مباشر' : 'Debit') 
                      : (language === 'ar' ? 'ائتمان' : 'Credit')
                    }
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(card)} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all">
                    <i className="fas fa-edit text-white"></i>
                  </button>
                  <button onClick={() => handleDelete(card.id)} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all">
                    <i className="fas fa-trash text-white"></i>
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {language === 'ar' ? card.nameAr : card.nameEn}
              </h3>

              <div className="text-white/80 text-sm mb-4">
                <i className="fas fa-university mr-2"></i>
                {card.bank}
              </div>

              <div className="text-2xl font-bold text-white mb-6 tracking-wider">
                {card.cardNumber}
              </div>

              <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{language === 'ar' ? 'الرصيد الافتتاحي:' : 'Opening Balance:'}</span>
                  <span className="text-white font-bold">{card.openingBalance.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{language === 'ar' ? 'الرصيد الحالي:' : 'Current Balance:'}</span>
                  <span className="text-white font-bold text-lg">{card.currentBalance.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className={`px-4 py-2 rounded-lg text-xs font-bold inline-block ${
                  card.status === 'active' 
                    ? 'bg-green-400 text-green-900' 
                    : 'bg-red-400 text-red-900'
                }`}>
                  {card.status === 'active' 
                    ? (language === 'ar' ? 'نشطة' : 'Active')
                    : (language === 'ar' ? 'معطلة' : 'Inactive')
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between sticky top-0">
              <h3 className="text-2xl font-bold text-white">
                {editingCard 
                  ? (language === 'ar' ? 'تعديل بطاقة' : 'Edit Card')
                  : (language === 'ar' ? 'إضافة بطاقة جديدة' : 'Add New Card')
                }
              </h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-white hover:bg-white/20 rounded-lg p-2">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم البطاقة (عربي)' : 'Card Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr}
                    onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم البطاقة (إنجليزي)' : 'Card Name (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    placeholder="**** **** **** 1234"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم البنك' : 'Bank Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bank}
                    onChange={(e) => setFormData({...formData, bank: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الرصيد الافتتاحي (د.ع)' : 'Opening Balance (IQD)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.openingBalance}
                    onChange={(e) => setFormData({...formData, openingBalance: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {editingCard && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'الرصيد الحالي (د.ع)' : 'Current Balance (IQD)'}
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentBalance}
                      onChange={(e) => setFormData({...formData, currentBalance: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'نوع البطاقة' : 'Card Type'}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="debit">{language === 'ar' ? 'خصم مباشر' : 'Debit'}</option>
                    <option value="credit">{language === 'ar' ? 'ائتمان' : 'Credit'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="active">{language === 'ar' ? 'نشطة' : 'Active'}</option>
                    <option value="inactive">{language === 'ar' ? 'معطلة' : 'Inactive'}</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  {editingCard ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes') : (language === 'ar' ? 'إضافة' : 'Add')}
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
