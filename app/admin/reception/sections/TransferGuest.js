'use client'
import { useState } from 'react'

export default function TransferGuest({ language }) {
  const [occupiedRooms] = useState([
    { number: '201', customerName: 'أحمد الموصلي', type: 'غرفة مزدوجة', floor: 2 },
    { number: '305', customerName: 'فاطمة البصرية', type: 'جناح', floor: 3 },
    { number: '102', customerName: 'محمد العراقي', type: 'غرفة فردية', floor: 1 },
    { number: '408', customerName: 'سارة الكربلائية', type: 'ديلوكس', floor: 4 },
    { number: '215', customerName: 'عمر النجفي', type: 'غرفة مزدوجة', floor: 2 },
    { number: '312', customerName: 'ليلى الأنبارية', type: 'جناح', floor: 3 }
  ])

  const [availableRooms] = useState([
    { number: '203', type: 'غرفة مزدوجة', floor: 2, price: 150000 },
    { number: '307', type: 'جناح', floor: 3, price: 250000 },
    { number: '105', type: 'غرفة فردية', floor: 1, price: 100000 },
    { number: '410', type: 'ديلوكس', floor: 4, price: 200000 },
    { number: '218', type: 'غرفة مزدوجة', floor: 2, price: 150000 },
    { number: '314', type: 'جناح', floor: 3, price: 250000 },
    { number: '109', type: 'غرفة فردية', floor: 1, price: 100000 },
    { number: '412', type: 'ديلوكس', floor: 4, price: 200000 }
  ])

  const [transferHistory, setTransferHistory] = useState([
    { id: 1, customerName: 'حسين البغدادي', fromRoom: '101', toRoom: '205', date: '2024-11-20' },
    { id: 2, customerName: 'زينب الكاظمية', fromRoom: '308', toRoom: '402', date: '2024-11-19' },
    { id: 3, customerName: 'علي الديوانية', fromRoom: '214', toRoom: '316', date: '2024-11-18' },
    { id: 4, customerName: 'نور النجف', fromRoom: '405', toRoom: '501', date: '2024-11-17' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [selectedFromRoom, setSelectedFromRoom] = useState('')
  const [selectedToRoom, setSelectedToRoom] = useState('')

  const handleTransfer = () => {
    if (!selectedFromRoom || !selectedToRoom) return
    const fromRoomData = occupiedRooms.find(r => r.number === selectedFromRoom)
    if (!fromRoomData) return
    const newTransfer = {
      id: transferHistory.length + 1,
      customerName: fromRoomData.customerName,
      fromRoom: selectedFromRoom,
      toRoom: selectedToRoom,
      date: new Date().toISOString().split('T')[0]
    }
    setTransferHistory([newTransfer, ...transferHistory])
    setShowModal(false)
    setSelectedFromRoom('')
    setSelectedToRoom('')
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'نقل نزيل' : 'Transfer Guest'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {language === 'ar' ? 'نقل النزلاء بين الغرف المتاحة' : 'Transfer guests between available rooms'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <div className="text-5xl font-black">{occupiedRooms.length}</div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
          <div className="text-base font-semibold opacity-95">{language === 'ar' ? 'غرف مشغولة' : 'Occupied Rooms'}</div>
          <div className="text-xs opacity-75 mt-1">{language === 'ar' ? 'جاهزة للنقل' : 'Ready for transfer'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <div className="text-5xl font-black">{availableRooms.length}</div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-base font-semibold opacity-95">{language === 'ar' ? 'غرف متاحة' : 'Available Rooms'}</div>
          <div className="text-xs opacity-75 mt-1">{language === 'ar' ? 'نظيفة وجاهزة' : 'Clean & ready'}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <div className="text-5xl font-black">{transferHistory.length}</div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-base font-semibold opacity-95">{language === 'ar' ? 'عمليات النقل' : 'Total Transfers'}</div>
          <div className="text-xs opacity-75 mt-1">{language === 'ar' ? 'هذا الشهر' : 'This month'}</div>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-6 rounded-2xl hover:shadow-2xl transition-all text-xl font-black relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span>{language === 'ar' ? 'نقل جديد' : 'New Transfer'}</span>
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 text-white p-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-black">{language === 'ar' ? 'سجل عمليات النقل' : 'Transfer History'}</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {language === 'ar' ? 'اسم الزبون' : 'Customer Name'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {language === 'ar' ? 'من غرفة' : 'From Room'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {language === 'ar' ? 'إلى غرفة' : 'To Room'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transferHistory.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                        {transfer.customerName.charAt(0)}
                      </div>
                      <span className="text-gray-900 dark:text-white font-bold text-base">{transfer.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg inline-flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {transfer.fromRoom}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg inline-flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {transfer.toRoom}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {transfer.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border-4 border-white/20">
            <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <h3 className="text-3xl font-black">{language === 'ar' ? 'نقل نزيل إلى غرفة أخرى' : 'Transfer Guest to Another Room'}</h3>
              </div>
              <button
                onClick={() => { setShowModal(false); setSelectedFromRoom(''); setSelectedToRoom('') }}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                    {language === 'ar' ? 'من غرفة' : 'From Room'}
                  </label>
                  <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl border-2 border-red-200 dark:border-gray-500">
                    {occupiedRooms.map(room => (
                      <button
                        key={room.number}
                        onClick={() => setSelectedFromRoom(room.number)}
                        className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedFromRoom === room.number
                            ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white border-red-600 ring-4 ring-red-300 shadow-2xl'
                            : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-red-300 hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl font-black">{room.number}</div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            selectedFromRoom === room.number ? 'bg-white/20' : 'bg-gradient-to-br from-red-500 to-pink-500 text-white'
                          }`}>
                            {room.customerName.charAt(0)}
                          </div>
                        </div>
                        <div className={`text-sm font-bold mb-2 ${selectedFromRoom === room.number ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {room.customerName}
                        </div>
                        <div className={`text-xs ${selectedFromRoom === room.number ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                          {room.type} - {language === 'ar' ? 'الطابق' : 'Floor'} {room.floor}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {language === 'ar' ? 'إلى غرفة' : 'To Room'}
                  </label>
                  <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl border-2 border-green-200 dark:border-gray-500">
                    {availableRooms.map(room => (
                      <button
                        key={room.number}
                        onClick={() => setSelectedToRoom(room.number)}
                        className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedToRoom === room.number
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-600 ring-4 ring-green-300 shadow-2xl'
                            : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-green-300 hover:shadow-xl'
                        }`}
                      >
                        <div className="text-2xl font-black mb-2">{room.number}</div>
                        <div className={`text-sm font-bold mb-2 ${selectedToRoom === room.number ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {room.type}
                        </div>
                        <div className={`text-xs ${selectedToRoom === room.number ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                          {language === 'ar' ? 'الطابق' : 'Floor'} {room.floor} - {room.price.toLocaleString()} {language === 'ar' ? 'دينار' : 'IQD'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedFromRoom && selectedToRoom && (
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-2xl mb-6 border-4 border-indigo-300 shadow-2xl">
                  <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {language === 'ar' ? 'ملخص عملية النقل' : 'Transfer Summary'}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm flex-1 border-2 border-white/20">
                      <div className="text-sm font-semibold opacity-90 mb-2">{language === 'ar' ? 'من' : 'From'}</div>
                      <div className="text-3xl font-black bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                        {language === 'ar' ? 'غرفة' : 'Room'} {selectedFromRoom}
                      </div>
                      <div className="text-sm mt-2 opacity-90">
                        {occupiedRooms.find(r => r.number === selectedFromRoom)?.customerName}
                      </div>
                    </div>
                    <div className="px-8">
                      <svg className="w-16 h-16 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm flex-1 border-2 border-white/20">
                      <div className="text-sm font-semibold opacity-90 mb-2">{language === 'ar' ? 'إلى' : 'To'}</div>
                      <div className="text-3xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                        {language === 'ar' ? 'غرفة' : 'Room'} {selectedToRoom}
                      </div>
                      <div className="text-sm mt-2 opacity-90">
                        {availableRooms.find(r => r.number === selectedToRoom)?.type}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleTransfer}
                  disabled={!selectedFromRoom || !selectedToRoom}
                  className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-black text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {language === 'ar' ? 'تأكيد النقل' : 'Confirm Transfer'}
                </button>
                <button
                  onClick={() => { setShowModal(false); setSelectedFromRoom(''); setSelectedToRoom('') }}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
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

