'use client'
import { useState, useEffect } from 'react'

export default function MaintenancePage() {
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedFloor, setSelectedFloor] = useState('all')
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [reportIssue, setReportIssue] = useState({ title: '', description: '', priority: 'عادية' })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // صلاحيات الموظف - الطوابق والغرف المخصصة له
  const [employeeAccess] = useState({
    name: 'موظف',
    assignedFloors: [],
    assignedRooms: [],
  })

  const [maintenanceRooms, setMaintenanceRooms] = useState([
    { id: 1, room: '201', issue: 'تسريب في الحمام', priority: 'high', status: 'inProgress', reportedBy: 'التنظيف', assignedTo: 'محمد علي', date: '2025-11-18' },
    { id: 2, room: '305', issue: 'مكيف لا يعمل', priority: 'high', status: 'pending', reportedBy: 'الاستقبال', assignedTo: '-', date: '2025-11-18' },
    { id: 3, room: '102', issue: 'باب معطل', priority: 'medium', status: 'completed', reportedBy: 'ضيف', assignedTo: 'أحمد حسن', date: '2025-11-17' },
    { id: 4, room: '401', issue: 'إضاءة ضعيفة', priority: 'low', status: 'inProgress', reportedBy: 'التنظيف', assignedTo: 'محمد علي', date: '2025-11-18' },
    { id: 5, room: '501', issue: 'تلفاز لا يعمل', priority: 'low', status: 'pending', reportedBy: 'ضيف', assignedTo: '-', date: '2025-11-18' }
  ])

  const [rooms, setRooms] = useState([
    { 
      number: '201', 
      floor: 2, 
      status: 'under_maintenance', 
      issue: 'تسريب في الحمام', 
      issueType: 'سباكة',
      priority: 'متوسطة',
      reportedBy: 'نزيل',
      reportedTime: '2024-11-17 15:30',
      waitingTime: 0,
      lastMaintenance: '2024-11-18 09:00'
    },
    { 
      number: '303', 
      floor: 3, 
      status: 'needs_maintenance', 
      issue: 'صنبور مكسور', 
      issueType: 'سباكة',
      priority: 'عاجلة',
      reportedBy: 'موظف تنظيف',
      reportedTime: '2024-11-18 06:00',
      waitingTime: 240,
      lastMaintenance: '2024-11-05 13:15'
    },
    { 
      number: '401', 
      floor: 4, 
      status: 'under_maintenance', 
      issue: 'تسريب هواء من المكيف', 
      issueType: 'تكييف',
      priority: 'متوسطة',
      reportedBy: 'استقبال',
      reportedTime: '2024-11-18 08:00',
      waitingTime: 90,
      lastMaintenance: '2024-11-14 17:00'
    },
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'needs_maintenance': return 'bg-gradient-to-r from-red-500 to-rose-500'
      case 'under_maintenance': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'completed': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'needs_maintenance': return language === 'ar' ? 'بحاجة للصيانة' : 'Needs Maintenance'
      case 'under_maintenance': return language === 'ar' ? 'قيد الصيانة' : 'Under Maintenance'
      case 'completed': return language === 'ar' ? 'مكتملة' : 'Completed'
      default: return status
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'عاجلة': return 'bg-red-600'
      case 'عالية': return 'bg-orange-600'
      case 'متوسطة': return 'bg-yellow-600'
      case 'منخفضة': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getIssueTypeIcon = (type) => {
    switch(type) {
      case 'كهرباء':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
      case 'سباكة':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>
      case 'تكييف':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
      case 'أثاث':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" /></svg>
      default:
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
    }
  }

  const getWaitingTimeColor = (minutes) => {
    if (minutes > 180) return 'text-red-600'
    if (minutes > 120) return 'text-orange-600'
    if (minutes > 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const filteredRooms = maintenanceRooms.filter(room => {
    if (!employeeAccess.assignedRooms.includes(room.number)) return false
    if (selectedFloor !== 'all' && room.floor !== parseInt(selectedFloor)) return false
    return true
  })

  const handleStatusChange = (roomNumber, newStatus) => {
    const currentTime = new Date()
    const hours = String(currentTime.getHours()).padStart(2, '0')
    const minutes = String(currentTime.getMinutes()).padStart(2, '0')
    const timeString = `${hours}:${minutes}`
    
    setMaintenanceRooms(maintenanceRooms.map(room => 
      room.number === roomNumber 
        ? { 
            ...room, 
            status: newStatus, 
            lastMaintenance: newStatus === 'completed' ? `2024-11-18 ${timeString}` : room.lastMaintenance,
            waitingTime: newStatus === 'completed' ? 0 : room.waitingTime 
          }
        : room
    ))
  }

  const handleReportToManagement = () => {
    if (!selectedRoom || !reportIssue.title || !reportIssue.description) return
    alert(`تم إرسال البلاغ للإدارة\nالغرفة: ${selectedRoom.number}\nالعنوان: ${reportIssue.title}\nالوصف: ${reportIssue.description}\nالأولوية: ${reportIssue.priority}`)
    setShowReportModal(false)
    setReportIssue({ title: '', description: '', priority: 'عادية' })
    setSelectedRoom(null)
  }

  const needsMaintenanceCount = filteredRooms.filter(r => r.status === 'needs_maintenance').length
  const underMaintenanceCount = filteredRooms.filter(r => r.status === 'under_maintenance').length
  const completedCount = filteredRooms.filter(r => r.status === 'completed').length
  const urgentCount = filteredRooms.filter(r => r.priority === 'عاجلة' && r.status !== 'completed').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'إدارة صيانة الغرف' : 'Room Maintenance Management'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'ar' ? `مرحباً ${employeeAccess.name} - الطوابق المخصصة: ${employeeAccess.assignedFloors.join(', ')}` : `Welcome ${employeeAccess.name} - Assigned Floors: ${employeeAccess.assignedFloors.join(', ')}`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
                {language === 'ar' ? 'English' : 'عربي'}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
                {darkMode ? (language === 'ar' ? 'فاتح' : 'Light') : (language === 'ar' ? 'داكن' : 'Dark')}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{needsMaintenanceCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'بحاجة للصيانة' : 'Needs Maintenance'}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{underMaintenanceCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'قيد الصيانة' : 'In Progress'}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{completedCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'مكتملة' : 'Completed'}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{urgentCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'حالات عاجلة' : 'Urgent Cases'}</div>
          </div>
        </div>

        {/* Floor Filter */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'فلترة حسب الطابق:' : 'Filter by Floor:'}
              </label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{language === 'ar' ? 'جميع الطوابق' : 'All Floors'}</option>
                {employeeAccess.assignedFloors.map(floor => (
                  <option key={floor} value={floor}>
                    {language === 'ar' ? `الطابق ${floor}` : `Floor ${floor}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.number} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
              <div className={`${getStatusColor(room.status)} text-white p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-black">{room.number}</div>
                  <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {language === 'ar' ? `الطابق ${room.floor}` : `Floor ${room.floor}`}
                  </div>
                </div>
                <div className={`${getPriorityColor(room.priority)} text-white text-xs font-bold px-2 py-1 rounded inline-block`}>
                  {room.priority}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الحالة:' : 'Status:'}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-white text-xs font-bold ${getStatusColor(room.status)}`}>
                      {getStatusText(room.status)}
                    </span>
                  </div>

                  <div className="mb-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="mt-0.5">
                        {getIssueTypeIcon(room.issueType)}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{room.issueType}</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{room.issue}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{room.reportedBy}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">{room.reportedTime}</span>
                    </div>

                    {room.status !== 'completed' && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-sm font-bold ${getWaitingTimeColor(room.waitingTime)}`}>
                          {language === 'ar' ? `فترة الانتظار: ${room.waitingTime} دقيقة` : `Waiting: ${room.waitingTime} min`}
                        </span>
                      </div>
                    )}

                    {room.lastMaintenance && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-600">
                        {language === 'ar' ? 'آخر صيانة:' : 'Last maintenance:'} {room.lastMaintenance}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {room.status === 'needs_maintenance' && (
                    <button
                      onClick={() => handleStatusChange(room.number, 'under_maintenance')}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      {language === 'ar' ? 'بدء الصيانة' : 'Start Maintenance'}
                    </button>
                  )}

                  {room.status === 'under_maintenance' && (
                    <button
                      onClick={() => handleStatusChange(room.number, 'completed')}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {language === 'ar' ? 'إنهاء الصيانة' : 'Complete Maintenance'}
                    </button>
                  )}

                  <button
                    onClick={() => { setSelectedRoom(room); setShowReportModal(true) }}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {language === 'ar' ? 'إبلاغ الإدارة' : 'Report to Management'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report to Management Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl border-4 border-purple-200 dark:border-purple-900">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <h3 className="text-2xl font-black">
                    {language === 'ar' ? `إبلاغ الإدارة - غرفة ${selectedRoom?.number}` : `Report to Management - Room ${selectedRoom?.number}`}
                  </h3>
                </div>
                <button
                  onClick={() => { setShowReportModal(false); setSelectedRoom(null); setReportIssue({ title: '', description: '', priority: 'عادية' }) }}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'عنوان المشكلة' : 'Issue Title'}
                </label>
                <input
                  type="text"
                  value={reportIssue.title}
                  onChange={(e) => setReportIssue({...reportIssue, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-500"
                  placeholder={language === 'ar' ? 'أدخل عنوان المشكلة...' : 'Enter issue title...'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'الأولوية' : 'Priority'}
                </label>
                <select
                  value={reportIssue.priority}
                  onChange={(e) => setReportIssue({...reportIssue, priority: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-500"
                >
                  <option value="منخفضة">{language === 'ar' ? 'منخفضة' : 'Low'}</option>
                  <option value="عادية">{language === 'ar' ? 'عادية' : 'Normal'}</option>
                  <option value="عالية">{language === 'ar' ? 'عالية' : 'High'}</option>
                  <option value="عاجلة">{language === 'ar' ? 'عاجلة' : 'Urgent'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'وصف المشكلة' : 'Issue Description'}
                </label>
                <textarea
                  value={reportIssue.description}
                  onChange={(e) => setReportIssue({...reportIssue, description: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder={language === 'ar' ? 'اكتب وصف تفصيلي للمشكلة...' : 'Enter detailed description...'}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReportToManagement}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-black text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  {language === 'ar' ? 'إرسال البلاغ' : 'Send Report'}
                </button>
                <button
                  onClick={() => { setShowReportModal(false); setSelectedRoom(null); setReportIssue({ title: '', description: '', priority: 'عادية' }) }}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-black text-lg hover:shadow-xl transition-all"
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
