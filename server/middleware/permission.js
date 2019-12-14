const Rsp = require('../common/Rsp')
const jwt = require('../util/jwtUtil')

// eslint-disable-next-line require-await
const permission = async (req, res, next) => {
  try {
    const token = JSON.parse(req.cookies.token).token
    if (token) {
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
