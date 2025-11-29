import { useState } from 'react'

export default function FeedbackModal({ language, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(language === 'ar' 
      ? 'شكراً لك! تم استلام رسالتك وسنراجعها في أقرب وقت' 
      : 'Thank you! Your message has been received and we will review it soon')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' ? 'اقتراحاتك وشكاواك تهمنا' : 'Your Feedback Matters'}
              </h2>
              <p className="text-green-100">
                {language === 'ar' ? 'ساعدنا في تحسين النظام' : 'Help us improve the system'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الاسم' : 'Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {language === 'ar' ? 'نوع الرسالة' : 'Message Type'} *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'suggestion' })}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                  formData.type === 'suggestion'
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400'
                }`}
              >
                <i className="fas fa-lightbulb mr-2"></i>
                {language === 'ar' ? 'اقتراح' : 'Suggestion'}
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'complaint' })}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                  formData.type === 'complaint'
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-400'
                }`}
              >
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {language === 'ar' ? 'شكوى' : 'Complaint'}
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'inquiry' })}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                  formData.type === 'inquiry'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                }`}
              >
                <i className="fas fa-question-circle mr-2"></i>
                {language === 'ar' ? 'استفسار' : 'Inquiry'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {language === 'ar' ? 'الرسالة' : 'Message'} *
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="6"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder={language === 'ar' ? 'اكتب رسالتك هنا... كن محدداً قدر الإمكان' : 'Write your message here... Be as specific as possible'}
            ></textarea>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-green-600 dark:text-green-400 text-xl mt-1"></i>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'ar' 
                    ? 'نحن نقدر ملاحظاتك ونعمل على تحسين النظام باستمرار. سيتم مراجعة جميع الرسائل من قبل فريقنا.'
                    : 'We value your feedback and are constantly working to improve the system. All messages will be reviewed by our team.'}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              {language === 'ar' ? 'إرسال' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
