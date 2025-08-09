const express = require('express');
const router = express.Router();
const bookmarkController = require('../Controllers/bookmarkController');

router.post('/', bookmarkController.createBookmark);
router.get('/', bookmarkController.getAllBookmarks);
router.get('/type/:type', bookmarkController.getBookmarksByType);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
