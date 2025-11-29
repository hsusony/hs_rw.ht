// Utility functions for the backend

/**
 * Format currency to Iraqi Dinar
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-IQ', {
    style: 'currency',
    currency: 'IQD'
  }).format(amount);
};

/**
 * Calculate date difference in days
 */
const calculateDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Generate random string
 */
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate voucher number
 */
const generateVoucherNumber = (type) => {
  const prefix = {
    'receipt': 'REC',
    'payment': 'PAY',
    'disbursement': 'DIS'
  }[type] || 'VOC';
  
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Generate booking reference
 */
const generateBookingReference = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BK${timestamp}${random}`;
};

/**
 * Validate email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Iraqi format)
 */
const isValidPhoneNumber = (phone) => {
  // Iraqi phone: 07xx xxx xxxx or +9647xx xxx xxxx
  const phoneRegex = /^(\+964|0)?7[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Format date to YYYY-MM-DD
 */
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Format datetime to readable string
 */
const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

/**
 * Calculate percentage
 */
const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Generate pagination info
 */
const getPaginationInfo = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

/**
 * Sanitize filename
 */
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

/**
 * Check if date is in the past
 */
const isPastDate = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 */
const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

/**
 * Calculate age from date of birth
 */
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Generate random color
 */
const generateRandomColor = () => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Sleep function (for testing)
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Remove undefined/null values from object
 */
const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined)
  );
};

/**
 * Convert Arabic numerals to English
 */
const arabicToEnglishNumbers = (str) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[٠-٩]/g, (m) => arabicNumerals.indexOf(m));
};

/**
 * Calculate occupancy rate
 */
const calculateOccupancyRate = (occupiedRooms, totalRooms) => {
  if (totalRooms === 0) return 0;
  return ((occupiedRooms / totalRooms) * 100).toFixed(2);
};

/**
 * Generate receipt/invoice number
 */
const generateReceiptNumber = () => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `INV-${year}-${timestamp}`;
};

module.exports = {
  formatCurrency,
  calculateDaysDifference,
  generateRandomString,
  generateVoucherNumber,
  generateBookingReference,
  isValidEmail,
  isValidPhoneNumber,
  formatDate,
  formatDateTime,
  calculatePercentage,
  getPaginationInfo,
  sanitizeFilename,
  isPastDate,
  isFutureDate,
  calculateAge,
  generateRandomColor,
  sleep,
  cleanObject,
  arabicToEnglishNumbers,
  calculateOccupancyRate,
  generateReceiptNumber
};
