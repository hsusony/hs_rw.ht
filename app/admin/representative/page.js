'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import AddCustomer from './sections/AddCustomer'
import RenewSubscription from './sections/RenewSubscription'
import ReceiptVoucher from './sections/ReceiptVoucher'
import FollowUpCustomers from './sections/FollowUpCustomers'
import OffersDiscounts from './sections/OffersDiscounts'
import VisitsSchedule from './sections/VisitsSchedule'
import SalesReports from './sections/SalesReports'

export default function RepresentativeDashboard() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [readNotifications, setReadNotifications] = useState([])

  useEffect(() => {
    setMounted(true)
    // Load dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true')
    }
  }, [])

  useEffect(() => {
    // Save dark mode to localStorage and apply to document
    if (mounted) {
      localStorage.setItem('darkMode', darkMode.toString())
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  const sections = [
    { 
      id: 'overview', 
      nameAr: 'نظرة عامة', 
      nameEn: 'Overview',
      icon: 'fa-chart-line'
    },
    { 
      id: 'addCustomer', 
      nameAr: 'إضافة زبون', 
      nameEn: 'Add Customer',
      icon: 'fa-user-plus'
    },
    { 
      id: 'renewSubscription', 
      nameAr: 'تجديد اشتراك', 
      nameEn: 'Renew Subscription',
      icon: 'fa-sync'
    },
    { 
      id: 'receiptVoucher', 
      nameAr: 'سند قبض', 
      nameEn: 'Receipt Voucher',
      icon: 'fa-file-invoice-dollar'
    },
    { 
      id: 'visits', 
      nameAr: 'الزيارات والمواعيد', 
      nameEn: 'Visits & Appointments',
      icon: 'fa-calendar-alt'
    },
    { 
      id: 'followUp', 
      nameAr: 'متابعة العملاء', 
      nameEn: 'Follow-Up',
      icon: 'fa-tasks'
    },
    { 
      id: 'offers', 
      nameAr: 'العروض والخصومات', 
      nameEn: 'Offers & Discounts',
      icon: 'fa-tags'
    },
    { 
      id: 'reports', 
      nameAr: 'تقارير المبيعات', 
      nameEn: 'Sales Reports',
      icon: 'fa-chart-pie'
    }
  ]

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'renewal',
      titleAr: 'تجديد اشتراك',
      titleEn: 'Subscription Renewal',
      messageAr: 'فندق بغداد بالاس - ينتهي الاشتراك خلال 3 أيام',
      messageEn: 'Baghdad Palace Hotel - Subscription expires in 3 days',
      detailsAr: 'اشتراك فندق بغداد بالاس على وشك الانتهاء. يرجى التواصل مع العميل لتجديد الاشتراك. تاريخ الانتهاء: 21/11/2025. نوع الاشتراك: اشتراك سنوي - خطة ذهبية. رقم الزبون: CUS-2025-045',
      detailsEn: 'Baghdad Palace Hotel subscription is about to expire. Please contact the client to renew the subscription. Expiry date: 21/11/2025. Subscription type: Annual - Gold Plan. Customer ID: CUS-2025-045',
      time: '2 hours ago',
      icon: 'fa-exclamation-circle',
      color: 'text-orange-600',
      isRead: false
    },
    {
      id: 2,
      type: 'followup',
      titleAr: 'موعد متابعة',
      titleEn: 'Follow-up Scheduled',
      messageAr: 'فندق النخيل - متابعة مجدولة لليوم',
      messageEn: 'Al-Nakheel Hotel - Follow-up scheduled for today',
      detailsAr: 'لديك موعد متابعة مع فندق النخيل اليوم الساعة 2:00 مساءً. الموضوع: مراجعة الخدمات والتأكد من رضا العميل. جهة الاتصال: السيد أحمد محمود - مدير الفندق. الهاتف: 0770-123-4567',
      detailsEn: 'You have a follow-up appointment with Al-Nakheel Hotel today at 2:00 PM. Topic: Service review and customer satisfaction check. Contact: Mr. Ahmed Mahmoud - Hotel Manager. Phone: 0770-123-4567',
      time: '4 hours ago',
      icon: 'fa-calendar-check',
      color: 'text-blue-600',
      isRead: false
    },
    {
      id: 3,
      type: 'offer',
      titleAr: 'عرض جديد',
      titleEn: 'New Offer',
      messageAr: 'تم تفعيل عرض الافتتاح - خصم 20%',
      messageEn: 'Opening offer activated - 20% discount',
      detailsAr: 'تم تفعيل عرض خاص بمناسبة الافتتاح! خصم 20% على جميع الاشتراكات السنوية. العرض ساري حتى: 30/11/2025. الشروط: للعملاء الجدد فقط. الحد الأدنى: اشتراك خطة فضية أو أعلى.',
      detailsEn: 'Special opening offer activated! 20% discount on all annual subscriptions. Valid until: 30/11/2025. Terms: New customers only. Minimum: Silver plan or higher subscription.',
      time: '1 day ago',
      icon: 'fa-tag',
      color: 'text-green-600',
      isRead: false
    }
  ])

  // وظائف إدارة الإشعارات
  const markAsRead = (notifId) => {
    setNotifications(notifications.map(n => 
      n.id === notifId ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const viewNotificationDetails = (notif) => {
    setSelectedNotification(notif)
    markAsRead(notif.id)
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const OverviewSection = () => {
    if (!mounted) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {language === 'ar' ? 'مرحباً، أحمد المندوب!' : 'Welcome, Ahmed!'}
              </h2>
              <p className="text-green-100 text-lg">
                {language === 'ar' 
                  ? 'لوحة تحكم المندوب - إدارة العملاء والاشتراكات'
                  : 'Representative Dashboard - Manage Customers & Subscriptions'
                }
              </p>
            </div>
            <div className="text-6xl opacity-20">
              <i className="fas fa-user-tie"></i>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">24</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'زبائن جدد' : 'New Customers'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-sync text-green-600 text-xl"></i>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">18</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'تجديدات' : 'Renewals'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-money-bill-wave text-purple-600 text-xl"></i>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">42,500,000</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'إجمالي المبيعات (د.ع)' : 'Total Sales (IQD)'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-check text-orange-600 text-xl"></i>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'قريباً' : 'Upcoming'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">12</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'زيارات مجدولة' : 'Scheduled Visits'}
            </p>
          </div>
        </div>

        {/* Recent Activities & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fas fa-clock text-blue-600"></i>
              {language === 'ar' ? 'آخر الأنشطة' : 'Recent Activities'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user-plus text-green-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {language === 'ar' ? 'إضافة زبون جديد' : 'New Customer Added'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'فندق دجلة - بغداد' : 'Tigris Hotel - Baghdad'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-sync text-blue-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {language === 'ar' ? 'تجديد اشتراك' : 'Subscription Renewed'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'فندق النخيل - اشتراك سنوي' : 'Al-Nakheel Hotel - Annual'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-file-invoice text-purple-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {language === 'ar' ? 'سند قبض' : 'Receipt Issued'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    RV-2025-045 - 3,500,000 {language === 'ar' ? 'د.ع' : 'IQD'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-orange-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {language === 'ar' ? 'متابعة عميل' : 'Customer Follow-up'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'فندق بغداد بالاس - مكالمة هاتفية' : 'Baghdad Palace - Phone Call'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle text-orange-600"></i>
              {language === 'ar' ? 'تنبيهات هامة' : 'Important Alerts'}
            </h3>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-exclamation-circle text-red-600 text-xl"></i>
                  <div>
                    <p className="font-bold text-red-900 dark:text-red-300 mb-1">
                      {language === 'ar' ? 'اشتراكات منتهية' : 'Expired Subscriptions'}
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-400">
                      {language === 'ar' 
                        ? '5 زبائن - يحتاجون تجديد فوري'
                        : '5 customers - Need immediate renewal'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-clock text-orange-600 text-xl"></i>
                  <div>
                    <p className="font-bold text-orange-900 dark:text-orange-300 mb-1">
                      {language === 'ar' ? 'اشتراكات قريبة الانتهاء' : 'Expiring Soon'}
                    </p>
                    <p className="text-sm text-orange-800 dark:text-orange-400">
                      {language === 'ar' 
                        ? '8 زبائن - تنتهي خلال أسبوع'
                        : '8 customers - Expire within a week'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-calendar-alt text-blue-600 text-xl"></i>
                  <div>
                    <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                      {language === 'ar' ? 'زيارات اليوم' : "Today's Visits"}
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      {language === 'ar' 
                        ? '3 زيارات مجدولة لليوم'
                        : '3 visits scheduled for today'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-tag text-green-600 text-xl"></i>
                  <div>
                    <p className="font-bold text-green-900 dark:text-green-300 mb-1">
                      {language === 'ar' ? 'عروض نشطة' : 'Active Offers'}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-400">
                      {language === 'ar' 
                        ? '2 عرض متاح - خصم حتى 20%'
                        : '2 offers available - Up to 20% off'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i className="fas fa-chart-bar text-blue-600"></i>
            {language === 'ar' ? 'الأداء الشهري' : 'Monthly Performance'}
          </h3>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={[
                { 
                  month: language === 'ar' ? 'كانون الثاني' : 'Jan', 
                  customers: 15, 
                  renewals: 12, 
                  sales: 28 
                },
                { 
                  month: language === 'ar' ? 'شباط' : 'Feb', 
                  customers: 18, 
                  renewals: 14, 
                  sales: 32 
                },
                { 
                  month: language === 'ar' ? 'آذار' : 'Mar', 
                  customers: 22, 
                  renewals: 16, 
                  sales: 38 
                },
                { 
                  month: language === 'ar' ? 'نيسان' : 'Apr', 
                  customers: 20, 
                  renewals: 15, 
                  sales: 35 
                },
                { 
                  month: language === 'ar' ? 'أيار' : 'May', 
                  customers: 25, 
                  renewals: 18, 
                  sales: 43 
                },
                { 
                  month: language === 'ar' ? 'حزيران' : 'Jun', 
                  customers: 28, 
                  renewals: 20, 
                  sales: 48 
                },
                { 
                  month: language === 'ar' ? 'تموز' : 'Jul', 
                  customers: 24, 
                  renewals: 17, 
                  sales: 41 
                },
                { 
                  month: language === 'ar' ? 'آب' : 'Aug', 
                  customers: 26, 
                  renewals: 19, 
                  sales: 45 
                },
                { 
                  month: language === 'ar' ? 'أيلول' : 'Sep', 
                  customers: 23, 
                  renewals: 16, 
                  sales: 39 
                },
                { 
                  month: language === 'ar' ? 'تشرين الأول' : 'Oct', 
                  customers: 27, 
                  renewals: 21, 
                  sales: 48 
                },
                { 
                  month: language === 'ar' ? 'تشرين الثاني' : 'Nov', 
                  customers: 24, 
                  renewals: 18, 
                  sales: 42 
                }
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => {
                  const labels = {
                    customers: language === 'ar' ? 'زبائن جدد' : 'New Customers',
                    renewals: language === 'ar' ? 'تجديدات' : 'Renewals',
                    sales: language === 'ar' ? 'المبيعات (مليون د.ع)' : 'Sales (Million IQD)'
                  }
                  return labels[value] || value
                }}
              />
              <Bar dataKey="customers" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="renewals" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
          <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-user-tie text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'لوحة تحكم المندوب' : 'Representative Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'إدارة العملاء والاشتراكات' : 'Customer & Subscription Management'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  title={language === 'ar' ? 'English' : 'العربية'}
                >
                  <i className="fas fa-language text-gray-700 dark:text-gray-300 text-xl"></i>
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  title={darkMode ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
                >
                  <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-700 dark:text-gray-300 text-xl`}></i>
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <i className="fas fa-bell text-gray-700 dark:text-gray-300 text-xl"></i>
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3">
                        <h3 className="text-white font-bold">
                          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-3">
                              <i className={`fas ${notif.icon} ${notif.color} text-lg mt-1`}></i>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {language === 'ar' ? notif.titleAr : notif.titleEn}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {language === 'ar' ? notif.messageAr : notif.messageEn}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-center">
                        <button 
                          onClick={() => {
                            setShowAllNotifications(true)
                            setShowNotifications(false)
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          {language === 'ar' ? 'عرض الكل' : 'View All'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {language === 'ar' ? 'أحمد المندوب' : 'Ahmed Representative'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'مندوب' : 'Representative'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="mx-auto px-6">
              <div className="flex gap-1 overflow-x-auto">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                      activeSection === section.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50 dark:bg-green-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className={`fas ${section.icon}`}></i>
                    {language === 'ar' ? section.nameAr : section.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto px-6 py-8">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'addCustomer' && <AddCustomer language={language} />}
          {activeSection === 'renewSubscription' && <RenewSubscription language={language} />}
          {activeSection === 'receiptVoucher' && <ReceiptVoucher language={language} />}
          {activeSection === 'visits' && <VisitsSchedule language={language} />}
          {activeSection === 'followUp' && <FollowUpCustomers language={language} />}
          {activeSection === 'offers' && <OffersDiscounts language={language} />}
          {activeSection === 'reports' && <SalesReports language={language} />}
        </main>

        {/* Notification Details Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className={`bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i className={`fas ${selectedNotification.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {language === 'ar' ? selectedNotification.titleAr : selectedNotification.titleEn}
                    </h2>
                    <p className="text-white text-opacity-80 text-sm">{selectedNotification.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Summary */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    {language === 'ar' ? 'الملخص' : 'Summary'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    {language === 'ar' ? selectedNotification.messageAr : selectedNotification.messageEn}
                  </p>
                </div>

                {/* Details */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-file-alt text-green-600"></i>
                    {language === 'ar' ? 'التفاصيل الكاملة' : 'Full Details'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl leading-relaxed">
                    {language === 'ar' ? selectedNotification.detailsAr : selectedNotification.detailsEn}
                  </p>
                </div>

                {/* Actions */}
                <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <i className="fas fa-bolt text-yellow-600"></i>
                    {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotification.type === 'renewal' && (
                      <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-all">
                        <i className="fas fa-sync mr-2"></i>
                        {language === 'ar' ? 'تجديد الاشتراك' : 'Renew Subscription'}
                      </button>
                    )}
                    {selectedNotification.type === 'followup' && (
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all">
                        <i className="fas fa-calendar-check mr-2"></i>
                        {language === 'ar' ? 'عرض الموعد' : 'View Appointment'}
                      </button>
                    )}
                    {selectedNotification.type === 'offer' && (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all">
                        <i className="fas fa-tags mr-2"></i>
                        {language === 'ar' ? 'عرض العروض' : 'View Offers'}
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all">
                      <i className="fas fa-phone mr-2"></i>
                      {language === 'ar' ? 'الاتصال بالزبون' : 'Contact Customer'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Notifications Modal */}
        {showAllNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <i className="fas fa-bell"></i>
                  {language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'}
                </h2>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="space-y-4">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`rounded-xl p-4 hover:shadow-lg transition-all border ${
                        notif.isRead 
                          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-75' 
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`fas ${notif.icon} ${notif.color} text-2xl`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                {language === 'ar' ? notif.titleAr : notif.titleEn}
                              </h4>
                              {!notif.isRead && (
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {language === 'ar' ? notif.messageAr : notif.messageEn}
                          </p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => viewNotificationDetails(notif)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              <i className="fas fa-eye mr-2"></i>
                              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>
                            {!notif.isRead && (
                              <button 
                                onClick={() => markAsRead(notif.id)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold transition-all"
                              >
                                <i className="fas fa-check mr-2"></i>
                                {language === 'ar' ? 'تم القراءة' : 'Mark as Read'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="text-center py-20">
                    <i className="fas fa-bell-slash text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                <button 
                  className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <i className="fas fa-check-double"></i>
                  {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
