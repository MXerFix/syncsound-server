const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

// router.post('/',  deviceController.create)
// router.post('/delete', deviceController.delete)
// router.get('/', deviceController.getAll)
// router.get('/:id', deviceController.getOne)


router.post('/', checkRoleMiddleware('ADMIN'),  deviceController.create)
router.post('/delete', checkRoleMiddleware('ADMIN'), deviceController.delete)
router.post('/edit', checkRoleMiddleware("ADMIN"), deviceController.edit)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.get('/same/:id', deviceController.getSame)

module.exports = router