const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all agents
router.get('/', auth, authorize('super_admin', 'accountant'), async (req, res) => {
  try {
    const { area, agent_type, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT a.*, u.first_name, u.last_name, u.email, u.phone, u.status
      FROM agents a
      JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (area) {
      query += ` AND a.area = $${paramCount}`;
      params.push(area);
      paramCount++;
    }

    if (agent_type) {
      query += ` AND a.agent_type = $${paramCount}`;
      params.push(agent_type);
      paramCount++;
    }

    const countResult = await pool.query(
      query.replace('SELECT a.*, u.first_name, u.last_name, u.email, u.phone, u.status', 'SELECT COUNT(*)'),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY a.total_hotels_added DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({
      agents: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ error: 'خطأ في جلب المندوبين / Error fetching agents' });
  }
});

// Get agent statistics
router.get('/:id/stats', auth, authorize('super_admin', 'accountant', 'representative'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT a.*, u.first_name, u.last_name,
              COUNT(h.id) as hotel_count,
              SUM(s.final_price) as total_revenue
       FROM agents a
       JOIN users u ON a.user_id = u.id
       LEFT JOIN hotels h ON h.created_by = u.id
       LEFT JOIN subscriptions s ON s.hotel_id = h.id AND s.status = 'active'
       WHERE a.id = $1
       GROUP BY a.id, u.first_name, u.last_name`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المندوب غير موجود / Agent not found' });
    }

    res.json({ agent: result.rows[0] });
  } catch (error) {
    console.error('Get agent stats error:', error);
    res.status(500).json({ error: 'خطأ في جلب إحصائيات المندوب / Error fetching agent stats' });
  }
});

// Update agent commission
router.put('/:id/commission', auth, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { commission_rate } = req.body;

    const result = await pool.query(
      `UPDATE agents SET
        commission_rate = $1,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [commission_rate, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المندوب غير موجود / Agent not found' });
    }

    res.json({
      message: 'تم تحديث العمولة بنجاح / Commission updated successfully',
      agent: result.rows[0]
    });
  } catch (error) {
    console.error('Update commission error:', error);
    res.status(500).json({ error: 'خطأ في تحديث العمولة / Error updating commission' });
  }
});

module.exports = router;
