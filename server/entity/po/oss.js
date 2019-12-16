const Sequelize = require('sequelize')
const mysql = require('../../plugins/mysql')

const sequelize = mysql.sequelize

const Oss = sequelize.define('t_aliyun_oss', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  domainName: {
    type: Sequelize.STRING
  },
  endpoint: {
    type: Sequelize.STRING
  },
  keyId: {
    type: Sequelize.STRING
  },
  keySecret: {
    type: Sequelize.STRING
  },
  bucketName: {
    type: Sequelize.STRING
  },
  catalogue: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  }
}, { timestamps: false, freezeTableName: true })

module.exports = Oss
