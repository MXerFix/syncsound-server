const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  name: {type: DataTypes.STRING, defaultValue: 'Unknown'},
  email: {type: DataTypes.STRING, unique:true},
  tel: {type: DataTypes.STRING, unique:true, allowNull: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue:"USER"},
})

const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const BasketDevice = sequelize.define('basket_device', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const Device = sequelize.define('device', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  name: {type: DataTypes.STRING, unique:false, allowNull:false},
  description: {type: DataTypes.STRING, allowNull:false},
  price: {type:DataTypes.INTEGER, allowNull:false},
  oldPrice: {type:DataTypes.INTEGER},
  rating: {type: DataTypes.INTEGER, defaultValue:0},
  img: {type: DataTypes.STRING, allowNull:false},
  color: {type: DataTypes.STRING, allowNull: false},
  brandName: { type: DataTypes.STRING, allowNull: false },
  brandId: {type: DataTypes.INTEGER},
  categoryName: { type: DataTypes.STRING, allowNull: false },
  categoryId: {type: DataTypes.INTEGER},
})

const PagedDevice = sequelize.define('paged_device', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  bigDescription: {type: DataTypes.STRING, allowNull:false},
  device_info: {type: DataTypes.JSON, allowNull:false },
  device_additions: {type: DataTypes.JSON, allowNull: true},
  deviceId: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceColor = sequelize.define('device_color', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  color: {type: DataTypes.STRING, allowNull:false},
  deviceId: {type: DataTypes.INTEGER, allowNull: false}
})

const ImageForColor = sequelize.define('for_color_image', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  color: {type: DataTypes.STRING, allowNull:false},
  deviceId: {type: DataTypes.INTEGER, allowNull: false},
  img: {type: DataTypes.STRING, allowNull:false},
})

const DeviceInfo = sequelize.define('device_info', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  category: {type: DataTypes.STRING, allowNull:false},
  title: {type: DataTypes.STRING, allowNull:false},
  description: {type: DataTypes.STRING, allowNull:false},
  deviceId: {type: DataTypes.INTEGER, allowNull: false}
})

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  name: {type: DataTypes.STRING, unique:true, allowNull:false}
})

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  name: {type: DataTypes.STRING, unique:true, allowNull:false}
})

const Color = sequelize.define('default_color', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  name: {type: DataTypes.STRING, unique:true, allowNull:false},
  value: {type: DataTypes.STRING, unique: false, allowNull: false}
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  rate: {type: DataTypes.INTEGER, allowNull:false}
})

const Offer = sequelize.define('offer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  sum: {type: DataTypes.INTEGER, allowNull: false},
  delivery_price: { type: DataTypes.INTEGER, allowNull: true },
  status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Создан'},
  payment: {type: DataTypes.STRING, allowNull: false, defaultValue:'when_get'},
  trackNum: {type: DataTypes.STRING, allowNull: true},
  userName: {type: DataTypes.STRING, allowNull: false},
  userTel: {type: DataTypes.STRING, allowNull: false},
  userEmail: {type: DataTypes.STRING, allowNull: false},
  userId: {type: DataTypes.INTEGER, allowNull: true},
  address: {type: DataTypes.JSON, allowNull: true}
})

const OfferDevice = sequelize.define('offer_device', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const TypeBrand = sequelize.define('type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Offer)
Offer.belongsTo(User)

Offer.hasMany(OfferDevice, {as: 'offer_devices'})
OfferDevice.belongsTo(Offer)

Device.hasMany(OfferDevice)
OfferDevice.belongsTo(Device)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Color.hasMany(Device)
Device.belongsTo(Color)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(PagedDevice, {as: 'paged_device'})
PagedDevice.belongsTo(Device)

Device.hasMany(DeviceColor, {as: 'colors'})
DeviceColor.belongsTo(Device)

Device.hasMany(ImageForColor, {as: 'images_for_color'})
ImageForColor.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })


module.exports = {
  User, Basket, BasketDevice, Device, DeviceColor, PagedDevice, Color, Type, Brand, Rating, TypeBrand, DeviceInfo, ImageForColor, Offer, OfferDevice
}