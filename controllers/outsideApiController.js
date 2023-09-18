const ApiError = require("../error/ApiError");

class OutsideApiController {
  async getBoxberryPoints(req, res, next) {
    try {
      const response = await fetch(
        "https://api.boxberry.ru/json.php?token=67c2b6ec9672bb5fa86eb0ac27629b9a&method=ListPoints&prepaid=1"
      );
      console.log(response)
      return res.json(response.json());
    } catch (error) {
      next(ApiError.forbidden("Fetch data error"))
    }
  }
}

module.exports = new OutsideApiController();
