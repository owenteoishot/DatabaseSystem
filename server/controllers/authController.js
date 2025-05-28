// /controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
const passwordResetModel = require('../models/passwordResetModel');
const { v4: uuidv4 } = require('uuid');

// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await userModel.findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(username, email, hash);

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login User
const user = await userModel.findUserByEmail(email);
if (!user) return res.status(400).json({ message: 'Invalid credentials' });

const match = await bcrypt.compare(password, user.password_hash);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });

// Get user's role
const roleResult = await db.query(
  `SELECT r.role_name FROM user_roles ur
   JOIN roles r ON ur.role_id = r.role_id
   WHERE ur.user_id = $1 LIMIT 1`,
  [user.user_id]
);
const role = roleResult.rows[0]?.role_name || 'user';

// Generate token
const token = jwt.sign(
  { user_id: user.user_id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Respond with token AND role
res.json({ message: 'Login successful', token, role });


// Logout
exports.logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    await sessionModel.invalidateSession(token);
    res.json({ message: 'Logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Password Reset Request
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await passwordResetModel.createResetRequest(user.user_id, token, expiresAt);

    // In a real app: send email with this token
    res.json({ message: 'Reset link sent (mocked)', resetToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Reset request failed' });
  }
};

// Confirm Password Reset
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await passwordResetModel.markResetUsed(token);
    const hash = await bcrypt.hash(newPassword, 10);
    await db.query(
      `UPDATE users SET password_hash = $1 WHERE user_id = (
        SELECT user_id FROM password_reset_requests WHERE reset_token = $2
      )`,
      [hash, token]
    );
    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Password reset failed' });
  }
};
