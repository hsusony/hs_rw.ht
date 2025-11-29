const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all housekeeping tasks
router.get('/', auth, authorize('super_admin', 'hotel_manager', 'housekeeping'), async (req, res) => {
  try {
    const { hotel_id, status, priority, assigned_to, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT h.*, r.room_number, r.floor, hot.name as hotel_name,
             u.first_name, u.last_name
      FROM housekeeping h
      JOIN rooms r ON h.room_id = r.id
      JOIN hotels hot ON h.hotel_id = hot.id
      LEFT JOIN users u ON h.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND h.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND h.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (priority) {
      query += ` AND h.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    if (assigned_to) {
      query += ` AND h.assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT h.*, r.room_number, r.floor, hot.name as hotel_name, u.first_name, u.last_name', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY h.priority DESC, h.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      tasks: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get housekeeping tasks error:', error);
    res.status(500).json({ error: 'خطأ في جلب مهام التنظيف / Error fetching housekeeping tasks' });
  }
});

// Create housekeeping task
router.post('/', auth, authorize('super_admin', 'hotel_manager', 'receptionist'), async (req, res) => {
  try {
    const { hotel_id, room_id, assigned_to, task_type, priority, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO housekeeping (hotel_id, room_id, assigned_to, task_type, priority, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [hotel_id, room_id, assigned_to, task_type, priority || 'normal', notes]
    );

    res.status(201).json({
      message: 'تم إنشاء مهمة التنظيف بنجاح / Housekeeping task created successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create housekeeping task error:', error);
    res.status(500).json({ error: 'خطأ في إنشاء مهمة التنظيف / Error creating housekeeping task' });
  }
});

// Update task status
router.put('/:id/status', auth, authorize('super_admin', 'hotel_manager', 'housekeeping'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let updateFields = 'status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status, id];

    if (status === 'in_progress' && !req.body.started_at) {
      updateFields += ', started_at = CURRENT_TIMESTAMP';
    } else if (status === 'completed' && !req.body.completed_at) {
      updateFields += ', completed_at = CURRENT_TIMESTAMP';
    }

    const result = await pool.query(
      `UPDATE housekeeping SET ${updateFields} WHERE id = $2 RETURNING *`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المهمة غير موجودة / Task not found' });
    }

    // Update room status
    if (status === 'completed') {
      await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['available', result.rows[0].room_id]);
    }

    res.json({
      message: 'تم تحديث حالة المهمة بنجاح / Task status updated successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({ error: 'خطأ في تحديث حالة المهمة / Error updating task status' });
  }
});

module.exports = router;
