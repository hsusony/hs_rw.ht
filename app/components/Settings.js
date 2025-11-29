'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

export default function Settings() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('images')
  
  // States for Images Settings
  const [bannerHeight, setBannerHeight] = useState(3)
  const [footerHeight, setFooterHeight] = useState(3)
  const [bottomMargin, setBottomMargin] = useState('')
  const [barcodeCount, setBarcodeCount] = useState(1)
  const [logoFile, setLogoFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const [footerFile, setFooterFile] = useState(null)

  // States for Hotel Info
  const [hotelName, setHotelName] = useState('nine soft')
  const [hotelAddress, setHotelAddress] = useState('شارع الصناعة')
  const [hotelPhone, setHotelPhone] = useState('07713863214')

  // States for Printer Settings
  const [printer80Address, setPrinter80Address] = useState('127.0.0.1')
  const [printer80Port, setPrinter80Port] = useState('23400')
  const [printer80Name, setPrinter80Name] = useState('')
  
  const [printerA4Address, setPrinterA4Address] = useState('127.0.0.1')
  const [printerA4Port, setPrinterA4Port] = useState('23400')
  const [printerA4Name, setPrinterA4Name] = useState('')
  
  const [printerA5Address, setPrinterA5Address] = useState('127.0.0.1')
  const [printerA5Port, setPrinterA5Port] = useState('23400')
  const [printerA5Name, setPrinterA5Name] = useState('')

  // States for Default Printers
  const [defaultPrescriptionPrinter, setDefaultPrescriptionPrinter] = useState('بدون')
  const [defaultReportPrinter, setDefaultReportPrinter] = useState('بدون')
  const [defaultReceiptPrinter, setDefaultReceiptPrinter] = useState('بدون')

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === 'logo') setLogoFile(file)
      else if (type === 'banner') setBannerFile(file)
      else if (type === 'footer') setFooterFile(file)
    }
  }

  const handleSaveImages = () => {
    alert(t.imageSettingsSaved || 'Image settings saved successfully!')
  }

  const handleSaveHotelInfo = () => {
    alert(t.hotelInfoSaved || 'Hotel information saved successfully!')
  }

  const handleUpdatePrinter = (printerType) => {
    alert(t.printerUpdated || `Printer ${printerType} settings updated successfully!`)
  }

  const handleSavePrinterSettings = () => {
    alert(t.printerSettingsSaved || 'Printer settings saved successfully!')
  }

  const handleSaveDefaultPrinters = () => {
    alert(t.defaultPrintersSaved || 'Default printer settings saved successfully!')
  }

  const tabs = [
    { id: 'images', name: t.editImages || t.images, icon: 'fa-images' },
    { id: 'info', name: t.hotelInfo, icon: 'fa-info-circle' },
    { id: 'printers', name: t.printerSettings || t.printers, icon: 'fa-print' },
    { id: 'defaults', name: t.defaultPrinters, icon: 'fa-check-circle' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <i className="fas fa-cog ml-3 text-gray-600 dark:text-gray-400"></i>
          {t.systemSettings}
        </h2>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-b-4 border-blue-700'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon} ml-2`}></i>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Images Settings Tab */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t.imageReportSettings || 'Image and Report Settings'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.bannerHeightInReport || 'Banner Height in Report (cm)'}
                  </label>
                  <input
                    type="number"
                    value={bannerHeight}
                    onChange={(e) => setBannerHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.footerHeightInReport || 'Footer Height in Report (cm)'}
                  </label>
                  <input
                    type="number"
                    value={footerHeight}
                    onChange={(e) => setFooterHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.bottomMarginForReceipts || 'Bottom Margin for Receipts'}
                  </label>
                  <input
                    type="text"
                    value={bottomMargin}
                    onChange={(e) => setBottomMargin(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={t.enterBottomMargin || 'Enter bottom margin'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.barcodeCopiesToPrint || 'Number of Barcode Copies to Print'}
                  </label>
                  <input
                    type="number"
                    value={barcodeCount}
                    onChange={(e) => setBarcodeCount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors bg-white dark:bg-gray-800">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    <i className="fas fa-image ml-2 text-blue-600"></i>
                    {t.selectLogo || 'Select Logo'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {logoFile && (
                    <p className="mt-2 text-sm text-green-600 font-semibold">
                      <i className="fas fa-check-circle ml-1"></i>
                      {logoFile.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors bg-white dark:bg-gray-800">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    <i className="fas fa-image ml-2 text-blue-600"></i>
                    {t.selectBanner || 'Select Banner'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'banner')}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {bannerFile && (
                    <p className="mt-2 text-sm text-green-600 font-semibold">
                      <i className="fas fa-check-circle ml-1"></i>
                      {bannerFile.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors bg-white dark:bg-gray-800">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    <i className="fas fa-image ml-2 text-blue-600"></i>
                    {t.selectFooter || 'Select Footer'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'footer')}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {footerFile && (
                    <p className="mt-2 text-sm text-green-600 font-semibold">
                      <i className="fas fa-check-circle ml-1"></i>
                      {footerFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSaveImages}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center"
                >
                  <i className="fas fa-save ml-2"></i>
                  {t.save}
                </button>
              </div>
            </div>
          )}

          {/* Hotel Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t.editHotelInfo || t.hotelInfo}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.hotelName}
                  </label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.hotelAddress || t.address}
                  </label>
                  <input
                    type="text"
                    value={hotelAddress}
                    onChange={(e) => setHotelAddress(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.hotelPhoneNumber || t.phone}
                  </label>
                  <input
                    type="tel"
                    value={hotelPhone}
                    onChange={(e) => setHotelPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSaveHotelInfo}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center"
                >
                  <i className="fas fa-save ml-2"></i>
                  {t.save}
                </button>
              </div>
            </div>
          )}

          {/* Printers Settings Tab */}
          {activeTab === 'printers' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t.deviceSettings || 'Device Settings'} - {t.printerSettings || t.printers}</h3>
              
              {/* Printer 80mm */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <i className="fas fa-print ml-2 text-blue-600"></i>
                  {t.printer80mm || 'Printer 80mm'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerAddress || 'Printer Server Address'}
                    </label>
                    <input
                      type="text"
                      value={printer80Address}
                      onChange={(e) => setPrinter80Address(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerPort || 'Printer Server Port'}
                    </label>
                    <input
                      type="text"
                      value={printer80Port}
                      onChange={(e) => setPrinter80Port(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerName}
                    </label>
                    <input
                      type="text"
                      value={printer80Name}
                      onChange={(e) => setPrinter80Name(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={t.printerName}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleUpdatePrinter('80mm')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors text-sm"
                  >
                    {t.update || 'Update'}
                  </button>
                </div>
              </div>

              {/* Printer A4 */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <i className="fas fa-print ml-2 text-blue-600"></i>
                  {t.printerA4 || 'Printer A4'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerAddress || 'Printer Server Address'}
                    </label>
                    <input
                      type="text"
                      value={printerA4Address}
                      onChange={(e) => setPrinterA4Address(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerPort || 'Printer Server Port'}
                    </label>
                    <input
                      type="text"
                      value={printerA4Port}
                      onChange={(e) => setPrinterA4Port(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerName}
                    </label>
                    <input
                      type="text"
                      value={printerA4Name}
                      onChange={(e) => setPrinterA4Name(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={t.printerName}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleUpdatePrinter('A4')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors text-sm"
                  >
                    {t.update || 'Update'}
                  </button>
                </div>
              </div>

              {/* Printer A5 */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <i className="fas fa-print ml-2 text-blue-600"></i>
                  {t.printerA5 || 'Printer A5'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerAddress || 'Printer Server Address'}
                    </label>
                    <input
                      type="text"
                      value={printerA5Address}
                      onChange={(e) => setPrinterA5Address(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerServerPort || 'Printer Server Port'}
                    </label>
                    <input
                      type="text"
                      value={printerA5Port}
                      onChange={(e) => setPrinterA5Port(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      {t.printerName}
                    </label>
                    <input
                      type="text"
                      value={printerA5Name}
                      onChange={(e) => setPrinterA5Name(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={t.printerName}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleUpdatePrinter('A5')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors text-sm"
                  >
                    {t.update || 'Update'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSavePrinterSettings}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center"
                >
                  <i className="fas fa-save ml-2"></i>
                  {t.save}
                </button>
              </div>
            </div>
          )}

          {/* Default Printers Tab */}
          {activeTab === 'defaults' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t.defaultPrintersSettings || t.defaultPrinters}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.prescriptions || 'Prescriptions'}
                  </label>
                  <select
                    value={defaultPrescriptionPrinter}
                    onChange={(e) => setDefaultPrescriptionPrinter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="بدون">{t.none || 'None'}</option>
                    <option value="80mm">80mm</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.reports}
                  </label>
                  <select
                    value={defaultReportPrinter}
                    onChange={(e) => setDefaultReportPrinter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="بدون">{t.none || 'None'}</option>
                    <option value="80mm">80mm</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.receipts}
                  </label>
                  <select
                    value={defaultReceiptPrinter}
                    onChange={(e) => setDefaultReceiptPrinter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="بدون">{t.none || 'None'}</option>
                    <option value="80mm">80mm</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSaveDefaultPrinters}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center"
                >
                  <i className="fas fa-save ml-2"></i>
                  {t.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
