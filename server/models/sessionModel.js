const db = require('./db');

const createSession = async (userId, token, ipAddress, userAgent, expiresAt) => {
  const result = await db.query(
    `INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, token, ipAddress, userAgent, expiresAt]
  );
  return result.rows[0];
};

const invalidateSession = async (token) => {
  await db.query('UPDATE sessions SET is_active = FALSE WHERE token = $1', [token]);
};

module.exports = {
  createSession,
  invalidateSession,
};
