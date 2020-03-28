const mongo = process.env.MONGODB_URI || 'mongodb://localhost/cuboChallenge'
const mongoose = require('mongoose')

// set mongoose promises
mongoose.Promise = global.Promise

const db = mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = db
