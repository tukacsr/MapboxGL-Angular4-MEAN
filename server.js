'use-strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const uriUtil = require('mongodb-uri')

const mongodbUri = 'mongodb://mongo:mongo@ds161890.mlab.com:61890/glimongodb'
const mongooseUri = uriUtil.formatMongoose(mongodbUri)
const dbOptions = {}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/comments', require('./api/comments/routes/post_comment'))
app.use('/api/comments', require('./api/comments/routes/get_comments'))

const hostname = 'localhost'
const port = 3001

app.listen(port, hostname, () => {
  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err)
    }
  })
  console.log(`Server is running at http://${hostname}:${port}`)
})