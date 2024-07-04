
const bookmarkController = require('../controllers/bookmark_controller');
const router = require('express').Router();

router.post('/', bookmarkController.createBookmark);

router.delete('/:id', bookmarkController.deleteBookmark);

router.get("/:userId", bookmarkController.getBookmark);
module.exports = router;