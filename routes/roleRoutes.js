const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authenticate = require('../middleware/authMiddleware');

router.post('/assign', authenticate, roleController.assignRole);

module.exports = router;
