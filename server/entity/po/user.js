const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const User = sequelize.define('t_user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, { timestamps: false, freezeTableName: true })

module.exports = User
