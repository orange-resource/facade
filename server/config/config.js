/**
 * 后台全局配置
 * @author orange <1067357662@qq.com>
 */
const Config = {
  jwt: {
    secret: 'facade',
    expires: 10000 // 1天
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    database: 'com_ongsat_facade',
    username: 'root',
    password: 'tdcq1998.@@',
    pool: {
      max: 30,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    define: {
      'underscored': true,
      'charset': 'utf8mb4'
    }
  }
}

module.exports = Config
