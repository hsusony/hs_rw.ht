// Application constants

module.exports = {
  // User roles
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    ACCOUNTANT: 'accountant',
    REPRESENTATIVE: 'representative',
    HOTEL_MANAGER: 'hotel_manager',
    BRANCH_MANAGER: 'branch_manager',
    HOTEL_ACCOUNTANT: 'hotel_accountant',
    RECEPTIONIST: 'receptionist',
    HOUSEKEEPING: 'housekeeping',
    MAINTENANCE: 'maintenance',
    CUSTOMER: 'customer'
  },

  // User statuses
  USER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended'
  },

  // Room statuses
  ROOM_STATUS: {
    AVAILABLE: 'available',
    OCCUPIED: 'occupied',
    MAINTENANCE: 'maintenance',
    CLEANING: 'cleaning',
    RESERVED: 'reserved',
    UNAVAILABLE: 'unavailable'
  },

  // Booking statuses
  BOOKING_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CHECKED_IN: 'checked_in',
    CHECKED_OUT: 'checked_out',
    CANCELLED: 'cancelled'
  },

  // Payment statuses
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PARTIAL: 'partial',
    PAID: 'paid',
    REFUNDED: 'refunded'
  },

  // Voucher types
  VOUCHER_TYPES: {
    RECEIPT: 'receipt',
    PAYMENT: 'payment',
    DISBURSEMENT: 'disbursement'
  },

  // Service request types
  SERVICE_REQUEST_TYPES: {
    ROOM_SERVICE: 'room_service',
    CLEANING: 'cleaning',
    COMPLAINT: 'complaint',
    MAINTENANCE: 'maintenance'
  },

  // Request statuses
  REQUEST_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },

  // Priorities
  PRIORITY: {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent'
  },

  // Subscription types
  SUBSCRIPTION_TYPES: {
    MONTHLY: 'monthly',
    ANNUAL: 'annual'
  },

  // Subscription statuses
  SUBSCRIPTION_STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    SUSPENDED: 'suspended'
  },

  // Hotel statuses
  HOTEL_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance'
  },

  // Maintenance statuses
  MAINTENANCE_STATUS: {
    REPORTED: 'reported',
    ASSIGNED: 'assigned',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    VERIFIED: 'verified'
  },

  // Housekeeping statuses
  HOUSEKEEPING_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    VERIFIED: 'verified'
  },

  // Hotel categories (stars)
  HOTEL_CATEGORIES: [1, 2, 3, 4, 5],

  // Room types
  ROOM_TYPES: {
    SINGLE: 'single',
    DOUBLE: 'double',
    TWIN: 'twin',
    SUITE: 'suite',
    DELUXE: 'deluxe',
    FAMILY: 'family',
    PRESIDENTIAL: 'presidential'
  },

  // Iraqi Governorates
  GOVERNORATES: [
    'بغداد / Baghdad',
    'البصرة / Basra',
    'نينوى / Nineveh',
    'أربيل / Erbil',
    'السليمانية / Sulaymaniyah',
    'دهوك / Duhok',
    'الأنبار / Anbar',
    'ديالى / Diyala',
    'كركوك / Kirkuk',
    'صلاح الدين / Saladin',
    'النجف / Najaf',
    'كربلاء / Karbala',
    'القادسية / Al-Qadisiyyah',
    'بابل / Babylon',
    'واسط / Wasit',
    'ميسان / Maysan',
    'ذي قار / Dhi Qar',
    'المثنى / Al-Muthanna'
  ],

  // Payment methods
  PAYMENT_METHODS: {
    CASH: 'نقدي / Cash',
    BANK_TRANSFER: 'تحويل بنكي / Bank Transfer',
    CREDIT_CARD: 'بطاقة ائتمان / Credit Card',
    ELECTRONIC_PAYMENT: 'دفع إلكتروني / Electronic Payment',
    CHEQUE: 'شيك / Cheque'
  },

  // File size limits
  FILE_SIZE_LIMITS: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    VIDEO: 50 * 1024 * 1024 // 50MB
  },

  // Allowed file types
  ALLOWED_FILE_TYPES: {
    IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
  },

  // Date formats
  DATE_FORMATS: {
    SQL_DATE: 'YYYY-MM-DD',
    SQL_DATETIME: 'YYYY-MM-DD HH:mm:ss',
    DISPLAY_DATE: 'DD/MM/YYYY',
    DISPLAY_DATETIME: 'DD/MM/YYYY HH:mm'
  },

  // Activity log actions
  ACTIVITY_ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LOGIN: 'login',
    LOGOUT: 'logout',
    VIEW: 'view',
    DOWNLOAD: 'download',
    UPLOAD: 'upload'
  },

  // Default values
  DEFAULTS: {
    LOYALTY_POINTS: 0,
    TRIAL_DAYS: 7,
    DISCOUNT_PERCENTAGE: 0,
    COMMISSION_RATE: 10,
    RATING: 0
  },

  // Regular expressions
  REGEX: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_IQ: /^(\+964|0)?7[0-9]{9}$/,
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  },

  // Error codes
  ERROR_CODES: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
    DATABASE_ERROR: 'DATABASE_ERROR',
    SERVER_ERROR: 'SERVER_ERROR'
  }
};
