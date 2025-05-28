const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.post('/log', authenticate, moderationController.logModeration);
router.get('/flags', authenticate, requireAdmin, moderationController.getFlaggedContent);
router.post('/action', authenticate, requireAdmin, moderationController.resolveFlag);

module.exports = router;
