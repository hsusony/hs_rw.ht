const pool = require('../config/database');

class Warehouse {
  // Get all warehouses for a hotel
  static async findByHotelId(hotelId) {
    const result = await pool.query(
      `SELECT w.*, u.first_name || ' ' || u.last_name as manager_name
       FROM warehouses w
       LEFT JOIN users u ON w.manager_id = u.id
       WHERE w.hotel_id = $1
       ORDER BY w.warehouse_name ASC`,
      [hotelId]
    );
    return result.rows;
  }

  // Get warehouse by ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT w.*, u.first_name || ' ' || u.last_name as manager_name
       FROM warehouses w
       LEFT JOIN users u ON w.manager_id = u.id
       WHERE w.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Create new warehouse
  static async create(warehouseData) {
    const { hotel_id, warehouse_name, warehouse_name_en, location, manager_id, description, status } = warehouseData;
    
    const result = await pool.query(
      `INSERT INTO warehouses (hotel_id, warehouse_name, warehouse_name_en, location, manager_id, description, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [hotel_id, warehouse_name, warehouse_name_en, location, manager_id, description, status || 'active']
    );
    
    return result.rows[0];
  }

  // Update warehouse
  static async update(id, warehouseData) {
    const { warehouse_name, warehouse_name_en, location, manager_id, description, status } = warehouseData;
    
    const result = await pool.query(
      `UPDATE warehouses 
       SET warehouse_name = $1, warehouse_name_en = $2, location = $3, manager_id = $4, 
           description = $5, status = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [warehouse_name, warehouse_name_en, location, manager_id, description, status, id]
    );
    
    return result.rows[0];
  }

  // Delete warehouse
  static async delete(id) {
    await pool.query('DELETE FROM warehouses WHERE id = $1', [id]);
    return { message: 'Warehouse deleted successfully' };
  }

  // Get warehouse inventory summary
  static async getInventorySummary(warehouseId) {
    const result = await pool.query(
      `SELECT 
        COUNT(*) as total_items,
        SUM(total_value) as total_value,
        COUNT(CASE WHEN quantity <= min_quantity THEN 1 END) as low_stock_items,
        COUNT(CASE WHEN expiry_date < CURRENT_DATE THEN 1 END) as expired_items
       FROM inventory_items
       WHERE warehouse_id = $1`,
      [warehouseId]
    );
    return result.rows[0];
  }
}

module.exports = Warehouse;
