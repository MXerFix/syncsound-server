const Router = require('express')
const offerController = require('../controllers/offerController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.get('/getoffers', checkRoleMiddleware("ADMIN"), offerController.getAllOffers)
router.post('/addoffer', offerController.createOffer)
router.post('/addofferdevice', offerController.createOfferDevice)
router.post('/changeofferstatus', offerController.changeOfferStatus)
router.post('/', offerController.getOffer)

module.exports = router