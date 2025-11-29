'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Rooms() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchTerm, setSearchTerm] = useState('')
  const [floorFilter, setFloorFilter] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showFloorModal, setShowFloorModal] = useState(false)
  const [newFloorNumber, setNewFloorNumber] = useState('')
  const [roomsList, setRoomsList] = useState([
    { id: 1, number: '101', floor: 1, type: 'deluxe', price: 150000, capacity: 2, size: 45, status: 'available', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' },
    { id: 2, number: '201', floor: 2, type: 'suite', price: 250000, capacity: 4, size: 75, status: 'available', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400' },
    { id: 3, number: '105', floor: 1, type: 'single', price: 80000, capacity: 1, size: 30, status: 'booked', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400' },
    { id: 4, number: '205', floor: 2, type: 'double', price: 120000, capacity: 2, size: 35, status: 'available', image: 'https://images.unsplash.com/photo-1566669437685-2c5a1f510d0c?w=400' },
    { id: 5, number: '301', floor: 3, type: 'family', price: 180000, capacity: 5, size: 60, status: 'available', image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400' },
    { id: 6, number: '106', floor: 1, type: 'single', price: 90000, capacity: 1, size: 32, status: 'maintenance', image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400' },
  ])
  const [formData, setFormData] = useState({
    number: '',
    floor: 1,
    type: 'deluxe',
    price: 0,
    capacity: 2,
    size: 0,
    status: 'available'
  })

  const floors = [...new Set(roomsList.map(room => room.floor))].sort()

  const getRoomTypeLabel = (type) => {
    const typeMap = {
      'deluxe': t.deluxe,
      'suite': t.suite,
      'single': t.single,
      'double': t.double,
      'family': t.family
    }
    return typeMap[type] || type
  }

  const getStatusLabel = (status) => {
    const statusMap = {
      'available': t.available,
      'booked': t.booked,
      'maintenance': t.maintenance
    }
    return statusMap[status] || status
  }

  const filteredRooms = roomsList.filter(room => {
    const matchesSearch = room.number.includes(searchTerm) || room.type.includes(searchTerm)
    const matchesFloor = floorFilter.length === 0 || floorFilter.includes(room.floor)
    return matchesSearch && matchesFloor
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-IQ').format(amount)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editMode) {
      setRoomsList(roomsList.map(room => 
        room.id === editingId ? { ...room, ...formData } : room
      ))
      setEditMode(false)
      setEditingId(null)
    } else {
      const newRoom = {
        id: Math.max(...roomsList.map(r => r.id)) + 1,
        ...formData,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
      }
      setRoomsList([...roomsList, newRoom])
    }
    setShowModal(false)
    setFormData({
      number: '',
      floor: 1,
      type: 'deluxe',
      price: 0,
      capacity: 2,
      size: 0,
      status: 'available'
    })
  }

  const handleEdit = (room) => {
    setFormData({
      number: room.number,
      floor: room.floor,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      size: room.size,
      status: room.status
    })
    setEditingId(room.id)
    setEditMode(true)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm(t.confirmDeleteRoom)) {
      setRoomsList(roomsList.filter(r => r.id !== id))
    }
  }

  const handleAddFloor = (e) => {
    e.preventDefault()
    const floorNum = parseInt(newFloorNumber)
    if (floorNum > 0 && !floors.includes(floorNum)) {
      alert(`${t.floorAddedSuccess} ${floorNum} ${t.canAddRooms}`)
      setShowFloorModal(false)
      setNewFloorNumber('')
    } else {
      alert(t.invalidFloor)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.roomManagement}</h2>
        <div className="flex gap-3 flex-wrap">
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button 
            onClick={() => setShowFloorModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center font-bold shadow-md hover:shadow-lg transition-all">
            <i className="fas fa-building ml-2"></i> {t.addFloor}
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center font-bold shadow-md hover:shadow-lg transition-all">
            <i className="fas fa-plus ml-2"></i> {t.addRoom}
          </button>
        </div>
      </div>

      {/* Floor Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => {
                setFloorFilter(prev =>
                  prev.includes(floor)
                    ? prev.filter(f => f !== floor)
                    : [...prev, floor]
                )
              }}
              className={`px-3 py-1 rounded ${
                floorFilter.includes(floor)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {t.floor} {floor}
            </button>
          ))}
          <button
            onClick={() => setFloorFilter([])}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {t.showAll}
          </button>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="room-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="relative h-56">
              <Image src={room.image} alt={`Room ${room.number}`} width={400} height={224} className="w-full h-full object-cover transition-transform duration-500" unoptimized />
              <div className="absolute top-3 left-3 bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-2 rounded-xl text-base font-extrabold shadow-2xl text-white border-2 border-white">
                {formatCurrency(room.price)} {t.iqd}
              </div>
              <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                <span className="px-4 py-1.5 rounded-xl text-sm font-extrabold shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white border-2 border-white">
                  {t.floor} {room.floor}
                </span>
                <span className={`px-4 py-1.5 rounded-xl text-sm font-extrabold shadow-xl border-2 border-white ${
                  room.status === 'available' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' :
                  room.status === 'maintenance' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white' :
                  'bg-gradient-to-br from-red-500 to-red-600 text-white'
                }`}>
                  {getStatusLabel(room.status)}
                </span>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 truncate" title={`${t.room} ${room.number} - ${getRoomTypeLabel(room.type)}`}>
                {t.room} {room.number} - {getRoomTypeLabel(room.type)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-base bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-gray-200 px-4 py-2.5 rounded-xl flex items-center font-bold border-2 border-indigo-200 dark:border-gray-600 shadow-md">
                  <i className="fas fa-user-friends ml-2 text-indigo-600 text-lg"></i> 
                  <span className="text-gray-900 dark:text-gray-200">{room.capacity} {t.people}</span>
                </span>
                <span className="text-base bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-gray-200 px-4 py-2.5 rounded-xl flex items-center font-bold border-2 border-purple-200 dark:border-gray-600 shadow-md">
                  <i className="fas fa-ruler-combined ml-2 text-purple-600 text-lg"></i> 
                  <span className="text-gray-900 dark:text-gray-200">{room.size} {t.sqm}</span>
                </span>
              </div>
              <div className="mt-6 pt-5 border-t-2 border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <button 
                  onClick={() => handleEdit(room)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-lg hover:shadow-xl text-base"
                >
                  <i className="fas fa-edit ml-2 text-lg"></i> {t.edit}
                </button>
                <button 
                  onClick={() => handleDelete(room.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-lg hover:shadow-xl text-base">
                  <i className="fas fa-trash ml-2 text-lg"></i> {t.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 sticky top-0">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{editMode ? t.editRoom : t.addNewRoom}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.roomNumber}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={t.example101}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.floor}
                  </label>
                  <select
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value={1}>{t.floor} 1</option>
                    <option value={2}>{t.floor} 2</option>
                    <option value={3}>{t.floor} 3</option>
                    <option value={4}>{t.floor} 4</option>
                    <option value={5}>{t.floor} 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.roomType}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="single">{t.single}</option>
                    <option value="double">{t.double}</option>
                    <option value="deluxe">{t.deluxe}</option>
                    <option value="suite">{t.suite}</option>
                    <option value="family">{t.family}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.priceIQD}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.capacity}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.area}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: parseInt(e.target.value)})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="45"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.roomStatus}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="available">{t.available}</option>
                    <option value="booked">{t.booked}</option>
                    <option value="maintenance">{t.maintenance}</option>
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
                  {editMode ? t.saveChanges : t.addRoom}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floor Modal */}
      {showFloorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border-2 border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{t.addNewFloor}</h3>
              <button
                onClick={() => setShowFloorModal(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddFloor} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.floorNumber}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="50"
                    value={newFloorNumber}
                    onChange={(e) => setNewFloorNumber(e.target.value)}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={t.enterFloorNumber}
                  />
                </div>

                <div className="bg-green-50 dark:bg-gray-700 border-2 border-green-200 dark:border-gray-600 rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fas fa-info-circle text-green-600 mt-1 ml-3 text-xl"></i>
                    <div>
                      <p className="text-base font-bold text-gray-800 dark:text-gray-200">
                        {t.currentFloors}: {floors.join(', ')}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2">
                        {t.floorAddedMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3 gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowFloorModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base shadow-md hover:shadow-lg transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {t.addFloorButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
