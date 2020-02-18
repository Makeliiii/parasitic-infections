const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000

// import routes
const users = require('./routes/users')
const items = require('./routes/items')

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
app.use('/api/items', items)

// db connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } , () => console.log(`DB connection established`))

// start server
app.listen(port, () => console.log(`App listening on port ${port}`))