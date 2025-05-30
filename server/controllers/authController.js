// /controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
const passwordResetModel = require('../models/passwordResetModel');
const db = require('../models/db'); 

// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(username, email, hashed);

    // Assign default 'user' role
    const roleIdForUser = 3;
    await db.query(
      `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
      [newUser.user_id, roleIdForUser]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};


// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Attempting login for:', email);

  try {
    // Find user by email
    const user = await userModel.findByEmail(email);
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('✅ User found:', user.email);
    console.log('Hash in DB:', user.password_hash);
    console.log('Entered password:', password);

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log('Password match?', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get user role
    const roleResult = await db.query(
      `SELECT r.role_name 
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.role_id
       WHERE ur.user_id = $1 LIMIT 1`,
      [user.user_id]
    );
    const role = roleResult.rows[0]?.role_name || 'user';

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create session record
    await sessionModel.createSession(
      user.user_id,
      token,
      req.ip,
      req.headers['user-agent'],
      new Date(Date.now() + 3600000) // 1 hour expiration
    );

    console.log('✅ Login successful for:', user.email, 'Role:', role);

    // Send response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role
      }
    });

  } catch (err) {
    console.error('💥 Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Logout User
exports.logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    await sessionModel.invalidateSession(token);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await passwordResetModel.createResetRequest(user.user_id, token, expiresAt);

    // In production: Send email with reset link
    res.json({ 
      message: 'Password reset link sent',
      resetToken: token,
      expiresAt
    });

  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ 
      message: 'Password reset request failed',
      error: err.message 
    });
  }
};

// Confirm Password Reset
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Mark token as used and get user ID
    await passwordResetModel.markResetUsed(token);

    // Update user's password
    const hash = await bcrypt.hash(newPassword, 10);
    await db.query(
      `UPDATE users 
       SET password_hash = $1 
       WHERE user_id = (
         SELECT user_id 
         FROM password_reset_requests 
         WHERE reset_token = $2
       )`,
      [hash, token]
    );

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ 
      message: 'Password reset failed',
      error: err.message 
    });
  }
};