
const router = require('express').Router();
const { verifyAndAuthorization, verifyAdmin } = require('../middlewares/verify_token');
const jobController = require('../controllers/job_controller');


router.post('/', verifyAdmin, jobController.createJob);
router.put('/:id', verifyAdmin, jobController.updateJob);
router.delete('/:id', verifyAdmin, jobController.deleteJob);
router.get('/:id', verifyAndAuthorization, jobController.getJob);
router.get('/', jobController.getAllJob);
router.get('/search/:keyword', jobController.searchJob);
module.exports = router;