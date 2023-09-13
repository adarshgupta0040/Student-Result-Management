const teacherController = require('../controllers/teacherController.js')

const router = require('express').Router()

router.post('/addStudent', teacherController.addStudent)
router.get('/addStudent',teacherController.teacher_add_get)
router.get('/viewall', teacherController.getAllStuduents)
router.get('/login',teacherController.teacher_login_get)
router.post('/login', teacherController.teacherLogin)
router.post('/edit', teacherController.updateStudent)
router.get('/edit/:id',teacherController.updateStudent_get)
router.get('/delete/:id', teacherController.deleteStudent)
router.get('/goback_viewall',teacherController.gobackViewall)

module.exports = router