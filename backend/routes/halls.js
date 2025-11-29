const express = require('express');
const router = express.Router();
const Hall = require('../models/Hall');
const { auth } = require('../middleware/auth');

// Get all halls for a hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
  try {
    const halls = await Hall.findByHotelId(req.params.hotelId);
    res.json({ success: true, data: halls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single hall
router.get('/:id', auth, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) {
      return res.status(404).json({ success: false, message: 'القاعة غير موجودة' });
    }
    res.json({ success: true, data: hall });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new hall
router.post('/', auth, async (req, res) => {
  try {
    const hall = await Hall.create(req.body);
    res.status(201).json({ success: true, data: hall, message: 'تم إضافة القاعة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update hall
router.put('/:id', auth, async (req, res) => {
  try {
    const hall = await Hall.update(req.params.id, req.body);
    if (!hall) {
      return res.status(404).json({ success: false, message: 'القاعة غير موجودة' });
    }
    res.json({ success: true, data: hall, message: 'تم تحديث القاعة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete hall
router.delete('/:id', auth, async (req, res) => {
  try {
    await Hall.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف القاعة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check hall availability
router.post('/:id/check-availability', auth, async (req, res) => {
  try {
    const { date, hours } = req.body;
    const availability = await Hall.checkAvailability(req.params.id, date, hours);
    res.json({ success: true, data: availability });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
