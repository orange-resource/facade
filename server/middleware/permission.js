const Rsp = require('../common/Rsp')
const jwt = require('../util/jwtUtil')

const permission = async (req, res, next) => {
  try {
    let token = req.cookies.token
    if (token === undefined || token === null) {
      token = JSON.parse(req.cookies.token).token
    }
    if (token !== undefined && token !== null) {
      const decode = jwt.decode(token)
      if (decode === null) {
        res.json(Rsp.build(Rsp.TOKEN_NULL))
      }
      next()
    } else {
      res.json(Rsp.build(Rsp.TOKEN_NULL))
    }
  } catch (e) {
    res.json(Rsp.build(Rsp.TOKEN_NULL))
  }
}

module.exports = permission
