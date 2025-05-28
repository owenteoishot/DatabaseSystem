const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', authenticate, requireAdmin, roleController.getAllRoles);
router.get('/users', authenticate, requireAdmin, roleController.getAllUsersWithRoles);
router.post('/assign', authenticate, requireAdmin, roleController.assignRole);

module.exports = router;
