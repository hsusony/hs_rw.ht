'use client'
import { useState } from 'react'

export default function CancelBooking({ language }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'إلغاء حجز' : 'Cancel Booking'}
      </h2>
      <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-sm text-red-700 dark:text-red-200">
          {language === 'ar' ? 'تنبيه: شروط الإلغاء تعتمد على إعدادات النظام وسياسة الفندق' : 'Warning: Cancellation terms depend on system settings and hotel policy'}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <input type="text" placeholder={language === 'ar' ? 'بحث عن رقم الحجز' : 'Search booking number'} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
    </div>
  )
}
