const login = require('../controller/loginController')
const test = require('../controller/testController')

function initRouter (express) {
  express.use('/facade', login)
  express.use('/facade', test)
}

module.exports = initRouter
