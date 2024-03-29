const { default: axios } = require("axios");
const ApiError = require("../error/ApiError");
const fetch = require("node-fetch");
const { YooCheckout } = require("@a2seven/yoo-checkout");
const { v4 } = require("uuid");

class OutsideApiController {
  async createPaymentOfferYOOKASSA(req, res, next) {
    const { payload } = req.body;
    // console.log(payload);

    const shopID = process.env.NODE_ENV === 'prod' ? process.env.PAYMENT_SHOP_ID : process.env.PAYMENT_SHOP_ID_TEST;
    const secretKey = process.env.NODE_ENV === 'prod' ? process.env.PAYMENT_SECRET_KEY : process.env.PAYMENT_SECRET_KEY_TEST;

    // console.log(shopID, secretKey);

    const checkout = new YooCheckout({
      shopId: shopID,
      secretKey: secretKey,
    });
    const idempotenceKey = v4();

    try {
      const payment = await checkout.createPayment(payload, idempotenceKey);
      // console.log(payment);
      return res.json(payment);
    } catch (error) {
      console.log(error);
    }
  }

  async checkPaymentOfferYOOKASSA(req, res, next) {
    const { id } = req.body;

    const shopID = process.env.NODE_ENV === 'prod' ? process.env.PAYMENT_SHOP_ID : process.env.PAYMENT_SHOP_ID_TEST;
    const secretKey = process.env.NODE_ENV === 'prod' ? process.env.PAYMENT_SECRET_KEY : process.env.PAYMENT_SECRET_KEY_TEST;

    const checkout = new YooCheckout({
      shopId: shopID,
      secretKey: secretKey,
    });

    const paymentId = id;

    try {
      const payment = await checkout.getPayment(paymentId);
      // console.log(payment);
      res.json(payment);
    } catch (error) {
      console.error(error);
    }
  }

  async getBoxberryCities(req, res, next) {
    try {
      await axios
        .get(
          "https://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=ListCities&prepaid=1"
        )
        .then(response => {
          return res.json(response.data);
        });
    } catch (error) {
      console.log(error);
      next(ApiError.forbidden("Fetch data error"));
    }
  }

  async getBoxberryPoints(req, res, next) {
    try {
      await axios
        .get(
          "https://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=ListPoints&prepaid=1"
        )
        .then(response => {
          return res.json(response.data);
        });
    } catch (error) {
      console.log(error);
      next(ApiError.forbidden("Fetch data error"));
    }
  }

  async getBoxberryPrice(req, res, next) {
    const { target, sum, zip } = req.query;
    // console.log(target, sum, zip);
    // http://api.boxberry.ru/json.php?token=XXXXXXXXXX&method=DeliveryCosts&weight=500&target=010&ordersum=0&deliverysum=0&targetstart=010&height=120&width=80&depth=50&zip=624000&paysum=100
    try {
      if (target) {
        await axios
          .get(
            `http://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=DeliveryCosts&weight=500&target=${target}&ordersum=${sum}&height=120&width=80&depth=50`
          )
          .then(response => {
            // console.log(response.data);
            return res.json(response.data);
          });
      } else if (zip) {
        await axios
          .get(
            `http://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=DeliveryCosts&weight=500&zip=${zip}&ordersum=${sum}&height=120&width=80&depth=50`
          )
          .then(response => {
            // console.log(response.data);
            return res.json(response.data);
          });
      }
    } catch (error) {
      console.log(error);
      next(ApiError.forbidden("Fetch data error"));
    }
  }

  async getBoxberryZip(req, res, next) {
    try {
      await axios
        .get(
          `https://api.boxberry.ru/json.php?token=${process.env.BOXBERRY_TOKEN}&method=ListZips`
        )
        .then(response => {
          // console.log(response.data);
          return res.json(response.data);
        });
    } catch (error) {
      console.log(error);
      next(ApiError.forbidden("Fetch data error"));
    }
  }
}

module.exports = new OutsideApiController();
