const pool = require('../config/database');

class Booking {
  // Find booking by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT b.*, 
              h.name as hotel_name,
              r.room_number,
              u.first_name, u.last_name, u.email, u.phone
       FROM bookings b
       JOIN hotels h ON b.hotel_id = h.id
       LEFT JOIN rooms r ON b.room_id = r.id
       JOIN customers c ON b.customer_id = c.id
       JOIN users u ON c.user_id = u.id
       WHERE b.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Get bookings by customer ID
  static async findByCustomerId(customerId, filters = {}) {
    const { status, page = 1, limit = 20 } = filters;

    let query = `
      SELECT b.*, h.name as hotel_name, h.name_en as hotel_name_en,
             r.room_number, r.room_type, r.floor
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      LEFT JOIN rooms r ON b.room_id = r.id
      WHERE b.customer_id = $1
    `;
    const params = [customerId];

    if (status) {
      query += ' AND b.booking_status = $2';
      params.push(status);
    }

    const countResult = await pool.query(
      query.replace('SELECT b.*, h.name as hotel_name, h.name_en as hotel_name_en, r.room_number, r.room_type, r.floor', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY b.check_in DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      bookings: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create booking
  static async create(bookingData, createdBy) {
    const {
      hotel_id, room_id, customer_id, check_in, check_out, guests,
      price_per_night, special_requests
    } = bookingData;

    // Calculate nights and total
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const total_nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total_price = price_per_night * total_nights;

    const result = await pool.query(
      `INSERT INTO bookings (
        hotel_id, room_id, customer_id, check_in, check_out, guests,
        total_nights, price_per_night, total_price, special_requests,
        booking_status, payment_status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', 'pending', $11)
      RETURNING *`,
      [
        hotel_id, room_id, customer_id, check_in, check_out, guests,
        total_nights, price_per_night, total_price, special_requests, createdBy
      ]
    );

    // Update room status
    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['reserved', room_id]);

    return result.rows[0];
  }

  // Update booking status
  static async updateStatus(id, booking_status, payment_status = null) {
    let query = 'UPDATE bookings SET booking_status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [booking_status];
    let paramCount = 2;

    if (payment_status) {
      query += `, payment_status = $${paramCount}`;
      params.push(payment_status);
      paramCount++;
    }

    query += ` WHERE id = $${paramCount} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) return null;

    const booking = result.rows[0];

    // Update room status based on booking status
    let roomStatus = 'available';
    
    if (booking_status === 'confirmed' || booking_status === 'pending') {
      roomStatus = 'reserved';
    } else if (booking_status === 'checked_in') {
      roomStatus = 'occupied';
    } else if (booking_status === 'checked_out' || booking_status === 'cancelled') {
      roomStatus = 'cleaning';
    }

    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', [roomStatus, booking.room_id]);

    return booking;
  }

  // Cancel booking
  static async cancel(id) {
    const result = await pool.query(
      `UPDATE bookings SET
        booking_status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) return null;

    // Update room status
    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['available', result.rows[0].room_id]);

    return result.rows[0];
  }

  // Check room availability
  static async checkAvailability(room_id, check_in, check_out) {
    const result = await pool.query(
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

    return result.rows.length === 0;
  }

  // Get booking statistics
  static async getStatistics(filters = {}) {
    const { hotel_id, start_date, end_date } = filters;

    let query = `
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN booking_status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN booking_status = 'checked_in' THEN 1 ELSE 0 END) as checked_in,
        SUM(CASE WHEN booking_status = 'checked_out' THEN 1 ELSE 0 END) as checked_out,
        SUM(CASE WHEN booking_status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN payment_status = 'paid' THEN total_price ELSE 0 END) as total_revenue,
        AVG(total_price) as avg_booking_value
      FROM bookings
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
      query += ` AND check_in >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND check_in <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    const result = await pool.query(query, params);
    return result.rows[0];
  }
}

module.exports = Booking;
