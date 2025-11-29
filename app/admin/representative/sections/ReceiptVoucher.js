'use client'
import { useState } from 'react'

export default function ReceiptVoucher({ language }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const [receiptData, setReceiptData] = useState({
    customerName: '',
    customerPhone: '',
    amount: '',
    paymentMethod: 'cash',
    paymentFor: 'subscription', // subscription, renewal, branch
    plan: '',
    duration: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  })

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      receiptNumber: 'RV-2025-001',
      customerName: 'فندق بغداد بالاس',
      customerPhone: '0770 123 4567',
      amount: 3500000,
      paymentMethod: 'cash',
      paymentFor: 'subscription',
      plan: 'سنوي',
      date: '2025-11-18',
      time: '10:30 AM',
      issuedBy: 'أحمد المندوب',
      status: 'paid',
      notes: 'دفعة كاملة للاشتراك السنوي'
    },
    {
      id: 2,
      receiptNumber: 'RV-2025-002',
      customerName: 'فندق النخيل',
      customerPhone: '0771 234 5678',
      amount: 500000,
      paymentMethod: 'bank',
      paymentFor: 'renewal',
      plan: 'شهري',
      date: '2025-11-17',
      time: '02:15 PM',
      issuedBy: 'أحمد المندوب',
      status: 'paid',
      notes: 'تجديد الاشتراك الشهري'
    },
    {
      id: 3,
      receiptNumber: 'RV-2025-003',
      customerName: 'فندق السلام - فرع الكرادة',
      customerPhone: '0772 345 6789',
      amount: 2000000,
      paymentMethod: 'check',
      paymentFor: 'branch',
      plan: 'نصف سنوي',
      date: '2025-11-16',
      time: '11:00 AM',
      issuedBy: 'أحمد المندوب',
      status: 'paid',
      notes: 'اشتراك فرع جديد'
    }
  ])

  const paymentMethods = [
    { value: 'cash', labelAr: 'نقدي', labelEn: 'Cash', icon: 'fa-money-bill-wave', color: 'text-green-600' },
    { value: 'bank', labelAr: 'تحويل بنكي', labelEn: 'Bank Transfer', icon: 'fa-university', color: 'text-blue-600' },
    { value: 'check', labelAr: 'شيك', labelEn: 'Check', icon: 'fa-money-check', color: 'text-purple-600' }
  ]

  const subscriptionPlans = [
    { value: 'monthly', labelAr: 'شهري', labelEn: 'Monthly', price: 500000 },
    { value: 'quarterly', labelAr: 'ربع سنوي', labelEn: 'Quarterly', price: 1200000 },
    { value: 'semiannual', labelAr: 'نصف سنوي', labelEn: 'Semi-Annual', price: 2000000 },
    { value: 'annual', labelAr: 'سنوي', labelEn: 'Annual', price: 3500000 }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newReceipt = {
      id: receipts.length + 1,
      receiptNumber: `RV-2025-${String(receipts.length + 1).padStart(3, '0')}`,
      customerName: receiptData.customerName,
      customerPhone: receiptData.customerPhone,
      amount: parseFloat(receiptData.amount),
      paymentMethod: receiptData.paymentMethod,
      paymentFor: receiptData.paymentFor,
      plan: subscriptionPlans.find(p => p.value === receiptData.plan)?.labelAr || '',
      date: receiptData.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      issuedBy: 'أحمد المندوب',
      status: 'paid',
      notes: receiptData.notes
    }

    setReceipts([newReceipt, ...receipts])
    setShowAddModal(false)
    
    // Reset form
    setReceiptData({
      customerName: '',
      customerPhone: '',
      amount: '',
      paymentMethod: 'cash',
      paymentFor: 'subscription',
      plan: '',
      duration: '',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    })

    alert(language === 'ar' ? 'تم إنشاء سند القبض بنجاح!' : 'Receipt created successfully!')
  }

  const handlePrint = (receipt) => {
    // في التطبيق الحقيقي، سيتم إنشاء PDF وطباعته
    window.print()
  }

  const handleView = (receipt) => {
    setSelectedReceipt(receipt)
    setShowViewModal(true)
  }

  const handlePlanChange = (planValue) => {
    const plan = subscriptionPlans.find(p => p.value === planValue)
    if (plan) {
      setReceiptData(prev => ({
        ...prev,
        plan: planValue,
        amount: plan.price
      }))
    }
  }

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-file-invoice-dollar text-green-600"></i>
          {language === 'ar' ? 'سندات القبض' : 'Receipt Vouchers'}
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إنشاء سند قبض' : 'Create Receipt'}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'إجمالي السندات' : 'Total Receipts'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{receipts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-receipt text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'إجمالي المبالغ' : 'Total Amount'}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {receipts.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{language === 'ar' ? 'د.ع' : 'IQD'}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-money-bill-wave text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'اليوم' : 'Today'}
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {receipts.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar-day text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Receipts List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'رقم السند' : 'Receipt #'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'اسم العميل' : 'Customer'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {receipts.map((receipt) => {
                const methodInfo = paymentMethods.find(m => m.value === receipt.paymentMethod)
                return (
                  <tr key={receipt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {receipt.receiptNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {receipt.customerName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {receipt.customerPhone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600 dark:text-green-400">
                        {receipt.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {receipt.plan}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <i className={`fas ${methodInfo?.icon} ${methodInfo?.color}`}></i>
                        <span className="text-gray-900 dark:text-white">
                          {language === 'ar' ? methodInfo?.labelAr : methodInfo?.labelEn}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 dark:text-white">{receipt.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{receipt.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(receipt)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                          title={language === 'ar' ? 'عرض' : 'View'}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => handlePrint(receipt)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                          title={language === 'ar' ? 'طباعة' : 'Print'}
                        >
                          <i className="fas fa-print"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Receipt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-file-invoice-dollar"></i>
                {language === 'ar' ? 'إنشاء سند قبض جديد' : 'Create New Receipt'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={receiptData.customerName}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      value={receiptData.customerPhone}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'تفاصيل الدفع' : 'Payment Details'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الدفع مقابل' : 'Payment For'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={receiptData.paymentFor}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, paymentFor: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="subscription">{language === 'ar' ? 'اشتراك جديد' : 'New Subscription'}</option>
                      <option value="renewal">{language === 'ar' ? 'تجديد اشتراك' : 'Renewal'}</option>
                      <option value="branch">{language === 'ar' ? 'فرع جديد' : 'New Branch'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الباقة' : 'Plan'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={receiptData.plan}
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
                      {language === 'ar' ? 'المبلغ' : 'Amount'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={receiptData.amount}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={receiptData.date}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map(method => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setReceiptData(prev => ({ ...prev, paymentMethod: method.value }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        receiptData.paymentMethod === method.value
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                      }`}
                    >
                      <i className={`fas ${method.icon} ${method.color} text-2xl mb-2`}></i>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? method.labelAr : method.labelEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  value={receiptData.notes}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {showViewModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'سند قبض' : 'Receipt Voucher'}
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-8" id="receipt-print">
              {/* Receipt Header */}
              <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'سند قبض' : 'Receipt Voucher'}
                </h2>
                <p className="text-xl font-mono font-bold text-blue-600">
                  {selectedReceipt.receiptNumber}
                </p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'التاريخ:' : 'Date:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedReceipt.date} - {selectedReceipt.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'استلمنا من:' : 'Received From:'}
                  </span>
                  <span className="text-gray-900 dark:text-white font-bold">{selectedReceipt.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'رقم الهاتف:' : 'Phone:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedReceipt.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'مقابل:' : 'For:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {selectedReceipt.paymentFor === 'subscription' 
                      ? (language === 'ar' ? 'اشتراك جديد' : 'New Subscription')
                      : selectedReceipt.paymentFor === 'renewal'
                      ? (language === 'ar' ? 'تجديد اشتراك' : 'Renewal')
                      : (language === 'ar' ? 'فرع جديد' : 'New Branch')
                    } - {selectedReceipt.plan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {language === 'ar' 
                      ? paymentMethods.find(m => m.value === selectedReceipt.paymentMethod)?.labelAr
                      : paymentMethods.find(m => m.value === selectedReceipt.paymentMethod)?.labelEn
                    }
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-600 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    {selectedReceipt.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {selectedReceipt.notes && (
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                    {language === 'ar' ? 'ملاحظات:' : 'Notes:'}
                  </p>
                  <p className="text-gray-900 dark:text-white">{selectedReceipt.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t-2 border-gray-300 pt-6 mt-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === 'ar' ? 'المصدر:' : 'Issued By:'}
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedReceipt.issuedBy}</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 w-48">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'التوقيع' : 'Signature'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => handlePrint(selectedReceipt)}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-print"></i>
                {language === 'ar' ? 'طباعة' : 'Print'}
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
