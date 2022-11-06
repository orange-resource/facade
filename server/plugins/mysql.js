const Sequelize = require('sequelize')
const consola = require('consola')
const Config = require('../config/config')

const sequelize = new Sequelize(
  Config.mysql.database,
  Config.mysql.username,
  Config.mysql.password, {
    host: Config.mysql.host,
    port: Config.mysql.port,
    dialect: 'mysql',
    pool: Config.mysql.pool,
    define: Config.mysql.define
  })

const mysql = {
  sequelize,
  initMysql () {
    sequelize
      .authenticate()
      .then(() => {
        return true
      })
      .catch((err) => {
        consola.error(err)
        return false
      })
  }
}

module.exports = mysql
