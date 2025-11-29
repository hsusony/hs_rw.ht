const express = require('express');
const router = express.Router();
const Floor = require('../models/Floor');
const { auth } = require('../middleware/auth');

// Get all floors for a hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
  try {
    const floors = await Floor.findByHotelId(req.params.hotelId);
    res.json({ success: true, data: floors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get floors with room count
router.get('/hotel/:hotelId/with-count', auth, async (req, res) => {
  try {
    const floors = await Floor.getWithRoomCount(req.params.hotelId);
    res.json({ success: true, data: floors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single floor
router.get('/:id', auth, async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);
    if (!floor) {
      return res.status(404).json({ success: false, message: 'الطابق غير موجود' });
    }
    res.json({ success: true, data: floor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new floor
router.post('/', auth, async (req, res) => {
  try {
    const floor = await Floor.create(req.body);
    res.status(201).json({ success: true, data: floor, message: 'تم إضافة الطابق بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update floor
router.put('/:id', auth, async (req, res) => {
  try {
    const floor = await Floor.update(req.params.id, req.body);
    if (!floor) {
      return res.status(404).json({ success: false, message: 'الطابق غير موجود' });
    }
    res.json({ success: true, data: floor, message: 'تم تحديث الطابق بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete floor
router.delete('/:id', auth, async (req, res) => {
  try {
    await Floor.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف الطابق بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
