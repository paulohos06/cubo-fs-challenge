const router = require('express').Router()
const User = require('../models/user')
const users = require('../controllers/users')(User)

router.get('/', users.findAll)
router.post('/', users.add)
router.delete('/:id', users.remove)

module.exports = router
