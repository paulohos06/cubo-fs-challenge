const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'firstname is required.'] },
  lastname: { type: String, required: [true, 'lastname is required.'] },
  participation: {
    type: Number,
    min: [0, 'participation is less than minimum allowed value.'],
    max: [100, 'participation is greater than maximum allowed value.'],
    required: [true, 'participation is required.']
  }
})

// methods
userSchema.static('total', async function () {
  const docs = await this.find({}).select('participation -_id').exec()
  const total = docs
    .map(item => item.participation)
    .reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)
  return total
})

const User = mongoose.model('User', userSchema)

module.exports = User
