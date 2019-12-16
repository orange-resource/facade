const loginController = require('../controller/loginController')
const systemController = require('../controller/systemController')
const buttonGroupController = require('../controller/buttonGroupController')

function initRouter (express) {
  express.use('/api', loginController)
  express.use('/api', systemController)
  express.use('/api', buttonGroupController)
}

module.exports = initRouter
