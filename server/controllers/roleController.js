const db = require('../models/db');

// 🔄 Assign a role to a user (admin only)
exports.assignRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    // Remove any previous roles (1:1 role logic)
    await db.query(`DELETE FROM user_roles WHERE user_id = $1`, [userId]);

    // Assign new role
    await db.query(
      `INSERT INTO user_roles (user_id, role_id, assigned_at) VALUES ($1, $2, NOW())`,
      [userId, roleId]
    );

    res.json({ message: 'Role assigned successfully' });
  } catch (err) {
    console.error('Error assigning role:', err);
    res.status(500).json({ message: 'Failed to assign role' });
  }
};

// ✅ Get all users and their roles
exports.getAllUsersWithRoles = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT u.user_id, u.username, u.email, r.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.user_id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.role_id
      ORDER BY u.username ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch user list' });
  }
};

// ✅ Get all role options
exports.getAllRoles = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM roles ORDER BY role_name`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
};
