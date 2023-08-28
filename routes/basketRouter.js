const Router = require('express')
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', authMiddleware, basketController.add)
router.post('/delete', authMiddleware, basketController.delete)
router.get('/', basketController.getAll)

module.exports = router