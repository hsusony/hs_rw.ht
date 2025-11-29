const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all service requests for a customer
router.get('/my-requests', auth, async (req, res) => {
  try {
    const { request_type, status } = req.query;

    // Get customer ID
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE user_id = $1',
      [req.user.id]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({ error: 'الملف الشخصي غير موجود / Profile not found' });
    }

    const customer_id = customerResult.rows[0].id;

    let query = `
      SELECT sr.*, h.name as hotel_name, b.room_id,
             r.room_number, u.first_name as assigned_first_name, u.last_name as assigned_last_name
      FROM service_requests sr
      JOIN hotels h ON sr.hotel_id = h.id
      LEFT JOIN bookings b ON sr.booking_id = b.id
      LEFT JOIN rooms r ON b.room_id = r.id
      LEFT JOIN users u ON sr.assigned_to = u.id
      WHERE sr.customer_id = $1
    `;
    const params = [customer_id];
    let paramCount = 2;

    if (request_type) {
      query += ` AND sr.request_type = $${paramCount}`;
      params.push(request_type);
      paramCount++;
    }

    if (status) {
      query += ` AND sr.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    query += ' ORDER BY sr.created_at DESC';

    const result = await pool.query(query, params);

    res.json({ requests: result.rows });
  } catch (error) {
    console.error('Get service requests error:', error);
    res.status(500).json({ error: 'خطأ في جلب الطلبات / Error fetching requests' });
  }
});

// Get all service requests (staff)
router.get('/', auth, async (req, res) => {
  try {
    const { hotel_id, request_type, status, priority, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT sr.*, h.name as hotel_name, b.room_id,
             r.room_number, 
             u1.first_name || ' ' || u1.last_name as customer_name,
             u2.first_name || ' ' || u2.last_name as assigned_name
      FROM service_requests sr
      JOIN hotels h ON sr.hotel_id = h.id
      LEFT JOIN bookings b ON sr.booking_id = b.id
      LEFT JOIN rooms r ON b.room_id = r.id
      JOIN customers c ON sr.customer_id = c.id
      JOIN users u1 ON c.user_id = u1.id
      LEFT JOIN users u2 ON sr.assigned_to = u2.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND sr.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (request_type) {
      query += ` AND sr.request_type = $${paramCount}`;
      params.push(request_type);
      paramCount++;
    }

    if (status) {
      query += ` AND sr.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (priority) {
      query += ` AND sr.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT sr.*, h.name as hotel_name, b.room_id, r.room_number, u1.first_name || \' \' || u1.last_name as customer_name, u2.first_name || \' \' || u2.last_name as assigned_name', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY sr.priority DESC, sr.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      requests: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get service requests error:', error);
    res.status(500).json({ error: 'خطأ في جلب الطلبات / Error fetching requests' });
  }
});

// Create service request (customer)
router.post('/', auth, [
  body('booking_id').optional().isInt(),
  body('hotel_id').isInt(),
  body('request_type').isIn(['room_service', 'cleaning', 'complaint', 'maintenance']),
  body('description').notEmpty().withMessage('الوصف مطلوب / Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { booking_id, hotel_id, request_type, description, items, priority, images } = req.body;

    // Get customer ID
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE user_id = $1',
      [req.user.id]
    );

    if (customerResult.rows.length === 0) {
      return res.status(400).json({ error: 'الملف الشخصي غير موجود / Profile not found' });
    }

    const customer_id = customerResult.rows[0].id;

    // Calculate total amount for room service
    let total_amount = 0;
    if (request_type === 'room_service' && items && items.length > 0) {
      total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const result = await pool.query(
      `INSERT INTO service_requests (
        booking_id, customer_id, hotel_id, request_type, description,
        items, priority, total_amount, images, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
      RETURNING *`,
      [
        booking_id || null,
        customer_id,
        hotel_id,
        request_type,
        description,
        items ? JSON.stringify(items) : null,
        priority || 'normal',
        total_amount,
        images ? JSON.stringify(images) : null
      ]
    );

    res.status(201).json({
      message: 'تم إنشاء الطلب بنجاح / Request created successfully',
      request: result.rows[0]
    });
  } catch (error) {
    console.error('Create service request error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء الطلب / Error creating request' });
  }
});

// Update service request status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_to, response } = req.body;

    let updateFields = 'status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status];
    let paramCount = 2;

    if (assigned_to) {
      updateFields += `, assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    if (response) {
      updateFields += `, response = $${paramCount}`;
      params.push(response);
      paramCount++;
    }

    if (status === 'completed' && !req.body.completed_at) {
      updateFields += ', completed_at = CURRENT_TIMESTAMP';
    }

    params.push(id);

    const result = await pool.query(
      `UPDATE service_requests SET ${updateFields} WHERE id = $${paramCount} RETURNING *`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الطلب غير موجود / Request not found' });
    }

    res.json({
      message: 'تم تحديث حالة الطلب بنجاح / Request status updated successfully',
      request: result.rows[0]
    });
  } catch (error) {
    console.error('Update service request error:', error);
    res.status(500).json({ error: 'خطأ في تحديث الطلب / Error updating request' });
  }
});

// Get service request by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT sr.*, h.name as hotel_name, b.room_id,
              r.room_number, 
              u1.first_name || ' ' || u1.last_name as customer_name,
              u2.first_name || ' ' || u2.last_name as assigned_name
       FROM service_requests sr
       JOIN hotels h ON sr.hotel_id = h.id
       LEFT JOIN bookings b ON sr.booking_id = b.id
       LEFT JOIN rooms r ON b.room_id = r.id
       JOIN customers c ON sr.customer_id = c.id
       JOIN users u1 ON c.user_id = u1.id
       LEFT JOIN users u2 ON sr.assigned_to = u2.id
       WHERE sr.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الطلب غير موجود / Request not found' });
    }

    res.json({ request: result.rows[0] });
  } catch (error) {
    console.error('Get service request error:', error);
    res.status(500).json({ error: 'خطأ في جلب الطلب / Error fetching request' });
  }
});

// Delete/Cancel service request
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE service_requests SET
        status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الطلب غير موجود / Request not found' });
    }

    res.json({ message: 'تم إلغاء الطلب بنجاح / Request cancelled successfully' });
  } catch (error) {
    console.error('Cancel service request error:', error);
    res.status(500).json({ error: 'خطأ في إلغاء الطلب / Error cancelling request' });
  }
});

module.exports = router;
