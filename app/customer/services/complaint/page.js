'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ComplaintPage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [complaintType, setComplaintType] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const complaintTypes = [
    { 
      id: 'room-condition', 
      name: 'حالة الغرفة', 
      nameEn: 'Room Condition', 
      icon: '🛏️',
      description: 'مشاكل في نظافة أو حالة الغرفة'
    },
    { 
      id: 'noise', 
      name: 'إزعاج وضوضاء', 
      nameEn: 'Noise Complaint', 
      icon: '🔊',
      description: 'ضوضاء من الغرف المجاورة أو البيئة المحيطة'
    },
    { 
      id: 'staff-service', 
      name: 'خدمة الموظفين', 
      nameEn: 'Staff Service', 
      icon: '👤',
      description: 'مشاكل مع تعامل أو خدمة الموظفين'
    },
    { 
      id: 'facilities', 
      name: 'المرافق', 
      nameEn: 'Facilities', 
      icon: '🏊',
      description: 'مشاكل في المسبح، النادي، المطعم، إلخ'
    },
    { 
      id: 'maintenance', 
      name: 'صيانة', 
      nameEn: 'Maintenance', 
      icon: '🔧',
      description: 'أعطال أو مشاكل فنية تحتاج صيانة'
    },
    { 
      id: 'billing', 
      name: 'الفواتير', 
      nameEn: 'Billing', 
      icon: '💳',
      description: 'مشاكل في الحساب أو الفواتير'
    },
    { 
      id: 'other', 
      name: 'أخرى', 
      nameEn: 'Other', 
      icon: '📝',
      description: 'شكوى أخرى'
    }
  ]

  const priorities = [
    { value: 'low', label: 'منخفضة', labelEn: 'Low', color: 'blue' },
    { value: 'medium', label: 'متوسطة', labelEn: 'Medium', color: 'yellow' },
    { value: 'high', label: 'عالية', labelEn: 'High', color: 'orange' },
    { value: 'urgent', label: 'عاجلة', labelEn: 'Urgent', color: 'red' }
  ]

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (!complaintType || !description) {
      alert(language === 'ar' ? 'الرجاء تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields')
      return
    }
    alert(language === 'ar' ? 'تم إرسال الشكوى بنجاح! سنتواصل معك قريباً' : 'Complaint submitted successfully! We will contact you soon')
    setComplaintType('')
    setDescription('')
    setPriority('medium')
    setImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 shadow-xl sticky top-0 z-40">
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
                  {language === 'ar' ? '📝 تقديم شكوى' : '📝 Submit Complaint'}
                </h1>
                <p className="text-white/80 text-sm">
                  {language === 'ar' ? 'نحن نهتم برأيك ونسعى لحل مشاكلك' : 'We care about your feedback and will solve your issues'}
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
          {/* Complaint Type */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'نوع الشكوى' : 'Complaint Type'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {complaintTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setComplaintType(type.id)}
                  className={`p-6 rounded-2xl transition-all ${
                    complaintType === type.id
                      ? 'bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-2xl scale-105 ring-4 ring-red-300'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-xl'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="text-sm font-black">
                    {language === 'ar' ? type.name : type.nameEn}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'الأولوية' : 'Priority'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {priorities.map(p => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`px-4 py-3 rounded-xl font-bold transition-all ${
                    priority === p.value
                      ? `bg-${p.color}-600 text-white shadow-lg scale-105`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:shadow-lg'
                  }`}
                  style={priority === p.value ? {
                    background: p.color === 'blue' ? '#2563eb' : 
                               p.color === 'yellow' ? '#eab308' : 
                               p.color === 'orange' ? '#ea580c' : '#dc2626'
                  } : {}}
                >
                  {language === 'ar' ? p.label : p.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'وصف الشكوى' : 'Complaint Description'}
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'ar' ? 'اشرح المشكلة بالتفصيل...' : 'Explain the issue in detail...'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
              rows="6"
            />
          </div>

          {/* Image Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إرفاق صورة (اختياري)' : 'Attach Image (Optional)'}
            </h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer"
              >
                <div className="text-6xl mb-4">📷</div>
                <div className="font-bold text-gray-900 dark:text-white mb-2">
                  {image ? image.name : (language === 'ar' ? 'اضغط لإضافة صورة' : 'Click to add image')}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'يساعد إرفاق صورة في حل المشكلة بشكل أسرع' : 'Adding an image helps us solve the issue faster'}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-5 rounded-xl font-black text-xl hover:shadow-2xl transition-all"
          >
            {language === 'ar' ? '✓ إرسال الشكوى' : '✓ Submit Complaint'}
          </button>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="font-black text-blue-900 dark:text-blue-300 mb-2">
                  {language === 'ar' ? 'ملاحظة' : 'Note'}
                </h3>
                <p className="text-blue-800 dark:text-blue-400">
                  {language === 'ar' 
                    ? 'سيتم معالجة شكواك في أقرب وقت ممكن. الشكاوى العاجلة يتم معالجتها خلال ساعة واحدة.'
                    : 'Your complaint will be processed as soon as possible. Urgent complaints are handled within one hour.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
