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
