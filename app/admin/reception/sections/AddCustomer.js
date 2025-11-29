'use client'
import { useState } from 'react'

export default function AddCustomer({ language }) {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'حسين علي الجبوري', idNumber: 'N123456789', nationality: 'عراقي', phone: '07701234567', email: 'hussein@email.com', address: 'بغداد - الكرادة', dateOfBirth: '1985-05-15', gender: 'male', joinDate: '2024-01-10', notes: '' },
    { id: 2, name: 'زينب محمد الفرات', idNumber: 'N987654321', nationality: 'عراقية', phone: '07809876543', email: 'zainab@email.com', address: 'البصرة - العشار', dateOfBirth: '1990-08-20', gender: 'female', joinDate: '2024-02-15', notes: 'عميلة دائمة' },
    { id: 3, name: 'عمر خالد التميمي', idNumber: 'N456789123', nationality: 'عراقي', phone: '07512345678', email: 'omar@email.com', address: 'الموصل - المجموعة', dateOfBirth: '1988-03-10', gender: 'male', joinDate: '2024-03-20', notes: '' },
    { id: 4, name: 'نور أحمد العمارة', idNumber: 'N789123456', nationality: 'عراقية', phone: '07601234567', email: 'noor@email.com', address: 'النجف - المدينة', dateOfBirth: '1992-11-25', gender: 'female', joinDate: '2024-04-05', notes: '' },
    { id: 5, name: 'أحمد عبدالله الرفاعي', idNumber: 'N321654987', nationality: 'عراقي', phone: '07701122334', email: 'ahmed@email.com', address: 'كربلاء - الحسين', dateOfBirth: '1987-07-18', gender: 'male', joinDate: '2024-05-12', notes: '' },
    { id: 6, name: 'فاطمة حسن العباسي', idNumber: 'N654987321', nationality: 'عراقية', phone: '07805556677', email: 'fatima@email.com', address: 'بغداد - المنصور', dateOfBirth: '1989-09-30', gender: 'female', joinDate: '2024-06-08', notes: 'VIP' },
    { id: 7, name: 'محمد علي الحسيني', idNumber: 'N147258369', nationality: 'عراقي', phone: '07702223344', email: 'mohammad@email.com', address: 'البصرة - القرنة', dateOfBirth: '1991-12-05', gender: 'male', joinDate: '2024-07-14', notes: '' },
    { id: 8, name: 'ليلى عادل الحيدري', idNumber: 'N963852741', nationality: 'عراقية', phone: '07807778899', email: 'layla@email.com', address: 'النجف - الغري', dateOfBirth: '1993-04-22', gender: 'female', joinDate: '2024-08-20', notes: '' }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    nationality: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: 'male',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      joinDate: new Date().toISOString().split('T')[0]
    }
    setCustomers([newCustomer, ...customers])
    setShowModal(false)
    setFormData({
      name: '',
      idNumber: '',
      nationality: '',
      phone: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: 'male',
      notes: ''
    })
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.idNumber.includes(searchTerm) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'إضافة زبون' : 'Add Customer'}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          {language === 'ar' ? 'زبون جديد' : 'New Customer'}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={language === 'ar' ? 'بحث بالاسم، رقم الهوية، أو الهاتف...' : 'Search by name, ID, or phone...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">{customers.length}</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'إجمالي الزبائن' : 'Total Customers'}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">24</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'زبون هذا الشهر' : 'This Month'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">156</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات سابقة' : 'Previous Bookings'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm opacity-90">{language === 'ar' ? 'حجوزات نشطة' : 'Active Bookings'}</div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الاسم' : 'Name'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'رقم الهوية' : 'ID Number'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الجنسية' : 'Nationality'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</th>
                <th className="px-6 py-4 text-right">{language === 'ar' ? 'تاريخ الانضمام' : 'Join Date'}</th>
                <th className="px-6 py-4 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.idNumber}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.nationality}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400" dir="ltr">{customer.phone}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.joinDate}</td>
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

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold">
                {language === 'ar' ? 'إضافة زبون جديد' : 'Add New Customer'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* ID Number */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'رقم الهوية *' : 'ID Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الجنسية *' : 'Nationality *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
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
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    {language === 'ar' ? 'الجنس' : 'Gender'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="male">{language === 'ar' ? 'ذكر' : 'Male'}</option>
                    <option value="female">{language === 'ar' ? 'أنثى' : 'Female'}</option>
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
