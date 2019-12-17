const loginController = require('../controller/loginController')
const systemController = require('../controller/systemController')
const buttonGroupController = require('../controller/buttonGroupController')
const ossController = require('../controller/ossController')

function initRouter (express) {
  express.use('/api', loginController)
  express.use('/api', systemController)
  express.use('/api', buttonGroupController)
  express.use('/api', ossController)
}

module.exports = initRouter
