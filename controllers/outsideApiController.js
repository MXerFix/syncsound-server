const { default: axios } = require("axios");
const ApiError = require("../error/ApiError");
const fetch = require("node-fetch");

class OutsideApiController {
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
    console.log(target, sum, zip);
    // http://api.boxberry.ru/json.php?token=XXXXXXXXXX&method=DeliveryCosts&weight=500&target=010&ordersum=0&deliverysum=0&targetstart=010&height=120&width=80&depth=50&zip=624000&paysum=100
    try {
      if (target) {
        await axios
          .get(
            `http://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=DeliveryCosts&weight=500&target=${target}&ordersum=${sum}&height=120&width=80&depth=50`
          )
          .then(response => {
            console.log(response.data);
            return res.json(response.data);
          });
      } else if (zip) {
        await axios
          .get(
            `http://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=DeliveryCosts&weight=500&zip=${zip}&ordersum=${sum}&height=120&width=80&depth=50`
          )
          .then(response => {
            console.log(response.data);
            return res.json(response.data);
          });
      }
    } catch (error) {
      console.log(error);
      next(ApiError.forbidden("Fetch data error"));
    }
  }
}

module.exports = new OutsideApiController();
