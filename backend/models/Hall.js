const pool = require('../config/database');

class Hall {
  // Get all halls for a hotel
  static async findByHotelId(hotelId) {
    const result = await pool.query(
      `SELECT * FROM halls 
       WHERE hotel_id = $1 
       ORDER BY capacity DESC`,
      [hotelId]
    );
    return result.rows;
  }

  // Get hall by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM halls WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Create new hall
  static async create(hallData) {
    const { hotel_id, hall_name, hall_name_en, capacity, price_per_hour, price_per_day, amenities, description, images, status } = hallData;
    
    const result = await pool.query(
      `INSERT INTO halls (hotel_id, hall_name, hall_name_en, capacity, price_per_hour, price_per_day, amenities, description, images, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [hotel_id, hall_name, hall_name_en, capacity, price_per_hour, price_per_day, amenities, description, images, status || 'active']
    );
    
    return result.rows[0];
  }

  // Update hall
  static async update(id, hallData) {
    const { hall_name, hall_name_en, capacity, price_per_hour, price_per_day, amenities, description, images, status } = hallData;
    
    const result = await pool.query(
      `UPDATE halls 
       SET hall_name = $1, hall_name_en = $2, capacity = $3, price_per_hour = $4, 
           price_per_day = $5, amenities = $6, description = $7, images = $8, status = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [hall_name, hall_name_en, capacity, price_per_hour, price_per_day, amenities, description, images, status, id]
    );
    
    return result.rows[0];
  }

  // Delete hall
  static async delete(id) {
    await pool.query('DELETE FROM halls WHERE id = $1', [id]);
    return { message: 'Hall deleted successfully' };
  }

  // Check availability
  static async checkAvailability(hallId, date, hours) {
    // يمكن تطويره لاحقاً للتحقق من الحجوزات
    return { available: true };
  }
}

module.exports = Hall;
