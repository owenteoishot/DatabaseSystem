const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', postController.getPosts);
router.post('/', authenticate, postController.createPost);

module.exports = router;
