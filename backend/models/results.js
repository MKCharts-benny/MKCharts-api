const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
  date: String,
  winner: String,
  players: String
})

resultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Result', resultSchema)