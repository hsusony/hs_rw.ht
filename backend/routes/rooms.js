const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all rooms for a hotel
router.get('/', async (req, res) => {
  try {
    const { hotel_id, status, floor, room_type, available_from, available_to } = req.query;

    let query = 'SELECT * FROM rooms WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (floor) {
      query += ` AND floor = $${paramCount}`;
      params.push(parseInt(floor));
      paramCount++;
    }

    if (room_type) {
      query += ` AND room_type = $${paramCount}`;
      params.push(room_type);
      paramCount++;
    }

    // Check availability for date range
    if (available_from && available_to && hotel_id) {
      query += ` AND id NOT IN (
        SELECT room_id FROM bookings 
        WHERE hotel_id = $1 
        AND booking_status NOT IN ('cancelled', 'checked_out')
        AND (
          (check_in <= $${paramCount} AND check_out >= $${paramCount})
          OR (check_in <= $${paramCount + 1} AND check_out >= $${paramCount + 1})
          OR (check_in >= $${paramCount} AND check_out <= $${paramCount + 1})
        )
      )`;
      params.push(available_from, available_to);
      paramCount += 2;
    }

    query += ' ORDER BY floor ASC, room_number ASC';

    const result = await pool.query(query, params);

    res.json({ rooms: result.rows });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'خطأ في جلب الغرف / Error fetching rooms' });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الغرفة غير موجودة / Room not found' });
    }

    res.json({ room: result.rows[0] });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ error: 'خطأ في جلب الغرفة / Error fetching room' });
  }
});

// Create room
router.post('/', auth, authorize('super_admin', 'hotel_manager'), async (req, res) => {
  try {
    const {
      hotel_id,
      room_number,
      floor,
      room_type,
      price_per_night,
      size,
      beds,
      capacity,
      amenities
    } = req.body;

    const result = await pool.query(
      `INSERT INTO rooms (hotel_id, room_number, floor, room_type, price_per_night, size, beds, capacity, amenities, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'available')
       RETURNING *`,
      [hotel_id, room_number, floor, room_type, price_per_night, size, beds, capacity, JSON.stringify(amenities)]
    );

    res.status(201).json({
      message: 'تم إضافة الغرفة بنجاح / Room created successfully',
      room: result.rows[0]
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ error: 'خطأ في إضافة الغرفة / Error creating room' });
  }
});

// Update room
router.put('/:id', auth, authorize('super_admin', 'hotel_manager', 'receptionist'), async (req, res) => {
  try {
    const { id } = req.params;
    const { room_number, floor, room_type, price_per_night, size, beds, capacity, amenities, status } = req.body;

    const result = await pool.query(
      `UPDATE rooms SET
        room_number = COALESCE($1, room_number),
        floor = COALESCE($2, floor),
        room_type = COALESCE($3, room_type),
        price_per_night = COALESCE($4, price_per_night),
        size = COALESCE($5, size),
        beds = COALESCE($6, beds),
        capacity = COALESCE($7, capacity),
        amenities = COALESCE($8, amenities),
        status = COALESCE($9, status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [room_number, floor, room_type, price_per_night, size, beds, capacity, amenities ? JSON.stringify(amenities) : null, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الغرفة غير موجودة / Room not found' });
    }

    res.json({
      message: 'تم تحديث الغرفة بنجاح / Room updated successfully',
      room: result.rows[0]
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'خطأ في تحديث الغرفة / Error updating room' });
  }
});

// Delete room
router.delete('/:id', auth, authorize('super_admin', 'hotel_manager'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM rooms WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الغرفة غير موجودة / Room not found' });
    }

    res.json({ message: 'تم حذف الغرفة بنجاح / Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'خطأ في حذف الغرفة / Error deleting room' });
  }
});

module.exports = router;
