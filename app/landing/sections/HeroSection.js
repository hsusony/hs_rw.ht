export default function HeroSection({ language, onTrialClick, router }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              {language === 'ar' ? '🚀 النظام الأكثر تطوراً في المنطقة' : '🚀 Most Advanced System in the Region'}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {language === 'ar' ? (
              <>
                نظام إدارة الفنادق<br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  الأكثر تطوراً
                </span>
              </>
            ) : (
              <>
                Most Advanced<br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Hotel Management
                </span>
              </>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'حلول ذكية ومتكاملة لإدارة فندقك بكفاءة عالية واحترافية. وفر وقتك وضاعف أرباحك'
              : 'Smart and integrated solutions to manage your hotel efficiently and professionally. Save time and double your profits'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={onTrialClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold transform hover:scale-105"
            >
              <i className="fas fa-rocket mr-2"></i>
              {language === 'ar' ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'}
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all text-lg font-semibold"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </button>
            <button
              className="px-8 py-4 bg-transparent text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-lg font-semibold"
            >
              <i className="fas fa-play-circle mr-2"></i>
              {language === 'ar' ? 'مشاهدة العرض' : 'Watch Demo'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: '500+', label: language === 'ar' ? 'فندق' : 'Hotels', icon: 'fa-hotel' },
              { number: '10K+', label: language === 'ar' ? 'نزيل' : 'Guests', icon: 'fa-users' },
              { number: '50K+', label: language === 'ar' ? 'حجز' : 'Bookings', icon: 'fa-calendar-check' },
              { number: '4.9/5', label: language === 'ar' ? 'تقييم' : 'Rating', icon: 'fa-star' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <i className={`fas ${stat.icon} text-2xl text-blue-600 dark:text-blue-400 mb-2`}></i>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
