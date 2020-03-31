const init = User => {
  const findAll = async (req, res) => {
    const users = await User.find({})
    res.send({ success: true, users })
  }

  const add = (req, res) => {
    User.total().then(async total => {
      if (total < 100) {
        try {
          const user = new User(req.body)
          await user.save()
          res.status(201).send({ success: true, user })
        } catch (err) {
          res.status(400).send({ success: false, errors: Object.keys(err.errors) })
        }
      } else {
        res.status(404).send({ success: false, errors: 'Cannot exists < 100% of participation!' })
      }
    })
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
    findAll,
    add,
    remove
  }
}

module.exports = init
