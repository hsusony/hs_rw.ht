const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all hotels (public)
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      governorate, 
      area, 
      minRating, 
      status = 'active',
      page = 1,
      limit = 10,
      search
    } = req.query;

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

    // Get total count
    const countResult = await pool.query(query.replace('SELECT *', 'SELECT COUNT(*)'), params);
    const total = parseInt(countResult.rows[0].count);

    // Add pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY rating DESC, created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      hotels: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({ error: 'خطأ في جلب الفنادق / Error fetching hotels' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const hotelResult = await pool.query(
      'SELECT * FROM hotels WHERE id = $1',
      [id]
    );

    if (hotelResult.rows.length === 0) {
      return res.status(404).json({ error: 'الفندق غير موجود / Hotel not found' });
    }

    // Get rooms count by status
    const roomsResult = await pool.query(
      `SELECT status, COUNT(*) as count
       FROM rooms
       WHERE hotel_id = $1
       GROUP BY status`,
      [id]
    );

    const hotel = hotelResult.rows[0];
    hotel.rooms_stats = roomsResult.rows;

    res.json({ hotel });
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({ error: 'خطأ في جلب الفندق / Error fetching hotel' });
  }
});

// Create hotel (Super Admin only)
router.post('/', auth, authorize('super_admin'), [
  body('name').notEmpty().withMessage('اسم الفندق مطلوب / Hotel name is required'),
  body('category').isInt({ min: 1, max: 5 }).withMessage('التصنيف يجب أن يكون بين 1 و 5 / Category must be between 1 and 5'),
  body('total_rooms').isInt({ min: 1 }).withMessage('عدد الغرف مطلوب / Number of rooms is required'),
  body('total_floors').isInt({ min: 1 }).withMessage('عدد الطوابق مطلوب / Number of floors is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      name_en,
      category,
      main_group,
      sub_group,
      total_rooms,
      total_floors,
      governorate,
      area,
      address,
      phone,
      email,
      description,
      amenities,
      images
    } = req.body;

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
        JSON.stringify(amenities), JSON.stringify(images), req.user.id
      ]
    );

    // Log activity
    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'create_hotel', 'hotel', result.rows[0].id]
    );

    res.status(201).json({
      message: 'تم إضافة الفندق بنجاح / Hotel created successfully',
      hotel: result.rows[0]
    });
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({ error: 'خطأ في إضافة الفندق / Error creating hotel' });
  }
});

// Update hotel
router.put('/:id', auth, authorize('super_admin', 'hotel_manager'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      name_en,
      category,
      main_group,
      sub_group,
      total_rooms,
      total_floors,
      governorate,
      area,
      address,
      phone,
      email,
      description,
      amenities,
      images,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE hotels SET
        name = COALESCE($1, name),
        name_en = COALESCE($2, name_en),
        category = COALESCE($3, category),
        main_group = COALESCE($4, main_group),
        sub_group = COALESCE($5, sub_group),
        total_rooms = COALESCE($6, total_rooms),
        total_floors = COALESCE($7, total_floors),
        governorate = COALESCE($8, governorate),
        area = COALESCE($9, area),
        address = COALESCE($10, address),
        phone = COALESCE($11, phone),
        email = COALESCE($12, email),
        description = COALESCE($13, description),
        amenities = COALESCE($14, amenities),
        images = COALESCE($15, images),
        status = COALESCE($16, status),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $17
       RETURNING *`,
      [
        name, name_en, category, main_group, sub_group, total_rooms, total_floors,
        governorate, area, address, phone, email, description,
        amenities ? JSON.stringify(amenities) : null,
        images ? JSON.stringify(images) : null,
        status, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الفندق غير موجود / Hotel not found' });
    }

    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'update_hotel', 'hotel', id]
    );

    res.json({
      message: 'تم تحديث الفندق بنجاح / Hotel updated successfully',
      hotel: result.rows[0]
    });
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({ error: 'خطأ في تحديث الفندق / Error updating hotel' });
  }
});

// Delete hotel
router.delete('/:id', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM hotels WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'الفندق غير موجود / Hotel not found' });
    }

    await pool.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'delete_hotel', 'hotel', id]
    );

    res.json({ message: 'تم حذف الفندق بنجاح / Hotel deleted successfully' });
  } catch (error) {
    console.error('Delete hotel error:', error);
    res.status(500).json({ error: 'خطأ في حذف الفندق / Error deleting hotel' });
  }
});

module.exports = router;
