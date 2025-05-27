const db = require('./db');

const logAction = async (targetUser, modId, actionType, reason) => {
  const result = await db.query(
    `INSERT INTO moderation_actions (target_user, performing_mod, action_type, reason)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [targetUser, modId, actionType, reason]
  );
  return result.rows[0];
};

module.exports = {
  logAction,
};
