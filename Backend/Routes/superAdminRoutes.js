// routes/superAdminRoutes.js
const express = require('express');
const router = express.Router();
const superAdminController = require('../Controllers/superAdminController');
const userController=require('../Controllers/userController');
<<<<<<< HEAD
const { authenticateSuperAdmin } = require('../Middleware/superAdminMiddleware'); 

=======
>>>>>>> 444ee30faab778304e53189020e6d6a283a06a49


router.get('/',  userController.getAllUsers); 
router.post('/signup', superAdminController.signup);
router.post('/login', superAdminController.login);
router.post('/create-admin', superAdminController.createAdmin);
router.get('/',  userController.getAllUsers); 
router.post('/grant-access', authenticateSuperAdmin, superAdminController.grantAccess);

module.exports = router;
