'use client'
import { useState } from 'react'

export default function AddCustomer({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [customerType, setCustomerType] = useState('hotel') // hotel or branch
  const [formData, setFormData] = useState({
    // معلومات الفندق الأساسية
    hotelNameAr: '',
    hotelNameEn: '',
    // معلومات الاتصال
    contactPerson: '',
    phoneNumber: '',
    email: '',
    // العنوان
    province: '',
    city: '',
    area: '',
    fullAddress: '',
    // معلومات الفندق
    numberOfRooms: '',
    numberOfFloors: '',
    hotelType: '', // 5 نجوم، 4 نجوم، إلخ
    // إذا كان فرع
    parentHotel: '',
    branchCode: '',
    // الباقة المختارة
    subscriptionPlan: '',
    planDuration: '',
    startDate: '',
    // معلومات الدفع
    paymentAmount: '',
    paymentMethod: 'cash',
    // ملاحظات
    notes: ''
  })

  const [customers, setCustomers] = useState([
    {
      id: 1,
      hotelNameAr: 'فندق بغداد بالاس',
      hotelNameEn: 'Baghdad Palace Hotel',
      contactPerson: 'علي محمد',
      phone: '0770 123 4567',
      email: 'info@baghdadpalace.com',
      province: 'بغداد',
      city: 'الكرادة',
      rooms: 50,
      floors: 5,
      type: 'hotel',
      plan: 'سنوي',
      registrationDate: '2025-11-18',
      status: 'active',
      branches: 0
    },
    {
      id: 2,
      hotelNameAr: 'فندق النخيل',
      hotelNameEn: 'Al-Nakheel Hotel',
      contactPerson: 'سارة أحمد',
      phone: '0771 234 5678',
      email: 'contact@alnakheel.com',
      province: 'البصرة',
      city: 'العشار',
      rooms: 80,
      floors: 8,
      type: 'hotel',
      plan: 'شهري',
      registrationDate: '2025-10-15',
      status: 'active',
      branches: 2
    }
  ])

  const provinces = [
    'بغداد', 'البصرة', 'نينوى', 'الأنبار', 'أربيل', 'السليمانية', 'دهوك',
    'كربلاء', 'النجف', 'واسط', 'صلاح الدين', 'ديالى', 'ميسان', 'ذي قار',
    'القادسية', 'بابل', 'المثنى', 'كركوك'
  ]

  const hotelTypes = [
    { value: '5star', labelAr: '5 نجوم', labelEn: '5 Stars' },
    { value: '4star', labelAr: '4 نجوم', labelEn: '4 Stars' },
    { value: '3star', labelAr: '3 نجوم', labelEn: '3 Stars' },
    { value: 'apartment', labelAr: 'شقق فندقية', labelEn: 'Hotel Apartments' },
    { value: 'motel', labelAr: 'موتيل', labelEn: 'Motel' }
  ]

  const subscriptionPlans = [
    { value: 'monthly', labelAr: 'شهري', labelEn: 'Monthly', price: 500000 },
    { value: 'quarterly', labelAr: 'ربع سنوي', labelEn: 'Quarterly', price: 1200000 },
    { value: 'semiannual', labelAr: 'نصف سنوي', labelEn: 'Semi-Annual', price: 2000000 },
    { value: 'annual', labelAr: 'سنوي', labelEn: 'Annual', price: 3500000 }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editMode && selectedCustomer) {
      // تحديث زبون موجود
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id 
          ? {
              ...c,
              hotelNameAr: formData.hotelNameAr,
              hotelNameEn: formData.hotelNameEn,
              contactPerson: formData.contactPerson,
              phone: formData.phoneNumber,
              email: formData.email,
              province: formData.province,
              city: formData.city,
              rooms: formData.numberOfRooms,
              floors: formData.numberOfFloors,
              plan: subscriptionPlans.find(p => p.value === formData.subscriptionPlan)?.labelAr || ''
            }
          : c
      ))
      alert(language === 'ar' ? 'تم تحديث الزبون بنجاح!' : 'Customer updated successfully!')
    } else {
      // إضافة زبون جديد
      const newCustomer = {
        id: customers.length + 1,
        hotelNameAr: formData.hotelNameAr,
        hotelNameEn: formData.hotelNameEn,
        contactPerson: formData.contactPerson,
        phone: formData.phoneNumber,
        email: formData.email,
        province: formData.province,
        city: formData.city,
        rooms: formData.numberOfRooms,
        floors: formData.numberOfFloors,
        type: customerType,
        plan: subscriptionPlans.find(p => p.value === formData.subscriptionPlan)?.labelAr || '',
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'active',
        branches: customerType === 'hotel' ? 0 : undefined,
        parentHotel: customerType === 'branch' ? formData.parentHotel : undefined
      }

      setCustomers([newCustomer, ...customers])
      alert(language === 'ar' ? 'تم إضافة الزبون بنجاح!' : 'Customer added successfully!')
    }
    
    setShowModal(false)
    setEditMode(false)
    setSelectedCustomer(null)
    
    // إعادة تعيين النموذج
    setFormData({
      hotelNameAr: '', hotelNameEn: '', contactPerson: '', phoneNumber: '',
      email: '', province: '', city: '', area: '', fullAddress: '',
      numberOfRooms: '', numberOfFloors: '', hotelType: '', parentHotel: '',
      branchCode: '', subscriptionPlan: '', planDuration: '', startDate: '',
      paymentAmount: '', paymentMethod: 'cash', notes: ''
    })
  }

  const handleView = (customer) => {
    setSelectedCustomer(customer)
    setShowViewModal(true)
  }

  const handleEdit = (customer) => {
    setSelectedCustomer(customer)
    setEditMode(true)
    setCustomerType(customer.type)
    setFormData({
      hotelNameAr: customer.hotelNameAr,
      hotelNameEn: customer.hotelNameEn,
      contactPerson: customer.contactPerson,
      phoneNumber: customer.phone,
      email: customer.email,
      province: customer.province,
      city: customer.city,
      area: '',
      fullAddress: '',
      numberOfRooms: customer.rooms,
      numberOfFloors: customer.floors,
      hotelType: '',
      parentHotel: customer.parentHotel || '',
      branchCode: '',
      subscriptionPlan: subscriptionPlans.find(p => p.labelAr === customer.plan)?.value || '',
      planDuration: '',
      startDate: '',
      paymentAmount: '',
      paymentMethod: 'cash',
      notes: ''
    })
    setShowModal(true)
  }

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-user-plus text-green-600"></i>
          {language === 'ar' ? 'إضافة زبون جديد' : 'Add New Customer'}
        </h2>
        <button
          onClick={() => {
            setEditMode(false)
            setSelectedCustomer(null)
            setShowModal(true)
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة زبون' : 'Add Customer'}
        </button>
      </div>

      {/* Customers List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-list text-green-600"></i>
          {language === 'ar' ? 'قائمة العملاء' : 'Customers List'}
        </h3>

        <div className="grid gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? customer.hotelNameAr : customer.hotelNameEn}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.type === 'hotel'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                    }`}>
                      {customer.type === 'hotel' 
                        ? (language === 'ar' ? 'فندق رئيسي' : 'Main Hotel')
                        : (language === 'ar' ? 'فرع' : 'Branch')
                      }
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                      {customer.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : ''}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        <i className="fas fa-user ml-2"></i>
                        {customer.contactPerson}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        <i className="fas fa-phone ml-2"></i>
                        {customer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        <i className="fas fa-map-marker-alt ml-2"></i>
                        {customer.province} - {customer.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        <i className="fas fa-bed ml-2"></i>
                        {customer.rooms} {language === 'ar' ? 'غرفة' : 'Rooms'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      <i className="fas fa-calendar ml-1"></i>
                      {language === 'ar' ? 'تاريخ التسجيل:' : 'Registration:'} {customer.registrationDate}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <i className="fas fa-tag ml-1"></i>
                      {language === 'ar' ? 'الباقة:' : 'Plan:'} {customer.plan}
                    </span>
                    {customer.type === 'hotel' && (
                      <span className="text-gray-600 dark:text-gray-400">
                        <i className="fas fa-code-branch ml-1"></i>
                        {customer.branches} {language === 'ar' ? 'فرع' : 'Branches'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleView(customer)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    title={language === 'ar' ? 'عرض' : 'View'}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    onClick={() => handleEdit(customer)}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                    title={language === 'ar' ? 'تعديل' : 'Edit'}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-user-plus"></i>
                {editMode
                  ? (language === 'ar' ? 'تعديل بيانات الزبون' : 'Edit Customer')
                  : (language === 'ar' ? 'إضافة زبون جديد' : 'Add New Customer')
                }
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditMode(false)
                  setSelectedCustomer(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* نوع الزبون */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  {language === 'ar' ? 'نوع الزبون' : 'Customer Type'}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCustomerType('hotel')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      customerType === 'hotel'
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}
                  >
                    <i className="fas fa-hotel text-3xl mb-2 text-green-600"></i>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'فندق رئيسي' : 'Main Hotel'}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerType('branch')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      customerType === 'branch'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                  >
                    <i className="fas fa-code-branch text-3xl mb-2 text-purple-600"></i>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'فرع فندق' : 'Hotel Branch'}
                    </p>
                  </button>
                </div>
              </div>

              {/* إذا كان فرع - اختيار الفندق الرئيسي */}
              {customerType === 'branch' && (
                <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الفندق الرئيسي' : 'Parent Hotel'}
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <select
                    value={formData.parentHotel}
                    onChange={(e) => handleInputChange('parentHotel', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required={customerType === 'branch'}
                  >
                    <option value="">{language === 'ar' ? 'اختر الفندق الرئيسي' : 'Select Parent Hotel'}</option>
                    {customers.filter(c => c.type === 'hotel').map(hotel => (
                      <option key={hotel.id} value={hotel.id}>
                        {language === 'ar' ? hotel.hotelNameAr : hotel.hotelNameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* معلومات الفندق */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-info-circle text-green-600"></i>
                  {language === 'ar' ? 'معلومات الفندق' : 'Hotel Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hotelNameAr}
                      onChange={(e) => handleInputChange('hotelNameAr', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="فندق بغداد"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم الفندق (إنجليزي)' : 'Hotel Name (English)'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hotelNameEn}
                      onChange={(e) => handleInputChange('hotelNameEn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Baghdad Hotel"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'نوع الفندق' : 'Hotel Type'}
                    </label>
                    <select
                      value={formData.hotelType}
                      onChange={(e) => handleInputChange('hotelType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">{language === 'ar' ? 'اختر النوع' : 'Select Type'}</option>
                      {hotelTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {language === 'ar' ? type.labelAr : type.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                    </label>
                    <input
                      type="number"
                      value={formData.numberOfRooms}
                      onChange={(e) => handleInputChange('numberOfRooms', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
                    </label>
                    <input
                      type="number"
                      value={formData.numberOfFloors}
                      onChange={(e) => handleInputChange('numberOfFloors', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {/* معلومات الاتصال */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-address-book text-green-600"></i>
                  {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم المسؤول' : 'Contact Person'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="علي محمد"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0770 123 4567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="info@hotel.com"
                    />
                  </div>
                </div>
              </div>

              {/* العنوان */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                  {language === 'ar' ? 'العنوان' : 'Address'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'المحافظة' : 'Province'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">{language === 'ar' ? 'اختر المحافظة' : 'Select Province'}</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'المدينة' : 'City'}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="الكرادة"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'المنطقة' : 'Area'}
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="شارع 14"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'العنوان الكامل' : 'Full Address'}
                  </label>
                  <textarea
                    value={formData.fullAddress}
                    onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="العنوان التفصيلي..."
                  ></textarea>
                </div>
              </div>

              {/* الباقة والاشتراك */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-box text-green-600"></i>
                  {language === 'ar' ? 'معلومات الاشتراك' : 'Subscription Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الباقة' : 'Plan'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={formData.subscriptionPlan}
                      onChange={(e) => {
                        handleInputChange('subscriptionPlan', e.target.value)
                        const plan = subscriptionPlans.find(p => p.value === e.target.value)
                        if (plan) handleInputChange('paymentAmount', plan.price)
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">{language === 'ar' ? 'اختر الباقة' : 'Select Plan'}</option>
                      {subscriptionPlans.map(plan => (
                        <option key={plan.value} value={plan.value}>
                          {language === 'ar' ? plan.labelAr : plan.labelEn} - {plan.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'المبلغ المدفوع' : 'Payment Amount'}
                    </label>
                    <input
                      type="number"
                      value={formData.paymentAmount}
                      onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="3500000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="cash">{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                      <option value="bank">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                      <option value="check">{language === 'ar' ? 'شيك' : 'Check'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ملاحظات */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === 'ar' ? 'أي ملاحظات أخرى...' : 'Any additional notes...'}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditMode(false)
                    setSelectedCustomer(null)
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-save ml-2"></i>
                  {editMode 
                    ? (language === 'ar' ? 'تحديث الزبون' : 'Update Customer')
                    : (language === 'ar' ? 'حفظ الزبون' : 'Save Customer')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Customer Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تفاصيل الزبون' : 'Customer Details'}
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-hotel text-blue-600"></i>
                    {language === 'ar' ? 'معلومات أساسية' : 'Basic Information'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.hotelNameAr}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'اسم الفندق (إنجليزي)' : 'Hotel Name (English)'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.hotelNameEn}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.contactPerson}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'المحافظة' : 'Province'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.province}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hotel Details */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-info-circle text-green-600"></i>
                    {language === 'ar' ? 'تفاصيل الفندق' : 'Hotel Details'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.rooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.floors}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'نوع الزبون' : 'Customer Type'}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCustomer.type === 'hotel'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {selectedCustomer.type === 'hotel'
                          ? (language === 'ar' ? 'فندق رئيسي' : 'Main Hotel')
                          : (language === 'ar' ? 'فرع' : 'Branch')
                        }
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCustomer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedCustomer.status === 'active'
                          ? (language === 'ar' ? 'نشط' : 'Active')
                          : (language === 'ar' ? 'غير نشط' : 'Inactive')
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscription Info */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-box text-purple-600"></i>
                    {language === 'ar' ? 'معلومات الاشتراك' : 'Subscription Info'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'الباقة' : 'Plan'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'تاريخ التسجيل' : 'Registration Date'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.registrationDate}
                      </p>
                    </div>
                    {selectedCustomer.type === 'hotel' && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {language === 'ar' ? 'عدد الفروع' : 'Number of Branches'}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {selectedCustomer.branches}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false)
                  handleEdit(selectedCustomer)
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <i className="fas fa-edit ml-2"></i>
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
