const pool = require('../config/database');

class Subscription {
  // Find subscription by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT s.*, h.name as hotel_name, h.name_en as hotel_name_en
       FROM subscriptions s
       JOIN hotels h ON s.hotel_id = h.id
       WHERE s.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Find active subscription by hotel ID
  static async findActiveByHotelId(hotelId) {
    const result = await pool.query(
      `SELECT * FROM subscriptions 
       WHERE hotel_id = $1 
       AND status = 'active'
       AND end_date >= CURRENT_DATE
       ORDER BY end_date DESC
       LIMIT 1`,
      [hotelId]
    );
    return result.rows[0];
  }

  // Get all subscriptions with filters
  static async findAll(filters = {}) {
    const { hotel_id, status, subscription_type, page = 1, limit = 20 } = filters;

    let query = `
      SELECT s.*, h.name as hotel_name, h.name_en as hotel_name_en
      FROM subscriptions s
      JOIN hotels h ON s.hotel_id = h.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND s.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND s.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (subscription_type) {
      query += ` AND s.subscription_type = $${paramCount}`;
      params.push(subscription_type);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT s.*, h.name as hotel_name, h.name_en as hotel_name_en', 'SELECT COUNT(*)'),
      params
    );

    const offset = (page - 1) * limit;
    query += ` ORDER BY s.start_date DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, params);

    return {
      subscriptions: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Create subscription
  static async create(subscriptionData, createdBy) {
    const {
      hotel_id,
      subscription_type,
      start_date,
      trial_days = 0,
      discount_percentage = 0,
      base_price
    } = subscriptionData;

    // Calculate end date
    const startDate = new Date(start_date);
    const endDate = new Date(startDate);

    if (subscription_type === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Calculate final price
    const final_price = base_price - (base_price * discount_percentage / 100);

    const result = await pool.query(
      `INSERT INTO subscriptions (
        hotel_id, subscription_type, start_date, end_date, trial_days,
        discount_percentage, base_price, final_price, status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active', $9)
      RETURNING *`,
      [
        hotel_id,
        subscription_type,
        start_date,
        endDate,
        trial_days,
        discount_percentage,
        base_price,
        final_price,
        createdBy
      ]
    );

    return result.rows[0];
  }

  // Update subscription status
  static async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE subscriptions SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    return result.rows[0];
  }

  // Renew subscription
  static async renew(id, newData) {
    const subscription = await Subscription.findById(id);
    
    if (!subscription) return null;

    const { subscription_type, discount_percentage, base_price } = newData;

    // Calculate new start and end dates
    const startDate = new Date(subscription.end_date);
    startDate.setDate(startDate.getDate() + 1);
    
    const endDate = new Date(startDate);
    if (subscription_type === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Calculate final price
    const final_price = base_price - (base_price * discount_percentage / 100);

    const result = await pool.query(
      `INSERT INTO subscriptions (
        hotel_id, subscription_type, start_date, end_date,
        discount_percentage, base_price, final_price, status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'active', $8)
      RETURNING *`,
      [
        subscription.hotel_id,
        subscription_type,
        startDate,
        endDate,
        discount_percentage,
        base_price,
        final_price,
        subscription.created_by
      ]
    );

    // Update old subscription status
    await Subscription.updateStatus(id, 'expired');

    return result.rows[0];
  }

  // Check if subscription is expired
  static async checkExpired(hotelId) {
    const subscription = await Subscription.findActiveByHotelId(hotelId);
    
    if (!subscription) return true;

    const today = new Date();
    const endDate = new Date(subscription.end_date);

    if (today > endDate) {
      await Subscription.updateStatus(subscription.id, 'expired');
      return true;
    }

    return false;
  }

  // Get subscription statistics
  static async getStatistics() {
    const result = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(final_price) as total_revenue
      FROM subscriptions
      GROUP BY status
    `);

    const stats = {
      active: { count: 0, revenue: 0 },
      expired: { count: 0, revenue: 0 },
      cancelled: { count: 0, revenue: 0 },
      suspended: { count: 0, revenue: 0 }
    };

    result.rows.forEach(row => {
      stats[row.status] = {
        count: parseInt(row.count),
        revenue: parseFloat(row.total_revenue)
      };
    });

    return stats;
  }

  // Delete subscription
  static async delete(id) {
    await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Subscription;
