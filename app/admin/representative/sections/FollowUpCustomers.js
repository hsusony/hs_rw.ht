'use client'
import { useState } from 'react'

export default function FollowUpCustomers({ language }) {
  const [showFollowUpModal, setShowFollowUpModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [followUpData, setFollowUpData] = useState({
    type: 'call', // call, visit, email, whatsapp
    date: '',
    time: '',
    notes: '',
    nextFollowUpDate: '',
    status: 'pending', // pending, completed, cancelled
    priority: 'medium' // low, medium, high, urgent
  })

  const [customers, setCustomers] = useState([
    {
      id: 1,
      hotelNameAr: 'فندق بغداد بالاس',
      hotelNameEn: 'Baghdad Palace Hotel',
      contactPerson: 'علي محمد',
      phone: '0770 123 4567',
      email: 'info@baghdadpalace.com',
      currentPlan: 'سنوي',
      expiryDate: '2025-12-15',
      lastContact: '2025-11-10',
      nextFollowUp: '2025-11-20',
      status: 'active',
      satisfactionLevel: 'excellent', // excellent, good, average, poor
      followUpCount: 8,
      issues: [],
      notes: 'عميل ممتاز، دائماً يدفع في الوقت المحدد'
    },
    {
      id: 2,
      hotelNameAr: 'فندق النخيل',
      hotelNameEn: 'Al-Nakheel Hotel',
      contactPerson: 'سارة أحمد',
      phone: '0771 234 5678',
      email: 'contact@alnakheel.com',
      currentPlan: 'شهري',
      expiryDate: '2025-11-25',
      lastContact: '2025-11-15',
      nextFollowUp: '2025-11-18',
      status: 'needs_attention',
      satisfactionLevel: 'average',
      followUpCount: 12,
      issues: ['مشكلة في الدعم الفني', 'طلب تدريب إضافي'],
      notes: 'يحتاج لمتابعة حثيثة'
    },
    {
      id: 3,
      hotelNameAr: 'فندق السلام',
      hotelNameEn: 'Al-Salam Hotel',
      contactPerson: 'خالد حسن',
      phone: '0772 345 6789',
      email: 'info@alsalam.com',
      currentPlan: 'ربع سنوي',
      expiryDate: '2025-11-20',
      lastContact: '2025-10-28',
      nextFollowUp: '2025-11-19',
      status: 'expiring_soon',
      satisfactionLevel: 'good',
      followUpCount: 6,
      issues: [],
      notes: 'مهتم بالترقية للباقة السنوية'
    },
    {
      id: 4,
      hotelNameAr: 'فندق الربيع',
      hotelNameEn: 'Al-Rabee Hotel',
      contactPerson: 'فاطمة علي',
      phone: '0773 456 7890',
      email: 'info@alrabee.com',
      currentPlan: 'سنوي',
      expiryDate: '2025-11-17',
      lastContact: '2025-11-05',
      nextFollowUp: '2025-11-18',
      status: 'expired',
      satisfactionLevel: 'poor',
      followUpCount: 15,
      issues: ['تأخير في التجديد', 'شكاوى من الخدمة'],
      notes: 'يحتاج لاهتمام عاجل - مهدد بإلغاء الاشتراك'
    }
  ])

  const [followUpHistory] = useState([
    {
      id: 1,
      customerId: 1,
      type: 'call',
      date: '2025-11-10',
      time: '10:00 AM',
      notes: 'مكالمة للاطمئنان على الخدمة - كل شيء على ما يرام',
      status: 'completed'
    },
    {
      id: 2,
      customerId: 1,
      type: 'visit',
      date: '2025-10-15',
      time: '02:00 PM',
      notes: 'زيارة ميدانية - تقديم تحديثات النظام الجديدة',
      status: 'completed'
    },
    {
      id: 3,
      customerId: 2,
      type: 'call',
      date: '2025-11-15',
      time: '11:30 AM',
      notes: 'معالجة مشكلة الدعم الفني - تم التصعيد للقسم التقني',
      status: 'completed'
    }
  ])

  const followUpTypes = [
    { value: 'call', labelAr: 'مكالمة هاتفية', labelEn: 'Phone Call', icon: 'fa-phone', color: 'text-blue-600' },
    { value: 'visit', labelAr: 'زيارة ميدانية', labelEn: 'Field Visit', icon: 'fa-map-marker-alt', color: 'text-green-600' },
    { value: 'email', labelAr: 'بريد إلكتروني', labelEn: 'Email', icon: 'fa-envelope', color: 'text-purple-600' },
    { value: 'whatsapp', labelAr: 'واتساب', labelEn: 'WhatsApp', icon: 'fa-whatsapp', color: 'text-green-500' },
    { value: 'meeting', labelAr: 'اجتماع', labelEn: 'Meeting', icon: 'fa-users', color: 'text-orange-600' }
  ]

  const priorityLevels = [
    { value: 'low', labelAr: 'منخفضة', labelEn: 'Low', color: 'bg-gray-100 text-gray-600' },
    { value: 'medium', labelAr: 'متوسطة', labelEn: 'Medium', color: 'bg-blue-100 text-blue-600' },
    { value: 'high', labelAr: 'عالية', labelEn: 'High', color: 'bg-orange-100 text-orange-600' },
    { value: 'urgent', labelAr: 'عاجلة', labelEn: 'Urgent', color: 'bg-red-100 text-red-600' }
  ]

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { labelAr: 'نشط', labelEn: 'Active', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' },
      needs_attention: { labelAr: 'يحتاج اهتمام', labelEn: 'Needs Attention', color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300' },
      expiring_soon: { labelAr: 'قارب على الانتهاء', labelEn: 'Expiring Soon', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300' },
      expired: { labelAr: 'منتهي', labelEn: 'Expired', color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' }
    }
    
    const statusInfo = statusMap[status] || statusMap.active
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
        {language === 'ar' ? statusInfo.labelAr : statusInfo.labelEn}
      </span>
    )
  }

  const getSatisfactionBadge = (level) => {
    const satisfactionMap = {
      excellent: { labelAr: 'ممتاز', labelEn: 'Excellent', icon: 'fa-smile-beam', color: 'text-green-600' },
      good: { labelAr: 'جيد', labelEn: 'Good', icon: 'fa-smile', color: 'text-blue-600' },
      average: { labelAr: 'متوسط', labelEn: 'Average', icon: 'fa-meh', color: 'text-yellow-600' },
      poor: { labelAr: 'ضعيف', labelEn: 'Poor', icon: 'fa-frown', color: 'text-red-600' }
    }
    
    const satisfaction = satisfactionMap[level] || satisfactionMap.average
    return (
      <span className={`flex items-center gap-1 ${satisfaction.color}`}>
        <i className={`fas ${satisfaction.icon}`}></i>
        <span className="font-semibold">{language === 'ar' ? satisfaction.labelAr : satisfaction.labelEn}</span>
      </span>
    )
  }

  const handleFollowUpClick = (customer) => {
    setSelectedCustomer(customer)
    setShowFollowUpModal(true)
    setFollowUpData({
      type: 'call',
      date: new Date().toISOString().split('T')[0],
      time: '',
      notes: '',
      nextFollowUpDate: '',
      status: 'pending',
      priority: 'medium'
    })
  }

  const handleSubmitFollowUp = (e) => {
    e.preventDefault()
    
    // تحديث آخر تاريخ اتصال
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          lastContact: followUpData.date,
          nextFollowUp: followUpData.nextFollowUpDate,
          followUpCount: c.followUpCount + 1
        }
      }
      return c
    }))
    
    setShowFollowUpModal(false)
    alert(language === 'ar' ? 'تم تسجيل المتابعة بنجاح!' : 'Follow-up recorded successfully!')
  }

  const viewHistory = (customer) => {
    setSelectedCustomer(customer)
    setShowHistoryModal(true)
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' || 
      customer.hotelNameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.hotelNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const customerHistory = followUpHistory.filter(h => h.customerId === selectedCustomer?.id)

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-user-check text-green-600"></i>
          {language === 'ar' ? 'متابعة العملاء الحاليين' : 'Follow-up Current Customers'}
        </h2>
        
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث عن عميل...' : 'Search customer...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'الكل' : 'All'} ({customers.length})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'نشط' : 'Active'} ({customers.filter(c => c.status === 'active').length})
        </button>
        <button
          onClick={() => setFilterStatus('needs_attention')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'needs_attention'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'يحتاج اهتمام' : 'Needs Attention'} ({customers.filter(c => c.status === 'needs_attention').length})
        </button>
        <button
          onClick={() => setFilterStatus('expiring_soon')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'expiring_soon'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'قارب على الانتهاء' : 'Expiring Soon'} ({customers.filter(c => c.status === 'expiring_soon').length})
        </button>
        <button
          onClick={() => setFilterStatus('expired')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'expired'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'منتهي' : 'Expired'} ({customers.filter(c => c.status === 'expired').length})
        </button>
      </div>

      {/* Customers List */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? customer.hotelNameAr : customer.hotelNameEn}
                  </h3>
                  {getStatusBadge(customer.status)}
                  {getSatisfactionBadge(customer.satisfactionLevel)}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      <i className="fas fa-user ml-2"></i>
                      {customer.contactPerson}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <i className="fas fa-phone ml-2"></i>
                      {customer.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      <i className="fas fa-box ml-2"></i>
                      {language === 'ar' ? 'الباقة:' : 'Plan:'} {customer.currentPlan}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <i className="fas fa-calendar-times ml-2"></i>
                      {language === 'ar' ? 'تنتهي:' : 'Expires:'} {customer.expiryDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      <i className="fas fa-phone-volume ml-2"></i>
                      {language === 'ar' ? 'آخر اتصال:' : 'Last Contact:'} {customer.lastContact}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <i className="fas fa-calendar-check ml-2"></i>
                      {language === 'ar' ? 'متابعة قادمة:' : 'Next Follow-up:'} {customer.nextFollowUp}
                    </p>
                  </div>
                </div>

                {/* Issues */}
                {customer.issues && customer.issues.length > 0 && (
                  <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                      <i className="fas fa-exclamation-triangle ml-1"></i>
                      {language === 'ar' ? 'مشاكل قائمة:' : 'Current Issues:'}
                    </p>
                    <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                      {customer.issues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {customer.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    <i className="fas fa-sticky-note ml-1"></i>
                    {customer.notes}
                  </p>
                )}

                {/* Stats */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-semibold">
                    <i className="fas fa-chart-line ml-1"></i>
                    {customer.followUpCount} {language === 'ar' ? 'متابعة' : 'follow-ups'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleFollowUpClick(customer)}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-plus"></i>
                  {language === 'ar' ? 'متابعة جديدة' : 'New Follow-up'}
                </button>
                <button
                  onClick={() => viewHistory(customer)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-history"></i>
                  {language === 'ar' ? 'السجل' : 'History'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Follow-up Modal */}
      {showFollowUpModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-clipboard-check"></i>
                {language === 'ar' ? 'تسجيل متابعة جديدة' : 'Record New Follow-up'}
              </h3>
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitFollowUp} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? selectedCustomer.hotelNameAr : selectedCustomer.hotelNameEn}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCustomer.contactPerson} - {selectedCustomer.phone}
                </p>
              </div>

              {/* Follow-up Type */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  {language === 'ar' ? 'نوع المتابعة' : 'Follow-up Type'}
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {followUpTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFollowUpData(prev => ({ ...prev, type: type.value }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        followUpData.type === type.value
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                      }`}
                    >
                      <i className={`fas ${type.icon} ${type.color} text-2xl mb-2`}></i>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? type.labelAr : type.labelEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={followUpData.date}
                      onChange={(e) => setFollowUpData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الوقت' : 'Time'}
                    </label>
                    <input
                      type="time"
                      value={followUpData.time}
                      onChange={(e) => setFollowUpData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الأولوية' : 'Priority'}
                    </label>
                    <select
                      value={followUpData.priority}
                      onChange={(e) => setFollowUpData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {language === 'ar' ? level.labelAr : level.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'ملاحظات وتفاصيل المتابعة' : 'Follow-up Notes & Details'}
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <textarea
                  value={followUpData.notes}
                  onChange={(e) => setFollowUpData(prev => ({ ...prev, notes: e.target.value }))}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === 'ar' ? 'ماذا تم مناقشته؟ ما هي النتائج؟ أي ملاحظات مهمة...' : 'What was discussed? What were the outcomes? Any important notes...'}
                  required
                ></textarea>
              </div>

              {/* Next Follow-up */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'تاريخ المتابعة القادمة' : 'Next Follow-up Date'}
                </label>
                <input
                  type="date"
                  value={followUpData.nextFollowUpDate}
                  onChange={(e) => setFollowUpData(prev => ({ ...prev, nextFollowUpDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowFollowUpModal(false)}
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
                  {language === 'ar' ? 'حفظ المتابعة' : 'Save Follow-up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-history"></i>
                {language === 'ar' ? 'سجل المتابعات' : 'Follow-up History'}
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? selectedCustomer.hotelNameAr : selectedCustomer.hotelNameEn}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'إجمالي المتابعات:' : 'Total Follow-ups:'} {selectedCustomer.followUpCount}
                </p>
              </div>

              {/* History List */}
              <div className="space-y-4">
                {customerHistory.length > 0 ? (
                  customerHistory.map((record) => {
                    const typeInfo = followUpTypes.find(t => t.value === record.type)
                    return (
                      <div
                        key={record.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            record.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-200 dark:bg-gray-600'
                          }`}>
                            <i className={`fas ${typeInfo?.icon} ${typeInfo?.color}`}></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h5 className="font-bold text-gray-900 dark:text-white">
                                {language === 'ar' ? typeInfo?.labelAr : typeInfo?.labelEn}
                              </h5>
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded text-xs font-semibold">
                                {record.status === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {record.notes}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              <i className="fas fa-calendar ml-1"></i>
                              {record.date} {record.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-12">
                    <i className="fas fa-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'لا يوجد سجل متابعات' : 'No follow-up history'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
