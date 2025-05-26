const db = require('./db');

const assignRole = async (userId, roleId) => {
  const result = await db.query(
    `INSERT INTO user_roles (user_id, role_id)
     VALUES ($1, $2) RETURNING *`,
    [userId, roleId]
  );
  return result.rows[0];
};

module.exports = {
  assignRole,
};
