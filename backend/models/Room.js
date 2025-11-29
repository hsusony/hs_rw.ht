const pool = require('../config/database');

class Room {
  // Find room by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM rooms WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Get all rooms with filters
  static async findAll(filters = {}) {
    const { hotel_id, status, floor, room_type, available_from, available_to, page = 1, limit = 50 } = filters;

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

    const countResult = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY floor ASC, room_number ASC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      rooms: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create room
  static async create(roomData) {
    const {
      hotel_id, room_number, floor, room_type, price_per_night,
      size, beds, capacity, amenities
    } = roomData;

    const result = await pool.query(
      `INSERT INTO rooms (
        hotel_id, room_number, floor, room_type, price_per_night,
        size, beds, capacity, amenities, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'available')
      RETURNING *`,
      [
        hotel_id, room_number, floor, room_type, price_per_night,
        size, beds, capacity, JSON.stringify(amenities)
      ]
    );

    return result.rows[0];
  }

  // Update room
  static async update(id, roomData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    const jsonFields = ['amenities'];

    for (const [key, value] of Object.entries(roomData)) {
      if (value !== undefined && key !== 'id') {
        if (jsonFields.includes(key)) {
          fields.push(`${key} = $${paramCount}`);
          values.push(JSON.stringify(value));
        } else {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
        }
        paramCount++;
      }
    }

    if (fields.length === 0) {
      return await Room.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE rooms SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // Delete room
  static async delete(id) {
    await pool.query('DELETE FROM rooms WHERE id = $1', [id]);
    return true;
  }

  // Update room status
  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE rooms SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    return result.rows[0];
  }

  // Get rooms by hotel
  static async findByHotelId(hotel_id) {
    const result = await pool.query(
      'SELECT * FROM rooms WHERE hotel_id = $1 ORDER BY floor ASC, room_number ASC',
      [hotel_id]
    );
    
    return result.rows;
  }

  // Get available rooms count
  static async getAvailableRoomsCount(hotel_id, check_in, check_out) {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM rooms
       WHERE hotel_id = $1 
       AND status = 'available'
       AND id NOT IN (
         SELECT room_id FROM bookings 
         WHERE hotel_id = $1 
         AND booking_status NOT IN ('cancelled', 'checked_out')
         AND (
           (check_in <= $2 AND check_out >= $2)
           OR (check_in <= $3 AND check_out >= $3)
           OR (check_in >= $2 AND check_out <= $3)
         )
       )`,
      [hotel_id, check_in, check_out]
    );
    
    return parseInt(result.rows[0].count);
  }
}

module.exports = Room;
