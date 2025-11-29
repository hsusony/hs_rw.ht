const pool = require('../config/database');

class Floor {
  // Get all floors for a hotel
  static async findByHotelId(hotelId) {
    const result = await pool.query(
      `SELECT * FROM floors 
       WHERE hotel_id = $1 
       ORDER BY floor_number ASC`,
      [hotelId]
    );
    return result.rows;
  }

  // Get floor by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM floors WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Create new floor
  static async create(floorData) {
    const { hotel_id, floor_number, floor_name, floor_name_en, total_rooms, description, status } = floorData;
    
    const result = await pool.query(
      `INSERT INTO floors (hotel_id, floor_number, floor_name, floor_name_en, total_rooms, description, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [hotel_id, floor_number, floor_name, floor_name_en, total_rooms || 0, description, status || 'active']
    );
    
    return result.rows[0];
  }

  // Update floor
  static async update(id, floorData) {
    const { floor_name, floor_name_en, total_rooms, description, status } = floorData;
    
    const result = await pool.query(
      `UPDATE floors 
       SET floor_name = $1, floor_name_en = $2, total_rooms = $3, description = $4, status = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [floor_name, floor_name_en, total_rooms, description, status, id]
    );
    
    return result.rows[0];
  }

  // Delete floor
  static async delete(id) {
    await pool.query('DELETE FROM floors WHERE id = $1', [id]);
    return { message: 'Floor deleted successfully' };
  }

  // Get floors with room count
  static async getWithRoomCount(hotelId) {
    const result = await pool.query(
      `SELECT f.*, COUNT(r.id) as actual_room_count
       FROM floors f
       LEFT JOIN rooms r ON f.id = r.floor_id
       WHERE f.hotel_id = $1
       GROUP BY f.id
       ORDER BY f.floor_number ASC`,
      [hotelId]
    );
    return result.rows;
  }
}

module.exports = Floor;
