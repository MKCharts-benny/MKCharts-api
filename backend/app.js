const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const resultsRouter = require('./controllers/results')

app.use(cors())
app.use(express.json())




module.exports = app