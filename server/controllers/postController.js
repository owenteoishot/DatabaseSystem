const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  const { userId } = req.query;

  try {
    // If userId is present, validate format as UUID
    if (userId && !/^[0-9a-fA-F-]{36}$/.test(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const posts = userId
      ? await postModel.getPostsByUser(userId)
      : await postModel.getAllPosts();

    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Failed to load posts' });
  }
};



exports.createPost = async (req, res) => {
  const userId = req.user.user_id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content required' });
  }

  try {
    const newPost = await postModel.createPost(userId, title, content);
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};
