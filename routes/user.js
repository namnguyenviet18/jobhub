const router = require('express').Router();
const userController = require('../controllers/user_controller');
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middlewares/verify_token');

router.put('/:id', verifyAndAuthorization, userController.updateUser);
router.delete('/:id', verifyAndAuthorization, userController.deleteUser);
router.get('/:id', verifyAndAuthorization, userController.getUser);
router.get('/', verifyAdmin, userController.getAllUser);
module.exports = router;