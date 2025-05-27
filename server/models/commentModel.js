const db = require('./db');

const createComment = async (postId, userId, content) => {
  const result = await db.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3) RETURNING *`,
    [postId, userId, content]
  );
  return result.rows[0];
};

module.exports = {
  createComment,
};
