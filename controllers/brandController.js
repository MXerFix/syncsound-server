const { Brand } = require("../models/models")

class BrandController {
  async create(req, res) {
    const {name} = req.body
    const brand = await Brand.create({name})
    const brands = await Brand.findAll()
    return res.json({message:`brand ${name} was created`, brands})
  }

  async getAll(req, res) {
    const brands = await Brand.findAll()
    return res.json(brands)
  }

  async edit(req, res) {
    const { id, name } = req.body;
    const brand = await Brand.findOne({ where: { id: id } });
    if (brand) {
      brand.name = name;
      await brand.save();
      const brands = await Brand.findAll();
      return res.json({ message: `brand ${id} was edited`, brands });
    }
  }

  async delete(req, res) {
    const { name } = req.body
    const brand = await Brand.findOne({ where: {name: name} })
    await brand.destroy()
    const brands = await Brand.findAll()
    return res.json({message: `brand ${name} was deleted`, brands} )
  }
}

module.exports = new BrandController()