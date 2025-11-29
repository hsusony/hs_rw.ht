const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'الرجاء تسجيل الدخول أولاً / Please login first' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, status FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      throw new Error();
    }

    const user = result.rows[0];

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'حسابك غير نشط / Your account is inactive' });
    }

    // Add user to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ error: 'يرجى تسجيل الدخول مرة أخرى / Please login again' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'غير مصرح / Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'ليس لديك صلاحية للوصول / You do not have permission to access this resource' 
      });
    }

    next();
  };
};

module.exports = { auth, authorize };
