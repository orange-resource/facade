/**
 * jwt通用操作
 */
const jwt = require('jwt-simple')
const Config = require('../config/config')

const JwtUtil = {
  build (mark) {

    const expires = Date.now() + Config.jwt.expires
    const token = jwt.encode({
      iss: mark,
      exp: expires
    }, Config.jwt.secret)
    return token
  },
  decode (token) {
    try {
      const decode = jwt.decode(token, Config.jwt.secret)
      if (decode.exp <= Date.now()) {
        return null
      }
      return decode.iss
    } catch (e) {
      return null
    }
  }
}

module.exports = JwtUtil
