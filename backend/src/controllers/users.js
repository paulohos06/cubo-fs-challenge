const init = User => {
  const findAll = async (req, res) => {
    const users = await User.find({})
    res.send({ success: true, users })
  }

  const add = async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.send({ success: true, user })
    } catch (err) {
      res.status(400).send({ success: false, errors: Object.keys(err.errors) })
    }
  }

  const remove = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id })
      res.send({ success: true })
    } catch (err) {
      res.status(400).send({ success: false, errors: Object.keys(err.errors) })
    }
  }

  return {
    findAll,
    add,
    remove
  }
}

module.exports = init
