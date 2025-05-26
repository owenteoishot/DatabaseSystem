const db = require('./db');

const getUserReputation = async (userId) => {
  const result = await db.query(
    `SELECT ur.*, rl.level_name
     FROM user_reputation ur
     JOIN reputation_levels rl ON ur.level_id = rl.level_id
     WHERE ur.user_id = $1`,
    [userId]
  );
  return result.rows[0];
};

module.exports = {
  getUserReputation,
};
