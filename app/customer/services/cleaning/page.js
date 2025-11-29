'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CleaningServicePage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [serviceType, setServiceType] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const serviceTypes = [
    {
      id: 'full-cleaning',
      name: 'تنظيف كامل',
      nameEn: 'Full Cleaning',
      icon: '🧹',
      description: 'تنظيف شامل للغرفة مع تبديل الشراشف والمناشف',
      descriptionEn: 'Complete room cleaning with bed linens and towel change',
      duration: '45-60 دقيقة'
    },
    {
      id: 'towels-only',
      name: 'تبديل المناشف فقط',
      nameEn: 'Towels Only',
      icon: '🧺',
      description: 'تبديل المناشف المستخدمة بأخرى نظيفة',
      descriptionEn: 'Replace used towels with fresh ones',
      duration: '10-15 دقيقة'
    },
    {
      id: 'tidying',
      name: 'ترتيب سريع',
      nameEn: 'Quick Tidying',
      icon: '✨',
      description: 'ترتيب الغرفة وتنظيف الحمام',
      descriptionEn: 'Room tidying and bathroom cleaning',
      duration: '20-30 دقيقة'
    },
    {
      id: 'extra-supplies',
      name: 'مستلزمات إضافية',
      nameEn: 'Extra Supplies',
      icon: '🧴',
      description: 'طلب مستلزمات إضافية (شامبو، صابون، مناديل)',
      descriptionEn: 'Request additional supplies (shampoo, soap, tissues)',
      duration: '5-10 دقائق'
    }
  ]

  const timeSlots = [
    { value: 'morning', label: 'صباحاً (8-11)', labelEn: 'Morning (8-11 AM)' },
    { value: 'noon', label: 'ظهراً (12-3)', labelEn: 'Noon (12-3 PM)' },
    { value: 'afternoon', label: 'عصراً (4-7)', labelEn: 'Afternoon (4-7 PM)' },
    { value: 'now', label: 'الآن (في أقرب وقت)', labelEn: 'Now (ASAP)' }
  ]

  const handleSubmit = () => {
    if (!serviceType || !preferredTime) {
      alert(language === 'ar' ? 'الرجاء تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields')
      return
    }
    alert(language === 'ar' ? 'تم إرسال طلب التنظيف بنجاح!' : 'Cleaning request submitted successfully!')
    setServiceType('')
    setPreferredTime('')
    setAdditionalNotes('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-black text-white">
                  {language === 'ar' ? '🧹 خدمة التنظيف' : '🧹 Cleaning Service'}
                </h1>
                <p className="text-white/80 text-sm">
                  {language === 'ar' ? 'اطلب خدمة تنظيف غرفتك' : 'Request room cleaning service'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Service Types */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'نوع الخدمة' : 'Service Type'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setServiceType(type.id)}
                  className={`p-6 rounded-2xl text-left transition-all ${
                    serviceType === type.id
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl scale-105 ring-4 ring-blue-300'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-xl'
                  }`}
                >
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-black mb-2">
                    {language === 'ar' ? type.name : type.nameEn}
                  </h3>
                  <p className={`text-sm mb-3 ${serviceType === type.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                    {language === 'ar' ? type.description : type.descriptionEn}
                  </p>
                  <div className={`text-xs font-bold ${serviceType === type.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-500'}`}>
                    ⏱️ {type.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Preference */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'الوقت المفضل' : 'Preferred Time'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeSlots.map(slot => (
                <button
                  key={slot.value}
                  onClick={() => setPreferredTime(slot.value)}
                  className={`px-4 py-3 rounded-xl font-bold transition-all ${
                    preferredTime === slot.value
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:shadow-lg'
                  }`}
                >
                  {language === 'ar' ? slot.label : slot.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
            </h2>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder={language === 'ar' ? 'أي طلبات خاصة أو ملاحظات؟' : 'Any special requests or notes?'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
              rows="5"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 rounded-xl font-black text-xl hover:shadow-2xl transition-all"
          >
            {language === 'ar' ? '✓ إرسال الطلب' : '✓ Submit Request'}
          </button>
        </div>
      </div>
    </div>
  )
}
