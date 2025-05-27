const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset/request', authController.requestPasswordReset);
router.post('/reset/confirm', authController.resetPassword);

module.exports = router;
