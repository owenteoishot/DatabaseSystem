const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const { authenticate, requireAdmin, authorize} = require('../middleware/authMiddleware');

router.post('/log', authenticate, moderationController.logModeration);
router.get('/flags', authenticate, requireAdmin, moderationController.getFlaggedContent);
router.post('/action', authenticate, requireAdmin, moderationController.resolveFlag);
router.get('/flags', authenticate, authorize(['admin', 'moderator']), moderationController.getPostFlags);

module.exports = router;
