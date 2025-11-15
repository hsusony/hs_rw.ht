'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function Reports() {
  const bookingsChartRef = useRef(null)
  const roomTypesChartRef = useRef(null)

  const topCustomers = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', reservations: 5, totalSpent: 1245000, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'نورة سعيد', email: 'nora@example.com', reservations: 4, totalSpent: 996000, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 3, name: 'سارة عبدالله', email: 'sara@example.com', reservations: 3, totalSpent: 738000, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ]

  useEffect(() => {
    // Bookings Revenue Chart
    if (bookingsChartRef.current) {
      const ctx = bookingsChartRef.current.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          datasets: [{
            label: 'الإيرادات',
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
  }, [])

  useEffect(() => {
    // Room Types Chart
    if (roomTypesChartRef.current) {
      const ctx = roomTypesChartRef.current.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['فردية', 'مزدوجة', 'سويت', 'ديلوكس', 'عائلية'],
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
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-IQ').format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">التقارير والإحصائيات</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
          <i className="fas fa-file-export ml-2"></i> تصدير التقرير
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">إيرادات الحجوزات</h3>
          <div className="h-64">
            <canvas ref={bookingsChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">توزيع أنواع الغرف</h3>
          <div className="h-64">
            <canvas ref={roomTypesChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">أفضل العملاء</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الحجوزات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي الإنفاق</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={customer.image} alt="" />
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.reservations}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 currency-iqd">
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
