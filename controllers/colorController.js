const { Color } = require("../models/models");

class ColorController {
  async create(req, res) {
    const { name, value } = req.body;
    const color = await Color.create({ name, value });
    const colors = await Color.findAll();
    return res.json({ message: `color ${name} was created`, colors });
  }

  async getAll(req, res) {
    const colors = await Color.findAll();
    return res.json(colors);
  }

  async edit(req, res) {
    const { id, name, value } = req.body;
    const color = await Color.findOne({ where: { id: id } });
    if (color) {
      color.name = name;
      color.value = value;
      await color.save();
      const colors = await Color.findAll();
      return res.json({ message: `color ${id} was edited`, colors });
    }
  }

  async delete(req, res) {
    const { id } = req.body;
    const color = await Color.findOne({ where: { id: id } });
    const name = color.name;
    await color.destroy();
    const colors = await Color.findAll();
    return res.json({ message: `color ${name} was deleted`, colors });
  }
}

module.exports = new ColorController();
