'use client'

import { useState } from 'react'

export default function Tasks() {
  const [showModal, setShowModal] = useState(false)
  const [taskColumns, setTaskColumns] = useState([
    {
      title: 'قيد الانتظار',
      tasks: [
        { id: 1, title: 'تنظيف غرفة 101', description: 'تنظيف شامل للغرفة', priority: 'medium', dueDate: '2025-11-16' },
        { id: 4, title: 'فحص نظام الأمن', description: 'فحص كاميرات المراقبة', priority: 'high', dueDate: '2025-11-18' },
      ]
    },
    {
      title: 'قيد التنفيذ',
      tasks: [
        { id: 2, title: 'إصلاح تكييف غرفة 203', description: 'التكييف لا يعمل', priority: 'high', dueDate: '2025-11-14' },
        { id: 5, title: 'تجهيز قاعة المؤتمرات', description: 'تجهيز القاعة لاجتماع الغد', priority: 'medium', dueDate: '2025-11-15' },
      ]
    },
    {
      title: 'مكتمل',
      tasks: [
        { id: 3, title: 'تغيير مفروشات غرفة 105', description: 'تغيير جميع المفروشات', priority: 'low', dueDate: '2025-11-12' },
      ]
    },
  ])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    column: 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate
    }
    
    const updatedColumns = [...taskColumns]
    updatedColumns[formData.column].tasks.push(newTask)
    setTaskColumns(updatedColumns)
    
    setShowModal(false)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      column: 0
    })
  }

  const handleDeleteTask = (columnIndex, taskId) => {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      const updatedColumns = [...taskColumns]
      updatedColumns[columnIndex].tasks = updatedColumns[columnIndex].tasks.filter(t => t.id !== taskId)
      setTaskColumns(updatedColumns)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">إدارة المهام</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
          <i className="fas fa-plus ml-2"></i> مهمة جديدة
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {taskColumns.map((column, index) => (
          <div key={index} className="bg-gray-50 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 flex items-center">
                <span className={`w-3 h-3 rounded-full ml-2 ${
                  index === 0 ? 'bg-gray-400' : index === 1 ? 'bg-yellow-400' : 'bg-green-400'
                }`}></span>
                {column.title}
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{task.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      <i className="far fa-clock ml-1"></i> {task.dueDate}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(index, task.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-gray-200">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-2xl font-black text-gray-900">إضافة مهمة جديدة</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    عنوان المهمة
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="مثال: تنظيف غرفة 101"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    الوصف
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    placeholder="اكتب تفاصيل المهمة..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      الأولوية
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    >
                      <option value="low">منخفض</option>
                      <option value="medium">متوسط</option>
                      <option value="high">عالي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      تاريخ الاستحقاق
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      المسؤول عن المهمة
                    </label>
                    <input
                      type="text"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                      placeholder="اسم الموظف"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      الحالة
                    </label>
                    <select
                      value={formData.column}
                      onChange={(e) => setFormData({...formData, column: parseInt(e.target.value)})}
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-bold shadow-md"
                    >
                      <option value={0}>قيد الانتظار</option>
                      <option value={1}>قيد التنفيذ</option>
                      <option value={2}>مكتمل</option>
                    </select>
                  </div>
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
                  إضافة المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
