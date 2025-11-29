'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Hotels() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [hotelsList, setHotelsList] = useState([
    { id: 1, name: 'فندق الروضة', location: 'بغداد', rooms: 50, status: 'active' },
    { id: 2, name: 'فندق النخيل', location: 'البصرة', rooms: 40, status: 'active' },
    { id: 3, name: 'فندق البستان', location: 'أربيل', rooms: 60, status: 'active' },
    { id: 4, name: 'فندق الواحة', location: 'النجف', rooms: 35, status: 'inactive' }
  ])
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: t.stars5,
    status: 'active',
    rooms: 0,
    floors: 0
  })

  const filteredHotels = hotelsList.filter(hotel =>
    hotel.name.includes(searchTerm) || hotel.location.includes(searchTerm)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editMode) {
      setHotelsList(hotelsList.map(hotel => 
        hotel.id === editingId ? { ...hotel, ...formData } : hotel
      ))
      setEditMode(false)
      setEditingId(null)
    } else {
      const newHotel = {
        id: Math.max(...hotelsList.map(h => h.id)) + 1,
        ...formData,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
      }
      setHotelsList([...hotelsList, newHotel])
    }
    setShowModal(false)
    setFormData({
      name: '',
      location: '',
      type: t.stars5,
      status: 'active',
      rooms: 0,
      floors: 0
    })
  }

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      location: hotel.location,
      type: hotel.type,
      status: hotel.status,
      rooms: hotel.rooms,
      floors: hotel.floors
    })
    setEditingId(hotel.id)
    setEditMode(true)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الفندق؟' : 'Are you sure you want to delete this hotel?')) {
      setHotelsList(hotelsList.filter(h => h.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.hotelManagement}</h2>
        <div className="flex space-x-3">
          <div className="relative w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchHotel}
              className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pl-12 text-base font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-md"
            />
            <i className="fas fa-search absolute left-4 top-4 text-gray-400 dark:text-gray-300 text-lg"></i>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center font-bold shadow-lg hover:shadow-xl transition-all text-base"
          >
            <i className="fas fa-plus ml-2 text-lg"></i> {t.addHotel}
          </button>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
            <tr>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 dark:text-white uppercase">{t.hotelName}</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 dark:text-white uppercase">{t.location}</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 dark:text-white uppercase">{t.roomsCount}</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 dark:text-white uppercase">{t.status}</th>
              <th className="px-8 py-5 text-right text-base font-black text-gray-900 dark:text-white uppercase">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y-2 divide-gray-200 dark:divide-gray-700">
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-600 relative flex-shrink-0">
                      <Image src={hotel.image} alt="Hotel" width={64} height={64} className="object-cover" unoptimized />
                    </div>
                    <div className="mr-5">
                      <div className="text-lg font-black text-gray-900 dark:text-white">{hotel.name}</div>
                      <div className="text-base font-bold text-gray-600 dark:text-gray-400 mt-1">{hotel.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-800 dark:text-gray-200">{hotel.location}</td>
                <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-gray-800 dark:text-gray-200">{hotel.rooms}</td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className={`px-4 py-2 text-sm font-black rounded-xl shadow-md ${
                    hotel.status === 'active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {hotel.status === 'active' ? t.active : t.inactive}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-base">
                  <button 
                    onClick={() => handleEdit(hotel)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-bold ml-3 shadow-md hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-edit ml-1"></i> {t.edit}
                  </button>
                  <button 
                    onClick={() => handleDelete(hotel.id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-trash ml-1"></i> {t.delete}
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{editMode ? t.editHotel : t.addNewHotel}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.hotelName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder={t.enterHotelName}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.location}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder={t.enterLocation}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.type}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value={t.stars5}>{t.stars5}</option>
                    <option value={t.stars4}>{t.stars4}</option>
                    <option value={t.stars3}>{t.stars3}</option>
                    <option value={t.apartments}>{t.apartments}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.roomsCount}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder={t.enterRoomsCount}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.floorsCount}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.floors}
                    onChange={(e) => setFormData({...formData, floors: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder={t.enterFloorsCount}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.status}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="active">{t.active}</option>
                    <option value="inactive">{t.inactive}</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {editMode ? t.saveChanges : t.addHotelButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
