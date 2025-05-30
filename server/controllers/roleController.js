const db = require('../models/db'); // Make sure this path is correct!

const roleController = {
  // Get all roles
  getAllRoles: async (req, res) => {
    try {
      const result = await db.query(`SELECT * FROM roles ORDER BY role_name`);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching roles:', err);
      res.status(500).json({ message: 'Failed to fetch roles' });
    }
  },

  // Get all users with their roles
  getAllUsersWithRoles: async (req, res) => {
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
  },

  // Assign role to user
  assignRole: async (req, res) => {
    const { userId, roleId } = req.body;

    try {
      // Remove any previous roles
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
  },

  // Create new role
  createRole: async (req, res) => {
    const { roleName, permissions } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO roles (role_name, permissions) VALUES ($1, $2) RETURNING *',
        [roleName, permissions]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error creating role:', err);
      res.status(500).json({ message: 'Failed to create role' });
    }
  },

  // Get role by name
  getRoleByName: async (req, res) => {
    const { roleName } = req.params;

    try {
      const result = await db.query('SELECT * FROM roles WHERE role_name = $1', [roleName]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching role:', err);
      res.status(500).json({ message: 'Failed to fetch role' });
    }
  }
};

module.exports = roleController;