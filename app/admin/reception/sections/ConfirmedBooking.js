'use client'
import { useState } from 'react'

export default function ConfirmedBooking({ language }) {
  const [bookings, setBookings] = useState([
    { id: 1, bookingNumber: 'B-2024-001', customerName: 'حسين الجبوري', roomNumber: '301', checkIn: '2024-11-23', checkOut: '2024-11-26', totalAmount: 450000, paid: 200000, status: 'confirmed' },
    { id: 2, bookingNumber: 'B-2024-002', customerName: 'زينب الفرات', roomNumber: '215', checkIn: '2024-11-24', checkOut: '2024-11-28', totalAmount: 600000, paid: 300000, status: 'confirmed' },
    { id: 3, bookingNumber: 'B-2024-003', customerName: 'عمر التميمي', roomNumber: '408', checkIn: '2024-11-25', checkOut: '2024-11-30', totalAmount: 750000, paid: 400000, status: 'confirmed' },
    { id: 4, bookingNumber: 'B-2024-004', customerName: 'نور العمارة', roomNumber: '112', checkIn: '2024-11-26', checkOut: '2024-11-29', totalAmount: 450000, paid: 450000, status: 'confirmed' },
    { id: 5, bookingNumber: 'B-2024-005', customerName: 'أحمد الرفاعي', roomNumber: '505', checkIn: '2024-11-27', checkOut: '2024-12-01', totalAmount: 800000, paid: 350000, status: 'confirmed' }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    roomNumber: '',
    roomType: 'single',
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    pricePerNight: '',
    advancePayment: '',
    paymentMethod: 'cash',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
    const totalAmount = nights * parseFloat(formData.pricePerNight || 0)
    
    const newBooking = {
      id: bookings.length + 1,
      bookingNumber: `B-2024-${String(bookings.length + 3).padStart(3, '0')}`,
      customerName: formData.customerName,
      roomNumber: formData.roomNumber,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      totalAmount: totalAmount,
      paid: parseFloat(formData.advancePayment || 0),
      status: 'confirmed'
    }
    setBookings([newBooking, ...bookings])
    setShowModal(false)
    setFormData({
      customerName: '',
      phone: '',
      roomNumber: '',
      roomType: 'single',
      checkIn: '',
      checkOut: '',
      numberOfGuests: 1,
      pricePerNight: '',
      advancePayment: '',
      paymentMethod: 'cash',
      notes: ''
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'حجز مؤكد' : 'Confirmed Booking'}
        </h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
          <span className="text-xl">+</span> {language === 'ar' ? 'حجز مؤكد جديد' : 'New Confirmed Booking'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{bookings.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات مؤكدة' : 'Confirmed Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">1,050,000</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي المبالغ' : 'Total Amount'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">450,000</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'المبالغ المدفوعة' : 'Paid Amount'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">600,000</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'المتبقي' : 'Remaining'}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم الحجز' : 'Booking #'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الزبون' : 'Customer'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرفة' : 'Room'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الدخول' : 'Check In'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المغادرة' : 'Check Out'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ الكلي' : 'Total'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المدفوع' : 'Paid'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.bookingNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.customerName}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.roomNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">{booking.paid.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">{language === 'ar' ? 'عرض' : 'View'}</button>
                      <button className="text-green-500 hover:text-green-700">{language === 'ar' ? 'دفع' : 'Pay'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Confirmed Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">
                {language === 'ar' ? 'إضافة حجز مؤكد جديد' : 'Add New Confirmed Booking'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Customer Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'معلومات الزبون' : 'Customer Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'اسم الزبون *' : 'Customer Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Room Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'معلومات الغرفة' : 'Room Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'رقم الغرفة *' : 'Room Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'نوع الغرفة' : 'Room Type'}
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="single">{language === 'ar' ? 'فردية' : 'Single'}</option>
                      <option value="double">{language === 'ar' ? 'مزدوجة' : 'Double'}</option>
                      <option value="suite">{language === 'ar' ? 'جناح' : 'Suite'}</option>
                      <option value="deluxe">{language === 'ar' ? 'ديلوكس' : 'Deluxe'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'عدد النزلاء' : 'Number of Guests'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData({...formData, numberOfGuests: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Dates */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'مواعيد الحجز' : 'Booking Dates'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'تاريخ الدخول *' : 'Check In Date *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'تاريخ المغادرة *' : 'Check Out Date *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'معلومات الدفع' : 'Payment Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'سعر الليلة *' : 'Price Per Night *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'الدفعة المقدمة *' : 'Advance Payment *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.advancePayment}
                      onChange={(e) => setFormData({...formData, advancePayment: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="cash">{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                      <option value="card">{language === 'ar' ? 'بطاقة' : 'Card'}</option>
                      <option value="transfer">{language === 'ar' ? 'تحويل' : 'Transfer'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
