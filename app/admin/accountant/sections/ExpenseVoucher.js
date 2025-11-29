'use client'
import { useState } from 'react'

export default function ExpenseVoucher({ language }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const vouchers = [
    {
      id: 1,
      voucherNo: 'EV-2025-001',
      category: 'مصاريف إدارية',
      categoryEn: 'Administrative Expenses',
      amount: 200000,
      paymentMethod: 'نقداً',
      date: '2025-11-18',
      approvedBy: 'محمد الإداري',
      paidTo: 'مصاريف مكتبية متنوعة',
      description: 'شراء أدوات مكتبية وقرطاسية'
    },
    {
      id: 2,
      voucherNo: 'EV-2025-002',
      category: 'صيانة',
      categoryEn: 'Maintenance',
      amount: 150000,
      paymentMethod: 'تحويل بنكي',
      date: '2025-11-17',
      approvedBy: 'محمد الإداري',
      paidTo: 'فني الصيانة',
      description: 'إصلاح أجهزة الكمبيوتر والطابعات'
    },
    {
      id: 3,
      voucherNo: 'EV-2025-003',
      category: 'مواصلات',
      categoryEn: 'Transportation',
      amount: 80000,
      paymentMethod: 'نقداً',
      date: '2025-11-16',
      approvedBy: 'محمد الإداري',
      paidTo: 'سائق التوصيل',
      description: 'بدل مواصلات الموظفين'
    }
  ]

  const expenseCategories = [
    { ar: 'مصاريف إدارية', en: 'Administrative' },
    { ar: 'صيانة', en: 'Maintenance' },
    { ar: 'مواصلات', en: 'Transportation' },
    { ar: 'ضيافة', en: 'Hospitality' },
    { ar: 'اتصالات', en: 'Communications' },
    { ar: 'كهرباء وماء', en: 'Utilities' },
    { ar: 'تنظيف', en: 'Cleaning' },
    { ar: 'أمن وحراسة', en: 'Security' },
    { ar: 'تدريب', en: 'Training' },
    { ar: 'متنوعة', en: 'Miscellaneous' }
  ]

  const handleView = (voucher) => {
    setSelectedVoucher(voucher)
    setShowViewModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم إضافة سند الصرف بنجاح!' : 'Expense voucher added successfully!')
    setShowAddModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'سندات الصرف' : 'Expense Vouchers'}
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold shadow-lg"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'سند صرف جديد' : 'New Expense'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-receipt text-4xl opacity-80"></i>
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {language === 'ar' ? 'هذا الشهر' : 'This Month'}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</h3>
          <p className="text-3xl font-bold">430,000 {language === 'ar' ? 'د.ع' : 'IQD'}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-file-alt text-4xl opacity-80"></i>
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {language === 'ar' ? 'عدد السندات' : 'Count'}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'سندات الصرف' : 'Vouchers'}</h3>
          <p className="text-3xl font-bold">{vouchers.length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-chart-line text-4xl opacity-80"></i>
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {language === 'ar' ? 'متوسط' : 'Average'}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'متوسط المصروف' : 'Avg. Expense'}</h3>
          <p className="text-3xl font-bold">143,333 {language === 'ar' ? 'د.ع' : 'IQD'}</p>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'رقم السند' : 'Voucher No.'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'طريقة الدفع' : 'Method'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-orange-600 dark:text-orange-400 font-semibold">
                      {voucher.voucherNo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full text-sm font-semibold">
                      {language === 'ar' ? voucher.category : voucher.categoryEn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {voucher.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{voucher.paymentMethod}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{voucher.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(voucher)}
                        className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
                        title={language === 'ar' ? 'عرض' : 'View'}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-all"
                        title={language === 'ar' ? 'طباعة' : 'Print'}
                      >
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-receipt"></i>
                {language === 'ar' ? 'سند صرف جديد' : 'New Expense Voucher'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم السند' : 'Voucher Number'}
                  </label>
                  <input
                    type="text"
                    defaultValue={`EV-2025-${String(vouchers.length + 1).padStart(3, '0')}`}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تصنيف المصروف' : 'Expense Category'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر التصنيف' : 'Select Category'}</option>
                    {expenseCategories.map((cat, index) => (
                      <option key={index} value={cat.en}>
                        {language === 'ar' ? cat.ar : cat.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المبلغ (د.ع)' : 'Amount (IQD)'}
                  </label>
                  <input
                    type="number"
                    placeholder="100000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر الطريقة' : 'Select Method'}</option>
                    <option>{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                    <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                    <option>{language === 'ar' ? 'شيك' : 'Check'}</option>
                    <option>{language === 'ar' ? 'بطاقة شركة' : 'Company Card'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المدفوع إلى' : 'Paid To'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'اسم المستفيد' : 'Beneficiary Name'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المعتمد بواسطة' : 'Approved By'}
                  </label>
                  <input
                    type="text"
                    defaultValue="محمد الإداري"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'اختياري' : 'Optional'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'البيان / الوصف' : 'Description'}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={language === 'ar' ? 'تفاصيل المصروف...' : 'Expense details...'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white resize-none"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <i className="fas fa-paperclip ml-2"></i>
                    {language === 'ar' ? 'المرفقات (اختياري)' : 'Attachments (Optional)'}
                  </label>
                  <input
                    type="file"
                    multiple
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {language === 'ar' ? 'يمكنك إرفاق فواتير أو صور أو مستندات' : 'You can attach invoices, images or documents'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Expense Modal */}
      {showViewModal && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'سند صرف' : 'Expense Voucher'}
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-8">
              <div className="border-2 border-orange-600 rounded-xl p-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-orange-600 mb-2">
                    {language === 'ar' ? 'سند صرف' : 'EXPENSE VOUCHER'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'شركة NineSoft لإدارة الفنادق' : 'NineSoft Hotel Management'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'رقم السند:' : 'Voucher No:'}
                    </p>
                    <p className="font-bold text-lg">{selectedVoucher.voucherNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'التاريخ:' : 'Date:'}
                    </p>
                    <p className="font-bold text-lg">{selectedVoucher.date}</p>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'التصنيف:' : 'Category:'}
                  </p>
                  <p className="font-bold text-xl text-orange-600 dark:text-orange-400">
                    {language === 'ar' ? selectedVoucher.category : selectedVoucher.categoryEn}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'المبلغ:' : 'Amount:'}
                  </p>
                  <p className="font-bold text-3xl text-orange-600 dark:text-orange-400">
                    {selectedVoucher.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'المدفوع إلى:' : 'Paid To:'}
                    </p>
                    <p className="font-semibold">{selectedVoucher.paidTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}
                    </p>
                    <p className="font-semibold">{selectedVoucher.paymentMethod}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'البيان:' : 'Description:'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{selectedVoucher.description}</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 mb-6">
                  <p className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'المعتمد بواسطة:' : 'Approved By:'}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white mr-2">
                      {selectedVoucher.approvedBy}
                    </span>
                  </p>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'المستلم' : 'Receiver'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'المعتمد' : 'Approver'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
                >
                  <i className="fas fa-print ml-2"></i>
                  {language === 'ar' ? 'طباعة' : 'Print'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
