'use client'

import { useState } from 'react'

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [customersList, setCustomersList] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '07701234567', reservations: 5, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'سارة عبدالله', email: 'sara@example.com', phone: '07707654321', reservations: 3, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'خالد أحمد', email: 'khaled@example.com', phone: '07701122334', reservations: 2, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'نورة سعيد', email: 'nora@example.com', phone: '07705566778', reservations: 4, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
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
    const newCustomer = {
      id: Math.max(...customersList.map(c => c.id)) + 1,
      ...formData,
      reservations: 0,
      image: photoPreview || 'https://randomuser.me/api/portraits/men/10.jpg'
    }
    setCustomersList([...customersList, newCustomer])
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

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
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
        <h2 className="text-2xl font-semibold">إدارة العملاء</h2>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث..."
              className="w-full px-4 py-2 border border-gray-300 rounded pl-10"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowModal(true)}>
            <i className="fas fa-plus ml-2"></i> عميل جديد
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد الإلكتروني</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الهاتف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الحجوزات</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={customer.image} alt="" />
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.reservations}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 ml-3">
                    <i className="fas fa-edit"></i> تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600 hover:text-red-900">
                    <i className="fas fa-trash"></i> حذف
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
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100 sticky top-0">
              <h3 className="text-2xl font-black text-gray-900">إضافة عميل جديد</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    رقم الهوية الوطنية
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="رقم الهوية"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="07XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    المدينة
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                  >
                    <option value="">اختر المدينة</option>
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
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="عنوان السكن"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    <i className="fas fa-id-card ml-2 text-blue-600"></i>
                    صورة المستمسك / الهوية الوطنية
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors bg-gray-50">
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
                          <img
                            src={idDocumentPreview}
                            alt="معاينة المستمسك"
                            className="max-h-48 rounded-lg shadow-lg border-2 border-blue-500"
                          />
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
                          <i className="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-3"></i>
                          <p className="text-base font-bold text-gray-700">اضغط لرفع صورة المستمسك</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG حتى 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    <i className="fas fa-user-circle ml-2 text-blue-600"></i>
                    الصورة الشخصية
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors bg-gray-50">
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
                          <img
                            src={photoPreview}
                            alt="معاينة الصورة"
                            className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-blue-500"
                          />
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
                          <i className="fas fa-camera text-5xl text-gray-400 mb-3"></i>
                          <p className="text-base font-bold text-gray-700">اضغط لرفع الصورة الشخصية</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG حتى 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    ملاحظات
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="أي ملاحظات إضافية..."
                  ></textarea>
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
                  إضافة العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
