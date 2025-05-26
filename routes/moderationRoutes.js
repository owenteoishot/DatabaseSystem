const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const authenticate = require('../middleware/authMiddleware');

router.post('/log', authenticate, moderationController.logModeration);

module.exports = router;
