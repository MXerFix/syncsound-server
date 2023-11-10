const { Color } = require("../models/models")

class ColorController {
  async create(req, res) {
    const {name, value} = req.body
    const color = await Color.create({name, value})
    const colors = await Color.findAll()
    return res.json({message:`color ${name} was created`, colors})
  }

  async getAll(req, res) {
    const colors = await Color.findAll()
    return res.json(colors)
  }

  async delete(req, res) {
    const { name } = req.body
    const color = await Color.findOne({ where: {name: name} })
    await color.destroy()
    const colors = await Color.findAll()
    return res.json({message: `color ${name} was deleted`, colors} )
  }
}

module.exports = new ColorController()