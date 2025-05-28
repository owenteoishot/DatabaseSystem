const db = require('../models/db');

// 🔁 User reports a post/comment/profile/media
exports.flagContent = async (req, res) => {
  const reporter = req.user.user_id;
  const { contentType, contentId } = req.body;

  const validTypes = ['post', 'comment', 'profile', 'media'];
  if (!validTypes.includes(contentType)) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  try {
    await db.query(
      `INSERT INTO content_flags (content_type, content_id, reported_by, status, created_at)
       VALUES ($1, $2, $3, 'pending', NOW())`,
      [contentType, contentId, reporter]
    );
    res.status(201).json({ message: 'Content flagged for review' });
  } catch (err) {
    console.error('Error flagging content:', err);
    res.status(500).json({ message: 'Failed to flag content' });
  }
};
