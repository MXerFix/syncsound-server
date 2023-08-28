const { Basket, Device, BasketDevice } = require("../models/models")

class BasketController {
  
  async add(req,res,next) {
    const { deviceId, basketId } = req.body
    const device = await Device.findOne({where: {id: deviceId}})
    if (!device) {
      return res.status(404).json({message:'Такого товара не существует'})
    }
    const basketDevice = await BasketDevice.create({deviceId, basketId})
    return res.json({message:"Товар добавлен в корзину"})
  }

  async delete(req,res,next) {
    const { id, basketId } = req.body
    const basketDevice = await BasketDevice.findOne({where:{id, basketId}})
    if (!basketDevice) {
      return res.status(404).json({message: 'Такого товара в вашей корзине не существует'})
    }
    await basketDevice.destroy()
    const basketDevices = await BasketDevice.findAll({where:{basketId}})
    return res.json({basketDevices})
  }

  async getAll(req,res,next) {
    const { basketId } = req.body
    const basketDevices = await BasketDevice.findAll({where:{basketId}})
    return res.json({basketDevices})
  }
}

module.exports = new BasketController()