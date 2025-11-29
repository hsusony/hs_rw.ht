'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HotelsPage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filters State
  const [filters, setFilters] = useState({
    stars: [],
    rating: 0,
    governorate: 'all',
    area: 'all',
    priceLevel: 'all',
    priceRange: { min: 0, max: 1000000 }
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const [hotels] = useState([
    { id: 1, name: 'فندق بغداد الملكي', nameEn: 'Baghdad Royal Hotel', stars: 5, governorate: 'بغداد', area: 'الكرادة', price: 250000, priceLevel: 'luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', rating: 4.8, reviews: 234 },
    { id: 2, name: 'فندق أربيل الكبير', nameEn: 'Erbil Grand Hotel', stars: 5, governorate: 'أربيل', area: 'المركز', price: 220000, priceLevel: 'luxury', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400', rating: 4.7, reviews: 189 },
    { id: 3, name: 'فندق البصرة الدولي', nameEn: 'Basra International Hotel', stars: 4, governorate: 'البصرة', area: 'المعقل', price: 180000, priceLevel: 'upscale', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', rating: 4.5, reviews: 156 },
    { id: 4, name: 'فندق النجف الأشرف', nameEn: 'Najaf Al-Ashraf Hotel', stars: 4, governorate: 'النجف', area: 'المركز', price: 150000, priceLevel: 'upscale', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400', rating: 4.6, reviews: 142 },
    { id: 5, name: 'فندق كربلاء بلازا', nameEn: 'Karbala Plaza Hotel', stars: 4, governorate: 'كربلاء', area: 'المركز', price: 160000, priceLevel: 'upscale', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', rating: 4.4, reviews: 128 },
    { id: 6, name: 'فندق الموصل الحديث', nameEn: 'Modern Mosul Hotel', stars: 3, governorate: 'الموصل', area: 'المركز', price: 120000, priceLevel: 'moderate', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', rating: 4.2, reviews: 98 },
  ])

  const governorates = ['الكل', 'بغداد', 'البصرة', 'أربيل', 'النجف', 'كربلاء', 'الموصل', 'السليمانية', 'ديالى', 'الأنبار']
  const areas = {
    'بغداد': ['الكرادة', 'المنصور', 'الجادرية', 'الحارثية'],
    'البصرة': ['المعقل', 'العشار', 'البصرة القديمة'],
    'أربيل': ['المركز', 'الشرق', 'الغرب']
  }

  const filteredHotels = hotels.filter(hotel => {
    if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) return false
    if (filters.rating > 0 && hotel.rating < filters.rating) return false
    if (filters.governorate !== 'all' && hotel.governorate !== filters.governorate) return false
    if (filters.area !== 'all' && hotel.area !== filters.area) return false
    if (filters.priceLevel !== 'all' && hotel.priceLevel !== filters.priceLevel) return false
    if (hotel.price < filters.priceRange.min || hotel.price > filters.priceRange.max) return false
    return true
  })

  const toggleStar = (star) => {
    setFilters(prev => ({
      ...prev,
      stars: prev.stars.includes(star) 
        ? prev.stars.filter(s => s !== star)
        : [...prev.stars, star]
    }))
  }

  const resetFilters = () => {
    setFilters({
      stars: [],
      rating: 0,
      governorate: 'all',
      area: 'all',
      priceLevel: 'all',
      priceRange: { min: 0, max: 1000000 }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                {language === 'ar' ? 'استكشف الفنادق' : 'Explore Hotels'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg hover:shadow-lg transition-all"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* My Account */}
              <button
                onClick={() => router.push('/customer/account')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {language === 'ar' ? 'حسابي' : 'My Account'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-fit sticky top-24`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                {language === 'ar' ? 'الفلاتر' : 'Filters'}
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-bold"
              >
                {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Stars Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'عدد النجوم' : 'Star Rating'}
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <label key={star} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stars.includes(star)}
                        onChange={() => toggleStar(star)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <div className="flex text-yellow-500">
                        {Array(star).fill(0).map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'التقييم' : 'Rating'}
                </h3>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center text-sm font-bold text-gray-900 dark:text-white mt-2">
                  {filters.rating > 0 ? `${filters.rating}+ ⭐` : language === 'ar' ? 'الكل' : 'All'}
                </div>
              </div>

              {/* Governorate Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'المحافظة' : 'Governorate'}
                </h3>
                <select
                  value={filters.governorate}
                  onChange={(e) => setFilters({...filters, governorate: e.target.value, area: 'all'})}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                >
                  <option value="all">{language === 'ar' ? 'جميع المحافظات' : 'All Governorates'}</option>
                  {governorates.slice(1).map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Area Filter */}
              {filters.governorate !== 'all' && areas[filters.governorate] && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    {language === 'ar' ? 'المنطقة' : 'Area'}
                  </h3>
                  <select
                    value={filters.area}
                    onChange={(e) => setFilters({...filters, area: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  >
                    <option value="all">{language === 'ar' ? 'جميع المناطق' : 'All Areas'}</option>
                    {areas[filters.governorate].map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Level Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'مستوى السعر' : 'Price Level'}
                </h3>
                <div className="space-y-2">
                  {['all', 'منخفض', 'متوسط', 'مرتفع'].map(level => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceLevel"
                        checked={filters.priceLevel === level}
                        onChange={() => setFilters({...filters, priceLevel: level})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {level === 'all' ? (language === 'ar' ? 'الكل' : 'All') : level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                </h3>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder={language === 'ar' ? 'من' : 'Min'}
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: parseInt(e.target.value) || 0}})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  />
                  <input
                    type="number"
                    placeholder={language === 'ar' ? 'إلى' : 'Max'}
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: parseInt(e.target.value) || 1000000}})}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-blue-600 text-white py-3 rounded-lg font-bold mb-4 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              {language === 'ar' ? 'الفلاتر' : 'Filters'}
            </button>

            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? `${filteredHotels.length} فندق متاح` : `${filteredHotels.length} Hotels Available`}
              </h2>
            </div>

            {/* Hotels List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map(hotel => (
                <div
                  key={hotel.id}
                  onClick={() => router.push(`/customer/hotels/${hotel.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                >
                  {/* Hotel Image */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-black">
                    {hotel.name.charAt(0)}
                  </div>

                  {/* Hotel Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                          {language === 'ar' ? hotel.name : hotel.nameEn}
                        </h3>
                        <div className="flex text-yellow-500 mb-1">
                          {Array(hotel.stars).fill(0).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-lg">
                          {hotel.rating}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {hotel.reviews} {language === 'ar' ? 'تقييم' : 'reviews'}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {hotel.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{hotel.governorate} - {hotel.area}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.services.slice(0, 3).map((service, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-semibold">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'ar' ? 'السعر من' : 'Starting from'}
                        </div>
                        <div className="text-2xl font-black text-blue-600">
                          {hotel.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
                        {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'جرب تغيير الفلاتر للحصول على نتائج أفضل' : 'Try changing filters for better results'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
