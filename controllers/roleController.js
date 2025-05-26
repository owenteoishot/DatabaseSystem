const roleModel = require('../models/roleModel');
const userRoleModel = require('../models/userRoleModel');

exports.assignRole = async (req, res) => {
  const { userId, roleName } = req.body;
  try {
    const role = await roleModel.getRoleByName(roleName);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    const assigned = await userRoleModel.assignRole(userId, role.role_id);
    res.json({ message: 'Role assigned', data: assigned });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign role' });
  }
};
