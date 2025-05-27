const contentFlagModel = require('../models/contentFlagModel');

exports.flagContent = async (req, res) => {
  const userId = req.user.user_id;
  const { contentType, contentId } = req.body;
  try {
    const flagged = await contentFlagModel.flagContent(contentType, contentId, userId);
    res.status(201).json({ message: 'Content flagged', data: flagged });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to flag content' });
  }
};
