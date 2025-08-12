// routes/superAdminRoutes.js
const express = require('express');
const router = express.Router();
const superAdminController = require('../Controllers/superAdminController');
const userController=require('../Controllers/userController');
const { authenticateSuperAdmin } = require('../Middleware/superAdminMiddleware'); 



router.get('/',  userController.getAllUsers); 
router.post('/signup', superAdminController.signup);
router.post('/login', superAdminController.login);
router.post('/create-admin', superAdminController.createAdmin);
router.get('/',  userController.getAllUsers); 
router.post('/grant-access', authenticateSuperAdmin, superAdminController.grantAccess);

module.exports = router;
