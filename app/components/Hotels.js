'use client'

import { useState } from 'react'

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [hotelsList, setHotelsList] = useState([
    { id: 1, name: 'فندق الروضة', location: 'بغداد', type: '5 نجوم', status: 'active', rooms: 120, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
    { id: 2, name: 'فندق النخيل', location: 'البصرة', type: '4 نجوم', status: 'active', rooms: 80, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400' },
    { id: 3, name: 'فندق دجلة', location: 'الموصل', type: '3 نجوم', status: 'inactive', rooms: 50, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    { id: 4, name: 'فندق البستان', location: 'أربيل', type: '5 نجوم', status: 'active', rooms: 90, image: 'https://images.unsplash.com/photo-1582719471381-971d80ea929b?w=400' },
  ])
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '5 نجوم',
    status: 'active',
    rooms: 0
  })

  const filteredHotels = hotelsList.filter(hotel =>
    hotel.name.includes(searchTerm) || hotel.location.includes(searchTerm)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const newHotel = {
      id: Math.max(...hotelsList.map(h => h.id)) + 1,
      ...formData,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    }
    setHotelsList([...hotelsList, newHotel])
    setShowModal(false)
    setFormData({
      name: '',
      location: '',
      type: '5 نجوم',
      status: 'active',
      rooms: 0
    })
  }

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الفندق؟')) {
      setHotelsList(hotelsList.filter(h => h.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-3xl font-black text-gray-900">إدارة الفنادق</h2>
        <div className="flex space-x-3">
          <div className="relative w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن فندق..."
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl pl-12 text-base font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-md"
            />
            <i className="fas fa-search absolute left-4 top-4 text-gray-400 text-lg"></i>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center font-bold shadow-lg hover:shadow-xl transition-all text-base"
          >
            <i className="fas fa-plus ml-2 text-lg"></i> إضافة فندق
          </button>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-br from-gray-100 to-gray-200">
            <tr>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 uppercase">اسم الفندق</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 uppercase">الموقع</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 uppercase">عدد الغرف</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 uppercase">الحالة</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y-2 divide-gray-200">
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-16 w-16 rounded-2xl object-cover shadow-lg border-2 border-gray-200" src={hotel.image} alt="" />
                    <div className="mr-5">
                      <div className="text-lg font-black text-gray-900">{hotel.name}</div>
                      <div className="text-base font-bold text-gray-600 mt-1">{hotel.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-800">{hotel.location}</td>
                <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-800">{hotel.rooms}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={`px-4 py-2 text-sm font-black rounded-xl shadow-md ${
                    hotel.status === 'active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {hotel.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-base">
                  <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-bold ml-3 shadow-md hover:shadow-lg transition-all">
                    <i className="fas fa-edit ml-1"></i> تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(hotel.id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-trash ml-1"></i> حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-gray-200">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-2xl font-black text-gray-900">إضافة فندق جديد</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    اسم الفندق
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أدخل اسم الفندق"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    الموقع
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أدخل الموقع"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    النوع
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="5 نجوم">5 نجوم</option>
                    <option value="4 نجوم">4 نجوم</option>
                    <option value="3 نجوم">3 نجوم</option>
                    <option value="شقق">شقق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    عدد الغرف
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أدخل عدد الغرف"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    الحالة
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 gap-3 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-800 hover:bg-gray-100 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  إضافة الفندق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
