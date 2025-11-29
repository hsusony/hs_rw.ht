'use client'
import { useState } from 'react'

export default function CheckOut({ language }) {
  const [checkouts, setCheckouts] = useState([
    { id: 1, roomNumber: '101', customerName: 'علي السعدي', totalAmount: 450000, paid: 450000, balance: 0 },
    { id: 2, roomNumber: '203', customerName: 'فاطمة العباسي', totalAmount: 600000, paid: 400000, balance: 200000 },
    { id: 3, roomNumber: '308', customerName: 'محمد الحسيني', totalAmount: 350000, paid: 350000, balance: 0 },
    { id: 4, roomNumber: '412', customerName: 'ليلى الحيدري', totalAmount: 750000, paid: 500000, balance: 250000 },
    { id: 5, roomNumber: '207', customerName: 'عمر الكاظمي', totalAmount: 400000, paid: 300000, balance: 100000 },
    { id: 6, roomNumber: '315', customerName: 'سارة السامرائي', totalAmount: 550000, paid: 550000, balance: 0 },
    { id: 7, roomNumber: '109', customerName: 'حسن النجفي', totalAmount: 300000, paid: 200000, balance: 100000 },
    { id: 8, roomNumber: '404', customerName: 'زينب الموصلية', totalAmount: 500000, paid: 500000, balance: 0 }
  ])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'مغادرة - تسوية الحساب' : 'Check Out - Settlement'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">8</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'متوقع اليوم' : 'Expected Today'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">5</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'تم التسوية' : 'Settled'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">3</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'متأخر' : 'Late'}</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الزبون' : 'Customer'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ الكلي' : 'Total'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المدفوع' : 'Paid'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المتبقي' : 'Balance'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {checkouts.map((co) => (
                <tr key={co.id}>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{co.roomNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{co.customerName}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{co.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">{co.paid.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">{co.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      {language === 'ar' ? 'مغادرة' : 'Check Out'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
