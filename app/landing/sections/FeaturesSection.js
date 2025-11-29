export default function FeaturesSection({ language }) {
  const features = language === 'ar' ? [
    { icon: 'fa-calendar-check', title: 'إدارة الحجوزات', desc: 'نظام متطور لإدارة حجوزات الغرف بسهولة وسرعة' },
    { icon: 'fa-bed', title: 'إدارة الغرف', desc: 'متابعة حالة الغرف وصيانتها بشكل فوري' },
    { icon: 'fa-users', title: 'إدارة النزلاء', desc: 'قاعدة بيانات شاملة لجميع معلومات النزلاء' },
    { icon: 'fa-money-bill-wave', title: 'إدارة المدفوعات', desc: 'نظام دفع آمن مع تقارير مالية تفصيلية' },
    { icon: 'fa-chart-line', title: 'تقارير تحليلية', desc: 'تقارير وإحصائيات شاملة لأداء الفندق' },
    { icon: 'fa-mobile-alt', title: 'متوافق مع الجوال', desc: 'استخدم النظام من أي جهاز في أي وقت' },
    { icon: 'fa-lock', title: 'أمان عالي', desc: 'حماية متقدمة لبيانات فندقك ونزلائك' },
    { icon: 'fa-headset', title: 'دعم فني 24/7', desc: 'فريق دعم متاح على مدار الساعة' }
  ] : [
    { icon: 'fa-calendar-check', title: 'Booking Management', desc: 'Advanced system for managing room bookings easily and quickly' },
    { icon: 'fa-bed', title: 'Room Management', desc: 'Track room status and maintenance in real-time' },
    { icon: 'fa-users', title: 'Guest Management', desc: 'Comprehensive database for all guest information' },
    { icon: 'fa-money-bill-wave', title: 'Payment Management', desc: 'Secure payment system with detailed financial reports' },
    { icon: 'fa-chart-line', title: 'Analytics Reports', desc: 'Comprehensive reports and statistics on hotel performance' },
    { icon: 'fa-mobile-alt', title: 'Mobile Friendly', desc: 'Use the system from any device anytime' },
    { icon: 'fa-lock', title: 'High Security', desc: 'Advanced protection for your hotel and guest data' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Support team available around the clock' }
  ]

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'مميزات النظام' : 'System Features'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'كل ما تحتاجه لإدارة فندقك في مكان واحد' : 'Everything you need to manage your hotel in one place'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className={`fas ${feature.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
