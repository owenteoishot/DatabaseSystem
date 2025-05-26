const postModel = require('../models/postModel');

exports.createPost = async (req, res) => {
  const userId = req.user.user_id;
  const { title, content } = req.body;
  try {
    const post = await postModel.createPost(userId, title, content);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};
