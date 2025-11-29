const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get dashboard statistics
router.get('/dashboard', auth, authorize('super_admin', 'accountant', 'hotel_manager'), async (req, res) => {
  try {
    const { hotel_id, start_date, end_date } = req.query;

    let hotelFilter = hotel_id ? 'WHERE hotel_id = $1' : '';
    const params = hotel_id ? [hotel_id] : [];

    // Total hotels
    const hotelsResult = await pool.query(`SELECT COUNT(*) as total FROM hotels ${hotelFilter}`, params);

    // Total bookings
    const bookingsResult = await pool.query(`SELECT COUNT(*) as total FROM bookings ${hotelFilter}`, params);

    // Revenue statistics
    const revenueResult = await pool.query(
      `SELECT 
        SUM(CASE WHEN payment_status = 'paid' THEN total_price ELSE 0 END) as total_revenue,
        SUM(CASE WHEN payment_status = 'pending' THEN total_price ELSE 0 END) as pending_revenue
       FROM bookings ${hotelFilter}`,
      params
    );

    // Occupancy statistics
    const occupancyResult = await pool.query(
      `SELECT 
        COUNT(CASE WHEN status = 'available' THEN 1 END) as available_rooms,
        COUNT(CASE WHEN status = 'occupied' THEN 1 END) as occupied_rooms,
        COUNT(*) as total_rooms
       FROM rooms ${hotelFilter}`,
      params
    );

    // Maintenance statistics
    const maintenanceResult = await pool.query(
      `SELECT 
        COUNT(CASE WHEN status IN ('reported', 'assigned', 'in_progress') THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
       FROM maintenance ${hotelFilter}`,
      params
    );

    res.json({
      hotels: parseInt(hotelsResult.rows[0].total),
      bookings: parseInt(bookingsResult.rows[0].total),
      revenue: {
        total: parseFloat(revenueResult.rows[0].total_revenue || 0),
        pending: parseFloat(revenueResult.rows[0].pending_revenue || 0)
      },
      occupancy: {
        available: parseInt(occupancyResult.rows[0].available_rooms),
        occupied: parseInt(occupancyResult.rows[0].occupied_rooms),
        total: parseInt(occupancyResult.rows[0].total_rooms),
        rate: occupancyResult.rows[0].total_rooms > 0 
          ? (parseInt(occupancyResult.rows[0].occupied_rooms) / parseInt(occupancyResult.rows[0].total_rooms) * 100).toFixed(2)
          : 0
      },
      maintenance: {
        pending: parseInt(maintenanceResult.rows[0].pending),
        completed: parseInt(maintenanceResult.rows[0].completed)
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'خطأ في جلب الإحصائيات / Error fetching statistics' });
  }
});

// Get bookings report
router.get('/bookings', auth, authorize('super_admin', 'accountant', 'hotel_manager'), async (req, res) => {
  try {
    const { hotel_id, start_date, end_date, group_by = 'day' } = req.query;

    let query = `
      SELECT 
        DATE_TRUNC('${group_by}', check_in) as period,
        COUNT(*) as total_bookings,
        SUM(total_price) as total_revenue,
        AVG(total_price) as avg_booking_value
      FROM bookings
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
      query += ` AND check_in >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND check_in <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY period ORDER BY period DESC';

    const result = await pool.query(query, params);

    res.json({ report: result.rows });
  } catch (error) {
    console.error('Get bookings report error:', error);
    res.status(500).json({ error: 'خطأ في جلب تقرير الحجوزات / Error fetching bookings report' });
  }
});

// Get revenue report
router.get('/revenue', auth, authorize('super_admin', 'accountant'), async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let query = `
      SELECT 
        h.id as hotel_id,
        h.name as hotel_name,
        COUNT(b.id) as total_bookings,
        SUM(b.total_price) as total_revenue,
        SUM(CASE WHEN b.payment_status = 'paid' THEN b.total_price ELSE 0 END) as paid_revenue,
        SUM(CASE WHEN b.payment_status = 'pending' THEN b.total_price ELSE 0 END) as pending_revenue
      FROM hotels h
      LEFT JOIN bookings b ON h.id = b.hotel_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (start_date) {
      query += ` AND b.check_in >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND b.check_in <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY h.id, h.name ORDER BY total_revenue DESC';

    const result = await pool.query(query, params);

    res.json({ report: result.rows });
  } catch (error) {
    console.error('Get revenue report error:', error);
    res.status(500).json({ error: 'خطأ في جلب تقرير الإيرادات / Error fetching revenue report' });
  }
});

// Get occupancy report
router.get('/occupancy', auth, authorize('super_admin', 'hotel_manager'), async (req, res) => {
  try {
    const { hotel_id } = req.query;

    let query = `
      SELECT 
        h.id as hotel_id,
        h.name as hotel_name,
        h.total_rooms,
        COUNT(CASE WHEN r.status = 'available' THEN 1 END) as available_rooms,
        COUNT(CASE WHEN r.status = 'occupied' THEN 1 END) as occupied_rooms,
        COUNT(CASE WHEN r.status = 'maintenance' THEN 1 END) as maintenance_rooms,
        COUNT(CASE WHEN r.status = 'cleaning' THEN 1 END) as cleaning_rooms
      FROM hotels h
      LEFT JOIN rooms r ON h.id = r.hotel_id
      WHERE 1=1
    `;
    const params = [];

    if (hotel_id) {
      query += ' AND h.id = $1';
      params.push(hotel_id);
    }

    query += ' GROUP BY h.id, h.name, h.total_rooms ORDER BY h.name';

    const result = await pool.query(query, params);

    // Calculate occupancy rate
    const report = result.rows.map(row => ({
      ...row,
      occupancy_rate: row.total_rooms > 0 
        ? ((parseInt(row.occupied_rooms) / parseInt(row.total_rooms)) * 100).toFixed(2)
        : 0
    }));

    res.json({ report });
  } catch (error) {
    console.error('Get occupancy report error:', error);
    res.status(500).json({ error: 'خطأ في جلب تقرير الإشغال / Error fetching occupancy report' });
  }
});

module.exports = router;
