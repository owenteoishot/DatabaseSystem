const reputationModel = require('../models/reputationModel');

exports.getReputation = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const reputation = await reputationModel.getUserReputation(userId);
    res.json(reputation || { score: 0, level_name: 'None' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reputation' });
  }
};
