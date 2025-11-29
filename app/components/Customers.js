'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Customers() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [customersList, setCustomersList] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '07701234567', reservations: 5 },
    { id: 2, name: 'سارة عبدالله', email: 'sara@example.com', phone: '07709876543', reservations: 3 },
    { id: 3, name: 'خالد أحمد', email: 'khaled@example.com', phone: '07701122334', reservations: 8 },
    { id: 4, name: 'نورة سعيد', email: 'nora@example.com', phone: '07705566778', reservations: 2 }
  ])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    nationalId: '',
    notes: '',
    idDocument: null,
    photo: null
  })
  const [idDocumentPreview, setIdDocumentPreview] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'idDocument') {
          setIdDocumentPreview(reader.result)
          setFormData({...formData, idDocument: file})
        } else if (type === 'photo') {
          setPhotoPreview(reader.result)
          setFormData({...formData, photo: file})
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editMode) {
      setCustomersList(customersList.map(customer => 
        customer.id === editingId ? {
          ...customer,
          ...formData,
          image: photoPreview || customer.image
        } : customer
      ))
      setEditMode(false)
      setEditingId(null)
    } else {
      const newCustomer = {
        id: Math.max(...customersList.map(c => c.id)) + 1,
        ...formData,
        reservations: 0,
        image: photoPreview || 'https://randomuser.me/api/portraits/men/10.jpg'
      }
      setCustomersList([...customersList, newCustomer])
    }
    setShowModal(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      nationalId: '',
      notes: '',
      idDocument: null,
      photo: null
    })
    setIdDocumentPreview(null)
    setPhotoPreview(null)
  }

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || '',
      city: customer.city || '',
      nationalId: customer.nationalId || '',
      notes: customer.notes || '',
      idDocument: customer.idDocument || null,
      photo: customer.photo || null
    })
    setPhotoPreview(customer.image)
    setEditingId(customer.id)
    setEditMode(true)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العميل؟' : 'Are you sure you want to delete this customer?')) {
      setCustomersList(customersList.filter(c => c.id !== id))
    }
  }

  const filteredCustomers = customersList.filter(customer =>
    customer.name.includes(searchTerm) || 
    customer.email.includes(searchTerm) || 
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold">{t.customerManagement}</h2>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowModal(true)}>
            <i className="fas fa-plus ml-2"></i> {language === 'ar' ? 'عميل جديد' : 'New Customer'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t.name}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t.email}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t.phone}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{language === 'ar' ? 'عدد الحجوزات' : 'Reservations'}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image src={customer.image} alt="Customer" width={40} height={40} className="object-cover" unoptimized />
                    </div>
                    <div className="mr-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{customer.reservations}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleEdit(customer)}
                    className="text-blue-600 hover:text-blue-900 ml-3 font-bold"
                  >
                    <i className="fas fa-edit"></i> {t.edit}
                  </button>
                  <button 
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600 hover:text-red-900">
                    <i className="fas fa-trash"></i> {t.delete}
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 sticky top-0">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{editMode ? t.editCustomer : t.addNewCustomer}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={t.enterName}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.nationalId}
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'رقم الهوية' : 'ID Number'}
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="07XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.city}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">{language === 'ar' ? 'اختر المدينة' : 'Select City'}</option>
                    <option value="بغداد">بغداد</option>
                    <option value="البصرة">البصرة</option>
                    <option value="الموصل">الموصل</option>
                    <option value="أربيل">أربيل</option>
                    <option value="كربلاء">كربلاء</option>
                    <option value="النجف">النجف</option>
                    <option value="السليمانية">السليمانية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.address}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'عنوان السكن' : 'Residential address'}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    <i className="fas fa-id-card ml-2 text-blue-600 dark:text-blue-400"></i>
                    {language === 'ar' ? 'صورة المستمسك / الهوية الوطنية' : 'ID Document / National ID Photo'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'idDocument')}
                      className="hidden"
                      id="idDocument"
                    />
                    <label
                      htmlFor="idDocument"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {idDocumentPreview ? (
                        <div className="relative">
                          <div className="max-h-48 rounded-lg shadow-lg border-2 border-blue-500 overflow-hidden relative">
                            <Image
                              src={idDocumentPreview}
                              alt={language === 'ar' ? 'معاينة المستمسك' : 'ID Preview'}
                              width={300}
                              height={192}
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setIdDocumentPreview(null)
                              setFormData({...formData, idDocument: null})
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-cloud-upload-alt text-5xl text-gray-400 dark:text-gray-500 mb-3"></i>
                          <p className="text-base font-bold text-gray-700 dark:text-gray-300">{language === 'ar' ? 'اضغط لرفع صورة المستمسك' : 'Click to upload ID document'}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{language === 'ar' ? 'PNG, JPG حتى 10MB' : 'PNG, JPG up to 10MB'}</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    <i className="fas fa-user-circle ml-2 text-blue-600 dark:text-blue-400"></i>
                    {language === 'ar' ? 'الصورة الشخصية' : 'Personal Photo'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'photo')}
                      className="hidden"
                      id="photo"
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {photoPreview ? (
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-blue-500 relative">
                            <Image
                              src={photoPreview}
                              alt={language === 'ar' ? 'معاينة الصورة' : 'Photo Preview'}
                              width={128}
                              height={128}
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setPhotoPreview(null)
                              setFormData({...formData, photo: null})
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-camera text-5xl text-gray-400 dark:text-gray-500 mb-3"></i>
                          <p className="text-base font-bold text-gray-700 dark:text-gray-300">{language === 'ar' ? 'اضغط لرفع الصورة الشخصية' : 'Click to upload personal photo'}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{language === 'ar' ? 'PNG, JPG حتى 10MB' : 'PNG, JPG up to 10MB'}</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 dark:text-white mb-3">
                    {t.notes}
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                  ></textarea>
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
                  {editMode ? t.saveChanges : (language === 'ar' ? 'إضافة العميل' : 'Add Customer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
