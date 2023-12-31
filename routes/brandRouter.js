const Router = require('express')
const brandController = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.patch('/', checkRoleMiddleware('ADMIN'), brandController.edit)
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)

// router.post('/', brandController.create)
// router.post('/delete', brandController.delete)
// router.get('/', brandController.getAll)

module.exports = router