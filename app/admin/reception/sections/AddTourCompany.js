'use client'
import { useState } from 'react'

export default function AddTourCompany({ language }) {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'شركة النور للسياحة', contactPerson: 'أحمد العراقي', phone: '07701234567', email: 'alnoor@tourism.iq', commission: 15, address: 'بغداد - الكرادة', website: 'www.alnoor-tourism.iq', taxNumber: 'TX-2024-001', notes: 'شريك ممتاز', status: 'active' },
    { id: 2, name: 'سفريات بغداد', contactPerson: 'فاطمة الموصلي', phone: '07809876543', email: 'baghdad@travel.iq', commission: 20, address: 'بغداد - المنصور', website: 'www.baghdad-travel.iq', taxNumber: 'TX-2024-002', notes: 'عميل دائم', status: 'active' },
    { id: 3, name: 'الرفدين للسياحة', contactPerson: 'محمد البصري', phone: '07512345678', email: 'alrafidain@tours.iq', commission: 10, address: 'البصرة - العشار', website: 'www.rafidain-tours.iq', taxNumber: 'TX-2024-003', notes: '', status: 'active' },
    { id: 4, name: 'مجموعة الفرات', contactPerson: 'ليلى النجفية', phone: '07601234567', email: 'alfurat@group.iq', commission: 12, address: 'النجف - المدينة', website: 'www.alfurat-group.iq', taxNumber: 'TX-2024-004', notes: 'شريك جديد', status: 'active' },
    { id: 5, name: 'شركة دجلة للسياحة', contactPerson: 'عمر الكربلائي', phone: '07701122334', email: 'dijla@tourism.iq', commission: 18, address: 'كربلاء - المركز', website: 'www.dijla-tourism.iq', taxNumber: 'TX-2024-005', notes: '', status: 'active' },
    { id: 6, name: 'السندباد للسفر', contactPerson: 'نور العمارة', phone: '07805556677', email: 'sindbad@travel.iq', commission: 14, address: 'بغداد - الجادرية', website: 'www.sindbad-travel.iq', taxNumber: 'TX-2024-006', notes: 'متخصص في الكروبات', status: 'active' }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    commission: '',
    address: '',
    website: '',
    taxNumber: '',
    notes: '',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCompany = {
      id: companies.length + 1,
      ...formData,
      commission: parseFloat(formData.commission)
    }
    setCompanies([newCompany, ...companies])
    setShowModal(false)
    setFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      commission: '',
      address: '',
      website: '',
      taxNumber: '',
      notes: '',
      status: 'active'
    })
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phone.includes(searchTerm)
  )

  const activeCompanies = companies.filter(c => c.status === 'active').length
  const totalCommission = companies.reduce((sum, c) => sum + c.commission, 0) / companies.length

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'الشركات السياحية' : 'Tour Companies'}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          {language === 'ar' ? 'شركة جديدة' : 'New Company'}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={language === 'ar' ? 'بحث بالاسم، الشخص المسؤول، أو الهاتف...' : 'Search by name, contact person, or phone...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{companies.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي الشركات' : 'Total Companies'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{activeCompanies}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'شركات نشطة' : 'Active Companies'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{totalCommission.toFixed(1)}%</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'متوسط العمولة' : 'Avg Commission'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">245</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات كروبات' : 'Group Bookings'}</div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'العمولة %' : 'Commission %'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{company.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{company.contactPerson}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400" dir="ltr">{company.phone}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{company.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full font-medium">
                      {company.commission}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {company.status === 'active' ? (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                          {language === 'ar' ? 'نشط' : 'Active'}
                        </span>
                      ) : (
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                          {language === 'ar' ? 'غير نشط' : 'Inactive'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        {language === 'ar' ? 'تعديل' : 'Edit'}
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        {language === 'ar' ? 'عرض' : 'View'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">
                {language === 'ar' ? 'إضافة شركة سياحية جديدة' : 'Add New Tour Company'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'اسم الشركة *' : 'Company Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الشخص المسؤول *' : 'Contact Person *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Commission */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'نسبة العمولة % *' : 'Commission % *'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.commission}
                    onChange={(e) => setFormData({...formData, commission: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Tax Number */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الرقم الضريبي' : 'Tax Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="active">{language === 'ar' ? 'نشط' : 'Active'}</option>
                    <option value="inactive">{language === 'ar' ? 'غير نشط' : 'Inactive'}</option>
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'العنوان' : 'Address'}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'ملاحظات' : 'Notes'}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
