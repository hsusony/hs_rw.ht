'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'hotel_manager'
  })

  const content = {
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'مرحباً بك في نظام NINESOFT',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      userType: 'نوع المستخدم',
      login: 'تسجيل الدخول',
      remember: 'تذكرني',
      forgot: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      signup: 'سجل الآن',
      backToHome: 'العودة للصفحة الرئيسية',
      userTypes: {
        system_admin: 'مدير النظام',
        accountant: 'محاسب',
        agent: 'مندوب',
        hotel_manager: 'مدير فندق',
        branch_manager: 'مدير فرع',
        hotel_accountant: 'محاسب فندق',
        receptionist: 'استقبال',
        cleaner: 'موظف تنظيف',
        maintenance: 'موظف صيانة',
        customer: 'زبون'
      }
    },
    en: {
      title: 'Login',
      subtitle: 'Welcome to NINESOFT System',
      email: 'Email',
      password: 'Password',
      userType: 'User Type',
      login: 'Login',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      noAccount: "Don't have an account?",
      signup: 'Sign up now',
      backToHome: 'Back to Home',
      userTypes: {
        system_admin: 'System Admin',
        accountant: 'Accountant',
        agent: 'Agent',
        hotel_manager: 'Hotel Manager',
        branch_manager: 'Branch Manager',
        hotel_accountant: 'Hotel Accountant',
        receptionist: 'Receptionist',
        cleaner: 'Cleaner',
        maintenance: 'Maintenance',
        customer: 'Customer'
      }
    }
  }

  const t = content[language]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // توجيه حسب نوع المستخدم
    switch(formData.userType) {
      case 'hotel_manager':
        router.push('/admin/hotel-manager')
        break
      case 'system_admin':
        router.push('/admin/system-admin')
        break
      case 'accountant':
        router.push('/admin/accountant')
        break
      case 'agent':
        router.push('/admin/representative')
        break
      case 'branch_manager':
        router.push('/admin/branch-manager')
        break
      case 'hotel_accountant':
        router.push('/admin/hotel-accountant')
        break
      case 'receptionist':
        router.push('/admin/receptionist')
        break
      case 'customer':
        router.push('/customer/dashboard')
        break
      default:
        router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <i className="fas fa-hotel text-white text-3xl"></i>
            </div>
            <span className="text-4xl font-bold text-gray-900 dark:text-white">NINESOFT</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.userType}</label>
              <select
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.userTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.email}</label>
              <div className="relative">
                <i className="fas fa-envelope absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400"></i>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="example@hotel.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.password}</label>
              <div className="relative">
                <i className="fas fa-lock absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400"></i>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{t.remember}</span>
              </label>
              <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">{t.forgot}</a>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg shadow-lg transition-all">
              <i className="fas fa-sign-in-alt ml-2"></i>
              {t.login}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {t.noAccount}{' '}
              <Link href="/landing" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">{t.signup}</Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/landing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>
            {t.backToHome}
          </Link>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold shadow-md"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </div>
    </div>
  )
}
