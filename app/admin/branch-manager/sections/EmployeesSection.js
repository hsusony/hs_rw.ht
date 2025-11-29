'use client'

import { useState } from 'react'

export default function EmployeesSection({ language }) {
  const [employees, setEmployees] = useState([
    { id: 1, nameAr: 'أحمد محمد الحسيني', nameEn: 'Ahmed Mohammed Al-Husseini', role: 'accountant', salary: 2500000, phone: '07701234567', email: 'ahmed@hotel.com', permissions: ['view_reports', 'manage_finance', 'manage_bookings'] },
    { id: 2, nameAr: 'فاطمة علي السعدي', nameEn: 'Fatima Ali Al-Saadi', role: 'reception', salary: 1800000, phone: '07712345678', email: 'fatima@hotel.com', permissions: ['manage_bookings', 'manage_rooms', 'view_reports'] },
    { id: 3, nameAr: 'عمر يوسف البصري', nameEn: 'Omar Youssef Al-Basri', role: 'maintenance', salary: 2000000, phone: '07723456789', email: 'omar@hotel.com', permissions: ['manage_maintenance', 'view_reports'] },
    { id: 4, nameAr: 'سارة عبدالله الجبوري', nameEn: 'Sara Abdullah Al-Jubouri', role: 'reception', salary: 1500000, phone: '07734567890', email: 'sara@hotel.com', permissions: ['manage_bookings', 'manage_rooms'] },
    { id: 5, nameAr: 'محمود حسن الكاظمي', nameEn: 'Mahmoud Hassan Al-Kadhimi', role: 'accountant', salary: 2200000, phone: '07745678901', email: 'mahmoud@hotel.com', permissions: ['view_reports', 'manage_finance'] },
    { id: 6, nameAr: 'زينب صالح النجفي', nameEn: 'Zainab Saleh Al-Najafi', role: 'cleaning', salary: 1200000, phone: '07756789012', email: 'zainab@hotel.com', permissions: ['manage_cleaning', 'view_reports'] }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  const getRoleInfo = (role) => {
    switch(role) {
      case 'accountant': 
        return { 
          nameAr: 'محاسب', 
          nameEn: 'Accountant', 
          color: 'from-green-500 to-emerald-500', 
          icon: 'fa-calculator' 
        }
      case 'reception': 
        return { 
          nameAr: 'ريسبشن', 
          nameEn: 'Reception', 
          color: 'from-blue-500 to-cyan-500', 
          icon: 'fa-concierge-bell' 
        }
      case 'maintenance': 
        return { 
          nameAr: 'صيانة', 
          nameEn: 'Maintenance', 
          color: 'from-orange-500 to-red-500', 
          icon: 'fa-tools' 
        }
      case 'cleaning': 
        return { 
          nameAr: 'تنظيف', 
          nameEn: 'Cleaning', 
          color: 'from-purple-500 to-pink-500', 
          icon: 'fa-broom' 
        }
      default: 
        return { 
          nameAr: 'موظف', 
          nameEn: 'Employee', 
          color: 'from-gray-500 to-gray-600', 
          icon: 'fa-user' 
        }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الموظفين' : 'Employees Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-user-tie"></i>
            {language === 'ar' ? 'فريق العمل والصلاحيات' : 'Staff and permissions'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة موظف' : 'Add Employee'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employees.map((employee) => {
          const roleInfo = getRoleInfo(employee.role)
          return (
            <div key={employee.id} className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 border-2 border-cyan-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-400 to-blue-400 opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${roleInfo.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <i className={`fas ${roleInfo.icon} text-3xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {language === 'ar' ? employee.nameAr : employee.nameEn}
                  </h3>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-gray-700/50 px-3 py-1 rounded-lg inline-block mt-1">
                    {language === 'ar' ? roleInfo.nameAr : roleInfo.nameEn}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div className="space-y-2.5 text-sm mb-4 relative z-10">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <i className="fas fa-phone text-cyan-500"></i>
                  <span className="font-semibold">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <i className="fas fa-envelope text-blue-500"></i>
                  <span className="font-semibold">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold">
                  <i className="fas fa-money-bill"></i>
                  <span>{employee.salary.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
                </div>
              </div>

              <div className="border-t-2 border-cyan-200 dark:border-gray-700 pt-4 relative z-10">
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  {language === 'ar' ? 'الصلاحيات:' : 'Permissions:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {employee.permissions.slice(0, 3).map((perm, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md">
                      {perm.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {employee.permissions.length > 3 && (
                    <span className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg text-xs font-bold shadow-md">
                      +{employee.permissions.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة موظف جديد' : 'Add New Employee'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <select className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                <option>{language === 'ar' ? 'الوظيفة' : 'Role'}</option>
                <option value="accountant">{language === 'ar' ? 'محاسب' : 'Accountant'}</option>
                <option value="reception">{language === 'ar' ? 'ريسبشن' : 'Reception'}</option>
                <option value="maintenance">{language === 'ar' ? 'صيانة' : 'Maintenance'}</option>
                <option value="cleaning">{language === 'ar' ? 'تنظيف' : 'Cleaning'}</option>
              </select>
              <input type="number" placeholder={language === 'ar' ? 'الراتب' : 'Salary'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="tel" placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="email" placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              
              <div className="col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'ar' ? 'الصلاحيات:' : 'Permissions:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">{language === 'ar' ? 'عرض التقارير' : 'View Reports'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">{language === 'ar' ? 'إدارة الحجوزات' : 'Manage Bookings'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">{language === 'ar' ? 'إدارة المالية' : 'Manage Finance'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">{language === 'ar' ? 'إدارة الغرف' : 'Manage Rooms'}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
