'use client'
import { useState } from 'react'

export default function TrialVersion({ language }) {
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const trialRequests = [
    {
      id: 1,
      hotelName: 'فندق الشرق الأوسط',
      hotelNameEn: 'Middle East Hotel',
      contactPerson: 'خالد أحمد',
      email: 'khalid@hotel.com',
      phone: '+964 770 123 4567',
      requestDate: '2025-11-18',
      status: 'pending',
      plan: 'خطة الأعمال',
      rooms: 50,
      address: 'بغداد - الكرادة'
    },
    {
      id: 2,
      hotelName: 'فندق الأمل',
      hotelNameEn: 'Al-Amal Hotel',
      contactPerson: 'سارة محمد',
      email: 'sara@amalhotel.com',
      phone: '+964 770 234 5678',
      requestDate: '2025-11-17',
      status: 'active',
      plan: 'خطة متقدمة',
      rooms: 30,
      address: 'البصرة - المعقل',
      activatedDate: '2025-11-17',
      expiryDate: '2025-12-01',
      daysLeft: 13
    },
    {
      id: 3,
      hotelName: 'فندق السلام',
      hotelNameEn: 'Al-Salam Hotel',
      contactPerson: 'علي حسن',
      email: 'ali@salamhotel.com',
      phone: '+964 770 345 6789',
      requestDate: '2025-11-10',
      status: 'expired',
      plan: 'خطة أساسية',
      rooms: 20,
      address: 'أربيل - المركز',
      activatedDate: '2025-11-10',
      expiryDate: '2025-11-24'
    }
  ]

  const handleActivate = (request) => {
    setSelectedRequest(request)
    setShowActivateModal(true)
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  const handleSubmitActivation = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? `تم تفعيل النسخة التجريبية لـ ${selectedRequest.hotelName}` : `Trial activated for ${selectedRequest.hotelNameEn}`)
    setShowActivateModal(false)
    setSelectedRequest(null)
  }

  const handleCreateTrial = (e) => {
    e.preventDefault()
    alert(language === 'ar' ? 'تم إنشاء النسخة التجريبية بنجاح!' : 'Trial version created successfully!')
    setShowCreateModal(false)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-full text-sm font-semibold">
            <i className="fas fa-clock ml-1"></i>
            {language === 'ar' ? 'قيد الانتظار' : 'Pending'}
          </span>
        )
      case 'active':
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-semibold">
            <i className="fas fa-check-circle ml-1"></i>
            {language === 'ar' ? 'نشط' : 'Active'}
          </span>
        )
      case 'expired':
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full text-sm font-semibold">
            <i className="fas fa-times-circle ml-1"></i>
            {language === 'ar' ? 'منتهي' : 'Expired'}
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'النسخ التجريبية' : 'Trial Versions'}
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg"
        >
          <i className="fas fa-plus ml-2"></i>
          {language === 'ar' ? 'إنشاء نسخة تجريبية' : 'Create Trial Version'}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-clock text-4xl opacity-80"></i>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</h3>
          <p className="text-3xl font-bold">
            {trialRequests.filter(r => r.status === 'pending').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-check-circle text-4xl opacity-80"></i>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'نشط' : 'Active'}</h3>
          <p className="text-3xl font-bold">
            {trialRequests.filter(r => r.status === 'active').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-times-circle text-4xl opacity-80"></i>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'منتهي' : 'Expired'}</h3>
          <p className="text-3xl font-bold">
            {trialRequests.filter(r => r.status === 'expired').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <i className="fas fa-list text-4xl opacity-80"></i>
          </div>
          <h3 className="text-sm font-semibold mb-1">{language === 'ar' ? 'الإجمالي' : 'Total'}</h3>
          <p className="text-3xl font-bold">{trialRequests.length}</p>
        </div>
      </div>

      {/* Trial Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trialRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-t-4 hover:shadow-xl transition-all"
            style={{
              borderTopColor:
                request.status === 'pending' ? '#f59e0b' :
                request.status === 'active' ? '#10b981' : '#ef4444'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {language === 'ar' ? request.hotelName : request.hotelNameEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-map-marker-alt ml-1"></i>
                  {request.address}
                </p>
              </div>
              {getStatusBadge(request.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <i className="fas fa-user w-5 text-gray-500"></i>
                <span className="text-gray-700 dark:text-gray-300">{request.contactPerson}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-envelope w-5 text-gray-500"></i>
                <span className="text-gray-700 dark:text-gray-300">{request.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-phone w-5 text-gray-500"></i>
                <span className="text-gray-700 dark:text-gray-300">{request.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-door-open w-5 text-gray-500"></i>
                <span className="text-gray-700 dark:text-gray-300">
                  {request.rooms} {language === 'ar' ? 'غرفة' : 'rooms'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700 mb-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ar' ? 'تاريخ الطلب' : 'Request Date'}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">{request.requestDate}</p>
              </div>
              {request.status === 'active' && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'ينتهي في' : 'Expires in'}
                  </p>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {request.daysLeft} {language === 'ar' ? 'يوم' : 'days'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleViewDetails(request)}
                className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 font-semibold transition-all"
              >
                <i className="fas fa-eye ml-2"></i>
                {language === 'ar' ? 'التفاصيل' : 'Details'}
              </button>
              {request.status === 'pending' && (
                <button
                  onClick={() => handleActivate(request)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold transition-all"
                >
                  <i className="fas fa-check ml-2"></i>
                  {language === 'ar' ? 'تفعيل' : 'Activate'}
                </button>
              )}
              {request.status === 'expired' && (
                <button
                  onClick={() => handleActivate(request)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold transition-all"
                >
                  <i className="fas fa-sync-alt ml-2"></i>
                  {language === 'ar' ? 'إعادة تفعيل' : 'Reactivate'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Activate Trial Modal */}
      {showActivateModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-gift"></i>
                {language === 'ar' ? 'تفعيل نسخة تجريبية' : 'Activate Trial Version'}
              </h3>
              <button
                onClick={() => {
                  setShowActivateModal(false)
                  setSelectedRequest(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitActivation} className="p-6 space-y-4">
              {/* Hotel Info Card */}
              <div className="bg-green-50 dark:bg-gray-700 rounded-xl p-5 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                  {language === 'ar' ? selectedRequest.hotelName : selectedRequest.hotelNameEn}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الشخص المسؤول:' : 'Contact Person:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'رقم الهاتف:' : 'Phone:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'عدد الغرف:' : 'Rooms:'}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.rooms}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الخطة المختارة' : 'Selected Plan'}
                  </label>
                  <select
                    required
                    defaultValue={selectedRequest.plan}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option>{language === 'ar' ? 'خطة أساسية' : 'Basic Plan'}</option>
                    <option>{language === 'ar' ? 'خطة متقدمة' : 'Advanced Plan'}</option>
                    <option>{language === 'ar' ? 'خطة الأعمال' : 'Business Plan'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'مدة التجربة (أيام)' : 'Trial Period (days)'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="7">7 {language === 'ar' ? 'أيام' : 'days'}</option>
                    <option value="14" selected>14 {language === 'ar' ? 'يوم' : 'days'}</option>
                    <option value="30">30 {language === 'ar' ? 'يوم' : 'days'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم المستخدم' : 'Username'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: hotel_user123' : 'e.g., hotel_user123'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <input
                    type="password"
                    placeholder={language === 'ar' ? 'كلمة مرور قوية' : 'Strong password'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Re-enter password'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  rows="3"
                  placeholder={language === 'ar' ? 'أي ملاحظات أو تعليمات خاصة...' : 'Any notes or special instructions...'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                ></textarea>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 text-xl mt-1"></i>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-semibold mb-1">
                      {language === 'ar' ? 'ملاحظة مهمة:' : 'Important Note:'}
                    </p>
                    <p>
                      {language === 'ar' 
                        ? 'سيتم إرسال بيانات الدخول إلى البريد الإلكتروني المسجل. يرجى التأكد من صحة البيانات المدخلة.'
                        : 'Login credentials will be sent to the registered email. Please verify the entered data.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowActivateModal(false)
                    setSelectedRequest(null)
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold"
                >
                  <i className="fas fa-check-circle ml-2"></i>
                  {language === 'ar' ? 'تفعيل النسخة التجريبية' : 'Activate Trial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
              </h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedRequest(null)
                }}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'اسم الفندق:' : 'Hotel Name:'}
                  </span>
                  <span className="text-gray-900 dark:text-white font-bold">
                    {language === 'ar' ? selectedRequest.hotelName : selectedRequest.hotelNameEn}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'الشخص المسؤول:' : 'Contact Person:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.contactPerson}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.email}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'رقم الهاتف:' : 'Phone:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.phone}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'العنوان:' : 'Address:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.address}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'الخطة المطلوبة:' : 'Requested Plan:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.plan}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'عدد الغرف:' : 'Number of Rooms:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.rooms}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'تاريخ الطلب:' : 'Request Date:'}
                  </span>
                  <span className="text-gray-900 dark:text-white">{selectedRequest.requestDate}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {language === 'ar' ? 'الحالة:' : 'Status:'}
                  </span>
                  {getStatusBadge(selectedRequest.status)}
                </div>

                {selectedRequest.status === 'active' && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        {language === 'ar' ? 'تاريخ التفعيل:' : 'Activation Date:'}
                      </span>
                      <span className="text-gray-900 dark:text-white">{selectedRequest.activatedDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        {language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                      </span>
                      <span className="text-gray-900 dark:text-white">{selectedRequest.expiryDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">
                        {language === 'ar' ? 'الأيام المتبقية:' : 'Days Left:'}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {selectedRequest.daysLeft} {language === 'ar' ? 'يوم' : 'days'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedRequest(null)
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Trial Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-plus-circle"></i>
                {language === 'ar' ? 'إنشاء نسخة تجريبية جديدة' : 'Create New Trial Version'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleCreateTrial} className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 text-xl mt-1"></i>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' 
                      ? 'قم بإدخال بيانات الفندق الكاملة لإنشاء نسخة تجريبية مجانية لمدة تصل إلى 30 يوم'
                      : 'Enter complete hotel details to create a free trial version for up to 30 days'
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (عربي)' : 'Hotel Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: فندق النجوم الخمس' : 'e.g., Five Stars Hotel'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الفندق (English)' : 'Hotel Name (English)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Five Stars Hotel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم الشخص المسؤول' : 'Contact Person Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    placeholder="+964 770 123 4567"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    placeholder="hotel@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المحافظة' : 'Province'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر المحافظة' : 'Select Province'}</option>
                    <option>بغداد</option>
                    <option>البصرة</option>
                    <option>أربيل</option>
                    <option>الموصل</option>
                    <option>النجف</option>
                    <option>كربلاء</option>
                    <option>السليمانية</option>
                    <option>دهوك</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'المنطقة / الحي' : 'Area / District'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: الكرادة' : 'e.g., Al-Karrada'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'عدد الغرف' : 'Number of Rooms'}
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'عدد الطوابق' : 'Number of Floors'}
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الخطة' : 'Plan'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر الخطة' : 'Select Plan'}</option>
                    <option>{language === 'ar' ? 'خطة أساسية' : 'Basic Plan'}</option>
                    <option>{language === 'ar' ? 'خطة متقدمة' : 'Advanced Plan'}</option>
                    <option>{language === 'ar' ? 'خطة الأعمال' : 'Business Plan'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'مدة التجربة' : 'Trial Period'}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="7">7 {language === 'ar' ? 'أيام' : 'days'}</option>
                    <option value="14" selected>14 {language === 'ar' ? 'يوم' : 'days'}</option>
                    <option value="30">30 {language === 'ar' ? 'يوم' : 'days'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم المستخدم' : 'Username'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: hotel_trial_123' : 'e.g., hotel_trial_123'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <input
                    type="password"
                    placeholder={language === 'ar' ? 'كلمة مرور قوية' : 'Strong password'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Re-enter password'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={language === 'ar' ? 'أي ملاحظات أو تعليمات خاصة...' : 'Any notes or special instructions...'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ar' 
                      ? 'سيتم إرسال بيانات الدخول والتفعيل إلى البريد الإلكتروني المسجل فوراً'
                      : 'Login credentials and activation details will be sent to the registered email immediately'
                    }
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold"
                >
                  <i className="fas fa-rocket ml-2"></i>
                  {language === 'ar' ? 'إنشاء وتفعيل' : 'Create & Activate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
