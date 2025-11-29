'use client'
import { useState } from 'react'

export default function InventoryItems({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [items, setItems] = useState([
    { id: 1, nameAr: 'أرز بسمتي', nameEn: 'Basmati Rice', unit: 'كيس 25 كغم', openingBalance: 200, currentBalance: 150, reorderLevel: 50, warehouse: 'مخزن المواد الغذائية' },
    { id: 2, nameAr: 'منظف أرضيات مركز', nameEn: 'Concentrated Floor Cleaner', unit: 'قارورة 5 لتر', openingBalance: 100, currentBalance: 70, reorderLevel: 30, warehouse: 'مخزن مواد النظافة' },
    { id: 3, nameAr: 'مناشف قطنية بيضاء', nameEn: 'White Cotton Towels', unit: 'قطعة', openingBalance: 800, currentBalance: 600, reorderLevel: 200, warehouse: 'مخزن المفروشات والأثاث' },
    { id: 4, nameAr: 'صابون سائل لليدين', nameEn: 'Liquid Hand Soap', unit: 'قارورة 500 مل', openingBalance: 500, currentBalance: 280, reorderLevel: 100, warehouse: 'مخزن مواد النظافة' },
    { id: 5, nameAr: 'ورق تواليت معطر', nameEn: 'Scented Toilet Paper', unit: 'لفة', openingBalance: 1000, currentBalance: 850, reorderLevel: 300, warehouse: 'مخزن مواد النظافة' },
    { id: 6, nameAr: 'مصابيح LED موفرة', nameEn: 'LED Energy-Saving Bulbs', unit: 'قطعة', openingBalance: 300, currentBalance: 180, reorderLevel: 80, warehouse: 'مخزن الأدوات الكهربائية' },
    { id: 7, nameAr: 'زيت نباتي للطبخ', nameEn: 'Vegetable Cooking Oil', unit: 'تنكة 20 لتر', openingBalance: 50, currentBalance: 35, reorderLevel: 15, warehouse: 'مخزن المواد الغذائية' },
    { id: 8, nameAr: 'معطر جو متنوع', nameEn: 'Multi-scent Air Freshener', unit: 'عبوة', openingBalance: 200, currentBalance: 45, reorderLevel: 50, warehouse: 'مخزن مواد النظافة' }
  ])

  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    unit: '',
    openingBalance: '',
    currentBalance: '',
    reorderLevel: '',
    warehouse: ''
  })

  const warehouses = ['مخزن المواد الغذائية', 'مخزن مواد النظافة', 'مخزن الأثاث']

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      id: items.length + 1,
      ...formData,
      openingBalance: Number(formData.openingBalance),
      currentBalance: Number(formData.currentBalance),
      reorderLevel: Number(formData.reorderLevel)
    }
    setItems([...items, newItem])
    setShowModal(false)
    setFormData({ nameAr: '', nameEn: '', unit: '', openingBalance: '', currentBalance: '', reorderLevel: '', warehouse: '' })
  }

  const lowStockItems = items.filter(item => item.currentBalance <= item.reorderLevel)
  const totalItems = items.length
  const totalStock = items.reduce((sum, item) => sum + item.currentBalance, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'المواد المخزنية' : 'Inventory Items'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة المواد مع الرصيد الافتتاحي' : 'Manage items with opening balance'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'مادة جديدة' : 'New Item'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-boxes text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'عدد المواد' : 'Total Items'}</span>
          </div>
          <p className="text-3xl font-bold">{totalItems}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-layer-group text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'الرصيد الحالي' : 'Current Stock'}</span>
          </div>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-exclamation-triangle text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'مخزون منخفض' : 'Low Stock'}</span>
          </div>
          <p className="text-3xl font-bold">{lowStockItems.length}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'اسم المادة' : 'Item Name'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الوحدة' : 'Unit'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الرصيد الافتتاحي' : 'Opening Balance'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'حد الطلب' : 'Reorder Level'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المخزن' : 'Warehouse'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const isLowStock = item.currentBalance <= item.reorderLevel
                return (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                      {language === 'ar' ? item.nameAr : item.nameEn}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.unit}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{item.openingBalance}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${
                        isLowStock ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {item.currentBalance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.reorderLevel}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.warehouse}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isLowStock 
                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                          : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {isLowStock 
                          ? (language === 'ar' ? 'مخزون منخفض' : 'Low Stock')
                          : (language === 'ar' ? 'متوفر' : 'Available')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'مادة مخزنية جديدة' : 'New Inventory Item'}
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الوحدة' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    placeholder={language === 'ar' ? 'كيس، قارورة، قطعة' : 'Bag, Bottle, Piece'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الرصيد الافتتاحي' : 'Opening Balance'}
                  </label>
                  <input
                    type="number"
                    value={formData.openingBalance}
                    onChange={(e) => setFormData({...formData, openingBalance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}
                  </label>
                  <input
                    type="number"
                    value={formData.currentBalance}
                    onChange={(e) => setFormData({...formData, currentBalance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'حد الطلب' : 'Reorder Level'}
                  </label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المخزن' : 'Warehouse'}
                  </label>
                  <select
                    value={formData.warehouse}
                    onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر المخزن' : 'Select Warehouse'}</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse} value={warehouse}>{warehouse}</option>
                    ))}
                  </select>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
                >
                  {language === 'ar' ? 'حفظ المادة' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
