const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const Section = sequelize.define('t_section', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  show_status: {
    type: Sequelize.INTEGER
  },
  openUrl: {
    type: Sequelize.TEXT
  },
  sort: {
    type: Sequelize.INTEGER
  },
  onStatus: {
    type: Sequelize.INTEGER
  },
  offText: {
    type: Sequelize.STRING
  }
}, { timestamps: false, freezeTableName: true })

module.exports = Section
