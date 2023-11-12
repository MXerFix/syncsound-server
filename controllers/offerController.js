const ApiError = require("../error/ApiError");
const { User, Offer, OfferDevice, Device } = require("../models/models");

class OfferController {
  async createOffer(req, res) {
    const { userName, userTel, userEmail, sum, payment, address, delivery_price } = req.body;
    const user = (await User.findOne({ where: { email: userEmail } })) ?? false;
    if (!user) {
      try {
        const offer = await Offer.create({
          userName: userName,
          userTel: userTel,
          userEmail: userEmail,
          sum: sum,
          userId: null,
          payment: payment,
          address: address,
          delivery_price: delivery_price ?? 0
        });
        return res.json({
          message: `Заказ без авторизации успешно создан`,
          offer,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const offer = await Offer.create({
          userName: user.name,
          userEmail: user.email,
          userTel: user.tel,
          sum: sum,
          userId: user.id,
          payment: payment,
          address: address,
          delivery_price: delivery_price ?? 0
        });
        return res.json({
          message: `Заказ с авторизацией успешно создан`,
          offer,
        });
      } catch (error) {
        console.log(error);
      }
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

  async changeOfferStatus(req, res, next) {
    const { status, id, trackNum } = req.body;
    const offer = await Offer.findOne({ where: { id: id } });
    if (offer) {
      offer.status = status;
      offer.trackNum = trackNum;
      await offer.save();
      res.json({ message: `offer status was changed on ${status}` });
    } else {
      return next(ApiError.badRequest("offer with that id is not defined"));
    }
  }

  async getAllOffers(req, res, next) {
    const offers = await Offer.findAll()
    res.json({offers})
  }

  async getOffer(req, res, next) {
    const { id } = req.body;
    const offer = await Offer.findOne({ where: { id: id } });

    if (offer) {
      res.json({ offer });
    } else {
      return next(ApiError.badRequest("offer with that id is not defined"));
    }
  }
}

module.exports = new OfferController();
