const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Find user by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  // Create new user
  static async create(userData) {
    const { email, password, first_name, last_name, first_name_en, last_name_en, phone, role } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active')
       RETURNING id, email, first_name, last_name, role, status, created_at`,
      [email, hashedPassword, first_name, last_name, first_name_en, last_name_en, phone, role || 'customer']
    );
    
    return result.rows[0];
  }

  // Update user
  static async update(id, userData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(userData)) {
      if (value !== undefined && key !== 'id' && key !== 'password') {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) {
      return await User.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  // Update password
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, id]
    );
    
    return true;
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Delete user
  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return true;
  }

  // Get users by role
  static async findByRole(role, options = {}) {
    const { page = 1, limit = 20, status } = options;
    
    let query = 'SELECT id, email, first_name, last_name, first_name_en, last_name_en, phone, role, status, created_at FROM users WHERE role = $1';
    const params = [role];
    
    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }
    
    const countResult = await pool.query(
      query.replace('SELECT id, email, first_name, last_name, first_name_en, last_name_en, phone, role, status, created_at', 'SELECT COUNT(*)'),
      params
    );
    
    const offset = (page - 1) * limit;
    query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
    
    const result = await pool.query(query, params);
    
    return {
      users: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    };
  }

  // Update user status
  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    return result.rows[0];
  }
}

module.exports = User;
