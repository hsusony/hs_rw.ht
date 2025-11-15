'use client'

import { useState } from 'react'

export default function Reservations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [reservationsList, setReservationsList] = useState([
    { id: 1, customerName: 'أحمد محمد', customerImage: 'https://randomuser.me/api/portraits/men/1.jpg', hotel: 'فندق الروضة', roomNumber: '105', checkIn: '2025-11-15', checkOut: '2025-11-18', status: 'confirmed' },
    { id: 2, customerName: 'سارة عبدالله', customerImage: 'https://randomuser.me/api/portraits/women/2.jpg', hotel: 'فندق النخيل', roomNumber: '201', checkIn: '2025-11-20', checkOut: '2025-11-25', status: 'pending' },
    { id: 3, customerName: 'خالد أحمد', customerImage: 'https://randomuser.me/api/portraits/men/3.jpg', hotel: 'فندق البستان', roomNumber: '205', checkIn: '2025-11-12', checkOut: '2025-11-14', status: 'confirmed' },
    { id: 4, customerName: 'نورة سعيد', customerImage: 'https://randomuser.me/api/portraits/women/4.jpg', hotel: 'فندق الواحة', roomNumber: '301', checkIn: '2025-11-18', checkOut: '2025-11-22', status: 'confirmed' },
  ])
  const [formData, setFormData] = useState({
    customerName: '',
    hotel: 'فندق الروضة',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    status: 'pending',
    guests: 1,
    phone: '',
    email: ''
  })

  const filters = [
    { value: 'all', label: 'الكل' },
    { value: 'today', label: 'اليوم' },
    { value: 'upcoming', label: 'القادمة' },
    { value: 'past', label: 'السابقة' },
    { value: 'confirmed', label: 'مؤكدة' },
    { value: 'pending', label: 'قيد الانتظار' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReservation = {
      id: Math.max(...reservationsList.map(r => r.id)) + 1,
      ...formData,
      customerImage: 'https://randomuser.me/api/portraits/men/10.jpg'
    }
    setReservationsList([...reservationsList, newReservation])
    setShowModal(false)
    setFormData({
      customerName: '',
      hotel: 'فندق الروضة',
      roomNumber: '',
      checkIn: '',
      checkOut: '',
      status: 'pending',
      guests: 1,
      phone: '',
      email: ''
    })
  }

  const handleCancel = (id) => {
    if (confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      setReservationsList(reservationsList.filter(r => r.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold">إدارة الحجوزات</h2>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث..."
              className="w-full px-4 py-2 border border-gray-300 rounded pl-10"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowModal(true)}>
            <i className="fas fa-plus ml-2"></i> حجز جديد
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
                filter === f.value
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الحجز</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم العميل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفندق/الغرفة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التواريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservationsList.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">#{reservation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={reservation.customerImage} alt="" />
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.hotel}</div>
                  <div className="text-sm text-gray-500">غرفة {reservation.roomNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div>من: {reservation.checkIn}</div>
                  <div>إلى: {reservation.checkOut}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 ml-3">
                    <i className="fas fa-eye"></i> عرض
                  </button>
                  <button 
                    onClick={() => handleCancel(reservation.id)}
                    className="text-red-600 hover:text-red-900">
                    <i className="fas fa-times"></i> إلغاء
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 sticky top-0">
              <h3 className="text-2xl font-black text-gray-900">حجز جديد</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    اسم العميل
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أدخل اسم العميل"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="07XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    الفندق
                  </label>
                  <select
                    value={formData.hotel}
                    onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="فندق الروضة">فندق الروضة</option>
                    <option value="فندق النخيل">فندق النخيل</option>
                    <option value="فندق البستان">فندق البستان</option>
                    <option value="فندق الواحة">فندق الواحة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    رقم الغرفة
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="مثال: 205"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    عدد الضيوف
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    تاريخ الوصول
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    تاريخ المغادرة
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    حالة الحجز
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="confirmed">مؤكد</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 gap-3 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-800 hover:bg-gray-100 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  تأكيد الحجز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
