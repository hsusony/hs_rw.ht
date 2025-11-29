const pool = require('../config/database');

class RoomType {
  // Get all room types for a hotel
  static async findByHotelId(hotelId) {
    const result = await pool.query(
      `SELECT * FROM room_types 
       WHERE hotel_id = $1 
       ORDER BY base_price ASC`,
      [hotelId]
    );
    return result.rows;
  }

  // Get room type by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM room_types WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Create new room type
  static async create(roomTypeData) {
    const { hotel_id, type_name, type_name_en, description, base_price, max_guests, amenities, images, status } = roomTypeData;
    
    const result = await pool.query(
      `INSERT INTO room_types (hotel_id, type_name, type_name_en, description, base_price, max_guests, amenities, images, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [hotel_id, type_name, type_name_en, description, base_price, max_guests || 1, amenities, images, status || 'active']
    );
    
    return result.rows[0];
  }

  // Update room type
  static async update(id, roomTypeData) {
    const { type_name, type_name_en, description, base_price, max_guests, amenities, images, status } = roomTypeData;
    
    const result = await pool.query(
      `UPDATE room_types 
       SET type_name = $1, type_name_en = $2, description = $3, base_price = $4, 
           max_guests = $5, amenities = $6, images = $7, status = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [type_name, type_name_en, description, base_price, max_guests, amenities, images, status, id]
    );
    
    return result.rows[0];
  }

  // Delete room type
  static async delete(id) {
    await pool.query('DELETE FROM room_types WHERE id = $1', [id]);
    return { message: 'Room type deleted successfully' };
  }

  // Get room types with room count
  static async getWithRoomCount(hotelId) {
    const result = await pool.query(
      `SELECT rt.*, COUNT(r.id) as room_count
       FROM room_types rt
       LEFT JOIN rooms r ON rt.id = r.room_type_id
       WHERE rt.hotel_id = $1
       GROUP BY rt.id
       ORDER BY rt.base_price ASC`,
      [hotelId]
    );
    return result.rows;
  }
}

module.exports = RoomType;
