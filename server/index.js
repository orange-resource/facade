const express = require('express')
const timeout = require('connect-timeout')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// eslint-disable-next-line import/order
const Rsp = require('./common/Rsp')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const initRouter = require('../server/router/index')
const initMiddleware = require('../server/middleware/index')
const app = express()

const config = require('../nuxt.config.js')
const mysql = require('./plugins/mysql')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  mysql.initMysql()

  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(cookieParser())

  // 初始化中间件
  initMiddleware(app)

  // 初始化路由
  initRouter(app)

  app.use(nuxt.render)

  app.use(timeout(10000))

  app.use((req, res, next) => {
    res.json(Rsp.build(Rsp.ACCESS_TIMEOUT))
  })

  // eslint-disable-next-line handle-callback-err
  app.use((err, req, res, next) => {
    res.json(Rsp.build(Rsp.SERIOUS_ERROR))
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
