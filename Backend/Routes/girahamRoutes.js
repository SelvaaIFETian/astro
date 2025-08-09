const express = require('express');
const router = express.Router();
const girahamController = require('../Controllers/girahamController');

router.post('/', girahamController.createGiraham);
router.get('/', girahamController.getAllGirahams);
router.get('/:id', girahamController.getGirahamById);
router.put('/:id', girahamController.updateGiraham);
router.delete('/:id', girahamController.deleteGiraham);

module.exports = router;
