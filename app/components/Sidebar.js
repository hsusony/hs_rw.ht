'use client'

export default function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: 'fa-tachometer-alt' },
    { id: 'hotels', name: 'الفنادق', icon: 'fa-hotel' },
    { id: 'rooms', name: 'الغرف', icon: 'fa-bed' },
    { id: 'reservations', name: 'الحجوزات', icon: 'fa-calendar-check' },
    { id: 'customers', name: 'العملاء', icon: 'fa-users' },
    { id: 'tasks', name: 'المهام', icon: 'fa-tasks' },
    { id: 'reports', name: 'التقارير', icon: 'fa-chart-bar' },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div 
        className={`fixed lg:relative h-full z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="w-64 h-full bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-2xl relative overflow-hidden">
          {/* Sparkle effect overlay */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent opacity-20 transform rotate-45 translate-x-full animate-sparkle" />
          </div>

          {/* Header */}
          <div className="p-4 border-b border-blue-700 flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center">
              <i className="fas fa-hotel ml-2 text-blue-300"></i>
              <span>NINESOFT</span>
            </h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white lg:hidden"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id)
                  if (window.innerWidth < 1024) {
                    setIsOpen(false)
                  }
                }}
                className={`sidebar-item w-full flex items-center p-3 mx-2 rounded-lg mb-2 transition-all ${
                  currentView === item.id
                    ? 'bg-white bg-opacity-25 shadow-lg'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                <i className={`fas ${item.icon} ml-2 text-blue-300`}></i>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
              />
              <div className="mr-3">
                <p className="text-sm font-medium">مدير النظام</p>
                <p className="text-xs text-blue-300">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
