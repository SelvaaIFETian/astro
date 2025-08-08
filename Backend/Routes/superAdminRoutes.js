// routes/superAdminRoutes.js
const express = require('express');
const router = express.Router();
const superAdminController = require('../Controllers/superAdminController');

router.post('/signup', superAdminController.signup);
router.post('/login', superAdminController.login);
router.post('/create-admin', superAdminController.createAdmin);

module.exports = router;
