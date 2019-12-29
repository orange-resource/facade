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
  footerInfo: {
    type: Sequelize.STRING
  },
  pageMainTitle: {
    type: Sequelize.STRING
  },
  pageMainDescription: {
    type: Sequelize.STRING
  },
  logoUrl: {
    type: Sequelize.TEXT
  },
  showPopStatus: {
    type: Sequelize.INTEGER
  },
  popImageUrl: {
    type: Sequelize.TEXT
  },
  popOpenUrl: {
    type: Sequelize.TEXT
  },
}, { timestamps: false, freezeTableName: true })

module.exports = SystemConfig
