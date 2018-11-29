const express = require('express')
const mainRouter = express.Router()
const bodyParser = require('body-parser')
const notificationRouter = require('./notification')

mainRouter.use(bodyParser.urlencoded({ extended: true }))
mainRouter.use(bodyParser.json())
mainRouter.all('/', (req, res) => {
  res.send('Hello')
})
mainRouter.use('/notification', notificationRouter)

module.exports = mainRouter
