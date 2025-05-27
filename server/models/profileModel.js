const db = require('./db');

const createProfile = async (userId, displayName, avatarUrl, bio, socialLinks) => {
  const result = await db.query(
    `INSERT INTO user_profiles (user_id, display_name, avatar_url, bio, social_links)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, displayName, avatarUrl, bio, socialLinks]
  );
  return result.rows[0];
};

const getProfileByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
  return result.rows[0];
};

module.exports = {
  createProfile,
  getProfileByUserId,
};
