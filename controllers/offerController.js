const { User, Offer, OfferDevice, Device } = require("../models/models");

class OfferController {
  async createOffer(req, res) {
    const { userName, userTel, userEmail, sum } = req.body;
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      const offer = await Offer.create({ userName: userName, userTel: userTel, userEmail: userEmail, sum: sum, userId: null });
      return res.json({ message: `Заказ без авторизации успешно создан`, offer });
    } else {
      const offer = await Offer.create({ userName: user.name, userEmail: user.email, userTel: user.tel, sum: sum, userId: user.id });
      return res.json({ message: `Заказ с авторизацией успешно создан`, offer });
    }
  }

  async createOfferDevice(req, res) {
    const { offerID, deviceID } = req.body;
    const offer = await Offer.findOne({ where: { id: offerID } });
    const device = await Device.findOne({ where: { id: deviceID } });
    const offer_device = await OfferDevice.create({
      offerId: offer.id,
      deviceId: device.id,
    });
    return res.json({ message: `offer device was added`, offer_device });
  }
}

module.exports = new OfferController();
