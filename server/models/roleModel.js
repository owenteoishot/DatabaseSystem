const db = require('./db');

const createRole = async (roleName, permissions = {}) => {
  const result = await db.query(
    'INSERT INTO roles (role_name, permissions) VALUES ($1, $2) RETURNING *',
    [roleName, permissions]
  );
  return result.rows[0];
};

const getRoleByName = async (roleName) => {
  const result = await db.query('SELECT * FROM roles WHERE role_name = $1', [roleName]);
  return result.rows[0];
};

module.exports = {
  createRole,
  getRoleByName,
};