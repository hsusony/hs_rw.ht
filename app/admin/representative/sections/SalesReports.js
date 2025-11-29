'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export default function SalesReports({ language }) {
  const [dateRange, setDateRange] = useState('month') // day, week, month, year, custom
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reportType, setReportType] = useState('overview') // overview, detailed, customers, plans

  // Sample data
  const salesData = [
    { month: language === 'ar' ? 'كانون الثاني' : 'Jan', sales: 28500000, customers: 15, renewals: 12 },
    { month: language === 'ar' ? 'شباط' : 'Feb', sales: 32000000, customers: 18, renewals: 14 },
    { month: language === 'ar' ? 'آذار' : 'Mar', sales: 38000000, customers: 22, renewals: 16 },
    { month: language === 'ar' ? 'نيسان' : 'Apr', sales: 35000000, customers: 20, renewals: 15 },
    { month: language === 'ar' ? 'أيار' : 'May', sales: 43000000, customers: 25, renewals: 18 },
    { month: language === 'ar' ? 'حزيران' : 'Jun', sales: 48000000, customers: 28, renewals: 20 },
    { month: language === 'ar' ? 'تموز' : 'Jul', sales: 41000000, customers: 24, renewals: 17 },
    { month: language === 'ar' ? 'آب' : 'Aug', sales: 45000000, customers: 26, renewals: 19 },
    { month: language === 'ar' ? 'أيلول' : 'Sep', sales: 39000000, customers: 23, renewals: 16 },
    { month: language === 'ar' ? 'تشرين الأول' : 'Oct', sales: 48000000, customers: 27, renewals: 21 },
    { month: language === 'ar' ? 'تشرين الثاني' : 'Nov', sales: 42000000, customers: 24, renewals: 18 }
  ]

  const planDistribution = [
    { name: language === 'ar' ? 'شهري' : 'Monthly', value: 35, sales: 17500000, color: '#3B82F6' },
    { name: language === 'ar' ? 'ربع سنوي' : 'Quarterly', value: 25, sales: 30000000, color: '#10B981' },
    { name: language === 'ar' ? 'نصف سنوي' : 'Semi-Annual', value: 20, sales: 40000000, color: '#F59E0B' },
    { name: language === 'ar' ? 'سنوي' : 'Annual', value: 20, sales: 70000000, color: '#8B5CF6' }
  ]

  const topCustomers = [
    { 
      id: 1, 
      name: 'فندق بغداد بالاس', 
      totalSales: 10500000, 
      subscriptions: 3, 
      plan: language === 'ar' ? 'سنوي' : 'Annual',
      lastPayment: '2025-11-15'
    },
    { 
      id: 2, 
      name: 'فندق النخيل', 
      totalSales: 8200000, 
      subscriptions: 4, 
      plan: language === 'ar' ? 'نصف سنوي' : 'Semi-Annual',
      lastPayment: '2025-11-10'
    },
    { 
      id: 3, 
      name: 'فندق دجلة', 
      totalSales: 7500000, 
      subscriptions: 2, 
      plan: language === 'ar' ? 'سنوي' : 'Annual',
      lastPayment: '2025-11-08'
    },
    { 
      id: 4, 
      name: 'فندق السلام', 
      totalSales: 6300000, 
      subscriptions: 5, 
      plan: language === 'ar' ? 'ربع سنوي' : 'Quarterly',
      lastPayment: '2025-11-05'
    },
    { 
      id: 5, 
      name: 'فندق الرشيد', 
      totalSales: 5800000, 
      subscriptions: 3, 
      plan: language === 'ar' ? 'شهري' : 'Monthly',
      lastPayment: '2025-11-12'
    }
  ]

  const detailedTransactions = [
    {
      id: 1,
      date: '2025-11-18',
      customer: 'فندق بغداد بالاس',
      type: language === 'ar' ? 'اشتراك جديد' : 'New Subscription',
      plan: language === 'ar' ? 'سنوي' : 'Annual',
      amount: 3500000,
      paymentMethod: language === 'ar' ? 'نقدي' : 'Cash',
      representative: 'أحمد المندوب'
    },
    {
      id: 2,
      date: '2025-11-17',
      customer: 'فندق النخيل',
      type: language === 'ar' ? 'تجديد' : 'Renewal',
      plan: language === 'ar' ? 'نصف سنوي' : 'Semi-Annual',
      amount: 2000000,
      paymentMethod: language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer',
      representative: 'أحمد المندوب'
    },
    {
      id: 3,
      date: '2025-11-16',
      customer: 'فندق دجلة',
      type: language === 'ar' ? 'فرع جديد' : 'New Branch',
      plan: language === 'ar' ? 'ربع سنوي' : 'Quarterly',
      amount: 1200000,
      paymentMethod: language === 'ar' ? 'شيك' : 'Check',
      representative: 'أحمد المندوب'
    },
    {
      id: 4,
      date: '2025-11-15',
      customer: 'فندق السلام',
      type: language === 'ar' ? 'اشتراك جديد' : 'New Subscription',
      plan: language === 'ar' ? 'شهري' : 'Monthly',
      amount: 500000,
      paymentMethod: language === 'ar' ? 'نقدي' : 'Cash',
      representative: 'أحمد المندوب'
    },
    {
      id: 5,
      date: '2025-11-14',
      customer: 'فندق الرشيد',
      type: language === 'ar' ? 'تجديد' : 'Renewal',
      plan: language === 'ar' ? 'سنوي' : 'Annual',
      amount: 3500000,
      paymentMethod: language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer',
      representative: 'أحمد المندوب'
    }
  ]

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0)
  const totalRenewals = salesData.reduce((sum, item) => sum + item.renewals, 0)
  const avgSalesPerMonth = totalSales / salesData.length

  const handleExport = (format) => {
    alert(`${language === 'ar' ? 'جاري تصدير التقرير بصيغة' : 'Exporting report as'} ${format}`)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-chart-pie text-green-600"></i>
          {language === 'ar' ? 'تقارير المبيعات' : 'Sales Reports'}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('PDF')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-file-pdf"></i>
            PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-file-excel"></i>
            Excel
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-print"></i>
            {language === 'ar' ? 'طباعة' : 'Print'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {language === 'ar' ? 'نوع التقرير' : 'Report Type'}
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="overview">{language === 'ar' ? 'نظرة عامة' : 'Overview'}</option>
              <option value="detailed">{language === 'ar' ? 'تفصيلي' : 'Detailed'}</option>
              <option value="customers">{language === 'ar' ? 'حسب العملاء' : 'By Customers'}</option>
              <option value="plans">{language === 'ar' ? 'حسب الباقات' : 'By Plans'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {language === 'ar' ? 'الفترة الزمنية' : 'Time Period'}
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="day">{language === 'ar' ? 'اليوم' : 'Today'}</option>
              <option value="week">{language === 'ar' ? 'هذا الأسبوع' : 'This Week'}</option>
              <option value="month">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</option>
              <option value="year">{language === 'ar' ? 'هذه السنة' : 'This Year'}</option>
              <option value="custom">{language === 'ar' ? 'فترة مخصصة' : 'Custom Period'}</option>
            </select>
          </div>

          {dateRange === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'من تاريخ' : 'Start Date'}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'إلى تاريخ' : 'End Date'}
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <i className="fas fa-dollar-sign text-3xl opacity-80"></i>
            <span className="text-sm opacity-80">{language === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{totalSales.toLocaleString()}</p>
          <p className="text-sm opacity-80">{language === 'ar' ? 'د.ع' : 'IQD'}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <i className="fas fa-users text-3xl opacity-80"></i>
            <span className="text-sm opacity-80">{language === 'ar' ? 'إجمالي العملاء' : 'Total Customers'}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{totalCustomers}</p>
          <p className="text-sm opacity-80">{language === 'ar' ? 'عميل' : 'Customers'}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <i className="fas fa-sync text-3xl opacity-80"></i>
            <span className="text-sm opacity-80">{language === 'ar' ? 'التجديدات' : 'Renewals'}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{totalRenewals}</p>
          <p className="text-sm opacity-80">{language === 'ar' ? 'تجديد' : 'Renewals'}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <i className="fas fa-chart-line text-3xl opacity-80"></i>
            <span className="text-sm opacity-80">{language === 'ar' ? 'متوسط المبيعات' : 'Avg Sales'}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{avgSalesPerMonth.toFixed(0).toLocaleString()}</p>
          <p className="text-sm opacity-80">{language === 'ar' ? 'د.ع / شهر' : 'IQD / Month'}</p>
        </div>
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fas fa-chart-line text-blue-600"></i>
              {language === 'ar' ? 'اتجاه المبيعات' : 'Sales Trend'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name={language === 'ar' ? 'المبيعات' : 'Sales'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fas fa-chart-pie text-purple-600"></i>
              {language === 'ar' ? 'توزيع الباقات' : 'Plan Distribution'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Detailed Report */}
      {reportType === 'detailed' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fas fa-list"></i>
              {language === 'ar' ? 'المعاملات التفصيلية' : 'Detailed Transactions'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'الباقة' : 'Plan'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'طريقة الدفع' : 'Payment'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {language === 'ar' ? 'المندوب' : 'Rep'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {detailedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {transaction.plan}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                      {transaction.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {transaction.representative}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Report */}
      {reportType === 'customers' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fas fa-trophy"></i>
              {language === 'ar' ? 'أفضل العملاء' : 'Top Customers'}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {customer.name}
                    </h4>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <i className="fas fa-box ml-1"></i>
                        {customer.subscriptions} {language === 'ar' ? 'اشتراكات' : 'subscriptions'}
                      </span>
                      <span>
                        <i className="fas fa-tag ml-1"></i>
                        {customer.plan}
                      </span>
                      <span>
                        <i className="fas fa-calendar ml-1"></i>
                        {customer.lastPayment}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-green-600">
                      {customer.totalSales.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{language === 'ar' ? 'د.ع' : 'IQD'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Plans Report */}
      {reportType === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planDistribution.map((plan) => (
            <div key={plan.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${plan.color}20` }}>
                  <i className="fas fa-box text-2xl" style={{ color: plan.color }}></i>
                </div>
                <span className="text-2xl font-bold" style={{ color: plan.color }}>
                  {plan.value}%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'المبيعات' : 'Sales'}:
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {plan.sales.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all" 
                    style={{ width: `${plan.value}%`, backgroundColor: plan.color }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
