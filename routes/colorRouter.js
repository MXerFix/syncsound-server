const Router = require('express')
const ColorController = require('../controllers/colorController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

// router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
// router.post('/delete', checkRoleMiddleware('ADMIN'), brandController.delete)
// router.get('/', brandController.getAll)

router.post('/', checkRoleMiddleware("ADMIN"), ColorController.create)
router.patch('/', checkRoleMiddleware("ADMIN"), ColorController.edit)
router.delete('/', checkRoleMiddleware("ADMIN"), ColorController.delete)
router.get('/', ColorController.getAll)

module.exports = router