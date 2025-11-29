'use client'

import { useState } from 'react'

export default function AppCommissions({ language }) {
  const [commissions, setCommissions] = useState([
    {
      id: 1,
      appName: 'Booking.com',
      rate: 15,
      amount: 3750000,
      month: 'نوفمبر 2025',
      paid: true
    },
    {
      id: 2,
      appName: 'Agoda',
      rate: 12,
      amount: 2400000,
      month: 'نوفمبر 2025',
      paid: false
    },
    {
      id: 3,
      appName: 'Expedia',
      rate: 18,
      amount: 3150000,
      month: 'نوفمبر 2025',
      paid: true
    }
  ])
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedCommission, setSelectedCommission] = useState(null)

  const handlePayCommission = (commission) => {
    setSelectedCommission(commission)
    setShowPayModal(true)
  }

  const confirmPayment = () => {
    if (selectedCommission) {
      setCommissions(commissions.map(c => 
        c.id === selectedCommission.id ? { ...c, paid: true } : c
      ))
      setShowPayModal(false)
      setSelectedCommission(null)
    }
  }

  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0)
  const paidCommissions = commissions.filter(c => c.paid).reduce((sum, c) => sum + c.amount, 0)

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        {language === 'ar' ? 'عمولات تطبيقات الحجز' : 'Booking App Commissions'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-purple-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-percentage text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'إجمالي العمولات' : 'Total Commissions'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCommissions.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'المدفوعة' : 'Paid'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{paidCommissions.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'التطبيق' : 'App'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'نسبة العمولة' : 'Commission Rate'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الشهر' : 'Month'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{commission.appName}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{commission.rate}%</td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                  {commission.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{commission.month}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    commission.paid 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {commission.paid ? (language === 'ar' ? 'مدفوع' : 'Paid') : (language === 'ar' ? 'غير مدفوع' : 'Unpaid')}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {!commission.paid && (
                    <button
                      onClick={() => handlePayCommission(commission)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <i className="fas fa-money-bill mr-2"></i>
                      {language === 'ar' ? 'دفع' : 'Pay'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPayModal && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تأكيد دفع العمولة' : 'Confirm Commission Payment'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{language === 'ar' ? 'التطبيق' : 'Application'}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedCommission.appName}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{language === 'ar' ? 'المبلغ' : 'Amount'}</p>
                <p className="text-2xl font-bold text-purple-600">
                  {selectedCommission.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={confirmPayment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? 'تأكيد الدفع' : 'Confirm Payment'}
                </button>
                <button
                  onClick={() => { setShowPayModal(false); setSelectedCommission(null); }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

