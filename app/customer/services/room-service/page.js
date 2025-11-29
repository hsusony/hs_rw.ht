'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RoomServicePage() {
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [specialInstructions, setSpecialInstructions] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const categories = [
    { id: 'all', name: 'الكل', nameEn: 'All', icon: '🍽️' },
    { id: 'breakfast', name: 'إفطار', nameEn: 'Breakfast', icon: '🍳' },
    { id: 'lunch', name: 'غداء', nameEn: 'Lunch', icon: '🍱' },
    { id: 'dinner', name: 'عشاء', nameEn: 'Dinner', icon: '🍛' },
    { id: 'drinks', name: 'مشروبات', nameEn: 'Drinks', icon: '🥤' },
    { id: 'desserts', name: 'حلويات', nameEn: 'Desserts', icon: '🍰' }
  ]

  const menuItems = [
    { id: 1, name: 'بيض مع خبز وجبن', nameEn: 'Eggs with Bread & Cheese', category: 'breakfast', price: 15000, image: '🍳', description: 'بيض طازج مع خبز محمص وجبن' },
    { id: 2, name: 'فطور عراقي', nameEn: 'Iraqi Breakfast', category: 'breakfast', price: 25000, image: '🥙', description: 'خبز مع لبن وجبن وزيتون وطماطم' },
    { id: 3, name: 'مسخن دجاج', nameEn: 'Chicken Mussakhan', category: 'lunch', price: 45000, image: '🍗', description: 'دجاج مشوي مع خبز وبصل' },
    { id: 4, name: 'كباب لحم', nameEn: 'Meat Kebab', category: 'lunch', price: 50000, image: '🍖', description: 'كباب لحم مشوي مع أرز' },
    { id: 5, name: 'سمك مسقوف', nameEn: 'Masgouf Fish', category: 'dinner', price: 60000, image: '🐟', description: 'سمك مشوي على الطريقة العراقية' },
    { id: 6, name: 'برياني دجاج', nameEn: 'Chicken Biryani', category: 'dinner', price: 40000, image: '🍛', description: 'أرز برياني مع دجاج وبهارات' },
    { id: 7, name: 'عصير طازج', nameEn: 'Fresh Juice', category: 'drinks', price: 8000, image: '🥤', description: 'عصير فواكه طازج' },
    { id: 8, name: 'شاي أو قهوة', nameEn: 'Tea or Coffee', category: 'drinks', price: 5000, image: '☕', description: 'شاي أو قهوة عراقية' },
    { id: 9, name: 'كنافة', nameEn: 'Kunafa', category: 'desserts', price: 18000, image: '🍰', description: 'كنافة بالجبن' },
    { id: 10, name: 'بقلاوة', nameEn: 'Baklava', category: 'desserts', price: 15000, image: '🥮', description: 'بقلاوة بالفستق' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? {...c, quantity: c.quantity + 1} : c))
    } else {
      setCart([...cart, {...item, quantity: 1}])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map(c => c.id === itemId ? {...c, quantity: newQuantity} : c))
    }
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      alert(language === 'ar' ? 'السلة فارغة!' : 'Cart is empty!')
      return
    }
    alert(language === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Order submitted successfully!')
    setCart([])
    setShowCart(false)
    setSpecialInstructions('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-black text-white">
                  {language === 'ar' ? '🍽️ خدمة الغرف' : '🍽️ Room Service'}
                </h1>
                <p className="text-white/80 text-sm">
                  {language === 'ar' ? 'اطلب طعامك المفضل' : 'Order your favorite food'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold"
              >
                🛒 {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">{cart.length}</span>}
              </button>
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-bold"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-lg'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {language === 'ar' ? cat.name : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 h-40 flex items-center justify-center text-6xl">
                {item.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? item.name : item.nameEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-green-600">
                    {item.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    {language === 'ar' ? '+ إضافة' : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">
                  🛒 {language === 'ar' ? 'سلة الطلبات' : 'Cart'}
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="font-bold">{language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{item.image}</div>
                          <div>
                            <h4 className="font-black text-gray-900 dark:text-white">
                              {language === 'ar' ? item.name : item.nameEn}
                            </h4>
                            <div className="text-green-600 font-bold">
                              {item.price.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white w-8 h-8 rounded-lg font-bold"
                        >
                          −
                        </button>
                        <span className="font-black text-gray-900 dark:text-white w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white w-8 h-8 rounded-lg font-bold"
                        >
                          +
                        </button>
                        <div className="flex-1 text-right">
                          <div className="text-lg font-black text-gray-900 dark:text-white">
                            {(item.price * item.quantity).toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'ملاحظات خاصة' : 'Special Instructions'}
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder={language === 'ar' ? 'أي طلبات خاصة؟' : 'Any special requests?'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'المجموع' : 'Total'}
                  </span>
                  <span className="text-3xl font-black text-green-600">
                    {getTotal().toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </span>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-black text-lg hover:shadow-xl transition-all"
                >
                  {language === 'ar' ? '✓ تأكيد الطلب' : '✓ Confirm Order'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
