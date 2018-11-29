const express = require('express')
const router = express.Router()
const postHandler = require('./post')

router.post('/', postHandler)

module.exports = router
