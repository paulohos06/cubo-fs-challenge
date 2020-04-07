const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const { celebrate, Joi, Segments } = require('celebrate')

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

userSchema.statics.total = function () {
  return new Promise((resolve, reject) => {
    const query = this.find({}).select('participation -_id')
    query.exec((err, docs) => {
      if (err) reject(err)
      const total = docs
        .map(item => item.participation)
        .reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)
      resolve(total)
    })
  })
}

userSchema.pre('save', async function (next) {
  const user = this
  const total = await this.model('User').total()
  const allowed = !((total + parseInt(user.participation) > 100))

  if (allowed) next()
  else throw new Error('Users participation will exceed the limit allowed!')
})

const User = mongoose.model('User', userSchema)

// celebrate validation
const UserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    participation: Joi.number().integer()
  })
})

module.exports = {
  User,
  UserValidation
}
