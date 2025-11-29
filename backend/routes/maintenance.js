const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all maintenance issues
router.get('/', auth, authorize('super_admin', 'hotel_manager', 'maintenance', 'receptionist'), async (req, res) => {
  try {
    const { hotel_id, status, priority, issue_type, assigned_to, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT m.*, r.room_number, r.floor, h.name as hotel_name,
             u1.first_name as assigned_first_name, u1.last_name as assigned_last_name,
             u2.first_name as reporter_first_name, u2.last_name as reporter_last_name
      FROM maintenance m
      JOIN rooms r ON m.room_id = r.id
      JOIN hotels h ON m.hotel_id = h.id
      LEFT JOIN users u1 ON m.assigned_to = u1.id
      LEFT JOIN users u2 ON m.reported_by = u2.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (hotel_id) {
      query += ` AND m.hotel_id = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }

    if (status) {
      query += ` AND m.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (priority) {
      query += ` AND m.priority = $${paramCount}`;
      params.push(priority);
      paramCount++;
    }

    if (issue_type) {
      query += ` AND m.issue_type = $${paramCount}`;
      params.push(issue_type);
      paramCount++;
    }

    if (assigned_to) {
      query += ` AND m.assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT m.*, r.room_number, r.floor, h.name as hotel_name, u1.first_name as assigned_first_name, u1.last_name as assigned_last_name, u2.first_name as reporter_first_name, u2.last_name as reporter_last_name', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY m.priority DESC, m.reported_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      issues: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get maintenance issues error:', error);
    res.status(500).json({ error: 'خطأ في جلب مشاكل الصيانة / Error fetching maintenance issues' });
  }
});

// Create maintenance issue
router.post('/', auth, async (req, res) => {
  try {
    const { hotel_id, room_id, issue_type, issue_description, priority } = req.body;

    const result = await pool.query(
      `INSERT INTO maintenance (hotel_id, room_id, issue_type, issue_description, priority, status, reported_by)
       VALUES ($1, $2, $3, $4, $5, 'reported', $6)
       RETURNING *`,
      [hotel_id, room_id, issue_type, issue_description, priority || 'normal', req.user.id]
    );

    // Update room status to maintenance
    await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['maintenance', room_id]);

    res.status(201).json({
      message: 'تم الإبلاغ عن مشكلة الصيانة بنجاح / Maintenance issue reported successfully',
      issue: result.rows[0]
    });
  } catch (error) {
    console.error('Create maintenance issue error:', error);
    res.status(500).json({ error: 'خطأ في الإبلاغ عن مشكلة الصيانة / Error reporting maintenance issue' });
  }
});

// Update maintenance status
router.put('/:id/status', auth, authorize('super_admin', 'hotel_manager', 'maintenance'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_to, cost, notes } = req.body;

    let updateFields = 'status = $1, updated_at = CURRENT_TIMESTAMP';
    const params = [status];
    let paramCount = 2;

    if (assigned_to) {
      updateFields += `, assigned_to = $${paramCount}`;
      params.push(assigned_to);
      paramCount++;
    }

    if (status === 'in_progress' && !req.body.started_at) {
      updateFields += ', started_at = CURRENT_TIMESTAMP';
    } else if (status === 'completed' && !req.body.completed_at) {
      updateFields += ', completed_at = CURRENT_TIMESTAMP';
    }

    if (cost) {
      updateFields += `, cost = $${paramCount}`;
      params.push(cost);
      paramCount++;
    }

    if (notes) {
      updateFields += `, notes = $${paramCount}`;
      params.push(notes);
      paramCount++;
    }

    params.push(id);

    const result = await pool.query(
      `UPDATE maintenance SET ${updateFields} WHERE id = $${paramCount} RETURNING *`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'مشكلة الصيانة غير موجودة / Maintenance issue not found' });
    }

    // Update room status
    if (status === 'completed') {
      await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', ['cleaning', result.rows[0].room_id]);
    }

    res.json({
      message: 'تم تحديث حالة الصيانة بنجاح / Maintenance status updated successfully',
      issue: result.rows[0]
    });
  } catch (error) {
    console.error('Update maintenance status error:', error);
    res.status(500).json({ error: 'خطأ في تحديث حالة الصيانة / Error updating maintenance status' });
  }
});

module.exports = router;
