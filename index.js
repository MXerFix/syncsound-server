require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const IS_DEV = process.env.NODE_ENV === 'dev'
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './static')))
app.use(fileUpload({}))
app.use('/api', router)
app.get('/', (req, res) => {
  return res.json({message: "its okay"})
})

//errors
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
  } catch (e) {
    // console.log(e);
  }
}

start()

module.exports = app