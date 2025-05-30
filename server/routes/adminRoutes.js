const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const moderationController = require('../controllers/moderationController');
// Make sure this route exists and matches your frontend request:
router.post('/promote/:userId', authenticate, authorize(['admin']), adminController.promoteUser);
router.post('/demote/:userId', authenticate, authorize(['admin']), adminController.demoteUser);
router.delete('/user/:userId', authenticate, authorize(['admin']), adminController.deleteUser);
router.get('/users', authenticate, authorize(['admin']), adminController.getAllUsers);

// Also let moderators delete posts
router.delete('/post/:postId', authenticate, authorize(['admin', 'moderator']), adminController.deletePost);


router.get('/flags', authenticate, authorize(['admin', 'moderator']), moderationController.getPostFlags);


module.exports = router;

