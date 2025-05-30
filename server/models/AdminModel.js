const db = require('./db');

class AdminModel {
  static async getAllUsers() {
    const result = await db.query(`SELECT user_id, username, email FROM users`);
    return result.rows;
  }

  static async promoteUserToAdmin(userId) {
    // Admin role assumed to be role_id = 1
    await db.query(`
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, 1)
      ON CONFLICT (user_id, role_id) DO NOTHING
    `, [userId]);
  }

  static async deleteUser(userId) {
    await db.query(`DELETE FROM users WHERE user_id = $1`, [userId]);
  }

  static async deletePost(postId) {
    await db.query(`DELETE FROM posts WHERE post_id = $1`, [postId]);
  }
}

module.exports = AdminModel;