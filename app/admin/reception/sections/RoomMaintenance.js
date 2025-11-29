'use client'
import { useState } from 'react'

export default function RoomMaintenance({ language }) {
  const [maintenanceRooms, setMaintenanceRooms] = useState([
    { id: 1, roomNumber: '201', issue: 'تسريب في الحمام', date: '2024-11-21' },
    { id: 2, roomNumber: '305', issue: 'تكييف لا يعمل', date: '2024-11-21' },
    { id: 3, roomNumber: '408', issue: 'مشكلة في الباب', date: '2024-11-20' },
    { id: 4, roomNumber: '112', issue: 'إضاءة معطلة', date: '2024-11-20' },
    { id: 5, roomNumber: '315', issue: 'تلفزيون معطل', date: '2024-11-19' },
    { id: 6, roomNumber: '509', issue: 'نافذة مكسورة', date: '2024-11-19' },
    { id: 7, roomNumber: '214', issue: 'مشكلة في السباكة', date: '2024-11-18' }
  ])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'صيانة غرفة' : 'Room Maintenance'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">5</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'صيانة عاجلة' : 'Urgent'}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">8</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'قيد العمل' : 'In Progress'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'تم إصلاحها' : 'Completed'}</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <tr>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'المشكلة' : 'Issue'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الأولوية' : 'Priority'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {maintenanceRooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{room.roomNumber}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{room.issue}</td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm">
                    {language === 'ar' ? 'عالية' : 'High'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{room.date}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                    {language === 'ar' ? 'قيد العمل' : 'In Progress'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
