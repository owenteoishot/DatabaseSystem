const db = require('./db');

const createResetRequest = async (userId, token, expiresAt) => {
  const result = await db.query(
    `INSERT INTO password_reset_requests (user_id, reset_token, expires_at)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, token, expiresAt]
  );
  return result.rows[0];
};

const markResetUsed = async (token) => {
  await db.query('UPDATE password_reset_requests SET is_used = TRUE WHERE reset_token = $1', [token]);
};

module.exports = {
  createResetRequest,
  markResetUsed,
};
