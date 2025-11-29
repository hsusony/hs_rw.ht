const pool = require('../config/database');

class Payment {
  // Find payment by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM payments WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Find payment by voucher number
  static async findByVoucherNumber(voucherNumber) {
    const result = await pool.query(
      'SELECT * FROM payments WHERE voucher_number = $1',
      [voucherNumber]
    );
    return result.rows[0];
  }

  // Get all payments with filters
  static async findAll(filters = {}) {
    const {
      voucher_type,
      hotel_id,
      start_date,
      end_date,
      status,
      page = 1,
      limit = 20
    } = filters;

    let query = 'SELECT * FROM payments WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (voucher_type) {
      query += ` AND voucher_type = $${paramCount}`;
      params.push(voucher_type);
      paramCount++;
    }

    if (hotel_id) {
      query += ` AND hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (start_date) {
      query += ` AND payment_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND payment_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT *', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY payment_date DESC, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      payments: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create payment voucher
  static async create(paymentData, createdBy) {
    const {
      voucher_number,
      voucher_type,
      hotel_id,
      amount,
      payment_method,
      payment_date,
      beneficiary,
      description,
      reference_number
    } = paymentData;

    const result = await pool.query(
      `INSERT INTO payments (
        voucher_number, voucher_type, hotel_id, amount, payment_method,
        payment_date, beneficiary, description, reference_number,
        created_by, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'completed')
      RETURNING *`,
      [
        voucher_number,
        voucher_type,
        hotel_id,
        amount,
        payment_method,
        payment_date,
        beneficiary,
        description,
        reference_number,
        createdBy
      ]
    );

    return result.rows[0];
  }

  // Update payment status
  static async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE payments SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    return result.rows[0];
  }

  // Get payment statistics
  static async getStatistics(filters = {}) {
    const { hotel_id, start_date, end_date } = filters;

    let query = `
      SELECT 
        voucher_type,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM payments
      WHERE status = 'completed'
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (start_date) {
      query += ` AND payment_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND payment_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY voucher_type';

    const result = await pool.query(query, params);

    const stats = {
      receipt: { count: 0, total: 0 },
      payment: { count: 0, total: 0 },
      disbursement: { count: 0, total: 0 }
    };

    result.rows.forEach(row => {
      stats[row.voucher_type] = {
        count: parseInt(row.count),
        total: parseFloat(row.total_amount)
      };
    });

    // Calculate net
    stats.net = stats.receipt.total - (stats.payment.total + stats.disbursement.total);

    return stats;
  }

  // Delete payment
  static async delete(id) {
    await pool.query('DELETE FROM payments WHERE id = $1', [id]);
    return true;
  }

  // Get payments by hotel
  static async findByHotelId(hotelId, filters = {}) {
    const { page = 1, limit = 20 } = filters;

    const result = await pool.query(
      `SELECT * FROM payments 
       WHERE hotel_id = $1 
       ORDER BY payment_date DESC, created_at DESC
       LIMIT $2 OFFSET $3`,
      [hotelId, limit, (page - 1) * limit]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM payments WHERE hotel_id = $1',
      [hotelId]
    );

    return {
      payments: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }
}

module.exports = Payment;
