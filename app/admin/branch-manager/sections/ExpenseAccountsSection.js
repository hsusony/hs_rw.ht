'use client'

import { useState } from 'react'

export default function ExpenseAccountsSection({ language }) {
  const [accounts, setAccounts] = useState([
    { id: 1, nameAr: 'رواتب الموظفين', nameEn: 'Staff Salaries', code: 'EXP-101', category: 'personnel', totalSpent: 15000000 },
    { id: 2, nameAr: 'فاتورة الكهرباء', nameEn: 'Electricity Bill', code: 'EXP-201', category: 'utilities', totalSpent: 3500000 },
    { id: 3, nameAr: 'فاتورة الماء', nameEn: 'Water Bill', code: 'EXP-202', category: 'utilities', totalSpent: 1200000 },
    { id: 4, nameAr: 'صيانة الغرف', nameEn: 'Room Maintenance', code: 'EXP-301', category: 'maintenance', totalSpent: 2800000 },
    { id: 5, nameAr: 'مواد النظافة', nameEn: 'Cleaning Supplies', code: 'EXP-401', category: 'supplies', totalSpent: 1500000 },
    { id: 6, nameAr: 'التسويق والإعلان', nameEn: 'Marketing & Advertising', code: 'EXP-501', category: 'marketing', totalSpent: 2200000 },
    { id: 7, nameAr: 'صيانة المعدات', nameEn: 'Equipment Maintenance', code: 'EXP-302', category: 'maintenance', totalSpent: 1800000 },
    { id: 8, nameAr: 'مستلزمات المطبخ', nameEn: 'Kitchen Supplies', code: 'EXP-402', category: 'supplies', totalSpent: 3200000 }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  const getCategoryColor = (category) => {
    switch(category) {
      case 'personnel': return 'from-blue-500 to-indigo-500'
      case 'utilities': return 'from-yellow-500 to-orange-500'
      case 'maintenance': return 'from-red-500 to-pink-500'
      case 'supplies': return 'from-green-500 to-teal-500'
      case 'marketing': return 'from-purple-500 to-violet-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'personnel': return 'fa-user-tie'
      case 'utilities': return 'fa-lightbulb'
      case 'maintenance': return 'fa-tools'
      case 'supplies': return 'fa-box'
      case 'marketing': return 'fa-bullhorn'
      default: return 'fa-file-invoice-dollar'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'حسابات المصروفات' : 'Expense Accounts'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-receipt"></i>
            {language === 'ar' ? 'تصنيف وتتبع المصروفات' : 'Classify and track expenses'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة حساب' : 'Add Account'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:rotate-1 border-2 border-amber-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400 to-orange-400 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(account.category)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                <i className={`fas ${getCategoryIcon(account.category)} text-3xl text-white`}></i>
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
            <div className="mb-3 relative z-10">
              <span className="px-4 py-2 bg-white/70 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold font-mono shadow-md backdrop-blur-sm">
                {account.code}
              </span>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4 relative z-10">
              {language === 'ar' ? account.nameAr : account.nameEn}
            </h3>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'إجمالي المصروفات:' : 'Total Spent:'}
              </div>
              <div className="text-2xl font-bold text-red-600">
                {account.totalSpent.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'إضافة حساب مصروفات' : 'Add Expense Account'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'اسم الحساب (عربي)' : 'Account Name (Arabic)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'اسم الحساب (إنجليزي)' : 'Account Name (English)'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'رمز الحساب' : 'Account Code'} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <select className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white">
                <option>{language === 'ar' ? 'الفئة' : 'Category'}</option>
                <option value="personnel">{language === 'ar' ? 'الموظفين' : 'Personnel'}</option>
                <option value="utilities">{language === 'ar' ? 'المرافق' : 'Utilities'}</option>
                <option value="maintenance">{language === 'ar' ? 'الصيانة' : 'Maintenance'}</option>
                <option value="supplies">{language === 'ar' ? 'المستلزمات' : 'Supplies'}</option>
                <option value="marketing">{language === 'ar' ? 'التسويق' : 'Marketing'}</option>
              </select>
              <textarea placeholder={language === 'ar' ? 'الوصف' : 'Description'} rows="3" className="col-span-2 w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
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
