const Router = require('express')
const offerController = require('../controllers/offerController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/addoffer', offerController.createOffer)
router.post('/addofferdevice', offerController.createOfferDevice)

module.exports = router