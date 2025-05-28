const express = require('express');
const router = express.Router();
const flagController = require('../controllers/flagController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, flagController.flagContent);

module.exports = router;
