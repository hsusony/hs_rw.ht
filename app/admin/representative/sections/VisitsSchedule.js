'use client'
import { useState } from 'react'

export default function VisitsSchedule({ language }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('list') // list or calendar
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const [visitData, setVisitData] = useState({
    customerName: '',
    customerPhone: '',
    visitType: 'follow_up',
    visitDate: '',
    visitTime: '',
    location: '',
    purpose: '',
    notes: '',
    priority: 'medium',
    status: 'scheduled'
  })

  const [visits, setVisits] = useState([
    {
      id: 1,
      customerName: 'فندق بغداد بالاس',
      customerPhone: '0770 123 4567',
      visitType: 'follow_up',
      visitDate: '2025-11-18',
      visitTime: '10:00',
      location: 'بغداد - الكرادة',
      purpose: 'متابعة اشتراك قريب الانتهاء',
      notes: 'مناقشة تجديد الاشتراك السنوي',
      priority: 'high',
      status: 'scheduled',
      assignedTo: 'أحمد المندوب'
    },
    {
      id: 2,
      customerName: 'فندق النخيل',
      customerPhone: '0771 234 5678',
      visitType: 'demo',
      visitDate: '2025-11-18',
      visitTime: '14:00',
      location: 'بغداد - المنصور',
      purpose: 'عرض تجريبي للنظام',
      notes: 'زبون محتمل جديد',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'أحمد المندوب'
    },
    {
      id: 3,
      customerName: 'فندق دجلة',
      customerPhone: '0772 345 6789',
      visitType: 'support',
      visitDate: '2025-11-17',
      visitTime: '11:30',
      location: 'بغداد - الجادرية',
      purpose: 'دعم فني - مشكلة في النظام',
      notes: 'تم حل المشكلة بنجاح',
      priority: 'urgent',
      status: 'completed',
      assignedTo: 'أحمد المندوب'
    },
    {
      id: 4,
      customerName: 'فندق السلام',
      customerPhone: '0773 456 7890',
      visitType: 'installation',
      visitDate: '2025-11-19',
      visitTime: '09:00',
      location: 'بغداد - الأعظمية',
      purpose: 'تنصيب النظام للفرع الجديد',
      notes: 'جلب معدات التنصيب',
      priority: 'high',
      status: 'scheduled',
      assignedTo: 'أحمد المندوب'
    },
    {
      id: 5,
      customerName: 'فندق الرشيد',
      customerPhone: '0774 567 8901',
      visitType: 'meeting',
      visitDate: '2025-11-16',
      visitTime: '15:00',
      location: 'بغداد - الكرخ',
      purpose: 'اجتماع تعاقد',
      notes: 'تم التوقيع على العقد',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'أحمد المندوب'
    },
    {
      id: 6,
      customerName: 'فندق الزوراء',
      customerPhone: '0775 678 9012',
      visitType: 'follow_up',
      visitDate: '2025-11-20',
      visitTime: '13:00',
      location: 'بغداد - الحارثية',
      purpose: 'متابعة دورية',
      notes: 'فحص رضا العميل',
      priority: 'low',
      status: 'scheduled',
      assignedTo: 'أحمد المندوب'
    }
  ])

  const visitTypes = [
    { value: 'follow_up', labelAr: 'متابعة', labelEn: 'Follow-up', icon: 'fa-clipboard-check', color: 'blue' },
    { value: 'demo', labelAr: 'عرض تجريبي', labelEn: 'Demo', icon: 'fa-presentation', color: 'purple' },
    { value: 'support', labelAr: 'دعم فني', labelEn: 'Support', icon: 'fa-tools', color: 'orange' },
    { value: 'installation', labelAr: 'تنصيب', labelEn: 'Installation', icon: 'fa-server', color: 'green' },
    { value: 'meeting', labelAr: 'اجتماع', labelEn: 'Meeting', icon: 'fa-handshake', color: 'indigo' },
    { value: 'training', labelAr: 'تدريب', labelEn: 'Training', icon: 'fa-chalkboard-teacher', color: 'yellow' }
  ]

  const priorityLevels = [
    { value: 'low', labelAr: 'منخفضة', labelEn: 'Low', color: 'gray' },
    { value: 'medium', labelAr: 'متوسطة', labelEn: 'Medium', color: 'blue' },
    { value: 'high', labelAr: 'عالية', labelEn: 'High', color: 'orange' },
    { value: 'urgent', labelAr: 'عاجلة', labelEn: 'Urgent', color: 'red' }
  ]

  const statusOptions = [
    { value: 'scheduled', labelAr: 'مجدولة', labelEn: 'Scheduled', color: 'blue' },
    { value: 'in_progress', labelAr: 'جارية', labelEn: 'In Progress', color: 'yellow' },
    { value: 'completed', labelAr: 'مكتملة', labelEn: 'Completed', color: 'green' },
    { value: 'cancelled', labelAr: 'ملغية', labelEn: 'Cancelled', color: 'red' },
    { value: 'rescheduled', labelAr: 'معاد جدولتها', labelEn: 'Rescheduled', color: 'purple' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newVisit = {
      id: visits.length + 1,
      ...visitData,
      assignedTo: 'أحمد المندوب'
    }

    setVisits([newVisit, ...visits])
    setShowAddModal(false)
    
    // Reset form
    setVisitData({
      customerName: '',
      customerPhone: '',
      visitType: 'follow_up',
      visitDate: '',
      visitTime: '',
      location: '',
      purpose: '',
      notes: '',
      priority: 'medium',
      status: 'scheduled'
    })

    alert(language === 'ar' ? 'تم إضافة الزيارة بنجاح!' : 'Visit added successfully!')
  }

  const handleView = (visit) => {
    setSelectedVisit(visit)
    setShowViewModal(true)
  }

  const handleStatusChange = (visitId, newStatus) => {
    setVisits(visits.map(v => 
      v.id === visitId ? { ...v, status: newStatus } : v
    ))
  }

  const handleDelete = (visitId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الزيارة؟' : 'Are you sure you want to delete this visit?')) {
      setVisits(visits.filter(v => v.id !== visitId))
    }
  }

  const filteredVisits = filterStatus === 'all' 
    ? visits 
    : visits.filter(v => v.status === filterStatus)

  const todayVisits = visits.filter(v => v.visitDate === new Date().toISOString().split('T')[0])
  const upcomingVisits = visits.filter(v => {
    const visitDate = new Date(v.visitDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return visitDate > today && v.status === 'scheduled'
  })

  const getTypeInfo = (type) => visitTypes.find(t => t.value === type)
  const getPriorityInfo = (priority) => priorityLevels.find(p => p.value === priority)
  const getStatusInfo = (status) => statusOptions.find(s => s.value === status)

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, firstDay, lastDay }
  }

  const getVisitsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return visits.filter(v => v.visitDate === dateStr)
  }

  const changeMonth = (direction) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newDate)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelectedDate = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
  const monthYear = currentMonth.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
  
  const weekDays = language === 'ar' 
    ? ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-calendar-alt text-green-600"></i>
          {language === 'ar' ? 'إدارة الزيارات والمواعيد' : 'Visits & Appointments'}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
          >
            <i className={`fas ${viewMode === 'list' ? 'fa-calendar' : 'fa-list'}`}></i>
            {viewMode === 'list' 
              ? (language === 'ar' ? 'عرض تقويم' : 'Calendar View')
              : (language === 'ar' ? 'عرض قائمة' : 'List View')
            }
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            {language === 'ar' ? 'إضافة زيارة' : 'Add Visit'}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'زيارات اليوم' : "Today's Visits"}
              </p>
              <p className="text-2xl font-bold text-blue-600">{todayVisits.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar-day text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'زيارات قادمة' : 'Upcoming Visits'}
              </p>
              <p className="text-2xl font-bold text-green-600">{upcomingVisits.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'زيارات مكتملة' : 'Completed'}
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {visits.filter(v => v.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{visits.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-list text-gray-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {language === 'ar' ? 'تصفية حسب الحالة:' : 'Filter by Status:'}
          </span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
            }`}
          >
            {language === 'ar' ? 'الكل' : 'All'} ({visits.length})
          </button>
          {statusOptions.map(status => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === status.value
                  ? `bg-${status.color}-600 text-white`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? status.labelAr : status.labelEn} 
              ({visits.filter(v => v.status === status.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Visits List */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredVisits.map((visit) => {
            const typeInfo = getTypeInfo(visit.visitType)
            const priorityInfo = getPriorityInfo(visit.priority)
            const statusInfo = getStatusInfo(visit.status)

            return (
              <div
                key={visit.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 bg-${typeInfo?.color}-100 dark:bg-${typeInfo?.color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <i className={`fas ${typeInfo?.icon} text-${typeInfo?.color}-600 text-xl`}></i>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {visit.customerName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <i className="fas fa-phone ml-2"></i>
                              {visit.customerPhone}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${priorityInfo?.color}-100 text-${priorityInfo?.color}-700`}>
                              {language === 'ar' ? priorityInfo?.labelAr : priorityInfo?.labelEn}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${statusInfo?.color}-100 text-${statusInfo?.color}-700`}>
                              {language === 'ar' ? statusInfo?.labelAr : statusInfo?.labelEn}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <i className={`fas ${typeInfo?.icon} text-${typeInfo?.color}-600`}></i>
                            <span className="font-semibold">
                              {language === 'ar' ? typeInfo?.labelAr : typeInfo?.labelEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <i className="fas fa-calendar text-blue-600"></i>
                            <span>{visit.visitDate}</span>
                            <i className="fas fa-clock text-blue-600 mr-2"></i>
                            <span>{visit.visitTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <i className="fas fa-map-marker-alt text-red-600"></i>
                            <span>{visit.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <i className="fas fa-user text-green-600"></i>
                            <span>{visit.assignedTo}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            {language === 'ar' ? 'الغرض:' : 'Purpose:'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{visit.purpose}</p>
                        </div>

                        {visit.notes && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                              {language === 'ar' ? 'ملاحظات:' : 'Notes:'}
                            </p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{visit.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mr-4">
                    <button
                      onClick={() => handleView(visit)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                      title={language === 'ar' ? 'عرض' : 'View'}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {visit.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(visit.id, 'in_progress')}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-all"
                          title={language === 'ar' ? 'بدء الزيارة' : 'Start Visit'}
                        >
                          <i className="fas fa-play"></i>
                        </button>
                        <button
                          onClick={() => handleStatusChange(visit.id, 'completed')}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                          title={language === 'ar' ? 'إكمال' : 'Complete'}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      </>
                    )}
                    {visit.status === 'in_progress' && (
                      <button
                        onClick={() => handleStatusChange(visit.id, 'completed')}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                        title={language === 'ar' ? 'إكمال' : 'Complete'}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(visit.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title={language === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <i className="fas fa-chevron-right text-white text-xl"></i>
              </button>
              
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-calendar-alt"></i>
                {monthYear}
              </h3>
              
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <i className="fas fa-chevron-left text-white text-xl"></i>
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  className="text-center font-bold text-gray-700 dark:text-gray-300 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {[...Array(startingDayOfWeek)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Days of the month */}
              {[...Array(daysInMonth)].map((_, index) => {
                const dayNumber = index + 1
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber)
                const dayVisits = getVisitsForDate(date)
                const scheduledVisits = dayVisits.filter(v => v.status === 'scheduled')
                const completedVisits = dayVisits.filter(v => v.status === 'completed')
                const hasVisits = dayVisits.length > 0

                return (
                  <div
                    key={dayNumber}
                    onClick={() => {
                      setSelectedDate(date)
                      if (dayVisits.length > 0) {
                        // Scroll to visits list or show visits for this day
                      }
                    }}
                    className={`aspect-square border-2 rounded-xl p-2 cursor-pointer transition-all hover:shadow-lg ${
                      isToday(date)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : isSelectedDate(date)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : hasVisits
                        ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {/* Day Number */}
                    <div className={`text-center font-bold mb-1 ${
                      isToday(date)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {dayNumber}
                    </div>

                    {/* Visit Indicators */}
                    {hasVisits && (
                      <div className="space-y-1">
                        {scheduledVisits.length > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {scheduledVisits.length}
                            </span>
                          </div>
                        )}
                        {completedVisits.length > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 dark:text-green-400 font-semibold">
                              {completedVisits.length}
                            </span>
                          </div>
                        )}
                        {/* Show first visit time */}
                        {dayVisits[0] && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {dayVisits[0].visitTime}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Selected Date Details */}
            {selectedDate && (
              <div className="mt-6 border-t-2 border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fas fa-calendar-day text-green-600"></i>
                    {language === 'ar' ? 'زيارات يوم' : 'Visits on'} {selectedDate.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h4>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-400"></i>
                  </button>
                </div>

                {getVisitsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getVisitsForDate(selectedDate).map((visit) => {
                      const typeInfo = getTypeInfo(visit.visitType)
                      const priorityInfo = getPriorityInfo(visit.priority)
                      const statusInfo = getStatusInfo(visit.status)

                      return (
                        <div
                          key={visit.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleView(visit)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-10 h-10 bg-${typeInfo?.color}-100 dark:bg-${typeInfo?.color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <i className={`fas ${typeInfo?.icon} text-${typeInfo?.color}-600`}></i>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {visit.customerName}
                                </h5>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  <span>
                                    <i className="fas fa-clock ml-1"></i>
                                    {visit.visitTime}
                                  </span>
                                  <span>
                                    <i className="fas fa-map-marker-alt ml-1"></i>
                                    {visit.location}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {visit.purpose}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${statusInfo?.color}-100 text-${statusInfo?.color}-700`}>
                                {language === 'ar' ? statusInfo?.labelAr : statusInfo?.labelEn}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${priorityInfo?.color}-100 text-${priorityInfo?.color}-700`}>
                                {language === 'ar' ? priorityInfo?.labelAr : priorityInfo?.labelEn}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <i className="fas fa-calendar-times text-4xl mb-3"></i>
                    <p>{language === 'ar' ? 'لا توجد زيارات في هذا اليوم' : 'No visits on this day'}</p>
                  </div>
                )}
              </div>
            )}

            {/* Calendar Legend */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {language === 'ar' ? 'دليل الألوان' : 'Legend'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'مجدولة' : 'Scheduled'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'مكتملة' : 'Completed'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 rounded-lg"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'اليوم' : 'Today'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-500 rounded-lg"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' ? 'يوم محدد' : 'Selected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Visit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-calendar-plus"></i>
                {language === 'ar' ? 'إضافة زيارة جديدة' : 'Add New Visit'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={visitData.customerName}
                      onChange={(e) => setVisitData(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={visitData.customerPhone}
                      onChange={(e) => setVisitData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'تفاصيل الزيارة' : 'Visit Details'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'نوع الزيارة' : 'Visit Type'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={visitData.visitType}
                      onChange={(e) => setVisitData(prev => ({ ...prev, visitType: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      {visitTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {language === 'ar' ? type.labelAr : type.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الأولوية' : 'Priority'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <select
                      value={visitData.priority}
                      onChange={(e) => setVisitData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      {priorityLevels.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {language === 'ar' ? priority.labelAr : priority.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={visitData.visitDate}
                      onChange={(e) => setVisitData(prev => ({ ...prev, visitDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الوقت' : 'Time'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="time"
                      value={visitData.visitTime}
                      onChange={(e) => setVisitData(prev => ({ ...prev, visitTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الموقع' : 'Location'}
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={visitData.location}
                    onChange={(e) => setVisitData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'بغداد - الكرادة' : 'Baghdad - Karrada'}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الغرض من الزيارة' : 'Purpose'}
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={visitData.purpose}
                    onChange={(e) => setVisitData(prev => ({ ...prev, purpose: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'ملاحظات' : 'Notes'}
                  </label>
                  <textarea
                    value={visitData.notes}
                    onChange={(e) => setVisitData(prev => ({ ...prev, notes: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                  ></textarea>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-save ml-2"></i>
                  {language === 'ar' ? 'حفظ الزيارة' : 'Save Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Visit Modal */}
      {showViewModal && selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تفاصيل الزيارة' : 'Visit Details'}
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedVisit.customerName}
                  </h4>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-${getStatusInfo(selectedVisit.status)?.color}-100 text-${getStatusInfo(selectedVisit.status)?.color}-700`}>
                    {language === 'ar' 
                      ? getStatusInfo(selectedVisit.status)?.labelAr 
                      : getStatusInfo(selectedVisit.status)?.labelEn
                    }
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedVisit.customerPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'نوع الزيارة' : 'Visit Type'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' 
                        ? getTypeInfo(selectedVisit.visitType)?.labelAr 
                        : getTypeInfo(selectedVisit.visitType)?.labelEn
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedVisit.visitDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الوقت' : 'Time'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedVisit.visitTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الموقع' : 'Location'}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedVisit.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الأولوية' : 'Priority'}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${getPriorityInfo(selectedVisit.priority)?.color}-100 text-${getPriorityInfo(selectedVisit.priority)?.color}-700`}>
                      {language === 'ar' 
                        ? getPriorityInfo(selectedVisit.priority)?.labelAr 
                        : getPriorityInfo(selectedVisit.priority)?.labelEn
                      }
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'الغرض' : 'Purpose'}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {selectedVisit.purpose}
                  </p>
                </div>

                {selectedVisit.notes && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === 'ar' ? 'ملاحظات' : 'Notes'}
                    </p>
                    <p className="text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      {selectedVisit.notes}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {language === 'ar' ? 'المندوب المسؤول' : 'Assigned To'}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedVisit.assignedTo}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
