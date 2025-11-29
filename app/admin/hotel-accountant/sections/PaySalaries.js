'use client'

import { useState } from 'react'

export default function PaySalaries({ language }) {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      nameAr: 'أحمد محمد الحسيني',
      nameEn: 'Ahmed Mohammed Al-Husseini',
      role: 'مدير الاستقبال',
      salary: 2500000,
      month: 'نوفمبر 2025',
      paid: true
    },
    {
      id: 2,
      nameAr: 'فاطمة علي السعدي',
      nameEn: 'Fatima Ali Al-Saadi',
      role: 'مسؤولة التدبير المنزلي',
      salary: 2200000,
      month: 'نوفمبر 2025',
      paid: false
    },
    {
      id: 3,
      nameAr: 'محمود حسن الكاظمي',
      nameEn: 'Mahmoud Hassan Al-Kadhimi',
      role: 'رئيس الطهاة',
      salary: 2800000,
      month: 'نوفمبر 2025',
      paid: true
    },
    {
      id: 4,
      nameAr: 'عمر يوسف البصري',
      nameEn: 'Omar Youssef Al-Basri',
      role: 'فني الصيانة والكهرباء',
      salary: 2000000,
      month: 'نوفمبر 2025',
      paid: false
    }
  ])
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handlePaySalary = (employee) => {
    setSelectedEmployee(employee)
    setShowPayModal(true)
  }

  const confirmPayment = () => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, paid: true } : emp
      ))
      setShowPayModal(false)
      setSelectedEmployee(null)
    }
  }

  const totalSalaries = employees.reduce((sum, emp) => sum + parseFloat(emp.salary), 0)
  const paidSalaries = employees.filter(emp => emp.paid).reduce((sum, emp) => sum + parseFloat(emp.salary), 0)
  const unpaidSalaries = totalSalaries - paidSalaries

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
        {language === 'ar' ? 'دفع رواتب الموظفين' : 'Pay Employee Salaries'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-money-bill-wave text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'إجمالي الرواتب' : 'Total Salaries'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSalaries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'المدفوعة' : 'Paid'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{paidSalaries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-exclamation-circle text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'المتبقية' : 'Remaining'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{unpaidSalaries.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <tr>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'اسم الموظف' : 'Employee Name'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الوظيفة' : 'Role'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الراتب' : 'Salary'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الشهر' : 'Month'}</th>
              <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {language === 'ar' ? employee.nameAr : employee.nameEn}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{employee.role}</td>
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {employee.salary.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{employee.month}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    employee.paid 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {employee.paid 
                      ? (language === 'ar' ? 'مدفوع' : 'Paid')
                      : (language === 'ar' ? 'غير مدفوع' : 'Unpaid')
                    }
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {!employee.paid && (
                    <button
                      onClick={() => handlePaySalary(employee)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <i className="fas fa-money-bill mr-2"></i>
                      {language === 'ar' ? 'دفع' : 'Pay'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPayModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تأكيد دفع الراتب' : 'Confirm Salary Payment'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{language === 'ar' ? 'الموظف' : 'Employee'}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? selectedEmployee.nameAr : selectedEmployee.nameEn}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{language === 'ar' ? 'المبلغ' : 'Amount'}</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedEmployee.salary.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'وسيلة الدفع' : 'Payment Method'}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="cash">{language === 'ar' ? 'نقدي' : 'Cash'}</option>
                  <option value="bank">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option value="card">{language === 'ar' ? 'بطاقة' : 'Card'}</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={confirmPayment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? 'تأكيد الدفع' : 'Confirm Payment'}
                </button>
                <button
                  onClick={() => { setShowPayModal(false); setSelectedEmployee(null); }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
