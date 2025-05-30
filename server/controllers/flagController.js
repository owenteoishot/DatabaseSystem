const db = require('../models/db');

// Unified: Create a content flag
exports.flagContent = async (req, res) => {
  const { content_type, content_id } = req.body;
  const reported_by = req.user.user_id;

  if (!content_type || !content_id) {
    return res.status(400).json({ message: 'Missing flag data' });
  }

  if (!['post', 'comment', 'profile', 'media'].includes(content_type)) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  console.log('🚨 Incoming flag report:', { content_type, content_id, reported_by });

  try {
    const result = await db.query(
      `INSERT INTO content_flags (content_type, content_id, reported_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content_type, content_id, reported_by]
    );

    res.status(201).json({ message: 'Flag recorded', data: result.rows[0] });
  } catch (err) {
    console.error('Flag creation error:', err);
    res.status(500).json({ message: 'Error recording flag' });
  }
};
