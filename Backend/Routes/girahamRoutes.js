const express = require('express');
const router = express.Router();
const girahamController = require('../Controllers/girahamController');
const { authenticateAdmin } = require('../Middleware/adminMiddleware');
const checkModulePermission = require('../Middleware/checkModulePermission');

router.post('/giraham',
  authenticateAdmin,
  (req, res, next) => {
    req.body.moduleName = 'Giraham';
    req.body.moduleId = req.body.girahamId; // expects girahamId in request body
    next();
  },
  checkModulePermission,
  girahamController.createGiraham
);

router.get('/', girahamController.getAllGirahams);
router.get('/:id', girahamController.getGirahamById);
router.put('/:id', girahamController.updateGiraham);
router.delete('/:id', girahamController.deleteGiraham);
router.post('/bulk-upload', girahamController.bulkUploadGiraham);

module.exports = router;
