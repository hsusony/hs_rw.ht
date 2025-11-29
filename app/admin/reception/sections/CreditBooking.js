'use client'
import { useState } from 'react'

export default function CreditBooking({ language }) {
  const [creditBookings, setCreditBookings] = useState([
    { id: 1, bookingNumber: 'CR-2024-001', customerName: 'شركة النفط الوطنية', roomNumber: '501', totalAmount: 500000, dueDate: '2024-12-15' },
    { id: 2, bookingNumber: 'CR-2024-002', customerName: 'مستشفى الكرخ', roomNumber: '302', totalAmount: 350000, dueDate: '2024-12-10' },
    { id: 3, bookingNumber: 'CR-2024-003', customerName: 'شركة التعمير العراقية', roomNumber: '415', totalAmount: 450000, dueDate: '2024-12-20' },
    { id: 4, bookingNumber: 'CR-2024-004', customerName: 'مؤسسة الموانئ ', roomNumber: '208', totalAmount: 300000, dueDate: '2024-12-08' }
  ])
  
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'حجز أجل' : 'Credit Booking'}
        </h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
          <span className="text-xl">+</span> {language === 'ar' ? 'حجز أجل جديد' : 'New Credit Booking'}
        </button>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0"></div>
          <div className="mr-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              {language === 'ar' ? 'تنبيه: حجوزات الأجل تتطلب صلاحية خاصة ومصادقة المدير' : 'Warning: Credit bookings require special permission and manager approval'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{creditBookings.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات أجل' : 'Credit Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">1,050,000</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'المبالغ المستحقة' : 'Outstanding Amount'}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">3</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'قريبة من الاستحقاق' : 'Due Soon'}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم الحجز' : 'Booking #'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'العميل/الشركة' : 'Customer/Company'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {creditBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.bookingNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.customerName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.roomNumber}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-600 dark:text-red-400">{booking.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        {language === 'ar' ? 'موافق عليه' : 'Approved'}
                      </span>
                    </div>
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
