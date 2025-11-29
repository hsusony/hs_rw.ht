'use client'
import { useState } from 'react'

export default function TempBooking({ language }) {
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'خالد الحلي', phone: '07701234567', roomNumber: '301', checkIn: '2024-11-23', checkOut: '2024-11-26', holdUntil: '2024-11-22 18:00', status: 'active' },
    { id: 2, customerName: 'رنا السماوة', phone: '07809876543', roomNumber: '215', checkIn: '2024-11-24', checkOut: '2024-11-27', holdUntil: '2024-11-22 20:00', status: 'active' },
    { id: 3, customerName: 'عبدالله العمارة', phone: '07512345678', roomNumber: '408', checkIn: '2024-11-25', checkOut: '2024-11-28', holdUntil: '2024-11-23 10:00', status: 'active' },
    { id: 4, customerName: 'مريم الناصرية', phone: '07601234567', roomNumber: '112', checkIn: '2024-11-23', checkOut: '2024-11-25', holdUntil: '2024-11-22 16:00', status: 'active' }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    holdHours: '24',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const holdUntil = new Date()
    holdUntil.setHours(holdUntil.getHours() + parseInt(formData.holdHours))
    
    const newBooking = {
      id: bookings.length + 1,
      ...formData,
      holdUntil: holdUntil.toLocaleString('ar-IQ'),
      status: 'active'
    }
    setBookings([newBooking, ...bookings])
    setShowModal(false)
    setFormData({ customerName: '', phone: '', roomNumber: '', checkIn: '', checkOut: '', holdHours: '24', notes: '' })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'حجز مؤقت' : 'Temporary Booking'}
        </h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
          <span className="text-xl">+</span> {language === 'ar' ? 'حجز مؤقت جديد' : 'New Temp Booking'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{bookings.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات مؤقتة' : 'Temp Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">18</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'تم التأكيد اليوم' : 'Confirmed Today'}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">5</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'منتهية الصلاحية' : 'Expired'}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'اسم الزبون' : 'Customer'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الدخول' : 'Check In'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المغادرة' : 'Check Out'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الصلاحية حتى' : 'Hold Until'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.customerName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400" dir="ltr">{booking.phone}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.roomNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-yellow-600 dark:text-yellow-400 font-medium">{booking.holdUntil}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                        {language === 'ar' ? 'تأكيد' : 'Confirm'}
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">{language === 'ar' ? 'حجز مؤقت جديد' : 'New Temporary Booking'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'اسم الزبون *' : 'Customer Name *'}</label>
                  <input type="text" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'الهاتف *' : 'Phone *'}</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'رقم الغرفة *' : 'Room Number *'}</label>
                  <input type="text" required value={formData.roomNumber} onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'مدة الاحتفاظ (ساعة)' : 'Hold Period (hours)'}</label>
                  <input type="number" value={formData.holdHours} onChange={(e) => setFormData({...formData, holdHours: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'تاريخ الدخول *' : 'Check In *'}</label>
                  <input type="date" required value={formData.checkIn} onChange={(e) => setFormData({...formData, checkIn: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'تاريخ المغادرة *' : 'Check Out *'}</label>
                  <input type="date" required value={formData.checkOut} onChange={(e) => setFormData({...formData, checkOut: e.target.value})} className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">{language === 'ar' ? 'ملاحظات' : 'Notes'}</label>
                  <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows="3" className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl">{language === 'ar' ? 'حفظ' : 'Save'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-500 text-white py-3 rounded-xl">{language === 'ar' ? 'إلغاء' : 'Cancel'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
