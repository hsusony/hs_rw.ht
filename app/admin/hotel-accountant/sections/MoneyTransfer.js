'use client'
import { useState } from 'react'

export default function MoneyTransfer({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [transfers, setTransfers] = useState([
    {
      id: 1,
      fromFund: 'صندوق الريسبشن',
      toFund: 'بنك بغداد - الفرع الرئيسي',
      amount: 18000000,
      date: '2025-11-20',
      notes: 'إيداع إيرادات الحجوزات اليومية والخدمات الإضافية',
      status: 'completed'
    },
    {
      id: 2,
      fromFund: 'بنك بغداد - الفرع الرئيسي',
      toFund: 'صندوق الرواتب',
      amount: 15000000,
      date: '2025-11-19',
      notes: 'تحويل لدفع رواتب الموظفين لشهر نوفمبر',
      status: 'completed'
    },
    {
      id: 3,
      fromFund: 'بطاقة فيزا',
      toFund: 'بنك بغداد - الفرع الرئيسي',
      amount: 9500000,
      date: '2025-11-21',
      notes: 'تحصيل مدفوعات بطاقات الائتمان من النزلاء',
      status: 'completed'
    }
  ])

  const [formData, setFormData] = useState({
    fromFund: '',
    toFund: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const funds = [
    'صندوق الريسبشن',
    'البنك المركزي',
    'بطاقة فيزا',
    'بطاقة ماستركارد',
    'صندوق المصروفات',
    'صندوق الرواتب'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTransfer = {
      id: transfers.length + 1,
      ...formData,
      status: 'completed'
    }
    setTransfers([newTransfer, ...transfers])
    setShowModal(false)
    setFormData({
      fromFund: '',
      toFund: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
  }

  const totalTransferred = transfers.reduce((sum, t) => sum + Number(t.amount), 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'نقل الأموال' : 'Money Transfer'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة التحويلات بين الصناديق والحسابات' : 'Manage transfers between funds and accounts'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'تحويل جديد' : 'New Transfer'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-exchange-alt text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'إجمالي التحويلات' : 'Total Transfers'}</span>
          </div>
          <p className="text-3xl font-bold">{transfers.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-money-bill-transfer text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
          </div>
          <p className="text-3xl font-bold">{totalTransferred.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-check-circle text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'مكتملة' : 'Completed'}</span>
          </div>
          <p className="text-3xl font-bold">{transfers.filter(t => t.status === 'completed').length}</p>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'من' : 'From'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'إلى' : 'To'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الملاحظات' : 'Notes'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{transfer.fromFund}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{transfer.toFund}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{Number(transfer.amount).toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{transfer.date}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{transfer.notes}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transfer.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {transfer.status === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') : (language === 'ar' ? 'قيد الانتظار' : 'Pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transfer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تحويل جديد' : 'New Transfer'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'من صندوق' : 'From Fund'}
                  </label>
                  <select
                    value={formData.fromFund}
                    onChange={(e) => setFormData({...formData, fromFund: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر الصندوق' : 'Select Fund'}</option>
                    {funds.map((fund) => (
                      <option key={fund} value={fund}>{fund}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'إلى صندوق' : 'To Fund'}
                  </label>
                  <select
                    value={formData.toFund}
                    onChange={(e) => setFormData({...formData, toFund: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر الصندوق' : 'Select Fund'}</option>
                    {funds.filter(f => f !== formData.fromFund).map((fund) => (
                      <option key={fund} value={fund}>{fund}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المبلغ (د.ع)' : 'Amount (IQD)'}
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الملاحظات' : 'Notes'}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all"
                >
                  {language === 'ar' ? 'حفظ التحويل' : 'Save Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
