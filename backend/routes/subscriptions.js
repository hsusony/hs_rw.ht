const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all subscriptions
router.get('/', auth, authorize('super_admin', 'accountant'), async (req, res) => {
  try {
    const { hotel_id, status, subscription_type, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT s.*, h.name as hotel_name, h.name_en as hotel_name_en
      FROM subscriptions s
      JOIN hotels h ON s.hotel_id = h.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND s.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND s.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (subscription_type) {
      query += ` AND s.subscription_type = $${paramCount}`;
      params.push(subscription_type);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT s.*, h.name as hotel_name, h.name_en as hotel_name_en', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY s.start_date DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      subscriptions: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'خطأ في جلب الاشتراكات / Error fetching subscriptions' });
  }
});

// Create subscription
router.post('/', auth, authorize('super_admin'), [
  body('hotel_id').isInt(),
  body('subscription_type').isIn(['monthly', 'annual']),
  body('start_date').isDate(),
  body('base_price').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      hotel_id,
      subscription_type,
      start_date,
      trial_days = 0,
      discount_percentage = 0,
      base_price
    } = req.body;

    // Calculate end date
    const startDate = new Date(start_date);
    const endDate = new Date(startDate);
    
    if (subscription_type === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Calculate final price
    const final_price = base_price - (base_price * discount_percentage / 100);

    const result = await pool.query(
      `INSERT INTO subscriptions (
        hotel_id, subscription_type, start_date, end_date, trial_days,
        discount_percentage, base_price, final_price, status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active', $9)
      RETURNING *`,
      [hotel_id, subscription_type, start_date, endDate, trial_days, discount_percentage, base_price, final_price, req.user.id]
    );

    res.status(201).json({
      message: 'تم إنشاء الاشتراك بنجاح / Subscription created successfully',
      subscription: result.rows[0]
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء الاشتراك / Error creating subscription' });
  }
});

// Update subscription status
router.put('/:id/status', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'expired', 'cancelled', 'suspended'].includes(status)) {
      return res.status(400).json({ error: 'حالة غير صالحة / Invalid status' });
    }

    const result = await pool.query(
      `UPDATE subscriptions SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الاشتراك غير موجود / Subscription not found' });
    }

    res.json({
      message: 'تم تحديث حالة الاشتراك بنجاح / Subscription status updated successfully',
      subscription: result.rows[0]
    });
  } catch (error) {
    console.error('Update subscription status error:', error);
    res.status(500).json({ error: 'خطأ في تحديث حالة الاشتراك / Error updating subscription status' });
  }
});

// Delete subscription
router.delete('/:id', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الاشتراك غير موجود / Subscription not found' });
    }

    res.json({ message: 'تم حذف الاشتراك بنجاح / Subscription deleted successfully' });
  } catch (error) {
    console.error('Delete subscription error:', error);
    res.status(500).json({ error: 'خطأ في حذف الاشتراك / Error deleting subscription' });
  }
});

module.exports = router;
