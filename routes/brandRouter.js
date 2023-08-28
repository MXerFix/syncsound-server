const Router = require('express')
const brandController = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.post('/delete', checkRoleMiddleware('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)

module.exports = router