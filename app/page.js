'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const sections = [
    {
      id: 'management',
      title: 'الإدارة العليا',
      titleEn: 'Top Management',
      description: 'إدارة النظام والحسابات',
      descriptionEn: 'System and accounting management',
      icon: '👑',
      gradient: 'from-purple-600 via-pink-600 to-rose-600',
      links: [
        {
          name: 'سوبر أدمن',
          nameEn: 'Super Admin',
          path: '/admin/system',
          icon: '👑',
          desc: 'إدارة النظام الكاملة'
        },
        {
          name: 'المحاسب العام',
          nameEn: 'General Accountant',
          path: '/admin/accountant',
          icon: '💰',
          desc: 'إدارة الحسابات والفواتير'
        },
        {
          name: 'المندوبين',
          nameEn: 'Sales Representatives',
          path: '/admin/representative',
          icon: '🤝',
          desc: 'متابعة المندوبين والعملاء'
        }
      ]
    },
    {
      id: 'hotel-management',
      title: 'إدارة الفندق',
      titleEn: 'Hotel Management',
      description: 'المديرين والمحاسبين',
      descriptionEn: 'Managers and accountants',
      icon: '🏨',
      gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
      links: [
        {
          name: 'مدير الفندق',
          nameEn: 'Hotel Manager',
          path: '/admin/hotel-manager',
          icon: '👨‍💼',
          desc: 'إدارة عمليات الفندق'
        },
        {
          name: 'مدير الفرع',
          nameEn: 'Branch Manager',
          path: '/admin/branch-manager',
          icon: '🏢',
          desc: 'إدارة فرع الفندق'
        },
        {
          name: 'محاسب الفندق',
          nameEn: 'Hotel Accountant',
          path: '/admin/hotel-accountant',
          icon: '💵',
          desc: 'حسابات الفندق'
        }
      ]
    },
    {
      id: 'employees',
      title: 'الموظفين',
      titleEn: 'Employees',
      description: 'موظفي الفندق',
      descriptionEn: 'Hotel staff',
      icon: '👥',
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      links: [
        {
          name: 'الاستقبال',
          nameEn: 'Reception',
          path: '/admin/reception',
          icon: '👔',
          desc: 'موظفي الاستقبال'
        },
        {
          name: 'التنظيف',
          nameEn: 'Housekeeping',
          path: '/admin/housekeeping',
          icon: '🧹',
          desc: 'موظفي التنظيف'
        },
        {
          name: 'الصيانة',
          nameEn: 'Maintenance',
          path: '/admin/maintenance',
          icon: '🔧',
          desc: 'موظفي الصيانة'
        }
      ]
    },
    {
      id: 'customer',
      title: 'واجهة الزبون',
      titleEn: 'Customer Portal',
      description: 'حجز الفنادق والخدمات',
      descriptionEn: 'Hotel booking and services',
      icon: '👤',
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      links: [
        {
          name: 'الفنادق',
          nameEn: 'Hotels',
          path: '/customer/hotels',
          icon: '🏨',
          desc: 'تصفح وحجز الفنادق'
        },
        {
          name: 'حسابي',
          nameEn: 'My Account',
          path: '/customer/account',
          icon: '👤',
          desc: 'حجوزاتي وطلباتي'
        },
        {
          name: 'خدمة الغرف',
          nameEn: 'Room Service',
          path: '/customer/services/room-service',
          icon: '🍽️',
          desc: 'طلب الطعام'
        },
        {
          name: 'التنظيف',
          nameEn: 'Cleaning',
          path: '/customer/services/cleaning',
          icon: '🧹',
          desc: 'طلب تنظيف الغرفة'
        },
        {
          name: 'الشكاوى',
          nameEn: 'Complaints',
          path: '/customer/services/complaint',
          icon: '📝',
          desc: 'تقديم شكوى'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🏨
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                  {language === 'ar' ? 'نظام إدارة الفنادق' : 'Hotel Management System'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">
                  {language === 'ar' ? 'نظام متكامل لإدارة الفنادق والحجوزات' : 'Complete hotel and booking management system'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg hover:shadow-lg transition-all"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold mb-4">
            {language === 'ar' ? '✨ مرحباً بك' : '✨ Welcome'}
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'اختر القسم المناسب' : 'Choose Your Section'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نظام شامل يجمع جميع عمليات الفندق في مكان واحد'
              : 'A comprehensive system that brings all hotel operations together in one place'}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map(section => (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.gradient} p-8 text-white`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-6xl">{section.icon}</div>
                  <div>
                    <h3 className="text-3xl font-black">
                      {language === 'ar' ? section.title : section.titleEn}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {language === 'ar' ? section.description : section.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Links */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.links.map(link => (
                    <button
                      key={link.path}
                      onClick={() => router.push(link.path)}
                      className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all text-left border-2 border-transparent hover:border-purple-400"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-white dark:bg-gray-900 text-4xl w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                          {link.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                            {language === 'ar' ? link.name : link.nameEn}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {link.desc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end text-purple-600 dark:text-purple-400 font-bold text-sm">
                        {language === 'ar' ? 'دخول' : 'Enter'}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-black mb-2">
              {language === 'ar' ? 'دعم ثنائي اللغة' : 'Bilingual Support'}
            </h3>
            <p className="text-white/90">
              {language === 'ar' ? 'واجهة عربية وإنجليزية كاملة' : 'Full Arabic and English interface'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl mb-4">🌓</div>
            <h3 className="text-2xl font-black mb-2">
              {language === 'ar' ? 'وضع النهار والليل' : 'Light & Dark Mode'}
            </h3>
            <p className="text-white/90">
              {language === 'ar' ? 'تبديل سهل بين الأوضاع' : 'Easy switching between modes'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-black mb-2">
              {language === 'ar' ? 'متجاوب تماماً' : 'Fully Responsive'}
            </h3>
            <p className="text-white/90">
              {language === 'ar' ? 'يعمل على جميع الأجهزة' : 'Works on all devices'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <p className="text-gray-600 dark:text-gray-400 font-semibold">
              {language === 'ar' 
                ? '© 2025 نظام إدارة الفنادق - جميع الحقوق محفوظة'
                : '© 2025 Hotel Management System - All Rights Reserved'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
