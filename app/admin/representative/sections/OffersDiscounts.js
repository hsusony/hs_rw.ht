'use client'
import { useState } from 'react'

export default function OffersDiscounts({ language }) {
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const [offerData, setOfferData] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    type: 'percentage', // percentage, fixed
    value: '',
    minAmount: '',
    maxDiscount: '',
    validFrom: '',
    validUntil: '',
    targetPlans: [],
    status: 'active',
    code: '',
    usageLimit: '',
    conditions: ''
  })

  const [offers, setOffers] = useState([
    {
      id: 1,
      nameAr: 'خصم الافتتاح',
      nameEn: 'Opening Discount',
      descriptionAr: 'خصم خاص للعملاء الجدد',
      descriptionEn: 'Special discount for new customers',
      type: 'percentage',
      value: 20,
      minAmount: 1000000,
      maxDiscount: 500000,
      validFrom: '2025-11-01',
      validUntil: '2025-12-31',
      targetPlans: ['annual', 'semiannual'],
      status: 'active',
      code: 'OPEN2025',
      usageLimit: 50,
      usedCount: 12,
      createdDate: '2025-11-01',
      createdBy: 'أحمد المندوب'
    },
    {
      id: 2,
      nameAr: 'عرض الباقة السنوية',
      nameEn: 'Annual Plan Offer',
      descriptionAr: 'خصم ثابت على الباقة السنوية',
      descriptionEn: 'Fixed discount on annual plan',
      type: 'fixed',
      value: 500000,
      minAmount: 3000000,
      maxDiscount: 500000,
      validFrom: '2025-11-15',
      validUntil: '2025-12-15',
      targetPlans: ['annual'],
      status: 'active',
      code: 'ANNUAL500',
      usageLimit: 100,
      usedCount: 5,
      createdDate: '2025-11-15',
      createdBy: 'أحمد المندوب'
    },
    {
      id: 3,
      nameAr: 'خصم الولاء',
      nameEn: 'Loyalty Discount',
      descriptionAr: 'خصم للعملاء الحاليين عند التجديد',
      descriptionEn: 'Discount for existing customers on renewal',
      type: 'percentage',
      value: 10,
      minAmount: 500000,
      maxDiscount: 300000,
      validFrom: '2025-10-01',
      validUntil: '2025-11-20',
      targetPlans: ['monthly', 'quarterly', 'semiannual', 'annual'],
      status: 'expired',
      code: 'LOYAL10',
      usageLimit: 200,
      usedCount: 187,
      createdDate: '2025-10-01',
      createdBy: 'سارة المندوب'
    }
  ])

  const subscriptionPlans = [
    { value: 'monthly', labelAr: 'شهري', labelEn: 'Monthly' },
    { value: 'quarterly', labelAr: 'ربع سنوي', labelEn: 'Quarterly' },
    { value: 'semiannual', labelAr: 'نصف سنوي', labelEn: 'Semi-Annual' },
    { value: 'annual', labelAr: 'سنوي', labelEn: 'Annual' }
  ]

  const handleCreateOffer = () => {
    setEditMode(false)
    setOfferData({
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      type: 'percentage',
      value: '',
      minAmount: '',
      maxDiscount: '',
      validFrom: '',
      validUntil: '',
      targetPlans: [],
      status: 'active',
      code: '',
      usageLimit: '',
      conditions: ''
    })
    setShowOfferModal(true)
  }

  const handleEditOffer = (offer) => {
    setEditMode(true)
    setSelectedOffer(offer)
    setOfferData({
      nameAr: offer.nameAr,
      nameEn: offer.nameEn,
      descriptionAr: offer.descriptionAr,
      descriptionEn: offer.descriptionEn,
      type: offer.type,
      value: offer.value,
      minAmount: offer.minAmount,
      maxDiscount: offer.maxDiscount,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil,
      targetPlans: offer.targetPlans,
      status: offer.status,
      code: offer.code,
      usageLimit: offer.usageLimit,
      conditions: offer.conditions || ''
    })
    setShowOfferModal(true)
  }

  const handleSubmitOffer = (e) => {
    e.preventDefault()
    
    if (editMode && selectedOffer) {
      setOffers(offers.map(o => {
        if (o.id === selectedOffer.id) {
          return {
            ...o,
            ...offerData,
            value: parseFloat(offerData.value),
            minAmount: parseFloat(offerData.minAmount),
            maxDiscount: parseFloat(offerData.maxDiscount),
            usageLimit: parseInt(offerData.usageLimit)
          }
        }
        return o
      }))
    } else {
      const newOffer = {
        id: offers.length + 1,
        ...offerData,
        value: parseFloat(offerData.value),
        minAmount: parseFloat(offerData.minAmount),
        maxDiscount: parseFloat(offerData.maxDiscount),
        usageLimit: parseInt(offerData.usageLimit),
        usedCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        createdBy: 'أحمد المندوب'
      }
      setOffers([newOffer, ...offers])
    }
    
    setShowOfferModal(false)
    alert(language === 'ar' 
      ? (editMode ? 'تم تحديث العرض بنجاح!' : 'تم إنشاء العرض بنجاح!')
      : (editMode ? 'Offer updated successfully!' : 'Offer created successfully!')
    )
  }

  const handleToggleStatus = (offerId) => {
    setOffers(offers.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          status: o.status === 'active' ? 'inactive' : 'active'
        }
      }
      return o
    }))
  }

  const handleDeleteOffer = (offerId) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العرض؟' : 'Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== offerId))
    }
  }

  const handleTogglePlan = (plan) => {
    setOfferData(prev => {
      const plans = prev.targetPlans.includes(plan)
        ? prev.targetPlans.filter(p => p !== plan)
        : [...prev.targetPlans, plan]
      return { ...prev, targetPlans: plans }
    })
  }

  const calculateDiscount = (offer, amount) => {
    if (offer.type === 'percentage') {
      const discount = amount * (offer.value / 100)
      return Math.min(discount, offer.maxDiscount)
    } else {
      return offer.value
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { labelAr: 'نشط', labelEn: 'Active', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' },
      inactive: { labelAr: 'غير نشط', labelEn: 'Inactive', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300' },
      expired: { labelAr: 'منتهي', labelEn: 'Expired', color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' }
    }
    
    const statusInfo = statusMap[status] || statusMap.inactive
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
        {language === 'ar' ? statusInfo.labelAr : statusInfo.labelEn}
      </span>
    )
  }

  const getUsagePercentage = (used, limit) => {
    return (used / limit) * 100
  }

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <i className="fas fa-gift text-green-600"></i>
          {language === 'ar' ? 'إدارة العروض والخصومات' : 'Manage Offers & Discounts'}
        </h2>
        <button
          onClick={handleCreateOffer}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {language === 'ar' ? 'إنشاء عرض جديد' : 'Create New Offer'}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'إجمالي العروض' : 'Total Offers'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{offers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-gift text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'عروض نشطة' : 'Active Offers'}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {offers.filter(o => o.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'مستخدمة' : 'Used'}
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {offers.reduce((sum, o) => sum + o.usedCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'ar' ? 'منتهية' : 'Expired'}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {offers.filter(o => o.status === 'expired').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="grid gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    offer.type === 'percentage' 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    <i className="fas fa-percent text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? offer.nameAr : offer.nameEn}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? offer.descriptionAr : offer.descriptionEn}
                    </p>
                  </div>
                  {getStatusBadge(offer.status)}
                </div>

                {/* Offer Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'قيمة الخصم' : 'Discount Value'}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {offer.type === 'percentage' 
                        ? `${offer.value}%`
                        : `${offer.value.toLocaleString()} ${language === 'ar' ? 'د.ع' : 'IQD'}`
                      }
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الحد الأدنى' : 'Min Amount'}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {offer.minAmount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الحد الأقصى' : 'Max Discount'}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {offer.maxDiscount.toLocaleString()} {language === 'ar' ? 'د.ع' : 'IQD'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'كود العرض' : 'Offer Code'}
                    </p>
                    <p className="text-sm font-bold text-blue-600 font-mono">
                      {offer.code}
                    </p>
                  </div>
                </div>

                {/* Validity Period */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    <i className="fas fa-calendar-check ml-1 text-green-600"></i>
                    {language === 'ar' ? 'من:' : 'From:'} {offer.validFrom}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <i className="fas fa-calendar-times ml-1 text-red-600"></i>
                    {language === 'ar' ? 'إلى:' : 'Until:'} {offer.validUntil}
                  </span>
                </div>

                {/* Target Plans */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'ar' ? 'الباقات المستهدفة:' : 'Target Plans:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {offer.targetPlans.map(plan => {
                      const planInfo = subscriptionPlans.find(p => p.value === plan)
                      return (
                        <span
                          key={plan}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-semibold"
                        >
                          {language === 'ar' ? planInfo?.labelAr : planInfo?.labelEn}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الاستخدام:' : 'Usage:'} {offer.usedCount} / {offer.usageLimit}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getUsagePercentage(offer.usedCount, offer.usageLimit).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        getUsagePercentage(offer.usedCount, offer.usageLimit) >= 80
                          ? 'bg-red-500'
                          : getUsagePercentage(offer.usedCount, offer.usageLimit) >= 50
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(offer.usedCount, offer.usageLimit)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    <i className="fas fa-calendar ml-1"></i>
                    {language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'} {offer.createdDate}
                  </span>
                  <span>
                    <i className="fas fa-user ml-1"></i>
                    {language === 'ar' ? 'بواسطة:' : 'By:'} {offer.createdBy}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggleStatus(offer.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    offer.status === 'active'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200'
                      : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200'
                  }`}
                  disabled={offer.status === 'expired'}
                >
                  <i className={`fas ${offer.status === 'active' ? 'fa-pause' : 'fa-play'}`}></i>
                  {offer.status === 'active'
                    ? (language === 'ar' ? 'إيقاف' : 'Pause')
                    : (language === 'ar' ? 'تفعيل' : 'Activate')
                  }
                </button>
                <button
                  onClick={() => handleEditOffer(offer)}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-edit"></i>
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-trash"></i>
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-gift"></i>
                {editMode 
                  ? (language === 'ar' ? 'تعديل العرض' : 'Edit Offer')
                  : (language === 'ar' ? 'إنشاء عرض جديد' : 'Create New Offer')
                }
              </h3>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Offer Names */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'معلومات العرض الأساسية' : 'Basic Offer Information'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم العرض (عربي)' : 'Offer Name (Arabic)'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={offerData.nameAr}
                      onChange={(e) => setOfferData(prev => ({ ...prev, nameAr: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'اسم العرض (إنجليزي)' : 'Offer Name (English)'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={offerData.nameEn}
                      onChange={(e) => setOfferData(prev => ({ ...prev, nameEn: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
                    </label>
                    <textarea
                      value={offerData.descriptionAr}
                      onChange={(e) => setOfferData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
                    </label>
                    <textarea
                      value={offerData.descriptionEn}
                      onChange={(e) => setOfferData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Discount Type & Value */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'تفاصيل الخصم' : 'Discount Details'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'نوع الخصم' : 'Discount Type'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOfferData(prev => ({ ...prev, type: 'percentage' }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          offerData.type === 'percentage'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <i className="fas fa-percent text-2xl text-blue-600 mb-2"></i>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {language === 'ar' ? 'نسبة مئوية' : 'Percentage'}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOfferData(prev => ({ ...prev, type: 'fixed' }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          offerData.type === 'fixed'
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <i className="fas fa-dollar-sign text-2xl text-purple-600 mb-2"></i>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {language === 'ar' ? 'مبلغ ثابت' : 'Fixed Amount'}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {offerData.type === 'percentage'
                        ? (language === 'ar' ? 'النسبة المئوية (%)' : 'Percentage (%)')
                        : (language === 'ar' ? 'المبلغ الثابت (د.ع)' : 'Fixed Amount (IQD)')
                      }
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={offerData.value}
                      onChange={(e) => setOfferData(prev => ({ ...prev, value: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={offerData.type === 'percentage' ? '20' : '500000'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الحد الأدنى للمبلغ (د.ع)' : 'Minimum Amount (IQD)'}
                    </label>
                    <input
                      type="number"
                      value={offerData.minAmount}
                      onChange={(e) => setOfferData(prev => ({ ...prev, minAmount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="1000000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'الحد الأقصى للخصم (د.ع)' : 'Maximum Discount (IQD)'}
                    </label>
                    <input
                      type="number"
                      value={offerData.maxDiscount}
                      onChange={(e) => setOfferData(prev => ({ ...prev, maxDiscount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="500000"
                    />
                  </div>
                </div>
              </div>

              {/* Validity & Code */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'صالح من' : 'Valid From'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={offerData.validFrom}
                      onChange={(e) => setOfferData(prev => ({ ...prev, validFrom: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'صالح حتى' : 'Valid Until'}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={offerData.validUntil}
                      onChange={(e) => setOfferData(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {language === 'ar' ? 'حد الاستخدام' : 'Usage Limit'}
                    </label>
                    <input
                      type="number"
                      value={offerData.usageLimit}
                      onChange={(e) => setOfferData(prev => ({ ...prev, usageLimit: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {language === 'ar' ? 'كود العرض' : 'Offer Code'}
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={offerData.code}
                    onChange={(e) => setOfferData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
                    placeholder="SPECIAL2025"
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              </div>

              {/* Target Plans */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  {language === 'ar' ? 'الباقات المستهدفة' : 'Target Plans'}
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {subscriptionPlans.map(plan => (
                    <button
                      key={plan.value}
                      type="button"
                      onClick={() => handleTogglePlan(plan.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        offerData.targetPlans.includes(plan.value)
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <i className={`fas ${
                        offerData.targetPlans.includes(plan.value) ? 'fa-check-circle text-green-600' : 'fa-circle text-gray-400'
                      } mb-2`}></i>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? plan.labelAr : plan.labelEn}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </label>
                <textarea
                  value={offerData.conditions}
                  onChange={(e) => setOfferData(prev => ({ ...prev, conditions: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={language === 'ar' ? 'أي شروط أو ملاحظات إضافية...' : 'Any additional terms or notes...'}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  <i className="fas fa-times ml-2"></i>
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="fas fa-save ml-2"></i>
                  {editMode 
                    ? (language === 'ar' ? 'تحديث العرض' : 'Update Offer')
                    : (language === 'ar' ? 'إنشاء العرض' : 'Create Offer')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
