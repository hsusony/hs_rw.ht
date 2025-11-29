const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

// Get customer profile
router.get('/profile', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.*, c.*
       FROM users u
       JOIN customers c ON u.id = c.user_id
       WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الملف الشخصي غير موجود / Profile not found' });
    }

    const customer = result.rows[0];
    delete customer.password;

    res.json({ customer });
  } catch (error) {
    console.error('Get customer profile error:', error);
    res.status(500).json({ error: 'خطأ في جلب الملف الشخصي / Error fetching profile' });
  }
});

// Update customer profile
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      first_name, last_name, first_name_en, last_name_en, phone,
      date_of_birth, nationality, passport_number, id_number,
      address, city, country, preferences
    } = req.body;

    // Update user table
    await pool.query(
      `UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        first_name_en = COALESCE($3, first_name_en),
        last_name_en = COALESCE($4, last_name_en),
        phone = COALESCE($5, phone),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $6`,
      [first_name, last_name, first_name_en, last_name_en, phone, req.user.id]
    );

    // Update customer table
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
        date_of_birth, nationality, passport_number, id_number,
        address, city, country, preferences ? JSON.stringify(preferences) : null,
        req.user.id
      ]
    );

    res.json({
      message: 'تم تحديث الملف الشخصي بنجاح / Profile updated successfully',
      customer: result.rows[0]
    });
  } catch (error) {
    console.error('Update customer profile error:', error);
    res.status(500).json({ error: 'خطأ في تحديث الملف الشخصي / Error updating profile' });
  }
});

// Get customer loyalty points
router.get('/loyalty', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT loyalty_points FROM customers WHERE user_id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الملف الشخصي غير موجود / Profile not found' });
    }

    res.json({ loyalty_points: result.rows[0].loyalty_points });
  } catch (error) {
    console.error('Get loyalty points error:', error);
    res.status(500).json({ error: 'خطأ في جلب نقاط الولاء / Error fetching loyalty points' });
  }
});

module.exports = router;
