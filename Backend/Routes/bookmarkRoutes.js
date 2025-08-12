const express = require('express');
const router = express.Router();
const bookmarkController = require('../Controllers/bookmarkController');

router.post('/', bookmarkController.createBookmark);
router.post('/bookmark/slot/add-post', bookmarkController.addPostToSlot);

router.delete('/:id', bookmarkController.deleteBookmark);
router.get('/bookmark/:id/post', bookmarkController.getPostFromBookmark);
router.get('/bookmarks', bookmarkController.getAllBookmarks);
router.get('/bookmarks/:bookmarkId/slots', bookmarkController.getSlotsByBookmarkId);


module.exports = router;
