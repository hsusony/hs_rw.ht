'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Reservations() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
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
    { value: 'all', label: t.all },
    { value: 'today', label: language === 'ar' ? 'اليوم' : 'Today' },
    { value: 'upcoming', label: language === 'ar' ? 'القادمة' : 'Upcoming' },
    { value: 'past', label: language === 'ar' ? 'السابقة' : 'Past' },
    { value: 'confirmed', label: t.confirmed },
    { value: 'pending', label: t.pending },
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
    if (confirm(language === 'ar' ? 'هل أنت متأكد من إلغاء هذا الحجز؟' : 'Are you sure you want to cancel this reservation?')) {
      setReservationsList(reservationsList.filter(r => r.id !== id))
    }
  }

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation)
    setShowDetailsModal(true)
  }

  const getFilteredReservations = () => {
    const today = new Date().toISOString().split('T')[0]
    
    return reservationsList.filter(reservation => {
      // تطبيق البحث
      const matchesSearch = searchTerm === '' || 
        reservation.customerName.includes(searchTerm) ||
        reservation.hotel.includes(searchTerm) ||
        reservation.roomNumber.includes(searchTerm)
      
      // تطبيق الفلترة
      let matchesFilter = true
      if (filter === 'today') {
        matchesFilter = reservation.checkIn === today
      } else if (filter === 'upcoming') {
        matchesFilter = reservation.checkIn > today
      } else if (filter === 'past') {
        matchesFilter = reservation.checkOut < today
      } else if (filter === 'confirmed') {
        matchesFilter = reservation.status === 'confirmed'
      } else if (filter === 'pending') {
        matchesFilter = reservation.status === 'pending'
      }
      
      return matchesSearch && matchesFilter
    })
  }

  const filteredReservations = getFilteredReservations()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold">{t.reservationManagement}</h2>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowModal(true)}>
            <i className="fas fa-plus ml-2"></i> {language === 'ar' ? 'حجز جديد' : 'New Reservation'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
                filter === f.value
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t.reservationNumber}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'ar' ? 'اسم العميل' : 'Customer Name'}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'ar' ? 'الفندق/الغرفة' : 'Hotel/Room'}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'ar' ? 'التواريخ' : 'Dates'}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t.status}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-search text-gray-400 dark:text-gray-500 text-4xl mb-3"></i>
                    <p className="text-lg font-bold text-gray-600 dark:text-gray-400">{language === 'ar' ? 'لا توجد نتائج' : 'No results'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{language === 'ar' ? 'جرب تغيير معايير البحث أو الفلترة' : 'Try changing search or filter criteria'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#{reservation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image src={reservation.customerImage} alt="Customer" width={40} height={40} className="object-cover" unoptimized />
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{reservation.customerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{reservation.hotel}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'غرفة' : 'Room'} {reservation.roomNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>{language === 'ar' ? 'من' : 'From'}: {reservation.checkIn}</div>
                    <div>{language === 'ar' ? 'إلى' : 'To'}: {reservation.checkOut}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reservation.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status === 'confirmed' ? t.confirmed : t.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleViewDetails(reservation)}
                      className="text-blue-600 hover:text-blue-900 ml-3 font-bold"
                    >
                      <i className="fas fa-eye"></i> {language === 'ar' ? 'عرض' : 'View'}
                    </button>
                    <button 
                      onClick={() => handleCancel(reservation.id)}
                      className="text-red-600 hover:text-red-900">
                      <i className="fas fa-times"></i> {t.cancel}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 sticky top-0">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{language === 'ar' ? 'حجز جديد' : 'New Reservation'}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'أدخل اسم العميل' : 'Enter customer name'}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="07XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.hotel}
                  </label>
                  <select
                    value={formData.hotel}
                    onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="فندق الروضة">فندق الروضة</option>
                    <option value="فندق النخيل">فندق النخيل</option>
                    <option value="فندق البستان">فندق البستان</option>
                    <option value="فندق الواحة">فندق الواحة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.roomNumber}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'مثال: 205' : 'e.g.: 205'}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.checkIn}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.checkOut}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'حالة الحجز' : 'Reservation Status'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pending">{t.pending}</option>
                    <option value="confirmed">{t.confirmed}</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{language === 'ar' ? 'تفاصيل الحجز' : 'Reservation Details'} #{selectedReservation.id}</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedReservation(null)
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center mb-8 pb-6 border-b-2 border-gray-200 dark:border-gray-700">
                <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-100 dark:border-gray-600 relative flex-shrink-0">
                  <Image 
                    src={selectedReservation.customerImage} 
                    alt={selectedReservation.customerName}
                    width={96}
                    height={96}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="mr-6">
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white">{selectedReservation.customerName}</h4>
                  <span className={`inline-block mt-2 px-4 py-2 text-sm font-black rounded-xl shadow-md ${
                    selectedReservation.status === 'confirmed'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {selectedReservation.status === 'confirmed' ? t.confirmed : t.pending}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-blue-200 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-hotel text-blue-600 dark:text-blue-400 text-xl ml-3"></i>
                    <span className="text-base font-bold text-gray-600 dark:text-gray-300">{t.hotel}</span>
                  </div>
                  <p className="text-xl font-black text-gray-900 dark:text-white mr-9">{selectedReservation.hotel}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-purple-200 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-door-open text-purple-600 dark:text-purple-400 text-xl ml-3"></i>
                    <span className="text-base font-bold text-gray-600 dark:text-gray-300">{t.roomNumber}</span>
                  </div>
                  <p className="text-xl font-black text-gray-900 dark:text-white mr-9">{selectedReservation.roomNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-green-200 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-calendar-check text-green-600 dark:text-green-400 text-lg ml-2"></i>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{t.checkIn}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white">{selectedReservation.checkIn}</p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-red-200 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-calendar-times text-red-600 dark:text-red-400 text-lg ml-2"></i>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{t.checkOut}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white">{selectedReservation.checkOut}</p>
                  </div>
                </div>

                {selectedReservation.phone && (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-indigo-200 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-phone text-indigo-600 dark:text-indigo-400 text-xl ml-3"></i>
                      <span className="text-base font-bold text-gray-600 dark:text-gray-300">{t.phone}</span>
                    </div>
                    <p className="text-xl font-black text-gray-900 dark:text-white mr-9">{selectedReservation.phone || (language === 'ar' ? 'غير متوفر' : 'Not available')}</p>
                  </div>
                )}

                {selectedReservation.email && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-pink-200 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-envelope text-pink-600 dark:text-pink-400 text-xl ml-3"></i>
                      <span className="text-base font-bold text-gray-600 dark:text-gray-300">{t.email}</span>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white mr-9">{selectedReservation.email || (language === 'ar' ? 'غير متوفر' : 'Not available')}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedReservation(null)
                  }}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  {t.close}
                </button>
                <button
                  onClick={() => {
                    handleCancel(selectedReservation.id)
                    setShowDetailsModal(false)
                    setSelectedReservation(null)
                  }}
                  className="px-6 py-3 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <i className="fas fa-times ml-2"></i> {language === 'ar' ? 'إلغاء الحجز' : 'Cancel Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
