const express = require('express');
const router = express.Router();
const girahamController = require('../Controllers/girahamController');
const { authenticateAdmin } = require('../Middleware/adminMiddleware');
const checkModulePermission = require('../Middleware/checkModulePermission');

// Create Single Giraham
router.post('/giraham',
  authenticateAdmin,
  (req, res, next) => {
    req.body.moduleName = 'Giraham';
    req.body.moduleId = req.body.girahamId; 
    next();
  },
  checkModulePermission,
  girahamController.createGiraham
);

// Get All, Get by Id, Update, Delete
router.get('/', girahamController.getAllGirahams);
router.get('/:id', girahamController.getGirahamById);
router.put('/:id', girahamController.updateGiraham);
router.delete('/:id', girahamController.deleteGiraham);

// Bulk Upload Girahams (Excel)
router.post('/bulk-upload',
  authenticateAdmin,   // ✅ Ensure admin authentication
  (req, res, next) => {
    req.body.moduleName = 'Giraham';
    req.body.moduleId = 'bulk'; // ✅ Pass static/module identifier
    next();
  },
  checkModulePermission,  // ✅ Permission check just like single create
  girahamController.bulkUploadGiraham
);

module.exports = router;
