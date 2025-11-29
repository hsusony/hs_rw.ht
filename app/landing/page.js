'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'
import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import PricingSection from './sections/PricingSection'
import ServicesSection from './sections/ServicesSection'
import ContactSection from './sections/ContactSection'
import TrialModal from './modals/TrialModal'
import FeedbackModal from './modals/FeedbackModal'

export default function LandingPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return null
  }

  const navItems = language === 'ar' 
    ? { home: 'الرئيسية', features: 'المميزات', pricing: 'الأسعار', services: 'الخدمات', contact: 'اتصل بنا' }
    : { home: 'Home', features: 'Features', pricing: 'Pricing', services: 'Services', contact: 'Contact' }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-hotel text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'نظام إدارة الفنادق' : 'Hotel Management'}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">NineSoft</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {Object.entries(navItems).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-semibold transition-colors ${
                    activeSection === key
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {value}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm font-semibold"
              >
                <i className="fas fa-globe mr-2"></i>
                {language === 'ar' ? 'EN' : 'ع'}
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                {language === 'ar' ? 'دخول' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section id="home">
          <HeroSection language={language} onTrialClick={() => setShowTrialModal(true)} router={router} />
        </section>

        <section id="features">
          <FeaturesSection language={language} />
        </section>

        <section id="pricing">
          <PricingSection language={language} onTrialClick={() => setShowTrialModal(true)} />
        </section>

        <section id="services">
          <ServicesSection language={language} />
        </section>

        <section id="contact">
          <ContactSection language={language} />
        </section>
      </main>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedbackModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center"
        title={language === 'ar' ? 'اقتراحات وشكاوى' : 'Feedback'}
      >
        <i className="fas fa-comment-dots text-xl"></i>
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-hotel text-lg"></i>
                </div>
                <span className="font-bold">{language === 'ar' ? 'نظام إدارة الفنادق' : 'Hotel Management'}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {language === 'ar' 
                  ? 'نحن شركة رائدة في تطوير حلول إدارة الفنادق، نقدم أنظمة متطورة تساعد الفنادق على تحسين أدائها.'
                  : 'We are a leading company in developing hotel management solutions, providing advanced systems that help hotels improve their performance.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(navItems).map(([key, value]) => (
                  <li key={key}>
                    <button onClick={() => scrollToSection(key)} className="text-gray-400 hover:text-white transition-colors">
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">{language === 'ar' ? 'الدعم' : 'Support'}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'ar' ? 'التوثيق' : 'Documentation'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <i className="fas fa-phone text-blue-500"></i>
                  <span dir="ltr">07755667500</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope text-blue-500"></i>
                  <span>info@ninesoft.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-blue-500"></i>
                  <span>{language === 'ar' ? 'بغداد، العراق' : 'Baghdad, Iraq'}</span>
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>{language === 'ar' ? 'جميع الحقوق محفوظة © 2024 نظام إدارة الفنادق - NineSoft' : 'All Rights Reserved © 2024 Hotel Management System - NineSoft'}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showTrialModal && <TrialModal language={language} onClose={() => setShowTrialModal(false)} />}
      {showFeedbackModal && <FeedbackModal language={language} onClose={() => setShowFeedbackModal(false)} />}
    </div>
  )
}
