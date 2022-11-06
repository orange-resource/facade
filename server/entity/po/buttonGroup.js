const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const ButtonGroup = sequelize.define('t_button_group', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING
  },
  icon: {
    type: Sequelize.STRING
  },
  openUrl: {
    type: Sequelize.TEXT
  },
  sort: {
    type: Sequelize.INTEGER
  },
  showStatus: {
    type: Sequelize.INTEGER
  }
}, { timestamps: false, freezeTableName: true })

module.exports = ButtonGroup
