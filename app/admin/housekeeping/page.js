'use client'
import { useState, useEffect } from 'react'

export default function HousekeepingPage() {
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedFloor, setSelectedFloor] = useState('all')
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [showServicesModal, setShowServicesModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [maintenanceIssue, setMaintenanceIssue] = useState({ type: '', description: '', priority: 'متوسطة' })

  // صلاحيات الموظف - الطوابق والغرف المخصصة له
  const [employeeAccess] = useState({
    name: 'موظف',
    assignedFloors: [],
    assignedRooms: [],
  })

  const [rooms, setRooms] = useState([
    { id: 1, number: '101', status: 'clean', lastCleaned: '2025-11-18 10:30', cleanedBy: 'فاطمة أحمد', notes: '' },
    { id: 2, number: '102', status: 'dirty', lastCleaned: '2025-11-17 15:20', cleanedBy: 'سارة محمد', notes: 'يحتاج تنظيف عميق' },
    { id: 3, number: '201', status: 'cleaning', lastCleaned: '2025-11-18 09:00', cleanedBy: 'نور علي', notes: 'قيد التنظيف الآن' },
    { id: 4, number: '202', status: 'clean', lastCleaned: '2025-11-18 11:00', cleanedBy: 'فاطمة أحمد', notes: '' },
    { id: 5, number: '301', status: 'dirty', lastCleaned: '2025-11-16 14:30', cleanedBy: 'سارة محمد', notes: 'غرفة مغادرة' },
    { id: 6, number: '302', status: 'clean', lastCleaned: '2025-11-18 08:45', cleanedBy: 'نور علي', notes: '' },
    { id: 7, number: '401', status: 'cleaning', lastCleaned: '2025-11-18 13:00', cleanedBy: 'فاطمة أحمد', notes: '' }
  ])

  const [guestServices] = useState([
    { id: 1, room: '101', service: 'مناشف إضافية', status: 'completed', requestTime: '10:30', completedTime: '10:45' },
    { id: 2, room: '205', service: 'تنظيف إضافي', status: 'pending', requestTime: '11:00', completedTime: '-' },
    { id: 3, room: '301', service: 'تغيير الفرش', status: 'inProgress', requestTime: '09:30', completedTime: '-' },
    { id: 4, room: '102', service: 'مستلزمات حمام', status: 'completed', requestTime: '08:00', completedTime: '08:20' },
    { id: 5, room: '401', service: 'مناشف إضافية', status: 'pending', requestTime: '12:00', completedTime: '-' }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'needs_cleaning': return 'bg-gradient-to-r from-red-500 to-pink-500'
      case 'cleaning': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'clean': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'needs_cleaning': return language === 'ar' ? 'بحاجة للتنظيف' : 'Needs Cleaning'
      case 'cleaning': return language === 'ar' ? 'قيد التنظيف' : 'Cleaning'
      case 'clean': return language === 'ar' ? 'نظيفة' : 'Clean'
      default: return status
    }
  }

  const getWaitingTimeColor = (minutes) => {
    if (minutes > 120) return 'text-red-600'
    if (minutes > 60) return 'text-orange-600'
    return 'text-green-600'
  }

  const filteredRooms = rooms.filter(room => {
    if (!employeeAccess.assignedRooms.includes(room.number)) return false
    if (selectedFloor !== 'all' && room.floor !== parseInt(selectedFloor)) return false
    return true
  })

  const handleStatusChange = (roomNumber, newStatus) => {
    setRooms(rooms.map(room => 
      room.number === roomNumber 
        ? { ...room, status: newStatus, lastCleaned: newStatus === 'clean' ? '2024-11-18 ' + new Date().toTimeString().slice(0, 5) : room.lastCleaned, waitingTime: newStatus === 'clean' ? 0 : room.waitingTime }
        : room
    ))
  }

  const handleMaintenanceReport = () => {
    if (!selectedRoom || !maintenanceIssue.type || !maintenanceIssue.description) return
    alert(`تم إرسال بلاغ الصيانة للغرفة ${selectedRoom.number}\nنوع العطل: ${maintenanceIssue.type}\nالوصف: ${maintenanceIssue.description}\nالأولوية: ${maintenanceIssue.priority}`)
    setShowMaintenanceModal(false)
    setMaintenanceIssue({ type: '', description: '', priority: 'متوسطة' })
    setSelectedRoom(null)
  }

  const needsCleaningCount = filteredRooms.filter(r => r.status === 'needs_cleaning').length
  const cleaningCount = filteredRooms.filter(r => r.status === 'cleaning').length
  const cleanCount = filteredRooms.filter(r => r.status === 'clean').length
  const pendingServicesCount = guestServices.filter(s => s.status === 'pending' && employeeAccess.assignedRooms.includes(s.room)).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8">
        {/* Header with Language and Theme Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'إدارة تنظيف الغرف' : 'Housekeeping Management'}
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

              {/* Services Button */}
              <button
                onClick={() => setShowServicesModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {language === 'ar' ? `طلبات الخدمات (${pendingServicesCount})` : `Service Requests (${pendingServicesCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{needsCleaningCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'بحاجة للتنظيف' : 'Needs Cleaning'}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{cleaningCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'قيد التنظيف' : 'In Progress'}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{cleanCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'نظيفة' : 'Clean'}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="text-5xl font-black">{pendingServicesCount}</div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-base font-bold opacity-95">{language === 'ar' ? 'طلبات معلقة' : 'Pending Requests'}</div>
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
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black">{room.number}</div>
                  <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {language === 'ar' ? `الطابق ${room.floor}` : `Floor ${room.floor}`}
                  </div>
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

                  {room.guest && (
                    <div className="mb-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-semibold">{room.guest}</span>
                      </div>
                    </div>
                  )}

                  {room.status !== 'clean' && (
                    <div className="mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-sm font-bold ${getWaitingTimeColor(room.waitingTime)}`}>
                          {language === 'ar' ? `فترة الانتظار: ${room.waitingTime} دقيقة` : `Waiting: ${room.waitingTime} min`}
                        </span>
                      </div>
                    </div>
                  )}

                  {room.lastCleaned && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {language === 'ar' ? 'آخر تنظيف:' : 'Last cleaned:'} {room.lastCleaned}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {room.status === 'needs_cleaning' && (
                    <button
                      onClick={() => handleStatusChange(room.number, 'cleaning')}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {language === 'ar' ? 'بدء التنظيف' : 'Start Cleaning'}
                    </button>
                  )}

                  {room.status === 'cleaning' && (
                    <button
                      onClick={() => handleStatusChange(room.number, 'clean')}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {language === 'ar' ? 'إنهاء التنظيف' : 'Complete Cleaning'}
                    </button>
                  )}

                  <button
                    onClick={() => { setSelectedRoom(room); setShowMaintenanceModal(true) }}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {language === 'ar' ? 'إبلاغ عن عطل' : 'Report Issue'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Report Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl border-4 border-red-200 dark:border-red-900">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-black">
                    {language === 'ar' ? `إبلاغ عن عطل - غرفة ${selectedRoom?.number}` : `Report Issue - Room ${selectedRoom?.number}`}
                  </h3>
                </div>
                <button
                  onClick={() => { setShowMaintenanceModal(false); setSelectedRoom(null); setMaintenanceIssue({ type: '', description: '', priority: 'متوسطة' }) }}
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
                  {language === 'ar' ? 'نوع العطل' : 'Issue Type'}
                </label>
                <select
                  value={maintenanceIssue.type}
                  onChange={(e) => setMaintenanceIssue({...maintenanceIssue, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{language === 'ar' ? 'اختر نوع العطل' : 'Select Issue Type'}</option>
                  <option value="كهرباء">{language === 'ar' ? 'كهرباء' : 'Electrical'}</option>
                  <option value="سباكة">{language === 'ar' ? 'سباكة' : 'Plumbing'}</option>
                  <option value="تكييف">{language === 'ar' ? 'تكييف' : 'Air Conditioning'}</option>
                  <option value="أثاث">{language === 'ar' ? 'أثاث' : 'Furniture'}</option>
                  <option value="أخرى">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'الأولوية' : 'Priority'}
                </label>
                <select
                  value={maintenanceIssue.priority}
                  onChange={(e) => setMaintenanceIssue({...maintenanceIssue, priority: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-red-500"
                >
                  <option value="منخفضة">{language === 'ar' ? 'منخفضة' : 'Low'}</option>
                  <option value="متوسطة">{language === 'ar' ? 'متوسطة' : 'Medium'}</option>
                  <option value="عالية">{language === 'ar' ? 'عالية' : 'High'}</option>
                  <option value="عاجلة">{language === 'ar' ? 'عاجلة' : 'Urgent'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'وصف المشكلة' : 'Issue Description'}
                </label>
                <textarea
                  value={maintenanceIssue.description}
                  onChange={(e) => setMaintenanceIssue({...maintenanceIssue, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder={language === 'ar' ? 'اكتب وصف تفصيلي للمشكلة...' : 'Enter detailed description...'}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleMaintenanceReport}
                  className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-black text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  {language === 'ar' ? 'إرسال البلاغ' : 'Send Report'}
                </button>
                <button
                  onClick={() => { setShowMaintenanceModal(false); setSelectedRoom(null); setMaintenanceIssue({ type: '', description: '', priority: 'متوسطة' }) }}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-black text-lg hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest Services Modal */}
      {showServicesModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border-4 border-blue-200 dark:border-blue-900">
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-black">{language === 'ar' ? 'طلبات الخدمات الإضافية' : 'Additional Service Requests'}</h3>
                </div>
                <button
                  onClick={() => setShowServicesModal(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                {guestServices.filter(s => employeeAccess.assignedRooms.includes(s.room)).map((service) => (
                  <div key={service.id} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl font-black text-lg">
                            {service.room}
                          </span>
                          <div>
                            <div className="font-black text-gray-900 dark:text-white">{service.guest}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{service.requestTime}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">{service.service}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-white text-sm font-bold ${service.type === 'paid' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
                            {service.type === 'paid' ? (language === 'ar' ? `مدفوعة - ${service.price?.toLocaleString()} دينار` : `Paid - ${service.price?.toLocaleString()} IQD`) : (language === 'ar' ? 'مجانية' : 'Free')}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-white text-sm font-bold ${service.priority === 'عاجل' ? 'bg-red-500' : 'bg-blue-500'}`}>
                            {service.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-white text-sm font-bold ${service.status === 'pending' ? 'bg-yellow-500' : service.status === 'in_progress' ? 'bg-orange-500' : 'bg-green-500'}`}>
                            {service.status === 'pending' ? (language === 'ar' ? 'معلق' : 'Pending') : service.status === 'in_progress' ? (language === 'ar' ? 'جاري التنفيذ' : 'In Progress') : (language === 'ar' ? 'مكتمل' : 'Completed')}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {service.status === 'pending' && (
                          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all whitespace-nowrap">
                            {language === 'ar' ? 'بدء التنفيذ' : 'Start'}
                          </button>
                        )}
                        {service.status === 'in_progress' && (
                          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all whitespace-nowrap">
                            {language === 'ar' ? 'إنهاء' : 'Complete'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
