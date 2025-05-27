const express = require('express');
const router = express.Router();
const reputationController = require('../controllers/reputationController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, reputationController.getReputation);

module.exports = router;
