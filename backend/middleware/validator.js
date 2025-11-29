const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'خطأ في التحقق من البيانات / Validation error',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

// Custom validators
const customValidators = {
  isValidDate: (value) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  },
  
  isValidPhone: (value) => {
    // Basic phone validation - can be customized
    return /^[\d\s\-\+\(\)]+$/.test(value);
  },
  
  isValidEmail: (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  
  isStrongPassword: (value) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
  },
  
  isFutureDate: (value) => {
    const date = new Date(value);
    return date > new Date();
  },
  
  isValidCheckDates: (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkInDate < checkOutDate;
  }
};

// Validation functions for new helper tables
const validateFloor = (req, res, next) => {
  const { hotel_id, floor_number, floor_name, floor_name_en } = req.body;
  
  if (!hotel_id) {
    return res.status(400).json({ success: false, message: 'معرف الفندق مطلوب' });
  }
  if (!floor_number && floor_number !== 0) {
    return res.status(400).json({ success: false, message: 'رقم الطابق مطلوب' });
  }
  if (!floor_name) {
    return res.status(400).json({ success: false, message: 'اسم الطابق مطلوب' });
  }
  
  next();
};

const validateRoomType = (req, res, next) => {
  const { hotel_id, type_name, type_name_en, base_price } = req.body;
  
  if (!hotel_id) {
    return res.status(400).json({ success: false, message: 'معرف الفندق مطلوب' });
  }
  if (!type_name) {
    return res.status(400).json({ success: false, message: 'اسم نوع الغرفة مطلوب' });
  }
  if (!base_price || base_price < 0) {
    return res.status(400).json({ success: false, message: 'السعر الأساسي مطلوب ويجب أن يكون موجب' });
  }
  
  next();
};

const validateHall = (req, res, next) => {
  const { hotel_id, hall_name, hall_name_en, capacity } = req.body;
  
  if (!hotel_id) {
    return res.status(400).json({ success: false, message: 'معرف الفندق مطلوب' });
  }
  if (!hall_name) {
    return res.status(400).json({ success: false, message: 'اسم القاعة مطلوب' });
  }
  if (!capacity || capacity < 1) {
    return res.status(400).json({ success: false, message: 'السعة مطلوبة ويجب أن تكون أكبر من صفر' });
  }
  
  next();
};

const validateAdditionalService = (req, res, next) => {
  const { hotel_id, service_name, service_name_en, service_type, price } = req.body;
  
  if (!hotel_id) {
    return res.status(400).json({ success: false, message: 'معرف الفندق مطلوب' });
  }
  if (!service_name) {
    return res.status(400).json({ success: false, message: 'اسم الخدمة مطلوب' });
  }
  if (!service_type) {
    return res.status(400).json({ success: false, message: 'نوع الخدمة مطلوب' });
  }
  if (!price || price < 0) {
    return res.status(400).json({ success: false, message: 'السعر مطلوب ويجب أن يكون موجب' });
  }
  
  next();
};

const validateWarehouse = (req, res, next) => {
  const { hotel_id, warehouse_name, warehouse_name_en, location } = req.body;
  
  if (!hotel_id) {
    return res.status(400).json({ success: false, message: 'معرف الفندق مطلوب' });
  }
  if (!warehouse_name) {
    return res.status(400).json({ success: false, message: 'اسم المستودع مطلوب' });
  }
  if (!location) {
    return res.status(400).json({ success: false, message: 'موقع المستودع مطلوب' });
  }
  
  next();
};

const validateInventoryItem = (req, res, next) => {
  const { warehouse_id, item_name, item_name_en, item_code, unit, quantity, unit_price } = req.body;
  
  if (!warehouse_id) {
    return res.status(400).json({ success: false, message: 'معرف المستودع مطلوب' });
  }
  if (!item_name) {
    return res.status(400).json({ success: false, message: 'اسم الصنف مطلوب' });
  }
  if (!item_code) {
    return res.status(400).json({ success: false, message: 'كود الصنف مطلوب' });
  }
  if (!unit) {
    return res.status(400).json({ success: false, message: 'وحدة القياس مطلوبة' });
  }
  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ success: false, message: 'الكمية مطلوبة ويجب أن تكون موجبة' });
  }
  if (!unit_price || unit_price < 0) {
    return res.status(400).json({ success: false, message: 'سعر الوحدة مطلوب ويجب أن يكون موجب' });
  }
  
  next();
};

module.exports = {
  handleValidationErrors,
  customValidators,
  validateFloor,
  validateRoomType,
  validateHall,
  validateAdditionalService,
  validateWarehouse,
  validateInventoryItem
};
