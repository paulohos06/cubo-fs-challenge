const db = require('./config/database')
const app = require('./app')
const port = process.env.PORT || 3000

db
  .then(() => {
    app.listen(port, err => {
      if (err) console.log('Unable to start server!')
      else console.log('Server is running...')
    })
  })
  .catch(err => console.log('Unable to connect database:', err))
