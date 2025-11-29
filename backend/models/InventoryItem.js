const pool = require('../config/database');

class InventoryItem {
  // Get all items in a warehouse
  static async findByWarehouseId(warehouseId, filters = {}) {
    let query = 'SELECT * FROM inventory_items WHERE warehouse_id = $1';
    const params = [warehouseId];
    
    if (filters.category) {
      params.push(filters.category);
      query += ` AND category = $${params.length}`;
    }
    
    if (filters.low_stock) {
      query += ' AND quantity <= min_quantity';
    }
    
    if (filters.expired) {
      query += ' AND expiry_date < CURRENT_DATE';
    }
    
    query += ' ORDER BY item_name ASC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }

  // Get item by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM inventory_items WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Get item by code
  static async findByCode(itemCode) {
    const result = await pool.query(
      'SELECT * FROM inventory_items WHERE item_code = $1',
      [itemCode]
    );
    return result.rows[0];
  }

  // Create new item
  static async create(itemData) {
    const { 
      warehouse_id, item_name, item_name_en, item_code, category, unit, 
      quantity, min_quantity, max_quantity, unit_price, supplier, 
      last_purchase_date, expiry_date, notes 
    } = itemData;
    
    const result = await pool.query(
      `INSERT INTO inventory_items (
        warehouse_id, item_name, item_name_en, item_code, category, unit, 
        quantity, min_quantity, max_quantity, unit_price, supplier, 
        last_purchase_date, expiry_date, notes
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        warehouse_id, item_name, item_name_en, item_code, category, unit, 
        quantity, min_quantity || 0, max_quantity, unit_price, supplier, 
        last_purchase_date, expiry_date, notes
      ]
    );
    
    return result.rows[0];
  }

  // Update item
  static async update(id, itemData) {
    const { 
      item_name, item_name_en, category, unit, quantity, min_quantity, 
      max_quantity, unit_price, supplier, last_purchase_date, expiry_date, notes 
    } = itemData;
    
    const result = await pool.query(
      `UPDATE inventory_items 
       SET item_name = $1, item_name_en = $2, category = $3, unit = $4, 
           quantity = $5, min_quantity = $6, max_quantity = $7, unit_price = $8, 
           supplier = $9, last_purchase_date = $10, expiry_date = $11, notes = $12, 
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       RETURNING *`,
      [item_name, item_name_en, category, unit, quantity, min_quantity, max_quantity, 
       unit_price, supplier, last_purchase_date, expiry_date, notes, id]
    );
    
    return result.rows[0];
  }

  // Delete item
  static async delete(id) {
    await pool.query('DELETE FROM inventory_items WHERE id = $1', [id]);
    return { message: 'Inventory item deleted successfully' };
  }

  // Update quantity
  static async updateQuantity(id, quantityChange) {
    const result = await pool.query(
      `UPDATE inventory_items 
       SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [quantityChange, id]
    );
    return result.rows[0];
  }

  // Get low stock items
  static async getLowStockItems(warehouseId) {
    const result = await pool.query(
      `SELECT * FROM inventory_items 
       WHERE warehouse_id = $1 AND quantity <= min_quantity
       ORDER BY (quantity - min_quantity) ASC`,
      [warehouseId]
    );
    return result.rows;
  }

  // Get expired items
  static async getExpiredItems(warehouseId) {
    const result = await pool.query(
      `SELECT * FROM inventory_items 
       WHERE warehouse_id = $1 AND expiry_date < CURRENT_DATE
       ORDER BY expiry_date ASC`,
      [warehouseId]
    );
    return result.rows;
  }
}

module.exports = InventoryItem;
