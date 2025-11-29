const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT b.*, h.name as hotel_name, h.name_en as hotel_name_en, 
             r.room_number, r.room_type, r.floor
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      LEFT JOIN rooms r ON b.room_id = r.id
      JOIN customers c ON b.customer_id = c.id
      WHERE c.user_id = $1
    `;
    const params = [req.user.id];

    if (status) {
      query += ' AND b.booking_status = $2';
      params.push(status);
    }

    query += ' ORDER BY b.created_at DESC';

    const result = await pool.query(query, params);

    res.json({ bookings: result.rows });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ error: 'خطأ في جلب الحجوزات / Error fetching bookings' });
  }
});

// Get all bookings (staff)
router.get('/', auth, async (req, res) => {
  try {
    const { hotel_id, status, customer_id, check_in_date, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT b.*, 
             h.name as hotel_name,
             r.room_number,
             u.first_name, u.last_name, u.email, u.phone
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      LEFT JOIN rooms r ON b.room_id = r.id
      JOIN customers c ON b.customer_id = c.id
      JOIN users u ON c.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND b.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND b.booking_status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (customer_id) {
      query += ` AND b.customer_id = $${paramCount}`;
      params.push(customer_id);
      paramCount++;
    }

    if (check_in_date) {
      query += ` AND b.check_in = $${paramCount}`;
      params.push(check_in_date);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT b.*, h.name as hotel_name, r.room_number, u.first_name, u.last_name, u.email, u.phone', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY b.check_in DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      bookings: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'خطأ في جلب الحجوزات / Error fetching bookings' });
  }
});

// Create booking
router.post('/', auth, [
  body('hotel_id').isInt(),
  body('room_id').isInt(),
  body('check_in').isDate(),
  body('check_out').isDate(),
  body('guests').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hotel_id, room_id, check_in, check_out, guests, special_requests } = req.body;

    // Get customer ID
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE user_id = $1',
      [req.user.id]
    );

    if (customerResult.rows.length === 0) {
      return res.status(400).json({ error: 'لم يتم العثور على ملف العميل / Customer profile not found' });
    }

    const customer_id = customerResult.rows[0].id;

    // Check room availability
    const availabilityCheck = await pool.query(
      `SELECT id FROM bookings 
       WHERE room_id = $1 
       AND booking_status NOT IN ('cancelled', 'checked_out')
       AND (
         (check_in <= $2 AND check_out >= $2)
         OR (check_in <= $3 AND check_out >= $3)
         OR (check_in >= $2 AND check_out <= $3)
       )`,
      [room_id, check_in, check_out]
    );

    if (availabilityCheck.rows.length > 0) {
      return res.status(400).json({ error: 'الغرفة غير متاحة في هذه التواريخ / Room not available for these dates' });
    }

    // Get room price
    const roomResult = await pool.query('SELECT price_per_night FROM rooms WHERE id = $1', [room_id]);
    const price_per_night = roomResult.rows[0].price_per_night;

    // Calculate nights and total
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const total_nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total_price = price_per_night * total_nights;

    // Create booking
    const result = await pool.query(
      `INSERT INTO bookings (
        hotel_id, room_id, customer_id, check_in, check_out, guests,
        total_nights, price_per_night, total_price, special_requests,
        booking_status, payment_status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', 'pending', $11)
      RETURNING *`,
      [hotel_id, room_id, customer_id, check_in, check_out, guests, total_nights, price_per_night, total_price, special_requests, req.user.id]
    );

    // Update room status
    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['reserved', room_id]);

    res.status(201).json({
      message: 'تم إنشاء الحجز بنجاح / Booking created successfully',
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء الحجز / Error creating booking' });
  }
});

// Update booking status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_status, payment_status } = req.body;

    const result = await pool.query(
      `UPDATE bookings SET
        booking_status = COALESCE($1, booking_status),
        payment_status = COALESCE($2, payment_status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [booking_status, payment_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الحجز غير موجود / Booking not found' });
    }

    // Update room status based on booking status
    const booking = result.rows[0];
    let roomStatus = 'available';
    
    if (booking_status === 'confirmed' || booking_status === 'pending') {
      roomStatus = 'reserved';
    } else if (booking_status === 'checked_in') {
      roomStatus = 'occupied';
    } else if (booking_status === 'checked_out' || booking_status === 'cancelled') {
      roomStatus = 'cleaning';
    }

    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', [roomStatus, booking.room_id]);

    res.json({
      message: 'تم تحديث حالة الحجز بنجاح / Booking status updated successfully',
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'خطأ في تحديث حالة الحجز / Error updating booking status' });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE bookings SET
        booking_status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الحجز غير موجود / Booking not found' });
    }

    // Update room status
    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['available', result.rows[0].room_id]);

    res.json({ message: 'تم إلغاء الحجز بنجاح / Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'خطأ في إلغاء الحجز / Error cancelling booking' });
  }
});

module.exports = router;
