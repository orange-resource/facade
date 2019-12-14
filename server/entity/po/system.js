const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const SystemConfig = sequelize.define('t_system_config', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  pageMainTitle: {
    type: Sequelize.STRING
  },
  pageMainDescription: {
    type: Sequelize.STRING
  }
}, { timestamps: false, freezeTableName: true })

module.exports = SystemConfig
