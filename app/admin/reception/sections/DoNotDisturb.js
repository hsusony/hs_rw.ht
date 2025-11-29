'use client'
import { useState } from 'react'

export default function DoNotDisturb({ language }) {
  const [dndRooms, setDndRooms] = useState([
    { id: 1, roomNumber: '301', customerName: 'علي السعيد', setTime: '22:00', duration: '8 ساعات' },
    { id: 2, roomNumber: '215', customerName: 'لينا الحيدري', setTime: '23:30', duration: '6 ساعات' },
    { id: 3, roomNumber: '408', customerName: 'محمد الجبوري', setTime: '21:00', duration: '10 ساعات' },
    { id: 4, roomNumber: '502', customerName: 'فاتن الكرخي', setTime: '20:00', duration: '12 ساعة' },
    { id: 5, roomNumber: '118', customerName: 'نادية النجفية', setTime: '22:30', duration: '8 ساعات' }
  ])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'عدم إزعاج' : 'Do Not Disturb'}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'رقم الغرفة' : 'Room Number'}</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'المدة (ساعات)' : 'Duration (hours)'}</label>
            <input type="number" defaultValue="8" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl mt-4">{language === 'ar' ? 'تفعيل عدم الإزعاج' : 'Activate DND'}</button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الزبون' : 'Customer'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'وقت التفعيل' : 'Set Time'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'المدة' : 'Duration'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {dndRooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{room.roomNumber}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{room.customerName}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{room.setTime}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{room.duration}</td>
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
