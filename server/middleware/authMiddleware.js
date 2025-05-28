const jwt = require('jsonwebtoken');
const db = require('../models/db');

// ✅ Auth middleware — validates JWT and attaches user + role
const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;

    // 🔄 Fetch role from DB
    const roleQuery = await db.query(
      `SELECT r.role_name
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.role_id
       WHERE ur.user_id = $1
       LIMIT 1`,
      [userId]
    );

    req.user = {
      user_id: userId,
      username: decoded.username,
      role: roleQuery.rows[0]?.role_name || 'user'
    };

    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ Admin-only middleware — rejects non-admins
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };
