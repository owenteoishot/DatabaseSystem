const moderationModel = require('../models/moderationModel');
const db = require('../models/db');

// 🔄 Existing: Log a manual moderation action
exports.logModeration = async (req, res) => {
  const modId = req.user.user_id;
  const { targetUser, actionType, reason } = req.body;
  try {
    const logged = await moderationModel.logAction(targetUser, modId, actionType, reason);
    res.status(201).json({ message: 'Moderation action logged', data: logged });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log action' });
  }
};

// 🆕 New: Get all pending content flags
exports.getFlaggedContent = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM content_flags WHERE status = 'pending' ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching flags:', err);
    res.status(500).json({ message: 'Failed to fetch flagged content' });
  }
};

// 🆕 New: Resolve a content flag (action or dismiss)
exports.resolveFlag = async (req, res) => {
  const moderatorId = req.user.user_id;
  const { flagId, action } = req.body;

  if (!['dismissed', 'actioned'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }

  try {
    await db.query(
      `UPDATE content_flags
       SET status = $1,
           resolved_by = $2,
           resolved_at = NOW()
       WHERE flag_id = $3`,
      [action, moderatorId, flagId]
    );

    res.json({ message: `Flag ${action}` });
  } catch (err) {
    console.error('Error resolving flag:', err);
    res.status(500).json({ message: 'Failed to update flag status' });
  }
};

exports.getPostFlags = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        f.flag_id,
        f.status,
        f.created_at,
        p.post_id,
        p.title,
        p.content,
        u.username AS author
      FROM content_flags f
      JOIN posts p ON f.content_id = p.post_id::TEXT
      JOIN users u ON p.author_id = u.user_id
      WHERE f.content_type = 'post'
      ORDER BY f.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Fetch flags failed:', err);
    res.status(500).json({ message: 'Could not fetch flags' });
  }
};
