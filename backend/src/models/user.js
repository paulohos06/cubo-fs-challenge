const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  participation: { type: Number, min: 0, max: 100 }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
