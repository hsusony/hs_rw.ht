const pool = require('../config/database');

class Hotel {
  // Find hotel by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM hotels WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Get all hotels with filters
  static async findAll(filters = {}) {
    const { 
      category, 
      governorate, 
      area, 
      minRating, 
      status = 'active',
      page = 1,
      limit = 10,
      search
    } = filters;

    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(parseInt(category));
      paramCount++;
    }

    if (governorate) {
      query += ` AND governorate = $${paramCount}`;
      params.push(governorate);
      paramCount++;
    }

    if (area) {
      query += ` AND area = $${paramCount}`;
      params.push(area);
      paramCount++;
    }

    if (minRating) {
      query += ` AND rating >= $${paramCount}`;
      params.push(parseFloat(minRating));
      paramCount++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR name_en ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY rating DESC, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      hotels: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create hotel
  static async create(hotelData, createdBy) {
    const {
      name, name_en, category, main_group, sub_group, total_rooms, total_floors,
      governorate, area, address, phone, email, description, amenities, images
    } = hotelData;

    const result = await pool.query(
      `INSERT INTO hotels (
        name, name_en, category, main_group, sub_group, total_rooms, total_floors,
        governorate, area, address, phone, email, description, amenities, images,
        created_by, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'active')
      RETURNING *`,
      [
        name, name_en, category, main_group, sub_group, total_rooms, total_floors,
        governorate, area, address, phone, email, description,
        JSON.stringify(amenities), JSON.stringify(images), createdBy
      ]
    );

    return result.rows[0];
  }

  // Update hotel
  static async update(id, hotelData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    const jsonFields = ['amenities', 'images'];

    for (const [key, value] of Object.entries(hotelData)) {
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
      return await Hotel.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE hotels SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // Delete hotel
  static async delete(id) {
    await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
    return true;
  }

  // Get hotel statistics
  static async getStatistics(id) {
    const hotel = await Hotel.findById(id);
    
    if (!hotel) return null;

    // Get rooms statistics
    const roomsStats = await pool.query(
      `SELECT 
        status,
        COUNT(*) as count
       FROM rooms
       WHERE hotel_id = $1
       GROUP BY status`,
      [id]
    );

    // Get bookings statistics
    const bookingsStats = await pool.query(
      `SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN booking_status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_bookings,
        SUM(CASE WHEN booking_status = 'checked_in' THEN 1 ELSE 0 END) as checked_in_bookings,
        SUM(total_price) as total_revenue
       FROM bookings
       WHERE hotel_id = $1`,
      [id]
    );

    return {
      hotel,
      rooms: roomsStats.rows,
      bookings: bookingsStats.rows[0]
    };
  }

  // Update hotel rating
  static async updateRating(id, rating) {
    const result = await pool.query(
      'UPDATE hotels SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [rating, id]
    );
    
    return result.rows[0];
  }
}

module.exports = Hotel;
