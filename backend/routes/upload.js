const express = require('express');
const router = express.Router();
const { upload, handleMulterError } = require('../middleware/upload');
const { auth } = require('../middleware/auth');

// Upload single file
router.post('/single', auth, upload.single('file'), handleMulterError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف / No file uploaded' });
    }

    const fileUrl = `/uploads/${req.body.folder || 'general'}/${req.file.filename}`;

    res.json({
      message: 'تم رفع الملف بنجاح / File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'خطأ في رفع الملف / Error uploading file' });
  }
});

// Upload multiple files
router.post('/multiple', auth, upload.array('files', 10), handleMulterError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملفات / No files uploaded' });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${req.body.folder || 'general'}/${file.filename}`
    }));

    res.json({
      message: 'تم رفع الملفات بنجاح / Files uploaded successfully',
      files
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'خطأ في رفع الملفات / Error uploading files' });
  }
});

module.exports = router;
