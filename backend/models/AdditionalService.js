const pool = require('../config/database');

class AdditionalService {
  // Get all services for a hotel
  static async findByHotelId(hotelId, filters = {}) {
    let query = 'SELECT * FROM additional_services WHERE hotel_id = $1';
    const params = [hotelId];
    
    if (filters.service_type) {
      params.push(filters.service_type);
      query += ` AND service_type = $${params.length}`;
    }
    
    if (filters.status) {
      params.push(filters.status);
      query += ` AND status = $${params.length}`;
    }
    
    query += ' ORDER BY service_name ASC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }

  // Get service by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM additional_services WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Create new service
  static async create(serviceData) {
    const { hotel_id, service_name, service_name_en, service_type, price, description, icon, status } = serviceData;
    
    const result = await pool.query(
      `INSERT INTO additional_services (hotel_id, service_name, service_name_en, service_type, price, description, icon, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [hotel_id, service_name, service_name_en, service_type, price, description, icon, status || 'active']
    );
    
    return result.rows[0];
  }

  // Update service
  static async update(id, serviceData) {
    const { service_name, service_name_en, service_type, price, description, icon, status } = serviceData;
    
    const result = await pool.query(
      `UPDATE additional_services 
       SET service_name = $1, service_name_en = $2, service_type = $3, price = $4, 
           description = $5, icon = $6, status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [service_name, service_name_en, service_type, price, description, icon, status, id]
    );
    
    return result.rows[0];
  }

  // Delete service
  static async delete(id) {
    await pool.query('DELETE FROM additional_services WHERE id = $1', [id]);
    return { message: 'Service deleted successfully' };
  }

  // Get services by type
  static async findByType(hotelId, serviceType) {
    const result = await pool.query(
      `SELECT * FROM additional_services 
       WHERE hotel_id = $1 AND service_type = $2 AND status = 'active'
       ORDER BY price ASC`,
      [hotelId, serviceType]
    );
    return result.rows;
  }
}

module.exports = AdditionalService;
