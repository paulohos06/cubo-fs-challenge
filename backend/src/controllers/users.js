const init = User => {
  const getAll = async (req, res) => {
    const users = await User.find({})
    res.send({ success: true, users })
  }

  const add = async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(201).send({ success: true, user })
    } catch (err) {
      res.status(400).send({ success: false, errors: err.message })
    }
  }

  const remove = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id })
      res.status(204).send()
    } catch (err) {
      res.status(400).send({ success: false })
    }
  }

  return {
    getAll,
    add,
    remove
  }
}

module.exports = init
