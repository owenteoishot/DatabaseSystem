const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/authMiddleware');

router.post('/create', authenticate, commentController.createComment);

module.exports = router;
