const commentModel = require('../models/commentModel');

exports.createComment = async (req, res) => {
  const userId = req.user.user_id;
  const { postId, content } = req.body;
  try {
    const comment = await commentModel.createComment(postId, userId, content);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create comment' });
  }
};
