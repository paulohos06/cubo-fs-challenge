const init = User => {
  const findAll = async (req, res) => {
    const users = await User.find({})
    res.send({ sucess: true, users })
  }

  const find = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.send({ sucess: true, user })
  }

  const add = async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.send({ sucess: true })
    } catch (err) {
      res.send({ sucess: false, errors: Object.keys(err.errors) })
    }
  }

  const update = async (req, res) => {
    try {
      await User.updateOne({ _id: req.params.id }, req.body)
      res.send({ sucess: true })
    } catch (err) {
      res.send({ sucess: false, errors: Object.keys(err.errors) })
    }
  }

  const remove = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id })
      res.send({ sucess: true })
    } catch (err) {
      res.send({ sucess: false, errors: Object.keys(err.errors) })
    }
  }

  return {
    findAll,
    find,
    add,
    update,
    remove
  }
}

module.exports = init
