const express = require('express')
const app = express()
const api = require('./api')
const cors = require('cors')

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api', api)

app.listen(9000, () => {
  console.log('running')
})
