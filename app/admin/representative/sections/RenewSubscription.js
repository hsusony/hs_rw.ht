'use client'
import { useState } from 'react'

export default function RenewSubscription({ language }) {
  const [showRenewModal, setShowRenewModal] = useState(false)
  const [showPermissionRequest, setShowPermissionRequest] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [permissionCode, setPermissionCode] = useState('')
  const [permissionError, setPermissionError] = useState('')

  const [renewalData, setRenewalData] = useState({
    plan: '',
    duration: '',
    startDate: '',
    endDate: '',
    amount: '',
    discount: 0,
    paymentMethod: 'cash',
    notes: ''
  })

  // قائمة العملاء المؤهلين للتجديد
  const [customers, setCustomers] = useState([
    {
      id: 1,
      hotelNameAr: 'فندق بغداد بالاس',
      hotelNameEn: 'Baghdad Palace Hotel',
      contactPerson: 'علي محمد',
      phone: '0770 123 4567',
      currentPlan: 'سنوي',
      expiryDate: '2025-12-15',
      daysLeft: 27,
      status: 'active',
      lastRenewal: '2024-12-15'
    },
    {
      id: 2,
      hotelNameAr: 'فندق النخيل',
      hotelNameEn: 'Al-Nakheel Hotel',
      contactPerson: 'سارة أحمد',
      phone: '0771 234 5678',
      currentPlan: 'شهري',
      expiryDate: '2025-11-25',
      daysLeft: 7,
      status: 'expiring',
      lastRenewal: '2025-10-25'
    },
    {
      id: 3,
      hotelNameAr: 'فندق السلام',
      hotelNameEn: 'Al-Salam Hotel',
      contactPerson: 'خالد حسن',
      phone: '0772 345 6789',
      currentPlan: 'ربع سنوي',
      expiryDate: '2025-11-20',
      daysLeft: 2,
      status: 'expiring',
      lastRenewal: '2025-08-20'
    },
    {
      id: 4,
      hotelNameAr: 'فندق الربيع',
      hotelNameEn: 'Al-Rabee Hotel',
      contactPerson: 'فاطمة علي',
      phone: '0773 456 7890',
      currentPlan: 'سنوي',
      expiryDate: '2025-11-17',
      daysLeft: -1,
      status: 'expired',
      lastRenewal: '2024-11-17'
    }
  ])

  const subscriptionPlans = [
    { value: 'monthly', labelAr: 'شهري', labelEn: 'Monthly', price: 500000, days: 30 },
    { value: 'quarterly', labelAr: 'ربع سنوي', labelEn: 'Quarterly', price: 1200000, days: 90 },
    { value: 'semiannual', labelAr: 'نصف سنوي', labelEn: 'Semi-Annual', price: 2000000, days: 180 },
    { value: 'annual', labelAr: 'سنوي', labelEn: 'Annual', price: 3500000, days: 365 }
  ]

  // طلب الصلاحية من مدير النظام
  const requestPermission = () => {
    setShowPermissionRequest(true)
    setPermissionError('')
  }

  // التحقق من كود الصلاحية
  const verifyPermission = () => {
    // كود الصلاحية المؤقت من مدير النظام (في التطبيق الحقيقي يكون من السيرفر)
    const validCode = 'RENEW2025' 
    
    if (permissionCode.toUpperCase() === validCode) {
      setHasPermission(true)
      setShowPermissionRequest(false)
      setPermissionError('')
      setShowRenewModal(true)
    } else {
      setPermissionError(language === 'ar' ? 'كود الصلاحية غير صحيح! الرجاء التواصل مع مدير النظام.' : 'Invalid permission code! Please contact system admin.')
    }
  }

  const handleRenewClick = (customer) => {
    setSelectedCustomer(customer)
    
    // التحقق من وجود صلاحية
    if (!hasPermission) {
      requestPermission()
    } else {
      setShowRenewModal(true)
    }
  }

  const handlePlanChange = (planValue) => {
    const plan = subscriptionPlans.find(p => p.value === planValue)
    if (plan) {
      setRenewalData(prev => ({
        ...prev,
        plan: planValue,
        amount: plan.price,
        duration: plan.days
      }))
      
      // حساب تاريخ الانتهاء
      if (renewalData.startDate) {
        const start = new Date(renewalData.startDate)
        const end = new Date(start)
        end.setDate(end.getDate() + plan.days)
        setRenewalData(prev => ({
          ...prev,
          endDate: end.toISOString().split('T')[0]
        }))
      }
    }
  }

  const handleStartDateChange = (date) => {
    setRenewalData(prev => ({ ...prev, startDate: date }))
    
    if (renewalData.duration) {
      const start = new Date(date)
      const end = new Date(start)
      end.setDate(end.getDate() + parseInt(renewalData.duration))
      setRenewalData(prev => ({
        ...prev,
        endDate: end.toISOString().split('T')[0]
      }))
    }
  }

  const calculateFinalAmount = () => {
    const amount = parseFloat(renewalData.amount) || 0
    const discount = parseFloat(renewalData.discount) || 0
    return amount - (amount * discount / 100)
  }

  const handleSubmitRenewal = (e) => {
    e.preventDefault()
    
    // تحديث بيانات العميل
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          currentPlan: subscriptionPlans.find(p => p.value === renewalData.plan)?.labelAr || c.currentPlan,
          expiryDate: renewalData.endDate,
          status: 'active',
          lastRenewal: renewalData.startDate
        }
      }
      return c
    }))
    
    // إعادة تعيين البيانات
    setShowRenewModal(false)
    setSelectedCustomer(null)
    setRenewalData({
      plan: '',
      duration: '',
      startDate: '',
      endDate: '',
      amount: '',
      discount: 0,
      paymentMethod: 'cash',
      notes: ''
    })
    
    // يمكن إضافة إشعار نجاح هنا
    alert(language === 'ar' ? 'تم تجديد الاشتراك بنجاح!' : 'Subscription renewed successfully!')
  }

  const getStatusBadge = (status, daysLeft) => {
    if (status === 'expired') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
          {language === 'ar' ? 'منتهي' : 'Expired'}
        </span>
      )
    } else if (status === 'expiring' || daysLeft <= 7) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
          {language === 'ar' ? 'قارب على الانتهاء' : 'Expiring Soon'}
        </span>
      )
    } else {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
          {language === 'ar' ? 'نشط' : 'Active'}
        </span>
      )
    }
  }

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-sync-alt text-green-600"></i>
          {language === 'ar' ? 'تجديد الاشتراكات' : 'Renew Subscriptions'}
        </h2>
        <div className="flex items-center gap-3">
          {hasPermission ? (
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg font-semibold flex items-center gap-2">
              <i className="fas fa-check-circle"></i>
              {language === 'ar' ? 'لديك صلاحية التجديد' : 'Permission Granted'}
            </span>
          ) : (
            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-lg font-semibold flex items-center gap-2">
              <i className="fas fa-lock"></i>
              {language === 'ar' ? 'يتطلب صلاحية من مدير النظام' : 'Requires Admin Permission'}
            </span>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1">
              {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              {language === 'ar' 
                ? 'عملية تجديد الاشتراك تتطلب صلاحية خاصة من مدير النظام. يرجى طلب كود الصلاحية قبل إجراء أي تجديد.'
                : 'Subscription renewal requires special permission from the system admin. Please request a permission code before proceeding with any renewal.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-list text-green-600"></i>
          {language === 'ar' ? 'العملاء المؤهلين للتجديد' : 'Customers Eligible for Renewal'}
        </h3>

        <div className="grid gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`rounded-xl p-4 border-2 transition-all ${
                customer.status === 'expired' 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : customer.status === 'expiring'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? customer.hotelNameAr : customer.hotelNameEn}
                    </h4>
                    {getStatusBadge(customer.status, customer.daysLeft)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
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
                        <i className="fas fa-box ml-2"></i>
                        {language === 'ar' ? 'الباقة:' : 'Plan:'} {customer.currentPlan}
                      </p>
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        customer.daysLeft < 0 ? 'text-red-600' :
                        customer.daysLeft <= 7 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        <i className="fas fa-calendar-times ml-2"></i>
                        {customer.daysLeft < 0 
                          ? (language === 'ar' ? `منتهي منذ ${Math.abs(customer.daysLeft)} يوم` : `Expired ${Math.abs(customer.daysLeft)} days ago`)
                          : (language === 'ar' ? `${customer.daysLeft} يوم متبقي` : `${customer.daysLeft} days left`)
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      <i className="fas fa-calendar-check ml-1"></i>
                      {language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'} {customer.expiryDate}
                    </span>
                    <span>
                      <i className="fas fa-history ml-1"></i>
                      {language === 'ar' ? 'آخر تجديد:' : 'Last Renewal:'} {customer.lastRenewal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRenewClick(customer)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i>
                  {language === 'ar' ? 'تجديد' : 'Renew'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Request Modal */}
      {showPermissionRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-key"></i>
                {language === 'ar' ? 'صلاحية التجديد' : 'Renewal Permission'}
              </h3>
              <button
                onClick={() => {
                  setShowPermissionRequest(false)
                  setPermissionError('')
                  setPermissionCode('')
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-shield-alt text-yellow-600 text-2xl"></i>
                    <div>
                      <h4 className="font-bold text-yellow-900 dark:text-yellow-300 mb-2">
                        {language === 'ar' ? 'تحتاج إلى صلاحية خاصة' : 'Special Permission Required'}
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        {language === 'ar' 
                          ? 'عملية تجديد الاشتراك محمية بكود صلاحية من مدير النظام. الرجاء طلب الكود من مدير النظام وإدخاله أدناه.'
                          : 'Subscription renewal is protected by an admin permission code. Please request the code from system admin and enter it below.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'كود الصلاحية' : 'Permission Code'}
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <input
                  type="text"
                  value={permissionCode}
                  onChange={(e) => setPermissionCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-lg font-bold tracking-wider"
                  placeholder="XXXX-XXXX"
                  style={{ textTransform: 'uppercase' }}
                />
                
                {permissionError && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                      <i className="fas fa-exclamation-circle"></i>
                      {permissionError}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPermissionRequest(false)
                    setPermissionError('')
                    setPermissionCode('')
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={verifyPermission}
                  disabled={!permissionCode}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    permissionCode
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-check ml-2"></i>
                  {language === 'ar' ? 'تحقق' : 'Verify'}
                </button>
              </div>

              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  <i className="fas fa-info-circle ml-1"></i>
                  {language === 'ar' 
                    ? 'للحصول على كود الصلاحية، يرجى التواصل مع مدير النظام'
                    : 'To obtain a permission code, please contact the system admin'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renewal Modal */}
      {showRenewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-sync-alt"></i>
                {language === 'ar' ? 'تجديد الاشتراك' : 'Renew Subscription'}
              </h3>
              <button
                onClick={() => setShowRenewModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitRenewal} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* معلومات العميل */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'اسم الفندق:' : 'Hotel Name:'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? selectedCustomer.hotelNameAr : selectedCustomer.hotelNameEn}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الباقة الحالية:' : 'Current Plan:'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedCustomer.currentPlan}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedCustomer.expiryDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الحالة:' : 'Status:'}
                    </p>
                    {getStatusBadge(selectedCustomer.status, selectedCustomer.daysLeft)}
                  </div>
                </div>
              </div>

              {/* معلومات التجديد */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-calendar-plus text-green-600"></i>
                  {language === 'ar' ? 'معلومات التجديد' : 'Renewal Information'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الباقة الجديدة' : 'New Plan'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={renewalData.plan}
                      onChange={(e) => handlePlanChange(e.target.value)}
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
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={renewalData.startDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                    </label>
                    <input
                      type="date"
                      value={renewalData.endDate}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'المبلغ' : 'Amount'}
                    </label>
                    <input
                      type="number"
                      value={renewalData.amount}
                      onChange={(e) => setRenewalData(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="3500000"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الخصم (%)' : 'Discount (%)'}
                    </label>
                    <input
                      type="number"
                      value={renewalData.discount}
                      onChange={(e) => setRenewalData(prev => ({ ...prev, discount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                    </label>
                    <select
                      value={renewalData.paymentMethod}
                      onChange={(e) => setRenewalData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="cash">{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                      <option value="bank">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                      <option value="check">{language === 'ar' ? 'شيك' : 'Check'}</option>
                    </select>
                  </div>
                </div>

                {/* المبلغ النهائي */}
                {renewalData.amount && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">
                        {language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}
                      </span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {calculateFinalAmount().toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                      </span>
                    </div>
                    {renewalData.discount > 0 && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                          {language === 'ar' ? 'المبلغ الأصلي:' : 'Original Amount:'} {parseFloat(renewalData.amount).toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </p>
                        <p>
                          {language === 'ar' ? 'الخصم:' : 'Discount:'} {renewalData.discount}% ({(parseFloat(renewalData.amount) * parseFloat(renewalData.discount) / 100).toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'})
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ملاحظات */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  value={renewalData.notes}
                  onChange={(e) => setRenewalData(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRenewModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-check ml-2"></i>
                  {language === 'ar' ? 'تأكيد التجديد' : 'Confirm Renewal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
