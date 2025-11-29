'use client'

import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

Chart.register(...registerables)

export default function Dashboard() {
  const revenueChartRef = useRef(null)
  const occupancyChartRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  const stats = [
    { title: t.hotelsCount, value: '5', icon: 'fa-hotel', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', trend: '+2' },
    { title: t.occupiedRooms, value: '24', icon: 'fa-bed', bgColor: 'bg-green-100', iconColor: 'text-green-600', trend: '-3' },
    { title: t.todayReservations, value: '8', icon: 'fa-calendar-check', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600', trend: '+4' },
    { title: t.todayRevenue, value: '12,450', icon: 'fa-dollar-sign', bgColor: 'bg-purple-100', iconColor: 'text-purple-600', trend: '+1,200' },
  ]

  const recentReservations = [
    { id: 1001, customer: 'أحمد محمد', date: '2025-11-15', status: 'confirmed' },
    { id: 1002, customer: 'سارة عبدالله', date: '2025-11-16', status: 'pending' },
    { id: 1003, customer: 'خالد أحمد', date: '2025-11-17', status: 'confirmed' },
    { id: 1004, customer: 'نورة سعيد', date: '2025-11-18', status: 'confirmed' },
  ]

  const [urgentTasks, setUrgentTasks] = useState([
    { id: 1, title: 'تنظيف غرفة 101', description: 'تنظيف شامل للغرفة', priority: 'high', dueDate: '2025-11-16', completed: false },
    { id: 2, title: 'إصلاح تكييف غرفة 203', description: 'التكييف لا يعمل بشكل جيد', priority: 'high', dueDate: '2025-11-15', completed: false },
    { id: 3, title: 'فحص نظام الأمن', description: 'فحص كاميرات المراقبة', priority: 'medium', dueDate: '2025-11-18', completed: false },
  ])

  const handleCompleteTask = (taskId) => {
    const task = urgentTasks.find(t => t.id === taskId)
    const message = language === 'ar' 
      ? `هل أنت متأكد من إكمال المهمة: ${task.title}?` 
      : `Are you sure you want to complete: ${task.title}?`
    
    if (confirm(message)) {
      setUrgentTasks(urgentTasks.filter(task => task.id !== taskId))
      const successMessage = language === 'ar' ? 'تم إكمال المهمة بنجاح!' : 'Task completed successfully!'
      alert(successMessage)
    }
  }

  useEffect(() => {
    // Revenue Chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext('2d')
      const monthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو']
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: language === 'ar' ? monthsAr : monthsEn,
          datasets: [{
            label: t.monthlyRevenue,
            data: [12000000, 19000000, 15000000, 18000000, 22000000, 25000000, 28000000],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })

      return () => chart.destroy()
    }
  }, [language, t])

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-gray-600 hover:shadow-2xl transition-all animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-bold mb-2">{stat.title}</p>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-base mt-3 font-bold text-green-700 dark:text-green-400">
                  <i className="fas fa-arrow-up ml-1"></i> {stat.trend}
                </p>
              </div>
              <div className={`p-5 rounded-2xl ${stat.bgColor} dark:bg-gray-700 shadow-lg`}>
                <i className={`fas ${stat.icon} ${stat.iconColor} dark:text-blue-400 text-3xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">{t.monthlyRevenue}</h3>
          <div className="h-72">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">{t.occupancyRate}</h3>
          <div className="h-72 flex items-center justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <p className="text-5xl font-black text-blue-600 dark:text-blue-400">75%</p>
                  <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mt-2">{t.todayOccupancy}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 transform -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">{t.recentReservations}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                <tr>
                  <th className="px-5 py-4 text-right text-sm font-black text-gray-800 dark:text-white uppercase">{t.reservationNumber}</th>
                  <th className="px-5 py-4 text-right text-sm font-black text-gray-800 dark:text-white uppercase">{t.customer}</th>
                  <th className="px-5 py-4 text-right text-sm font-black text-gray-800 dark:text-white uppercase">{t.date}</th>
                  <th className="px-5 py-4 text-right text-sm font-black text-gray-800 dark:text-white uppercase">{t.status}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap text-base font-bold text-gray-900 dark:text-white">#{reservation.id}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-base font-bold text-gray-900 dark:text-white">{reservation.customer}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-base font-bold text-gray-700 dark:text-gray-300">{reservation.date}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-4 py-2 text-sm font-black rounded-xl shadow-md ${
                        reservation.status === 'confirmed' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {reservation.status === 'confirmed' ? t.confirmed : t.pending}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">{t.urgentTasks}</h3>
          <div className="space-y-4">
            {urgentTasks.map((task) => (
              <div key={task.id} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-lg text-gray-900 dark:text-white">{task.title}</h4>
                    <p className="text-base font-bold text-gray-700 dark:text-gray-300 mt-2">{task.description}</p>
                  </div>
                  <span className={`text-sm font-black px-4 py-2 rounded-xl shadow-lg ${
                    task.priority === 'high' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {task.priority === 'high' ? t.high : t.medium}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center pt-3 border-t-2 border-gray-200 dark:border-gray-600">
                  <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                    <i className="far fa-clock ml-2"></i> {task.dueDate}
                  </span>
                  <button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="text-base font-black bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    {t.completed}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
