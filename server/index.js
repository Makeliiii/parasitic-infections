const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000

// import routes
const users = require('./routes/users')
const add = require('./routes/items/add')
const get = require('./routes/items/get')
const editDelete = require('./routes/items/editDelete')

// db uri
require('dotenv').config()
const db = process.env.DB_CONNECTION

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

// routes
app.use('/api/users', users)
app.use('/api/items', add)
app.use('/api/items', get)
app.use('/api/items', editDelete)

// serve our images
app.use(express.static(__dirname + '/uploads'));

// db connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false } , () => console.log(`DB connection established`))

// start server
const server = app.listen(port, () => console.log(`App listening on port ${port}`))

module.exports = server