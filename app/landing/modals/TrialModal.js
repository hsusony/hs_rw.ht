import { useState } from 'react'

export default function TrialModal({ language, onClose }) {
  const [formData, setFormData] = useState({
    hotelName: '',
    fullName: '',
    email: '',
    phone: '',
    rooms: '',
    country: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(language === 'ar' 
      ? 'تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة لتفعيل حسابك التجريبي' 
      : 'Your request has been submitted successfully! We will contact you within 24 hours to activate your trial account')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' ? 'ابدأ تجربتك المجانية' : 'Start Your Free Trial'}
              </h2>
              <p className="text-blue-100">
                {language === 'ar' ? '14 يوم مجاناً - لا حاجة لبطاقة ائتمانية' : '14 days free - No credit card required'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'اسم الفندق' : 'Hotel Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'أدخل اسم الفندق' : 'Enter hotel name'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? '+966 50 000 0000' : '+966 50 000 0000'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'} *
              </label>
              <select
                required
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{language === 'ar' ? 'اختر عدد الغرف' : 'Select number of rooms'}</option>
                <option value="1-20">{language === 'ar' ? '1-20 غرفة' : '1-20 rooms'}</option>
                <option value="21-50">{language === 'ar' ? '21-50 غرفة' : '21-50 rooms'}</option>
                <option value="51-100">{language === 'ar' ? '51-100 غرفة' : '51-100 rooms'}</option>
                <option value="100+">{language === 'ar' ? 'أكثر من 100' : 'More than 100'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الدولة' : 'Country'} *
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{language === 'ar' ? 'اختر الدولة' : 'Select country'}</option>
                <option value="IQ">{language === 'ar' ? 'العراق' : 'Iraq'}</option>
                <option value="SA">{language === 'ar' ? 'السعودية' : 'Saudi Arabia'}</option>
                <option value="AE">{language === 'ar' ? 'الإمارات' : 'UAE'}</option>
                <option value="KW">{language === 'ar' ? 'الكويت' : 'Kuwait'}</option>
                <option value="QA">{language === 'ar' ? 'قطر' : 'Qatar'}</option>
                <option value="BH">{language === 'ar' ? 'البحرين' : 'Bahrain'}</option>
                <option value="OM">{language === 'ar' ? 'عمان' : 'Oman'}</option>
                <option value="OTHER">{language === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'ما ستحصل عليه في التجربة المجانية:' : 'What you get in the free trial:'}
            </h3>
            <ul className="space-y-2">
              {[
                language === 'ar' ? 'وصول كامل لجميع المميزات' : 'Full access to all features',
                language === 'ar' ? 'دعم فني مباشر' : 'Direct technical support',
                language === 'ar' ? 'تدريب مجاني للفريق' : 'Free team training',
                language === 'ar' ? 'لا حاجة لبطاقة ائتمانية' : 'No credit card required',
                language === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <i className="fas fa-rocket mr-2"></i>
              {language === 'ar' ? 'ابدأ التجربة الآن' : 'Start Trial Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
