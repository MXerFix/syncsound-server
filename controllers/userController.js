const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, name, email, role) => {
  return jwt.sign({id: id, name: name, email: email, role: role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {

  async check_admin_key(req, res, next) {
    const { key } = req.body
    const available_keys = process.env.ADMIN_ACCEPT_KEYS
    if (available_keys.includes(key)) {
      res.json({correct: true})
    } else {
      next(ApiError.badRequest("Incorrect key!"))
    }
  }

  async registration(req, res, next) {
    const { name, email, password} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль!'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({name, email, role: "USER", password: hashPassword})
    const basket = await Basket.create({userId: user.id})
    const token = generateJwt(user.id, user.name, user.email, user.role)

    return res.json({token})
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({where:{email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не найден!'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      console.log('correct error');
      return next(ApiError.internal('Неверный пароль!'))
    }
    const token = generateJwt(user.id, user.name, user.email, user.role, user.tel)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role, req.user.tel)
    return res.json({token})
  }
}

module.exports = new UserController()