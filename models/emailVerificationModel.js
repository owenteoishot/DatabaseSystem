const db = require('./db');

const createVerification = async (userId, token, expiresAt) => {
  const result = await db.query(
    `INSERT INTO email_verifications (user_id, verification_token, expires_at)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, token, expiresAt]
  );
  return result.rows[0];
};

const verifyToken = async (token) => {
  await db.query(
    `UPDATE email_verifications SET is_verified = TRUE
     WHERE verification_token = $1`,
    [token]
  );
};

module.exports = {
  createVerification,
  verifyToken,
};
