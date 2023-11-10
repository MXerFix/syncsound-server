const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/admin/auth', userController.check_admin_key)
router.get('/auth', authMiddleware, userController.check)


module.exports = router