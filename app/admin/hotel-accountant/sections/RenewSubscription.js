'use client'
import { useState } from 'react'

export default function RenewSubscription({ language }) {
  const [showRenewModal, setShowRenewModal] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const hotels = [
    {
      id: 1,
      nameAr: 'فندق بغداد الكبير',
      nameEn: 'Grand Baghdad Hotel',
      currentPlan: 'خطة الأعمال',
      expiryDate: '2025-12-01',
      status: 'active',
      amount: 1200000,
      daysLeft: 13
    },
    {
      id: 2,
      nameAr: 'فندق النخيل',
      nameEn: 'Al-Nakheel Hotel',
      currentPlan: 'خطة متقدمة',
      expiryDate: '2025-11-25',
      status: 'warning',
      amount: 800000,
      daysLeft: 7
    },
    {
      id: 3,
      nameAr: 'فندق الربيع',
      nameEn: 'Al-Rabee Hotel',
      currentPlan: 'خطة أساسية',
      expiryDate: '2025-11-20',
      status: 'critical',
      amount: 500000,
      daysLeft: 2
    },
    {
      id: 4,
      nameAr: 'فندق الزهور',
      nameEn: 'Flowers Hotel',
      currentPlan: 'خطة الأعمال',
      expiryDate: '2026-01-15',
      status: 'active',
      amount: 1200000,
      daysLeft: 58
    }
  ]

  const handleRenew = (hotel) => {
    setSelectedHotel(hotel)
    setShowRenewModal(true)
  }

  const handleSubmitRenewal = (e) => {
    e.preventDefault()
    alert(`تم تجديد اشتراك ${selectedHotel.nameAr} بنجاح!`)
    setShowRenewModal(false)
    setSelectedHotel(null)
  }

  const filteredHotels = hotels.filter(hotel =>
    hotel.nameAr.includes(searchTerm) || hotel.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'تجديد الاشتراكات' : 'Renew Subscriptions'}
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن فندق...' : 'Search hotel...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all"
            style={{
              borderLeftColor: 
                hotel.status === 'active' ? '#10b981' :
                hotel.status === 'warning' ? '#f59e0b' : '#ef4444'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {language === 'ar' ? hotel.nameAr : hotel.nameEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{hotel.currentPlan}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                hotel.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-600' :
                hotel.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600' :
                'bg-red-100 dark:bg-red-900 text-red-600'
              }`}>
                {hotel.daysLeft} {language === 'ar' ? 'يوم متبقي' : 'days left'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">
                  <i className="fas fa-calendar-alt ml-2"></i>
                  {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">{hotel.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">
                  <i className="fas fa-money-bill-wave ml-2"></i>
                  {language === 'ar' ? 'قيمة التجديد' : 'Renewal Amount'}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {hotel.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleRenew(hotel)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-lg"
            >
              <i className="fas fa-sync-alt ml-2"></i>
              {language === 'ar' ? 'تجديد الاشتراك' : 'Renew Subscription'}
            </button>
          </div>
        ))}
      </div>

      {/* Renewal Modal */}
      {showRenewModal && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-sync-alt"></i>
                {language === 'ar' ? 'تجديد الاشتراك' : 'Renew Subscription'}
              </h3>
              <button
                onClick={() => {
                  setShowRenewModal(false)
                  setSelectedHotel(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitRenewal} className="p-6 space-y-4">
              {/* Hotel Info */}
              <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {language === 'ar' ? selectedHotel.nameAr : selectedHotel.nameEn}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الخطة الحالية:' : 'Current Plan:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedHotel.currentPlan}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'تنتهي في:' : 'Expires on:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedHotel.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الخطة الجديدة' : 'New Plan'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="basic">{language === 'ar' ? 'خطة أساسية - 500,000 د.ع' : 'Basic Plan - 500,000 IQD'}</option>
                    <option value="advanced">{language === 'ar' ? 'خطة متقدمة - 800,000 د.ع' : 'Advanced Plan - 800,000 IQD'}</option>
                    <option value="business" selected>{language === 'ar' ? 'خطة الأعمال - 1,200,000 د.ع' : 'Business Plan - 1,200,000 IQD'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'مدة الاشتراك' : 'Subscription Period'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="1">{language === 'ar' ? 'شهر واحد' : '1 Month'}</option>
                    <option value="3">{language === 'ar' ? '3 أشهر' : '3 Months'}</option>
                    <option value="6">{language === 'ar' ? '6 أشهر' : '6 Months'}</option>
                    <option value="12" selected>{language === 'ar' ? 'سنة كاملة' : '1 Year'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر طريقة الدفع' : 'Select Payment Method'}</option>
                    <option>{language === 'ar' ? 'نقداً' : 'Cash'}</option>
                    <option>{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                    <option>{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                    <option>{language === 'ar' ? 'شيك' : 'Check'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ الدفع' : 'Payment Date'}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الإيصال' : 'Receipt Number'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: REC-2025-001' : 'e.g., REC-2025-001'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المبلغ المدفوع (د.ع)' : 'Amount Paid (IQD)'}
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedHotel.amount}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  rows="3"
                  placeholder={language === 'ar' ? 'أدخل أي ملاحظات إضافية...' : 'Enter any additional notes...'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowRenewModal(false)
                    setSelectedHotel(null)
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold"
                >
                  <i className="fas fa-check-circle ml-2"></i>
                  {language === 'ar' ? 'تأكيد التجديد' : 'Confirm Renewal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
