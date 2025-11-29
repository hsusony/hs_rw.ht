const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const { auth } = require('../middleware/auth');

// Get all items in a warehouse
router.get('/warehouse/:warehouseId', auth, async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      low_stock: req.query.low_stock === 'true',
      expired: req.query.expired === 'true'
    };
    const items = await InventoryItem.findByWarehouseId(req.params.warehouseId, filters);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get low stock items
router.get('/warehouse/:warehouseId/low-stock', auth, async (req, res) => {
  try {
    const items = await InventoryItem.getLowStockItems(req.params.warehouseId);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get expired items
router.get('/warehouse/:warehouseId/expired', auth, async (req, res) => {
  try {
    const items = await InventoryItem.getExpiredItems(req.params.warehouseId);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'الصنف غير موجود' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get item by code
router.get('/code/:itemCode', auth, async (req, res) => {
  try {
    const item = await InventoryItem.findByCode(req.params.itemCode);
    if (!item) {
      return res.status(404).json({ success: false, message: 'الصنف غير موجود' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new item
router.post('/', auth, async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'تم إضافة الصنف بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await InventoryItem.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ success: false, message: 'الصنف غير موجود' });
    }
    res.json({ success: true, data: item, message: 'تم تحديث الصنف بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update item quantity
router.patch('/:id/quantity', auth, async (req, res) => {
  try {
    const { quantity_change } = req.body;
    if (!quantity_change) {
      return res.status(400).json({ success: false, message: 'يرجى إدخال كمية التغيير' });
    }
    const item = await InventoryItem.updateQuantity(req.params.id, quantity_change);
    res.json({ success: true, data: item, message: 'تم تحديث الكمية بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    await InventoryItem.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف الصنف بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
