const router = require('express').Router()
const { errors } = require('celebrate')
const { User, UserValidation } = require('../models/user')
const users = require('../controllers/users')(User)

router.get('/', users.getAll)
router.post('/', UserValidation, users.add)
router.delete('/:id', users.remove)

router.use(errors())

module.exports = router
