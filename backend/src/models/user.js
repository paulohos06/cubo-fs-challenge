const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

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

userSchema.plugin(autoIncrement, { inc_field: 'id' })

userSchema.pre('save', async function (next) {
  const user = this
  const docs = await this.model('User').find({}).select('participation -_id')
  const total = docs
    .map(item => item.participation)
    .reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)
  const allowed = !((total + parseInt(user.participation) > 100))

  if (allowed) next()
  else throw new Error('Users participation will exceed the limit allowed!')
})

const User = mongoose.model('User', userSchema)

module.exports = User
