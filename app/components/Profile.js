'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Profile() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('personal')
  const isAdmin = true // يمكن تغييره حسب صلاحيات المستخدم
  
  const [profileData, setProfileData] = useState({
    name: 'أحمد محمد',
    nameEn: 'Ahmed Mohammed',
    email: 'ahmed@hotel.com',
    phone: '+964 770 123 4567',
    position: 'مدير النظام',
    positionEn: 'System Manager',
    joinDate: '2023-01-15',
    department: 'الإدارة',
    departmentEn: 'Management',
    address: 'بغداد، العراق',
    addressEn: 'Baghdad, Iraq',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSaveProfile = () => {
    const message = language === 'ar' 
      ? 'تم حفظ التغييرات بنجاح!' 
      : 'Changes saved successfully!'
    alert(message)
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      const message = language === 'ar' 
        ? 'كلمة المرور الجديدة غير متطابقة!' 
        : 'New passwords do not match!'
      alert(message)
      return
    }
    const message = language === 'ar' 
      ? 'تم تغيير كلمة المرور بنجاح!' 
      : 'Password changed successfully!'
    alert(message)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header with Profile Picture */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                <i className="fas fa-camera text-sm"></i>
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {language === 'ar' ? profileData.name : profileData.nameEn}
              </h1>
              <p className="text-blue-100 text-lg">
                {language === 'ar' ? profileData.position : profileData.positionEn}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                {language === 'ar' ? `عضو منذ: ${profileData.joinDate}` : `Member since: ${profileData.joinDate}`}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-4 px-6 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'personal'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-user ml-2"></i>
              {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-6 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-lock ml-2"></i>
              {language === 'ar' ? 'الأمان' : 'Security'}
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-6 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'activity'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-history ml-2"></i>
              {language === 'ar' ? 'سجل النشاط' : 'Activity Log'}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الكامل (عربي)' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الاسم الكامل (إنجليزي)' : 'Full Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.nameEn}
                    onChange={(e) => setProfileData({ ...profileData, nameEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المنصب (عربي)' : 'Position (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    disabled={!isAdmin}
                    className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      !isAdmin ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60' : ''
                    }`}
                  />
                  {!isAdmin && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ar' ? 'يمكن تعديل هذا الحقل من قبل مدير النظام فقط' : 'This field can only be edited by system administrator'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المنصب (إنجليزي)' : 'Position (English)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.positionEn}
                    onChange={(e) => setProfileData({ ...profileData, positionEn: e.target.value })}
                    disabled={!isAdmin}
                    className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      !isAdmin ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60' : ''
                    }`}
                  />
                  {!isAdmin && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ar' ? 'يمكن تعديل هذا الحقل من قبل مدير النظام فقط' : 'This field can only be edited by system administrator'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'القسم (عربي)' : 'Department (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'القسم (إنجليزي)' : 'Department (English)'}
                  </label>
                  <input
                    type="text"
                    value={profileData.departmentEn}
                    onChange={(e) => setProfileData({ ...profileData, departmentEn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'العنوان' : 'Address'}
                  </label>
                  <textarea
                    value={language === 'ar' ? profileData.address : profileData.addressEn}
                    onChange={(e) => setProfileData({ 
                      ...profileData, 
                      [language === 'ar' ? 'address' : 'addressEn']: e.target.value 
                    })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  onClick={handleChangePassword}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <i className="fas fa-key ml-2"></i>
                  {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                </button>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  <i className="fas fa-exclamation-triangle ml-2"></i>
                  {language === 'ar' ? 'نصائح الأمان' : 'Security Tips'}
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 mr-6">
                  <li>{language === 'ar' ? '• استخدم كلمة مرور قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز' : '• Use a strong password with uppercase, lowercase, numbers and symbols'}</li>
                  <li>{language === 'ar' ? '• لا تشارك كلمة المرور مع أي شخص' : '• Do not share your password with anyone'}</li>
                  <li>{language === 'ar' ? '• قم بتغيير كلمة المرور بشكل دوري' : '• Change your password regularly'}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                {language === 'ar' ? 'سجل النشاط' : 'Activity Log'}
              </h2>

              <div className="space-y-4">
                {[
                  { 
                    action: language === 'ar' ? 'تسجيل الدخول' : 'Login', 
                    actionEn: 'Login',
                    time: '2024-11-16 09:30 AM', 
                    ip: '192.168.1.100',
                    icon: 'fa-sign-in-alt',
                    color: 'green'
                  },
                  { 
                    action: language === 'ar' ? 'تحديث الإعدادات' : 'Settings Updated', 
                    actionEn: 'Settings Updated',
                    time: '2024-11-15 04:20 PM', 
                    ip: '192.168.1.100',
                    icon: 'fa-cog',
                    color: 'blue'
                  },
                  { 
                    action: language === 'ar' ? 'إضافة حجز جديد' : 'New Reservation Added', 
                    actionEn: 'New Reservation Added',
                    time: '2024-11-15 02:15 PM', 
                    ip: '192.168.1.100',
                    icon: 'fa-plus-circle',
                    color: 'purple'
                  },
                  { 
                    action: language === 'ar' ? 'تسجيل الخروج' : 'Logout', 
                    actionEn: 'Logout',
                    time: '2024-11-14 06:00 PM', 
                    ip: '192.168.1.100',
                    icon: 'fa-sign-out-alt',
                    color: 'gray'
                  },
                  { 
                    action: language === 'ar' ? 'تسجيل الدخول' : 'Login', 
                    actionEn: 'Login',
                    time: '2024-11-14 08:00 AM', 
                    ip: '192.168.1.100',
                    icon: 'fa-sign-in-alt',
                    color: 'green'
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-10 h-10 rounded-full bg-${log.color}-100 dark:bg-${log.color}-900 flex items-center justify-center flex-shrink-0`}>
                      <i className={`fas ${log.icon} text-${log.color}-600 dark:text-${log.color}-400`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white">{log.action}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{log.time}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">IP: {log.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
