const pool = require('../config/database');

class ServiceRequest {
  // Find service request by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT sr.*, h.name as hotel_name, b.room_id,
              r.room_number, 
              u1.first_name || ' ' || u1.last_name as customer_name,
              u2.first_name || ' ' || u2.last_name as assigned_name
       FROM service_requests sr
       JOIN hotels h ON sr.hotel_id = h.id
       LEFT JOIN bookings b ON sr.booking_id = b.id
       LEFT JOIN rooms r ON b.room_id = r.id
       JOIN customers c ON sr.customer_id = c.id
       JOIN users u1 ON c.user_id = u1.id
       LEFT JOIN users u2 ON sr.assigned_to = u2.id
       WHERE sr.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Get all service requests with filters
  static async findAll(filters = {}) {
    const { hotel_id, request_type, status, priority, customer_id, page = 1, limit = 20 } = filters;

    let query = `
      SELECT sr.*, h.name as hotel_name, b.room_id,
             r.room_number, 
             u1.first_name || ' ' || u1.last_name as customer_name,
             u2.first_name || ' ' || u2.last_name as assigned_name
      FROM service_requests sr
      JOIN hotels h ON sr.hotel_id = h.id
      LEFT JOIN bookings b ON sr.booking_id = b.id
      LEFT JOIN rooms r ON b.room_id = r.id
      JOIN customers c ON sr.customer_id = c.id
      JOIN users u1 ON c.user_id = u1.id
      LEFT JOIN users u2 ON sr.assigned_to = u2.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND sr.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (request_type) {
      query += ` AND sr.request_type = $${paramCount}`;
      params.push(request_type);
      paramCount++;
    }

    if (status) {
      query += ` AND sr.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (priority) {
      query += ` AND sr.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    if (customer_id) {
      query += ` AND sr.customer_id = $${paramCount}`;
      params.push(customer_id);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT sr.*, h.name as hotel_name, b.room_id, r.room_number, u1.first_name || \' \' || u1.last_name as customer_name, u2.first_name || \' \' || u2.last_name as assigned_name', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY sr.priority DESC, sr.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      requests: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create service request
  static async create(requestData) {
    const {
      booking_id, customer_id, hotel_id, request_type, description,
      items, priority, images
    } = requestData;

    // Calculate total amount for room service
    let total_amount = 0;
    if (request_type === 'room_service' && items && items.length > 0) {
      total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const result = await pool.query(
      `INSERT INTO service_requests (
        booking_id, customer_id, hotel_id, request_type, description,
        items, priority, total_amount, images, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
      RETURNING *`,
      [
        booking_id || null,
        customer_id,
        hotel_id,
        request_type,
        description,
        items ? JSON.stringify(items) : null,
        priority || 'normal',
        total_amount,
        images ? JSON.stringify(images) : null
      ]
    );

    return result.rows[0];
  }

  // Update service request status
  static async updateStatus(id, status, assigned_to = null, response = null) {
    let query = 'UPDATE service_requests SET status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status];
    let paramCount = 2;

    if (assigned_to) {
      query += `, assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    if (response) {
      query += `, response = $${paramCount}`;
      params.push(response);
      paramCount++;
    }

    if (status === 'completed') {
      query += ', completed_at = CURRENT_TIMESTAMP';
    }

    query += ` WHERE id = $${paramCount} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);

    return result.rows[0];
  }

  // Cancel service request
  static async cancel(id) {
    const result = await pool.query(
      `UPDATE service_requests SET
        status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return result.rows[0];
  }

  // Get service requests by customer ID
  static async findByCustomerId(customerId, filters = {}) {
    const { request_type, status, page = 1, limit = 20 } = filters;

    let query = `
      SELECT sr.*, h.name as hotel_name, b.room_id,
             r.room_number, u.first_name as assigned_first_name, u.last_name as assigned_last_name
      FROM service_requests sr
      JOIN hotels h ON sr.hotel_id = h.id
      LEFT JOIN bookings b ON sr.booking_id = b.id
      LEFT JOIN rooms r ON b.room_id = r.id
      LEFT JOIN users u ON sr.assigned_to = u.id
      WHERE sr.customer_id = $1
    `;
    const params = [customerId];
    let paramCount = 2;

    if (request_type) {
      query += ` AND sr.request_type = $${paramCount}`;
      params.push(request_type);
      paramCount++;
    }

    if (status) {
      query += ` AND sr.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT sr.*, h.name as hotel_name, b.room_id, r.room_number, u.first_name as assigned_first_name, u.last_name as assigned_last_name', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY sr.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      requests: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Get service request statistics
  static async getStatistics(filters = {}) {
    const { hotel_id, start_date, end_date } = filters;

    let query = `
      SELECT 
        request_type,
        COUNT(*) as total_requests,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(total_amount) as total_amount
      FROM service_requests
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
      query += ` AND created_at >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND created_at <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY request_type';

    const result = await pool.query(query, params);

    return result.rows;
  }
}

module.exports = ServiceRequest;
