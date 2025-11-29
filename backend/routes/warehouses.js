const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');
const { auth } = require('../middleware/auth');

// Get all warehouses for a hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
  try {
    const warehouses = await Warehouse.findByHotelId(req.params.hotelId);
    res.json({ success: true, data: warehouses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single warehouse
router.get('/:id', auth, async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ success: false, message: 'المستودع غير موجود' });
    }
    res.json({ success: true, data: warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get warehouse inventory summary
router.get('/:id/summary', auth, async (req, res) => {
  try {
    const summary = await Warehouse.getInventorySummary(req.params.id);
    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new warehouse
router.post('/', auth, async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json({ success: true, data: warehouse, message: 'تم إضافة المستودع بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update warehouse
router.put('/:id', auth, async (req, res) => {
  try {
    const warehouse = await Warehouse.update(req.params.id, req.body);
    if (!warehouse) {
      return res.status(404).json({ success: false, message: 'المستودع غير موجود' });
    }
    res.json({ success: true, data: warehouse, message: 'تم تحديث المستودع بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete warehouse
router.delete('/:id', auth, async (req, res) => {
  try {
    await Warehouse.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف المستودع بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
