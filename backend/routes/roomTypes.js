const express = require('express');
const router = express.Router();
const RoomType = require('../models/RoomType');
const { auth } = require('../middleware/auth');

// Get all room types for a hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
  try {
    const roomTypes = await RoomType.findByHotelId(req.params.hotelId);
    res.json({ success: true, data: roomTypes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get room types with room count
router.get('/hotel/:hotelId/with-count', auth, async (req, res) => {
  try {
    const roomTypes = await RoomType.getWithRoomCount(req.params.hotelId);
    res.json({ success: true, data: roomTypes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single room type
router.get('/:id', auth, async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) {
      return res.status(404).json({ success: false, message: 'نوع الغرفة غير موجود' });
    }
    res.json({ success: true, data: roomType });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new room type
router.post('/', auth, async (req, res) => {
  try {
    const roomType = await RoomType.create(req.body);
    res.status(201).json({ success: true, data: roomType, message: 'تم إضافة نوع الغرفة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update room type
router.put('/:id', auth, async (req, res) => {
  try {
    const roomType = await RoomType.update(req.params.id, req.body);
    if (!roomType) {
      return res.status(404).json({ success: false, message: 'نوع الغرفة غير موجود' });
    }
    res.json({ success: true, data: roomType, message: 'تم تحديث نوع الغرفة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete room type
router.delete('/:id', auth, async (req, res) => {
  try {
    await RoomType.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف نوع الغرفة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
