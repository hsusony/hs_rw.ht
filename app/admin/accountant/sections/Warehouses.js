'use client'
import { useState } from 'react'

export default function Warehouses({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [warehouses, setWarehouses] = useState([
    { id: 1, nameAr: 'مخزن المواد الغذائية', nameEn: 'Food Storage', location: 'الطابق السفلي - الجناح الشرقي', capacity: 5000, currentStock: 3500, manager: 'محمد أحمد الخزان', status: 'active' },
    { id: 2, nameAr: 'مخزن مواد النظافة', nameEn: 'Cleaning Supplies Storage', location: 'الطابق الأرضي - الجناح الغربي', capacity: 3000, currentStock: 2400, manager: 'فاطمة حسين المخزنجي', status: 'active' },
    { id: 3, nameAr: 'مخزن المفروشات والأثاث', nameEn: 'Furniture Storage', location: 'المبنى الخلفي - الطابق الأول', capacity: 1500, currentStock: 1200, manager: 'عبدالله سالم النجار', status: 'active' },
    { id: 4, nameAr: 'مخزن الأدوات الكهربائية', nameEn: 'Electrical Equipment Storage', location: 'الطابق السفلي - الجناح الغربي', capacity: 800, currentStock: 650, manager: 'يوسف علي الكهربائي', status: 'active' },
    { id: 5, nameAr: 'مخزن المواد الاحتياطية', nameEn: 'Reserve Storage', location: 'المبنى الخلفي - الطابق الثاني', capacity: 2000, currentStock: 500, manager: 'سارة محمود الأمينة', status: 'active' }
  ])

  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    location: '',
    capacity: '',
    currentStock: '',
    manager: '',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newWarehouse = {
      id: warehouses.length + 1,
      ...formData,
      capacity: Number(formData.capacity),
      currentStock: Number(formData.currentStock)
    }
    setWarehouses([...warehouses, newWarehouse])
    setShowModal(false)
    setFormData({ nameAr: '', nameEn: '', location: '', capacity: '', currentStock: '', manager: '', status: 'active' })
  }

  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0)
  const totalStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0)
  const utilization = ((totalStock / totalCapacity) * 100).toFixed(1)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'المخازن' : 'Warehouses'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة المخازن والمستودعات' : 'Manage warehouses and storage'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'مخزن جديد' : 'New Warehouse'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-warehouse text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'عدد المخازن' : 'Total Warehouses'}</span>
          </div>
          <p className="text-3xl font-bold">{warehouses.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-box-open text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'السعة الإجمالية' : 'Total Capacity'}</span>
          </div>
          <p className="text-3xl font-bold">{totalCapacity}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-boxes text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'المخزون الحالي' : 'Current Stock'}</span>
          </div>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-chart-pie text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'نسبة الاستخدام' : 'Utilization'}</span>
          </div>
          <p className="text-3xl font-bold">{utilization}%</p>
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => {
          const usage = ((warehouse.currentStock / warehouse.capacity) * 100).toFixed(1)
          return (
            <div key={warehouse.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-warehouse text-white text-2xl"></i>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  warehouse.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {warehouse.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? warehouse.nameAr : warehouse.nameEn}
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                <p className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-teal-600"></i>
                  {warehouse.location}
                </p>
                <p className="flex items-center gap-2">
                  <i className="fas fa-user text-teal-600"></i>
                  {warehouse.manager}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'السعة' : 'Capacity'}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{warehouse.capacity}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'ar' ? 'المخزون' : 'Stock'}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{warehouse.currentStock}</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'نسبة الاستخدام' : 'Usage'}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{usage}%</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        Number(usage) < 50 ? 'bg-green-500' :
                        Number(usage) < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${usage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Warehouse Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'مخزن جديد' : 'New Warehouse'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الاسم بالعربي' : 'Arabic Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الاسم بالإنجليزي' : 'English Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الموقع' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'السعة' : 'Capacity'}
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المخزون الحالي' : 'Current Stock'}
                  </label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المسؤول' : 'Manager'}
                  </label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all"
                >
                  {language === 'ar' ? 'حفظ المخزن' : 'Save Warehouse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
