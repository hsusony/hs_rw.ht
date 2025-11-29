'use client'

import { useState } from 'react'

export default function PermanentCustomersSection({ language }) {
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      nameAr: 'شركة السياحة الذهبية', 
      nameEn: 'Golden Tourism Co.', 
      type: 'tourism_company',
      contactPerson: 'علي محمد',
      phone: '07701234567', 
      email: 'info@goldentourism.com',
      discountPercent: 20,
      totalBookings: 45,
      status: 'active'
    },
    { 
      id: 2, 
      nameAr: 'شركة النفط الوطنية', 
      nameEn: 'National Oil Company', 
      type: 'corporate',
      contactPerson: 'أحمد حسن',
      phone: '07712345678', 
      email: 'booking@oilcompany.com',
      discountPercent: 15,
      totalBookings: 32,
      status: 'active'
    },
    { 
      id: 3, 
      nameAr: 'مجموعة الفنادق الدولية', 
      nameEn: 'International Hotels Group', 
      type: 'tourism_company',
      contactPerson: 'سارة علي',
      phone: '07723456789', 
      email: 'partners@ihg.com',
      discountPercent: 25,
      totalBookings: 78,
      status: 'active'
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    type: 'tourism_company',
    contactPerson: '',
    phone: '',
    email: '',
    discountPercent: '',
    totalBookings: 0,
    status: 'active'
  })

  const handleEdit = (customer) => {
    setSelectedCustomer(customer)
    setFormData({
      nameAr: customer.nameAr,
      nameEn: customer.nameEn,
      type: customer.type,
      contactPerson: customer.contactPerson,
      phone: customer.phone,
      email: customer.email,
      discountPercent: customer.discountPercent,
      totalBookings: customer.totalBookings,
      status: customer.status
    })
    setShowEditModal(true)
  }

  const handleDelete = (customerId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الزبون؟' : 'Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId))
    }
  }

  const handleSaveEdit = () => {
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id 
        ? { ...c, ...formData, discountPercent: parseInt(formData.discountPercent), totalBookings: parseInt(formData.totalBookings) }
        : c
    ))
    setShowEditModal(false)
    setSelectedCustomer(null)
    setFormData({ nameAr: '', nameEn: '', type: 'tourism_company', contactPerson: '', phone: '', email: '', discountPercent: '', totalBookings: 0, status: 'active' })
  }

  const handleAddCustomer = () => {
    if (!formData.nameAr || !formData.nameEn || !formData.type || !formData.contactPerson || !formData.phone || !formData.email || formData.discountPercent === '') {
      alert(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    const newCustomer = {
      id: Math.max(...customers.map(c => c.id)) + 1,
      nameAr: formData.nameAr,
      nameEn: formData.nameEn,
      type: formData.type,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      discountPercent: parseInt(formData.discountPercent),
      totalBookings: 0,
      status: 'active'
    }

    setCustomers([...customers, newCustomer])
    setShowAddModal(false)
    setFormData({ nameAr: '', nameEn: '', type: 'tourism_company', contactPerson: '', phone: '', email: '', discountPercent: '', totalBookings: 0, status: 'active' })
  }

  const getTypeInfo = (type) => {
    switch(type) {
      case 'tourism_company':
        return {
          nameAr: 'شركة سياحة',
          nameEn: 'Tourism Company',
          icon: 'fa-plane',
          color: 'from-blue-500 to-cyan-500'
        }
      case 'corporate':
        return {
          nameAr: 'شركة تجارية',
          nameEn: 'Corporate',
          icon: 'fa-building',
          color: 'from-purple-500 to-pink-500'
        }
      default:
        return {
          nameAr: 'عميل دائم',
          nameEn: 'Permanent Customer',
          icon: 'fa-user-tie',
          color: 'from-gray-500 to-gray-600'
        }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'حسابات الزبائن الدائمين' : 'Permanent Customers'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-briefcase"></i>
            {language === 'ar' ? 'الشركات والزبائن المميزين' : 'Corporate and VIP customers'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة زبون' : 'Add Customer'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => {
          const typeInfo = getTypeInfo(customer.type)
          return (
            <div key={customer.id} className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-teal-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-teal-400 to-cyan-400 opacity-10 rounded-full -mr-20 -mb-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${typeInfo.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <i className={`fas ${typeInfo.icon} text-3xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                    {language === 'ar' ? customer.nameAr : customer.nameEn}
                  </h3>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-gray-700/50 px-3 py-1 rounded-lg inline-block">
                    {language === 'ar' ? typeInfo.nameAr : typeInfo.nameEn}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(customer)}
                    className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => handleDelete(customer.id)}
                    className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-user text-teal-500"></i>
                    <span className="font-semibold">{customer.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-phone text-cyan-500"></i>
                    <span className="font-semibold">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-envelope text-blue-500"></i>
                    <span className="truncate font-semibold text-xs">{customer.email}</span>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-3 text-center shadow-lg transform group-hover:scale-105 transition-all">
                    <div className="text-4xl font-extrabold text-white drop-shadow-lg">{customer.discountPercent}%</div>
                    <div className="text-xs text-white font-bold uppercase tracking-wide">{language === 'ar' ? 'خصم' : 'Discount'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 text-center shadow-lg transform group-hover:scale-105 transition-all">
                    <div className="text-3xl font-extrabold text-white drop-shadow-lg">{customer.totalBookings}</div>
                    <div className="text-xs text-white font-bold uppercase tracking-wide">{language === 'ar' ? 'حجز' : 'Bookings'}</div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-teal-200 dark:border-gray-700 pt-4 relative z-10">
                <span className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md ${customer.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                  {customer.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'معطل' : 'Inactive')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة زبون دائم' : 'Add Permanent Customer'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'النوع' : 'Type'}
                </label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="tourism_company">{language === 'ar' ? 'شركة سياحة' : 'Tourism Company'}</option>
                  <option value="corporate">{language === 'ar' ? 'شركة تجارية' : 'Corporate'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'نسبة الخصم %' : 'Discount %'}
                </label>
                <input 
                  type="number" 
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({...formData, discountPercent: e.target.value})}
                  placeholder={language === 'ar' ? 'نسبة الخصم %' : 'Discount %'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم المسؤول' : 'Contact Person'}
                </label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder={language === 'ar' ? 'اسم المسؤول' : 'Contact Person'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} 
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button onClick={handleAddCustomer} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-teal-200 dark:border-gray-700 transform animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-edit text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'تعديل الزبون الدائم' : 'Edit Permanent Customer'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'}
                </label>
                <input 
                  type="text" 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'النوع' : 'Type'}
                </label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="tourism_company">{language === 'ar' ? 'شركة سياحة' : 'Tourism Company'}</option>
                  <option value="corporate">{language === 'ar' ? 'شركة تجارية' : 'Corporate'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'نسبة الخصم %' : 'Discount %'}
                </label>
                <input 
                  type="number" 
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({...formData, discountPercent: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'اسم المسؤول' : 'Contact Person'}
                </label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'عدد الحجوزات' : 'Total Bookings'}
                </label>
                <input 
                  type="number" 
                  value={formData.totalBookings}
                  onChange={(e) => setFormData({...formData, totalBookings: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="active">{language === 'ar' ? 'نشط' : 'Active'}</option>
                  <option value="inactive">{language === 'ar' ? 'معطل' : 'Inactive'}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedCustomer(null)
                  setFormData({ nameAr: '', nameEn: '', type: 'tourism_company', contactPerson: '', phone: '', email: '', discountPercent: '', totalBookings: 0, status: 'active' })
                }} 
                className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2"
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
