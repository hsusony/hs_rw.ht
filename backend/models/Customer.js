const pool = require('../config/database');

class Customer {
  // Find customer by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT c.*, u.email, u.first_name, u.last_name, u.phone
       FROM customers c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Find customer by user ID
  static async findByUserId(userId) {
    const result = await pool.query(
      `SELECT c.*, u.email, u.first_name, u.last_name, u.phone
       FROM customers c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = $1`,
      [userId]
    );
    return result.rows[0];
  }

  // Create customer
  static async create(userId) {
    const result = await pool.query(
      `INSERT INTO customers (user_id, loyalty_points)
       VALUES ($1, 0)
       RETURNING *`,
      [userId]
    );
    return result.rows[0];
  }

  // Update customer profile
  static async updateProfile(userId, profileData) {
    const {
      date_of_birth,
      nationality,
      passport_number,
      id_number,
      address,
      city,
      country,
      preferences
    } = profileData;

    const result = await pool.query(
      `UPDATE customers SET
        date_of_birth = COALESCE($1, date_of_birth),
        nationality = COALESCE($2, nationality),
        passport_number = COALESCE($3, passport_number),
        id_number = COALESCE($4, id_number),
        address = COALESCE($5, address),
        city = COALESCE($6, city),
        country = COALESCE($7, country),
        preferences = COALESCE($8, preferences),
        updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $9
       RETURNING *`,
      [
        date_of_birth,
        nationality,
        passport_number,
        id_number,
        address,
        city,
        country,
        preferences ? JSON.stringify(preferences) : null,
        userId
      ]
    );

    return result.rows[0];
  }

  // Get customer loyalty points
  static async getLoyaltyPoints(userId) {
    const result = await pool.query(
      'SELECT loyalty_points FROM customers WHERE user_id = $1',
      [userId]
    );
    return result.rows[0]?.loyalty_points || 0;
  }

  // Add loyalty points
  static async addLoyaltyPoints(userId, points) {
    const result = await pool.query(
      `UPDATE customers SET
        loyalty_points = loyalty_points + $1,
        updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2
       RETURNING loyalty_points`,
      [points, userId]
    );
    return result.rows[0]?.loyalty_points;
  }

  // Deduct loyalty points
  static async deductLoyaltyPoints(userId, points) {
    const result = await pool.query(
      `UPDATE customers SET
        loyalty_points = GREATEST(loyalty_points - $1, 0),
        updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2
       RETURNING loyalty_points`,
      [points, userId]
    );
    return result.rows[0]?.loyalty_points;
  }

  // Get all customers with filters
  static async findAll(filters = {}) {
    const { page = 1, limit = 20, search } = filters;

    let query = `
      SELECT c.*, u.email, u.first_name, u.last_name, u.phone, u.status
      FROM customers c
      JOIN users u ON c.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR u.email ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT c.*, u.email, u.first_name, u.last_name, u.phone, u.status', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY c.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      customers: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Get customer statistics
  static async getStatistics(userId) {
    const customer = await Customer.findByUserId(userId);
    
    if (!customer) return null;

    // Get bookings statistics
    const bookingsStats = await pool.query(
      `SELECT 
        COUNT(*) as total_bookings,
        COUNT(CASE WHEN booking_status = 'completed' THEN 1 END) as completed_bookings,
        SUM(total_price) as total_spent
       FROM bookings
       WHERE customer_id = $1`,
      [customer.id]
    );

    // Get service requests statistics
    const serviceStats = await pool.query(
      `SELECT 
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests
       FROM service_requests
       WHERE customer_id = $1`,
      [customer.id]
    );

    return {
      customer,
      bookings: bookingsStats.rows[0],
      service_requests: serviceStats.rows[0]
    };
  }
}

module.exports = Customer;
