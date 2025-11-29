'use client'
import { useState } from 'react'

export default function PurchaseInvoice({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: 'PI-2025-001',
      supplier: 'شركة الأطياف للمواد الغذائية - بغداد',
      items: 15,
      total: 8750000,
      date: '2025-11-18',
      status: 'paid'
    },
    {
      id: 2,
      invoiceNo: 'PI-2025-002',
      supplier: 'مؤسسة النظافة المثالية - البصرة',
      items: 12,
      total: 4500000,
      date: '2025-11-19',
      status: 'paid'
    },
    {
      id: 3,
      invoiceNo: 'PI-2025-003',
      supplier: 'معرض الأثاث الراقي - أربيل',
      items: 8,
      total: 12500000,
      date: '2025-11-20',
      status: 'pending'
    }
  ])

  const [formData, setFormData] = useState({
    invoiceNo: '',
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    items: [],
    notes: ''
  })

  const [currentItem, setCurrentItem] = useState({
    name: '',
    quantity: '',
    price: ''
  })

  const handleAddItem = () => {
    if (currentItem.name && currentItem.quantity && currentItem.price) {
      setFormData({
        ...formData,
        items: [...formData.items, { ...currentItem, id: Date.now() }]
      })
      setCurrentItem({ name: '', quantity: '', price: '' })
    }
  }

  const handleRemoveItem = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId)
    })
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newInvoice = {
      id: invoices.length + 1,
      invoiceNo: formData.invoiceNo,
      supplier: formData.supplier,
      items: formData.items.length,
      total: calculateTotal(),
      date: formData.date,
      status: 'pending'
    }
    setInvoices([newInvoice, ...invoices])
    setShowModal(false)
    setFormData({ invoiceNo: '', supplier: '', date: new Date().toISOString().split('T')[0], items: [], notes: '' })
  }

  const totalInvoices = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'فواتير الشراء' : 'Purchase Invoices'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة فواتير المشتريات من الموردين' : 'Manage purchase invoices from suppliers'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-file-invoice text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'إجمالي الفواتير' : 'Total Invoices'}</span>
          </div>
          <p className="text-3xl font-bold">{totalInvoices.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-check-circle text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'المدفوعة' : 'Paid'}</span>
          </div>
          <p className="text-3xl font-bold">{paidInvoices.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-clock text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'المعلقة' : 'Pending'}</span>
          </div>
          <p className="text-3xl font-bold">{pendingInvoices.toLocaleString()}</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم الفاتورة' : 'Invoice No'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المورد' : 'Supplier'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'عدد المواد' : 'Items'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المبلغ الإجمالي' : 'Total'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{invoice.invoiceNo}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{invoice.supplier}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.items}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{invoice.total.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {invoice.status === 'paid' ? (language === 'ar' ? 'مدفوعة' : 'Paid') : (language === 'ar' ? 'معلقة' : 'Pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'فاتورة شراء جديدة' : 'New Purchase Invoice'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'رقم الفاتورة' : 'Invoice No'}
                  </label>
                  <input
                    type="text"
                    value={formData.invoiceNo}
                    onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المورد' : 'Supplier'}
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Add Items Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{language === 'ar' ? 'المواد' : 'Items'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'اسم المادة' : 'Item Name'}
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder={language === 'ar' ? 'الكمية' : 'Quantity'}
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder={language === 'ar' ? 'السعر' : 'Price'}
                    value={currentItem.price}
                    onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <i className="fas fa-plus ml-2"></i>
                    {language === 'ar' ? 'إضافة' : 'Add'}
                  </button>
                </div>

                {/* Items List */}
                {formData.items.length > 0 && (
                  <div className="space-y-2">
                    {formData.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                        <span className="text-gray-900 dark:text-white">{item.name} - {item.quantity} × {Number(item.price).toLocaleString()}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900 dark:text-white">{(Number(item.quantity) * Number(item.price)).toLocaleString()}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-left pt-3 border-t border-gray-300 dark:border-gray-500">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'المجموع: ' : 'Total: '}
                        {calculateTotal().toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'الملاحظات' : 'Notes'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={formData.items.length === 0}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                >
                  {language === 'ar' ? 'حفظ الفاتورة' : 'Save Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
