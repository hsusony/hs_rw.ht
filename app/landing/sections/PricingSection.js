import { useState } from 'react'

export default function PricingSection({ language, onTrialClick }) {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const packages = language === 'ar' ? [
    {
      name: 'باقة البداية',
      price: '500',
      yearlyPrice: '4800',
      desc: 'مثالية للفنادق الصغيرة',
      features: [
        'حتى 20 غرفة',
        'مستخدم واحد',
        'تقارير أساسية',
        'دعم فني عبر البريد',
        'تخزين 5 جيجا'
      ]
    },
    {
      name: 'باقة الأعمال',
      price: '1200',
      yearlyPrice: '11520',
      desc: 'للفنادق المتوسطة',
      popular: true,
      features: [
        'حتى 50 غرفة',
        '5 مستخدمين',
        'تقارير متقدمة',
        'دعم فني مباشر',
        'تخزين 20 جيجا',
        'تطبيق الجوال',
        'ربط مع أنظمة الدفع'
      ]
    },
    {
      name: 'باقة المؤسسات',
      price: '2500',
      yearlyPrice: '24000',
      desc: 'للفنادق الكبيرة',
      features: [
        'غرف غير محدودة',
        'مستخدمين غير محدود',
        'تقارير مخصصة',
        'دعم فني 24/7',
        'تخزين غير محدود',
        'تطبيق الجوال',
        'ربط مع جميع الأنظمة',
        'تخصيص كامل للنظام'
      ]
    }
  ] : [
    {
      name: 'Starter',
      price: '500',
      yearlyPrice: '4800',
      desc: 'Perfect for small hotels',
      features: [
        'Up to 20 rooms',
        '1 user',
        'Basic reports',
        'Email support',
        '5GB storage'
      ]
    },
    {
      name: 'Business',
      price: '1200',
      yearlyPrice: '11520',
      desc: 'For medium hotels',
      popular: true,
      features: [
        'Up to 50 rooms',
        '5 users',
        'Advanced reports',
        'Direct support',
        '20GB storage',
        'Mobile app',
        'Payment gateway integration'
      ]
    },
    {
      name: 'Enterprise',
      price: '2500',
      yearlyPrice: '24000',
      desc: 'For large hotels',
      features: [
        'Unlimited rooms',
        'Unlimited users',
        'Custom reports',
        '24/7 support',
        'Unlimited storage',
        'Mobile app',
        'All integrations',
        'Full customization'
      ]
    }
  ]

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'باقات الأسعار' : 'Pricing Plans'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {language === 'ar' ? 'اختر الباقة المناسبة لحجم فندقك' : 'Choose the plan that fits your hotel size'}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-700 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {language === 'ar' ? 'شهري' : 'Monthly'}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {language === 'ar' ? 'سنوي' : 'Yearly'}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                {language === 'ar' ? 'وفر 20%' : 'Save 20%'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${
                pkg.popular ? 'ring-4 ring-blue-600 transform scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{pkg.desc}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {billingCycle === 'monthly' ? pkg.price : pkg.yearlyPrice}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  {language === 'ar' ? 'د.ع' : 'IQD'}
                  {billingCycle === 'monthly' ? (language === 'ar' ? '/شهر' : '/month') : (language === 'ar' ? '/سنة' : '/year')}
                </span>
              </div>

              <button
                onClick={onTrialClick}
                className={`w-full py-3 rounded-xl font-semibold transition-all mb-6 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
              </button>

              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
