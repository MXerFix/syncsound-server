const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res) {
    const {name} = req.body
    const type = await Type.create({name})
    const types = await Type.findAll()
    return res.json({message:`type ${name} was created`, types})
  }

  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types)
  }

  async delete(req, res) {
    const { name } = req.body
    const type = await Type.findOne({ where: {name: name} })
    await type.destroy()
    const types = await Type.findAll()
    return res.json({message: `type ${name} was deleted`, types} )
  }

}

module.exports = new TypeController()