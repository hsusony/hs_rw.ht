const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all users (Super Admin only)
router.get('/', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;

    let query = 'SELECT id, email, first_name, last_name, first_name_en, last_name_en, phone, role, status, created_at FROM users WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (role) {
      query += ` AND role = $${paramCount}`;
      params.push(role);
      paramCount++;
    }

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    const countResult = await pool.query(query.replace('SELECT id, email, first_name, last_name, first_name_en, last_name_en, phone, role, status, created_at', 'SELECT COUNT(*)'), params);
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      users: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'خطأ في جلب المستخدمين / Error fetching users' });
  }
});

// Create user (Super Admin only)
router.post('/', auth, authorize('super_admin'), [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('role').isIn(['super_admin', 'accountant', 'representative', 'hotel_manager', 'branch_manager', 'hotel_accountant', 'receptionist', 'housekeeping', 'maintenance', 'customer'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, first_name, last_name, first_name_en, last_name_en, phone, role } = req.body;

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل / Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active')
       RETURNING id, email, first_name, last_name, role, status`,
      [email, hashedPassword, first_name, last_name, first_name_en, last_name_en, phone, role]
    );

    res.status(201).json({
      message: 'تم إنشاء المستخدم بنجاح / User created successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء المستخدم / Error creating user' });
  }
});

// Update user
router.put('/:id', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, first_name_en, last_name_en, phone, role, status } = req.body;

    const result = await pool.query(
      `UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        first_name_en = COALESCE($3, first_name_en),
        last_name_en = COALESCE($4, last_name_en),
        phone = COALESCE($5, phone),
        role = COALESCE($6, role),
        status = COALESCE($7, status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING id, email, first_name, last_name, role, status`,
      [first_name, last_name, first_name_en, last_name_en, phone, role, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المستخدم غير موجود / User not found' });
    }

    res.json({
      message: 'تم تحديث المستخدم بنجاح / User updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'خطأ في تحديث المستخدم / Error updating user' });
  }
});

// Delete user
router.delete('/:id', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'لا يمكنك حذف حسابك الخاص / Cannot delete your own account' });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المستخدم غير موجود / User not found' });
    }

    res.json({ message: 'تم حذف المستخدم بنجاح / User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'خطأ في حذف المستخدم / Error deleting user' });
  }
});

module.exports = router;
