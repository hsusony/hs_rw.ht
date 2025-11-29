'use client'
import { useState } from 'react'

export default function GroupBooking({ language }) {
  const [groupBookings, setGroupBookings] = useState([
    { id: 1, groupNumber: 'G-2024-001', tourCompany: 'شركة النور للسياحة', numberOfRooms: 5, numberOfGuests: 12, checkIn: '2024-11-25', checkOut: '2024-11-28', totalAmount: 2250000, commission: 15, nights: 3 },
    { id: 2, groupNumber: 'G-2024-002', tourCompany: 'سفريات بغداد', numberOfRooms: 8, numberOfGuests: 20, checkIn: '2024-11-26', checkOut: '2024-11-30', totalAmount: 4080000, commission: 20, nights: 4 },
    { id: 3, groupNumber: 'G-2024-003', tourCompany: 'الرفدين للسياحة', numberOfRooms: 3, numberOfGuests: 8, checkIn: '2024-11-27', checkOut: '2024-11-29', totalAmount: 900000, commission: 10, nights: 2 },
    { id: 4, groupNumber: 'G-2024-004', tourCompany: 'مجموعة الفرات', numberOfRooms: 6, numberOfGuests: 15, checkIn: '2024-11-28', checkOut: '2024-12-01', totalAmount: 2700000, commission: 12, nights: 3 }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [tourCompanies] = useState([
    { id: 1, name: 'شركة النور للسياحة', commission: 15 },
    { id: 2, name: 'سفريات بغداد', commission: 20 },
    { id: 3, name: 'الرفدين للسياحة', commission: 10 },
    { id: 4, name: 'مجموعة الفرات', commission: 12 },
    { id: 5, name: 'شركة دجلة للسياحة', commission: 18 },
    { id: 6, name: 'السندباد للسفر', commission: 14 }
  ])
  
  const [formData, setFormData] = useState({
    tourCompanyId: '',
    numberOfRooms: '',
    numberOfGuests: '',
    checkIn: '',
    checkOut: '',
    pricePerRoom: '',
    specialRequests: '',
    contactPerson: '',
    contactPhone: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const company = tourCompanies.find(c => c.id === parseInt(formData.tourCompanyId))
    const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
    const subtotal = parseFloat(formData.pricePerRoom) * parseInt(formData.numberOfRooms) * nights
    const commissionAmount = subtotal * (company.commission / 100)
    const totalAmount = subtotal - commissionAmount
    
    const newBooking = {
      id: groupBookings.length + 1,
      groupNumber: `G-2024-${String(groupBookings.length + 2).padStart(3, '0')}`,
      tourCompany: company.name,
      numberOfRooms: parseInt(formData.numberOfRooms),
      numberOfGuests: parseInt(formData.numberOfGuests),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      totalAmount: totalAmount,
      commission: company.commission,
      nights: nights
    }
    
    setGroupBookings([newBooking, ...groupBookings])
    setShowModal(false)
    setFormData({
      tourCompanyId: '',
      numberOfRooms: '',
      numberOfGuests: '',
      checkIn: '',
      checkOut: '',
      pricePerRoom: '',
      specialRequests: '',
      contactPerson: '',
      contactPhone: '',
      notes: ''
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'حجز كروبات' : 'Group Booking'}
        </h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
          <span className="text-xl">+</span> {language === 'ar' ? 'حجز كروب جديد' : 'New Group Booking'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{groupBookings.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات كروبات' : 'Group Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">15</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي الغرف' : 'Total Rooms'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">30</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي النزلاء' : 'Total Guests'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">6.75M</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي المبلغ' : 'Total Amount'}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم الكروب' : 'Group #'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الشركة السياحية' : 'Tour Company'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'عدد الغرف' : 'Rooms'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'عدد النزلاء' : 'Guests'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الدخول' : 'Check In'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المغادرة' : 'Check Out'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ الكلي' : 'Total'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {groupBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.groupNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.tourCompany}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.numberOfRooms}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.numberOfGuests}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{booking.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-700">{language === 'ar' ? 'عرض' : 'View'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Group Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">
                {language === 'ar' ? 'إضافة حجز كروب جديد' : 'Add New Group Booking'}
              </h3>
              <p className="text-sm opacity-90 mt-1">
                {language === 'ar' ? 'حجز جماعي للشركات السياحية' : 'Group booking for tour companies'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Tour Company Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'معلومات الشركة السياحية' : 'Tour Company Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'الشركة السياحية *' : 'Tour Company *'}
                    </label>
                    <select
                      required
                      value={formData.tourCompanyId}
                      onChange={(e) => setFormData({...formData, tourCompanyId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">{language === 'ar' ? 'اختر الشركة' : 'Select Company'}</option>
                      {tourCompanies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.name} - {language === 'ar' ? 'عمولة' : 'Commission'} {company.commission}%
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'رقم الهاتف' : 'Contact Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Group Details */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                  {language === 'ar' ? 'تفاصيل الكروب' : 'Group Details'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'عدد الغرف *' : 'Number of Rooms *'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.numberOfRooms}
                      onChange={(e) => setFormData({...formData, numberOfRooms: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'عدد النزلاء *' : 'Number of Guests *'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData({...formData, numberOfGuests: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      {language === 'ar' ? 'سعر الغرفة/ليلة *' : 'Price Per Room/Night *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.pricePerRoom}
                      onChange={(e) => setFormData({...formData, pricePerRoom: e.target.value})}
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

              {/* Special Requests */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {language === 'ar' ? 'الطلبات الخاصة' : 'Special Requests'}
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  rows="2"
                  placeholder={language === 'ar' ? 'مثال: غرف متجاورة، طابق واحد، إفطار مبكر...' : 'Example: Adjacent rooms, same floor, early breakfast...'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
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

              {/* Calculation Summary */}
              {formData.tourCompanyId && formData.numberOfRooms && formData.pricePerRoom && formData.checkIn && formData.checkOut && (
                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4 mb-6">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-200 mb-3">
                    {language === 'ar' ? 'ملخص التكلفة' : 'Cost Summary'}
                  </p>
                  {(() => {
                    const company = tourCompanies.find(c => c.id === parseInt(formData.tourCompanyId))
                    const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
                    const subtotal = parseFloat(formData.pricePerRoom || 0) * parseInt(formData.numberOfRooms || 0) * nights
                    const commissionAmount = subtotal * (company?.commission || 0) / 100
                    const total = subtotal - commissionAmount
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-purple-800 dark:text-purple-300">{language === 'ar' ? 'عدد الليالي:' : 'Number of Nights:'}</span>
                          <span className="font-bold text-purple-900 dark:text-purple-100">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-800 dark:text-purple-300">{language === 'ar' ? 'المبلغ قبل العمولة:' : 'Subtotal:'}</span>
                          <span className="font-bold text-purple-900 dark:text-purple-100">{subtotal.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-800 dark:text-purple-300">{language === 'ar' ? 'العمولة' : 'Commission'} ({company?.commission}%):</span>
                          <span className="font-bold text-red-600 dark:text-red-400">- {commissionAmount.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}</span>
                        </div>
                        <div className="border-t border-purple-300 dark:border-purple-600 pt-2 flex justify-between">
                          <span className="text-purple-800 dark:text-purple-300 font-medium">{language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}</span>
                          <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                            {total.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}
                          </span>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  {language === 'ar' ? 'تأكيد حجز الكروب' : 'Confirm Group Booking'}
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
