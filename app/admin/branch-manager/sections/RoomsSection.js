'use client'

import { useState } from 'react'

export default function RoomsSection({ language }) {
  const [rooms, setRooms] = useState([
    { id: 1, number: '101', floor: 1, type: 'غرفة فردية', view: 'إطلالة على الحديقة', price: 50000, status: 'available' },
    { id: 2, number: '102', floor: 1, type: 'غرفة مزدوجة', view: 'إطلالة على المدينة', price: 85000, status: 'occupied' },
    { id: 3, number: '201', floor: 2, type: 'جناح عائلي', view: 'إطلالة بانورامية', price: 150000, status: 'available' },
    { id: 4, number: '202', floor: 2, type: 'غرفة مزدوجة', view: 'إطلالة على البحر', price: 85000, status: 'maintenance' },
    { id: 5, number: '301', floor: 3, type: 'جناح ملكي', view: 'إطلالة 360 درجة', price: 300000, status: 'available' },
    { id: 6, number: '302', floor: 3, type: 'جناح تنفيذي', view: 'إطلالة على المدينة', price: 220000, status: 'occupied' },
    { id: 7, number: '103', floor: 1, type: 'غرفة ثلاثية', view: 'إطلالة على الحديقة', price: 120000, status: 'available' },
    { id: 8, number: '104', floor: 1, type: 'غرفة فردية', view: 'إطلالة داخلية', price: 50000, status: 'available' },
    { id: 9, number: '203', floor: 2, type: 'غرفة مزدوجة', view: 'إطلالة على المسبح', price: 85000, status: 'occupied' },
    { id: 10, number: '204', floor: 2, type: 'غرفة ثلاثية', view: 'إطلالة على البحر', price: 120000, status: 'available' },
    { id: 11, number: '303', floor: 3, type: 'جناح عائلي', view: 'إطلالة بانورامية', price: 150000, status: 'maintenance' },
    { id: 12, number: '304', floor: 3, type: 'غرفة مزدوجة', view: 'إطلالة على الجبل', price: 85000, status: 'available' }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'occupied': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'available': return language === 'ar' ? 'متاحة' : 'Available'
      case 'occupied': return language === 'ar' ? 'محجوزة' : 'Occupied'
      case 'maintenance': return language === 'ar' ? 'صيانة' : 'Maintenance'
      default: return status
    }
  }

  const filteredRooms = filterStatus === 'all' ? rooms : rooms.filter(r => r.status === filterStatus)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            {language === 'ar' ? 'إدارة الغرف' : 'Rooms Management'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <i className="fas fa-door-open"></i>
            {language === 'ar' ? 'إدارة شاملة لجميع الغرف مع الأسعار' : 'Comprehensive room management with pricing'}
          </p>
        </div>
        <div className="flex gap-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-5 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white font-semibold bg-white hover:border-orange-400 transition-colors focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md"
          >
            <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
            <option value="available">{language === 'ar' ? 'متاحة' : 'Available'}</option>
            <option value="occupied">{language === 'ar' ? 'محجوزة' : 'Occupied'}</option>
            <option value="maintenance">{language === 'ar' ? 'صيانة' : 'Maintenance'}</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg"
          >
            <i className="fas fa-plus"></i>
            {language === 'ar' ? 'إضافة غرفة' : 'Add Room'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 border-2 border-orange-200 dark:border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-400 to-red-400 opacity-10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-3xl font-extrabold text-white drop-shadow-lg">{room.number}</span>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-sm font-bold shadow-md ${getStatusColor(room.status)} backdrop-blur-sm`}>
                {getStatusText(room.status)}
              </span>
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 relative z-10">{room.type}</h3>
            <div className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 relative z-10">
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-layer-group text-orange-500"></i>
                <span className="font-semibold">{language === 'ar' ? 'الطابق' : 'Floor'} {room.floor}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-users text-purple-500"></i>
                <span className="font-semibold">{room.capacity} {language === 'ar' ? 'نزلاء' : 'guests'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-700/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-eye text-blue-500"></i>
                <span className="font-semibold">{room.view}</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg shadow-lg font-bold text-base">
                <i className="fas fa-tag"></i>
                <span>{room.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t-2 border-orange-200 dark:border-gray-700 relative z-10">
              <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                <i className="fas fa-edit"></i>
              </button>
              <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-2 border-orange-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-door-open text-white text-xl"></i>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'إضافة غرفة جديدة' : 'Add New Room'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={language === 'ar' ? 'رقم الغرفة' : 'Room Number'} className="w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <select className="w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white">
                <option value="">{language === 'ar' ? 'اختر الطابق' : 'Select Floor'}</option>
                <option value="1">{language === 'ar' ? 'الطابق الأول' : 'First Floor'}</option>
                <option value="2">{language === 'ar' ? 'الطابق الثاني' : 'Second Floor'}</option>
                <option value="3">{language === 'ar' ? 'الطابق الثالث' : 'Third Floor'}</option>
              </select>
              <select className="w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white">
                <option value="">{language === 'ar' ? 'نوع الغرفة' : 'Room Type'}</option>
                <option value="single">{language === 'ar' ? 'غرفة فردية' : 'Single Room'}</option>
                <option value="double">{language === 'ar' ? 'غرفة مزدوجة' : 'Double Room'}</option>
                <option value="suite">{language === 'ar' ? 'جناح' : 'Suite'}</option>
              </select>
              <input type="number" placeholder={language === 'ar' ? 'عدد النزلاء' : 'Capacity (guests)'} className="w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder={language === 'ar' ? 'سعر الحجز (د.ع)' : 'Booking Price (IQD)'} className="col-span-2 w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder={language === 'ar' ? 'المطل/الإطلالة' : 'View'} className="col-span-2 w-full px-4 py-3 border-2 border-orange-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center gap-2">
                <i className="fas fa-save"></i>
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
