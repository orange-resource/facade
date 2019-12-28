const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const Category = sequelize.define('t_category', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  showStatus: {
    type: Sequelize.INTEGER
  },
  sort: {
    type: Sequelize.INTEGER
  }
}, { timestamps: false, freezeTableName: true })

module.exports = Category
