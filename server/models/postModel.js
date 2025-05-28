const db = require('./db');

exports.getAllPosts = async () => {
  const result = await db.query(`
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.author_id = u.user_id
    ORDER BY p.created_at DESC
  `);
  return result.rows;
};

exports.getPostsByUser = async (userId) => {
  const result = await db.query(`
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.author_id = u.user_id
    WHERE p.author_id = $1
    ORDER BY p.created_at DESC
  `, [userId]);
  return result.rows;
};

exports.createPost = async (userId, title, content) => {
  const result = await db.query(
    `INSERT INTO posts (author_id, title, content, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [userId, title, content]
  );
  return result.rows[0];
};
