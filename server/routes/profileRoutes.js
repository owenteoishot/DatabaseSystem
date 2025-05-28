const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, profileController.getProfile);
router.post('/update', authenticate, profileController.updateProfile);

module.exports = router;
