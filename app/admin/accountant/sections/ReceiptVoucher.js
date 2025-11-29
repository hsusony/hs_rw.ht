'use client'
import { useState } from 'react'

export default function ReceiptVoucher({ language }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const vouchers = [
    {
      id: 1,
      voucherNo: 'RV-2025-001',
      hotel: 'فندق بغداد الكبير',
      hotelEn: 'Grand Baghdad Hotel',
      amount: 1200000,
      paymentMethod: 'تحويل بنكي',
      date: '2025-11-18',
      receivedBy: 'أحمد المحاسب',
      description: 'تجديد اشتراك سنوي - خطة الأعمال'
    },
    {
      id: 2,
      voucherNo: 'RV-2025-002',
      hotel: 'فندق النخيل',
      hotelEn: 'Al-Nakheel Hotel',
      amount: 800000,
      paymentMethod: 'نقداً',
      date: '2025-11-17',
      receivedBy: 'أحمد المحاسب',
      description: 'تجديد اشتراك - خطة متقدمة'
    },
    {
      id: 3,
      voucherNo: 'RV-2025-003',
      hotel: 'فندق الربيع',
      hotelEn: 'Al-Rabee Hotel',
      amount: 500000,
      paymentMethod: 'بطاقة ائتمان',
      date: '2025-11-16',
      receivedBy: 'أحمد المحاسب',
      description: 'دفعة اشتراك شهري'
    }
  ]

  const handleView = (voucher) => {
    setSelectedVoucher(voucher)
    setShowViewModal(true)
  }

  const handlePrint = (voucher) => {
    window.print()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم إضافة سند القبض بنجاح!' : 'Receipt voucher added successfully!')
    setShowAddModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'سندات القبض' : 'Receipt Vouchers'}
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'سند قبض جديد' : 'New Receipt'}
        </button>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'رقم السند' : 'Voucher No.'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'اسم الفندق' : 'Hotel Name'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-right font-semibold">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {voucher.voucherNo}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {language === 'ar' ? voucher.hotel : voucher.hotelEn}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600 dark:text-green-400">
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
                        onClick={() => handlePrint(voucher)}
                        className="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-all"
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

      {/* Add Receipt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-money-bill-wave"></i>
                {language === 'ar' ? 'سند قبض جديد' : 'New Receipt Voucher'}
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
                    defaultValue={`RV-2025-${String(vouchers.length + 1).padStart(3, '0')}`}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق' : 'Hotel Name'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر الفندق' : 'Select Hotel'}</option>
                    <option>فندق بغداد الكبير</option>
                    <option>فندق النخيل</option>
                    <option>فندق الربيع</option>
                    <option>فندق الزهور</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المبلغ المستلم (د.ع)' : 'Amount Received (IQD)'}
                  </label>
                  <input
                    type="number"
                    placeholder="1000000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر طريقة الدفع' : 'Select Method'}</option>
                    <option>{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                    <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                    <option>{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                    <option>{language === 'ar' ? 'شيك' : 'Check'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المستلم من' : 'Received From'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'اسم الشخص أو الجهة' : 'Person or Entity Name'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المستلم بواسطة' : 'Received By'}
                  </label>
                  <input
                    type="text"
                    defaultValue="أحمد المحاسب"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'البيان / الوصف' : 'Description'}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={language === 'ar' ? 'وصف الدفعة والغرض منها...' : 'Payment description and purpose...'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                  ></textarea>
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
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {showViewModal && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
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

            <div className="p-8">
              {/* Voucher Content */}
              <div className="border-2 border-green-600 rounded-xl p-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-green-600 mb-2">
                    {language === 'ar' ? 'سند قبض' : 'RECEIPT VOUCHER'}
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

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'استلمنا من:' : 'Received From:'}
                  </p>
                  <p className="font-bold text-xl text-gray-900 dark:text-white">
                    {language === 'ar' ? selectedVoucher.hotel : selectedVoucher.hotelEn}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المبلغ:' : 'Amount:'}
                  </p>
                  <p className="font-bold text-3xl text-green-600 dark:text-green-400">
                    {selectedVoucher.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}
                    </p>
                    <p className="font-semibold">{selectedVoucher.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'المستلم بواسطة:' : 'Received By:'}
                    </p>
                    <p className="font-semibold">{selectedVoucher.receivedBy}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'البيان:' : 'Description:'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{selectedVoucher.description}</p>
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
                        {language === 'ar' ? 'المدير المالي' : 'Financial Manager'}
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold"
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
