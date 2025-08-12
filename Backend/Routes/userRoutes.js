// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
<<<<<<< HEAD
const authenticate = require('../Middleware/authMiddleware');
=======
// const authenticate = require('../Middleware/authMiddleware');
>>>>>>> 444ee30faab778304e53189020e6d6a283a06a49

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.put('/update-profile', userController.updateProfile);

module.exports = router;
