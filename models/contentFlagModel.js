const db = require('./db');

const flagContent = async (contentType, contentId, reportedBy) => {
  const result = await db.query(
    `INSERT INTO content_flags (content_type, content_id, reported_by)
     VALUES ($1, $2, $3) RETURNING *`,
    [contentType, contentId, reportedBy]
  );
  return result.rows[0];
};

module.exports = {
  flagContent,
};
