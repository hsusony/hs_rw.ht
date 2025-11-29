'use client'
import { useState } from 'react'

export default function RoomCleaning({ language }) {
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: '101', status: 'clean' },
    { id: 2, roomNumber: '102', status: 'clean' },
    { id: 3, roomNumber: '103', status: 'dirty' },
    { id: 4, roomNumber: '104', status: 'cleaning' },
    { id: 5, roomNumber: '105', status: 'clean' },
    { id: 6, roomNumber: '201', status: 'dirty' },
    { id: 7, roomNumber: '202', status: 'clean' },
    { id: 8, roomNumber: '203', status: 'cleaning' },
    { id: 9, roomNumber: '204', status: 'clean' },
    { id: 10, roomNumber: '205', status: 'dirty' },
    { id: 11, roomNumber: '301', status: 'clean' },
    { id: 12, roomNumber: '302', status: 'cleaning' },
    { id: 13, roomNumber: '303', status: 'clean' },
    { id: 14, roomNumber: '304', status: 'dirty' },
    { id: 15, roomNumber: '305', status: 'clean' },
    { id: 16, roomNumber: '401', status: 'dirty' },
    { id: 17, roomNumber: '402', status: 'clean' },
    { id: 18, roomNumber: '403', status: 'cleaning' },
    { id: 19, roomNumber: '404', status: 'clean' },
    { id: 20, roomNumber: '405', status: 'clean' }
  ])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'تنظيف غرفة' : 'Room Cleaning'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">45</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'نظيفة' : 'Clean'}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'متسخة' : 'Dirty'}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">8</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'قيد التنظيف' : 'Cleaning'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">15</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'تحتاج فحص' : 'Need Inspection'}</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
          {rooms.map((room) => (
            <div key={room.id} className={`p-4 rounded-xl border-2 cursor-pointer ${room.status === 'clean' ? 'border-green-500 bg-green-50 dark:bg-green-900' : room.status === 'dirty' ? 'border-red-500 bg-red-50 dark:bg-red-900' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900'}`}>
              <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">{room.roomNumber}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                {room.status === 'clean' ? (language === 'ar' ? 'نظيفة' : 'Clean') : room.status === 'dirty' ? (language === 'ar' ? 'متسخة' : 'Dirty') : (language === 'ar' ? 'قيد التنظيف' : 'Cleaning')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
