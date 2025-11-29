const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all payments (vouchers)
router.get('/vouchers', auth, authorize('super_admin', 'accountant', 'hotel_accountant'), async (req, res) => {
  try {
    const { 
      voucher_type, 
      hotel_id,
      start_date,
      end_date,
      page = 1,
      limit = 20
    } = req.query;

    let query = 'SELECT * FROM payments WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (voucher_type) {
      query += ` AND voucher_type = $${paramCount}`;
      params.push(voucher_type);
      paramCount++;
    }

    if (hotel_id) {
      query += ` AND hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (start_date) {
      query += ` AND payment_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND payment_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    // Get total count
    const countResult = await pool.query(query.replace('SELECT *', 'SELECT COUNT(*)'), params);
    const total = parseInt(countResult.rows[0].count);

    // Add pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY payment_date DESC, created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      vouchers: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get vouchers error:', error);
    res.status(500).json({ error: 'خطأ في جلب السندات / Error fetching vouchers' });
  }
});

// Create voucher (receipt, payment, or disbursement)
router.post('/vouchers', auth, authorize('super_admin', 'accountant', 'hotel_accountant'), [
  body('voucher_type').isIn(['receipt', 'payment', 'disbursement']).withMessage('نوع السند غير صحيح / Invalid voucher type'),
  body('amount').isFloat({ min: 0.01 }).withMessage('المبلغ مطلوب / Amount is required'),
  body('payment_method').notEmpty().withMessage('طريقة الدفع مطلوبة / Payment method is required'),
  body('payment_date').isDate().withMessage('تاريخ الدفع مطلوب / Payment date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      voucher_type,
      hotel_id,
      amount,
      payment_method,
      payment_date,
      beneficiary,
      description,
      reference_number
    } = req.body;

    // Generate voucher number
    const prefix = voucher_type === 'receipt' ? 'REC' : voucher_type === 'payment' ? 'PAY' : 'DIS';
    const voucher_number = `${prefix}-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO payments (
        voucher_number, voucher_type, hotel_id, amount, payment_method,
        payment_date, beneficiary, description, reference_number, created_by, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'completed')
      RETURNING *`,
      [
        voucher_number, voucher_type, hotel_id, amount, payment_method,
        payment_date, beneficiary, description, reference_number, req.user.id
      ]
    );

    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details) VALUES ($1, $2, $3, $4, $5)',
      [req.user.id, 'create_voucher', 'payment', result.rows[0].id, JSON.stringify({ voucher_type, amount })]
    );

    res.status(201).json({
      message: 'تم إنشاء السند بنجاح / Voucher created successfully',
      voucher: result.rows[0]
    });
  } catch (error) {
    console.error('Create voucher error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء السند / Error creating voucher' });
  }
});

// Get payment methods
router.get('/methods', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payment_methods WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    );

    res.json({ payment_methods: result.rows });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ error: 'خطأ في جلب طرق الدفع / Error fetching payment methods' });
  }
});

// Create payment method
router.post('/methods', auth, authorize('super_admin', 'accountant'), [
  body('name_ar').notEmpty().withMessage('الاسم بالعربية مطلوب / Arabic name is required'),
  body('name_en').notEmpty().withMessage('الاسم بالإنجليزية مطلوب / English name is required'),
  body('method_type').notEmpty().withMessage('نوع الطريقة مطلوب / Method type is required'),
  body('account_numbers').isArray({ min: 1 }).withMessage('رقم حساب واحد على الأقل مطلوب / At least one account number is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name_ar, name_en, method_type, icon, account_numbers } = req.body;

    const result = await pool.query(
      `INSERT INTO payment_methods (name_ar, name_en, method_type, icon, account_numbers, status)
       VALUES ($1, $2, $3, $4, $5, 'active')
       RETURNING *`,
      [name_ar, name_en, method_type, icon, JSON.stringify(account_numbers)]
    );

    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'create_payment_method', 'payment_method', result.rows[0].id]
    );

    res.status(201).json({
      message: 'تم إضافة طريقة الدفع بنجاح / Payment method created successfully',
      payment_method: result.rows[0]
    });
  } catch (error) {
    console.error('Create payment method error:', error);
    res.status(500).json({ error: 'خطأ في إضافة طريقة الدفع / Error creating payment method' });
  }
});

// Update payment method
router.put('/methods/:id', auth, authorize('super_admin', 'accountant'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name_ar, name_en, method_type, icon, account_numbers, status } = req.body;

    const result = await pool.query(
      `UPDATE payment_methods SET
        name_ar = COALESCE($1, name_ar),
        name_en = COALESCE($2, name_en),
        method_type = COALESCE($3, method_type),
        icon = COALESCE($4, icon),
        account_numbers = COALESCE($5, account_numbers),
        status = COALESCE($6, status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [
        name_ar, name_en, method_type, icon,
        account_numbers ? JSON.stringify(account_numbers) : null,
        status, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'طريقة الدفع غير موجودة / Payment method not found' });
    }

    res.json({
      message: 'تم تحديث طريقة الدفع بنجاح / Payment method updated successfully',
      payment_method: result.rows[0]
    });
  } catch (error) {
    console.error('Update payment method error:', error);
    res.status(500).json({ error: 'خطأ في تحديث طريقة الدفع / Error updating payment method' });
  }
});

// Get payment statistics
router.get('/stats', auth, authorize('super_admin', 'accountant', 'hotel_accountant'), async (req, res) => {
  try {
    const { hotel_id, start_date, end_date } = req.query;

    let query = `
      SELECT 
        voucher_type,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM payments
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (start_date) {
      query += ` AND payment_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND payment_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY voucher_type';

    const result = await pool.query(query, params);

    const stats = {
      receipt: { count: 0, total: 0 },
      payment: { count: 0, total: 0 },
      disbursement: { count: 0, total: 0 }
    };

    result.rows.forEach(row => {
      stats[row.voucher_type] = {
        count: parseInt(row.count),
        total: parseFloat(row.total_amount)
      };
    });

    res.json({ stats });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({ error: 'خطأ في جلب الإحصائيات / Error fetching statistics' });
  }
});

module.exports = router;
