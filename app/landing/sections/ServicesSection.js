export default function ServicesSection({ language }) {
  const services = language === 'ar' ? [
    { icon: 'fa-globe', title: 'موقع إلكتروني', desc: 'موقع احترافي لفندقك مع نظام حجز مباشر', price: '3000', color: 'blue' },
    { icon: 'fa-mobile-screen', title: 'تطبيق جوال', desc: 'تطبيق iOS و Android مخصص لفندقك', price: '8000', color: 'purple' },
    { icon: 'fa-robot', title: 'روبوت محادثة', desc: 'خدمة عملاء آلية متاحة 24/7', price: '1500', color: 'green' },
    { icon: 'fa-envelope', title: 'رسائل تسويقية', desc: 'حملات بريدية ورسائل SMS للنزلاء', price: '500', perMonth: true, color: 'orange' },
    { icon: 'fa-graduation-cap', title: 'تدريب الموظفين', desc: 'دورات تدريبية لفريق عملك', price: '2000', color: 'red' },
    { icon: 'fa-tools', title: 'تخصيص النظام', desc: 'تطوير مميزات خاصة حسب احتياجاتك', price: 'حسب الطلب', color: 'indigo' }
  ] : [
    { icon: 'fa-globe', title: 'Website', desc: 'Professional website for your hotel with direct booking', price: '3000', color: 'blue' },
    { icon: 'fa-mobile-screen', title: 'Mobile App', desc: 'Custom iOS & Android app for your hotel', price: '8000', color: 'purple' },
    { icon: 'fa-robot', title: 'Chatbot', desc: 'Automated customer service available 24/7', price: '1500', color: 'green' },
    { icon: 'fa-envelope', title: 'Marketing Messages', desc: 'Email and SMS campaigns for guests', price: '500', perMonth: true, color: 'orange' },
    { icon: 'fa-graduation-cap', title: 'Staff Training', desc: 'Training courses for your team', price: '2000', color: 'red' },
    { icon: 'fa-tools', title: 'System Customization', desc: 'Develop custom features for your needs', price: 'On Request', color: 'indigo' }
  ]

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600'
  }

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'الخدمات الإضافية' : 'Additional Services'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'عزز نظامك بخدمات متقدمة' : 'Enhance your system with advanced services'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[service.color]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fas ${service.icon} text-3xl text-white`}></i>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.price}
                  </span>
                  {service.price !== 'حسب الطلب' && service.price !== 'On Request' && (
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {language === 'ar' ? 'د.ع' : 'IQD'}
                      {service.perMonth && (language === 'ar' ? '/شهر' : '/month')}
                    </span>
                  )}
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold">
                  {language === 'ar' ? 'اطلب الآن' : 'Order Now'}
                  <i className="fas fa-arrow-left ml-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
