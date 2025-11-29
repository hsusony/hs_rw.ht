'use client'

import Image from 'next/image'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

Chart.register(...registerables)

export default function Reports() {
  const { language } = useLanguage()
  const t = translations[language]
  const bookingsChartRef = useRef(null)
  const roomTypesChartRef = useRef(null)

  const topCustomers = [
    { id: 1, name: 'أحمد محمد', reservations: 15, revenue: 2500000 },
    { id: 2, name: 'سارة عبدالله', reservations: 12, revenue: 2100000 },
    { id: 3, name: 'خالد أحمد', reservations: 10, revenue: 1800000 },
  ]

  useEffect(() => {
    // Bookings Revenue Chart
    if (bookingsChartRef.current) {
      const ctx = bookingsChartRef.current.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: language === 'ar' 
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
            : ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: language === 'ar' ? 'الإيرادات' : 'Revenue',
            data: [12000000, 19000000, 15000000, 18000000, 22000000, 25000000],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      })
      return () => chart.destroy()
    }
  }, [language])

  useEffect(() => {
    // Room Types Chart
    if (roomTypesChartRef.current) {
      const ctx = roomTypesChartRef.current.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: language === 'ar'
            ? ['فردية', 'مزدوجة', 'سويت', 'ديلوكس', 'عائلية']
            : ['Single', 'Double', 'Suite', 'Deluxe', 'Family'],
          datasets: [{
            data: [15, 25, 10, 20, 30],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(239, 68, 68, 0.7)',
            ],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
        },
      })
      return () => chart.destroy()
    }
  }, [language])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-IQ').format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.reportsAndStatistics}</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
          <i className="fas fa-file-export ml-2"></i> {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.bookingsRevenue}</h3>
          <div className="h-64">
            <canvas ref={bookingsChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{language === 'ar' ? 'توزيع أنواع الغرف' : 'Room Types Distribution'}</h3>
          <div className="h-64">
            <canvas ref={roomTypesChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{language === 'ar' ? 'أفضل العملاء' : 'Top Customers'}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t.customer}</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{language === 'ar' ? 'عدد الحجوزات' : 'Reservations'}</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{language === 'ar' ? 'إجمالي الإنفاق' : 'Total Spending'}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image src={customer.image} alt="Customer" width={40} height={40} className="object-cover" unoptimized />
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{customer.reservations}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 currency-iqd">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
