'use client'

import { useState } from 'react'

export default function PartnersSection({ language }) {
  const [partners, setPartners] = useState([
    { id: 1, nameAr: 'شركة السياحة الذهبية', nameEn: 'Golden Tourism Company', contactPerson: 'أحمد محمد', phone: '07701234567', commission: 10 },
    { id: 2, nameAr: 'مكتب الرحلات العالمية', nameEn: 'International Travels Office', contactPerson: 'فاطمة علي', phone: '07712345678', commission: 12 },
    { id: 3, nameAr: 'وكالة الأفق للسفر', nameEn: 'Horizon Travel Agency', contactPerson: 'محمود حسن', phone: '07723456789', commission: 8 },
    { id: 4, nameAr: 'شركة النجوم السبعة', nameEn: 'Seven Stars Company', contactPerson: 'سارة يوسف', phone: '07734567890', commission: 15 },
    { id: 5, nameAr: 'مجموعة الرحلات المميزة', nameEn: 'Premium Tours Group', contactPerson: 'عمر خالد', phone: '07745678901', commission: 11 }
  ])
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الشركاء' : 'Partners Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-handshake"></i>
            {language === 'ar' ? 'إدارة شركاء الفرع' : 'Manage branch partners'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إضافة شريك' : 'Add Partner'}
        </button>
      </div>

      <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'اسم الشريك' : 'Partner Name'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'نسبة المساهمة' : 'Share %'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'الهاتف' : 'Phone'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'تاريخ الانضمام' : 'Join Date'}
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-700 transition-all transform hover:scale-[1.02] cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? partner.nameAr : partner.nameEn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg">
                    {partner.share}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {partner.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {partner.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {partner.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 justify-center">
                    <button className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-110 transition-all">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-purple-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-handshake text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة شريك جديد' : 'Add New Partner'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'} className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'} className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'نسبة المساهمة %' : 'Share %'} className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="tel" placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="email" placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'} className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="date" className="w-full px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
