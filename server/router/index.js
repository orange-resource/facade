const login = require('../controller/loginController')
const test = require('../controller/systemController')

function initRouter (express) {
  express.use('/api', login)
  express.use('/api', test)
}

module.exports = initRouter
