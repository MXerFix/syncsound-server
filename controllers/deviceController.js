const uuid = require("uuid");
const path = require("path");
const {
  Device,
  DeviceInfo,
  DeviceColor,
  PagedDevice,
  Brand,
  Type,
  ImageForColor,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const e = require("express");

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name,
        description,
        price,
        oldPrice,
        brandName,
        categoryName,
        info,
        bigDescription,
        color,
        deviceName
      } = req.body;
      const { img } = req.files ? req.files : '';
      const { additionalImages } = req.files ? req.files : '';
      if (
        name &&
        description
      ) {
        let fileName = uuid.v4() + ".png";
        img.mv(path.resolve(__dirname, "../static", fileName));
        const brand = await Brand.findOne({
          where: { name: brandName },
        });
        const category = await Type.findOne({
          where: { name: categoryName },
        });
        const device = await Device.create({
          name,
          description,
          price,
          oldPrice,
          img: fileName,
          brandName,
          brandId: brand.id,
          categoryName,
          categoryId: category.id,
        });
        if (bigDescription)
          await PagedDevice.create({
            bigDescription: bigDescription,
            deviceId: device.id,
          });

        if (info) {
          const infoJSON = JSON.parse(info);
          infoJSON.forEach( async (el) => {
            await DeviceInfo.create({
              category: el.category,
              title: el.title,
              description: el.description,
              deviceId: device.id,
            });
          });
        }

        return res.json(device);
      }

      else if (color) {
        const device = await Device.findOne({ where: { name: deviceName } });
        await DeviceColor.create({
          color: color,
          deviceId: device.id,
        });
        additionalImages.forEach((image) => {
          let fileName = uuid.v4() + '.png'
          image.mv(path.resolve(__dirname, '../static', fileName))
          ImageForColor.create({
            color: color,
            deviceId: device.id,
            img: fileName
          })
        })

        return res.json(device);
      }

      
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { brandId, typeId } = req.query;
    let devices;
    if (brandId && typeId) {
      devices = await Device.findAll({ where: { brandId, typeId } });
    }
    if (!brandId && !typeId) {
      devices = await Device.findAll({
        include: [
          { model: DeviceInfo, as: "info" },
          { model: DeviceColor, as: "colors" },
          { model: ImageForColor, as: "images_for_color" },
          { model: PagedDevice, as: 'paged_device' }
        ],
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAll({ where: { typeId } });
    }
    if (brandId && !typeId) {
      devices = await Device.findAll({ where: { brandId } });
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        { model: DeviceInfo, as: "info" },
        { model: DeviceColor, as: "colors" },
        { model: ImageForColor, as: "images_for_color" },
        { model: PagedDevice, as: 'paged_device' }
      ],
    });
    return res.json(device);
  }

  async delete(req, res) {
    const { id } = req.body;
    const info = await DeviceInfo.findAll({ where: { deviceId: id } })
    const colors = await DeviceColor.findAll({ where: { deviceId: id } })
    const images = await ImageForColor.findAll({ where: { deviceId: id } })
    const paged = await PagedDevice.findAll({ where: { deviceId: id } })
    info.forEach( async (el) => await el.destroy())
    colors.forEach( async (el) => await el.destroy())
    images.forEach( async (el) => await el.destroy())
    paged.forEach( async (el) => await el.destroy())
    const device = await Device.findOne({ where: { id: id } });
    await device.destroy();
    const devices = await Device.findAll({
      include: [
        { model: DeviceInfo, as: "info" },
        { model: DeviceColor, as: "colors" },
        { model: ImageForColor, as: "images_for_color" },
        { model: PagedDevice, as: 'paged_device' }
      ],
    });
    return res.json({ message: `device with id:  ${id} was deleted`, devices });
  }
}

module.exports = new DeviceController();
