const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
require('express-async-errors')
const initRouter = require('../server/router/index')
const initMiddleware = require('../server/middleware/index')
const app = express()

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 初始化中间件
  initMiddleware(app)

  // 初始化路由
  initRouter(app)

  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
