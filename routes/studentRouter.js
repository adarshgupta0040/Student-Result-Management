const studentController = require('../controllers/studentController')

const router = require('express').Router()

router.post('/login',studentController.studentLogin);
router.get('/login',studentController.student_login_get);

module.exports = router