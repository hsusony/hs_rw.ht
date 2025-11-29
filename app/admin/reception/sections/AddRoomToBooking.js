'use client'
import { useState } from 'react'

export default function AddRoomToBooking({ language }) {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      bookingNumber: 'B-2024-101', 
      customerName: 'حسين الجبوري', 
      phone: '07701234567', 
      checkIn: '2024-11-23', 
      checkOut: '2024-11-26',
      currentRooms: [
        { number: '301', type: 'غرفة مزدوجة', price: 150000 }
      ],
      totalAmount: 450000
    },
    { 
      id: 2, 
      bookingNumber: 'B-2024-102', 
      customerName: 'زينب الفرات', 
      phone: '07809876543', 
      checkIn: '2024-11-24', 
      checkOut: '2024-11-28',
      currentRooms: [
        { number: '215', type: 'جناح', price: 250000 },
        { number: '216', type: 'جناح', price: 250000 }
      ],
      totalAmount: 2000000
    },
    { 
      id: 3, 
      bookingNumber: 'B-2024-103', 
      customerName: 'عمر التميمي', 
      phone: '07512345678', 
      checkIn: '2024-11-25', 
      checkOut: '2024-11-30',
      currentRooms: [
        { number: '408', type: 'ديلوكس', price: 200000 }
      ],
      totalAmount: 1000000
    },
    { 
      id: 4, 
      bookingNumber: 'B-2024-104', 
      customerName: 'نور العمارة', 
      phone: '07601234567', 
      checkIn: '2024-11-26', 
      checkOut: '2024-11-29',
      currentRooms: [
        { number: '112', type: 'غرفة فردية', price: 100000 },
        { number: '113', type: 'غرفة فردية', price: 100000 }
      ],
      totalAmount: 600000
    }
  ])
  
  const [availableRooms] = useState([
    { number: '105', type: 'single', typeAr: 'غرفة فردية', floor: 1, price: 100000 },
    { number: '108', type: 'single', typeAr: 'غرفة فردية', floor: 1, price: 100000 },
    { number: '203', type: 'double', typeAr: 'غرفة مزدوجة', floor: 2, price: 150000 },
    { number: '208', type: 'double', typeAr: 'غرفة مزدوجة', floor: 2, price: 150000 },
    { number: '210', type: 'double', typeAr: 'غرفة مزدوجة', floor: 2, price: 150000 },
    { number: '307', type: 'suite', typeAr: 'جناح', floor: 3, price: 250000 },
    { number: '309', type: 'suite', typeAr: 'جناح', floor: 3, price: 250000 },
    { number: '312', type: 'suite', typeAr: 'جناح', floor: 3, price: 250000 },
    { number: '405', type: 'deluxe', typeAr: 'ديلوكس', floor: 4, price: 200000 },
    { number: '410', type: 'deluxe', typeAr: 'ديلوكس', floor: 4, price: 200000 },
    { number: '415', type: 'deluxe', typeAr: 'ديلوكس', floor: 4, price: 200000 },
    { number: '502', type: 'suite', typeAr: 'جناح', floor: 5, price: 250000 }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredBookings = bookings.filter(booking =>
    booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.includes(searchTerm)
  )

  const filteredRooms = availableRooms.filter(room => 
    filterType === 'all' || room.type === filterType
  )

  const handleAddRoom = () => {
    if (!selectedRoom || !selectedBooking) return
    
    const room = availableRooms.find(r => r.number === selectedRoom)
    if (!room) return

    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking.id) {
        const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))
        const additionalAmount = room.price * nights
        
        return {
          ...booking,
          currentRooms: [...booking.currentRooms, { number: room.number, type: room.typeAr, price: room.price }],
          totalAmount: booking.totalAmount + additionalAmount
        }
      }
      return booking
    })
    
    setBookings(updatedBookings)
    setShowModal(false)
    setSelectedRoom('')
    setSelectedBooking(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'إضافة غرفة للحجز' : 'Add Room to Booking'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {language === 'ar' ? 'أضف غرف إضافية للحجوزات الموجودة' : 'Add additional rooms to existing bookings'}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{bookings.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات نشطة' : 'Active Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{availableRooms.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'غرف متاحة' : 'Available Rooms'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{bookings.reduce((sum, b) => sum + b.currentRooms.length, 0)}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي الغرف المحجوزة' : 'Total Booked Rooms'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي المبالغ' : 'Total Amount'}</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder={language === 'ar' ? 'بحث برقم الحجز، اسم الزبون، أو رقم الهاتف...' : 'Search by booking number, customer name, or phone...'} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
          </div>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
            {language === 'ar' ? 'بحث' : 'Search'}
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{booking.bookingNumber}</h3>
                  <p className="text-sm opacity-90">{language === 'ar' ? 'حجز نشط' : 'Active Booking'}</p>
                </div>
                <button 
                  onClick={() => { setSelectedBooking(booking); setShowModal(true); }} 
                  className="bg-white text-cyan-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  {language === 'ar' ? 'إضافة غرفة' : 'Add Room'}
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'اسم الزبون' : 'Customer Name'}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white" dir="ltr">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'تاريخ الدخول' : 'Check In'}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'ar' ? 'تاريخ المغادرة' : 'Check Out'}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{booking.checkOut}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'الغرف الحالية:' : 'Current Rooms:'}
                  </p>
                  <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm font-medium">
                    {booking.currentRooms.length} {language === 'ar' ? 'غرفة' : 'Rooms'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {booking.currentRooms.map((room, idx) => (
                    <div key={idx} className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{room.number}</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">{room.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-900 dark:text-blue-200">{room.price.toLocaleString()}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{language === 'ar' ? 'دينار/ليلة' : 'IQD/night'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}
                  </p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {booking.totalAmount.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Room Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">
                {language === 'ar' ? 'إضافة غرفة للحجز' : 'Add Room to Booking'}
              </h3>
              <p className="text-sm opacity-90 mt-1">
                {selectedBooking.bookingNumber} - {selectedBooking.customerName}
              </p>
            </div>
            
            <div className="p-6">
              {/* Room Type Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  {language === 'ar' ? 'تصفية حسب نوع الغرفة' : 'Filter by Room Type'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: language === 'ar' ? 'الكل' : 'All' },
                    { value: 'single', label: language === 'ar' ? 'فردية' : 'Single' },
                    { value: 'double', label: language === 'ar' ? 'مزدوجة' : 'Double' },
                    { value: 'suite', label: language === 'ar' ? 'جناح' : 'Suite' },
                    { value: 'deluxe', label: language === 'ar' ? 'ديلوكس' : 'Deluxe' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => setFilterType(type.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filterType === type.value
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Rooms */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  {language === 'ar' ? 'الغرف المتاحة' : 'Available Rooms'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.number}
                      onClick={() => setSelectedRoom(room.number)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedRoom === room.number
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">{room.number}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'ar' ? `الطابق ${room.floor}` : `Floor ${room.floor}`}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          room.type === 'suite' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                          room.type === 'deluxe' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                          room.type === 'double' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }`}>
                          {room.typeAr}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'ar' ? 'السعر/ليلة' : 'Price/Night'}
                          </span>
                          <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                            {room.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Room Summary */}
              {selectedRoom && (
                <div className="bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 rounded-xl p-4 mb-6">
                  <p className="text-sm font-medium text-cyan-900 dark:text-cyan-200 mb-2">
                    {language === 'ar' ? 'ملخص الإضافة' : 'Addition Summary'}
                  </p>
                  {(() => {
                    const room = availableRooms.find(r => r.number === selectedRoom)
                    const nights = Math.ceil((new Date(selectedBooking.checkOut) - new Date(selectedBooking.checkIn)) / (1000 * 60 * 60 * 24))
                    const additionalAmount = room.price * nights
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-cyan-800 dark:text-cyan-300">{language === 'ar' ? 'الغرفة المختارة:' : 'Selected Room:'}</span>
                          <span className="font-bold text-cyan-900 dark:text-cyan-100">{room.number} - {room.typeAr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-800 dark:text-cyan-300">{language === 'ar' ? 'عدد الليالي:' : 'Number of Nights:'}</span>
                          <span className="font-bold text-cyan-900 dark:text-cyan-100">{nights}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-800 dark:text-cyan-300">{language === 'ar' ? 'المبلغ الإضافي:' : 'Additional Amount:'}</span>
                          <span className="font-bold text-cyan-900 dark:text-cyan-100">{additionalAmount.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}</span>
                        </div>
                        <div className="border-t border-cyan-300 dark:border-cyan-600 pt-2 flex justify-between">
                          <span className="text-cyan-800 dark:text-cyan-300 font-medium">{language === 'ar' ? 'المبلغ الإجمالي الجديد:' : 'New Total Amount:'}</span>
                          <span className="text-xl font-bold text-cyan-900 dark:text-cyan-100">
                            {(selectedBooking.totalAmount + additionalAmount).toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}
                          </span>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleAddRoom}
                  disabled={!selectedRoom}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    selectedRoom
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {language === 'ar' ? 'إضافة الغرفة' : 'Add Room'}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedRoom('')
                    setSelectedBooking(null)
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
