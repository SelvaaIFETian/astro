// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
// const authenticate = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.put('/update-profile', authenticate, userController.updateProfile);

module.exports = router;
