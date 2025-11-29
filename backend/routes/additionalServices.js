const express = require('express');
const router = express.Router();
const AdditionalService = require('../models/AdditionalService');
const { auth } = require('../middleware/auth');

// Get all services for a hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
  try {
    const filters = {
      service_type: req.query.service_type,
      status: req.query.status
    };
    const services = await AdditionalService.findByHotelId(req.params.hotelId, filters);
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get services by type
router.get('/hotel/:hotelId/type/:serviceType', auth, async (req, res) => {
  try {
    const services = await AdditionalService.findByType(req.params.hotelId, req.params.serviceType);
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single service
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await AdditionalService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'الخدمة غير موجودة' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new service
router.post('/', auth, async (req, res) => {
  try {
    const service = await AdditionalService.create(req.body);
    res.status(201).json({ success: true, data: service, message: 'تم إضافة الخدمة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update service
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await AdditionalService.update(req.params.id, req.body);
    if (!service) {
      return res.status(404).json({ success: false, message: 'الخدمة غير موجودة' });
    }
    res.json({ success: true, data: service, message: 'تم تحديث الخدمة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete service
router.delete('/:id', auth, async (req, res) => {
  try {
    await AdditionalService.delete(req.params.id);
    res.json({ success: true, message: 'تم حذف الخدمة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
