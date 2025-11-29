'use client'
import { useState } from 'react'

export default function WakeUpCall({ language }) {
  const [wakeCalls, setWakeCalls] = useState([
    { id: 1, roomNumber: '301', customerName: 'أحمد الموصلي', date: '2024-11-22', time: '06:00' },
    { id: 2, roomNumber: '205', customerName: 'فاطمة البصرية', date: '2024-11-22', time: '06:30' },
    { id: 3, roomNumber: '412', customerName: 'محمد العراقي', date: '2024-11-22', time: '07:00' },
    { id: 4, roomNumber: '108', customerName: 'سارة الكربلائية', date: '2024-11-22', time: '07:30' },
    { id: 5, roomNumber: '315', customerName: 'عمر النجفي', date: '2024-11-22', time: '08:00' }
  ])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'منبه غرفة' : 'Wake Up Call'}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'رقم الغرفة' : 'Room Number'}</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'التاريخ' : 'Date'}</label>
            <input type="date" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'الوقت' : 'Time'}</label>
            <input type="time" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl mt-4">{language === 'ar' ? 'جدولة المنبه' : 'Schedule Wake Up Call'}</button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الزبون' : 'Customer'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الوقت' : 'Time'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {wakeCalls.map((call) => (
              <tr key={call.id}>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{call.roomNumber}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{call.customerName}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{call.date}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{call.time}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    {language === 'ar' ? 'مجدول' : 'Scheduled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-red-500 hover:text-red-700">{language === 'ar' ? 'إلغاء' : 'Cancel'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
