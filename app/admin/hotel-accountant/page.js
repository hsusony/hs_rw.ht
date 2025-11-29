'use client'
import { useState, useEffect } from 'react'
import ElectronicCards from './sections/ElectronicCards'
import ReceiptVoucher from './sections/ReceiptVoucher'
import PaymentVoucher from './sections/PaymentVoucher'
import ExpenseVoucher from './sections/ExpenseVoucher'
import PaySalaries from './sections/PaySalaries'
import AppCommissions from './sections/AppCommissions'
import MoneyTransfer from './sections/MoneyTransfer'
import PurchaseInvoice from './sections/PurchaseInvoice'
import Warehouses from './sections/Warehouses'
import InventoryItems from './sections/InventoryItems'
import StockIssue from './sections/StockIssue'

export default function HotelAccountantDashboard() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('ar')
  const [activeTab, setActiveTab] = useState('overview')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDarkMode])

  const tabs = [
    { id: 'overview', nameAr: 'نظرة عامة', nameEn: 'Overview', icon: 'fa-chart-line' },
    { id: 'cards', nameAr: 'البطاقات الإلكترونية', nameEn: 'Electronic Cards', icon: 'fa-credit-card' },
    { id: 'receipt', nameAr: 'سند قبض', nameEn: 'Receipt Voucher', icon: 'fa-money-bill-wave' },
    { id: 'payment', nameAr: 'سند دفع', nameEn: 'Payment Voucher', icon: 'fa-file-invoice-dollar' },
    { id: 'expense', nameAr: 'سند صرف مصروفات', nameEn: 'Expense Voucher', icon: 'fa-receipt' },
    { id: 'salaries', nameAr: 'دفع الرواتب', nameEn: 'Pay Salaries', icon: 'fa-wallet' },
    { id: 'commissions', nameAr: 'عمولات التطبيقات', nameEn: 'App Commissions', icon: 'fa-percentage' },
    { id: 'transfer', nameAr: 'نقل الأموال', nameEn: 'Money Transfer', icon: 'fa-exchange-alt' },
    { id: 'purchase', nameAr: 'فاتورة شراء', nameEn: 'Purchase Invoice', icon: 'fa-shopping-cart' },
    { id: 'warehouses', nameAr: 'المخازن', nameEn: 'Warehouses', icon: 'fa-warehouse' },
    { id: 'inventory', nameAr: 'المواد المخزنية', nameEn: 'Inventory Items', icon: 'fa-boxes' },
    { id: 'stockIssue', nameAr: 'سند صرف مخزني', nameEn: 'Stock Issue', icon: 'fa-dolly' }
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-calculator text-white text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'محاسب الفندق' : 'Hotel Accountant'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'إدارة الحسابات والمخازن' : 'Manage Accounts & Inventory'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all"
                >
                  <i className="fas fa-language ml-2"></i>
                  {language === 'ar' ? 'EN' : 'عربي'}
                </button>
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <i className={`fas ${isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600'} text-xl`}></i>
                </button>

                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-blue-600"></i>
                  </div>
                  <span className="text-white font-semibold">
                    {language === 'ar' ? 'أحمد المحاسب' : 'Ahmed Accountant'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <i className={`fas ${tab.icon} ml-2`}></i>
                  {language === 'ar' ? tab.nameAr : tab.nameEn}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && <OverviewSection language={language} />}
          {activeTab === 'cards' && <ElectronicCards language={language} />}
          {activeTab === 'receipt' && <ReceiptVoucher language={language} />}
          {activeTab === 'payment' && <PaymentVoucher language={language} />}
          {activeTab === 'expense' && <ExpenseVoucher language={language} />}
          {activeTab === 'salaries' && <PaySalaries language={language} />}
          {activeTab === 'commissions' && <AppCommissions language={language} />}
          {activeTab === 'transfer' && <MoneyTransfer language={language} />}
          {activeTab === 'purchase' && <PurchaseInvoice language={language} />}
          {activeTab === 'warehouses' && <Warehouses language={language} />}
          {activeTab === 'inventory' && <InventoryItems language={language} />}
          {activeTab === 'stockIssue' && <StockIssue language={language} />}
        </main>
      </div>
    </div>
  )
}

// Overview Section
function OverviewSection({ language }) {
  const stats = [
    {
      title: language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: '45,000,000',
      icon: 'fa-money-bill-wave',
      color: 'from-green-500 to-emerald-500',
      change: '+15%'
    },
    {
      title: language === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses',
      value: '28,500,000',
      icon: 'fa-receipt',
      color: 'from-red-500 to-rose-500',
      change: '+8%'
    },
    {
      title: language === 'ar' ? 'صافي الأرباح' : 'Net Profit',
      value: '16,500,000',
      icon: 'fa-chart-line',
      color: 'from-blue-500 to-cyan-500',
      change: '+22%'
    },
    {
      title: language === 'ar' ? 'الرصيد الحالي' : 'Current Balance',
      value: '52,300,000',
      icon: 'fa-wallet',
      color: 'from-purple-500 to-pink-500',
      change: '+12%'
    }
  ]

  const recentTransactions = [
    {
      id: 1,
      type: 'revenue',
      typeAr: 'سند قبض',
      typeEn: 'Receipt',
      description: 'حجز جناح VIP رقم 501 - السيد علي أحمد الجبوري',
      amount: 1250000,
      date: '2025-11-21 10:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      typeAr: 'سند دفع',
      typeEn: 'Payment',
      description: 'دفع فاتورة شركة الأطياف للمواد الغذائية',
      amount: -8750000,
      date: '2025-11-21 09:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'expense',
      typeAr: 'سند صرف',
      typeEn: 'Expense',
      description: 'فاتورة كهرباء وماء لشهر نوفمبر',
      amount: -2850000,
      date: '2025-11-20 16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'revenue',
      typeAr: 'سند قبض',
      typeEn: 'Receipt',
      description: 'حجز قاعة حفلات الزفاف - مؤسسة الفرح والسرور',
      amount: 7500000,
      date: '2025-11-20 14:20',
      status: 'completed'
    },
    {
      id: 5,
      type: 'expense',
      typeAr: 'راتب',
      typeEn: 'Salary',
      description: 'راتب محمود حسن الكاظمي - رئيس الطهاة - نوفمبر',
      amount: -2800000,
      date: '2025-11-20 11:00',
      status: 'completed'
    }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {language === 'ar' ? 'نظرة عامة' : 'Overview'}
      </h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <i className={`fas ${stat.icon} text-white text-2xl`}></i>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value} <span className="text-sm text-gray-500">{language === 'ar' ? 'د.ع' : 'IQD'}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <i className="fas fa-history text-blue-600"></i>
          {language === 'ar' ? 'آخر العمليات' : 'Recent Transactions'}
        </h3>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'revenue' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600' 
                    : 'bg-red-100 dark:bg-red-900 text-red-600'
                }`}>
                  <i className={`fas ${transaction.type === 'revenue' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{transaction.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${
                  transaction.type === 'revenue' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
