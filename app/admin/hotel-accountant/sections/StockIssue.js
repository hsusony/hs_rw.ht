'use client'
import { useState } from 'react'

export default function StockIssue({ language }) {
  const [showModal, setShowModal] = useState(false)
  const [issues, setIssues] = useState([
    {
      id: 1,
      voucherNo: 'SV-2025-001',
      item: 'أرز بسمتي درجة أولى',
      quantity: 50,
      unit: 'كيس',
      recipient: 'المطبخ الرئيسي',
      purpose: 'استهلاك يومي لوجبات الإفطار والعشاء',
      date: '2025-11-20',
      status: 'approved'
    },
    {
      id: 2,
      voucherNo: 'SV-2025-002',
      item: 'منظف أرضيات مركز',
      quantity: 35,
      unit: 'قارورة',
      recipient: 'قسم النظافة والتدبير المنزلي',
      purpose: 'تنظيف الممرات والبهو وغرف النزلاء',
      date: '2025-11-21',
      status: 'approved'
    },
    {
      id: 3,
      voucherNo: 'SV-2025-003',
      item: 'مناشف قطنية بيضاء',
      quantity: 120,
      unit: 'قطعة',
      recipient: 'قسم الغرف - الطابق الثاني',
      purpose: 'تجهيز غرف الأجنحة الفاخرة',
      date: '2025-11-21',
      status: 'pending'
    }
  ])

  const [formData, setFormData] = useState({
    voucherNo: '',
    item: '',
    quantity: '',
    unit: '',
    recipient: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0]
  })

  const items = [
    { name: 'أرز', unit: 'كيس' },
    { name: 'منظف أرضيات', unit: 'قارورة' },
    { name: 'مناشف', unit: 'قطعة' },
    { name: 'صابون', unit: 'قطعة' },
    { name: 'ورق تواليت', unit: 'لفة' }
  ]

  const handleItemChange = (itemName) => {
    const selectedItem = items.find(i => i.name === itemName)
    if (selectedItem) {
      setFormData({
        ...formData,
        item: itemName,
        unit: selectedItem.unit
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newIssue = {
      id: issues.length + 1,
      ...formData,
      quantity: Number(formData.quantity),
      status: 'pending'
    }
    setIssues([newIssue, ...issues])
    setShowModal(false)
    setFormData({
      voucherNo: '',
      item: '',
      quantity: '',
      unit: '',
      recipient: '',
      purpose: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const totalIssues = issues.length
  const approvedIssues = issues.filter(i => i.status === 'approved').length
  const pendingIssues = issues.filter(i => i.status === 'pending').length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'سند صرف مخزني' : 'Stock Issue Voucher'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ar' ? 'إدارة سندات صرف المواد من المخازن' : 'Manage stock issue vouchers'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'سند صرف جديد' : 'New Issue'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-file-alt text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'إجمالي السندات' : 'Total Issues'}</span>
          </div>
          <p className="text-3xl font-bold">{totalIssues}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-check-circle text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'موافق عليها' : 'Approved'}</span>
          </div>
          <p className="text-3xl font-bold">{approvedIssues}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <i className="fas fa-clock text-3xl opacity-80"></i>
            <span className="text-sm opacity-90">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</span>
          </div>
          <p className="text-3xl font-bold">{pendingIssues}</p>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-rose-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم السند' : 'Voucher No'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المادة' : 'Item'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الكمية' : 'Quantity'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'المستلم' : 'Recipient'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الغرض' : 'Purpose'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{issue.voucherNo}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{issue.item}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{issue.quantity} {issue.unit}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{issue.recipient}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{issue.purpose}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{issue.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      issue.status === 'approved' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {issue.status === 'approved' ? (language === 'ar' ? 'موافق عليه' : 'Approved') : (language === 'ar' ? 'قيد الانتظار' : 'Pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {language === 'ar' ? 'سند صرف جديد' : 'New Stock Issue'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'رقم السند' : 'Voucher No'}
                  </label>
                  <input
                    type="text"
                    value={formData.voucherNo}
                    onChange={(e) => setFormData({...formData, voucherNo: e.target.value})}
                    placeholder="SV-2025-001"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المادة' : 'Item'}
                  </label>
                  <select
                    value={formData.item}
                    onChange={(e) => handleItemChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">{language === 'ar' ? 'اختر المادة' : 'Select Item'}</option>
                    {items.map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الكمية' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
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
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'المستلم' : 'Recipient'}
                  </label>
                  <input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                    placeholder={language === 'ar' ? 'المطبخ، النظافة، الغرف' : 'Kitchen, Cleaning, Rooms'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'الغرض' : 'Purpose'}
                  </label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    rows="3"
                    placeholder={language === 'ar' ? 'استهلاك يومي، تنظيف، صيانة' : 'Daily consumption, cleaning, maintenance'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                  ></textarea>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all"
                >
                  {language === 'ar' ? 'حفظ السند' : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
