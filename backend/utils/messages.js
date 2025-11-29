// Common response messages in Arabic and English

module.exports = {
  // Success messages
  SUCCESS: {
    CREATED: 'تم الإنشاء بنجاح / Created successfully',
    UPDATED: 'تم التحديث بنجاح / Updated successfully',
    DELETED: 'تم الحذف بنجاح / Deleted successfully',
    SAVED: 'تم الحفظ بنجاح / Saved successfully',
    REGISTERED: 'تم التسجيل بنجاح / Registered successfully',
    LOGIN: 'تم تسجيل الدخول بنجاح / Login successful',
    LOGOUT: 'تم تسجيل الخروج بنجاح / Logout successful',
    PASSWORD_CHANGED: 'تم تغيير كلمة المرور بنجاح / Password changed successfully',
    EMAIL_SENT: 'تم إرسال البريد الإلكتروني بنجاح / Email sent successfully',
    UPLOADED: 'تم الرفع بنجاح / Uploaded successfully',
    BOOKING_CREATED: 'تم إنشاء الحجز بنجاح / Booking created successfully',
    BOOKING_CANCELLED: 'تم إلغاء الحجز بنجاح / Booking cancelled successfully',
    PAYMENT_COMPLETED: 'تم إتمام الدفع بنجاح / Payment completed successfully',
  },

  // Error messages
  ERROR: {
    GENERAL: 'حدث خطأ ما / Something went wrong',
    SERVER: 'خطأ في الخادم / Server error',
    DATABASE: 'خطأ في قاعدة البيانات / Database error',
    NOT_FOUND: 'غير موجود / Not found',
    UNAUTHORIZED: 'غير مصرح / Unauthorized',
    FORBIDDEN: 'ممنوع / Forbidden',
    INVALID_CREDENTIALS: 'بيانات الدخول غير صحيحة / Invalid credentials',
    INVALID_TOKEN: 'رمز غير صالح / Invalid token',
    TOKEN_EXPIRED: 'انتهت صلاحية الرمز / Token expired',
    VALIDATION_FAILED: 'فشل التحقق من البيانات / Validation failed',
    DUPLICATE_ENTRY: 'البيانات موجودة مسبقاً / Duplicate entry',
    EMAIL_EXISTS: 'البريد الإلكتروني مستخدم بالفعل / Email already exists',
    PHONE_EXISTS: 'رقم الهاتف مستخدم بالفعل / Phone number already exists',
    WEAK_PASSWORD: 'كلمة المرور ضعيفة / Weak password',
    PASSWORD_MISMATCH: 'كلمة المرور غير متطابقة / Password mismatch',
    INCORRECT_PASSWORD: 'كلمة المرور غير صحيحة / Incorrect password',
    FILE_TOO_LARGE: 'حجم الملف كبير جداً / File too large',
    INVALID_FILE_TYPE: 'نوع الملف غير مدعوم / Invalid file type',
    UPLOAD_FAILED: 'فشل رفع الملف / Upload failed',
    ROOM_NOT_AVAILABLE: 'الغرفة غير متاحة / Room not available',
    BOOKING_NOT_FOUND: 'الحجز غير موجود / Booking not found',
    PAYMENT_FAILED: 'فشل الدفع / Payment failed',
    INSUFFICIENT_PERMISSIONS: 'لا تملك الصلاحيات الكافية / Insufficient permissions',
    ACCOUNT_INACTIVE: 'الحساب غير نشط / Account inactive',
    ACCOUNT_SUSPENDED: 'الحساب موقوف / Account suspended',
    REQUIRED_FIELD: 'هذا الحقل مطلوب / This field is required',
    INVALID_EMAIL: 'البريد الإلكتروني غير صالح / Invalid email',
    INVALID_PHONE: 'رقم الهاتف غير صالح / Invalid phone number',
    INVALID_DATE: 'التاريخ غير صالح / Invalid date',
    PAST_DATE: 'التاريخ في الماضي / Date is in the past',
    INVALID_DATE_RANGE: 'نطاق التاريخ غير صالح / Invalid date range',
    TOO_MANY_REQUESTS: 'تم تجاوز عدد الطلبات المسموح به / Too many requests',
  },

  // Field names
  FIELDS: {
    EMAIL: 'البريد الإلكتروني / Email',
    PASSWORD: 'كلمة المرور / Password',
    FIRST_NAME: 'الاسم الأول / First name',
    LAST_NAME: 'اسم العائلة / Last name',
    PHONE: 'رقم الهاتف / Phone',
    ADDRESS: 'العنوان / Address',
    CITY: 'المدينة / City',
    COUNTRY: 'البلد / Country',
    DATE_OF_BIRTH: 'تاريخ الميلاد / Date of birth',
    HOTEL_NAME: 'اسم الفندق / Hotel name',
    ROOM_NUMBER: 'رقم الغرفة / Room number',
    CHECK_IN: 'تاريخ الوصول / Check-in date',
    CHECK_OUT: 'تاريخ المغادرة / Check-out date',
    GUESTS: 'عدد الضيوف / Number of guests',
    AMOUNT: 'المبلغ / Amount',
    DESCRIPTION: 'الوصف / Description',
  },

  // Validation messages
  VALIDATION: {
    REQUIRED: (field) => `${field} مطلوب / ${field} is required`,
    MIN_LENGTH: (field, length) => `${field} يجب أن يكون ${length} أحرف على الأقل / ${field} must be at least ${length} characters`,
    MAX_LENGTH: (field, length) => `${field} يجب أن لا يتجاوز ${length} حرف / ${field} must not exceed ${length} characters`,
    INVALID_FORMAT: (field) => `صيغة ${field} غير صحيحة / Invalid ${field} format`,
    MIN_VALUE: (field, value) => `${field} يجب أن يكون ${value} على الأقل / ${field} must be at least ${value}`,
    MAX_VALUE: (field, value) => `${field} يجب أن لا يتجاوز ${value} / ${field} must not exceed ${value}`,
  },

  // Status messages
  STATUS: {
    ACTIVE: 'نشط / Active',
    INACTIVE: 'غير نشط / Inactive',
    PENDING: 'قيد الانتظار / Pending',
    CONFIRMED: 'مؤكد / Confirmed',
    CANCELLED: 'ملغى / Cancelled',
    COMPLETED: 'مكتمل / Completed',
    IN_PROGRESS: 'قيد التنفيذ / In progress',
  }
};
