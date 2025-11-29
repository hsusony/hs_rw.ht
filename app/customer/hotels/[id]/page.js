'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HotelDetailsPage({ params }) {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Mock hotel data (in real app, fetch by params.id)
  const hotel = {
    id: 1,
    name: 'فندق بغداد الملكي',
    nameEn: 'Baghdad Royal Hotel',
    stars: 5,
    rating: 4.8,
    reviewsCount: 234,
    governorate: 'بغداد',
    area: 'الكرادة',
    description: 'فندق فاخر من فئة 5 نجوم يقع على ضفاف نهر دجلة في منطقة الكرادة الراقية. يوفر الفندق إطلالات خلابة على النهر وخدمات عالمية المستوى',
    descriptionEn: 'Luxury 5-star hotel located on the banks of the Tigris River in the upscale Karada area. The hotel offers stunning river views and world-class services',
    services: [
      { icon: '📶', name: 'واي فاي مجاني', nameEn: 'Free WiFi' },
      { icon: '🏊', name: 'مسبح', nameEn: 'Swimming Pool' },
      { icon: '🍽️', name: 'مطعم', nameEn: 'Restaurant' },
      { icon: '🅿️', name: 'موقف سيارات', nameEn: 'Parking' },
      { icon: '💪', name: 'نادي رياضي', nameEn: 'Gym' },
      { icon: '🧖', name: 'سبا', nameEn: 'Spa' },
      { icon: '🛎️', name: 'خدمة الغرف 24/7', nameEn: '24/7 Room Service' },
      { icon: '🔒', name: 'خزنة', nameEn: 'Safe' }
    ],
    location: {
      address: 'شارع الكرادة داخل، بغداد، العراق',
      addressEn: 'Al-Karada Street, Baghdad, Iraq',
      lat: 33.3152,
      lng: 44.3661
    },
    rooms: [
      {
        id: 1,
        type: 'غرفة فردية',
        typeEn: 'Single Room',
        price: 150000,
        size: 25,
        beds: 1,
        capacity: 1,
        amenities: ['تلفاز', 'ميني بار', 'حمام خاص']
      },
      {
        id: 2,
        type: 'غرفة مزدوجة',
        typeEn: 'Double Room',
        price: 250000,
        size: 35,
        beds: 1,
        capacity: 2,
        amenities: ['تلفاز', 'ميني بار', 'حمام خاص', 'شرفة']
      },
      {
        id: 3,
        type: 'جناح',
        typeEn: 'Suite',
        price: 400000,
        size: 60,
        beds: 2,
        capacity: 4,
        amenities: ['تلفاز', 'ميني بار', 'حمام خاص', 'شرفة', 'غرفة معيشة', 'جاكوزي']
      },
      {
        id: 4,
        type: 'جناح ملكي',
        typeEn: 'Royal Suite',
        price: 650000,
        size: 100,
        beds: 3,
        capacity: 6,
        amenities: ['تلفاز', 'ميني بار', 'حمام خاص', 'شرفة', 'غرفة معيشة', 'جاكوزي', 'مطبخ صغير', 'إطلالة على النهر']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'أحمد محمد',
        rating: 5,
        date: '2024-11-15',
        comment: 'فندق رائع! الموظفون محترفون والغرف نظيفة جداً. الإطلالة على النهر خيالية'
      },
      {
        id: 2,
        name: 'سارة علي',
        rating: 4.5,
        date: '2024-11-10',
        comment: 'تجربة ممتازة، الطعام في المطعم لذيذ والخدمة سريعة'
      },
      {
        id: 3,
        name: 'محمد حسن',
        rating: 5,
        date: '2024-11-05',
        comment: 'أفضل فندق في بغداد بدون منازع. المسبح والسبا رائعين'
      }
    ]
  }

  const calculateTotal = () => {
    if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) return 0
    const start = new Date(bookingData.checkIn)
    const end = new Date(bookingData.checkOut)
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return selectedRoom.price * nights
  }

  const handleBooking = () => {
    if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) {
      alert(language === 'ar' ? 'الرجاء تعبئة جميع الحقول' : 'Please fill all fields')
      return
    }
    // In real app, process booking
    alert(language === 'ar' ? 'تم الحجز بنجاح!' : 'Booking successful!')
    setShowBookingModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {language === 'ar' ? 'رجوع' : 'Back'}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-bold"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hotel Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? hotel.name : hotel.nameEn}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-yellow-500 text-2xl">
                  {Array(hotel.stars).fill(0).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-lg">
                    {hotel.rating}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({hotel.reviewsCount} {language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{language === 'ar' ? hotel.location.address : hotel.location.addressEn}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {language === 'ar' ? hotel.description : hotel.descriptionEn}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview' },
                { id: 'rooms', label: language === 'ar' ? 'الغرف' : 'Rooms' },
                { id: 'services', label: language === 'ar' ? 'الخدمات' : 'Services' },
                { id: 'reviews', label: language === 'ar' ? 'التقييمات' : 'Reviews' },
                { id: 'location', label: language === 'ar' ? 'الموقع' : 'Location' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-bold whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'عن الفندق' : 'About Hotel'}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {language === 'ar' ? hotel.description : hotel.descriptionEn}
                </p>
              </div>
            )}

            {/* Rooms Tab */}
            {activeTab === 'rooms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.rooms.map(room => (
                  <div key={room.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                      {language === 'ar' ? room.type : room.typeEn}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span>📐</span>
                        <span>{room.size} {language === 'ar' ? 'متر مربع' : 'sqm'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span>🛏️</span>
                        <span>{room.beds} {language === 'ar' ? 'سرير' : 'bed(s)'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span>👥</span>
                        <span>{room.capacity} {language === 'ar' ? 'أشخاص' : 'guests'}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.map((amenity, i) => (
                        <span key={i} className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm font-semibold">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'السعر لليلة' : 'Per Night'}
                        </div>
                        <div className="text-2xl font-black text-blue-600">
                          {room.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </div>
                      </div>
                      <button
                        onClick={() => { setSelectedRoom(room); setShowBookingModal(true) }}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {hotel.services.map((service, i) => (
                  <div key={i} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? service.name : service.nameEn}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {hotel.reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg">{review.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                      </div>
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">
                        {review.rating} ⭐
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div>
                <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-bold">{language === 'ar' ? hotel.location.address : hotel.location.addressEn}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">
                  {language === 'ar' ? 'احجز غرفتك' : 'Book Your Room'}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {language === 'ar' ? selectedRoom?.type : selectedRoom?.typeEn}
                </h4>
                <div className="text-2xl font-black text-blue-600">
                  {selectedRoom?.price.toLocaleString()} {language === 'ar' ? 'د.ع / ليلة' : 'IQD / night'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ الوصول' : 'Check-in'}
                  </label>
                  <input
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ المغادرة' : 'Check-out'}
                  </label>
                  <input
                    type="date"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عدد الأشخاص' : 'Number of Guests'}
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedRoom?.capacity}
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                />
              </div>

              {calculateTotal() > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>{language === 'ar' ? 'المجموع الكلي' : 'Total'}</span>
                    <span className="text-2xl text-blue-600">{calculateTotal().toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-black text-lg hover:shadow-xl transition-all"
              >
                {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
