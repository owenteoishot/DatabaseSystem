const moderationModel = require('../models/moderationModel');

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
