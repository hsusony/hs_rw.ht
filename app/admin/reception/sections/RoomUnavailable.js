'use client'
import { useState } from 'react'

export default function RoomUnavailable({ language }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'غرفة غير متاحة' : 'Room Unavailable'}
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'رقم الغرفة' : 'Room Number'}</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'السبب' : 'Reason'}</label>
          <select className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>{language === 'ar' ? 'صيانة' : 'Maintenance'}</option>
            <option>{language === 'ar' ? 'تجديد' : 'Renovation'}</option>
            <option>{language === 'ar' ? 'أخرى' : 'Other'}</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'من تاريخ' : 'From Date'}</label>
            <input type="date" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'إلى تاريخ' : 'To Date'}</label>
            <input type="date" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl">{language === 'ar' ? 'تعيين كغير متاحة' : 'Set Unavailable'}</button>
      </div>
    </div>
  )
}
