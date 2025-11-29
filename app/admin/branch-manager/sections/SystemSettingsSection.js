'use client'

import { useState } from 'react'

export default function SystemSettingsSection({ language }) {
  const [settings, setSettings] = useState({
    hotelNameAr: 'فندق القصر الذهبي',
    hotelNameEn: 'Golden Palace Hotel',
    address: 'بغداد - الكرادة - شارع 52',
    phone: '07701234567',
    email: 'info@goldenpalace.com',
    website: 'www.goldenpalace.com',
    taxRate: 5,
    currency: 'IQD',
    defaultLanguage: 'ar',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    timeZone: 'Asia/Baghdad',
    autoBackup: true,
    backupTime: '03:00',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  })

  const [activeTab, setActiveTab] = useState('general')

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'ar' ? 'إعدادات النظام' : 'System Settings'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'ar' ? 'إدارة جميع إعدادات النظام والفندق' : 'Manage all system and hotel settings'}
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'general'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <i className="fas fa-cog ml-2"></i>
          {language === 'ar' ? 'عام' : 'General'}
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'business'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <i className="fas fa-building ml-2"></i>
          {language === 'ar' ? 'معلومات الفندق' : 'Hotel Info'}
        </button>
        <button
          onClick={() => setActiveTab('operations')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'operations'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <i className="fas fa-clock ml-2"></i>
          {language === 'ar' ? 'العمليات' : 'Operations'}
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'notifications'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <i className="fas fa-bell ml-2"></i>
          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'backup'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <i className="fas fa-database ml-2"></i>
          {language === 'ar' ? 'النسخ الاحتياطي' : 'Backup'}
        </button>
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'الإعدادات العامة' : 'General Settings'}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اللغة الافتراضية:' : 'Default Language:'}
                </label>
                <select value={settings.defaultLanguage} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                  <option value="ar">{language === 'ar' ? 'العربية' : 'Arabic'}</option>
                  <option value="en">{language === 'ar' ? 'الإنجليزية' : 'English'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'العملة:' : 'Currency:'}
                </label>
                <select value={settings.currency} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                  <option value="IQD">{language === 'ar' ? 'دينار عراقي (IQD)' : 'Iraqi Dinar (IQD)'}</option>
                  <option value="USD">{language === 'ar' ? 'دولار أمريكي (USD)' : 'US Dollar (USD)'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المنطقة الزمنية:' : 'Time Zone:'}
                </label>
                <select value={settings.timeZone} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                  <option value="Asia/Baghdad">Asia/Baghdad (GMT+3)</option>
                  <option value="Asia/Erbil">Asia/Erbil (GMT+3)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'نسبة الضريبة %:' : 'Tax Rate %:'}
                </label>
                <input type="number" value={settings.taxRate} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={settings.maintenanceMode} className="w-5 h-5 rounded" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'وضع الصيانة' : 'Maintenance Mode'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'تعطيل النظام مؤقتاً للصيانة' : 'Temporarily disable system for maintenance'}</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'معلومات الفندق' : 'Hotel Information'}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم الفندق (عربي):' : 'Hotel Name (Arabic):'}
                </label>
                <input type="text" value={settings.hotelNameAr} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم الفندق (إنجليزي):' : 'Hotel Name (English):'}
                </label>
                <input type="text" value={settings.hotelNameEn} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'العنوان:' : 'Address:'}
                </label>
                <input type="text" value={settings.address} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'الهاتف:' : 'Phone:'}
                </label>
                <input type="tel" value={settings.phone} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                </label>
                <input type="email" value={settings.email} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'الموقع الإلكتروني:' : 'Website:'}
                </label>
                <input type="url" value={settings.website} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إعدادات العمليات' : 'Operations Settings'}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'وقت تسجيل الدخول:' : 'Check-in Time:'}
                </label>
                <input type="time" value={settings.checkInTime} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'وقت تسجيل الخروج:' : 'Check-out Time:'}
                </label>
                <input type="time" value={settings.checkOutTime} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-6">
              <div className="flex items-start gap-3">
                <i className="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? 'معلومات' : 'Information'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' 
                      ? 'سيتم تطبيق هذه الأوقات على جميع الحجوزات الجديدة. يمكن تغييرها لاحقاً في إعدادات كل حجز على حدة.'
                      : 'These times will be applied to all new bookings. They can be changed later in individual booking settings.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <input type="checkbox" checked={settings.emailNotifications} className="w-5 h-5 rounded" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'إرسال إشعارات عبر البريد الإلكتروني' : 'Send notifications via email'}</div>
                </div>
                <i className="fas fa-envelope text-2xl text-blue-600"></i>
              </label>
              
              <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <input type="checkbox" checked={settings.smsNotifications} className="w-5 h-5 rounded" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'إرسال إشعارات عبر الرسائل النصية' : 'Send notifications via SMS'}</div>
                </div>
                <i className="fas fa-sms text-2xl text-green-600"></i>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إعدادات النسخ الاحتياطي' : 'Backup Settings'}
            </h3>
            <div className="space-y-6">
              <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
                <input type="checkbox" checked={settings.autoBackup} className="w-5 h-5 rounded" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{language === 'ar' ? 'النسخ الاحتياطي التلقائي' : 'Automatic Backup'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'إنشاء نسخة احتياطية تلقائياً كل يوم' : 'Create automatic backup daily'}</div>
                </div>
              </label>
              
              {settings.autoBackup && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'وقت النسخ الاحتياطي:' : 'Backup Time:'}
                  </label>
                  <input type="time" value={settings.backupTime} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white max-w-xs" />
                </div>
              )}

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'نسخ احتياطي يدوي' : 'Manual Backup'}
                </h4>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2">
                    <i className="fas fa-download"></i>
                    {language === 'ar' ? 'إنشاء نسخة احتياطية الآن' : 'Create Backup Now'}
                  </button>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2">
                    <i className="fas fa-upload"></i>
                    {language === 'ar' ? 'استعادة من نسخة احتياطية' : 'Restore from Backup'}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? 'تنبيه' : 'Warning'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {language === 'ar' 
                        ? 'تأكد من حفظ النسخ الاحتياطية في مكان آمن. استعادة نسخة احتياطية سيحذف جميع البيانات الحالية.'
                        : 'Make sure to keep backups in a safe location. Restoring a backup will delete all current data.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
          <button className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold">
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2">
            <i className="fas fa-save"></i>
            {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
