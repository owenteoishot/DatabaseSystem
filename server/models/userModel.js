const db = require('./db');

exports.createUser = async (username, email, passwordHash) => {
  const result = await db.query(
    `INSERT INTO users (username, email, password_hash, is_active)
     VALUES ($1, $2, $3, TRUE)
     RETURNING *`,
    [username, email, passwordHash]
  );
  return result.rows[0];
};

exports.findByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
