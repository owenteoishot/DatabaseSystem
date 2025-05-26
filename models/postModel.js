const db = require('./db');

const createPost = async (userId, title, content) => {
  const result = await db.query(
    `INSERT INTO posts (user_id, title, content)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, title, content]
  );
  return result.rows[0];
};

module.exports = {
  createPost,
};
